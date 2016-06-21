import {
  Directive,
  ElementRef,
  provide,
  Input,
  Output,
  OnDestroy,
  OnInit
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
export class OnsPullHook implements OnDestroy, OnInit {
  private _element: any;

  /**
   * @input onAction
   * @type {Function}
   * @desc [en]Action to trigger.[/en]
   */
  @Input() onAction: Function;

  constructor(private _elementRef: ElementRef) {
    this._element = _elementRef.nativeElement;
  }

  ngOnInit() {
    this._element.onAction = this.onAction;
  }

  ngOnDestroy() {
    this._element.onAction = null;
    this._element = null;
  }
}
