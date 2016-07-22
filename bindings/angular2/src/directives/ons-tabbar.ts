import {
  Component,
  ComponentRef,
  ViewContainerRef,
  ComponentResolver,
  Injector,
  Directive,
  ElementRef,
  Type,
  Input,
  OnDestroy
} from '@angular/core';

declare var ons: any;

/**
 * @element ons-tabbar
 * @directive OnsTabbar
 * @selector ons-tabbar
 * @description
 *    [en]Angular 2 directive for <ons-tabbar> component.[/en]
 */
@Directive({
  selector: 'ons-tabbar'
})
export class OnsTabbar {
}

/**
 * @element ons-tab
 * @directive OnsTab
 * @selector ons-tab
 * @description
 *    [en]Angular 2 directive for <ons-tab> component.[/en]
 */
@Directive({
  selector: 'ons-tab'
})
export class OnsTab implements OnDestroy {
  private _pageComponent: ComponentRef<any> = null;

  constructor(private _elementRef: ElementRef,
    private _viewContainer: ViewContainerRef,
    private _resolver: ComponentResolver) {

    // set up ons-tab's page loader
    this._elementRef.nativeElement.pageLoader = new ons.PageLoader(({page, parent}, done: Function) => {
      this._resolver.resolveComponent(page).then(factory => {
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
    });
  }

  @Input('page') set page(pageComponentType: Type) {
    this._elementRef.nativeElement.page = pageComponentType;
  }

  ngOnDestroy() {
    if (this._pageComponent) {
      this._pageComponent.destroy();
    }
  }
}

