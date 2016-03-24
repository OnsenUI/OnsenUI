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

import BaseElement from 'ons/base-element';
import util from 'ons/util';
import {LazyRepeatDelegate, LazyRepeatProvider} from 'ons/internal/lazy-repeat';

/**
 * @element ons-lazy-repeat
 * @category control
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
 * @guide UsingLazyRepeat
 *   [en]How to use Lazy Repeat[/en]
 *   [ja]レイジーリピートの使い方[/ja]
 * @example
 * <script>
 *   window.addEventListener('load', function() {
 *     var lazyRepeat = document.querySelector('#list');
 *     lazyRepeat.delegate = {
 *      // calculateItemHeight: function(i) {
 *      //  // specify this if the height depends on the element
 *      //  return Math.floor(42 * Math.random());
 *      // },
 *      createItemContent: function(i, template) {
 *        var dom = template.cloneNode(true);
 *        dom.innerText = i;
 *
 *        return dom;
 *      },
 *      countItems: function() {
 *         // Return number of items.
 *        return 10000000;
 *      },
 *      destroyItem: function(index, item) {
 *        // Optional method that is called when an item is unloaded.
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
class LazyRepeatElement extends BaseElement {

  createdCallback() {
    this.style.display = 'none';
  }

  attachedCallback() {
    util.updateParentPosition(this);

    // not very good idea
    if (this.hasAttribute('delegate')) {
      this.setDelegate(window[this.getAttribute('delegate')]);
    }
  }

  /**
   * @method setDelegate
   * @signature setDelegate(userDelegate)
   * @param {Object} userDelegate
   * @description
   *  [en]Specify a delegate object to load and unload item elements.[/en]
   *  [ja]要素のロード、アンロードなどの処理を委譲するオブジェクトを指定します。[/ja]
   */
  setDelegate(userDelegate) {
    this._lazyRepeatProvider && this._lazyRepeatProvider.destroy();

    if (!this._templateElement && this.children[0]) {
      this._templateElement = this.removeChild(this.children[0]);
    }

    const delegate = new LazyRepeatDelegate(userDelegate, this._templateElement || null);
    this._lazyRepeatProvider = new LazyRepeatProvider(this.parentElement, delegate);
  }

  /**
   * @property delegate
   * @description
   *  [en]Specify a delegate object to load and unload item elements.[/en]
   *  [ja]要素のロード、アンロードなどの処理を委譲するオブジェクトを指定します。[/ja]
   */
  set delegate(userDelegate) {
    this.setDelegate(userDelegate);
  }

  /**
   * @method refresh
   * @signature refresh()
   * @description
   *   [en][/en]
   *   [ja][/ja]
   */
  refresh() {
    this._lazyRepeatProvider && this._lazyRepeatProvider.refresh();
  }

  attributeChangedCallback(name, last, current) {}

  detachedCallback() {
    if (this._lazyRepeatProvider) {
      this._lazyRepeatProvider.destroy();
      this._lazyRepeatProvider = null;
    }
  }

}

window.OnsLazyRepeatElement = document.registerElement('ons-lazy-repeat', {
  prototype: LazyRepeatElement.prototype
});


