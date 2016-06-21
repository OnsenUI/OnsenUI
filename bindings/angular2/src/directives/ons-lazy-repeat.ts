import {
  Directive,
  ElementRef,
  provide,
  Input,
  Output,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
  DoCheck,
  IterableDiffer,
  ChangeDetectorRef
} from '@angular/core';

export class ItemContext {
  constructor(public $implicit: any, public index: number, public count: number) {
  }
}

/**
 * @element ons-lazy-repeat
 * @directive OnsLazyRepeat
 * @selector ons-lazy-repeat
 * @description
 *    [en]Angular 2 directive for `<ons-lazy-repeat>` component.[/en]
 */
@Directive({
  selector: '[onsLazyRepeat]'
})
export class OnsLazyRepeat implements OnDestroy, OnInit {
  private _element: any;
  private _provider: any;
  private _onsLazyRepeatOf: any;

  constructor(
    private _elementRef: ElementRef,
    private _templateRef: TemplateRef<ItemContext>,
    private _viewContainer: ViewContainerRef) {
  }

  ngOnInit() {
  }

  /**
   * @input value
   * @type {string}
   * @desc [en]Input value.[/en]
   */
  @Input() set onsLazyRepeatOf(value: any) {
    this._onsLazyRepeatOf = value;

    this._provider = new (<any>ons)._internal.LazyRepeatProvider(
      this._elementRef.nativeElement.parentElement,
      new (<any>ons)._internal.LazyRepeatDelegate({
        loadItemElement: (index, parent, done) => {
          this._loadItemTemplate(index, parent, done);
        },
        countItems: () => {
          return this._onsLazyRepeatOf.length;
        }
      })
    );
  }

  _loadItemTemplate(index, parent, done) {
    const context = new ItemContext(this._onsLazyRepeatOf[index], index, this._onsLazyRepeatOf.length);
    const view = this._viewContainer.createEmbeddedView(this._templateRef, context);
    // dirty fix on createEmbeddedView() does not insert DOM element randomly.
    parent.appendChild(view.rootNodes[0]); 

    done(view.rootNodes[0]);
  }

  /**
   * @method refresh
   * @signature refresh()
   * @return Promise<any>
   */
  refresh() {
    if (this._provider) {
      this._viewContainer.clear();
      this._provider.refresh();
    }
  }

  ngOnDestroy() {
    if (this._provider) {
      this._provider.destroy();
    }
    this._viewContainer.clear();
    this._provider = null;
  }
}
