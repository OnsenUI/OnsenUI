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

import onsElements from '../ons/elements.js';
import BaseCheckboxElement from './base/base-checkbox.js';

const scheme = {
  '.checkbox': 'checkbox--*',
  '.checkbox__input': 'checkbox--*__input',
  '.checkbox__checkmark': 'checkbox--*__checkmark'
};

/**
 * @element ons-checkbox
 * @category form
 * @modifier material
 *  [en]Displays a Material Design checkbox.[/en]
 *  [ja][/ja]
 * @modifier noborder
 *  [en]iOS borderless checkbox.[/en]
 *  [ja][/ja]
 * @description
 *  [en]
 *    A checkbox element. The component will automatically render as a Material Design checkbox on Android devices.
 *
 *    Most attributes that can be used for a normal `<input type="checkbox">` element can also be used on the `<ons-checkbox>` element.
 *  [/en]
 *  [ja][/ja]
 * @tutorial vanilla/Reference/checkbox
 * @seealso ons-switch
 *   [en]The `<ons-switch>` element is used to display a draggable toggle switch.[/en]
 *   [ja][/ja]
 * @seealso ons-radio
 *   [en]The `<ons-radio>` element is used to display a radio button.[/en]
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
 * @seealso ons-select
 *   [en]The `<ons-select>` element is used to display a select box.[/en]
 *   [ja][/ja]
 * @guide theming.html#modifiers [en]More details about the `modifier` attribute[/en][ja]modifier属性の使い方[/ja]
 * @example
 * <ons-checkbox checked></ons-checkbox>
 */
export default class CheckboxElement extends BaseCheckboxElement {

  get _scheme() {
    return scheme;
  }

  get _defaultClassName() {
    return 'checkbox';
  }

  get type() {
    return 'checkbox';
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
   *   [en]The current value of the checkbox.[/en]
   *   [ja][/ja]
   */

  /**
   * @property checked
   * @type {Boolean}
   * @description
   *   [en]Whether the checkbox is checked or not.[/en]
   *   [ja][/ja]
   */

  /**
   * @property disabled
   * @type {Boolean}
   * @description
   *   [en]Whether the checkbox is disabled or not.[/en]
   *   [ja]無効化されている場合に`true`。[/ja]
   */

  /**
   * @method focus
   * @signature focus()
   * @description
   *   [en]Focuses the checkbox.[/en]
   *   [ja][/ja]
   */

  /**
   * @method blur
   * @signature blur()
   * @description
   *   [en]Removes focus from the checkbox.[/en]
   *   [ja][/ja]
   */
}

onsElements.Checkbox = CheckboxElement;
customElements.define('ons-checkbox', CheckboxElement);
