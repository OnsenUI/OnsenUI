import {
  Component,
  Injector,
  Directive,
  ElementRef,
  Input,
  Output,
  HostListener,
  EventEmitter,
  OnChanges,
  OnDestroy,
  SimpleChange,
  forwardRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * @element ons-input
 * @directive OnsInput
 * @selector ons-input
 * @description
 *   [en]Angular directive for `<ons-input>` component.[/en]
 *   [ja]`<ons-input>`要素のAngularディレクティブです。[/ja]
 * @example
 *   <ons-input [(value)]="value"></ons-input>
 */
@Directive({
  selector: 'ons-input',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OnsInput),
      multi: true,
    }
  ]
})
export class OnsInput implements OnChanges, OnDestroy, ControlValueAccessor {
  private _element: any;
  private _boundOnChange: Function;
  private _propagateChange = (_: any) => { };
  private _propagateTouched = () => {};

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

  _onChange(event: any) {
    this._valueChange.emit(this._element.value);
    this._propagateChange(this._element.value);
  }

  @HostListener('blur')
  _onBlur() {
    this._propagateTouched();
  }

  ngOnChanges(changeRecord: {[key: string]: SimpleChange;}) {
    const value = changeRecord['_value'].currentValue;
    if (this._element.value !== value) {
      this._element.value = value;
    }
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
 
  registerOnTouched(fn: any) {
    this. _propagateTouched = fn;
  }
}
