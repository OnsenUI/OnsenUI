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

declare const ons: any;

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
export class OnsNavigator implements OnDestroy {
  private _lastPageLoader: Function;

  /**
   * @input page
   * @type {Type}
   * @desc [en]Type of the page component.[/en]
   */
  @Input('page') set pageComponentType(page: Type) {
    this._elementRef.nativeElement.page = page;
  }

  get element(): any {
    return this._elementRef.nativeElement;
  }

  constructor(
    private _elementRef: ElementRef,
    private _resolver: ComponentResolver,
    private _viewContainer: ViewContainerRef,
    private _injector: Injector) {
    this._lastPageLoader = this.element.pageLoader;
    this.element.pageLoader = this._createPageLoader();
  }

  _createPageLoader() {
    return new ons.PageLoader((page: any, parent: Element, params: Object, done: Function) => {
      const pageParams = new PageParams(params || {});
      const injector = ReflectiveInjector.resolveAndCreate([
        provide(PageParams, {useValue: pageParams}),
        provide(OnsNavigator, {useValue: this})
      ], this._injector);

      this._resolver.resolveComponent(page).then(factory => {
        const pageComponentRef = this._viewContainer.createComponent(factory, 0, injector);
        const pageElement = pageComponentRef.location.nativeElement;

        this.element.appendChild(pageElement); // dirty fix to insert in correct position

        done({
          element: pageElement,
          unload: () => pageComponentRef.destroy()
        });
      });
    });
  }

  ngOnDestroy() {
    this.element.pageLoader = this._lastPageLoader;
  }
}

