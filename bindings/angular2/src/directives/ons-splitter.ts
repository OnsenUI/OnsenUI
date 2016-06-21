import {
  Type,
  ComponentRef,
  Injector,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewContainerRef,
  ComponentResolver
} from '@angular/core';


export class BasePageLoaderDirectiveImpl implements OnInit, OnDestroy {
  public pageComponentType: Type;
  private _pageComponent: ComponentRef<any>;

  constructor(
    private _elementRef: ElementRef,
    private _viewContainer: ViewContainerRef,
    private _resolver: ComponentResolver) {
  }

  ngOnInit() {
    if (this.pageComponentType) {
      this._resolver.resolveComponent(this.pageComponentType).then(factory => {
        if (this._pageComponent) {
          this._pageComponent.destroy();
        }
        this._pageComponent = this._viewContainer.createComponent(factory, 0, this._viewContainer.injector);

        // dirty fix to insert in correct position
        const pageElement = this._pageComponent.location.nativeElement
        this._elementRef.nativeElement.appendChild(pageElement);
      });
    }
  }

  ngOnDestroy() {
    if (this._pageComponent) {
      this._pageComponent.destroy();
      this._pageComponent = null;
    }
  }
}

/**
 * @element ons-splitter-side
 * @directive OnsSplitterSide
 * @selector ons-splitter-side
 * @description
 *    [en]Angular 2 directive for `<ons-splitter-side>` component.[/en]
 */
@Directive({
  selector: 'ons-splitter-side'
})
export class OnsSplitterSide extends BasePageLoaderDirectiveImpl {

  /**
   * @input page
   * @type {Type}
   * @desc [en]Page content.[/en]
   */
  @Input('page') pageComponentType: Type;

  constructor(
    _elementRef: ElementRef,
    _viewContainer: ViewContainerRef,
    _resolver: ComponentResolver) {
      super(_elementRef, _viewContainer, _resolver);
  }
}

/**
 * @element ons-splitter-content
 * @directive OnsSplitterContent
 * @selector ons-splitter-content
 * @description
 *    [en]Angular 2 directive for `<ons-splitter-content>` component.[/en]
 */
@Directive({
  selector: 'ons-splitter-content'
})
export class OnsSplitterContent extends BasePageLoaderDirectiveImpl {
  /**
   * @input page
   * @type {Type}
   * @desc [en]Page content.[/en]
   */
  @Input('page') pageComponentType: Type;

  constructor(
    _elementRef: ElementRef,
    _viewContainer: ViewContainerRef,
    _resolver: ComponentResolver) {
      super(_elementRef, _viewContainer, _resolver);
  }
}
