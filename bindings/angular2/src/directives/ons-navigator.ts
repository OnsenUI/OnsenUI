import {
  Component,
  Injector,
  ReflectiveInjector,
  Directive,
  ElementRef,
  ComponentRef,
  Type,
  ComponentFactoryResolver,
  Input,
  ViewContainerRef,
  OnDestroy
} from '@angular/core';
import {Params} from '../ons/params';

declare const ons: any;

export class NavigatorPage {
  constructor(
    public elementRef: ElementRef = null,
    public destroy: Function = function() {},
    public animator: any = null,
    public params: Params = new Params()) {
  }
}

/**
 * @element ons-navigator
 * @directive OnsNavigator
 * @selector ons-navigator
 * @codpen KgvAvx
 * @description
 *   [en]Angular 2 directive for `<ons-navigator>` component.[/en]
 *   [ja]`<ons-navigator>`要素のAngular 2ディレクティブです。[/ja]
 * @example
 *   @Component({
 *     selector: 'ons-page',
 *     template: `
 *       <ons-toolbar>
 *         <div class="center">Page</div>
 *       </ons-toolbar>
 *       <div class="content">...</div>
 *     `
 *   })
 *   class DefaultPageComponent { }
 *
 *   @Component({
 *     selector: 'navigator-app',
 *     template: `
 *     <ons-navigator [page]="page"></ons-navigator>
 *     `
 *   })
 *   export class AppComponent {
 *     page = DefaultPageComponent
 *   }
 */
@Directive({
  selector: 'ons-navigator'
})
export class OnsNavigator implements OnDestroy {
  private _lastPageLoader: Function;

  /**
   * @input page
   * @type {Type<any>}
   * @desc
   *   [en]Type of the page component.[/en]
   *   [ja]ページコンポーネントのクラスを指定します。[/ja]
   */
  @Input('page') set pageComponentType(page: Type<any>) {
    if (this.element.pages.length == 0) {
      this.element.pushPage(page);
    }
  }

  get element(): any {
    return this._elementRef.nativeElement;
  }

  constructor(
    private _elementRef: ElementRef,
    private _resolver: ComponentFactoryResolver,
    private _viewContainer: ViewContainerRef,
    private _injector: Injector) {
    this._lastPageLoader = this.element.pageLoader;
    this.element.pageLoader = this._createPageLoader();
  }

  _createPageLoader() {
    const componentRefMap:WeakMap<HTMLElement, ComponentRef<any>> = new WeakMap<HTMLElement, ComponentRef<any>>();

    return new ons.PageLoader(
      ({page, parent, params}, done: Function) => {
        const pageParams = new Params(params || {});
        const injector = ReflectiveInjector.resolveAndCreate([
          {provide: Params, useValue: pageParams},
          {provide: OnsNavigator, useValue: this}
        ], this._injector);

        const factory = this._resolver.resolveComponentFactory(page);
        const selector = 'ons-navigator';
        const pageComponentRef = factory.create(injector, null);
        this._viewContainer.insert(pageComponentRef.hostView);
        const pageElement = pageComponentRef.location.nativeElement;
        componentRefMap.set(pageElement, pageComponentRef);

        this.element.appendChild(pageElement); // dirty fix to insert in correct position

        done(pageElement);
      },
      element => {
        if (componentRefMap.has(element)) {
          componentRefMap.get(element).destroy();
          componentRefMap.delete(element);
        }
      }
    );
  }

  ngOnDestroy() {
    this.element.pageLoader = this._lastPageLoader;
  }
}

