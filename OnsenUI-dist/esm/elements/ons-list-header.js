import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
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

import ons from '../ons';
import util from '../ons/util';
import autoStyle from '../ons/autostyle';
import ModifierUtil from '../ons/internal/modifier-util';
import BaseElement from './base/base-element';

var defaultClassName = 'list-header';
var scheme = { '': 'list-header--*' };

/**
 * @element ons-list-header
 * @category list
 * @description
 *   [en]Header element for list items. Must be put inside the `<ons-list>` component.[/en]
 *   [ja]リスト要素に使用するヘッダー用コンポーネント。ons-listと共に使用します。[/ja]
 * @seealso ons-list
 *   [en]The `<ons-list>` component[/en]
 *   [ja]ons-listコンポーネント[/ja]
 * @seealso ons-list-item
 *   [en]The `<ons-list-item>` component[/en]
 *   [ja]ons-list-itemコンポーネント[/ja]
 * @codepen yxcCt
 * @tutorial vanilla/Reference/list
 * @modifier material
 *   [en]Display a Material Design list header.[/en]
 *   [ja][/ja]
 * @example
 * <ons-list>
 *   <ons-list-header>Header Text</ons-list-header>
 *   <ons-list-item>Item</ons-list-item>
 *   <ons-list-item>Item</ons-list-item>
 * </ons-list>
 */

var ListHeaderElement = function (_BaseElement) {
  _inherits(ListHeaderElement, _BaseElement);

  /**
   * @attribute modifier
   * @type {String}
   * @description
   *   [en]The appearance of the list header.[/en]
   *   [ja]ヘッダーの表現を指定します。[/ja]
   */

  function ListHeaderElement() {
    _classCallCheck(this, ListHeaderElement);

    var _this = _possibleConstructorReturn(this, (ListHeaderElement.__proto__ || _Object$getPrototypeOf(ListHeaderElement)).call(this));

    _this._compile();
    return _this;
  }

  _createClass(ListHeaderElement, [{
    key: '_compile',
    value: function _compile() {
      autoStyle.prepare(this);
      this.classList.add(defaultClassName);
      ModifierUtil.initModifier(this, scheme);
    }
  }, {
    key: 'attributeChangedCallback',
    value: function attributeChangedCallback(name, last, current) {
      switch (name) {
        case 'class':
          util.restoreClass(this, defaultClassName, scheme);
          break;
        case 'modifier':
          ModifierUtil.onModifierChanged(last, current, this, scheme);
          break;
      }
    }
  }], [{
    key: 'observedAttributes',
    get: function get() {
      return ['modifier', 'class'];
    }
  }]);

  return ListHeaderElement;
}(BaseElement);

export default ListHeaderElement;


ons.elements.ListHeader = ListHeaderElement;
customElements.define('ons-list-header', ListHeaderElement);