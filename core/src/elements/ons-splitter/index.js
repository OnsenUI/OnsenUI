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

import util from 'ons/util';
import ModifierUtil from 'ons/internal/modifier-util';
import AnimatorFactory from 'ons/internal/animator-factory';
import OverlaySplitterAnimator from './overlay-animator';
import SplitterAnimator from './animator';
import BaseElement from 'ons/base-element';
import deviceBackButtonDispatcher from 'ons/device-back-button-dispatcher';

class SplitterElement extends BaseElement {

  createdCallback() {
    this._boundOnDeviceBackButton = this._onDeviceBackButton.bind(this);
    this._boundOnModeChange = this._onModeChange.bind(this);
  }

  _onModeChange(event) {
    if (event.target.parentElement === this) {
      this._layout();
    }
  }

  /**
   * @param {String} side 'left' or 'right'.
   * @return {Element}
   */
  _getSideElement(side) {
    const result = util.findChild(this, element => {
      return element.nodeName.toLowerCase() === 'ons-splitter-side' && element.getAttribute('side') === side;
    });

    if (result) {
      CustomElements.upgrade(result);
    }

    return result;
  }

  _layout() {
    const content = this._getContentElement();
    const left = this._getSideElement('left');
    const right = this._getSideElement('right');

    if (content) {
      if (left && left.getCurrentMode && left.getCurrentMode() === 'split') {
        content.style.left = left._getWidth();
      } else {
        content.style.left = '0px';
      }

      if (right && right.getCurrentMode && right.getCurrentMode() === 'split') {
        content.style.right = right._getWidth();
      } else {
        content.style.right = '0px';
      }
    }
  }

  /**
   * @return {Element}
   */
  _getContentElement() {
    return util.findChild(this, 'ons-splitter-content');
  }

  attributeChangedCallback(name, last, current) {
  }

  /**
   * @param {Object} [options]
   */
  openRight(options = {}) {
    return this._open('right', options);
  }

  _getMaskElement() {
    const mask = util.findChild(this, 'ons-splitter-mask');
    return mask || this.appendChild(document.createElement('ons-splitter-mask'));
  }

  /**
   * @param {Object} [options]
   */
  openLeft(options = {}) {
    return this._open('left', options);
  }

  _open(side, options = {}) {
    const menu = this._getSideElement(side);

    if (menu) {
      return menu.open(options);
    }
    return false;
  }

  /**
   * @param {Object} [options]
   */
  closeRight(options = {}) {
    return this._close('right', options);
  }

  /**
   * @param {Object} [options]
   */
  closeLeft(options = {}) {
    return this._close('left', options);
  }

  /**
   * @param {String} side
   * @param {Object} [options]
   */
  _close(side, options = {}) {
    const menu = this._getSideElement(side);

    if (menu) {
      return menu.close(options);
    }
    return false;
  }

  /**
   * @param {Object} [options]
   * @return {Boolean}
   */
  toggleLeft(options = {}) {
    return this._toggle('left', options);
  }

  /**
   * @param {Object} [options]
   * @return {Boolean}
   */
  toggleRight(options = {}) {
    return this._toggle('right', options);
  }

  _toggle(side, options = {}) {
    const menu = this._getSideElement(side);

    if (menu) {
      return menu.toggle(options);
    }
    return false;
  }

  /**
   * @return {Boolean}
   */
  leftIsOpen() {
    return this._isOpen('left');
  }

  /**
   * @return {Boolean}
   */
  rightIsOpen() {
    return this._isOpen('right');
  }

  /**
   * @param {String} side
   * @return {Boolean}
   */
  _isOpen(side) {
    const menu = this._getSideElement(side);

    if (menu) {
      return menu.isOpen();
    }

    return false;
  }

  /**
   * @param {String} page
   * @param {Object} [options]
   */
  loadContentPage(page, options = {}) {
    const content = this._getContentElement();

    if (content) {
      return content.load(page, options);
    } else {
      throw new Error('child "ons-splitter-content" element is not found in this element.');
    }
  }

  _onDeviceBackButton(handler) {
    const left = this._getSideElement('left');
    const right = this._getSideElement('right');

    if (left.isOpen()) {
      left.close();
      return;
    }

    if (right.isOpen()) {
      right.close();
      return;
    }

    handler.callParentHandler();
  }

  attachedCallback() {
    this._deviceBackButtonHandler = deviceBackButtonDispatcher.createHandler(this, this._boundOnDeviceBackButton);
    this._assertChildren();

    this.addEventListener('modechange', this._boundOnModeChange, false);

    setImmediate(() => this._layout());
  }

  /**
   * @return {Object/null}
   */
  getDeviceBackButtonHandler() {
    return this._deviceBackButtonHandler;
  }

  _assertChildren() {
    const names = ['ons-splitter-content', 'ons-splitter-side', 'ons-splitter-mask'];
    let contentCount = 0;
    let sideCount = 0;
    let maskCount = 0;

    util.arrayFrom(this.children).forEach(element => {
      const name = element.nodeName.toLowerCase();
      if (names.indexOf(name) === -1) {
        throw new Error(`"${name}" element is not allowed in "ons-splitter" element.`);
      }

      if (name === 'ons-splitter-content') {
        contentCount++;
      } else if (name === 'ons-splitter-content') {
        sideCount++;
      } else if (name === 'ons-splitter-mask') {
        maskCount++;
      }
    });

    if (contentCount > 1) {
      throw new Error('too many <ons-splitter-content> elements.');
    }

    if (sideCount > 2) {
      throw new Error('too many <ons-splitter-side> elements.');
    }

    if (maskCount > 1) {
      throw new Error('too many <ons-splitter-mask> elements.');
    }

    if (maskCount === 0) {
      this.appendChild(document.createElement('ons-splitter-mask'));
    }
  }

  detachedCallback() {
    this._deviceBackButtonHandler.destroy();
    this._deviceBackButtonHandler = null;

    this.removeEventListener('modechange', this._boundOnModeChange, false);
  }

  _show() {
    util.arrayFrom(this.children).forEach(child => {
      if (child._show instanceof Function) {
        child._show();
      }
    });
  }

  _hide() {
    util.arrayFrom(this.children).forEach(child => {
      if (child._hide instanceof Function) {
        child._hide();
      }
    });
  }

  _destroy() {
    util.arrayFrom(this.children).forEach(child => {
      if (child._destroy instanceof Function) {
        child._destroy();
      }
    });
    this.remove();
  }
}

window.OnsSplitterElement = document.registerElement('ons-splitter', {
  prototype: SplitterElement.prototype
});

window.OnsSplitterElement._animatorDict = {
  default: OverlaySplitterAnimator,
  overlay: OverlaySplitterAnimator
};

window.OnsSplitterElement.registerAnimator = function(name, Animator) {
  if (!(Animator instanceof SplitterAnimator)) {
    throw new Error('Animator parameter must be an instance of SplitterAnimator.');
  }
  window.OnsSplitterElement._animatorDict[name] = Animator;
};

window.OnsSplitterElement.SplitterAnimator = SplitterAnimator;
