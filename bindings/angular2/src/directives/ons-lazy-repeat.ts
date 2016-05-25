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
export class OnsLazyRepeat implements OnDestroy {
  private _element: any;

  constructor(private _elementRef: ElementRef) {
    this._element = _elementRef.nativeElement;
  }

  @Input() set delegate(delegate) {
    this._element.delegate = delegate;
  }

  refresh() {
    this._element.refresh();
  }

  ngOnDestroy() {
    this._element.delegate = null;
  }
}
