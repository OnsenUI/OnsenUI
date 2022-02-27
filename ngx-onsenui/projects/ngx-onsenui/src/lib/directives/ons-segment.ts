import {
  Component,
  Directive,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  OnChanges
} from '@angular/core';

/**
 * @element ons-segment
 * @directive OnsSegment
 * @selector ons-segment
 * @description
 *   [en]Angular directive for `<ons-segment>` component.[/en]
 *   [ja]`<ons-segment>`要素のAngularディレクティブです。[/ja]
 * @example
 *   @Component({
 *     selector: 'app',
 *     template: `
 *       <ons-page>
 *         <ons-toolbar>
 *           <div class="center">
 *             <ons-segment style="width: 280px; margin-top: 8px;" [tabbar]="tabbar" (postchange)="onPostChange($event)">
 *               <button>Page 1</button>
 *               <button>Page 2</button>
 *               <button>Page 3</button>
 *             </ons-segment>
 *           </div>
 *         </ons-toolbar>
 *         <ons-tabbar #tabbar>
 *           <ons-tab [page]="page1" active></ons-tab>
 *           <ons-tab [page]="page2"></ons-tab>
 *           <ons-tab [page]="page3"></ons-tab>
 *         </ons-tabbar>
 *       </ons-page>
 *     `
 *   })
 *   export class AppComponent {
 *     page1 = PageComponent;
 *     page2 = PageComponent;
 *     page3 = PageComponent;
 *
 *     constructor() {}
 *
 *     onPostChange(event: any) {
 *      console.log('postchange event', event);
 *     }
 *   }
 *
 *   @Component({
 *     selector: 'ons-page[tab]',
 *     template: `<h2>Page</h2>`
 *   })
 *   export class PageComponent {
 *     constructor() { }
 *   }
 */
@Directive({
  selector: 'ons-segment'
})
export class OnsSegment implements OnChanges {
  private _element: any;

  /**
   * @output postchange
   * @param {Object} $event
   * @param {number} $event.index
   * @desc
   *   [en]Triggers when the index of the active button is changed.[/en]
   *   [ja]`ons-segment`要素のアクティブなボタンのインデックスが変わった時に呼び出されます。[/ja]
   */

  /**
   * @input activeIndex
   * @type {number}
   * @desc
   *   [en]Input index of the active button.[/en]
   *   [ja]アクティブなボタンのインデックスを設定します。[/ja]
   */
  @Input() activeIndex: number;

  /**
   * @output activeIndexChange
   * @type {number}
   * @desc
   *   [en]Triggers when the index of the active button is changed.[/en]
   *   [ja]アクティブなボタンのインデックスが変化した時に発火します。[/ja]
   */
  @Output() activeIndexChange = new EventEmitter<number>();

  /**
   * @input tabbar
   * @type {Type<any>}
   * @desc
   *   [en]The tabbar component to "connect" to the segment. Must be inside the same page. Works only during initialization.[/en]
   *   [ja]このセグメントに紐づけるタブバーを指定します。タブバーはセグメントと同一ページ内に存在する必要があります。初期化時にのみ動作します。[/ja]
   */
  @Input() set tabbar(_tabbar: any) {
    this._element._tabbar = _tabbar;
    this._element._tabbar.setAttribute('hide-tabs', '');
    setImmediate(() => this._element._setChecked(this._element._tabbar.getActiveTabIndex()));
    this._element._tabbar.addEventListener('prechange', this._element._onTabbarPreChange);
  }

  constructor(private _elementRef: ElementRef) {
    this._element = _elementRef.nativeElement;
    this._element.addEventListener('postchange', (event: any) => {
      this.activeIndexChange.emit(event.index);
    });
  }

  ngOnChanges() {
    if (this.activeIndex) {
      this._element.setActiveButton(this.activeIndex);
    }
  }

}
