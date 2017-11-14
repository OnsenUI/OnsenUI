import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
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
import contentReady from '../ons/content-ready';

var scheme = {
  '': 'select-*',
  '.select-input': 'select-input--*'
};

var defaultClassName = 'select';

var INPUT_ATTRIBUTES = ['autofocus', 'disabled', 'form', 'multiple', 'name', 'required', 'size'];

/**
 * @element ons-select
 * @category form
 * @modifier material
 *  [en]Displays a Material Design select input.[/en]
 *  [ja][/ja]
 * @modifier underbar
 *  [en]Displays a horizontal line underneath a select input.[/en]
 *  [ja][/ja]
 * @description
 *   [en]
 *     Select component. If you want to place a select with an ID of `my-id` on a page, use `<ons-select select-id="my-id">`.
 *
 *     The component will automatically display as a Material Design select on Android.
 *
 *     Most attributes that can be used for a normal `<select>` element can also be used on the `<ons-select>` element.
 *   [/en]
 *   [ja]セレクトボックスを表示するコンポーネントです。`select` 要素に使用できる属性の多くが `ons-select` 要素でも利用できます。[/ja]
 * @codepen hLayx
 * @tutorial vanilla/Reference/select
 * @guide theming.html#modifiers [en]More details about the `modifier` attribute[/en][ja]modifier属性の使い方[/ja]
 * @guide theming.html#cross-platform-styling-autostyling [en]Information about cross platform styling[/en][ja]Information about cross platform styling[/ja]
 * @example
 * <ons-select>
 *   <option value="1">1</option>
 *   <option value="2">2nd</option>
 *   <option value="3">3rd option</option>
 * </ons-select>
 */

