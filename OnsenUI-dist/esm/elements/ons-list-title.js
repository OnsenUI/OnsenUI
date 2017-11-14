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
import BaseElement from './base/base-element';
import autoStyle from '../ons/autostyle';
import ModifierUtil from '../ons/internal/modifier-util';
import util from '../ons/util';

var defaultClassName = 'list-title';
var scheme = { '': 'list-title--*' };

/**
 * @element ons-list-title
 * @category list
 * @description
 *   [en]Represents a list title.[/en]
 *   [ja]リストのタイトルを表現します。[/ja]
 * @example
 * <ons-list-title>List Title</ons-list-title>
 * <ons-list>
 *   <ons-list-item>Item</ons-list-item>
 * </ons-list>
 * @modifier material
 *   [en]Display a Material Design list title.[/en]
 *   [ja][/ja]
 */

var ListTitleElement = function (_BaseElement) {
  _inherits(ListTitleElement, _BaseElement);

  function ListTitleElement() {
    _classCallCheck(this, ListTitleElement);

    var _this = _possibleConstructorReturn(this, (ListTitleElement.__proto__ || _Object$getPrototypeOf(ListTitleElement)).call(this));

    _this._compile();
    return _this;
  }

  _createClass(ListTitleElement, [{
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

  return ListTitleElement;
}(BaseElement);

export default ListTitleElement;


ons.elements.ListTitle = ListTitleElement;
customElements.define('ons-list-title', ListTitleElement);