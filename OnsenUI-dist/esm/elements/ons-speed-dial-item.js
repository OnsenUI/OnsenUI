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

var defaultClassName = 'fab fab--mini speed-dial__item';

var scheme = {
  '': 'fab--* speed-dial__item--*'
};

/**
 * @element ons-speed-dial-item
 * @category control
 * @description
 *   [en]
 *     This component displays the child elements of the Material Design Speed dial component.
 *   [/en]
 *   [ja]
 *     Material DesignのSpeed dialの子要素を表現する要素です。
 *   [/ja]
 * @codepen dYQYLg
 * @tutorial vanilla/Reference/speed-dial
 * @seealso ons-speed-dial
 *   [en]The `<ons-speed-dial>` component.[/en]
 *   [ja]ons-speed-dialコンポーネント[/ja]
 * @seealso ons-fab
 *   [en]ons-fab component[/en]
 *   [ja]ons-fabコンポーネント[/ja]
 * @example
 * <ons-speed-dial position="left bottom">
 *   <ons-fab>
 *     <ons-icon icon="fa-twitter"></ons-icon>
 *   </ons-fab>
 *   <ons-speed-dial-item>A</ons-speed-dial-item>
 *   <ons-speed-dial-item>B</ons-speed-dial-item>
 *   <ons-speed-dial-item>C</ons-speed-dial-item>
 * </ons-speed-dial>
 */

var SpeedDialItemElement = function (_BaseElement) {
  _inherits(SpeedDialItemElement, _BaseElement);

  /**
   * @attribute modifier
   * @type {String}
   * @description
   *   [en]The appearance of the component.[/en]
   *   [ja]このコンポーネントの表現を指定します。[/ja]
   */

  /**
   * @attribute ripple
   * @description
   *  [en]If this attribute is defined, the button will have a ripple effect when tapped.[/en]
   *  [ja][/ja]
   */

  function SpeedDialItemElement() {
    _classCallCheck(this, SpeedDialItemElement);

    var _this = _possibleConstructorReturn(this, (SpeedDialItemElement.__proto__ || _Object$getPrototypeOf(SpeedDialItemElement)).call(this));

    _this._compile();
    _this._boundOnClick = _this._onClick.bind(_this);
    return _this;
  }

  _createClass(SpeedDialItemElement, [{
    key: 'attributeChangedCallback',
    value: function attributeChangedCallback(name, last, current) {
      switch (name) {
        case 'class':
          util.restoreClass(this, defaultClassName, scheme);
          break;
        case 'modifier':
          ModifierUtil.onModifierChanged(last, current, this, scheme);
          util.addModifier(this, 'mini');
          break;
        case 'ripple':
          this._updateRipple();
      }
    }
  }, {
    key: 'connectedCallback',
    value: function connectedCallback() {
      this.addEventListener('click', this._boundOnClick, false);
    }
  }, {
    key: 'disconnectedCallback',
    value: function disconnectedCallback() {
      this.removeEventListener('click', this._boundOnClick, false);
    }
  }, {
    key: '_updateRipple',
    value: function _updateRipple() {
      util.updateRipple(this);
    }
  }, {
    key: '_onClick',
    value: function _onClick(e) {
      e.stopPropagation();
    }
  }, {
    key: '_compile',
    value: function _compile() {
      var _this2 = this;

      autoStyle.prepare(this);

      defaultClassName.split(/\s+/).forEach(function (token) {
        return _this2.classList.add(token);
      });

      util.addModifier(this, 'mini');
      this._updateRipple();

      ModifierUtil.initModifier(this, scheme);
    }
  }], [{
    key: 'observedAttributes',
    get: function get() {
      return ['modifier', 'ripple', 'class'];
    }
  }]);

  return SpeedDialItemElement;
}(BaseElement);

export default SpeedDialItemElement;


ons.elements.SpeedDialItem = SpeedDialItemElement;
customElements.define('ons-speed-dial-item', SpeedDialItemElement);