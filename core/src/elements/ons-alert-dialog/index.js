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
import {AlertDialogAnimator, IOSAlertDialogAnimator, AndroidAlertDialogAnimator} from './animator';
import platform from 'ons/platform';
import BaseElement from 'ons/base-element';
import deviceBackButtonDispatcher from 'ons/device-back-button-dispatcher';
import DoorLock from 'ons/doorlock';

const scheme = {
  '.alert-dialog': 'alert-dialog--*',
  '.alert-dialog-container': 'alert-dialog-container--*',
  '.alert-dialog-title': 'alert-dialog-title--*',
  '.alert-dialog-content': 'alert-dialog-content--*',
  '.alert-dialog-footer': 'alert-dialog-footer--*',
  '.alert-dialog-button': 'alert-dialog-button--*',
  '.alert-dialog-footer--one': 'alert-dialog-footer--one--*',
  '.alert-dialog-button--one': 'alert-dialog-button--one--*',
  '.alert-dialog-button--primal': 'alert-dialog-button--primal--*',
  '.alert-dialog-mask': 'alert-dialog-mask--*'
};

const templateSource = util.createElement(`
  <div>
    <div class="alert-dialog-mask"></div>
    <div class="alert-dialog">
      <div class="alert-dialog-container"></div>
    </div>
  </div>
`);

const _animatorDict = {
  'default': platform.isAndroid() ? AndroidAlertDialogAnimator : IOSAlertDialogAnimator,
  'fade': platform.isAndroid() ? AndroidAlertDialogAnimator : IOSAlertDialogAnimator,
  'none': AlertDialogAnimator
};

class AlertDialogElement extends BaseElement {

  /**
   * @return {Element}
   */
  get _mask() {
    return util.findChild(this, '.alert-dialog-mask');
  }

  /**
   * @return {Element}
   */
  get _dialog() {
    return util.findChild(this, '.alert-dialog');

  }

  /**
   * @return {Element}
   */
  get _titleElement() {
    return util.findChild(this._dialog.children[0], '.alert-dialog-title');
  }

  /**
   * @return {Element}
   */
  get _contentElement() {
    return util.findChild(this._dialog.children[0], '.alert-dialog-content');
  }

  createdCallback() {
    if (!this.hasAttribute('_compiled')) {
      this._compile();
      ModifierUtil.initModifier(this, scheme);

      this.setAttribute('_compiled', '');
    }

    this._visible = false;
    this._doorLock = new DoorLock();
    this._boundCancel = this._cancel.bind(this);

    this._animatorFactory = new AnimatorFactory({
      animators: _animatorDict,
      baseClass: AlertDialogAnimator,
      baseClassName: 'AlertDialogAnimator',
      defaultAnimation: this.getAttribute('animation')
    });
  }

  _compile() {
    const style = this.getAttribute('style');

    this.style.display = 'none';

    const template = templateSource.cloneNode(true);
    const alertDialog = template.children[1];

    if (style) {
      alertDialog.setAttribute('style', style);
    }

    while (this.firstChild) {
      alertDialog.children[0].appendChild(this.firstChild);
    }

    while (template.firstChild) {
      this.appendChild(template.firstChild);
    }

    this._dialog.style.zIndex = 20001;
    this._mask.style.zIndex = 20000;

    if (this.getAttribute('mask-color')) {
      this._mask.style.backgroundColor = this.getAttribute('mask-color');
    }
  }

  /**
   * Disable or enable alert dialog.
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
   * True if alert dialog is disabled.
   *
   * @return {Boolean}
   */
  isDisabled() {
    return this.hasAttribute('disabled');
  }

  /**
   * Make alert dialog cancelable or uncancelable.
   *
   * @param {Boolean}
   */
  setCancelable(cancelable) {
    if (typeof cancelable !== 'boolean') {
      throw new Error('Argument must be a boolean.');
    }

    if (cancelable) {
      this.setAttribute('cancelable', '');
    } else {
      this.removeAttribute('cancelable');
    }
  }

