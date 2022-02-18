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
  SimpleChanges,
  forwardRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * @element ons-switch
 * @directive OnsSwitch
 * @selector ons-switch
 * @description
 *   [en]Angular directive for `<ons-switch>` component.[/en]
 *   [ja]`<ons-switch>`要素のAngularディレクティブです。[/ja]
 * @example
 *   <ons-switch [(value)]="target"></ons-switch>
 */
@Directive({
  selector: 'ons-switch',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OnsSwitch),
      multi: true,
    }
  ]
})
export class OnsSwitch implements OnChanges, OnDestroy, ControlValueAccessor {
  private _element: any;
  private _boundOnChange: Function;
  private _propagateChange = (_: any) => { };
  private _propagateTouched = () => {};

  /**
   * @input value
   * @type {boolean}
   * @desc
   *   [en]Specify the value of the `<ons-switch>` component.[/en]
   *   [ja]`ons-switch`コンポーネントに設定する値を指定します。[/ja]
   */
  @Input('value') set value(target: boolean) {
    this._element.checked = !!target;
  }

  /**
   * @output valueChange
   * @type {string}
   * @desc
   *   [en]Triggers when the value is changed.[/en]
   *   [ja]値が変更された時に発火します。[/ja]
   */
  @Output('valueChange') _valueChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private _elementRef: ElementRef) {
    this._boundOnChange = this._onChange.bind(this);
    this._element = _elementRef.nativeElement;

    this._element.addEventListener('change', this._boundOnChange);
  }

  _onChange(event: any) {
    this._valueChange.emit(this._element.checked);
    this._propagateChange(this._element.checked);
  }

  @HostListener('blur')
  _onBlur() {
    this._propagateTouched();
  }

  ngOnChanges(changeRecord: SimpleChanges) {
    const value = !!(<any>changeRecord).value.currentValue;
    this._element.checked = value;
  }

  get element(): any {
    return this._element;
  }

  get nativeElement(): any {
    return this._element;
  }

  ngOnDestroy() {
    this._element.removeEventListener('change', this._boundOnChange);
    this._element = null;
  }

  writeValue(obj: any) {
    this._element.checked = obj;
  }

  registerOnChange(fn: any) {
    this._propagateChange = fn;
  }

  registerOnTouched(fn: any) {
    this. _propagateTouched = fn;
  }
}
