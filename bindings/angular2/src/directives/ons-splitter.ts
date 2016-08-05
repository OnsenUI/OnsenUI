import {
  Type,
  ComponentRef,
  Injector,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  ReflectiveInjector,
  OnInit,
  ViewContainerRef,
  ComponentResolver,
  provide
} from '@angular/core';
import {PageParams} from './ons-navigator';

declare const ons: any;

/**
 * @element ons-splitter-side
 * @directive OnsSplitterSide
 * @selector ons-splitter-side
 * @description
 *    [ja]`<ons-splitter-side>`要素のためのAngular2ディレクティブです。[/ja]
 *    [en]Angular 2 directive for `<ons-splitter-side>` component.[/en]
 */
@Directive({
  selector: 'ons-splitter-side'
})
export class OnsSplitterSide {

  /**
   * @input page
   * @type {Type}
   * @desc
   *   [en]Page content.[/en]
   *   [ja]表示するページのコンポーネントを指定します。[/en]
   */
  @Input('page') set page(page: Type) {
    this.element.page = page;
  }

  constructor(
    private _elementRef: ElementRef,
    private _viewContainer: ViewContainerRef,
    private _resolver: ComponentResolver,
    private _injector: Injector) {
    this.element.pageLoader = this._createPageLoader();
  }

  get element() {
    return this._elementRef.nativeElement;
  }

  _createPageLoader() {
    return new ons.PageLoader(({page, parent, params}, done: Function) => {
      const injector = ReflectiveInjector.resolveAndCreate([
        provide(PageParams, {useValue: new PageParams(params || {})}),
        provide(OnsSplitterSide, {useValue: this})
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
}

/**
 * @element ons-splitter-content
 * @directive OnsSplitterContent
 * @selector ons-splitter-content
 * @description
 *    [ja]`<ons-splitter-content>`要素のためのAngular2 ディレクティブです。[/ja]
 *    [en]Angular 2 directive for `<ons-splitter-content>` component.[/en]
 */
@Directive({
  selector: 'ons-splitter-content'
})
export class OnsSplitterContent {
  /**
   * @input page
   * @type {Type}
   * @desc
   *   [en]Page content.[/en]
   *   [ja]表示するページのコンポーネントを指定します。[/en]
   */
  @Input('page') set page(page: Type) {
    this.element.page = page;
  }

  constructor(
    private _elementRef: ElementRef,
    private _viewContainer: ViewContainerRef,
    private _resolver: ComponentResolver,
    private _injector: Injector) {
    this.element.pageLoader = this._createPageLoader();
  }

  get element() {
    return this._elementRef.nativeElement;
  }

  _createPageLoader() {
    return new ons.PageLoader(({page, parent, params}, done: Function) => {
      const injector = ReflectiveInjector.resolveAndCreate([
        provide(PageParams, {useValue: new PageParams(params || {})}),
        provide(OnsSplitterContent, {useValue: this})
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
}
