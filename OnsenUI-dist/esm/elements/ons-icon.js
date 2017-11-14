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
import BaseElement from './base/base-element';

var autoPrefix = 'fa'; // FIXME: To be removed in v3

/**
 * @element ons-icon
 * @category visual
 * @description
 *   [en]
 *     Displays an icon. The following icon suites are available:
 *
 *     * [Font Awesome](https://fortawesome.github.io/Font-Awesome/)
 *     * [Ionicons](http://ionicons.com/)
 *     * [Material Design Iconic Font](http://zavoloklom.github.io/material-design-iconic-font/)
 *   [/en]
 *   [ja][/ja]
 * @codepen xAhvg
 * @tutorial vanilla/Reference/icon
 * @guide theming.html#cross-platform-styling-autostyling [en]Information about cross platform styling[/en][ja][/ja]
 * @guide appsize.html#removing-icon-packs [en]Removing icon packs.[/en][ja][/ja]
 * @guide faq.html#how-can-i-use-custom-icon-packs [en]Adding custom icon packs.[/en][ja][/ja]
 * @example
 * <ons-icon
 *   icon="md-car"
 *   size="20px"
 *   style="color: red">
 * </ons-icon>
 *
 * <ons-button>
 *   <ons-icon icon="md-car"></ons-icon>
 *   Car
 * </ons-button>
 */

