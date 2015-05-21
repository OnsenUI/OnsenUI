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

      // Block events while page is being animated to stop scrolling, pressing buttons, etc.
      this._blockEvents = function(event) {
        if (this.navigator._isPopping || this.navigator._isPushing) {
          event.preventDefault();
          event.stopPropagation();
        }
      }.bind(this);

      this.element.on(this._pointerEvents, this._blockEvents);
    },

    _pointerEvents: 'touchstart touchend touchmove click',

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
      this.pageScope.$destroy();

      this.element.off(this._pointerEvents, this._blockEvents);
      this.element.remove();
      this.element = null;

      this._pageView = null;
      this.pageScope = null;
      this.options = null;

      var index = this.navigator.pages.indexOf(this);
      if (index !== -1) {
        this.navigator.pages.splice(index, 1);
      }

      this.navigator = null;
    }
  });

  module.factory('NavigatorView', function($http, $parse, $templateCache, $compile, $onsen, $timeout, AnimationChooser,
    SimpleSlideTransitionAnimator, NavigatorTransitionAnimator, LiftTransitionAnimator,
    NullTransitionAnimator, IOSSlideTransitionAnimator, FadeTransitionAnimator) {

    /**
     * Manages the page navigation backed by page stack.
     *
     * @class NavigatorView
     */
    var NavigatorView = Class.extend({

      /**
       * @member {jqLite} Object
       */
      _element: undefined,

      /**
       * @member {Object} Object
       */
      _attrs: undefined,

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
       * @param {Object} scope
       * @param {jqLite} element jqLite Object to manage with navigator
       * @param {Object} attrs
       */
      init: function(scope, element, attrs) {

        this._element = element || angular.element(window.document.body);
        this._scope = scope || this._element.scope();
        this._attrs = attrs;
        this._doorLock = new DoorLock();
        this.pages = [];

        this._isPopping = this._isPushing = false;

        this._deviceBackButtonHandler = ons._deviceBackButtonDispatcher.createHandler(this._element[0], this._onDeviceBackButton.bind(this));
        this._scope.$on('$destroy', this._destroy.bind(this));

        this._animationChooser = new AnimationChooser({
          animators: NavigatorView._transitionAnimatorDict,
          baseClass: NavigatorTransitionAnimator,
          baseClassName: 'NavigatorTransitionAnimator',
          defaultAnimation: attrs.animation,
          defaultAnimationOptions: $parse(attrs.animationOptions)()
        });
      },

      _destroy: function() {
        this.emit('destroy');

        this.pages.forEach(function(page) {
          page.destroy();
        });

        this._deviceBackButtonHandler.destroy();
        this._deviceBackButtonHandler = null;

        this._element = this._scope = this._attrs = null;
      },

      _onDeviceBackButton: function(event) {
        if (this.pages.length > 1) {
          this._scope.$evalAsync(this.popPage.bind(this));
        } else {
          event.callParentHandler();
        }
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
          throw new Error('You must supply an "ons-page" element to "ons-navigator".');
        }

        var safeApply = function(scope) {
          var phase = scope.$root.$$phase;
          if (phase !== '$apply' && phase !== '$digest') {
            scope.$apply();
          }
        };

        var link = $compile(pageElement);

        return {
          element: pageElement,
          link: function() {
            link(pageScope);
            safeApply(pageScope);
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

        var normalizeIndex = function(index) {
          if (index < 0) {
            index = this.pages.length + index;
          }
          return index;
        }.bind(this);

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
      },

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
      pushPage: function(page, options) {
        if (this._profiling) {
          console.time('pushPage');
        }

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

      getDeviceBackButtonHandler: function() {
        return this._deviceBackButtonHandler;
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
        options.animator = this._animationChooser.newAnimator(options);

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
          leavePage: this.pages[this.pages.length - 1],
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

          this._isPushing = false;
          unlock();

          this.emit('postpush', event);

          if (typeof options.onTransitionEnd === 'function') {
            options.onTransitionEnd();
          }
          element = null;
        }.bind(this);

        this._isPushing = true;

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
       *
       * @param {Object} [options]
       * @param {String} [options.animation]
       * @param {Object} [options.animationOptions]
       * @param {Boolean} [options.refresh]
       * @param {Function} [options.onTransitionEnd]
       * @param {Boolean} [options.cancelIfRunning]
       */
      popPage: function(options) {
        options = options || {};

        if (options.cancelIfRunning && this._isPopping) {
          return;
        }

        this._doorLock.waitUnlock(function() {
          if (this.pages.length <= 1) {
            throw new Error('NavigatorView\'s page stack is empty.');
          }

          if (this._emitPrePopEvent()) {
            return;
          }

          var unlock = this._doorLock.lock();

          if (options.refresh) {
            var index = this.pages.length - 2;

            if (!this.pages[index].page) {
              throw new Error('Refresh option cannot be used with pages directly inside the Navigator. Use ons-template instead.');
            }

            $onsen.getPageHTMLAsync(this.pages[index].page).then(function(templateHTML) {
              var pageScope = this._createPageScope();
              var object = this._createPageElementAndLinkFunction(templateHTML, pageScope);
              var element = object.element;
              var link = object.link;

              element = this._normalizePageElement(element);

              var pageObject = this._createPageObject(this.pages[index].page, element, pageScope, options);

              this._element[0].insertBefore(element[0], this.pages[index] ? this.pages[index].element[0] : null);
              this.pages.splice(index, 0, pageObject);
              link();

              this.pages[index + 1].destroy();

              this._popPage(options, unlock);

            }.bind(this), function() {
              unlock();
              throw new Error('Page is not found');
            });

          } else {

            this._popPage(options, unlock);

          }

        }.bind(this));
      },

      _popPage: function(options, unlock) {
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

          this._isPopping = false;
          unlock();
          this.emit('postpop', event);

          event.leavePage = null;

          if (typeof options.onTransitionEnd === 'function') {
            options.onTransitionEnd();
          }
        }.bind(this);

        this._isPopping = true;

        var animator = this._animationChooser.newAnimator(options, leavePage.options.animator);
        animator.pop(enterPage, leavePage, callback);
      },

      /**
       * Replaces the current page with the specified one.
       *
       * @param {String} page
       * @param {Object} [options]
       */
      replacePage: function(page, options) {
        options = options || {};

        var onTransitionEnd = options.onTransitionEnd || function() {};

        options.onTransitionEnd = function() {
          if (this.pages.length > 1) {
            this.pages[this.pages.length - 2].destroy();
          }
          onTransitionEnd();
        }.bind(this);

        this.pushPage(page, options);
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
      'default': $onsen.isAndroid() ? SimpleSlideTransitionAnimator : IOSSlideTransitionAnimator,
      'slide': $onsen.isAndroid() ? SimpleSlideTransitionAnimator : IOSSlideTransitionAnimator,
      'simpleslide': SimpleSlideTransitionAnimator,
      'lift': LiftTransitionAnimator,
      'fade': FadeTransitionAnimator,
      'none': NullTransitionAnimator
    };

    /**
     * @param {String} name
     * @param {Function} Animator
     */
    NavigatorView.registerAnimator = function(name, Animator) {
      if (!(Animator.prototype instanceof NavigatorTransitionAnimator)) {
        throw new Error('"Animator" param must inherit NavigatorTransitionAnimator');
      }

      this._transitionAnimatorDict[name] = Animator;
    };

    MicroEvent.mixin(NavigatorView);

    return NavigatorView;
  });
})();
