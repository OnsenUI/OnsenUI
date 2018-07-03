import {
  Component,
  ComponentRef,
  ViewContainerRef,
  ComponentFactoryResolver,
  Injector,
  Directive,
  ElementRef,
  Type,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  NgZone
} from '@angular/core';
import * as ons from 'onsenui';

/**
 * @element ons-tabbar
 * @directive OnsTabbar
 * @selector ons-tabbar
 * @description
 *   [en]Angular directive for `<ons-tabbar>` component.[/en]
 *   [ja]`<ons-tabbar>`要素のためのディレクティブです。[/ja]
 * @example
 *   @Component({
 *     selector: 'ons-page',
 *     template: `
 *       <ons-toolbar>
 *         <div class="center">Page</div>
 *       </ons-toolbar>
 *       <div class="content">...</div>
 *     `
 *   })
 *   class PageComponent {
 *   }
 *
 *   @Component({
 *     selector: 'app',
 *     template: `
 *     <ons-tabbar swipeable (swipe)="onSwipe($event)">
 *       <div class="tabbar__content"></div>
 *       <div class="tabbar">
 *         <ons-tab label="Page1" icon="ion-home" [page]="page" active></ons-tab>
 *         <ons-tab label="Page2" icon="ion-help" [page]="page"></ons-tab>
 *         <ons-tab label="Page3" icon="ion-stop" [page]="page"></ons-tab>
 *       </div>
 *     </ons-tabbar>
 *     `
 *   })
 *   export class AppComponent {
 *     page = PageComponent
 * 
 *     onSwipe(event) {
 *       console.log(event);
 *     }
 *   }
 */
@Directive({
  selector: 'ons-tabbar'
})
export class OnsTabbar {
  private _element: any;

  /**
   * @output swipe
   * @param {Object} $event
   * @param {number} $event.index
   * @param {Object} $event.options
   * @desc
   *   [en]Triggers when the tabbar is swiped.[/en]
   *   [ja]`<ons-tabbar>`がスワイプされた時に発火します。[/ja]
   */
  @Output('swipe') _swipe = new EventEmitter();

  constructor(private _elementRef: ElementRef) {
    this._element = _elementRef.nativeElement;
    this._element.onSwipe = (index: number, options: any) => this._swipe.emit({index, options});
  }
}

/**
 * @element ons-tab
 * @directive OnsTab
 * @selector ons-tab
 * @description
 *   [en]Angular directive for `<ons-tab>` component.[/en]
 *   [ja]`<ons-tab>`要素のためのディレクティブです。[/ja]
 * @example
 *   @Component({
 *     selector: 'ons-page',
 *     template: `
 *       <ons-toolbar>
 *         <div class="center">Page</div>
 *       </ons-toolbar>
 *       <div class="content">...</div>
 *     `
 *   })
 *   class PageComponent {
 *   }
 *
 *   @Component({
 *     selector: 'app',
 *     template: `
 *     <ons-tabbar>
 *       <div class="tabbar__content"></div>
 *       <div class="tabbar">
 *         <ons-tab label="Page1" icon="ion-home" [page]="page" active></ons-tab>
 *         <ons-tab label="Page2" icon="ion-help" [page]="page"></ons-tab>
 *         <ons-tab label="Page3" icon="ion-stop" [page]="page"></ons-tab>
 *       </div>
 *     </ons-tabbar>
 *     `
 *   })
 *   export class AppComponent {
 *     page = PageComponent
 *   }
 */
@Directive({
  selector: 'ons-tab'
})
export class OnsTab implements OnDestroy {
  private _pageComponent: ComponentRef<any> | null = null;

  /**
   * @input page
   * @type {Type<any>}
   * @desc
   *   [en]Specify the page component that is displayed when the tab is active.[/en]
   *   [ja]読み込むページコンポーネントを指定します。[/ja]
   */
  @Input('page') set page(pageComponentType: Type<any>) {
    this._elementRef.nativeElement.page = pageComponentType;
  }

  constructor(private _elementRef: ElementRef,
    private _viewContainer: ViewContainerRef,
    private _resolver: ComponentFactoryResolver,
    private _zone: NgZone) {
    // set up ons-tab's page loader
    this._elementRef.nativeElement.pageLoader = this._createPageLoader();
  }

  _createPageLoader() {
    const PageLoader = <any>ons.PageLoader;
    return new PageLoader(
      ({page, parent}: any, done: Function) => {
        this._zone.run(() => {
          const factory = this._resolver.resolveComponentFactory(page);
          const pageComponentRef = this._viewContainer.createComponent(factory, 0);

          if (this._pageComponent) {
            this._pageComponent.destroy();
          }
          this._pageComponent = pageComponentRef;

          const pageElement = pageComponentRef.location.nativeElement;
          parent.appendChild(pageElement); // dirty fix to insert in correct position

          done(pageElement);
        });
      },
      () => {
        if (this.hasOwnProperty('_pageComponent')) {
          if (this._pageComponent) {
            this._pageComponent.destroy();
            this._pageComponent = null;
          }
        }
      }
    );
  }

  ngOnDestroy() {
    if (this._pageComponent) {
      this._pageComponent.destroy();
      this._pageComponent = null;
    }
  }
}