  /**
   * Show alert dialog.
   *
   * @param {Object} [options]
   * @param {String} [options.animation] animation type
   * @param {Object} [options.animationOptions] animation options
   * @param {Function} [options.callback] callback after dialog is shown
   * @return {Promise} Resolves to the displayed element
   */
  show(options = {}) {
    let cancel = false;
    const callback = options.callback || function() {};

    options.animationOptions = util.extend(
      options.animationOptions || {},
      AnimatorFactory.parseAnimationOptionsString(this.getAttribute('animation-options'))
    );

    util.triggerElementEvent(this, 'preshow', {
      alertDialog: this,
      cancel: function() {
        cancel = true;
      }
    });

    if (!cancel) {
      const tryShow = () => {
        const unlock = this._doorLock.lock();
        const animator = this._animatorFactory.newAnimator(options);

        this.style.display = 'block';
        this._mask.style.opacity = '1';

        return new Promise(resolve => {
          animator.show(this, () => {
            this._visible = true;
            unlock();

            util.triggerElementEvent(this, 'postshow', {alertDialog: this});

            callback();
            resolve(this);
          });
        });
      };

      return new Promise(resolve => {
        this._doorLock.waitUnlock(() => resolve(tryShow()));
      });
    } else {
      return Promise.reject('Canceled in preshow event.');
    }
  }

  /**
   * Hide alert dialog.
   *
   * @param {Object} [options]
   * @param {String} [options.animation] animation type
   * @param {Object} [options.animationOptions] animation options
   * @param {Function} [options.callback] callback after dialog is hidden
   * @return {Promise} Resolves to the hidden element
   */
  hide(options = {}) {
    let cancel = false;
    const callback = options.callback || function() {};

    options.animationOptions = util.extend(
      options.animationOptions || {},
      AnimatorFactory.parseAnimationOptionsString(this.getAttribute('animation-options'))
    );

    util.triggerElementEvent(this, 'prehide', {
      alertDialog: this,
      cancel: function() {
        cancel = true;
      }
    });

    if (!cancel) {
      const tryHide = () => {
        const unlock = this._doorLock.lock();
        const animator = this._animatorFactory.newAnimator(options);

        return new Promise(resolve => {
          animator.hide(this, () => {
            this.style.display = 'none';
            this._visible = false;
            unlock();

            util.triggerElementEvent(this, 'posthide', {alertDialog: this});

            callback();
            resolve(this);
          });
        });
      };

      return new Promise(resolve => {
        this._doorLock.waitUnlock(() => resolve(tryHide()));
      });
    } else {
      return Promise.reject('Canceled in prehide event.');
    }
  }

  /**
   * True if alert dialog is visible.
   *
   * @return {Boolean}
   */
  isShown() {
    return this._visible;
  }

  /**
   * Destroy alert dialog.
   */
  destroy() {
    if (this.parentElement) {
      this.parentElement.removeChild(this);
    }
  }

  isCancelable() {
    return this.hasAttribute('cancelable');
  }

  _onDeviceBackButton(event) {
    if (this.isCancelable()) {
      this._cancel();
    } else {
      event.callParentHandler();
    }
  }

  _cancel() {
    if (this.isCancelable()) {
      this.hide({
        callback: () => {
          util.triggerElementEvent(this, 'cancel');
        }
      });
    }
  }

  attachedCallback() {
    this._deviceBackButtonHandler = deviceBackButtonDispatcher.createHandler(this, this._onDeviceBackButton.bind(this));

    this._mask.addEventListener('click', this._boundCancel, false);
  }

  detachedCallback() {
    this._deviceBackButtonHandler.destroy();
    this._deviceBackButtonHandler = null;

    this._mask.removeEventListener('click', this._boundCancel.bind(this), false);
  }

  attributeChangedCallback(name, last, current) {
    if (name === 'modifier') {
      return ModifierUtil.onModifierChanged(last, current, this, scheme);
    }
  }
}

const OnsAlertDialogElement = window.OnsAlertDialogElement = document.registerElement('ons-alert-dialog', {
  prototype: AlertDialogElement.prototype
});

/**
 * @param {String} name
 * @param {DialogAnimator} Animator
 */
OnsAlertDialogElement.registerAnimator = function(name, Animator) {
  if (!(Animator.prototype instanceof AlertDialogAnimator)) {
    throw new Error('"Animator" param must inherit OnsAlertDialogElement.AlertDialogAnimator');
  }
  _animatorDict[name] = Animator;
};

OnsAlertDialogElement.AlertDialogAnimator = AlertDialogAnimator;
