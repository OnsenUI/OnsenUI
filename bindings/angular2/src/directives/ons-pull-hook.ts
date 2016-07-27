import {
  Directive,
  ElementRef,
  provide,
  Input,
  Output,
  OnDestroy,
  EventEmitter
} from '@angular/core';

/**
 * @element ons-pull-hook
 * @directive OnsPullHook
 * @selector ons-pull-hook
 * @description
 *    [en]Angular 2 directive for `<ons-pull-hook>` component.[/en]
 */
@Directive({
  selector: 'ons-pull-hook'
})
export class OnsPullHook implements OnDestroy {
  private _element: any;

  /**
   * @output action
   * @desc [en]Action to trigger.[/en]
   */
  @Output('action') action = new EventEmitter();

  /**
   * @output changestate
   * @desc [en][/en]
   */

  constructor(private _elementRef: ElementRef) {
    this._element = _elementRef.nativeElement;
    this._element.onAction = done => this.action.emit({done});
  }

  ngOnDestroy() {
    this._element.onAction = null;
    this._element = null;
  }
}
