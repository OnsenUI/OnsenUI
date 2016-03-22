import {
  Component,
  DynamicComponentLoader,
  Injector,
  Directive,
  ElementRef,
  Type
} from 'angular2/core';

@Directive({
  selector: 'ons-navigator',
  providers: []
})
export class OnsNavigator {
  _navigator: Element;

  constructor(elementRef: ElementRef) {
    this._navigator = elementRef.nativeElement;
  }

  pushComponent(type: Type) {
    console.log("this is push component");
  }
}

