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
  ComponentFactoryResolver
} from '@angular/core';
import {Params} from '../ons/params';

declare const ons: any;

/**
 * @element ons-splitter-side
 * @directive OnsSplitterSide
 * @selector ons-splitter-side
 * @description
 *   [ja]`<ons-splitter-side>`要素のAngular 2ディレクティブです。[/ja]
 *   [en]Angular 2 directive for `<ons-splitter-side>` component.[/en]
 * @example
 *   @Component({
 *     selector: 'ons-page',
 *     template: `
 *       <ons-toolbar>
 *         <div class="center">Left Page</div> 
 *       </ons-toolbar>
 *       <div class="background"></div>
 *       <div class="content">
 *         Left
 *       </div>
 *     `
 *   })
 *   class SidePageComponent { }
 *
 *   @Component({
 *     selector: 'app',
 *     template: `
 *     <ons-splitter>
 *       <ons-splitter-side [page]="sidePage" side="left" width="200px">
 *       </ons-splitter-side>
 *       <ons-splitter-content>...</ons-splitter-content>
 *     </ons-splitter>
 *     `
 *   })
 *   export class AppComponent {
 *     sidePage = SidePageComponent;
 *   }
 */
@Directive({
  selector: 'ons-splitter-side'
})
export class OnsSplitterSide {

  /**
   * @input page
   * @type {Type<any>}
   * @desc
   *   [en]Page content.[/en]
   *   [ja]表示するページコンポーネントのクラスを指定します。[/en]
   */
  @Input('page') set page(page: Type<any>) {
    this.element.page = page;
  }

  constructor(
    private _elementRef: ElementRef,
    private _viewContainer: ViewContainerRef,
    private _resolver: ComponentFactoryResolver,
    private _injector: Injector) {
    this.element.pageLoader = this._createPageLoader();
  }

  get element() {
    return this._elementRef.nativeElement;
  }

  _createPageLoader() {
    return new ons.PageLoader(({page, parent, params}, done: Function) => {
      const injector = ReflectiveInjector.resolveAndCreate([
        {provide: Params, useValue: new Params(params || {})},
        {provide: OnsSplitterSide, useValue: this}
      ], this._injector);

        const factory = this._resolver.resolveComponentFactory(page);
        const pageComponentRef = this._viewContainer.createComponent(factory, 0, injector);
        const pageElement = pageComponentRef.location.nativeElement;

        this.element.appendChild(pageElement); // dirty fix to insert in correct position

        done({
          element: pageElement,
          unload: () => pageComponentRef.destroy()
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
   * @type {Type<any>}
   * @desc
   *   [en]Specify the page component.[/en]
   *   [ja]表示するページコンポーネントのクラスを指定します。[/en]
   */
  @Input('page') set page(page: Type<any>) {
    this.element.page = page;
  }

  constructor(
    private _elementRef: ElementRef,
    private _viewContainer: ViewContainerRef,
    private _resolver: ComponentFactoryResolver,
    private _injector: Injector) {
    this.element.pageLoader = this._createPageLoader();
  }

  get element() {
    return this._elementRef.nativeElement;
  }

  _createPageLoader() {
    return new ons.PageLoader(({page, parent, params}, done: Function) => {
      const injector = ReflectiveInjector.resolveAndCreate([
        {provide: Params, useValue: new Params(params || {})},
        {provide: OnsSplitterContent, useValue: this}
      ], this._injector);

      const factory = this._resolver.resolveComponentFactory(page);
      const pageComponentRef = this._viewContainer.createComponent(factory, 0, injector);
      const pageElement = pageComponentRef.location.nativeElement;

      this.element.appendChild(pageElement); // dirty fix to insert in correct position

      done({
        element: pageElement,
        unload: () => pageComponentRef.destroy()
      });
    });
  }
}
