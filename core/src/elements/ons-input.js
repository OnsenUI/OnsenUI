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
import contentReady from '../ons/content-ready';
import util from '../ons/util';

const scheme = {
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
export default class InputElement extends BaseInputElement {

  constructor() {
    super();

    this._boundOnInput = this._update.bind(this);
    this._boundOnFocusin = this._update.bind(this);
  }

  /* Inherited props */

  _update() {
    this._updateLabel();
    this._updateLabelClass();
  }

  get _scheme() {
    return scheme;
  }

  get _template() {
    return `
      <input type="${this.type}" class="text-input">
      <span class="text-input__label"></span>
    `;
  }

  get type() {
    const type = this.getAttribute('type');
    return (['checkbox', 'radio'].indexOf(type) < 0) && type || 'text';
  }

  /* Own props */

  _updateLabel() {
    const label = this.getAttribute('placeholder') || '';

    if (typeof this._helper.textContent !== 'undefined') {
      this._helper.textContent = label;
    } else {
      this._helper.innerText = label;
    }
  }

  _updateLabelClass() {
    if (this.value === '') {
      this._helper.classList.remove('text-input--material__label--active');
    } else {
      this._helper.classList.add('text-input--material__label--active');
    }
  }

  get _helper() {
    return this.querySelector('span');
  }

  connectedCallback() {
    super.connectedCallback();

    contentReady(this, () => {
      this._input.addEventListener('input', this._boundOnInput);
      this._input.addEventListener('focusin', this._boundOnFocusin);
    });

    const type = this.getAttribute('type');
    if (['checkbox', 'radio'].indexOf(type) >= 0) {
      util.warn(`Warn: <ons-input type="${type}"> is deprecated since v2.4.0. Use <ons-${type}> instead.`)
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    contentReady(this, () => {
      this._input.removeEventListener('input', this._boundOnInput);
      this._input.removeEventListener('focusin', this._boundOnFocusin);
    });
  }

  static get observedAttributes() {
    return [...super.observedAttributes, 'type'];
  }

  attributeChangedCallback(name, last, current) {
    switch (name) {
      case 'type':
        contentReady(this, () => this._input.setAttribute('type', this.type));
        break;
      default:
        super.attributeChangedCallback(name, last, current);
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
}

customElements.define('ons-input', InputElement);
