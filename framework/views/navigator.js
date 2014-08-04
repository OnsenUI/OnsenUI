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

  var NavigatorPageObject = Class.extend({
    /**
     * @param {Object} params
     * @param {Object} params.page
     * @param {Object} params.element
     * @param {Object} params.pageScope
     * @param {Object} params.options
     * @param {Object} params.navigator
     */
    init: function(params) {
      this.page = params.page;
      this.name = params.page;
      this.element = params.element;
      this.pageScope = params.pageScope;
      this.options = params.options;
      this.navigator = params.navigator;
    },

    /**
     * @return {PageView}
     */
    getPageView: function() {
      if (!this._pageView) {
        this._pageView = this.element.inheritedData('ons-page');
        if (!this._pageView) {
          throw new Error('Fail to fetch PageView from ons-page element.');
        }
      }
      return this._pageView;
    },

    destroy: function() {
      this.element.remove();
      this.pageScope.$destroy();

      this._pageView = null;
      this.element = null;
      this.pageScope = null;
      this.options = null;

      var index = this.navigator.pages.indexOf(this);
      if (index !== -1) {
        this.navigator.pages.splice(index, 1);
      }

      this.navigator = null;
    }
  });

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

        this._backButtonHandler = $onsen.backButtonHandlerStack.push(this._onBackButton.bind(this));
        this._scope.$on('$destroy', this._destroy.bind(this));
      },

      _destroy: function() {
        this.emit('destroy', {navigator: this});

        this.pages.forEach(function(page) {
          page.destroy();
        });

        this._backButtonHandler.remove();
        this._backButtonHandler = null;
      },

      _onBackButton: function() {
        if (this.pages.length > 1) {
          this.popPage();
          return true;
        }

        return false;
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


      _createPageElementAndLinkFunction : function(templateHTML, pageScope, done) {
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

        var link = $compile(pageElement);
        return {
          element: pageElement,
          link: function() {
            link(pageScope);
            pageScope.$apply();
          }
        };
      },

      /**
       * Insert page object that has the specified pageUrl into the page stack and
       * if options object is specified, apply the options.
       *
       * @param {Number} index
       * @param {String} page
       * @param {Object} [options]
       * @param {String/NavigatorTransitionAnimator} [options.animation]
       */
      insertPage: function(index, page, options) {
        options = options || {};

        if (options && typeof options != 'object') {
          throw new Error('options must be an object. You supplied ' + options);
        }

        if (this.pages.length === 0) {
          return this.pushPage.apply(this, arguments);
        }

        this._doorLock.waitUnlock(function() {
          var unlock = this._doorLock.lock();

          $onsen.getPageHTMLAsync(page).then(function(templateHTML) {

            var pageScope = this._createPageScope();
            var object = this._createPageElementAndLinkFunction(templateHTML, pageScope);
            var element = object.element;
            var link = object.link;

            element = this._normalizePageElement(element);

            var pageObject = this._createPageObject(page, element, pageScope, options);

            if (this.pages.length > 0) {
              index = normalizeIndex(index);

              this._element[0].insertBefore(element[0], this.pages[index] ? this.pages[index].element[0] : null);
              this.pages.splice(index, 0, pageObject);
              link();

              setTimeout(function() {
                if (this.getCurrentPage() !== pageObject) {
                  element.css('display', 'none');
                }
                unlock();
                element = null;
              }.bind(this), 1000 / 60);

            } else {
              this._element.append(element);
              this.pages.push(pageObject);
              link();
              unlock();
              element = null;
            }
          }.bind(this), function() {
            unlock();
            throw new Error('Page is not found: ' + page);
          });
        }.bind(this));

        var normalizeIndex = function(index) {
          if (index < 0) {
            index = this.pages.length + index;
          }
          return index;
        }.bind(this);
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
          throw new Error('options must be an object. You supplied ' + options);
        }

        if (this._emitPrePushEvent()) {
          return;
        }

        this._doorLock.waitUnlock(function() {
          this._pushPage(page, options);
        }.bind(this));
      },

      _pushPage: function(page, options) {
        var unlock = this._doorLock.lock();
        var done = function() {
          unlock();
          if (this._profiling) {
            console.timeEnd('pushPage');
          }
        };

        $onsen.getPageHTMLAsync(page).then(function(templateHTML) {
          var pageScope = this._createPageScope();
          var object = this._createPageElementAndLinkFunction(templateHTML, pageScope);

          setImmediate(function() {
            this._pushPageDOM(page, object.element, object.link, pageScope, options, done);
            object = null;
          }.bind(this));
        }.bind(this), function() {
          done();
          throw new Error('Page is not found: ' + page);
        }.bind(this));
      },

      getBackButtonHandler: function() {
        return this._backButtonHandler;
      },

      /**
       * @param {Object} options pushPage()'s options parameter
       */
      _getAnimatorOption: function(options) {
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
      },


      _createPageScope: function() {
         return this._scope.$new();
      },

      /**
       * @param {String} page
       * @param {jqLite} element
       * @param {Object} pageScope
       * @param {Object} options
       */
      _createPageObject: function(page, element, pageScope, options) {
        options.animator = this._getAnimatorOption(options);

        return new NavigatorPageObject({
          page: page,
          element: element,
          pageScope: pageScope,
          options: options,
          navigator: this
        });
      },

      /**
       * @param {String} page Page name.
       * @param {Object} element
       * @param {Function} link
       * @param {Object} pageScope
       * @param {Object} options
       * @param {Function} [unlock]
       */
      _pushPageDOM: function(page, element, link, pageScope, options, unlock) {
        if (this._profiling) {
          console.time('pushPageDOM');
        }

        unlock = unlock || function() {};
        options = options || {};
        element = this._normalizePageElement(element);

        var pageObject = this._createPageObject(page, element, pageScope, options);

        var event = {
          enterPage: pageObject,
          leagePage: this.pages[this.pages.length - 1],
          navigator: this
        };

        this.pages.push(pageObject);

        var done = function() {
          if (this.pages[this.pages.length - 2]) {
            this.pages[this.pages.length - 2].element.css('display', 'none');
          }

          if (this._profiling) {
            console.timeEnd('pushPageDOM');
          }

          unlock();

          this.emit('postpush', event);

          if (typeof options.onTransitionEnd === 'function') {
            options.onTransitionEnd();
          }
          element = null;
        }.bind(this);

        if (this.pages.length > 1) {
          var leavePage = this.pages.slice(-2)[0];
          var enterPage = this.pages.slice(-1)[0];

          this._element.append(element);
          link();
          options.animator.push(enterPage, leavePage, done);
          element = null;
        } else {
          this._element.append(element);
          link();
          done();
          element = null;
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

        this._doorLock.waitUnlock(function() {
          this._popPage(options);
        }.bind(this));
      },

      _popPage: function(options) {
        var unlock = this._doorLock.lock();

        var leavePage = this.pages.pop();

        if (this.pages[this.pages.length - 1]) {
          this.pages[this.pages.length - 1].element.css('display', 'block');
        }

        var enterPage = this.pages[this.pages.length -1];

        var event = {
          leavePage: leavePage,
          enterPage: this.pages[this.pages.length - 1],
          navigator: this
        };

        var callback = function() {
          leavePage.destroy();
          unlock();
          this.emit('postpop', event);
          event.leavePage = null;

          if (typeof options.onTransitionEnd === 'function') {
            options.onTransitionEnd();
          }
        }.bind(this);

        leavePage.options.animator.pop(enterPage, leavePage, callback);
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
