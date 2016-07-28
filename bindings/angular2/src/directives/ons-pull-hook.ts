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
 *    [ja]`<ons-pull-hook>`要素のためのAngular2ディレクティブです。[/ja]
 */
@Directive({
  selector: 'ons-pull-hook'
})
export class OnsPullHook implements OnDestroy {
  private _element: any;

  /**
   * @output action
   * @param {Object} $event
   * @param {Function} $event.done
   * @desc
   *   [en]Action to trigger.[/en]
   *   [ja]`ons-pull-hook`要素のアクションが必要なときに呼び出されます。[/ja]
   */
  @Output('action') action = new EventEmitter();

  /**
   * @output changestate
   * @param {Object} $event
   * @param {String} $event.state
   * @desc 
   *   [en][/en]
   *   [ja]`ons-pull-hook`要素の状態が変わった時に呼び出されます。[/ja]
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