var SelectElement = function (_BaseElement) {
  _inherits(SelectElement, _BaseElement);

  /**
   * @attribute autofocus
   * @type {Boolean}
   * @default false
   * @description
   *  [en]Element automatically gains focus on page load.[/en]
   *  [ja]ページロード時にこのセレクトボックスにフォーカスが移るようにします。[/ja]
   */

  /**
   * @attribute disabled
   * @type {Boolean}
   * @default false
   * @description
   *   [en]Specify if select input should be disabled.[/en]
   *   [ja]このセレクトボックスを無効化する場合に指定します。[/ja]
   */

  /**
   * @attribute form
   * @type {String}
   * @description
   *   [en]Associate a select element to an existing form on the page, even if not nested.[/en]
   *   [ja]このセレクトボックスを、指定した `form` 要素に紐付けます。セレクトボックスを `form` 要素の外側に配置する際に使用します。[/ja]
   */

  /**
   * @attribute multiple
   * @type {Boolean}
   * @default false
   * @description
   *  [en]If this attribute is defined, multiple options can be selected at once.[/en]
   *  [ja]選択肢の複数選択を有効にします。[/ja]
   */

  /**
   * @attribute name
   * @type {String}
   * @description
   *   [en]Name the select element, useful for instance if it is part of a form.[/en]
   *   [ja]このセレクトボックスの名前を指定します。通常 `form` 要素と共に使用します。[/ja]
   */

  /**
   * @attribute required
   * @type {Boolean}
   * @description
   *   [en]Make the select input required for submitting the form it is part of.[/en]
   *   [ja]このセレクトボックスを入力必須にする場合に指定します。通常 `form` 要素と共に使用します。[/ja]
   */

  /**
   * @attribute select-id
   * @type {String}
   * @description
   *   [en]ID given to the inner select, useful for dynamic manipulation.[/en]
   *   [ja]このセレクトボックスが内部に持つ select 要素に与える ID を指定します。セレクトボックスの内容を動的に変更する必要がある場合に使用します。[/ja]
   */

  /**
   * @attribute size
   * @type {Number}
   * @default 1
   * @description
   *   [en]How many options are displayed; if there are more than the size then a scroll appears to navigate them.[/en]
   *   [ja]一度に表示する選択肢の個数を指定します。選択肢がこの属性で指定した個数よりも多い場合、スクロールが有効になります。[/ja]
   */

  function SelectElement() {
    _classCallCheck(this, SelectElement);

    var _this = _possibleConstructorReturn(this, (SelectElement.__proto__ || _Object$getPrototypeOf(SelectElement)).call(this));

    contentReady(_this, function () {
      return _this._compile();
    });

    _this._deriveGetters();
    return _this;
  }

  _createClass(SelectElement, [{
    key: 'attributeChangedCallback',
    value: function attributeChangedCallback(name, last, current) {
      var _this2 = this;

      switch (name) {
        case 'class':
          util.restoreClass(this, defaultClassName, scheme);
          break;
        case 'modifier':
          ModifierUtil.onModifierChanged(last, current, this, scheme);
          break;
      }

      if (INPUT_ATTRIBUTES.indexOf(name) >= 0) {
        contentReady(this, function () {
          return _this2._updateBoundAttributes();
        });
      }
    }
  }, {
    key: '_updateBoundAttributes',
    value: function _updateBoundAttributes() {
      var _this3 = this;

      INPUT_ATTRIBUTES.forEach(function (attr) {
        if (_this3.hasAttribute(attr)) {
          _this3._select.setAttribute(attr, _this3.getAttribute(attr));
        } else {
          _this3._select.removeAttribute(attr);
        }
      });
    }

    /**
     * @property length
     * @description
     *   [en]Number of options in the select box.[/en]
     *   [ja]このセレクトボックスに含まれる選択肢の個数を返します。 `select` 要素[/ja]
     */

    /**
     * @property options
     * @description
     *   [en]Several options for handling the select DOM object.[/en]
     *   [ja]このセレクトボックスに含まれる `option` 要素の配列を返します。[/ja]
     */

    /**
     * @property selectedIndex
     * @description
     *   [en]Index of the currently selected option.[/en]
     *   [ja]現在選択されている選択肢のインデックスを返します。[/ja]
     */

    /**
     * @property value
     * @description
     *   [en]Value of the currently selected option.[/en]
     *   [ja]現在選択されている選択肢の値を返します。[/ja]
     */

  }, {
    key: '_compile',
    value: function _compile() {
      autoStyle.prepare(this);

      this.classList.add(defaultClassName);
      var sel = this._select || document.createElement('select');
      if (!sel.id && this.hasAttribute('select-id')) {
        sel.id = this.getAttribute('select-id');
      }
      sel.classList.add('select-input');
      if (!this._select) {
        util.arrayFrom(this.childNodes).forEach(function (element) {
          return sel.appendChild(element);
        });
        this.appendChild(sel);
      }

      ModifierUtil.initModifier(this, scheme);
    }
  }, {
    key: '_deriveGetters',
    value: function _deriveGetters() {
      var _this4 = this;

      ['disabled', 'length', 'multiple', 'name', 'options', 'selectedIndex', 'size', 'value', 'form', 'type'].forEach(function (key) {
        _Object$defineProperty(_this4, key, {
          enumerable: true,
          get: function get() {
            return _this4._select[key];
          },
          set: ['form', 'type'].indexOf(key) === -1 ? function (value) {
            return _this4._select[key] = value;
          } : undefined
        });
      });
    }
  }, {
    key: 'add',
    value: function add(option) {
      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      this._select.add(option, index);
    }
  }, {
    key: 'remove',
    value: function remove(index) {
      this._select.remove(index);
    }
  }, {
    key: '_select',
    get: function get() {
      return this.querySelector('select');
    }
  }], [{
    key: 'observedAttributes',
    get: function get() {
      return ['modifier', 'class'].concat(INPUT_ATTRIBUTES);
    }
  }]);

  return SelectElement;
}(BaseElement);

export default SelectElement;


ons.elements.Select = SelectElement;
customElements.define('ons-select', SelectElement);