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

  var directives = angular.module('onsen');

  directives.factory('Navigator', function($http, $parse, $templateCache, $compile, requestAnimationFrame, PredefinedPageCache, OnsenUtil) {

    /**
     * Manages the page navigation backed by page stack.
     *
     * @class Navigator
     */
    var Navigator = Class.extend({

      /**
       * @member {Array}
       */
      pages: undefined,

      /**
       * @member {Object}
       */
      scope: undefined,

      /**
       * @param {Object} options
       * @param {HTMLElement} options.element DOM for navigator container
       */
      init: function(options) {
        options = options || options;

        this.element = options.element || window.document.body;
        this.scope = options.scope;
        this.pages = [];
      },

      /**
       * Pushes the specified pageUrl into the page stack and
       * if options object is specified, apply the options.
       *
       * @param {String} page
       * @param {Object} [options]
       */
      pushPage: function(page, options) {
        options = options || {};

        if (options && typeof options != "object") {
          throw new Error('options must be an objected. You supplied ' + options);
        }

        var templateHTML = $templateCache.get(page);

        if (templateHTML) {
          var pageScope = this._createPageScope();
          var pageElement = createPageElement(templateHTML, pageScope);

          this._pushPageDOM(page, pageElement, pageScope, options);
        } else {
          var that = this;

          $http({
            url: page,
            method: 'GET',
            cache: PredefinedPageCache
          })
            .success(function(templateHTML, status, headers, config) {
              var pageScope = that._createPageScope();
              var pageElement = createPageElement(templateHTML, pageScope);

              that._pushPageDOM(page, pageElement, pageScope, options);
            })
            
            .error(function(data, status, headers, config) {
              console.error('error', data, status);
            });
        }

        function createPageElement(templateHTML, pageScope) {
          var div = document.createElement('div');
          div.innerHTML = templateHTML;
          var pageElement = angular.element(div);

          var hasPage = div.childElementCount === 1 && div.childNodes[0].nodeName === 'ONS-PAGE';
          if (hasPage) {
            pageElement = angular.element(div.childNodes[0]);
          }

          var pageElement = $compile(pageElement)(pageScope);

          return pageElement;
        }
      },

      _createPageScope: function() {
         return this.scope.$parent.$new();
      },

      /**
       * @param {String} page
       * @param {Object} jqueryElement
       * @param {Object} pageScope
       * @param {Object} options
       */
      _pushPageDOM: function(page, jqueryElement, pageScope, options) {
        this.pages.push({
          page: page,
          element: jqueryElement,
          pageScope: pageScope,
          options: options || {}
        });
        angular.element(this.element).append(jqueryElement);
      },

      /**
       * Pops current page from the page stack.
       */
      popPage: function() {
        var page = this.pages.pop();
        page.element.remove();
      },

      /**
       * Clears page stack and add the specified pageUrl to the page stack.
       * If options object is specified, apply the options.
       * the options object include all the attributes of this navigator
       *
       * @param {String} page
       * @param {Object} [options]
       */
      resetToPage: function(page, options) {
        while (this.pages.length > 0) {
          var page = this.pages.pop();
          page.element.remove();
        }

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
        return this.pages.last();
      },

      /**
       * Retrieve the entire page stages of the navigator.
       *
       * @return {Array}
       */
      getPages: function() {
        return this.pages;
      }
    });

    return Navigator;
  });
})();
