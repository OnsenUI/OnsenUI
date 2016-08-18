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
 * @element ons-alert-dialog
 * @directive OnsAlertDialog
 * @selector ons-alert-dialog
 * @description
 *    [en]Angular 2 directive for `<ons-alert-dialog>` component.[/en]
 */
@Directive({
  selector: 'ons-alert-dialog'
})
export class OnsAlertDialog {
  _onsAlertDialog: any;

  constructor(elementRef: ElementRef) {
    this._onsAlertDialog = elementRef.nativeElement;
  }

  /**
   * @return {Element}
   */
  get element(): any {
    return this._onsAlertDialog;
  }
}

