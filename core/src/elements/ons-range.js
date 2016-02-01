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

import ModifierUtil from 'ons/internal/modifier-util';
import BaseElement from 'ons/base-element';

const scheme = {
  '.range': 'range--*',
  '.range__left': 'range--*__left'
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

class MaterialInputElement extends BaseElement {

  createdCallback() {
    if (!this.hasAttribute('_compiled')) {
      ons._prepareAutoStyling(this);
      this._compile();

      this.setAttribute('_compiled', '');
    }

    this._updateBoundAttributes();
    this._onChange();
  }

  _compile() {
    this.innerHTML = `
      <input type="range" class="range">
      <div class="range__left"></div>
    `;

    ModifierUtil.initModifier(this, scheme);
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
      this._updateBoundAttributes();

      if (name === 'min' || name === 'max') {
        this._onChange();
      }
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

  get value() {
    return this._input.value;
  }

  set value(val) {
    this._input.value = val;
    this._onChange();
    return this._input.val;
  }
}

window.OnsRangeElement = document.registerElement('ons-range', {
  prototype: MaterialInputElement.prototype
});
