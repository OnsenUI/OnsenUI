import {
  Directive,
  ElementRef,
  Type,
  Input,
  ViewContainerRef
} from '@angular/core';

/**
 * @element ons-page
 * @directive OnsPage
 * @selector ons-page
 * @description
 *    [en]Angular 2 directive for `<ons-page>` component.[/en]
 */
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
