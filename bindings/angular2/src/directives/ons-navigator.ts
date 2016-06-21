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
  QueryList,
  OnDestroy,
  OnInit
} from '@angular/core';

import {OnsPage} from './ons-page';

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
  constructor(
    public elementRef: ElementRef = null,
    public destroy: Function = function() {},
    public animator: any = null,
    public params: PageParams = new PageParams()) {
  }
}

/**
 * @element ons-navigator
 * @directive OnsNavigator
 * @selector ons-navigator
 * @description
 *    [en]Angular 2 directive for `<ons-navigator>` component.[/en]
 */
@Directive({
  selector: 'ons-navigator'
})
export class OnsNavigator implements OnInit, OnDestroy {
  private _navigator: any;
  private _pages: NavigatorPage[];

  /**
   * @input page
   * @type {Type}
   * @desc [en]Type of the page component.[/en]
   */
  @Input('page') pageComponentType: Type;

  constructor(
    private _elementRef: ElementRef,
    private _resolver: ComponentResolver,
    private _viewContainer: ViewContainerRef,
    private _injector: Injector) {
    this._navigator = _elementRef.nativeElement;
    this._pages = [];
  }

  /**
   * Deal with (page) input on initilization.
   */
  _loadInitialPageComponent() {
    const injector = ReflectiveInjector.resolveAndCreate([
      provide(OnsNavigator, {useValue: this})
    ], this._injector);

    this._resolver.resolveComponent(this.pageComponentType).then(factory => {
      while (this._navigator.firstChild) {
        this._navigator.removeChild(this._navigator.firstChild);
      }

      const pageComponentRef = this._viewContainer.createComponent(factory, 0, injector);
      const pageElement = pageComponentRef.location.nativeElement;

      this._verifyPageElement(pageElement);
      this._navigator.appendChild(pageElement); // dirty fix to insert in correct position

      const page = new NavigatorPage(
        pageComponentRef.location,
        () => pageComponentRef.destroy()
      );
      this._pages.push(page);
    });
  }

  _verifyPageElement(element: Element) {
    if (element.nodeName.toLowerCase() !== 'ons-page') {
      throw Error('Navigator\'s page element must be an "ons-page" element.');
    }
  }

  _createAnimator(options: Object = {}): any {
    return this._navigator.animatorFactory.newAnimator(options);
  }

  ngOnInit() {
    if (this.pageComponentType) {
      // Handle '(page)' input
      this._loadInitialPageComponent();
    } else if (this._navigator.children.length > 0) {
      // Put navigator page for initial contents page
      const pageElement = this._navigator.children[0];
      this._verifyPageElement(pageElement);
      this._pages.push(new NavigatorPage(null, () => pageElement.remove(), null));
    } else {
      // Put empty navigator page
      // TODO: implemenet
    }
  }

  ngOnDestroy() {
    this._pages.forEach(page => page.destroy());
    this._navigator = null;
  }

  /**
   * @method pushComponent
   * @signature pushComponent(type: Type, params: Object = {})
   * @param {Type} type
   *   [en]Specify component class to push to the navigator.[/en]
   *   [ja]navigatorに挿入するコンポーネントのクラスを指定します。[/ja]
   * @param {Object} [options]
   *   [en]Optional parameters.[/en]
   *   [ja][/ja]
   * @param {Object} [options.animation]
   * @param {Object} [params]
   *   [en]Specify parameter to the new template.[/en]
   *   [ja]
   *     新しく生成するページへのパラメータを指定します。
   *     navigatorに挿入されたコンポーネントが初期化される際に、
   *     このパラメータをコンストラクタから受け取ることができます。
   *   [/ja]
   * @return {Promise}
   *   [en]Resolves when the component is generated and animation is done.[/en]
   *   [ja]コンポーネントが生成され、遷移アニメーションが終わった時に解決されます。[/ja]
   * @description
   *   [en]Pushes a new page to the page stack.[/en]
   *   [ja][/ja]
   */
  pushComponent(type: Type, options: Object = {}, params: Object = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      this._loadPageComponent(type, options, params, navigatorPage => {
        this._pages.push(navigatorPage);

        const enterPageElement = this._navigator.children[this._navigator.children.length - 1];
        const leavePageElement = this._navigator.children[this._navigator.children.length - 2];
        navigatorPage.animator.push(enterPageElement, leavePageElement, () => resolve(navigatorPage));
      });
    });
  }

  private _loadPageComponent(type: Type, options: Object, params: Object, done: Function): void {
    const pageParams = new PageParams(params);
    const injector = ReflectiveInjector.resolveAndCreate([
      provide(PageParams, {useValue: pageParams}),
      provide(OnsNavigator, {useValue: this})
    ], this._injector);

    this._resolver.resolveComponent(type).then(factory => {
      const componentRef = this._viewContainer.createComponent(factory, 0, injector);
      const elementRef = componentRef.location;
      const destroy = () => componentRef.destroy();
      const pageElement = elementRef.nativeElement;

      this._verifyPageElement(pageElement);
      // dirty fix to insert in correct position
      this._elementRef.nativeElement.appendChild(pageElement);

      done(new NavigatorPage(elementRef, destroy, this._createAnimator(options), pageParams));
    });
  }

  /**
   * @method popComponent
   * @signature popComponent()
   * @param {Object} [options]
   *   [en][/en]
   *   [ja][/ja]
   * @param {Object} [options.animation]
   * @return {Promise}
   * @description
   *   [en][/en]
   *   [ja][/ja]
   */
  popComponent(options: Object = {}): Promise<any> {
    if (this._pages.length <= 1) {
      // do nothing
      return;
    }

    return new Promise((resolve, reject) => {
      const page: NavigatorPage = this._pages.pop();

      const enterPageElement = this._navigator.children[this._navigator.children.length - 2];
      const leavePageElement = this._navigator.children[this._navigator.children.length - 1];
      getAnimator(page).pop(enterPageElement, leavePageElement, () => {
        page.destroy();
        leavePageElement.remove();
        resolve();
      });
    });

    function getAnimator(page: NavigatorPage) {
      if (typeof (<any>options).animation === 'string') {
        return this._navigator.animatorFactory.newAnimator(options);
      } else {
        return page.animator;
      }
    }
  }
}

