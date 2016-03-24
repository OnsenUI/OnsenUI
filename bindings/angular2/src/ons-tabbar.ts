import {
  Component,
  DynamicComponentLoader,
  Injector,
  Directive,
  ElementRef,
  Type,
  Compiler,
  provide,
  NgZone,
  AppViewManager,
  Renderer,
  ResolvedProvider,
  Input
} from 'angular2/core';

interface TabbarElement {}

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
