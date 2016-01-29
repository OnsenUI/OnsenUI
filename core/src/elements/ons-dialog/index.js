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

import ons from 'ons/ons';
import util from 'ons/util';
import ModifierUtil from 'ons/internal/modifier-util';
import AnimatorFactory from 'ons/internal/animator-factory';
import {DialogAnimator, IOSDialogAnimator, AndroidDialogAnimator, SlideDialogAnimator} from './animator';
import platform from 'ons/platform';
import BaseElement from 'ons/base-element';
import DoorLock from 'ons/doorlock';

const scheme = {
  '.dialog': 'dialog--*',
  '.dialog-container': 'dialog-container--*',
  '.dialog-mask': 'dialog-mask--*'
};

const templateSource = util.createElement(`
  <div>
    <div class="dialog-mask"></div>
    <div class="dialog">
      <div class="dialog-container"></div>
    </div>
  </div>
`);

const _animatorDict = {
  'default': platform.isAndroid() ? AndroidDialogAnimator : IOSDialogAnimator,
  'fade': platform.isAndroid() ? AndroidDialogAnimator : IOSDialogAnimator,
  'slide': SlideDialogAnimator,
  'none': DialogAnimator
};

class DialogElement extends BaseElement {

  /**
   * @return {Element}
   */
  get _mask() {
    return util.findChild(this, '.dialog-mask');
  }

  /**
   * @return {Element}
   */
  get _dialog() {
    return util.findChild(this, '.dialog');
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
      baseClass: DialogAnimator,
      baseClassName: 'DialogAnimator',
      defaultAnimation: this.getAttribute('animation')
    });
  }

  _compile() {
    const style = this.getAttribute('style');

    this.style.display = 'none';

    const template = templateSource.cloneNode(true);
    const dialog = template.children[1];

    if (style) {
      dialog.setAttribute('style', style);
    }

    while (this.firstChild) {
      dialog.children[0].appendChild(this.firstChild);
    }

    while (template.firstChild) {
      this.appendChild(template.firstChild);
    }

    this._dialog.style.zIndex = 20001;
    this._mask.style.zIndex = 20000;

    this.setAttribute('no-status-bar-fill', '');
  }

  /**
   *  @return {Object}
   */
  getDeviceBackButtonHandler() {
    return this._deviceBackButtonHandler;
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

  /**
   * Show dialog.
   *
   * @param {Object} [options]
   * @param {String} [options.animation] animation type
   * @param {Object} [options.animationOptions] animation options
   * @param {Function} [options.callback] callback after dialog is shown
   * @return {Promise} Resolves to the displayed element.
   */
  show(options = {}) {
    let cancel = false;
    const callback = options.callback || function() {};

    options.animationOptions = util.extend(
      options.animationOptions || {},
      AnimatorFactory.parseAnimationOptionsString(this.getAttribute('animation-options'))
    );

    util.triggerElementEvent(this, 'preshow', {
      dialog: this,
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

            util.triggerElementEvent(this, 'postshow', {dialog: this});

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
   * Hide dialog.
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
      dialog: this,
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

            util.triggerElementEvent(this, 'posthide', {dialog: this});

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
   * Destroy dialog.
   */
  destroy() {
    if (this.parentElement) {
      this.parentElement.removeChild(this);
    }
  }

  /**
   * True if dialog is visible.
   *
   * @return {Boolean}
   */
  isShown() {
    return this._visible;
  }

  /**
   * True if the dialog is cancelable.
   *
   * @return {Boolean}
   */
  isCancelable() {
    return this.hasAttribute('cancelable');
  }

  /**
   * Disable or enable dialog.
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
   * True if dialog is disabled.
   *
   * @return {Boolean}
   */
  isDisabled() {
    return this.hasAttribute('disabled');
  }

  /**
   * Make dialog cancelable or uncancelable.
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

  attachedCallback() {
    this._deviceBackButtonHandler = ons._deviceBackButtonDispatcher.createHandler(this, this._onDeviceBackButton.bind(this));

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

const OnsDialogElement = window.OnsDialogElement = document.registerElement('ons-dialog', {
  prototype: DialogElement.prototype
});

/**
 * @param {String} name
 * @param {DialogAnimator} Animator
 */
OnsDialogElement.registerAnimator = function(name, Animator) {
  if (!(Animator.prototype instanceof DialogAnimator)) {
    throw new Error('"Animator" param must inherit OnsDialogElement.DialogAnimator');
  }
  _animatorDict[name] = Animator;
};

OnsDialogElement.DialogAnimator = DialogAnimator;
