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

import BaseCheckboxElement from './base/base-checkbox';

const scheme = {
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
 * @guide adding-page-content
 *   [en]Using form components[/en]
 *   [ja]フォームを使う[/ja]
 * @guide using-modifier [en]More details about the `modifier` attribute[/en][ja]modifier属性の使い方[/ja]
 * @example
 * <ons-radio checked></ons-radio>
 */
export default class RadioElement extends BaseCheckboxElement {

  get _scheme() {
    return scheme;
  }

  get _defaultElementClass() {
    return 'radio-button';
  }

  get type() {
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
}

customElements.define('ons-radio', RadioElement);
