import {
  Component,
  Directive,
  Type,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  OnChanges,
  AfterViewInit,
  SimpleChange
} from '@angular/core';
import * as ons from 'onsenui';

/**
 * @element ons-segment
 * @directive OnsSegment
 * @selector ons-segment
 * @description
 *   [en]Angular directive for `<ons-segment>` component.[/en]
 *   [ja]`<ons-segment>`要素のためのディレクティブです。[/ja]
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
 *     <ons-page>
 *       <ons-toolbar>
 *         <div class="center">
 *           <ons-segment tabbar-id="myTabbar" [index]="index" style="width: 180px;">
 *             <div class="segment__item" *ngFor="let i of [0, 1, 2]">
 *               <input type="radio" class="segment__input" [attr.value]="i">
 *               <div class="segment__button">Page {{i+1}}</div>
 *             </div>
 *           </ons-segment>
 *         </div>
 *       </ons-toolbar>
 *       <div class="background"></div>
 *       <div class="content">
 *         <ons-tabbar id="myTabbar">
 *           <div class="tabbar__content"></div>
 *           <div class="tabbar">
 *             <ons-tab label="Page1" icon="ion-home" [page]="page" active></ons-tab>
 *             <ons-tab label="Page2" icon="ion-help" [page]="page"></ons-tab>
 *             <ons-tab label="Page3" icon="ion-stop" [page]="page"></ons-tab>
 *           </div>
 *         </ons-tabbar>
 *       </div>
 *     </ons-page>
 *   `
 *   })
 *   export class AppComponent {
 *     index = 1;
 *     page = PageComponent;
 *   }
 */
@Directive({
  selector: 'ons-segment'
})
export class OnsSegment implements OnChanges, AfterViewInit {
  private _element: any;
  private _beforeAfterViewInit: boolean = true;

  /**
   * @input index
   * @type {number}
   * @desc
   *   [en]Input index of the active button.[/en]
   *   [ja]アクティブなボタンのインデックスを設定します。[/ja]
   */
  @Input('index') _index: number;
  
  /**
   * @output indexChange
   * @type {string}
   * @desc
   *   [en]Triggers when the index of the active button is changed.[/en]
   *   [ja]アクティブなボタンのインデックスが変化した時に発火します。[/ja]
   */
  @Output('indexChange') _indexChange: EventEmitter<number> = new EventEmitter<number>();

  // /**
  //  * @input tabbar
  //  * @type {Type<any>}
  //  * @desc
  //  *   [en]The tabbar component to "connect" to the segment. Must be inside the same page. Works only during initialization.[/en]
  //  *   [ja]このセグメントに紐づけるタブバーを指定します。タブバーはセグメントと同一ページ内に存在する必要があります。初期化時にのみ動作します。[/ja]
  //  */
  // @Input('tabbar') _tabbar: Type<any>;

  private _tryToChangeSegmentIndex(newIndex: number) {
    if (newIndex !== this._element.getActiveButtonIndex()) { // Relay index from Angular layer to Web Components layer
      // When this statement is first evaluated, the ons-segment element might not be compiled,
      // so contentReady is required in this case
      (<any>ons)._contentReady(this._element, () => {
        this._element.setActiveButton(newIndex, { reject: false });
      });
    }
  }
  
  constructor(private _elementRef: ElementRef) {
    this._element = _elementRef.nativeElement;

    this._element.addEventListener('postchange', () => { // Relay index from Web Components layer to Angular layer
      this._indexChange.emit(this._element.getActiveButtonIndex())
    });

    // if (this._element.getAttribute('tabbar-id') != null) {
    //   console.warn('[ngx-onsenui] `tabbar-id` attribute of `ons-segment` should not be used in ngx-onsenui. Please use `[tabbar]` property instead.');
    // }
  }

  ngOnChanges(changeRecord: {[key: string]: SimpleChange;}) {
    // When [index] is changed
    if (changeRecord['_index']) {
      do {
        if (this._beforeAfterViewInit) {
          // If we call setActiveButton before AfterViewInit,
          // NgFor is not executed and therefore the content of ons-segment might not be ready, 
          // so we have to reject the changes before AfterViewInit.
          break;
        }

        const newIndex = changeRecord['_index'].currentValue;
        this._tryToChangeSegmentIndex(newIndex);
      } while(false);
    }

    // The current implementation of ons-segment (2.7.0) reads `tabbar-id` attribute too early (in connectedCallback).
    // If we want to wrap `tabbar-id` attribute with `[tabbar]` property,
    // ons-segment has to provide a feature to change `tabbar-id` dynamically.

    // When [tabbar] is changed
    // if (changeRecord['_tabbar']) {
    //   const newTabbar = changeRecord['_tabbar'].currentValue;
    //   if (this._element.getAttribute('tabbar-id') == null) { // First tabbar change
    //     const generatedTabbarId = (Math.random().toString(16)+'00000000000000000').slice(2, 10); // Generate random 8 hex digits
  
    //     if (newTabbar.id != null && newTabbar.id != '') { // If the specified tabbar already has an id
    //       console.error(`[ngx-onsenui] The specified tabbar already has an id \`${newTabbar.id}\`. The id will be replaced with \`${generatedTabbarId}\``);
    //     }
    //     newTabbar.id = generatedTabbarId; // <ons-tabbar id="{{generatedTabbarId}}">
    //     this._element.setAttribute('tabbar-id', generatedTabbarId); // <ons-segment tabbar-id="{{generatedTabbarId}}">
    //   } else { // Reject tabbar changes after initialization
    //     console.warn('[ngx-onsenui] `[tabbar]` property cannot be changed after initialization.');
    //   }
    // }
  }

  ngAfterViewInit() {
    // Process of NgFor is done between ngOnInit and ngAfterViewInit.
    // If the part or the entire of the content in ons-segment element is created by NgFor and
    // we need to access the content, we have to wait until ngAfterViewInit.
    this._beforeAfterViewInit = false;

    // Process the initial value of `index` property here.
    // After this, ngOnChanges relays each change of `index` property from Angular layer to Web Components layer.
    this._tryToChangeSegmentIndex(this._index);
  }
}

