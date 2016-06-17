import {
  Component,
  DynamicComponentLoader,
  Injector,
  Directive,
  ElementRef,
  Type,
  provide,
  NgZone,
  Renderer,
  Input
} from '@angular/core';

interface CarouselElement {}

/**
 * @element ons-carousel
 */
@Directive({
  selector: 'ons-carousel'
})
export class OnsCarousel {
  private _carousel: CarouselElement;

  constructor(private _elementRef: ElementRef) {
    this._carousel = _elementRef.nativeElement;
  }

  get element(): any {
    return this._carousel;
  }
}
