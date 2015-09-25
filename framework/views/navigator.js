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
  'use strict';

  var module = angular.module('onsen');

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
       * @member {Object}
       */
      _scope: undefined,

      /**
       * @param {Object} scope
       * @param {jqLite} element jqLite Object to manage with navigator
       * @param {Object} attrs
       */
      init: function(scope, element, attrs) {

        this._element = element || angular.element(window.document.body);
        this._scope = scope || this._element.scope();
        this._attrs = attrs;
        this._previousPageScope = null;

        this._element[0]._compilePageHook.add(this._compilePage.bind(this));
        this._element[0]._linkPageHook.add(this._linkPage.bind(this));

        this._boundOnPrepop = this._onPrepop.bind(this);
        this._boundOnPostpop = this._onPostpop.bind(this);
        this._element.on('prepop', this._boundOnPrepop);
        this._element.on('postpop', this._boundOnPostpop);

        this._scope.$on('$destroy', this._destroy.bind(this));

        this._clearDerivingEvents = $onsen.deriveEvents(this, element[0], ['prepush', 'postpush', 'prepop', 'postpop', 'init', 'show', 'hide', 'destroy'], function(detail) {
          if (detail.navigator) {
            detail.navigator = this;
          }
          return detail;
        }.bind(this));
      },

      _onPrepop: function(event) {
        var pages = event.detail.navigator.pages;
        angular.element(pages[pages.length - 2].element).scope().$evalAsync();

        this._previousPageScope = angular.element(pages[pages.length - 1].element).scope();
      },

      _onPostpop: function(event) {
        this._previousPageScope.$destroy();
        this._previoousPageScope = null;
      },

      _compilePage: function(next, pageElement) {
        this._linkPage.link = $compile(pageElement);

        next(pageElement);
      },

      _linkPage: function(next, pageElement) {
        if (!this._linkPage.link) {
          throw new Error('Invalid state');
        }

        var pageScope = this._createPageScope();
        this._linkPage.link(pageScope);
        this._linkPage.link = null;

        pageScope.$evalAsync(function() {
          next(pageElement);
        });
      },

      _destroy: function() {
        this.emit('destroy');
        this._clearDerivingEvents();
        this._element.off('prepop', this._boundOnPrepop);
        this._element.off('postpop', this._boundOnPostpop);
        this._element = this._scope = this._attrs = null;
      },

      insertPage: function(index, page, options) {
        return this._element[0].insertPage(index, page, options);
      },

      pushPage: function(page, options) {
        return this._element[0].pushPage(page, options);
      },

      bringPageTop: function(item, options) {
        return this._element[0].bringPageTop(item, options);
      },

      getDeviceBackButtonHandler: function() {
        return this._element[0].getDeviceBackButtonHandler;
      },

      _createPageScope: function() {
         return this._scope.$new();
      },

      popPage: function(options) {
        return this._element[0].popPage(options);
      },

      replacePage: function(page, options) {
        return this._element[0].replacePage(page, options);
      },

      resetToPage: function(page, options) {
        return this._element[0].resetToPage(page, options);
      },

      getCurrentPage: function() {
        return this._element[0].getCurrentPage();
      },

      /**
       * Retrieve the entire page stages of the navigator.
       *
       * @return {Array}
       */
      getPages: function() {
        return this._element[0].pages;
      },

      /**
       * @return {Boolean}
       */
      canPopPage: function() {
        return this._element[0].canPopPage();
      }
    });

    MicroEvent.mixin(NavigatorView);

    Object.defineProperty(NavigatorView.prototype, 'pages', {
      get: function () {
        return this.getPages();
      },
      set: function() {
        throw new Error();
      }
    });

    return NavigatorView;
  });
})();
