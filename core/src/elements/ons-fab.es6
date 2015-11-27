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

import ModifierUtil from '../ons/internal/modifier-util';
import BaseElement from '../ons/base-element';

const scheme = {
  '': 'fab--*',
};

class FabElement extends BaseElement {

  createdCallback() {
    this._compile();
    ModifierUtil.initModifier(this, scheme);
    this.classList.add('fab');
    this._updatePosition();
    this.show();
  }

  _compile() {
    var content = document.createElement('span');
    content.classList.add('fab__icon');

    const children = ons._util.arrayFrom(this.childNodes).forEach(element => content.appendChild(element));

    this.insertBefore(content, this.firstChild);
  }

  attributeChangedCallback(name, last, current) {
    if (name === 'modifier') {
      return ModifierUtil.onModifierChanged(last, current, this, scheme);
    }
    if (name === 'position') {
      this._updatePosition();
    }
  }

  _show() {
    if (!this.isInline()) {
      this.show();
    }
  }

  _hide() {
    if (!this.isInline()) {
      this.hide();
    }
  }

  _updatePosition() {
    const position = this.getAttribute('position');
    this.classList.remove(
      'fab--top__left',
      'fab--bottom__right',
      'fab--bottom__left',
      'fab--top__right',
      'fab--top__center',
      'fab--bottom__center');
    switch (position) {
      case 'top right':
      case 'right top':
        this.classList.add('fab--top__right');
        break;
      case 'top left':
      case 'left top':
        this.classList.add('fab--top__left');
        break;
      case 'bottom right':
      case 'right bottom':
        this.classList.add('fab--bottom__right');
        break;
      case 'bottom left':
      case 'left bottom':
        this.classList.add('fab--bottom__left');
        break;
      case 'center top':
      case 'top center':
        this.classList.add('fab--top__center');
        break;
      case 'center bottom':
      case 'bottom center':
        this.classList.add('fab--bottom__center');
        break;
      default:
        break;
    }
  }

  show(options = {}) {
    this.style.transform = 'scale(1)';
    this.style.webkitTransform = 'scale(1)';
  }

  hide(options = {}) {
    this.style.transform = 'scale(0)';
    this.style.webkitTransform = 'scale(0)';
  }

  /**
   * Disable of enable fab.
   *
   * @param {Boolean}
   */
  setDisabled(disabled) {
    if (typeof disabled !== 'boolean') {
      throw new Error('Argument must be a boolean.');
    }

    if (disabled) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  /**
   * True if fab is disabled.
   *
   * @return {Boolean}
   */
  isDisabled() {
    return this.hasAttribute('disabled');
  }

  /**
   * True if fab is inline element.
   *
   * @return {Boolean}
   */
  isInline() {
    return this.hasAttribute('inline');
  }

  /**
   * True if fab is shown
   *
   * @return {Boolean}
   */
  isShown() {
    return this.style.transform === 'scale(1)' && this.style.display !== 'none';
  }

  toggle() {
    if (this.isShown()) {
      this.hide();
    } else {
      this.show();
    }
  }
}

window.OnsFabElement = document.registerElement('ons-fab', {
  prototype: FabElement.prototype
});
