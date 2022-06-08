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

import onsElements from '../../ons/elements.js';
import util from '../../ons/util.js';
import autoStyle from '../../ons/autostyle.js';
import contentReady from '../../ons/content-ready.js';
import ModifierUtil from '../../ons/internal/modifier-util.js';
import BaseElement from './base-element.js';

import '../ons-ripple.js';

export default class BaseButtonElement extends BaseElement {

  get _scheme() { // eslint-disable-line getter-return
    util.throwMember();
  }

  get _defaultClassName() { // eslint-disable-line getter-return
    util.throwMember();
  }

  get _rippleOpt() {
    return [this];
  }

  constructor() {
    super();

    if (this.constructor === BaseButtonElement) {
      util.throwAbstract();
    }

    contentReady(this, () => this._compile());
  }

  get _icon() {
    return util.findChild(this, 'ons-icon');
  }

  get _hiddenButton() {
    return util.findChild(this, 'button');
  }

  _compile() {
    autoStyle.prepare(this);

    this.classList.add(this._defaultClassName);

    if (!this._icon && this.hasAttribute('icon')) {
      util.checkMissingImport('Icon');
      const icon = util.createElement(`<ons-icon icon="${this.getAttribute('icon')}"></ons-icon>`);
      icon.classList.add(this._defaultClassName.replace('button', 'icon'));
      this.insertBefore(icon, this.firstChild);
    }

    // Add hidden button to allow form submission
    if (!this._hiddenButton) {
      const button = util.createElement('<button hidden></button>');
      this.appendChild(button);
    }

    this._updateRipple();

    ModifierUtil.initModifier(this, this._scheme);
  }

  _updateIcon() {
    if (this._icon) {
      this._icon.setAttribute('icon', this.getAttribute('icon'));
    }
  }

  _updateRipple() {
    this._rippleOpt && util.updateRipple(...this._rippleOpt);
  }

  static get observedAttributes() {
    return ['modifier', 'class', 'icon', 'ripple'];
  }

  attributeChangedCallback(name, last, current) {
    switch (name) {
      case 'class':
        util.restoreClass(this, this._defaultClassName, this._scheme);
        break;
      case 'modifier':
        ModifierUtil.onModifierChanged(last, current, this, this._scheme);
        break;
      case 'icon':
        this._updateIcon();
        break;
      case 'ripple':
        this.classList.contains(this._defaultClassName) && this._updateRipple();
        break;
    }
  }
}

util.defineBooleanProperties(BaseButtonElement, ['ripple', 'disabled']);
