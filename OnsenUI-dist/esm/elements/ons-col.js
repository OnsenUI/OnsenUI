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
import styler from '../ons/styler';
import BaseElement from './base/base-element';

/**
 * @element ons-col
 * @category grid
 * @description
 *   [en]Represents a column in the grid system. Use with `<ons-row>` to layout components.[/en]
 *   [ja]グリッドシステムにて列を定義します。ons-rowとともに使用し、コンポーネントのレイアウトに利用します。[/ja]
 * @note
 *   [en]For Android 4.3 and earlier, and iOS6 and earlier, when using mixed alignment with ons-row and ons-column, they may not be displayed correctly. You can use only one alignment.[/en]
 *   [ja]Android 4.3以前、もしくはiOS 6以前のOSの場合、ons-rowとons-columnを組み合わせた場合に描画が崩れる場合があります。[/ja]
 * @codepen GgujC {wide}
 * @guide theming.html [en]Layouting guide[/en][ja]レイアウト機能[/ja]
 * @seealso ons-row
 *   [en]The `<ons-row>` component is the parent of `<ons-col>`.[/en]
 *   [ja]ons-rowコンポーネント[/ja]
 * @example
 * <ons-row>
 *   <ons-col width="50px"><ons-icon icon="fa-twitter"></ons-icon></ons-col>
 *   <ons-col>Text</ons-col>
 * </ons-row>
 */

/**
 * @attribute vertical-align
 * @type {String}
 * @description
 *   [en]Vertical alignment of the column. Valid values are "top", "center", and "bottom".[/en]
 *   [ja]縦の配置を指定する。"top", "center", "bottom"のいずれかを指定します。[/ja]
 */

/**
 * @attribute width
 * @type {String}
 * @description
 *   [en]The width of the column. Valid values are css width values ("10%", "50px").[/en]
 *   [ja]カラムの横幅を指定する。パーセントもしくはピクセルで指定します（10%や50px）。[/ja]
 */

var ColElement = function (_BaseElement) {
  _inherits(ColElement, _BaseElement);

  function ColElement() {
    _classCallCheck(this, ColElement);

    var _this = _possibleConstructorReturn(this, (ColElement.__proto__ || _Object$getPrototypeOf(ColElement)).call(this));

    if (_this.getAttribute('width')) {
      _this._updateWidth();
    }
    return _this;
  }

  _createClass(ColElement, [{
    key: 'attributeChangedCallback',
    value: function attributeChangedCallback(name, last, current) {
      if (name === 'width') {
        this._updateWidth();
      }
    }
  }, {
    key: '_updateWidth',
    value: function _updateWidth() {
      var width = this.getAttribute('width');
      if (!width) {
        styler.clear(this, 'flex maxWidth');
      } else {
        width = width.trim().match(/^\d+$/) ? width + '%' : width;

        styler(this, {
          flex: '0 0 ' + width,
          maxWidth: width
        });
      }
    }
  }], [{
    key: 'observedAttributes',
    get: function get() {
      return ['width'];
    }
  }]);

  return ColElement;
}(BaseElement);

export default ColElement;


ons.elements.Col = ColElement;
customElements.define('ons-col', ColElement);