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
  SimpleChange,
  forwardRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * @element ons-range
 * @directive OnsRange
 * @selector ons-range
 * @description
 *   [en]Angular directive for `<ons-range>` component.[/en]
 *   [ja]`<ons-range>`要素のAngularディレクティブです。[/en]
 * @example
 *   <ons-range [(value)]="foo"></ons-range>
 */
@Directive({
  selector: 'ons-range',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OnsRange),
      multi: true,
    }
  ]
})
export class OnsRange implements OnChanges, OnDestroy, ControlValueAccessor {
  private _element: any;
  private _boundOnChange: Function;
  private _propagateChange = (_: any) => { };

  /**
   * @input value
   * @type {string}
   * @desc
   *   [en]Input value of the `<ons-range>` element..[/en]
   *   [ja]`ons-range`要素に対する入力値を指定します。[/ja]
   */
  @Input('value') _value: string;

  /**
   * @output valueChange
   * @type {string}
   * @desc
   *   [en]Triggers when the value is changed.[/en]
   *   [ja]値が変更された時に発火します。[/ja]
   */
  @Output('valueChange') _valueChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(private _elementRef: ElementRef) {
    this._boundOnChange = this._onChange.bind(this);
    this._element = _elementRef.nativeElement;

    this._element.addEventListener('input', this._boundOnChange);
  }

  _onChange(event: any) {
    this._valueChange.emit(this._element.value);
    this._propagateChange(this._element.value);
  }

  ngOnChanges(changeRecord: {[key: string]: SimpleChange;}) {
    const value = changeRecord['_value'].currentValue;
    this._element.value = value;
  }

  get element(): any {
    return this._element;
  }

  get nativeElement(): any {
    return this._element;
  }

  ngOnDestroy() {
    this._element.removeEventListener('input', this._boundOnChange);

    this._element = null;
  }

  writeValue(obj: any) {
    this._element.value = obj;
  }
 
  registerOnChange(fn: any) {
     this._propagateChange = fn;
  }
 
  registerOnTouched() { }
}
