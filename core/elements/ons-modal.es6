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

  var scheme = {
    '': 'modal--*',
    'modal__content': 'modal--*__content'
  };

  var AnimatorFactory = ons._internal.AnimatorFactory;
  var ModalAnimator = ons._internal.ModalAnimator;
  var FadeModalAnimator = ons._internal.FadeModalAnimator;
  var ModifierUtil = ons._internal.ModifierUtil;

  class ModalElement extends ons._BaseElement {

    createdCallback() {
      this._doorLock = new DoorLock();
      this._animatorFactory = new AnimatorFactory({
        animators: ModalElement._animatorDict,
        baseClass: ModalAnimator,
        baseClassName: 'ModalAnimator',
        defaultAnimation: this.getAttribute('animation'),
        defaultAnimationOptions: AnimatorFactory.parseJSONSafely(this.getAttribute('animation-options')) || {}
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

      this._deviceBackButtonHandler = ons._deviceBackButtonDispatcher.createHandler(this, callback);
      this._onDeviceBackButton = callback;
    }

    _onDeviceBackButton() {
      // Do nothing and stop device-backbutton handler chain.
      return;
    }

    _compile() {
      this.style.display = 'none';
      this.classList.add('modal');

      var wrapper = document.createElement('div');
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

    atachedCallback() {
      setImmediate(this._ensureNodePosition.bind(this));
      this._deviceBackButtonHandler = ons._deviceBackButtonDispatcher.createHandler(this, this._onDeviceBackButton.bind(this));
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

    _isVisible() {
      return this.clientWidth > 0;
    }

    /**
     * Show modal view.
     *
     * @param {Object} [options]
     * @param {String} [options.animation] animation type
     * @param {Object} [options.animationOptions] animation options
     * @param {Function} [options.callback] callback after modal is shown
     */
    show(options) {
      options = options || {};

      var callback = options.callback || function() {};

      this._doorLock.waitUnlock(function() {
        var unlock = this._doorLock.lock(),
          animator = this._animatorFactory.newAnimator(options);

        this.style.display = 'table';
        animator.show(this, function() {
          unlock();
          callback();
        });
      }.bind(this));
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
      if (this._isVisible()) {
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
    hide(options) {
      options = options || {};

      var callback = options.callback || function() {};

      this._doorLock.waitUnlock(function() {
        var unlock = this._doorLock.lock(),
          animator = this._animatorFactory.newAnimator(options);

        animator.hide(this, function() {
          this.style.display = 'none';
          unlock();
          callback();
        }.bind(this));
      }.bind(this));
    }

    attributeChangedCallback(name, last, current) {

      if (name === 'width') {
        this._updateWidth();
      }
    }
  }

  ModalElement._animatorDict = {
    'default': ModalAnimator,
    'fade': FadeModalAnimator,
    'none': ModalAnimator
  };

  /**
   * @param {String} name
   * @param {Function} Animator
   */
  ModalElement.registerAnimator = function(name, Animator) {
    if (!(Animator.prototype instanceof ModalAnimator)) {
      throw new Error('"Animator" param must inherit DialogAnimator');
    }
    ModalElement._animatorDict[name] = Animator;
  };

  if (!window.OnsModalElement) {
    window.OnsModalElement = document.registerElement('ons-modal', {
      prototype: ModalElement.prototype
    });
  }
})();
