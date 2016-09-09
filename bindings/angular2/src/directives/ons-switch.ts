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
  SimpleChanges
} from '@angular/core';

/**
 * @element ons-switch
 * @directive OnsSwitch
 * @selector ons-switch
 * @description
 *   [en]Angular 2 directive for `<ons-switch>` component.[/en]
 *   [ja]`<ons-switch>`要素のAngular 2ディレクティブです。[/ja]
 * @example
 *   <ons-switch [(value)]="target"></ons-switch>
 */
@Directive({
  selector: 'ons-switch'
})
export class OnsSwitch implements OnChanges, OnDestroy {
  private _element: any;
  private _boundOnChange: Function;

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
    this._element.checkbox.addEventListener('change', this._boundOnChange);
  }

  _onChange(event) {
    this._valueChange.emit(this._element.checked);
  }

  ngOnChanges(changeRecord: SimpleChanges) {
    const value = !!(<any>changeRecord).value.currentValue;
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
