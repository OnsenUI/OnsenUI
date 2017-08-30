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
 * @element ons-checkbox
 * @directive OnsCheckbox
 * @selector ons-checkbox
 * @description
 *   [en]Angular directive for `<ons-checkbox>` component.[/en]
 *   [ja]`<ons-checkbox>`要素のAngularディレクティブです。[/ja]
 * @example
 *   <ons-checkbox [(ngModel)]="selectedItems"></ons-checkbox>
 */
@Directive({
  selector: 'ons-checkbox',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OnsCheckbox),
      multi: true,
    }
  ]
})
export class OnsCheckbox implements OnDestroy, ControlValueAccessor {
  private _element: any;
  private _boundOnChange: Function;
  private _state: any[] | boolean;
  private _propagateChange = (_: any) => { };
  
  constructor(private _elementRef: ElementRef) {
    this._boundOnChange = this._onChange.bind(this);
    this._element = _elementRef.nativeElement;

    this._element.addEventListener('change', this._boundOnChange);
  }
  
  _onChange(event: any) {
    const { value, checked } = event.target;
    let newValue;

    if (this._state instanceof Array) {
      // Is Array
      const index = this._state.indexOf(value);
      const included = index >= 0;

      if (included && !checked) {
        newValue = [
          ...this._state.slice(0, index),
          ...this._state.slice(index + 1, this._state.length)
        ];
      }

      if (!included && checked) {
        newValue = [ ...this._state, value ];
      }

    } else {
      // Is Boolean
      newValue = checked;
    }

    // Emit if value changed
    if (newValue !== undefined) {
      this._state = newValue;
      this._propagateChange(this._state);
    }
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
    this._state = obj;
    if (obj instanceof Array) {
      this._element.checked = obj.indexOf(this._element.value) >= 0;
    } else {
      this._element.checked = obj;
    }
  }

  registerOnChange(fn: any) {
      this._propagateChange = fn;
  }

  registerOnTouched() { }
}
