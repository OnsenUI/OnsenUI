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
    '.floating-menu': 'floating-menu--*',
    '.floating-menu__item': 'floating-menu__item--*'
  };
  const templateSource = util.createElement(`
    <div>
      <div class="floating-menu__mask"></div>
      <div class="floating-menu"></div>
    </div>
  `);

  class FloatingMenuElement extends ons._BaseElement {

    get _mask() {
      return this.children[0];
    }

    get _floatingMenu() {
      return this.children[1];
    }

    get _content() {
      return this._floatingMenu.children[0];
    }

    createdCallback() {
      this._compile();
      this.style.display = 'none';
      ModifierUtil.initModifier(this, scheme);

      this._mask.style.zIndex = '20000';
      this._floatingMenu.style.zIndex = '20001';

      this._visible = false;
      this._boundOnChange = this._onChange.bind(this);
      this._boundCancel = this._cancel.bind(this);
      this._boundOnAnimation = this._onAnimationEnd.bind(this);
      this._boundOnAnimationOpen = this._onAnimationEndOpen.bind(this);
    }

    _onAnimationEnd() {
      this.style.display = 'none';
      this.removeEventListener('webkitTransitionEnd', this._boundOnAnimation);
      this.removeEventListener('transitionend', this._boundOnAnimation);
    }

    _onAnimationEndOpen() {
      this.style.display = 'block';
      this.removeEventListener('webkitTransitionEnd', this._boundOnAnimationOpen);
      this.removeEventListener('transitionend', this._boundOnAnimationOpen);
    }


    _onDeviceBackButton(event) {
      if (this.isCancelable()) {
        this._cancel();
      } else {
        event.callParentHandler();
      }
    }

    _positionFloatingMenu(target) {
      var position = target.getBoundingClientRect();
      var own = this._floatingMenu.getBoundingClientRect();
      var newTop = position.top;
      var newLeft = position.left;
      var padding = 8;

      // Keep menu position inside window.
      if (newTop < padding) {
        newTop = padding;
          }
      if (newLeft < padding) {
        newLeft = padding;
      }
      if (window.innerHeight < newTop + own.height + padding) {
        newTop = window.innerHeight - own.height - padding;
      }
      if (window.innerWidth < newLeft + own.width + padding) {
        newLeft = window.innerWidth - own.width - padding;
      }
      this._floatingMenu.style.top = newTop + 'px';
      this._floatingMenu.style.left = newLeft + 'px';
    }

    _onChange() {
      setImmediate(() => {
        if (this._currentTarget) {
          this._positionFloatingMenu(this._currentTarget);
        }
      });
    }

    _compile() {
       var templateElement = templateSource.cloneNode(true);
       var content = templateElement.querySelector('.floating-menu');
       while (this.childNodes[0]) {
         content.appendChild(this.childNodes[0]);
       }
       while (templateElement.children[0]) {
         this.appendChild(templateElement.children[0]);
       }
    }

    /**
     * Show floating menu.
     *
     * @param {HTMLElement} [target] target element
     * @param {String} [target] css selector
     * @param {Event} [target] event
     * @param {Object} [options] options
     * @param {String} [options.animation] animation type
     * @param {Object} [options.animationOptions] animation options
     */
    show(target, options) {
      if (typeof target === 'string') {
        target = document.querySelector(target);
      } else if (target instanceof Event) {
        target = target.target;
      }

      if (!target) {
       throw new Error('Target undefined');
      }

      options = options || {};

      let canceled = false;
      const event = new CustomEvent('preshow', {
        bubbles: true,
        detail: {
          floatingMenu: this,
          cancel: function() {
            canceled = true;
          }
        }
      });
      this.dispatchEvent(event);

      if (!canceled) {
        this.style.display = 'block';
        this._floatingMenu.style.maxHeight = '200px';
        this._currentTarget = target;

        this.addEventListener('webkitTransitionEnd', this._boundOnAnimationOpen);
        this.addEventListener('transitionend', this._boundOnAnimationOpen);
        this._positionFloatingMenu(target);
      }
    }

    /**
     * Hide floating menu.
     *
     * @param {Object} [options] options
     * @param {String} [options.animation] animation type
     * @param {Object} [options.animationOptions] animation options
     */
    hide(options) {
      options = options || {};

      let canceled = false;
      const event = new CustomEvent('prehide', {
        bubbles: true,
        detail: {
          floatingMenu: this,
          cancel: function() {
            canceled = true;
          }
        }
      });
      this.dispatchEvent(event);

      if (!canceled) {
        this._floatingMenu.style.maxHeight = '0px';
        this._visible = false;
        this.addEventListener('webkitTransitionEnd', this._boundOnAnimation);
        this.addEventListener('transitionend', this._boundOnAnimation);
      }
    }

    /**
     * Returns whether the floating menu is visible or not.
     *
     * @return {Boolean}
     */
    isShown() {
      return this._visible;
    }

    attachedCallback() {
      window.addEventListener('resize', this._boundOnChange, false);
      this._mask.addEventListener('click', this._boundCancel, false);
    }

    detachedCallback() {
      window.removeEventListener('resize', this._boundOnChange, false);
      this._mask.removeEventListener('click', this._boundCancel, false);

    }

    attributeChangedCallback(name, last, current) {
      if (name === 'modifier') {
        return ModifierUtil.onModifierChanged(last, current, this, scheme);
      }
    }

    /**
     * Set whether the floating menu should be cancelable or not.
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
     * Return whether the floating menu is cancelable or not.
     *
     * @return {Boolean}
     */
    isCancelable() {
      return this.hasAttribute('cancelable');
    }

    /**
     * Destroy the floating menu and remove it from the DOM tree.
     */
    destroy() {
      if (this.parentElement) {
        this.parentElement.removeChild(this);
      }
    }

    _cancel() {
      if (this.isCancelable()) {
        this.hide();
      }
    }
  }

  if (!window.OnsFloatingMenuElement) {
    window.OnsFloatingMenuElement = document.registerElement('ons-floating-menu', {
      prototype: FloatingMenuElement.prototype
    });
  }
})();
