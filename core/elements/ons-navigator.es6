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

  const AnimatorFactory = ons._internal.AnimatorFactory;
  const NavigatorTransitionAnimator = ons._internal.NavigatorTransitionAnimator;
  const IOSSlideNavigatorTransitionAnimator = ons._internal.IOSSlideNavigatorTransitionAnimator;
  const SimpleSlideNavigatorTransitionAnimator = ons._internal.SimpleSlideNavigatorTransitionAnimator;
  const LiftNavigatorTransitionAnimator = ons._internal.LiftNavigatorTransitionAnimator;
  const FadeNavigatorTransitionAnimator = ons._internal.FadeNavigatorTransitionAnimator;
  const NullNavigatorTransitionAnimator = ons._internal.NullNavigatorTransitionAnimator;
  const util = ons._util;
  const AsyncHook = ons._internal.AsyncHook;
  const NavigatorPage = ons._internal.NavigatorPage;

  class NavigatorElement extends ons._BaseElement {

    createdCallback() {
      this._doorLock = new DoorLock();
      this._pages = [];
      this._boundOnDeviceBackButton = this._onDeviceBackButton.bind(this);
      this._isPushing = this._isPopping = false;

      this._initialHTML = this.innerHTML;
      this.innerHTML = '';
      this._compilePageHook = new AsyncHook();
      this._linkPageHook = new AsyncHook();

      this._animatorFactory = new AnimatorFactory({
        animators: window.OnsNavigatorElement._transitionAnimatorDict,
        baseClass: NavigatorTransitionAnimator,
        baseClassName: 'NavigatorTransitionAnimator',
        defaultAnimation: this.getAttribute('animation')
      });
    }

    /**
     * @return {Boolean}
     */
    canPopPage() {
      return this._pages.length > 1;
    }

    /**
     * Replaces the current page with the specified one.
     *
     * @param {String} page
     * @param {Object} [options]
     */
    replacePage(page, options) {
      options = options || {};

      const onTransitionEnd = options.onTransitionEnd || function() {};

      options.onTransitionEnd = () => {
        if (this._pages.length > 1) {
          this._pages[this._pages.length - 2].destroy();
        }
        onTransitionEnd();
      };

      return this.pushPage(page, options);
    }

    /**
     * Pops current page from the page stack.
     *
     * @param {Object} [options]
     * @param {String} [options.animation]
     * @param {Object} [options.animationOptions]
     * @param {Boolean} [options.refresh]
     * @param {Function} [options.onTransitionEnd]
     * @param {Boolean} [options.cancelIfRunning]
     */
    popPage(options) {
      options = options || {};

      if (options.cancelIfRunning && this._isPopping) {
        return;
      }

      options.animationOptions = util.extend(
        options.animationOptions || {},
        AnimatorFactory.parseAnimationOptionsString(this.getAttribute('animation-options'))
      );

      this._doorLock.waitUnlock(() => {
        if (this._pages.length <= 1) {
          throw new Error('ons-navigator\'s page stack is empty.');
        }

        if (this._emitPrePopEvent()) {
          return;
        }

        const unlock = this._doorLock.lock();

        if (options.refresh) {
          const index = this.pages.length - 2;

          if (!this._pages[index].page) {
            throw new Error('Refresh option cannot be used with pages directly inside the Navigator. Use ons-template instead.');
          }

          ons._internal.tryGetPageHTMLSync(this._pages[index].page, (templateHTML) => {
            const element = this._createPageElement(templateHTML);
            const pageObject = this._createPageObject(this._pages[index].page, element, options);

            this._compilePageHook.run((element) => {
              this._linkPageHook.run((element) => {
                this.insertBefore(element, this._pages[index] ? this._pages[index].element : null);
                this._pages.splice(index, 0, pageObject);

                this._pages[index + 1].destroy();
                this._popPage(options, unlock);
              }, element);
            }, element);
          });

        } else {
          this._popPage(options, unlock);
        }

      });
    }

    _popPage(options, unlock) {
      options.animationOptions = util.extend(
        options.animationOptions || {},
        AnimatorFactory.parseAnimationOptionsString(this.getAttribute('animation-options'))
      );

      const leavePage = this._pages.pop();
      const enterPage = this._pages[this._pages.length - 1];

      leavePage.element._hide();
      if (enterPage) {
        enterPage.element.style.display = 'block';
        enterPage.element._show();
      }

      // for "postpop" event
      const eventDetail = {
        leavePage: leavePage,
        enterPage: this._pages[this._pages.length - 1],
        navigator: this
      };

      const callback = () => {
        leavePage.destroy();

        this._isPopping = false;
        unlock();

        const event = util.triggerElementEvent(this, 'postpop', eventDetail);
        event.leavePage = null;

        if (typeof options.onTransitionEnd === 'function') {
          options.onTransitionEnd();
        }
      };

      this._isPopping = true;

      const animator = this._animatorFactory.newAnimator(options, leavePage.options.animator);
      animator.pop(enterPage, leavePage, callback);
    }


    /**
     * Insert page object that has the specified pageUrl into the page stack and
     * if options object is specified, apply the options.
     *
     * @param {Number} index
     * @param {String} page
     * @param {Object} [options]
     * @param {String/NavigatorTransitionAnimator} [options.animation]
     */
    insertPage(index, page, options) {

      options = options || {};

      if (options && typeof options != 'object') {
        throw new Error('options must be an object. You supplied ' + options);
      }

      const normalizeIndex = index => {
        if (index < 0) {
          index = Math.abs(this.pages.length + index) % this.pages.length;
        }
        return index;
      };

      index = normalizeIndex(index);

      if (index >= this.pages.length) {
        return this.pushPage.apply(this, [].slice.call(arguments, 1));
      }

      this._doorLock.waitUnlock(() => {
        const unlock = this._doorLock.lock();

        ons._internal.tryGetPageHTMLSync(page, (templateHTML) => {
          const element = this._createPageElement(templateHTML);

          const pageObject = this._createPageObject(page, element, options);

          this._compilePageHook.run(element => {
            this._linkPageHook.run(element => {
              element.style.display = 'none';
              this.insertBefore(element, this._pages[index].element);
              this._pages.splice(index, 0, pageObject);

              setTimeout(() => {
                unlock();
                element = null;
              }, 1000 / 60);
            }, element);
          }, element);
        });
      });
    }

    /**
     * Get current page's navigator item.
     *
     * Use this method to access options passed by pushPage() or resetToPage() method.
     * eg. ons.navigator.getCurrentPage().options
     *
     * @return {Object}
     */
    getCurrentPage() {
      if (this._pages.length <= 0) {
        throw new Error('Invalid state');
      }
      return this._pages[this._pages.length - 1];
    }

    _show() {
      if (this._pages[this._pages.length - 1]) {
        this._pages[this._pages.length - 1].element._show();
      }
    }

    _hide() {
      if (this._pages[this._pages.length - 1]) {
        this._pages[this._pages.length - 1].element._hide();
      }
    }

    _destroy() {
      for (let i = this._pages.length - 1; i >= 0; i--) {
        this._pages[i].destroy();
      }
      this.remove();
    }

    get pages() {
      return this._pages.slice(0);
    }

    _onDeviceBackButton(event) {
      if (this._pages.length > 1) {
        this.popPage();
      } else {
        event.callParentHandler();
      }
    }

    /**
     * Clears page stack and add the specified pageUrl to the page stack.
     * If options object is specified, apply the options.
     * the options object include all the attributes of this navigator.
     *
     * @param {String} page
     * @param {Object} [options]
     */
    resetToPage(page, options) {
      options = options || {};

      if (!options.animator && !options.animation) {
        options.animation = 'none';
      }

      const onTransitionEnd = options.onTransitionEnd || function() {};

      options.onTransitionEnd = () => {
        while (this._pages.length > 1) {
          this._pages.shift().destroy();
        }
        onTransitionEnd();
      };

      this.pushPage(page, options);
    }

    attributeChangedCallback(name, last, current) {
    }

    attachedCallback() {
      this._deviceBackButtonHandler = ons._deviceBackButtonDispatcher.createHandler(this, this._boundOnDeviceBackButton);

      window.OnsNavigatorElement.ready(this, () => {
        if (this._pages.length === 0) {
          this._linkPageHook.freeze();
          this._compilePageHook.freeze();

          if (!this.getAttribute('page')) {
            const element = this._createPageElement(this._initialHTML || '');

            this._pushPageDOM('', element, {}, function() {});
          } else {
            this.pushPage(this.getAttribute('page'), {animation: 'none'});
          }
          this._initialHTML = false;
        }
      });
    }

    detachedCallback() {
      this._deviceBackButtonHandler.destroy();
      this._deviceBackButtonHandler = null;
    }

    /**
     * Pushes the specified pageUrl into the page stack and
     * if options object is specified, apply the options.
     *
     * @param {String} page
     * @param {Object} [options]
     * @param {String/NavigatorTransitionAnimator} [options.animation]
     * @param {Object} [options.animationOptions]
     * @param {Function} [options.onTransitionEnd]
     * @param {Boolean} [options.cancelIfRunning]
     */
    pushPage(page, options) {
      options = options || {};

      options.animationOptions = util.extend(
        options.animationOptions || {},
        AnimatorFactory.parseAnimationOptionsString(this.getAttribute('animation-options'))
      );

      if (options.cancelIfRunning && this._isPushing) {
        return;
      }

      if (options && typeof options != 'object') {
        throw new Error('options must be an object. You supplied ' + options);
      }

      if (this._emitPrePushEvent()) {
        return;
      }

      this._doorLock.waitUnlock(() => this._pushPage(page, options));
    }

    _pushPage(page, options) {
      const unlock = this._doorLock.lock();
      const done = function() {
        unlock();
      };

      ons._internal.tryGetPageHTMLSync(page, (templateHTML) => {
        this._pushPageDOM(page, this._createPageElement(templateHTML), options, done);
      });
    }

    /**
     * @param {String} page Page name.
     * @param {Object} element
     * @param {Object} options
     * @param {Function} [unlock]
     */
    _pushPageDOM(page, element, options, unlock) {

      unlock = unlock || function() {};
      options = options || {};

      const pageObject = this._createPageObject(page, element, options);

      // for "postpush" event
      const eventDetail = {
        enterPage: pageObject,
        leavePage: this._pages[this._pages.length - 1],
        navigator: this
      };

      this._pages.push(pageObject);

      const done = () => {
        if (this._pages[this._pages.length - 2]) {
          this._pages[this._pages.length - 2].element.style.display = 'none';
        }

        this._isPushing = false;
        unlock();

        util.triggerElementEvent(this, 'postpush', eventDetail);

        if (typeof options.onTransitionEnd === 'function') {
          options.onTransitionEnd();
        }
        element = null;
      };

      this._isPushing = true;

      this._compilePageHook.run(element => {
        this._linkPageHook.run(element => {
          if (this._pages.length > 1) {
            const leavePage = this._pages.slice(-2)[0];
            const enterPage = this._pages.slice(-1)[0];

            this.appendChild(element);
            setTimeout(() => {
              leavePage.element._hide();
              enterPage.element._show();

              options.animator.push(enterPage, leavePage, done);
            }, 1000 / 60);
          } else {
            this.appendChild(element);
            element._show();

            done();
          }
        }, element);
      }, element);
    }

    /**
     * @return {Boolean} Whether if event is canceled.
     */
    _emitPrePushEvent() {
      let isCanceled = false;

      util.triggerElementEvent(this, 'prepush', {
        navigator: this,
        currentPage: this._pages.length > 0 ? this.getCurrentPage() : undefined,
        cancel: function() {
          isCanceled = true;
        }
      });

      return isCanceled;
    }

    /**
     * @return {Boolean} Whether if event is canceled.
     */
    _emitPrePopEvent() {
      let isCanceled = false;

      const leavePage = this.getCurrentPage();
      util.triggerElementEvent(this, 'prepop', {
        navigator: this,
        // TODO: currentPage will be deprecated
        currentPage: leavePage,
        leavePage: leavePage,
        enterPage: this._pages[this._pages.length - 2],
        cancel: function() {
          isCanceled = true;
        }
      });

      return isCanceled;
    }

    /**
     * @param {String} page
     * @param {Element} element
     * @param {Object} options
     */
    _createPageObject(page, element, options) {

      options.animator = this._animatorFactory.newAnimator(options);

      return new NavigatorPage({
        page: page,
        element: element,
        options: options,
        navigator: this
      });
    }

    _createPageElement(templateHTML) {
      const pageElement = util.createElement(ons._internal.normalizePageHTML(templateHTML));

      if (pageElement.nodeName.toLowerCase() !== 'ons-page') {
        throw new Error('You must supply an "ons-page" element to "ons-navigator".');
      }

      return pageElement;
    }

  }

  if (!window.OnsNavigatorElement) {
    window.OnsNavigatorElement = document.registerElement('ons-navigator', {
      prototype: NavigatorElement.prototype
    });

    window.OnsNavigatorElement._transitionAnimatorDict = {
      'default': ons.platform.isAndroid() ? SimpleSlideNavigatorTransitionAnimator : IOSSlideNavigatorTransitionAnimator,
      'slide': ons.platform.isAndroid() ? SimpleSlideNavigatorTransitionAnimator : IOSSlideNavigatorTransitionAnimator,
      'simpleslide': SimpleSlideNavigatorTransitionAnimator,
      'lift': LiftNavigatorTransitionAnimator,
      'fade': FadeNavigatorTransitionAnimator,
      'none': NullNavigatorTransitionAnimator
    };

    /**
     * @param {String} name
     * @param {Function} Animator
     */
    window.OnsNavigatorElement.registerAnimator = function(name, Animator) {
      if (!(Animator.prototype instanceof NavigatorTransitionAnimator)) {
        throw new Error('"Animator" param must inherit NavigatorTransitionAnimator');
      }

      this._transitionAnimatorDict[name] = Animator;
    };

    window.OnsNavigatorElement.ready = function(element, done) {
      done();
    };
  }
})();
