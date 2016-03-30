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

@Directive({
  selector: 'ons-popover'
})
export class OnsPopover {
  _onsPopover: any;

  constructor(elementRef: ElementRef) {
    this._onsPopover = elementRef.nativeElement;
  }

  /**
   * @return {Element}
   */
  get element(): any {
    return this._onsPopover;
  }
}

