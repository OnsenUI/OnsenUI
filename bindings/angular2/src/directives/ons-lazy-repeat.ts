import {
  Directive,
  ElementRef,
  provide,
  Input,
  Output,
  OnDestroy,
  OnInit
} from 'angular2/core';

@Directive({
  selector: 'ons-lazy-repeat'
})
export class OnsLazyRepeat implements OnDestroy, OnInit {
  private _element: any;

  constructor(private _elementRef: ElementRef) {
    this._element = _elementRef.nativeElement;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }
}
