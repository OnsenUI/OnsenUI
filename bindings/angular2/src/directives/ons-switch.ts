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
 * @element ons-switch
 * @directive OnsSwitch
 * @selector ons-switch
 * @description
 *    [en]Angular 2 directive for `<ons-switch>` component.[/en]
 */
@Directive({
  selector: 'ons-switch'
})
export class OnsSwitch implements OnChanges, OnDestroy {
  private _element: any;
  private _boundOnChange: Function;

  /**
   * @input page
   * @type {Type}
   * @desc [en]Page content.[/en]
   */
  @Input('value') _value: boolean;

  /**
   * @output valueChange
   * @type {string}
   * @desc [en]Triggers when the value is changed.[/en]
   */
  @Output('valueChange') _valueChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private _elementRef: ElementRef) {
    this._boundOnChange = this._onChange.bind(this);
    this._element = _elementRef.nativeElement;
    this._element.checkbox.addEventListener('change', this._boundOnChange);
  }

  _onChange(event) {
    this._valueChange.emit(this._element.checked);
  }

  ngOnChanges(changeRecord: {[key: string]: SimpleChange;}) {
    const value = !!changeRecord['_value'].currentValue;
    this._element.checked = value;
  }

  get element(): any {
    return this._element;
  }

  ngOnDestroy() {
    this._element.checkbox.removeEventListener('change', this._boundOnChange);
    this._element = null;
  }
}
