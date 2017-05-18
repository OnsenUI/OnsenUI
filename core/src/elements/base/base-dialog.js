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

import util from '../../ons/util';
import BaseElement from './base-element';
import ModifierUtil from '../../ons/internal/modifier-util';
import AnimatorFactory from '../../ons/internal/animator-factory';
import DoorLock from '../../ons/doorlock';
import deviceBackButtonDispatcher from '../../ons/device-back-button-dispatcher';
import contentReady from '../../ons/content-ready';

export default class BaseDialogElement extends BaseElement {

  get _scheme() {
    throw new Error('_scheme getter must be implemented.');
  }

  _updateAnimatorFactory() {
    throw new Error('_updateAnimatorFactory method must be implemented.');
  }

  _toggleStyle(shouldShow) {
    this.style.display = shouldShow ? 'block' : 'none';
  }

  constructor() {
    super();

    this._visible = false;
    this._doorLock = new DoorLock();
    this._boundCancel = () => this._cancel();
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

    this._backButtonHandler = deviceBackButtonDispatcher.createHandler(this, callback);
  }

  _cancel() {
    if (this.cancelable && !this._running) {
      this._running = true;
      this.hide()
        .then(
          () => {
            this._running = false;
            util.triggerElementEvent(this, 'dialog-cancel');
          },
          () => this._running = false
        );
    }
  }

  show(...args) {
    return this._setVisible(true, ...args);
  }

  hide(...args) {
    return this._setVisible(false, ...args);
  }

  toggle(...args) {
    return this._setVisible(!this.visible, ...args);
  }

  _setVisible(shouldShow, options = {}) {
    const action = shouldShow ? 'show' : 'hide';

    options = { ...options };
    options.animationOptions = util.extend(
      options.animationOptions || {},
      AnimatorFactory.parseAnimationOptionsString(this.getAttribute('animation-options'))
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

        contentReady(this, () => {
          animator[action](this, () => {
            !shouldShow && this._toggleStyle(false, options);
            this._visible = shouldShow;

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

  get visible() {
    return this._visible;
  }

  set disabled(value) {
    return util.toggleAttribute(this, 'disabled', value);
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  set cancelable(value) {
    return util.toggleAttribute(this, 'cancelable', value);
  }

  get cancelable() {
    return this.hasAttribute('cancelable');
  }

  _updateMask() {
    contentReady(this, () => {
      if (this._mask && this.getAttribute('mask-color')) {
        this._mask.style.backgroundColor = this.getAttribute('mask-color');
      }
    });
  }

  connectedCallback() {
    this.onDeviceBackButton = this._defaultDBB.bind(this);

    contentReady(this, () => {
      this._mask && this._mask.addEventListener('click', this._boundCancel, false);
    });
  }

  disconnectedCallback() {
    this._backButtonHandler.destroy();
    this._backButtonHandler = null;

    this._mask && this._mask.removeEventListener('click', this._boundCancel.bind(this), false);
  }

  static get observedAttributes() {
    return ['modifier', 'animation', 'mask-color'];
  }

  attributeChangedCallback(name, last, current) {
    switch (name) {
      case 'modifier':
        ModifierUtil.onModifierChanged(last, current, this, this._scheme);
        break;
      case 'animation':
        this._animatorFactory = this._updateAnimatorFactory();
        break;
      case 'mask-color':
        this._updateMask();
        break;
    }
  }

  static get events() {
    return ['preshow', 'postshow', 'prehide', 'posthide', 'dialog-cancel'];
  }
}
