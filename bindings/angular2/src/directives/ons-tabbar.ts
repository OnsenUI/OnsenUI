import {
  Component,
  ComponentRef,
  ViewContainerRef,
  ComponentFactoryResolver,
  Injector,
  Directive,
  ElementRef,
  Type,
  Input,
  OnDestroy
} from '@angular/core';

declare var ons: any;

/**
 * @element ons-tab
 * @directive OnsTab
 * @selector ons-tab
 * @description
 *   [en]Angular 2 directive for `<ons-tab>` component.[/en]
 *   [ja]`<ons-tab>`要素のためのディレクティブです。[/ja]
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
 *   class PageComponent {
 *   }
 *
 *   @Component({
 *     selector: 'app',
 *     template: `
 *     <ons-tabbar>
 *       <div class="tab-bar__content"></div>
 *       <div class="tab-bar">
 *         <ons-tab label="Page1" icon="ion-home" [page]="page" active></ons-tab>
 *         <ons-tab label="Page2" icon="ion-help" [page]="page"></ons-tab>
 *         <ons-tab label="Page3" icon="ion-stop" [page]="page"></ons-tab>
 *       </div>
 *     </ons-tabbar>
 *     `
 *   })
 *   export class AppComponent {
 *     page = PageComponent
 *   }
 */
@Directive({
  selector: 'ons-tab'
})
export class OnsTab implements OnDestroy {
  private _pageComponent: ComponentRef<any> = null;

  /**
   * @input page
   * @type {Type<any>}
   * @desc
   *   [en]Specify the page component that is displayed when the tab is active.[/en]
   *   [ja]読み込むページコンポーネントを指定します。[/ja]
   */
  @Input('page') set page(pageComponentType: Type<any>) {
    this._elementRef.nativeElement.page = pageComponentType;
  }

  constructor(private _elementRef: ElementRef,
    private _viewContainer: ViewContainerRef,
    private _resolver: ComponentFactoryResolver) {

    // set up ons-tab's page loader
    this._elementRef.nativeElement.pageLoader = new ons.PageLoader(({page, parent}, done: Function) => {
      const factory = this._resolver.resolveComponentFactory(page);
      const pageComponentRef = this._viewContainer.createComponent(factory, 0);

      if (this._pageComponent) {
        this._pageComponent.destroy();
      }
      this._pageComponent = pageComponentRef;

      const pageElement = pageComponentRef.location.nativeElement;
      parent.appendChild(pageElement); // dirty fix to insert in correct position

      done({
        element: pageElement,
        unload: () => {
          pageComponentRef.destroy();
        }
      });
    });
  }

  ngOnDestroy() {
    if (this._pageComponent) {
      this._pageComponent.destroy();
    }
  }
}

