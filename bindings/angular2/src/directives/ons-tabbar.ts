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
  OnInit,
  OnDestroy
} from '@angular/core';

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
  private _tabbar: any;

  constructor(private _elementRef: ElementRef) {
    this._tabbar = _elementRef.nativeElement;
  }

  get element(): any {
    return this._tabbar;
  }
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
export class OnsTab implements OnInit, OnDestroy {
  private _pageComponent: ComponentRef<any> = null;
  private _pageComponentType: Type = null;

  constructor(private _elementRef: ElementRef,
    private _viewContainer: ViewContainerRef,
    private _resolver: ComponentResolver) {
  }

  @Input('page') set page(pageComponentType: Type) {
    this._pageComponentType = pageComponentType;
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    if (this._pageComponent) {
      this._pageComponent.destroy();
    }
  }

  get element(): any {
    return this._elementRef.nativeElement;
  }
}

