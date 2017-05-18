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

import autoStyle from '../ons/autostyle';
import ModifierUtil from '../ons/internal/modifier-util';
import BaseElement from './base/base-element';
import util from '../ons/util';
import contentReady from '../ons/content-ready';

const defaultClassName = 'range';

const scheme = {
  '': 'range--*',
  '.range__input': 'range--*__input'
};

const INPUT_ATTRIBUTES = [
  'autofocus',
  'disabled',
  'inputmode',
  'max',
  'min',
  'name',
  'placeholder',
  'readonly',
  'size',
  'step',
  'validator',
  'value'
];

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

/**
 * @attribute disabled
 * @description
 *   [en]Whether the element is disabled or not.[/en]
 *   [ja]無効化されている場合に`true`。[/ja]
 */

export default class RangeElement extends BaseElement {

  constructor() {
    super();

    contentReady(this, () => {
      this._compile();
      this._updateBoundAttributes();
      this._onChange();
    });
  }

  _compile() {
    this.classList.add(defaultClassName);

    autoStyle.prepare(this);

    if (!util.findChild(this, '.range__input')) {
      const input = document.createElement('input');
      input.setAttribute('type', 'range');
      input.classList.add('range__input');
      this.appendChild(input);
    }

    ModifierUtil.initModifier(this, scheme);

    this._updateDisabled();
  }

  _onChange() {
    this._input.style.backgroundSize = (100 * this._ratio) + '% 2px';
  }

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

  static get observedAttributes() {
    return ['class', 'modifier', ...INPUT_ATTRIBUTES];
  }

  _updateDisabled() {
    if (this.hasAttribute('disabled')) {
      ModifierUtil.addModifier(this, 'disabled');
    } else {
      ModifierUtil.removeModifier(this, 'disabled');
    }
  }

  attributeChangedCallback(name, last, current) {
    if (name === 'modifier') {
      ModifierUtil.onModifierChanged(last, current, this, scheme);
    } else if (name === 'class') {
      if (!this.classList.contains(defaultClassName)) {
        this.className = defaultClassName + ' ' + current;
      }
    } else if (name === 'disabled') {
      this._updateDisabled();
    }

    if (INPUT_ATTRIBUTES.indexOf(name) >= 0) {
      contentReady(this, () => {
        this._updateBoundAttributes();

        if (name === 'min' || name === 'max') {
          this._onChange();
        }
      });
    }
  }

  connectedCallback() {
    this.addEventListener('dragstart', this._onDragstart);
    this.addEventListener('input', this._onChange);
  }

  disconnectedCallback() {
    this.removeEventListener('dragstart', this._onDragstart);
    this.removeEventListener('input', this._onChange);
  }

  _updateBoundAttributes() {
    INPUT_ATTRIBUTES.forEach((attr) => {
      if (this.hasAttribute(attr)) {
        this._input.setAttribute(attr, this.getAttribute(attr));
      }
      else {
        this._input.removeAttribute(attr);
      }
    });
  }

  get _input() {
    return this.querySelector('input.range__input');
  }

  /**
   * @property disabled
   * @type {Boolean}
   * @description
   *   [en]Whether the element is disabled or not.[/en]
   *   [ja]無効化されている場合に`true`。[/ja]
   */
  set disabled(value) {
    return util.toggleAttribute(this, 'disabled', value);
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  /**
   * @property value
   * @type {Number}
   * @description
   *   [en]Current value.[/en]
   *   [ja][/ja]
   */
  get value() {
    return this._input === null
      ? this.getAttribute('value')
      : this._input.value;
  }

  set value(val) {
    contentReady(this, () => {
      this._input.value = val;
      this._onChange();
    });
  }

  static get events() {
    return ['input', 'change'];
  }
}

customElements.define('ons-range', RangeElement);
