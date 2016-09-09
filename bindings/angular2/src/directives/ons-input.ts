import {
  Component,
  Injector,
  Directive,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  OnDestroy,
  SimpleChange
} from '@angular/core';

/**
 * @element ons-input
 * @directive OnsInput
 * @selector ons-input
 * @description
 *   [en]Angular 2 directive for `<ons-input>` component.[/en]
 *   [ja]`<ons-input>`要素のAngular 2ディレクティブです。[/ja]
 * @example
 *   <ons-input [(value)]="value"></ons-input>
 */
@Directive({
  selector: 'ons-input'
})
export class OnsInput implements OnChanges, OnDestroy {
  private _element: any;
  private _boundOnChange: Function;

  /**
   * @input value
   * @type {string}
   * @desc
   *   [en]Input value for the internal `<input>` element.[/en]
   *   [ja]内部の`input`要素に対する入力値を設定します。[/ja]
   */
  @Input('value') _value: string;

  /**
   * @output valueChange
   * @type {string}
   * @desc
   *   [en]Triggers when the value is changed.[/en]
   *   [ja]内部の`input`要素の値が変更された時に発火します。[/ja]
   */
  @Output('valueChange') _valueChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(private _elementRef: ElementRef) {
    this._boundOnChange = this._onChange.bind(this);
    this._element = _elementRef.nativeElement;

    this._element.addEventListener('input', this._boundOnChange);
  }

  _onChange(event) {
    this._valueChange.emit(this._element.value);
  }

  ngOnChanges(changeRecord: {[key: string]: SimpleChange;}) {
    const value = changeRecord['_value'].currentValue;
    this._element.value = value;
  }

  get element(): any {
    return this._element;
  }

  ngOnDestroy() {
    this._element.removeEventListener('change', this._boundOnChange);

    this._element = null;
  }
}
