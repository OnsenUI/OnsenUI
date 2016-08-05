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
   * @method show
   * @signature show()
   * @return Promise<any>
   */
  show() {
    return this._onsAlertDialog.show();
  }

  /**
   * @method hide
   * @signature hide()
   * @return Promise<any>
   */
  hide() {
    return this._onsAlertDialog.hide();
  }

  /**
   * @method destroy
   * @signature destroy()
   * @return Promise<any>
   */
  destroy() {
    return this._onsAlertDialog.destroy();
  }

  /**
   * @return {Element}
   */
  get element(): any {
    return this._onsAlertDialog;
  }
}

