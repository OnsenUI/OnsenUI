import {
  Component,
  Injector,
  Directive,
  ElementRef,
  provide,
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
 *    [en]Angular 2 directive for `<ons-input>` component.[/en]
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
   * @desc [en]Input value.[/en]
   */
  @Input('value') _value: string;

  /**
   * @output valueChange
   * @type {string}
   * @desc [en]Triggers when the value is changed.[/en]
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
