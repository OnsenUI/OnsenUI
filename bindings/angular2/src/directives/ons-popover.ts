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

/**
 * @element ons-popover
 * @directive OnsPopover
 * @selector ons-popover
 * @description
 *    [en]Angular 2 directive for `<ons-popover>` component.[/en]
 */
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

