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
  var NavigatorPageObject = ons._internal.NavigatorPage;

  module.factory('NavigatorView', function($http, $parse, $compile, $onsen, $timeout, AnimationChooser,
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

        this._scope.$on('$destroy', this._destroy.bind(this));
      },

      _destroy: function() {
        this.emit('destroy');
        this._element = this._scope = this._attrs = null;
      },

      /* TODO
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
          //link(pageScope);
          //safeApply(pageScope);
        }
      };
      */

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

        if (index === this.pages.length) {
          return this.pushPage.apply(this, [].slice.call(arguments, 1));
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

            element = element;

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
        return this._element[0].pushPage(page, options);
      },

      getDeviceBackButtonHandler: function() {
        return this._element[0].getDeviceBackButtonHandler;
      },

      _createPageScope: function() {
         return this._scope.$new();
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
        // TODO
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
      },

      /**
       * Replaces the current page with the specified one.
       *
       * @param {String} page
       * @param {Object} [options]
       */
      replacePage: function(page, options) {
        return this._element[0].replacePage(page, options);
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
        return this._element[0].resetToPage(page, options);
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
        // TODO
        return this.pages[this.pages.length - 1];
      },

      /**
       * Retrieve the entire page stages of the navigator.
       *
       * @return {Array}
       */
      getPages: function() {
        // TODO
        return this.pages;
      },

      /**
       * @return {Boolean}
       */
      canPopPage: function() {
        return this._element[0].canPopPage();
      }
    });

    MicroEvent.mixin(NavigatorView);

    return NavigatorView;
  });
})();
