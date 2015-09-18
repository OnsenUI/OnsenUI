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

(() => {
  'use strict';

  const util = ons._util;
  const ModifierUtil = ons._internal.ModifierUtil;
  const scheme = {
    '': 'alert-dialog--*',
    '.alert-dialog-title': 'alert-dialog-title--*',
    '.alert-dialog-content': 'alert-dialog-content--*'
  };
  const AnimatorFactory = ons._internal.AnimatorFactory;
  const AndroidAlertDialogAnimator = ons._internal.AndroidAlertDialogAnimator;
  const IOSAlertDialogAnimator = ons._internal.IOSAlertDialogAnimator;
  const SlideDialogAnimator = ons._internal.SlideDialogAnimator;
  const AlertDialogAnimator = ons._internal.AlertDialogAnimator;

  class AlertDialogElement extends ons._BaseElement {

    get _titleElement() {
      return util.findChild(this, '.alert-dialog-title');
    }

    get _contentElement() {
      return util.findChild(this, '.alert-dialog-content');
    }

    get _dialog() {
      return this;
    }

    createdCallback() {
      this._compile();
      this._mask = this._createMask(this.getAttribute('mask-color'));

      ModifierUtil.initModifier(this, scheme);

      this._animatorFactory = new AnimatorFactory({
        animators: OnsAlertDialogElement._animatorDict,
        baseClass: AlertDialogAnimator,
        baseClassName: 'AlertDialogAnimator',
        defaultAnimation: this.getAttribute('animation'),
        defaultAnimationOptions: AnimatorFactory.parseJSONSafely(this.getAttribute('animation-options'))
      });

      this._visible = false;
      this._doorLock = new DoorLock();
      this._boundCancel = this._cancel.bind(this);
    }

    _compile() {
      this.style.display = 'none';
      this.style.zIndex = '20001';
      this.classList.add('alert-dialog');

      if (ons.platform.isAndroid()) {
        let modifier = this.hasAttribute('modifier') ? this.getAttribute('modifier') : '';
        this.setAttribute('modifier', (modifier + ' android').trim());
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
     */
    show(options = {}) {
      let cancel = false;
      const callback = options.callback || function() {};

      util.triggerElementEvent(this, 'preshow', {
        alertDialog: this,
        cancel: function() {
          cancel = true;
        }
      });

      if (!cancel) {
        this._doorLock.waitUnlock(() => {
          const unlock = this._doorLock.lock();

          this._mask.style.display = 'block';
          this._mask.style.opacity = 1;
          this.style.display = 'block';

          const animator = this._animatorFactory.newAnimator(options);
          animator.show(this, () => {
            this._visible = true;
            unlock();
            util.triggerElementEvent(this, 'postshow', {alertDialog: this});
            callback();
          });
        });
      }
    }

    /**
     * Hide alert dialog.
     *
     * @param {Object} [options]
     * @param {String} [options.animation] animation type
     * @param {Object} [options.animationOptions] animation options
     * @param {Function} [options.callback] callback after dialog is hidden
     */
    hide(options = {}) {
      let cancel = false;
      const callback = options.callback || function() {};

      util.triggerElementEvent(this, 'prehide', {
        alertDialog: this,
        cancel: function() {
          cancel = true;
        }
      });

      if (!cancel) {
        this._doorLock.waitUnlock(() => {
          const unlock = this._doorLock.lock();

          const animator = this._animatorFactory.newAnimator(options);
          animator.hide(this, () => {
            this.style.display = 'none';
            this._mask.style.display = 'none';
            this._visible = false;
            unlock();
            util.triggerElementEvent(this, 'posthide', {alertDialog: this});
            callback();
          });
        });
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

      if (this._mask.parentElement) {
        this._mask.parentElement.removeChild(this._mask);
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

    _createMask(color) {
      this._mask = util.createElement('<div></div>');
      this._mask.classList.add('alert-dialog-mask');
      this._mask.style.zIndex = 20000;
      this._mask.style.display = 'none';

      if (color) {
        this._mask.style.backgroundColor = color;
      }

      document.body.appendChild(this._mask);
      return this._mask;
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

  if (!window.OnsAlertDialogElement) {
    window.OnsAlertDialogElement = document.registerElement('ons-alert-dialog', {
      prototype: AlertDialogElement.prototype
    });

    window.OnsAlertDialogElement._animatorDict = {
      'default': ons.platform.isAndroid() ? AndroidAlertDialogAnimator : IOSAlertDialogAnimator,
      'fade': ons.platform.isAndroid() ? AndroidAlertDialogAnimator : IOSAlertDialogAnimator,
      'slide': SlideDialogAnimator,
      'none': AlertDialogAnimator
    };

    /**
     * @param {String} name
     * @param {DialogAnimator} Animator
     */
    window.OnsAlertDialogElement.registerAnimator = function(name, Animator) {
      if (!(Animator.prototype instanceof AlertDialogAnimator)) {
        throw new Error('"Animator" param must inherit DialogAnimator');
      }
      this._animatorDict[name] = Animator;
    };
  }
})();
