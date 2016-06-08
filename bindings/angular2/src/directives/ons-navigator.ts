import {
  Component,
  Injector,
  ReflectiveInjector,
  Directive,
  ElementRef,
  Type,
  ComponentResolver,
  provide,
  Renderer,
  Input,
  ViewContainerRef,
  ResolvedReflectiveProvider,
  ViewChildren,
  QueryList
} from '@angular/core';
import {OnsPage} from './ons-page';

interface NavigatorElement {
  pushPage(page: string): Promise<any>;
  popPage(): Promise<any>;
}

export class PageParams {
  constructor(private _data = {}) {}

  at(key: string): any {
    return this._data[key];
  }

  get data(): Object {
    return this._data;
  }
}

export class NavigatorPage {
  constructor(public elementRef: ElementRef, public destroy: Function, public params: PageParams) {
  }
}

/**
 * @element ons-navigator
 */
@Directive({
  selector: 'ons-navigator'
})
export class OnsNavigator {
  private _navigator: NavigatorElement;
  private _pages: NavigatorPage[];

  @ViewChildren(OnsPage) pages:QueryList<OnsPage>;

  constructor(
    private _elementRef: ElementRef,
    private _resolver: ComponentResolver,
    private _viewContainer: ViewContainerRef,
    private _injector: Injector) {
    this._navigator = _elementRef.nativeElement;
    this._pages = [];
  }

  /**
   * @method pushComponent
   * @signature pushComponent(type: Type, params: Object = {})
   * @param {Type} type
   *   [en][/en]
   *   [ja]navigatorに挿入するコンポーネントのクラスを指定します。[/ja]
   * @param {Object} [params]
   *   [en][/en]
   *   [ja]
   *     新しく生成するページへのパラメータを指定します。
   *     navigatorに挿入されたコンポーネントが初期化される際に、
   *     このパラメータをコンストラクタから受け取ることができます。
   *   [/ja]
   * @return {Promise}
   *   [en][/en]
   *   [ja]コンポーネントが生成され、遷移アニメーションが終わった時に解決されます。[/ja]
   * @description
   *   [en][/en]
   *   [ja][/ja]
   */
  pushComponent(type: Type, params: Object = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      this._loadPageComponent(type, params, navigatorPage => {
        // TODO implement animation
        this._pages.push(navigatorPage);
        resolve(navigatorPage);
      });
    });
  }

  private _loadPageComponent(type: Type, params: Object, done: Function): void {
    const pageParams = new PageParams(params);
    const injector = ReflectiveInjector.resolveAndCreate([
      provide(PageParams, {useValue: pageParams}),
      provide(OnsNavigator, {useValue: this})
    ], this._injector);

    this._resolver.resolveComponent(type).then(factory => {
      const componentRef = this._viewContainer.createComponent(factory, 0, injector);
      const elementRef = componentRef.location;
      const destroy = () => componentRef.destroy();

      // dirty fix to insert in correct position
      this._elementRef.nativeElement.appendChild(elementRef.nativeElement);
      //this._elementRef.nativeElement.style.display = 'none';

      done(new NavigatorPage(elementRef, destroy, pageParams));
    });
  }

  /**
   * @method popComponent
   * @signature popComponent()
   * @return {Promise}
   * @description
   *   [en][/en]
   *   [ja][/ja]
   */
  popComponent(): Promise<any> {
    return new Promise((resolve, reject) => {
      // TODO implement animation
      const page: NavigatorPage = this._pages.pop();
      page.destroy();

      resolve();
    });
  }
}

