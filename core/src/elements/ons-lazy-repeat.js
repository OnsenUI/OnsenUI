/*
Copyright 2013-2015 ASIAL CORPORATION
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
   http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import BaseElement from './base/base-element';
import util from '../ons/util';
import {LazyRepeatDelegate, LazyRepeatProvider} from '../ons/internal/lazy-repeat';

/**
 * @element ons-lazy-repeat
 * @category list
 * @description
 *   [en]
 *     Using this component a list with millions of items can be rendered without a drop in performance.
 *     It does that by "lazily" loading elements into the DOM when they come into view and
 *     removing items from the DOM when they are not visible.
 *   [/en]
 *   [ja]
 *     このコンポーネント内で描画されるアイテムのDOM要素の読み込みは、画面に見えそうになった時まで自動的に遅延され、
 *     画面から見えなくなった場合にはその要素は動的にアンロードされます。
 *     このコンポーネントを使うことで、パフォーマンスを劣化させること無しに巨大な数の要素を描画できます。
 *   [/ja]
 * @codepen QwrGBm
 * @tutorial vanilla/Reference/lazy-repeat
 * @seealso ons-list
 *   [en]The `<ons-list>` element is used to render a list.[/en]
 *   [ja]`<ons-list>`要素はリストを描画するのに使われます。[/ja]
 * @guide infinite-scroll
 *   [en]Loading more items on infinite scroll[/en]
 *   [ja]Loading more items on infinite scroll[/ja]
 * @example
 * <script>
 *   window.addEventListener('load', function() {
 *     var lazyRepeat = document.querySelector('#list');
 *     lazyRepeat.delegate = {
 *      createItemContent: function(i, template) {
 *        var dom = template.cloneNode(true);
 *        dom.innerText = i;
 *
 *        return dom;
 *      },
 *      countItems: function() {
 *        return 10000000;
 *      },
 *      destroyItem: function(index, item) {
 *        console.log('Destroyed item with index: ' + index);
 *      }
 *     };
 *   });
 * </script>
 *
 * <ons-list id="list">
 *   <ons-lazy-repeat>
 *     <ons-list-item></ons-list-item>
 *   </ons-lazy-repeat>
 * </ons-list>
 */
export default class LazyRepeatElement extends BaseElement {

  connectedCallback() {
    // not very good idea and also not documented
    if (this.hasAttribute('delegate')) {
      this.delegate = window[this.getAttribute('delegate')];
    }
  }

  /**
   * @property delegate
   * @type {Object}
   * @description
   *  [en]Specify a delegate object to load and unload item elements.[/en]
   *  [ja]要素のロード、アンロードなどの処理を委譲するオブジェクトを指定します。[/ja]
   */

  /**
   * @property delegate.createItemContent
   * @type {Function}
   * @description
   *   [en]
   *     This function should return a `HTMLElement`.
   *
   *     To help rendering the element, the current index and a template is supplied as arguments. The template is the initial content of the `<ons-lazy-repeat>` element.
   *   [/en]
   *   [ja]
   *     この関数は`HTMLElement`を返してください。
   *     要素を生成しやすくするために、現在のアイテムのインデックスとテンプレートが引数に渡されます。
   *     このテンプレートは、`<ons-lazy-repeat>`要素のコンテンツが渡されます。
   *   [/ja]
   */

  /**
   * @property delegate.countItems
   * @type {Function}
   * @description
   *   [en]Should return the number of items in the list.[/en]
   *   [ja]リスト内のアイテム数を返してください。[/ja]
   */

  /**
   * @property delegate.calculateItemHeight
   * @type {Function}
   * @description
   *   [en]
   *     Should return the height of an item. The index is provided as an argument.
   *
   *     This is important when rendering lists where the items have different height.
   *
   *     The function is optional and if it isn't present the height of the first item will be automatically calculated and used for all other items.
   *   [/en]
   *   [ja]
   *     アイテムの高さ(ピクセル)を返してください。アイテムのインデックス値は引数で渡されます。
   *     この関数は、それぞれのアイムが違った高さを持つリストをレンダリングする際に重要です。
   *     この関数はオプショナルです。もしこの関数が無い場合には、
   *     最初のアイテムの高さが他のすべてのアイテムの高さとして利用されます。
   *   [/ja]
   */

  /**
   * @property delegate.destroyItem
   * @type {Function}
   * @description
   *   [en]
   *     This function is used called when an item is removed from the DOM. The index and DOM element is provided as arguments.
   *
   *     The function is optional but may be important in order to avoid memory leaks.
   *   [/en]
   *   [ja]
   *     この関数は、あるアイテムがDOMツリーから除かれた時に呼び出されます。
   *     アイテムのインデックス値とDOM要素が引数として渡されます。
   *     この関数はオプショナルですが、各アイテムの後処理が必要な場合にはメモリーリークを避けるために重要です。
   *   [/ja]
   */

  set delegate(userDelegate) {
    this._lazyRepeatProvider && this._lazyRepeatProvider.destroy();

    if (!this._templateElement && this.children[0]) {
      this._templateElement = this.removeChild(this.children[0]);
    }

    const delegate = new LazyRepeatDelegate(userDelegate, this._templateElement || null);
    this._lazyRepeatProvider = new LazyRepeatProvider(this.parentElement, delegate);
  }

  get delegate() {
    throw new Error('This property can only be used to set the delegate object.');
  }

  /**
   * @method refresh
   * @signature refresh()
   * @description
   *   [en]Refresh the list. Use this method when the data has changed.[/en]
   *   [ja]リストを更新します。もしデータが変わった場合にはこのメソッドを使ってください。[/ja]
   */
  refresh() {
    this._lazyRepeatProvider && this._lazyRepeatProvider.refresh();
  }

  attributeChangedCallback(name, last, current) {}

  disconnectedCallback() {
    if (this._lazyRepeatProvider) {
      this._lazyRepeatProvider.destroy();
      this._lazyRepeatProvider = null;
    }
  }

}

customElements.define('ons-lazy-repeat', LazyRepeatElement);
