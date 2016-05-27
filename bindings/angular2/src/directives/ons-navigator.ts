import {
  Component,
  DynamicComponentLoader,
  Injector,
  ReflectiveInjector,
  Directive,
  ElementRef,
  Type,
  ComponentResolver,
  provide,
  NgZone,
  Renderer,
  Input,
  ViewContainerRef,
  ResolvedReflectiveProvider
} from '@angular/core';

interface NavigatorElement {
  pushPage(page: string): Promise<any>;
  popPage(): Promise<any>;
}

export class PageParams {
  constructor(private _data = {}) {}

  at(key: string): any {
    return this._data[key];
  }

  get data() {
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
  selector: 'ons-navigator > ons-page'
})
export class OnsNavigator {
  private _navigator: NavigatorElement;
  private _pages: NavigatorPage[];
  private _providers: ResolvedReflectiveProvider[];

  constructor(
    private _elementRef: ElementRef,
    private _componentResolver: ComponentResolver,
    private _loader: DynamicComponentLoader,
    private _viewContainer: ViewContainerRef,
    private _injector: Injector) {
    this._navigator = _elementRef.nativeElement;
    this._pages = [];
    this._providers = ReflectiveInjector.resolve([
      provide(OnsNavigator, {useValue: this})
    ]);
  }

  /**
   * @method pushComponent
   * @signature pushComponent(type: Type, params: Map = {})
   * @param {Type} type
   *   [en][/en]
   *   [ja]navigatorに挿入するコンポーネントのクラスを指定します。[/ja]
   * @param {Map} [params]
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
    const providers = this._providers.concat(ReflectiveInjector.resolve([
      provide(PageParams, {useValue: pageParams})
    ]));

    this._loader.loadNextToLocation(type, this._viewContainer, providers).then(component => {
      const elementRef = component.location;
      const destroy = () => component.destroy();

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

  insertComponent(type: Type, index: number): Promise<any> {
    // TODO implement
    return Promise.resolve();
  }

  destroyComponent(index: number): Promise<any> {
    // TODO implement
    return Promise.resolve();
  }
}

