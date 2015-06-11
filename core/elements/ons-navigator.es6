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

  var AnimatorFactory = ons._internal.AnimatorFactory;
  var NavigatorTransitionAnimator = ons._internal.NavigatorTransitionAnimator;
  var IOSSlideNavigatorTransitionAnimator = ons._internal.IOSSlideNavigatorTransitionAnimator;
  var SimpleSlideNavigatorTransitionAnimator = ons._internal.SimpleSlideNavigatorTransitionAnimator;
  var LiftNavigatorTransitionAnimator = ons._internal.LiftNavigatorTransitionAnimator;
  var FadeNavigatorTransitionAnimator = ons._internal.FadeNavigatorTransitionAnimator;
  var NullNavigatorTransitionAnimator = ons._internal.NullNavigatorTransitionAnimator;
  var util = ons._util;

  class NavigatorElement extends ons._BaseElement {

    createdCallback() {
      this._doorLock = new DoorLock();
      this._pages = [];
      this._bindedOnDeviceBackButton = this._onDeviceBackButton.bind(this);
      this._deviceBackButtonHandler = ons._deviceBackButtonDispatcher.createHandler(this, this._bindedOnDeviceBackButton);
      this._isPushing = this._isPopping = false;

      this._initialHTML = this.innerHTML;
      this.innerHTML = '';

      this._animatorFactory = new AnimatorFactory({
        animators: window.OnsNavigatorElement._transitionAnimatorDict,
        baseClass: NavigatorTransitionAnimator,
        baseClassName: 'NavigatorTransitionAnimator',
        defaultAnimation: this.getAttribute('animation'),
        defaultAnimationOptions: AnimatorFactory.parseJSONSafely(this.getAttribute('animation-options')) || {}
      });

      setImmediate(() => {
        if (!this.getAttribute('page')) {
          var element = util.createElement(this._initialHTML);

          setTimeout(() => {
            this._pushPageDOM('', element, {}, function() {});
          }, 300);
        } else {
          this.pushPage(this.getAttribute('page'), {animation: 'none'});
        }
        this._initialHTML = false;
      });
    }

    /**
     * @return {Boolean}
     */
    canPopPage() {
      return this._pages.length > 1;
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

      this._doorLock.waitUnlock(() => {
        if (this._pages.length <= 1) {
          throw new Error('NavigatorView\'s page stack is empty.');
        }

        if (this._emitPrePopEvent()) {
          return;
        }

        var unlock = this._doorLock.lock();

        if (options.refresh) {
          var index = this.pages.length - 2;

          if (!this._pages[index].page) {
            throw new Error('Refresh option cannot be used with pages directly inside the Navigator. Use ons-template instead.');
          }

          $onsen.getPageHTMLAsync(this._pages[index].page, (error, templateHTML) => {
            //var pageScope = this._createPageScope();
            var element = this._createPageElement(templateHTML);
            var pageObject = this._createPageObject(this._pages[index].page, element, options);

            this.insertBefore(element, this._pages[index] ? this._pages[index] : null);
            this._pages.splice(index, 0, pageObject);
            // TODO
            //link();

            this._pages[index + 1].destroy();

            this._popPage(options, unlock);

          });

        } else {
          this._popPage(options, unlock);
        }

      }.bind(this));
    }

    _popPage(options, unlock) {
      var leavePage = this._pages.pop();

      if (this._pages[this._pages.length - 1]) {
        this._pages[this._pages.length - 1].element.style.display = 'block';
      }

      var enterPage = this._pages[this._pages.length -1];

      var event = {
        leavePage: leavePage,
        enterPage: this._pages[this._pages.length - 1],
        navigator: this
      };

      var callback = () => {
        leavePage.destroy();

        this._isPopping = false;
        unlock();
        // TODO
        //this.emit('postpop', event);

        event.leavePage = null;

        if (typeof options.onTransitionEnd === 'function') {
          options.onTransitionEnd();
        }
      };

      this._isPopping = true;

      var animator = this._animatorFactory.newAnimator(options, leavePage.options.animator);
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

      if (index === this.pages.length) {
        return this.pushPage.apply(this, [].slice.call(arguments, 1));
      }

      var normalizeIndex = index => {
        if (index < 0) {
          index = this.pages.length + index;
        }
        return index;
      };

      // TODO
      this._doorLock.waitUnlock(() => {
        var unlock = this._doorLock.lock();

        $onsen.getPageHTMLAsync(page, (error, templateHTML) => {
          if (error) {
            unlock();
            throw new Error('Page is not found: ' + page);
          }

          //var pageScope = this._createPageScope();
          //var object = this._createPageElementAndLinkFunction(templateHTML, pageScope);
          var element = this._createPageElement(templateHTML);
          //var link = object.link;

          var pageObject = this._createPageObject(page, element, options);

          if (this._pages.length > 0) {
            index = normalizeIndex(index);

            this.insertBefore(element, this._pages[index] ? this._pages[index].element : null);
            this._pages.splice(index, 0, pageObject);
            //link();

            setTimeout(() => {
              if (this.getCurrentPage() !== pageObject) {
                element.display = 'none';
              }
              unlock();
              element = null;
            }, 1000 / 60);

          } else {
            this._element.append(element);
            this._pages.push(pageObject);
            link();
            unlock();
            element = null;
          }
        });
      });
    }
    
    _destroy() {
      // TODO
      //this.emit('destroy');

      this._pages.forEach(function(page) {
        page.destroy();
      });

      this._deviceBackButtonHandler.destroy();
      this._deviceBackButtonHandler = null;
    }

    get pages() {
      return this._pages.slice(0);
    }

    _onDeviceBackButton(event) {
      if (this._pages.length > 1) {
        // TODO
        //this._scope.$evalAsync(this.popPage.bind(this));
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

      var onTransitionEnd = options.onTransitionEnd || function() {};

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
    }

    detachedCallback() {
      this._destroy();
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
      var unlock = this._doorLock.lock();
      var done = function() {
        unlock();
      };

      ons._internal.getPageHTMLAsync(page, (error, templateHTML) => {
        if (error) {
          done();
          throw new Error('Page is not found: ' + page);
        }
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

      var pageObject = this._createPageObject(page, element, options);

      var event = {
        enterPage: pageObject,
        leavePage: this._pages[this._pages.length - 1],
        navigator: this
      };

      this._pages.push(pageObject);

      var done = function() {
        if (this._pages[this._pages.length - 2]) {
          this._pages[this._pages.length - 2].element.style.display = 'none';
        }

        this._isPushing = false;
        unlock();

        // TODO
        //this.emit('postpush', event);

        if (typeof options.onTransitionEnd === 'function') {
          options.onTransitionEnd();
        }
        element = null;
      }.bind(this);

      this._isPushing = true;

      if (this._pages.length > 1) {
        var leavePage = this._pages.slice(-2)[0];
        var enterPage = this._pages.slice(-1)[0];

        this.appendChild(element);
        // TODO
        //link();
        options.animator.push(enterPage, leavePage, done);
      } else {
        this.appendChild(element);
        // TODO
        //link();
        done();
      }
    }

    _emitPrePushEvent() {
      // TODO
      return false;
    }

    _emitPrePopEvent() {
      // TODO
      return false;
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
      var pageElement = util.createElement('' + templateHTML);

      if (pageElement.nodeName.toLowerCase() !== 'ons-page') {
        throw new Error('You must supply an "ons-page" element to "ons-navigator".');
      }

      return pageElement;
    }

  }

  if (!window.NavigatorElement) {
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
    window.OnsNavigatorElement.registerAnimator = function(name, animator) {
      if (!(Animator.prototype instanceof NavigatorTransitionAnimator)) {
        throw new Error('"Animator" param must inherit NavigatorTransitionAnimator');
      }

      this._transitionAnimatorDict[name] = Animator;
    };
  }

  class NavigatorPage {

    /**
     * @param {Object} params
     * @param {Object} params.page
     * @param {Object} params.element
     * @param {Object} params.options
     * @param {Object} params.navigator
     */
    constructor(params) {
      this.page = params.page;
      this.name = params.page;
      this.element = params.element;
      this.options = params.options;
      this.navigator = params.navigator;

      // Block events while page is being animated to stop scrolling, pressing buttons, etc.
      this._blockEvents = (event) => {
        if (this.navigator._isPopping || this.navigator._isPushing) {
          event.preventDefault();
          event.stopPropagation();
        }
      };

      this._pointerEvents.forEach(event => this.element.addEventListener(event, this._blockEvents), false);
    }

    get _pointerEvents() {
      return ['touchstart', 'touchend', 'touchmove', 'click'];
    }

    getDeviceBackButtonHandler() {
      return this._deviceBackButtonHandler;
    }

    /**
     * @return {PageView}
     */
    getPageView() {
      if (!this._page) {
        this._page = util.findParent('ons-page');
        if (!this._page) {
          throw new Error('Fail to fetch ons-page element.');
        }
      }
      return this._page;
    }

    destroy() {
      // TODO
      //this.pageScope.$destroy();

      this._pointerEvents.forEach(event => this.element.removeEventListener(event, this._blockEvents), false);
      util.removeElement(this.element);


      var index = this.navigator._pages.indexOf(this);
      if (index !== -1) {
        this.navigator._pages.splice(index, 1);
      }

      this.element = this._page = this.options = this.navigator = null;
    }
  }

  window.ons._internal.NavigatorPage = NavigatorPage;
})();
