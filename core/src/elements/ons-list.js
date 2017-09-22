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

import util from '../ons/util';
import autoStyle from '../ons/autostyle';
import ModifierUtil from '../ons/internal/modifier-util';
import BaseElement from './base/base-element';

const defaultClassName = 'list';
const scheme = {'': 'list--*'};

/**
 * @element ons-list
 * @category list
 * @modifier inset
 *   [en]Inset list that doesn't cover the whole width of the parent.[/en]
 *   [ja]親要素の画面いっぱいに広がらないリストを表示します。[/ja]
 * @modifier noborder
 *   [en]A list with no borders at the top and bottom.[/en]
 *   [ja]リストの上下のボーダーが無いリストを表示します。[/ja]
 * @description
 *   [en]Component to define a list, and the container for ons-list-item(s).[/en]
 *   [ja]リストを表現するためのコンポーネント。ons-list-itemのコンテナとして使用します。[/ja]
 * @seealso ons-list-item
 *   [en]ons-list-item component[/en]
 *   [ja]ons-list-itemコンポーネント[/ja]
 * @seealso ons-list-header
 *   [en]ons-list-header component[/en]
 *   [ja]ons-list-headerコンポーネント[/ja]
 * @seealso ons-lazy-repeat
 *   [en]ons-lazy-repeat component[/en]
 *   [ja]ons-lazy-repeatコンポーネント[/ja]
 * @guide lists
 *   [en]Using lists[/en]
 *   [ja]リストを使う[/ja]
 * @guide infinite-scroll
 *   [en]Loading more items on infinite scroll[/en]
 *   [ja]Loading more items on infinite scroll[/ja]
 * @codepen yxcCt
 * @tutorial vanilla/Reference/list
 * @example
 * <ons-list>
 *   <ons-list-header>Header Text</ons-list-header>
 *   <ons-list-item>Item</ons-list-item>
 *   <ons-list-item>Item</ons-list-item>
 * </ons-list>
 */
export default class ListElement extends BaseElement {

  /**
   * @attribute modifier
   * @type {String}
   * @description
   *   [en]The appearance of the list.[/en]
   *   [ja]リストの表現を指定します。[/ja]
   */

  constructor() {
    super();

    this._compile();
  }

  _compile() {
    autoStyle.prepare(this);
    this.classList.add(defaultClassName);
    ModifierUtil.initModifier(this, scheme);
  }

  static get observedAttributes() {
    return ['modifier', 'class'];
  }

  attributeChangedCallback(name, last, current) {
    switch (name) {
      case 'class':
        util.restoreClass(this, defaultClassName, scheme);
        break;
      case 'modifier':
        ModifierUtil.onModifierChanged(last, current, this, scheme);
        break;
    }
  }
}

customElements.define('ons-list', ListElement);
