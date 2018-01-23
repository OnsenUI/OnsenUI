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

import onsElements from '../../ons/elements';
import util from '../../ons/util';
import autoStyle from '../../ons/autostyle';
import contentReady from '../../ons/content-ready';
import ModifierUtil from '../../ons/internal/modifier-util';
import BaseElement from './base-element';

export default class BaseButtonElement extends BaseElement {

  get _scheme() {
    throw new Error('_scheme getter must be implemented.');
  }

  get _defaultClassName() {
    throw new Error('_defaultClassName getter must be implemented.');
  }

  get _rippleOpt() {
    return [this];
  }

  constructor() {
    super();

    contentReady(this, () => this._compile());
  }

  set disabled(value) {
    return util.toggleAttribute(this, 'disabled', value);
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  get _icon() {
    return util.findChild(this, 'ons-icon');
  }

  _compile() {
    autoStyle.prepare(this);

    this.classList.add(this._defaultClassName);

    if (!this._icon && this.hasAttribute('icon')) {
      const icon = util.createElement(`<ons-icon icon="${this.getAttribute('icon')}"></ons-icon>`);
      icon.classList.add(this._defaultClassName.replace('button', 'icon'));
      this.insertBefore(icon, this.firstChild);
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
