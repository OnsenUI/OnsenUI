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

