import {
  Directive,
  ElementRef,
  provide,
  Input,
  Output,
  OnDestroy,
  OnInit
} from '@angular/core';

@Directive({
  selector: 'ons-pull-hook'
})
export class OnsPullHook implements OnDestroy, OnInit {
  private _element: any;

  @Input() onAction: Function;

  constructor(private _elementRef: ElementRef) {
    this._element = _elementRef.nativeElement;
  }

  ngOnInit() {
    this._element.onAction = this.onAction;
  }

  ngOnDestroy() {
    this._element.onAction = null;
    this._element = null;
  }
}
