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
import BaseCheckboxElement from './base/base-checkbox';

var scheme = {
  '.radio-button': 'radio-button--*',
  '.radio-button__input': 'radio-button--*__input',
  '.radio-button__checkmark': 'radio-button--*__checkmark'
};

/**
 * @element ons-radio
 * @category form
 * @modifier material
 *  [en]Displays a Material Design radio button.[/en]
 *  [ja][/ja]
 * @description
 *  [en]
 *    A radio button element. The component will automatically render as a Material Design radio button on Android devices.
 *
 *    Most attributes that can be used for a normal `<input type="radio">` element can also be used on the `<ons-radio>` element.
 *  [/en]
 *  [ja][/ja]
 * @tutorial vanilla/Reference/input
 * @seealso ons-select
 *   [en]The `<ons-select>` element is used to display a select box.[/en]
 *   [ja][/ja]
 * @seealso ons-checkbox
 *   [en]The `<ons-checkbox>` element is used to display a checkbox.[/en]
 *   [ja][/ja]
 * @seealso ons-switch
 *   [en]The `<ons-switch>` element is used to display a draggable toggle switch.[/en]
 *   [ja][/ja]
 * @seealso ons-input
 *   [en]The `<ons-input>` element is used to display a text input.[/en]
 *   [ja][/ja]
 * @seealso ons-search-input
 *   [en]The `<ons-search-input>` element is used to display a search input.[/en]
 *   [ja][/ja]
 * @seealso ons-range
 *   [en]The `<ons-range>` element is used to display a range slider.[/en]
 *   [ja][/ja]
 * @guide theming.html#modifiers [en]More details about the `modifier` attribute[/en][ja]modifier属性の使い方[/ja]
 * @example
 * <ons-radio checked></ons-radio>
 */

var RadioElement = function (_BaseCheckboxElement) {
  _inherits(RadioElement, _BaseCheckboxElement);

  function RadioElement() {
    _classCallCheck(this, RadioElement);

    return _possibleConstructorReturn(this, (RadioElement.__proto__ || _Object$getPrototypeOf(RadioElement)).apply(this, arguments));
  }

  _createClass(RadioElement, [{
    key: '_scheme',
    get: function get() {
      return scheme;
    }
  }, {
    key: '_defaultClassName',
    get: function get() {
      return 'radio-button';
    }
  }, {
    key: 'type',
    get: function get() {
      return 'radio';
    }

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
     *   [en]The current value of the radio button.[/en]
     *   [ja][/ja]
     */

    /**
     * @property checked
     * @type {Boolean}
     * @description
     *   [en]Whether the radio button is checked or not.[/en]
     *   [ja][/ja]
     */

    /**
     * @property disabled
     * @type {Boolean}
     * @description
     *   [en]Whether the radio button is disabled or not.[/en]
     *   [ja]無効化されている場合に`true`。[/ja]
     */

  }]);

  return RadioElement;
}(BaseCheckboxElement);

export default RadioElement;


ons.elements.Radio = RadioElement;
customElements.define('ons-radio', RadioElement);