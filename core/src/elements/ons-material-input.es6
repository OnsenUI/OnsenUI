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
  '.text-input--material': 'text-input--material--*',
  '.text-input--material__label': 'text-input--material__label--*'
};

const INPUT_ATTRIBUTES = [
  'autocapitalize',
  'autocomplete',
  'autocorrect',
  'autofocus',
  'disabled',
  'inputmode',
  'max',
  'maxlength',
  'min',
  'minlength',
  'name',
  'pattern',
  'placeholder',
  'readonly',
  'size',
  'step',
  'type',
  'validator',
  'value'
];

class MaterialInputElement extends BaseElement {

  createdCallback() {
    this._compile();
    ModifierUtil.initModifier(this, scheme);
    this._updateLabel();
    this._updateLabelColor();
    this._updateBoundAttributes();
    this._updateLabelClass();

    this._boundOnInput = this._onInput.bind(this);
    this._boundOnFocusin = this._onFocusin.bind(this);
    this._boundOnFocusout = this._onFocusout.bind(this);
    this._boundDelegateEvent = this._delegateEvent.bind(this);
  }

  _compile() {
    if (this._input) {
      return;
    }

    this.appendChild(document.createElement('input'));
    this._input.classList.add('text-input--material');
    this.appendChild(document.createElement('span'));
    this._label.classList.add('text-input--material__label');
  }

  attributeChangedCallback(name, last, current) {
    if (name === 'modifier') {
      return ModifierUtil.onModifierChanged(last, current, this, scheme);
    }
    else if (name === 'label') {
      return this._updateLabel();
    }
    else if (INPUT_ATTRIBUTES.indexOf(name) >= 0) {
      return this._updateBoundAttributes();
    }
  }

  attachedCallback() {
    this._input.addEventListener('input', this._boundOnInput);
    this._input.addEventListener('focusin', this._boundOnFocusin);
    this._input.addEventListener('focusout', this._boundOnFocusout);
    this._input.addEventListener('focus', this._boundDelegateEvent);
    this._input.addEventListener('blur', this._boundDelegateEvent);
  }

  detachedCallback() {
    this._input.removeEventListener('input', this._boundOnInput);
    this._input.removeEventListener('focusin', this._boundOnFocusin);
    this._input.removeEventListener('focusout', this._boundOnFocusout);
    this._input.addEventListener('focus', this._boundDelegateEvent);
    this._input.addEventListener('blur', this._boundDelegateEvent);
  }

  _setLabel(value) {
    if (typeof this._label.textContent !== 'undefined') {
      this._label.textContent = value;
    }
    else {
      this._label.innerText = value;
    }
  }

  _updateLabel() {
    this._setLabel(this.hasAttribute('label') ? this.getAttribute('label') : '');
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

  _updateLabelColor() {
    if (this.value.length > 0 && this._input === document.activeElement) {
      this._label.style.color = '';
    }
    else {
      this._label.style.color = 'rgba(0, 0, 0, 0.5)';
    }
  }

  _updateLabelClass() {
    if (this.value === '') {
      this._label.classList.remove('text-input--material__label--active');
    }
    else {
      this._label.classList.add('text-input--material__label--active');
    }
  }

  _delegateEvent(event) {
    const e = new CustomEvent(event.type, {
      bubbles: false,
      cancelable: true
    });

    return this.dispatchEvent(e);
  }

  _onInput(event) {
    this._updateLabelClass();
    this._updateLabelColor();
  }

  _onFocusin(event) {
    this._updateLabelClass();
    this._updateLabelColor();
  }

  _onFocusout(event) {
    this._updateLabelColor();
  }

  get _input() {
    return this.querySelector('input');
  }

  get _label() {
    return this.querySelector('span');
  }

  get value() {
    return this._input.value;
  }

  set value(val) {
    this._input.value = val;
    this._onInput();

    return this._input.val;
  }
}

window.OnsMaterialInputElement = document.registerElement('ons-material-input', {
  prototype: MaterialInputElement.prototype
});
