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

import util from '../../ons/util.js';
import BaseElement from './base-element.js';
import autoStyle from '../../ons/autostyle.js';
import ModifierUtil from '../../ons/internal/modifier-util.js';
import contentReady from '../../ons/content-ready.js';

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
  'required',
  'size',
  'spellcheck',
  'step',
  'validator',
  'value'
];

export default class BaseInputElement extends BaseElement {

  _update() {} // Optionally implemented

  get _scheme() { // eslint-disable-line getter-return
    util.throwMember();
  }

  get _template() { // eslint-disable-line getter-return
    util.throwMember();
  }

  get type() { // eslint-disable-line getter-return
    util.throwMember();
  }

  constructor() {
    super();

    if (this.constructor === BaseInputElement) {
      util.throwAbstract();
    }

    contentReady(this, () => this._compile());
    this._boundDelegateEvent = this._delegateEvent.bind(this);
  }

  _compile() {
    autoStyle.prepare(this);
    this._defaultClassName && this.classList.add(this._defaultClassName);

    if (this.children.length !== 0) {
      return;
    }

    this.appendChild(util.createFragment(this._template));

    this._setInputId();

    this._updateBoundAttributes();

    ModifierUtil.initModifier(this, this._scheme);
  }

  _updateBoundAttributes() {
    INPUT_ATTRIBUTES.forEach(attr => {
      if (this.hasAttribute(attr)) {
        this._input.setAttribute(attr, this.getAttribute(attr));
      } else {
        this._input.removeAttribute(attr);
      }
    });

    this._update();
  }

  _delegateEvent(event) {
    const e = new CustomEvent(event.type, {
      bubbles: false,
      cancelable: true
    });

    return this.dispatchEvent(e);
  }

  _setInputId() {
    if (this.hasAttribute('input-id')) {
      this._input.id = this.getAttribute('input-id');
    }
  }

  get _defaultClassName() {
    return '';
  }

  get _input() {
    return this.querySelector('input');
  }

  get value() {
    return this._input === null
      ? this.getAttribute('value')
      : this._input.value;
  }

  set value(val) {
    contentReady(this, () => {
      if (val instanceof Date) {
        val = val.toISOString().substring(0, 10);
      }
      this._input.value = val;
      this._update();
    });
  }

  connectedCallback() {
    contentReady(this, () => {
      this._input.addEventListener('focus', this._boundDelegateEvent);
      this._input.addEventListener('blur', this._boundDelegateEvent);
    });
  }

  disconnectedCallback() {
    contentReady(this, () => {
      this._input.removeEventListener('focus', this._boundDelegateEvent);
      this._input.removeEventListener('blur', this._boundDelegateEvent);
    });
  }

  static get observedAttributes() {
    return ['modifier', 'input-id', 'class', ...INPUT_ATTRIBUTES];
  }

  attributeChangedCallback(name, last, current) {
    switch (name) {
      case 'modifier':
        contentReady(this, () => ModifierUtil.onModifierChanged(last, current, this, this._scheme));
        break;
      case 'input-id':
        contentReady(this, () => this._setInputId());
        break;
      case 'class':
        util.restoreClass(this, this._defaultClassName, this._scheme);
        break;
    }

    if (INPUT_ATTRIBUTES.indexOf(name) >= 0) {
      contentReady(this, () => this._updateBoundAttributes());
    }
  }

  blur() {
    this._input.blur();
  }

  focus() {
    this._input.focus();
  }
}

util.defineBooleanProperties(BaseInputElement, ['disabled']);
