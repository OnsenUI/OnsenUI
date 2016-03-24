import {
  Component,
  DynamicComponentLoader,
  Injector,
  Directive,
  ElementRef,
  Type,
  Compiler,
  provide,
  NgZone,
  AppViewManager,
  Renderer,
  ResolvedProvider,
  Input
} from 'angular2/core';

interface CarouselElement {}

/**
 * @element ons-navigator
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
