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
import ModalAnimator from './animator';
import FadeModalAnimator from './fade-animator';
import platform from 'ons/platform';
import BaseElement from 'ons/base-element';
import deviceBackButtonDispatcher from 'ons/device-back-button-dispatcher';

const scheme = {
  '': 'modal--*',
  'modal__content': 'modal--*__content'
};

const _animatorDict = {
  'default': ModalAnimator,
  'fade': FadeModalAnimator,
  'none': ModalAnimator
};

class ModalElement extends BaseElement {

  createdCallback() {
    this._doorLock = new DoorLock();
    this._animatorFactory = new AnimatorFactory({
      animators: _animatorDict,
      baseClass: ModalAnimator,
      baseClassName: 'ModalAnimator',
      defaultAnimation: this.getAttribute('animation')
    });

    this._compile();
    ModifierUtil.initModifier(this, scheme);
  }

  getDeviceBackButtonHandler() {
    return this._deviceBackButtonHandler;
  }

  setDeviceBackButtonHandler(callback) {
    if (this._deviceBackButtonHandler) {
      this._deviceBackButtonHandler.destroy();
    }

    this._deviceBackButtonHandler = deviceBackButtonDispatcher.createHandler(this, callback);
    this._onDeviceBackButton = callback;
  }

  _onDeviceBackButton() {
    // Do nothing and stop device-backbutton handler chain.
    return;
  }

  _compile() {
    this.style.display = 'none';
    this.classList.add('modal');

    const wrapper = document.createElement('div');
    wrapper.classList.add('modal__content');

    while (this.childNodes[0]) {
      let node = this.childNodes[0];
      this.removeChild(node);
      wrapper.insertBefore(node, null);
    }

    this.appendChild(wrapper);
  }

  detachedCallback() {
    if (this._deviceBackButtonHandler) {
      this._deviceBackButtonHandler.destroy();
    }
  }

  attachedCallback() {
    setImmediate(this._ensureNodePosition.bind(this));
    this._deviceBackButtonHandler = deviceBackButtonDispatcher.createHandler(this, this._onDeviceBackButton.bind(this));
  }

  _ensureNodePosition() {
    if (!this.parentNode || this.hasAttribute('inline')) {
      return;
    }

    if (this.parentNode.nodeName.toLowerCase() !== 'ons-page') {
      var page = this;
      for (;;) {
        page = page.parentNode;

        if (!page) {
          return;
        }

        if (page.nodeName.toLowerCase() === 'ons-page') {
          break;
        }
      }
      page._registerExtraElement(this);
    }
  }

  isShown() {
    return this.style.display !== 'none';
  }

  /**
   * Show modal view.
   *
   * @param {Object} [options]
   * @param {String} [options.animation] animation type
   * @param {Object} [options.animationOptions] animation options
   * @param {Function} [options.callback] callback after modal is shown
   */
  show(options = {}) {
    options.animationOptions = util.extend(
      options.animationOptions || {},
      AnimatorFactory.parseAnimationOptionsString(this.getAttribute('animation-options'))
    );

    var callback = options.callback || function() {};

    this._doorLock.waitUnlock(() => {
      var unlock = this._doorLock.lock(),
        animator = this._animatorFactory.newAnimator(options);

      this.style.display = 'table';
      animator.show(this, function() {
        unlock();
        callback();
      });
    });
  }

  /**
   * Toggle modal view.
   *
   * @param {Object} [options]
   * @param {String} [options.animation] animation type
   * @param {Object} [options.animationOptions] animation options
   * @param {Function} [options.callback] callback after modal is toggled
   */
  toggle() {
    if (this.isShown()) {
      return this.hide.apply(this, arguments);
    } else {
      return this.show.apply(this, arguments);
    }
  }

  /**
   * Hide modal view.
   *
   * @param {Object} [options]
   * @param {String} [options.animation] animation type
   * @param {Object} [options.animationOptions] animation options
   * @param {Function} [options.callback] callback after modal is hidden
   */
  hide(options = {}) {
    options.animationOptions = util.extend(
      options.animationOptions || {},
      AnimatorFactory.parseAnimationOptionsString(this.getAttribute('animation-options'))
    );

    const callback = options.callback || function() {};

    this._doorLock.waitUnlock(() => {
      const unlock = this._doorLock.lock(),
        animator = this._animatorFactory.newAnimator(options);

      animator.hide(this, () => {
        this.style.display = 'none';
        unlock();
        callback();
      });
    });
  }

  attributeChangedCallback(name, last, current) {
    if (name === 'modifier') {
      return ModifierUtil.onModifierChanged(last, current, this, scheme);
    }
  }
}

window.OnsModalElement = document.registerElement('ons-modal', {
  prototype: ModalElement.prototype
});

/**
 * @param {String} name
 * @param {Function} Animator
 */
window.OnsModalElement.registerAnimator = function(name, Animator) {
  if (!(Animator.prototype instanceof ModalAnimator)) {
    throw new Error('"Animator" param must inherit OnsModalElement.ModalAnimator');
  }
  _animatorDict[name] = Animator;
};

window.OnsModalElement.ModalAnimator = ModalAnimator;

