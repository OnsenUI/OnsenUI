import {
  Component,
  DynamicComponentLoader,
  Injector,
  Directive,
  ElementRef,
  Type,
  provide,
  NgZone,
  Renderer,
  Input
} from '@angular/core';

interface TabbarElement {}

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
  private _tabbar: TabbarElement;

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
export class OnsTab {
  private _tab: TabbarElement;

  constructor(private _elementRef: ElementRef) {
    this._tab = _elementRef.nativeElement;
  }

  get element(): any {
    return this._tab;
  }
}
