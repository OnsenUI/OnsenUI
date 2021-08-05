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
import util from '../ons/util.js';
import BaseInputElement from './base/base-input.js';

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
 * @guide theming.html#modifiers [en]More details about the `modifier` attribute[/en][ja]modifier属性の使い方[/ja]
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

    this._onMouseDown = this._onMouseDown.bind(this);
    this._onMouseUp = this._onMouseUp.bind(this);
    this._onTouchStart = this._onTouchStart.bind(this);
    this._onTouchEnd = this._onTouchEnd.bind(this);
    this._onInput = this._update.bind(this);
    this._onDragstart = this._onDragstart.bind(this);
    this._onDragend = this._onDragend.bind(this);
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
      <input type="${this.type}" class="${this._defaultClassName}__input">
      <input type="range" class="range__focus-ring" tabIndex="-1">
    `;
  }

  get _defaultClassName() {
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
    this._setupListeners(true);
  }

  disconnectedCallback() {
    this._setupListeners(false);
  }

  _setupListeners(add) {
    const action = (add ? 'add' : 'remove') + 'EventListener';
    util[action](this, 'touchstart', this._onTouchStart, { passive: true });
    this[action]('mousedown', this._onMouseDown);
    this[action]('mouseup', this._onMouseUp);
    this[action]('touchend', this._onTouchEnd);
    this[action]('dragstart', this._onDragstart);
    this[action]('dragend', this._onDragend);
    this[action]('input', this._onInput);
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

  /**
   * @method focus
   * @signature focus()
   * @description
   *   [en]Focuses the range.[/en]
   *   [ja][/ja]
   */

  /**
   * @method blur
   * @signature blur()
   * @description
   *   [en]Removes focus from the range.[/en]
   *   [ja][/ja]
   */
}

onsElements.Range = RangeElement;
customElements.define('ons-range', RangeElement);
