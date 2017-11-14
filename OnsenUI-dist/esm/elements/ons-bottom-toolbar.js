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

var defaultClassName = 'bottom-bar';
var scheme = { '': 'bottom-bar--*' };

/**
 * @element ons-bottom-toolbar
 * @category page
 * @description
 *   [en]Toolbar component that is positioned at the bottom of the page. Since bottom toolbars are very versatile elements, `ons-bottom-toolbar` does not provide any specific layout syntax for its children. Modifiers or custom CSS must be used.[/en]
 *   [ja]ページ下部に配置されるツールバー用コンポーネントです。[/ja]
 * @modifier transparent
 *   [en]Make the toolbar transparent.[/en]
 *   [ja]ツールバーの背景を透明にして表示します。[/ja]
 * @modifier aligned
 *   [en]Vertically aligns its children and applies flexbox for block elements. `justify-content` CSS rule can be used to change horizontal align.[/en]
 *   [ja]ツールバーの背景を透明にして表示します。[/ja]
 * @seealso ons-toolbar [en]ons-toolbar component[/en][ja]ons-toolbarコンポーネント[/ja]
 * @example
 * <ons-bottom-toolbar>
 *   Content
 * </ons-bottom-toolbar>
 */

var BottomToolbarElement = function (_BaseElement) {
  _inherits(BottomToolbarElement, _BaseElement);

  /**
   * @attribute modifier
   * @type {String}
   * @description
   *   [en]The appearance of the toolbar.[/en]
   *   [ja]ツールバーの見た目の表現を指定します。[/ja]
   */

  function BottomToolbarElement() {
    _classCallCheck(this, BottomToolbarElement);

    var _this = _possibleConstructorReturn(this, (BottomToolbarElement.__proto__ || _Object$getPrototypeOf(BottomToolbarElement)).call(this));

    _this.classList.add(defaultClassName);
    ModifierUtil.initModifier(_this, scheme);
    return _this;
  }

  _createClass(BottomToolbarElement, [{
    key: 'connectedCallback',
    value: function connectedCallback() {
      if (util.match(this.parentNode, 'ons-page')) {
        this.parentNode.classList.add('page-with-bottom-toolbar');
      }
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

  return BottomToolbarElement;
}(BaseElement);

export default BottomToolbarElement;


ons.elements.BottomToolbar = BottomToolbarElement;
customElements.define('ons-bottom-toolbar', BottomToolbarElement);