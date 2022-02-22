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

/**
 * @element ons-radio
 * @directive OnsRadio
 * @selector ons-radio
 * @description
 *   [en]Angular directive for `<ons-radio>` component. You can use `[(ngModel)]` to synchronize the value of `[(ngModel)]` with the selected value.[/en]
 *   [ja]`<ons-radio>`要素のAngularディレクティブです。 `[(ngModel)]` を使用すると、 `[(ngModel)]` の値を選択された値と同期することができます。[/ja]
 * @example
 *   <ons-radio value="Item A" [(ngModel)]="selectedValue"></ons-radio>
 *   <ons-radio value="Item B" [(ngModel)]="selectedValue"></ons-radio>
 *   <ons-radio value="Item C" [(ngModel)]="selectedValue"></ons-radio>
 */
@Directive({
  selector: 'ons-radio',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OnsRadio),
      multi: true,
    }
  ]
})
export class OnsRadio implements OnDestroy, ControlValueAccessor {
  private _element: any;
  private _boundOnChange: Function;
  private _propagateChange = (_: any) => { };
  
  constructor(private _elementRef: ElementRef) {
    this._boundOnChange = this._onChange.bind(this);
    this._element = _elementRef.nativeElement;

    this._element.addEventListener('change', this._boundOnChange);
  }
  
  _onChange(event: any) {
    const { value, checked } = event.target;
    checked && this._propagateChange(value);
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
    this._element.checked = (obj === this._element.value);
  }

  registerOnChange(fn: any) {
      this._propagateChange = fn;
  }

  registerOnTouched() { }
}
