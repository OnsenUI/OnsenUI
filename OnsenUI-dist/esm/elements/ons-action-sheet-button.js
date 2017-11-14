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
import contentReady from '../ons/content-ready';
import ModifierUtil from '../ons/internal/modifier-util';
import BaseElement from './base/base-element';

var defaultClassName = 'action-sheet-button';
var scheme = {
  '': 'action-sheet-button--*',
  '.action-sheet-icon': 'action-sheet-icon--*'
};

/**
 * @element ons-action-sheet-button
 * @category dialog
 * @modifier destructive
 *   [en]Shows a "destructive" button (only for iOS).[/en]
 *   [ja]"destructive"なボタンを表示します(iOSでのみ有効)。[/ja]
 * @description
 *   [en]Component that represent each button of the action sheet.[/en]
 *   [ja]アクションシートに表示される各ボタンを表現するコンポーネントです。[/ja]
 * @seealso ons-action-sheet
 *   [en]The `<ons-action-sheet>` component[/en]
 *   [ja]ons-action-sheetコンポーネント[/ja]
 * @seealso ons-list-item
 *   [en]The `<ons-list-item>` component[/en]
 *   [ja]ons-list-itemコンポーネント[/ja]
 * @seealso ons-icon
 *   [en]The `<ons-icon>` component[/en]
 *   [ja]ons-iconコンポーネント[/ja]
 * @tutorial vanilla/Reference/action-sheet
 * @guide appsize.html#removing-icon-packs [en]Removing icon packs.[/en][ja][/ja]
 * @guide faq.html#how-can-i-use-custom-icon-packs [en]Adding custom icon packs.[/en][ja][/ja]
 * @modifier material
 *   [en]Display a Material Design action sheet button.[/en]
 *   [ja]マテリアルデザインのアクションシート用のボタンを表示します。[/ja]
 * @example
 * <ons-action-sheet id="sheet">
 *   <ons-action-sheet-button>Label</ons-action-sheet-button>
 *   <ons-action-sheet-button>Label</ons-action-sheet-button>
 * </ons-action-sheet>
 *
 * <script>
 *   document.getElementById('sheet').show();
 * </script>
 */

var ActionSheetButtonElement = function (_BaseElement) {
  _inherits(ActionSheetButtonElement, _BaseElement);

  /**
   * @attribute icon
   * @type {String}
   * @description
   *  [en]Creates an `ons-icon` component with this string. Only visible on Android. Check [See also](#seealso) section for more information.[/en]
   *  [ja]`ons-icon`コンポーネントを悪性します。Androidでのみ表示されます。[/ja]
   */

  /**
   * @attribute modifier
   * @type {String}
   * @description
   *   [en]The appearance of the action sheet button.[/en]
   *   [ja]アクションシートボタンの見た目を設定します。[/ja]
   */

  function ActionSheetButtonElement() {
    _classCallCheck(this, ActionSheetButtonElement);

    var _this = _possibleConstructorReturn(this, (ActionSheetButtonElement.__proto__ || _Object$getPrototypeOf(ActionSheetButtonElement)).call(this));

    contentReady(_this, function () {
      return _this._compile();
    });
    return _this;
  }

  _createClass(ActionSheetButtonElement, [{
    key: '_compile',
    value: function _compile() {
      autoStyle.prepare(this);
      this.classList.add(defaultClassName);

      if (!this._icon && this.hasAttribute('icon')) {
        var icon = util.createElement('<ons-icon icon="' + this.getAttribute('icon') + '"></ons-icon>');
        icon.classList.add('action-sheet-icon');
        this.insertBefore(icon, this.firstChild);
      }

      ModifierUtil.initModifier(this, scheme);
    }
  }, {
    key: '_updateIcon',
    value: function _updateIcon() {
      if (this._icon) {
        this._icon.setAttribute('icon', this.getAttribute('icon'));
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
        case 'icon':
          this._updateIcon();
          break;
      }
    }
  }, {
    key: '_icon',
    get: function get() {
      return util.findChild(this, '.action-sheet-icon');
    }
  }], [{
    key: 'observedAttributes',
    get: function get() {
      return ['modifier', 'class', 'icon'];
    }
  }]);

  return ActionSheetButtonElement;
}(BaseElement);

export default ActionSheetButtonElement;


ons.elements.ActionSheetButton = ActionSheetButtonElement;
customElements.define('ons-action-sheet-button', ActionSheetButtonElement);