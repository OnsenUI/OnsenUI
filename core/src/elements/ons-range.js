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
  '': 'range--*',
  '.range__input': 'range--*__input'
};

/**
 * @element ons-range
 * @category form
 * @modifier material
 *   [en]Material Design slider[/en]
 *   [ja][/ja]
 * @description
 *   [en]
 *     Range input component. Used to display a draggable slider.
 *
 *     Works very similar to the `<input type="range">` element.
 *   [/en]
 *   [ja][/ja]
 * @codepen xZQomM
 * @tutorial vanilla/Reference/range
 * @guide using-modifier [en]More details about the `modifier` attribute[/en][ja]modifier属性の使い方[/ja]
 * @seealso ons-input
 *   [en]The `<ons-input>` component is used to display text inputs, radio buttons and checkboxes.[/en]
 *   [ja][/ja]
 * @example
 * <ons-range value="20"></ons-range>
 * <ons-range modifier="material" value="10"></range>
 */

export default class RangeElement extends BaseInputElement {

  constructor() {
    super();

    this._boundOnInput = this._update.bind(this);
  }

  /* Inherited props */

  _update() {
    this._input.style.backgroundSize = (100 * this._ratio) + '% 2px';
  }

  get _scheme() {
    return scheme;
  }

  get _template() {
    return `
      <input type="${this.type}" class="${this._defaultElementClass}__input">
    `;
  }

  get _defaultElementClass() {
    return 'range';
  }

  get type() {
    return 'range';
  }

  /* Own props */

  _onDragstart(e) {
    e.stopPropagation();
    e.gesture.stopPropagation();
  }

  get _ratio() {
    // Returns the current ratio.
    const min = this._input.min === '' ? 0 : parseInt(this._input.min);
    const max = this._input.max === '' ? 100 : parseInt(this._input.max);

    return (this.value - min) / (max - min);
  }

  connectedCallback() {
    this.addEventListener('dragstart', this._onDragstart);
    this.addEventListener('input', this._boundOnInput);
  }

  disconnectedCallback() {
    this.removeEventListener('dragstart', this._onDragstart);
    this.removeEventListener('input', this._boundOnInput);
  }

  /**
   * @attribute disabled
   * @description
   *   [en]Whether the element is disabled or not.[/en]
   *   [ja]無効化されている場合に`true`。[/ja]
   */

  /**
   * @property disabled
   * @type {Boolean}
   * @description
   *   [en]Whether the element is disabled or not.[/en]
   *   [ja]無効化されている場合に`true`。[/ja]
   */

  /**
   * @property value
   * @type {Number}
   * @description
   *   [en]Current value.[/en]
   *   [ja][/ja]
   */
}

customElements.define('ons-range', RangeElement);
