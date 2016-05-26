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

import autoStyle from 'ons/autostyle';
import ModifierUtil from 'ons/internal/modifier-util';
import BaseElement from 'ons/base-element';
import util from 'ons/util';
import contentReady from 'ons/content-ready';

const scheme = {
  '.range': 'range--*',
  '.range__left': 'range--*__left'
};

const templateSource = util.createElement(`<div>
  <div class="range__left"></div>
  <input type="range" class="range">
</div>`);

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
 * @category range
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
 * @guide UsingFormComponents
 *   [en]Using form components[/en]
 *   [ja]フォームを使う[/ja]
 * @guide EventHandling
 *   [en]Event handling descriptions[/en]
 *   [ja]イベント処理の使い方[/ja]
 * @seealso ons-input
 *   [en]The `<ons-input>` component is used to display text inputs, radio buttons and checkboxes.[/en]
 *   [ja][/ja]
 * @example
 * <ons-range value="20"></ons-range>
 * <ons-range modifier="material" value="10"></range>
 */
class RangeElement extends BaseElement {

  createdCallback() {
    contentReady(this, () => {
      if (!this.hasAttribute('_compiled')) {
        this._compile();
      }

      this._updateBoundAttributes();
      this._onChange();
    });
  }

  _compile() {
    autoStyle.prepare(this);

    if (!(util.findChild(this, '.range__left') && util.findChild(this, 'input'))) {
      const template = templateSource.cloneNode(true);
      while (template.children[0]) {
        this.appendChild(template.children[0]);
      }
    }

    ModifierUtil.initModifier(this, scheme);

    this.setAttribute('_compiled', '');
  }

  _onChange() {
    this._left.style.width = (100 * this._ratio) + '%';
  }

  get _ratio() {
    // Returns the current ratio.
    const min = this._input.min === '' ? 0 : parseInt(this._input.min);
    const max = this._input.max === '' ? 100 : parseInt(this._input.max);

    return (this.value - min) / (max - min);
  }

  attributeChangedCallback(name, last, current) {
    if (name === 'modifier') {
      ModifierUtil.onModifierChanged(last, current, this, scheme);
    }
    else if (INPUT_ATTRIBUTES.indexOf(name) >= 0) {
      contentReady(this, () => {
        this._updateBoundAttributes();

        if (name === 'min' || name === 'max') {
          this._onChange();
        }
      });
    }
 }

  attachedCallback() {
    this.addEventListener('input', this._onChange);
  }

  detachedCallback() {
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
    return this.querySelector('input');
  }

  get _left() {
    return this.querySelector('.range__left');
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
    return this._input.value;
  }

  set value(val) {
    contentReady(this, () => {
      this._input.value = val;
      this._onChange();
    });
  }
}

window.OnsRangeElement = document.registerElement('ons-range', {
  prototype: RangeElement.prototype
});