var IconElement = function (_BaseElement) {
  _inherits(IconElement, _BaseElement);

  /**
   * @attribute icon
   * @type {String}
   * @description
   *   [en]
   *     The icon name. `"md-"` prefix for Material Icons, `"fa-"` for Font Awesome and `"ion-"` prefix for Ionicons.
   *
   *     See all available icons on the element description (at the top).
   *
   *     Icons can also be styled based on modifier presence. Add comma-separated icons with `"modifierName:"` prefix.
   *
   *     The code `<ons-icon icon="ion-edit, material:md-edit"></ons-icon>` will display `"md-edit"` for Material Design and `"ion-edit"` as the default icon.
   *
   *     `fa-` prefix is added automatically if none is provided. Check [See also](#seealso) section for more information.
   *   [/en]
   *   [ja][/ja]
   */

  /**
   * @attribute size
   * @type {String}
   * @description
   *   [en]
   *     The sizes of the icon. Valid values are lg, 2x, 3x, 4x, 5x, or in the size in pixels.
   *     Icons can also be styled based on modifier presence. Add comma-separated icons with `"modifierName:"` prefix.
   *
   *     The code:
   *
   *     ```
   *     <ons-icon
   *       icon="ion-edit"
   *       size="32px, material:24px">
   *     </ons-icon>
   *     ```
   *
   *     will render as a `24px` icon if the `"material"` modifier is present and `32px` otherwise.
   *   [/en]
   *   [ja][/ja]
   */

  /**
   * @attribute rotate
   * @type {Number}
   * @description
   *   [en]Number of degrees to rotate the icon. Valid values are 90, 180 and 270.[/en]
   *   [ja]アイコンを回転して表示します。90, 180, 270から指定できます。[/ja]
   */

  /**
   * @attribute fixed-width
   * @type {Boolean}
   * @default false
   * @description
   *  [en]When used in a list, you want the icons to have the same width so that they align vertically by defining this attribute.[/en]
   *  [ja][/ja]
   */

  /**
   * @attribute spin
   * @description
   *   [en]Specify whether the icon should be spinning.[/en]
   *   [ja]アイコンを回転するかどうかを指定します。[/ja]
   */

  function IconElement() {
    _classCallCheck(this, IconElement);

    var _this = _possibleConstructorReturn(this, (IconElement.__proto__ || _Object$getPrototypeOf(IconElement)).call(this));

    _this._compile();
    return _this;
  }

  _createClass(IconElement, [{
    key: 'attributeChangedCallback',
    value: function attributeChangedCallback(name, last, current) {
      this._cleanClassAttribute(name === 'icon' ? last : this.getAttribute('icon'), name === 'modifier' ? last : undefined);
      this._update();
    }
  }, {
    key: '_compile',
    value: function _compile() {
      autoStyle.prepare(this);
      this._update();
    }
  }, {
    key: '_update',
    value: function _update() {
      var _this2 = this;

      var _buildClassAndStyle2 = this._buildClassAndStyle(this._parseAttr('icon'), this._parseAttr('size')),
          classList = _buildClassAndStyle2.classList,
          style = _buildClassAndStyle2.style;

      util.extend(this.style, style);

      classList.forEach(function (className) {
        return _this2.classList.add(className);
      });
    }
  }, {
    key: '_parseAttr',
    value: function _parseAttr(attrName) {
      var modifier = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.getAttribute('modifier') || '';

      var attr = this.getAttribute(attrName) || attrName || '';
      var parts = attr.split(/\s*,\s*/);
      var def = parts[0];
      var md = parts[1];
      md = (md || '').split(/\s*:\s*/);

      return (modifier && RegExp('(^|\\s+)' + md[0] + '($|\\s+)', 'i').test(modifier) ? md[1] : def) || '';
    }

    /**
     * Remove unneeded class value.
     */

  }, {
    key: '_cleanClassAttribute',
    value: function _cleanClassAttribute(lastIcon, lastModifier) {
      var _this3 = this;

      var _prefixIcon2 = this._prefixIcon(this._parseAttr(lastIcon, lastModifier)),
          className = _prefixIcon2.className,
          prefix = _prefixIcon2.prefix;

      var customPrefixRE = className !== prefix ? '|' + prefix + '$|' + prefix + '-' : '|' + className + '$' || '';
      var re = new RegExp('^(fa$|fa-|ion-|zmdi$|zmdi-|ons-icon--' + customPrefixRE + ')');

      util.arrayFrom(this.classList).filter(function (className) {
        return re.test(className);
      }).forEach(function (className) {
        return _this3.classList.remove(className);
      });
    }
  }, {
    key: '_prefixIcon',
    value: function _prefixIcon(iconName) {
      var className = autoPrefix + (autoPrefix ? '-' : '') + iconName;
      return { className: className, prefix: className.split('-')[0] };
    }
  }, {
    key: '_buildClassAndStyle',
    value: function _buildClassAndStyle(iconName, size) {
      var classList = ['ons-icon'];
      var style = {};

      // Icon
      if (iconName.indexOf('ion-') === 0) {
        classList.push(iconName);
        classList.push('ons-icon--ion');
      } else if (iconName.indexOf('fa-') === 0) {
        classList.push(iconName);
        classList.push('fa');
      } else if (iconName.indexOf('md-') === 0) {
        classList.push('zmdi');
        classList.push('zmdi-' + iconName.split(/-(.+)?/)[1]);
      } else {
        var _prefixIcon3 = this._prefixIcon(iconName),
            className = _prefixIcon3.className,
            prefix = _prefixIcon3.prefix;

        prefix && classList.push(prefix);
        className && classList.push(className);
      }

      // Size
      if (size.match(/^[1-5]x|lg$/)) {
        classList.push('ons-icon--' + size);
        this.style.removeProperty('font-size');
      } else {
        style.fontSize = size;
      }

      return {
        classList: classList,
        style: style
      };
    }
  }], [{
    key: 'setAutoPrefix',
    value: function setAutoPrefix(prefix) {
      autoPrefix = prefix ? typeof prefix === 'string' && prefix || 'fa' : '';
    }
  }, {
    key: 'observedAttributes',
    get: function get() {
      return ['icon', 'size', 'modifier', 'class'];
    }
  }]);

  return IconElement;
}(BaseElement);

export default IconElement;


ons.elements.Icon = IconElement;
customElements.define('ons-icon', IconElement);