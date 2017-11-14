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
import internal from '../ons/internal';
import autoStyle from '../ons/autostyle';
import ModifierUtil from '../ons/internal/modifier-util';
import BaseElement from './base/base-element';
import contentReady from '../ons/content-ready';

var defaultClassName = 'toolbar';

var scheme = {
  '': 'toolbar--*',
  '.toolbar__left': 'toolbar--*__left',
  '.toolbar__center': 'toolbar--*__center',
  '.toolbar__right': 'toolbar--*__right'
};

/**
 * @element ons-toolbar
 * @category page
 * @modifier material
 *   [en]Material Design toolbar.[/en]
 *   [ja][/ja]
 * @modifier transparent
 *   [en]Transparent toolbar.[/en]
 *   [ja]透明な背景を持つツールバーを表示します。[/ja]
 * @modifier cover-content
 *   [en]Displays the toolbar on top of the page's content. Should be combined with `transparent` modifier.[/en]
 *   [ja][/ja]
 * @modifier noshadow
 *   [en]Toolbar without shadow.[/en]
 *   [ja]ツールバーに影を付けずに表示します。[/ja]
 * @description
 *   [en]
 *     Toolbar component that can be used with navigation.
 *
 *     Left, center and right container can be specified by class names.
 *
 *     This component will automatically displays as a Material Design toolbar when running on Android devices.
 *   [/en]
 *   [ja]ナビゲーションで使用するツールバー用コンポーネントです。クラス名により、左、中央、右のコンテナを指定できます。[/ja]
 * @codepen aHmGL
 * @tutorial vanilla/Reference/page
 * @guide compilation.html#toolbar-compilation [en]Adding a toolbar[/en][ja]ツールバーの追加[/ja]
 * @seealso ons-bottom-toolbar
 *   [en]The `<ons-bottom-toolbar>` displays a toolbar on the bottom of the page.[/en]
 *   [ja]ons-bottom-toolbarコンポーネント[/ja]
 * @seealso ons-back-button
 *   [en]The `<ons-back-button>` component displays a back button inside the toolbar.[/en]
 *   [ja]ons-back-buttonコンポーネント[/ja]
 * @seealso ons-toolbar-button
 *   [en]The `<ons-toolbar-button>` component displays a toolbar button inside the toolbar.[/en]
 *   [ja]ons-toolbar-buttonコンポーネント[/ja]
 * @example
 * <ons-page>
 *   <ons-toolbar>
 *     <div class="left">
 *       <ons-back-button>
 *         Back
 *       </ons-back-button>
 *     </div>
 *     <div class="center">
 *       Title
 *     </div>
 *     <div class="right">
 *       <ons-toolbar-button>
 *         <ons-icon icon="md-menu"></ons-icon>
 *       </ons-toolbar-button>
 *     </div>
 *   </ons-toolbar>
 * </ons-page>
 */

var ToolbarElement = function (_BaseElement) {
  _inherits(ToolbarElement, _BaseElement);

  /**
   * @attribute inline
   * @initonly
   * @description
   *   [en]Display the toolbar as an inline element.[/en]
   *   [ja]ツールバーをインラインに置きます。スクロール領域内にそのまま表示されます。[/ja]
   */

  /**
   * @attribute modifier
   * @description
   *   [en]The appearance of the toolbar.[/en]
   *   [ja]ツールバーの表現を指定します。[/ja]
   */

  function ToolbarElement() {
    _classCallCheck(this, ToolbarElement);

    var _this = _possibleConstructorReturn(this, (ToolbarElement.__proto__ || _Object$getPrototypeOf(ToolbarElement)).call(this));

    contentReady(_this, function () {
      _this._compile();
    });
    return _this;
  }

  _createClass(ToolbarElement, [{
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

    /**
     * @return {HTMLElement}
     */

  }, {
    key: '_getToolbarLeftItemsElement',
    value: function _getToolbarLeftItemsElement() {
      return this.querySelector('.left') || internal.nullElement;
    }

    /**
     * @return {HTMLElement}
     */

  }, {
    key: '_getToolbarCenterItemsElement',
    value: function _getToolbarCenterItemsElement() {
      return this.querySelector('.center') || internal.nullElement;
    }

    /**
     * @return {HTMLElement}
     */

  }, {
    key: '_getToolbarRightItemsElement',
    value: function _getToolbarRightItemsElement() {
      return this.querySelector('.right') || internal.nullElement;
    }

    /**
     * @return {HTMLElement}
     */

  }, {
    key: '_getToolbarBackButtonLabelElement',
    value: function _getToolbarBackButtonLabelElement() {
      return this.querySelector('ons-back-button .back-button__label') || internal.nullElement;
    }

    /**
     * @return {HTMLElement}
     */

  }, {
    key: '_getToolbarBackButtonIconElement',
    value: function _getToolbarBackButtonIconElement() {
      return this.querySelector('ons-back-button .back-button__icon') || internal.nullElement;
    }
  }, {
    key: '_compile',
    value: function _compile() {
      autoStyle.prepare(this);
      this.classList.add(defaultClassName);
      this._ensureToolbarItemElements();
      ModifierUtil.initModifier(this, scheme);
    }
  }, {
    key: '_ensureToolbarItemElements',
    value: function _ensureToolbarItemElements() {
      for (var i = this.childNodes.length - 1; i >= 0; i--) {
        // case of not element
        if (this.childNodes[i].nodeType != 1) {
          this.removeChild(this.childNodes[i]);
        }
      }

      var center = this._ensureToolbarElement('center');
      center.classList.add('toolbar__title');

      if (this.children.length !== 1 || !this.children[0].classList.contains('center')) {
        var left = this._ensureToolbarElement('left');
        var right = this._ensureToolbarElement('right');

        if (this.children[0] !== left || this.children[1] !== center || this.children[2] !== right) {
          this.appendChild(left);
          this.appendChild(center);
          this.appendChild(right);
        }
      }
    }
  }, {
    key: '_ensureToolbarElement',
    value: function _ensureToolbarElement(name) {
      if (util.findChild(this, '.toolbar__' + name)) {
        var _element = util.findChild(this, '.toolbar__' + name);
        _element.classList.add(name);
        return _element;
      }

      var element = util.findChild(this, '.' + name) || util.create('.' + name);
      element.classList.add('toolbar__' + name);

      return element;
    }
  }], [{
    key: 'observedAttributes',
    get: function get() {
      return ['modifier', 'class'];
    }
  }]);

  return ToolbarElement;
}(BaseElement);

export default ToolbarElement;


ons.elements.Toolbar = ToolbarElement;
customElements.define('ons-toolbar', ToolbarElement);