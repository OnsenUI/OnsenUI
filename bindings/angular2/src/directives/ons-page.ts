import {
  Directive,
  ElementRef,
  Type,
  Input,
  ViewContainerRef
} from '@angular/core';

@Directive({
  selector: 'ons-page'
})
export class OnsPage {
  protected _element: Element;

  constructor(elementRef: ElementRef) {
    this._element = elementRef.nativeElement;
  }

  get element(): Element {
    return this._element;
  }

}
