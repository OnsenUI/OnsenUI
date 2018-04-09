import {
  Component,
  Injector,
  Directive,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  forwardRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as ons from 'onsenui';

/**
 * @element ons-select
 * @directive OnsSelect
 * @selector ons-select
 * @description
 *   [en]Angular directive for `<ons-select>` component.[/en]
 *   [ja]`<ons-select>`要素のAngularディレクティブです。[/ja]
 * @example
 *   <ons-select [(ngModel)]="selectedValue">
 *     <option value="Item A">Item A</option>
 *     <option value="Item B">Item B</option>
 *     <option value="Item C">Item C</option>
 *   </ons-select>
 */
@Directive({
  selector: 'ons-select',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OnsSelect),
      multi: true,
    }
  ]
})
export class OnsSelect implements OnDestroy, ControlValueAccessor {
  private _element: any;
  private _boundOnChange: Function;
  private _propagateChange = (_: any) => { };

  constructor(private _elementRef: ElementRef) {
    this._boundOnChange = this._onChange.bind(this);
    this._element = _elementRef.nativeElement;

    this._element.addEventListener('change', this._boundOnChange);
  }

  _onChange(event: any) {
    this._propagateChange(event.target.value);
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
    this._element.value = obj;
  }

  registerOnChange(fn: any) {
    this._propagateChange = fn;
  }

  registerOnTouched() { }
}
