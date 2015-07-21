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
    '.dialog': 'dialog--*'
  };
  const AnimatorFactory = ons._internal.AnimatorFactory;
  const AndroidDialogAnimator = ons._internal.AndroidDialogAnimator;
  const IOSDialogAnimator = ons._internal.IOSDialogAnimator;
  const SlideDialogAnimator = ons._internal.SlideDialogAnimator;
  const DialogAnimator = ons._internal.DialogAnimator;
  const templateSource = util.createElement(`
    <div>
      <div class="dialog-mask"></div>
      <div class="dialog"></div>
    </div>
  `);

  class DialogElement extends ons._BaseElement {

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
      this._compile();
      ModifierUtil.initModifier(this, scheme);

      this._visible = false;
      this._doorLock = new DoorLock();
      this._boundCancel = this._cancel.bind(this);

      this._animatorFactory = new AnimatorFactory({
        animators: OnsDialogElement._animatorDict,
        baseClass: DialogAnimator,
        baseClassName: 'DialogAnimator',
        defaultAnimation: this.getAttribute('animation'),
        defaultAnimationOptions: AnimatorFactory.parseJSONSafely(this.getAttribute('animation-options'))
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
        dialog.appendChild(this.firstChild);
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
            this.dispatchEvent(new CustomEvent('cancel', {bubbles: true}));
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
     */
    show(options = {}) {
      let cancel = false;
      const callback = options.callback || function() {};

      this.dispatchEvent(new CustomEvent('preshow', {
        bubbles: true,
        detail: {
          dialog: this,
          cancel: function() {
            cancel = true;
          }
        }
      }));

      if (!cancel) {
        this._doorLock.waitUnlock(() => {
          const unlock = this._doorLock.lock();

          this.style.display = 'block';
          this._mask.style.opacity = '1';

          const animator = this._animatorFactory.newAnimator(options);

          animator.show(this, () => {
            this._visible = true;
            unlock();

            this.dispatchEvent(new CustomEvent('postshow', {
              bubbles: true,
              detail: {dialog: this}
            }));

            callback();
          });
        });
      }
    }

    /**
     * Hide dialog.
     *
     * @param {Object} [options]
     * @param {String} [options.animation] animation type
     * @param {Object} [options.animationOptions] animation options
     * @param {Function} [options.callback] callback after dialog is hidden
     */
    hide(options = {}) {
      let cancel = false;
      const callback = options.callback || function() {};

      this.dispatchEvent(new CustomEvent('prehide', {
        bubbles: true,
        detail: {
          dialog: this,
          cancel: function() {
            cancel = true;
          }
        }
      }));

      if (!cancel) {
        this._doorLock.waitUnlock(() => {
          const unlock = this._doorLock.lock();
          const animator = this._animatorFactory.newAnimator(options);

          animator.hide(this, () => {
            this.style.display = 'none';
            this._visible = false;
            unlock();
            this.dispatchEvent(new CustomEvent('posthide', {
              bubbles: true,
              detail: {dialog: this}
            }));
            callback();
          });
        });
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

  if (!window.OnsDialogElement) {
    window.OnsDialogElement = document.registerElement('ons-dialog', {
      prototype: DialogElement.prototype
    });

    window.OnsDialogElement._animatorDict = {
      'default': ons.platform.isAndroid() ? AndroidDialogAnimator : IOSDialogAnimator,
      'fade': ons.platform.isAndroid() ? AndroidDialogAnimator : IOSDialogAnimator,
      'slide': SlideDialogAnimator,
      'none': DialogAnimator
    };

    /**
     * @param {String} name
     * @param {DialogAnimator} Animator
     */
    window.OnsDialogElement.registerAnimator = function(name, Animator) {
      if (!(Animator.prototype instanceof DialogAnimator)) {
        throw new Error('"Animator" param must inherit DialogAnimator');
      }
      this._animatorDict[name] = Animator;
    };
  }
})();
