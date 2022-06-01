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
import ModifierUtil from '../../ons/internal/modifier-util.js';
import AnimatorFactory from '../../ons/internal/animator-factory.js';
import DoorLock from '../../ons/doorlock.js';
import deviceBackButtonDispatcher from '../../ons/internal/device-back-button-dispatcher.js';
import contentReady from '../../ons/content-ready.js';

export default class BaseDialogElement extends BaseElement {

  get _scheme() { // eslint-disable-line getter-return
    util.throwMember();
  }

  _updateAnimatorFactory() {
    util.throwMember();
  }

  _toggleStyle(shouldShow) {
    this.style.display = shouldShow ? 'block' : 'none';
  }

  constructor() {
    super();

    if (this.constructor === BaseDialogElement) {
      util.throwAbstract();
    }

    this._visible = false;
    this._doorLock = new DoorLock();
    this._cancel = this._cancel.bind(this);
    this._selfCamelName = util.camelize(this.tagName.slice(4));
    this._defaultDBB = e => this.cancelable ? this._cancel() : e.callParentHandler();
    this._animatorFactory = this._updateAnimatorFactory();
  }

  get onDeviceBackButton() {
    return this._backButtonHandler;
  }

  set onDeviceBackButton(callback) {
    if (this._backButtonHandler) {
      this._backButtonHandler.destroy();
    }

    this._backButtonCallback = callback;
    this._backButtonHandler = deviceBackButtonDispatcher.createHandler(this, callback);
  }

  _cancel() {
    if (this.cancelable && !this._running) {
      this._running = true;
      this.hide()
        .then(
          () => {
            this._running = false;
            util.triggerElementEvent(this, 'dialogcancel');
            util.triggerElementEvent(this, 'dialog-cancel');  // dialog-cancel is deprecated but still emit to avoid breaking user code
          },
          () => this._running = false
        );
    }
  }

  show(...args) {
    return this._setVisible(true, ...args).then(dialog => {
      this.visible = true;
      return dialog;
    });
  }

  hide(...args) {
    return this._setVisible(false, ...args).then(dialog => {
      this.visible = false;
      return dialog;
    });
  }

  toggle(...args) {
    return this._setVisible(!this.visible, ...args).then(dialog => {
      this.visible = this._visible;
      return dialog;
    });
  }

  _setVisible(shouldShow, options = {}) {
    const action = shouldShow ? 'show' : 'hide';

    options = { ...options };
    options.animationOptions = util.extend(
      options.animationOptions || {},
      this.animationOptions
    );

    let canceled = false;
    util.triggerElementEvent(this, `pre${action}`, { // preshow prehide
      [this._selfCamelName]: this,
      cancel: () => canceled = true
    });

    if (canceled) {
      return Promise.reject(`Canceled in pre${action} event.`);
    }

    return new Promise(resolve => {
      this._doorLock.waitUnlock(() => {
        const unlock = this._doorLock.lock();
        const animator = this._animatorFactory.newAnimator(options);

        shouldShow && this._toggleStyle(true, options);
        this._visible = shouldShow;
        util.iosPageScrollFix(shouldShow);

        contentReady(this, () => {
          animator[action](this, () => {
            !shouldShow && this._toggleStyle(false, options);

            unlock();

            util.propagateAction(this, '_' + action);
            util.triggerElementEvent(this, 'post' + action, {[this._selfCamelName]: this}); // postshow posthide

            if (options.callback instanceof Function) {
              options.callback(this);
            }

            resolve(this);
          });
        });

      });
    });
  }

  get maskColor() {
    return this.getAttribute('mask-color');
  }

  set maskColor(value) {
    if (value === null || value === undefined) {
      this.removeAttribute('mask-color');
    } else {
      this.setAttribute('mask-color', value);
    }
  }

  get animationOptions() {
    return AnimatorFactory.parseAnimationOptionsString(this.getAttribute('animation-options'));
  }

  set animationOptions(value) {
    if (value === undefined || value === null) {
      this.removeAttribute('animation-options');
    } else {
      this.setAttribute('animation-options', JSON.stringify(value));
    }
  }

  _updateMask() {
    contentReady(this, () => {
      if (this._mask) {
        this._mask.style.backgroundColor = this.maskColor;
      }
    });
  }

  _updateAnimation() {
    this._animatorFactory = this._updateAnimatorFactory();
  }

  connectedCallback() {
    if (typeof this._backButtonCallback === 'function') {
      this.onDeviceBackButton = this._backButtonCallback;
    } else if (typeof this._defaultDBB === 'function') {
      this.onDeviceBackButton = this._defaultDBB.bind(this);
    }

    contentReady(this, () => {
      if (this._mask) {
        this._mask.addEventListener('click', this._cancel, false);
      }
    });
  }

  disconnectedCallback() {
    if (this._backButtonHandler) {
      this._backButtonHandler.destroy();
      this._backButtonHandler = null;
    }

    if (this._mask) {
      this._mask.removeEventListener('click', this._cancel, false);
    }
  }

  static get observedAttributes() {
    return ['modifier', 'animation', 'mask-color', 'visible'];
  }

  attributeChangedCallback(name, last, current) {
    switch (name) {
      case 'modifier':
        ModifierUtil.onModifierChanged(last, current, this, this._scheme);
        break;
      case 'animation':
        this._updateAnimation();
        break;
      case 'mask-color':
        this._updateMask();
        break;
      case 'visible':
        if (this.visible !== this._visible) {
          // update the mask and animation early in case `visible` attribute
          // changed callback is called before `animation` or `mask-color`
          this._updateMask();
          this._updateAnimation();

          contentReady(this, () => {
            this._setVisible(this.visible);
          });
        }
        break;
    }
  }

  static get events() {
    return ['preshow', 'postshow', 'prehide', 'posthide', 'dialogcancel', 'dialog-cancel'];
  }
}

util.defineBooleanProperties(BaseDialogElement, ['visible', 'disabled', 'cancelable']);
