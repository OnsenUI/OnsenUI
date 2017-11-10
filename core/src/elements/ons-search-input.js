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

import BaseInputElement from './base/base-input';

const scheme = {
  '.search-input': 'search-input--*'
};

/**
 * @element ons-search-input
 * @category form
 * @modifier material
 *  [en]Displays a Material Design search input.[/en]
 *  [ja][/ja]
 * @description
 *  [en]
 *    A search input element. The component will automatically render as a Material Design search input on Android devices.
 *
 *    Most attributes that can be used for a normal `<input>` element can also be used on the `<ons-search-input>` element.
 *  [/en]
 *  [ja][/ja]
 * @tutorial vanilla/Reference/input
 * @seealso ons-input
 *   [en]The `<ons-input>` element is used to display a text input.[/en]
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
 * @seealso ons-checkbox
 *   [en]The `<ons-checkbox>` element is used to display a checkbox.[/en]
 *   [ja][/ja]
 * @seealso ons-radio
 *   [en]The `<ons-radio>` element is used to display a radio button.[/en]
 *   [ja][/ja]
 * @guide theming.html#modifiers [en]More details about the `modifier` attribute[/en][ja]modifier属性の使い方[/ja]
 * @example
 * <ons-search-input placeholder="Search"></ons-search-input>
 */
export default class SearchInputElement extends BaseInputElement {

  get _scheme() {
    return scheme;
  }

  get _template() {
    return `
      <input type="${this.type}" class="search-input">
    `;
  }

  get type() {
    return 'search';
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
}

customElements.define('ons-search-input', SearchInputElement);
