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
  '.range__input': 'range--*__input',
  '.range__focus-ring': 'range--*__focus-ring'
};

const activeClassToken = 'range__input--active';

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

    this._boundOnMouseDown = this._onMouseDown.bind(this);
    this._boundOnMouseUp = this._onMouseUp.bind(this);
    this._boundOnTouchStart = this._onTouchStart.bind(this);
    this._boundOnTouchEnd = this._onTouchEnd.bind(this);
    this._boundOnInput = this._update.bind(this);
    this._boundOnDragstart = this._onDragstart.bind(this);
    this._boundOnDragend = this._onDragend.bind(this);
  }

  _compile() {
    super._compile();
    this._updateDisabled(this.hasAttribute('disabled'));
  }

  /* Inherited props */

  _update() {
    const input = this._input;
    const focusRing = this._focusRing;

    input.style.backgroundSize = `${100 * this._ratio}% 2px`;
    focusRing.value = this.value;

    // NOTE: "_zero" attribute is used for CSS styling.
    if ((input.min === '' && input.value === '0') || input.min === input.value) {
      input.setAttribute('_zero', '');
    } else {
      input.removeAttribute('_zero');
    }

    ['min', 'max'].forEach(attr => focusRing[attr] = input[attr]);
  }

  get _scheme() {
    return scheme;
  }

  get _template() {
    return `
      <input type="${this.type}" class="${this._defaultElementClass}__input">
      <input type="range" class="range__focus-ring" tabIndex="-1">
    `;
  }

  get _defaultElementClass() {
    return 'range';
  }

  get type() {
    return 'range';
  }

  /* Own props */

  _onMouseDown(e) {
    this._input.classList.add(activeClassToken);
    setImmediate(() => this._input.focus());
  }

  _onTouchStart(e) {
    this._onMouseDown();
  }

  _onMouseUp(e) {
    this._input.classList.remove(activeClassToken);
  }

  _onTouchEnd(e) {
    this._onMouseUp(e);
  }

  _onDragstart(e) {
    e.consumed = true;
    e.gesture.stopPropagation();
    this._input.classList.add(activeClassToken);
    this.addEventListener('drag', this._onDrag);
  }

  _onDrag(e) {
    e.stopPropagation();
  }

  _onDragend(e) {
    this._input.classList.remove(activeClassToken);
    this.removeEventListener('drag', this._onDrag);
  }

  get _focusRing() {
    return this.children[1];
  }

  get _ratio() {
    // Returns the current ratio.
    const min = this._input.min === '' ? 0 : parseInt(this._input.min);
    const max = this._input.max === '' ? 100 : parseInt(this._input.max);

    return (this.value - min) / (max - min);
  }

  static get observedAttributes() {
    return ['disabled', ...BaseInputElement.observedAttributes];
  }

  attributeChangedCallback(name, last, current) {
    if (name === 'disabled') {
      this._updateDisabled(current);
    }
    super.attributeChangedCallback(name, last, current);
  }

  /**
   * @param {boolean} disabled
   */
  _updateDisabled(disabled) {
    if (disabled) {
      this.classList.add('range--disabled');
    } else {
      this.classList.remove('range--disabled');
    }
  }

  connectedCallback() {
    this.addEventListener('mousedown', this._boundOnMouseDown);
    this.addEventListener('mouseup', this._boundOnMouseUp);
    this.addEventListener('touchstart', this._boundOnTouchStart);
    this.addEventListener('touchend', this._boundOnTouchEnd);
    this.addEventListener('dragstart', this._boundOnDragstart);
    this.addEventListener('dragend', this._boundOnDragend);
    this.addEventListener('input', this._boundOnInput);
  }

  disconnectedCallback() {
    this.removeEventListener('mousedown', this._boundOnMouseDown);
    this.removeEventListener('mouseup', this._boundOnMouseUp);
    this.removeEventListener('touchstart', this._boundOnTouchStart);
    this.removeEventListener('touchend', this._boundOnTouchEnd);
    this.removeEventListener('dragstart', this._boundOnDragstart);
    this.removeEventListener('dragend', this._boundOnDragend);
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
