/*
Copyright 2013-2014 ASIAL CORPORATION

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

(function() {
  'use strict;';

  var module = angular.module('onsen');

  module.factory('NavigatorView', function($http, $parse, $templateCache, $compile, $onsen,
    SimpleSlideTransitionAnimator, NavigatorTransitionAnimator, LiftTransitionAnimator,
    NullTransitionAnimator, IOSSlideTransitionAnimator, FadeTransitionAnimator) {

    /**
     * Manages the page navigation backed by page stack.
     *
     * @class NavigatorView
     */
    var NavigatorView = Class.extend({

      /**
       * @member jqLite Object
       */
      _element: undefined,

      /**
       * @member {Array}
       */
      pages: undefined,

      /**
       * @member {Object}
       */
      _scope: undefined,

      /**
       * @member {DoorLock}
       */
      _doorLock: undefined,

      /**
       * @member {Boolean}
       */
      _profiling: false,

      /**
       * @param {Object} options
       * @param options.element jqLite Object to manage with navigator
       * @param options.scope Angular.js scope object
       */
      init: function(options) {
        options = options || options;

        this._element = options.element || angular.element(window.document.body);
        this._scope = options.scope || this._element.scope();
        this._doorLock = new DoorLock();
        this.pages = [];

        var self = this;
        this._backButtonHandler = $onsen.backButtonHandlerStack.push(function(event) {
          self.popPage();
          event.preventDefault();
        });
        this._refreshBackButtonHandler();

        this._scope.$on('$destroy', this._destroy.bind(this));
      },

      _refreshBackButtonHandler: function() {
        this._backButtonHandler.setEnabled(this.pages.length > 1);
      },

      _destroy: function() {
        this.emit('destroy', {navigator: this});

        this.pages.forEach(function(page) {
          page.destroy();
        });

        this._backButtonHandler.remove();
        this._backButtonHandler = null;
      },

      /**
       * @param element jqLite Object
       * @return jqLite Object
       */
      _normalizePageElement: function(element) {
        for (var i = 0; i < element.length; i++) {
          if (element[i].nodeType === 1) {
            return angular.element(element[i]);
          }
        }

        throw new Error('invalid state');
      },

      /**
       * Pushes the specified pageUrl into the page stack and
       * if options object is specified, apply the options.
       *
       * @param {String} page
       * @param {Object} [options]
       * @param {String/NavigatorTransitionAnimator} [options.animation]
       * @param {Function} [options.onTransitionEnd]
       */
      pushPage: function(page, options) {
        if (this._profiling) {
          console.time('pushPage');
        }

        options = options || {};

        if (options && typeof options != 'object') {
          throw new Error('options must be an objected. You supplied ' + options);
        }

        if (this._emitPrePushEvent()) {
          return;
        }

        options.animator = getAnimatorOption();

        var self = this;
        this._doorLock.waitUnlock(function() {
          var unlock = self._doorLock.lock();
          var done = function() {
            unlock();
            if (self._profiling) {
              console.timeEnd('pushPage');
            }
          };

          $onsen.getPageHTMLAsync(page).then(function(templateHTML) {
            var pageScope = self._createPageScope();
            var pageElement = createPageElement(templateHTML, pageScope);

            setImmediate(function() {
              self._pushPageDOM(page, pageElement, pageScope, options, done);
            });

          }, function() {
            unlock();
            if (self._profiling) {
              console.timeEnd('pushPage');
            }
            throw new Error('Page is not found: ' + page);
          });
        });

        function createPageElement(templateHTML, pageScope, done) {
          var div = document.createElement('div');
          div.innerHTML = templateHTML.trim();
          var pageElement = angular.element(div);

          var hasPage = div.childElementCount === 1 &&
            div.childNodes[0].nodeName.toLowerCase() === 'ons-page';
          if (hasPage) {
            pageElement = angular.element(div.childNodes[0]);
          } else {
            throw new Error('You can not supply no "ons-page" element to "ons-navigator".');
          }

          var element = $compile(pageElement)(pageScope);
          return element;
        }

        function getAnimatorOption() {
          var animator = null;

          if (options.animation instanceof NavigatorTransitionAnimator) {
            return options.animation;
          }

          if (typeof options.animation === 'string') {
            animator = NavigatorView._transitionAnimatorDict[options.animation];
          }

          if (!animator) {
            animator = NavigatorView._transitionAnimatorDict['default'];
          }

          if (!(animator instanceof NavigatorTransitionAnimator)) {
            throw new Error('"animator" is not an instance of NavigatorTransitionAnimator.');
          }

          return animator;
        }
      },


      _createPageScope: function() {
         return this._scope.$new();
      },

      /**
       * @param {String} page Page name.
       * @param {Object} element Compiled page element.
       * @param {Object} pageScope
       * @param {Object} options
       * @param {Function} [unlock]
       */
      _pushPageDOM: function(page, element, pageScope, options, unlock) {
        if (this._profiling) {
          console.time('pushPageDOM');
        }
        unlock = unlock || function() {};
        options = options || {};
        element = this._normalizePageElement(element);

        var pageController = element.inheritedData('ons-page');
        if (!pageController) {
          throw new Error('Fail to fetch $onsPageController.');
        }

        var self = this;

        var pageObject = {
          page: page,
          name: page,
          element: element,
          pageScope: pageScope,
          controller: pageController,
          options: options,
          destroy: function() {
            pageObject.element.remove();
            pageObject.pageScope.$destroy();

            pageObject.controller = null;
            pageObject.element = null;
            pageObject.pageScope = null;
            pageObject.options = null;

            self._refreshBackButtonHandler();
          }
        };

        var event = {
          enterPage: pageObject,
          leagePage: this.pages[this.pages.length - 1],
          navigator: this
        };

        this.pages.push(pageObject);
        this._refreshBackButtonHandler();

        var done = function() {
          if (self.pages[self.pages.length - 2]) {
            self.pages[self.pages.length - 2].element.css('display', 'none');
          }

          if (self._profiling) {
            console.timeEnd('pushPageDOM');
          }

          unlock();
          self._refreshBackButtonHandler();

          self.emit('postpush', event);

          if (typeof options.onTransitionEnd === 'function') {
            options.onTransitionEnd();
          }
        };

        if (this.pages.length > 1) {
          var leavePage = this.pages.slice(-2)[0];
          var enterPage = this.pages.slice(-1)[0];

          options.animator.push(enterPage, leavePage, done);
          this._element.append(element);

        } else {
          this._element.append(element);
          done();
        }
      },

      /**
       * @return {Boolean} Whether if event is canceled.
       */
      _emitPrePushEvent: function() {
        var isCanceled = false;
        var prePushEvent = {
          navigator: this,
          currentPage: this.getCurrentPage(),
          cancel: function() {
            isCanceled = true;
          }
        };

        this.emit('prepush', prePushEvent);

        return isCanceled;
      },

      /**
       * @return {Boolean} Whether if event is canceled.
       */
      _emitPrePopEvent: function() {
        var isCanceled = false;
        var prePopEvent = {
          navigator: this,
          currentPage: this.getCurrentPage(),
          cancel: function() {
            isCanceled = true;
          }
        };

        this.emit('prepop', prePopEvent);

        return isCanceled;
      },

      /**
       * Pops current page from the page stack.
       * @param {Object} [options]
       * @param {Function} [options.onTransitionEnd]
       */
      popPage: function(options) {
        options = options || {};

        if (this.pages.length <= 1) {
          throw new Error('NavigatorView\'s page stack is empty.');
        }

        if (this._emitPrePopEvent()) {
          return;
        }

        var self = this;
        this._doorLock.waitUnlock(function() {
          var unlock = self._doorLock.lock();

          var leavePage = self.pages.pop();

          if (self.pages[self.pages.length - 1]) {
            self.pages[self.pages.length - 1].element.css('display', 'block');
          }

          var enterPage = self.pages[self.pages.length -1];

          var event = {
            leavePage: leavePage,
            enterPage: self.pages[self.pages.length - 1],
            navigator: self
          };

          var callback = function() {
            leavePage.destroy();
            unlock();
            self._refreshBackButtonHandler();
            self.emit('postpop', event);
            if (typeof options.onTransitionEnd === 'function') {
              options.onTransitionEnd();
            }
          };
          leavePage.options.animator.pop(enterPage, leavePage, callback);
        });
      },

      /**
       * Clears page stack and add the specified pageUrl to the page stack.
       * If options object is specified, apply the options.
       * the options object include all the attributes of this navigator.
       *
       * @param {String} page
       * @param {Object} [options]
       */
      resetToPage: function(page, options) {
        options = options || {};

        if (!options.animator && !options.animation) {
          options.animation = 'none';
        }

        var onTransitionEnd = options.onTransitionEnd || function() {};
        var self = this;

        options.onTransitionEnd = function() {
          while (self.pages.length > 1) {
            self.pages.shift().destroy();
          }
          onTransitionEnd();
        };

        this.pushPage(page, options);
      },

      /**
       * Get current page's navigator item.
       *
       * Use this method to access options passed by pushPage() or resetToPage() method.
       * eg. ons.navigator.getCurrentPage().options
       *
       * @return {Object} 
       */
      getCurrentPage: function() {
        return this.pages[this.pages.length - 1];
      },

      /**
       * Retrieve the entire page stages of the navigator.
       *
       * @return {Array}
       */
      getPages: function() {
        return this.pages;
      },

      /**
       * @return {Boolean}
       */
      canPopPage: function() {
        return this.pages.length > 1;
      }
    });

    // Preset transition animators.
    NavigatorView._transitionAnimatorDict = {
      'default': $onsen.isAndroid() ? new SimpleSlideTransitionAnimator() : new IOSSlideTransitionAnimator(),
      'slide': $onsen.isAndroid() ? new SimpleSlideTransitionAnimator() : new IOSSlideTransitionAnimator(),
      'lift': new LiftTransitionAnimator(),
      'fade': new FadeTransitionAnimator(),
      'none': new NullTransitionAnimator()
    };

    /**
     * @param {String} name
     * @param {NavigatorTransitionAnimator} animator
     */
    NavigatorView.registerTransitionAnimator = function(name, animator) {
      if (!(animator instanceof NavigatorTransitionAnimator)) {
        throw new Error('"animator" param must be an instance of NavigatorTransitionAnimator');
      }

      this._transitionAnimatorDict[name] = animator;
    };

    MicroEvent.mixin(NavigatorView);

    return NavigatorView;
  });
})();
