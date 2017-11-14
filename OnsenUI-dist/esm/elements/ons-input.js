import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _get from 'babel-runtime/helpers/get';
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
import BaseInputElement from './base/base-input';
import contentReady from '../ons/content-ready';
import util from '../ons/util';

var scheme = {
  '.text-input': 'text-input--*',
  '.text-input__label': 'text-input--*__label'
};

/**
 * @element ons-input
 * @category form
 * @modifier material
 *  [en]Displays a Material Design input.[/en]
 *  [ja][/ja]
 * @modifier underbar
 *  [en]Displays a horizontal line underneath a text input.[/en]
 *  [ja][/ja]
 * @modifier transparent
 *  [en]Displays a transparent input. Works for Material Design.[/en]
 *  [ja][/ja]
 * @description
 *  [en]
 *    An input element. The `type` attribute can be used to change the input type. All text input types are supported.
 *
 *    The component will automatically render as a Material Design input on Android devices.
 *
 *    Most attributes that can be used for a normal `<input>` element can also be used on the `<ons-input>` element.
 *  [/en]
 *  [ja][/ja]
 * @tutorial vanilla/Reference/input
 * @seealso ons-checkbox
 *   [en]The `<ons-checkbox>` element is used to display a checkbox.[/en]
 *   [ja][/ja]
 * @seealso ons-radio
 *   [en]The `<ons-radio>` element is used to display a radio button.[/en]
 *   [ja][/ja]
 * @seealso ons-range
 *   [en]The `<ons-range>` element is used to display a range slider.[/en]
 *   [ja][/ja]
 * @seealso ons-switch
 *   [en]The `<ons-switch>` element is used to display a draggable toggle switch.[/en]
 *   [ja][/ja]
 * @seealso ons-select
 *   [en]The `<ons-select>` element is used to display a select box.[/en]
 *   [ja][/ja]
 * @guide theming.html#modifiers [en]More details about the `modifier` attribute[/en][ja]modifier属性の使い方[/ja]
 * @example
 * <ons-input placeholder="Username" float></ons-input>
 */

var InputElement = function (_BaseInputElement) {
  _inherits(InputElement, _BaseInputElement);

  function InputElement() {
    _classCallCheck(this, InputElement);

    var _this = _possibleConstructorReturn(this, (InputElement.__proto__ || _Object$getPrototypeOf(InputElement)).call(this));

    _this._boundOnInput = _this._update.bind(_this);
    _this._boundOnFocusin = _this._update.bind(_this);
    return _this;
  }

  /* Inherited props */

  _createClass(InputElement, [{
    key: '_update',
    value: function _update() {
      this._updateLabel();
      this._updateLabelClass();
    }
  }, {
    key: '_updateLabel',


    /* Own props */

    value: function _updateLabel() {
      var label = this.getAttribute('placeholder') || '';

      if (typeof this._helper.textContent !== 'undefined') {
        this._helper.textContent = label;
      } else {
        this._helper.innerText = label;
      }
    }
  }, {
    key: '_updateLabelClass',
    value: function _updateLabelClass() {
      if (this.value === '') {
        this._helper.classList.remove('text-input--material__label--active');
      } else {
        this._helper.classList.add('text-input--material__label--active');
      }
    }
  }, {
    key: 'connectedCallback',
    value: function connectedCallback() {
      var _this2 = this;

      _get(InputElement.prototype.__proto__ || _Object$getPrototypeOf(InputElement.prototype), 'connectedCallback', this).call(this);

      contentReady(this, function () {
        _this2._input.addEventListener('input', _this2._boundOnInput);
        _this2._input.addEventListener('focusin', _this2._boundOnFocusin);
      });

      var type = this.getAttribute('type');
      if (['checkbox', 'radio'].indexOf(type) >= 0) {
        util.warn('Warn: <ons-input type="' + type + '"> is deprecated since v2.4.0. Use <ons-' + type + '> instead.');
      }
    }
  }, {
    key: 'disconnectedCallback',
    value: function disconnectedCallback() {
      var _this3 = this;

      _get(InputElement.prototype.__proto__ || _Object$getPrototypeOf(InputElement.prototype), 'disconnectedCallback', this).call(this);

      contentReady(this, function () {
        _this3._input.removeEventListener('input', _this3._boundOnInput);
        _this3._input.removeEventListener('focusin', _this3._boundOnFocusin);
      });
    }
  }, {
    key: 'attributeChangedCallback',
    value: function attributeChangedCallback(name, last, current) {
      var _this4 = this;

      switch (name) {
        case 'type':
          contentReady(this, function () {
            return _this4._input.setAttribute('type', _this4.type);
          });
          break;
        default:
          _get(InputElement.prototype.__proto__ || _Object$getPrototypeOf(InputElement.prototype), 'attributeChangedCallback', this).call(this, name, last, current);
      }
    }

    /**
     * @attribute placeholder
     * @type {String}
     * @description
     *   [en]Placeholder text. In Material Design, this placeholder will be a floating label.[/en]
     *   [ja][/ja]
     */

    /**
     * @attribute float
     * @description
     *  [en]If this attribute is present, the placeholder will be animated in Material Design.[/en]
     *  [ja]この属性が設定された時、ラベルはアニメーションするようになります。[/ja]
     */

    /**
     * @attribute type
     * @type {String}
     * @description
     *  [en]
     *    Specify the input type. This is the same as the "type" attribute for normal inputs. It expects strict text types such as `text`, `password`, etc. For checkbox, radio button, select or range, please have a look at the corresponding elements.
     *
     *    Please take a look at [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-type) for an exhaustive list of possible values. Depending on the platform and browser version some of these might not work.
     *  [/en]
     *  [ja][/ja]
     */

    /**
     * @attribute input-id
     * @type {String}
     * @description
     *  [en]Specify the "id" attribute of the inner `<input>` element. This is useful when using `<label for="...">` elements.[/en]
     *  [ja][/ja]
     */

    /**
     * @property value
     * @type {String}
     * @description
     *   [en]The current value of the input.[/en]
     *   [ja][/ja]
     */

    /**
     * @property disabled
     * @type {Boolean}
     * @description
     *   [en]Whether the input is disabled or not.[/en]
     *   [ja]無効化されている場合に`true`。[/ja]
     */

  }, {
    key: '_scheme',
    get: function get() {
      return scheme;
    }
  }, {
    key: '_template',
    get: function get() {
      return '\n      <input type="' + this.type + '" class="text-input">\n      <span class="text-input__label"></span>\n    ';
    }
  }, {
    key: 'type',
    get: function get() {
      var type = this.getAttribute('type');
      return ['checkbox', 'radio'].indexOf(type) < 0 && type || 'text';
    }
  }, {
    key: '_helper',
    get: function get() {
      return this.querySelector('span');
    }
  }], [{
    key: 'observedAttributes',
    get: function get() {
      return [].concat(_toConsumableArray(_get(InputElement.__proto__ || _Object$getPrototypeOf(InputElement), 'observedAttributes', this)), ['type']);
    }
  }]);

  return InputElement;
}(BaseInputElement);

export default InputElement;


ons.elements.Input = InputElement;
customElements.define('ons-input', InputElement);