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

(function(){
  'use strict';

  var module = angular.module('onsen');

  /**
   * Internal service class for framework implementation.
   */
  module.factory('$onsen', function($rootScope, $window, $cacheFactory, $document, $templateCache, $http, $q) {

    var $onsen = {

      DIRECTIVE_TEMPLATE_URL: "templates",

      /**
       * Cache for predefined template.
       * eg. <script type="text/ons-template">...</script>
       */
      predefinedPageCache: (function() {
        var cache = $cacheFactory('$onsenPredefinedPageCache');

        var templates = $document[0].querySelectorAll('script[type="text/ons-template"]');

        for (var i = 0; i < templates.length; i++) {
          var template = angular.element(templates[i]);
          var id = template.attr('id');
          if (typeof id === 'string') {
            cache.put(id, template.text());
          }
        }

        return cache;
      })(),

      // Find first ancestor of el with tagName
      // or undefined if not found
      upTo : function(el, tagName) {
        tagName = tagName.toLowerCase();

        do {
          if (!el) {
            return null;
          }
          el = el.parentNode;
          if (el.tagName.toLowerCase() == tagName) {
            return el;
          }
        } while (el.parentNode);

        return null;
      },

      /**
       * @param {String} page
       * @return {Promise}
       */
      getPageHTMLAsync: function(page) {
        var cache = $templateCache.get(page) || $onsen.predefinedPageCache.get(page);

        if (cache) {
          var deferred = $q.defer();

          var html = typeof cache === 'string' ? cache : cache[1];
          deferred.resolve(this.normalizePageHTML(html));

          return deferred.promise;
          
        } else {
          return $http({
            url: page,
            method: 'GET',
            cache: $onsen.predefinedPageCache
          }).then(function(response) {
            var html = response.data;

            return this.normalizePageHTML(html);
          }.bind(this));
        }

        function normalize(html) {
        }
      },

      /**
       * @param {String} html
       * @return {String}
       */
      normalizePageHTML: function(html) {
        html = ('' + html).trim();

        if (!html.match(/^<ons-page/)) {
          html = '<ons-page>' + html + '</ons-page>';
        }
        
        return html;
      },

      /**
       * Create modifier templater function. The modifier templater generate css classes binded modifier name.
       *
       * @param {Object} attrs
       * @return {Function} 
       */
      generateModifierTemplater: function(attrs) {
        var modifiers = attrs && typeof attrs.modifier === 'string' ? attrs.modifier.trim().split(/ +/) : [];

        /**
         * @return {String} template eg. 'ons-button--*', 'ons-button--*__item'
         * @return {String}
         */
        return function(template) {
          return modifiers.map(function(modifier) {
            return template.replace('*', modifier);
          }).join(' ');
        };
      },

      /**
       * Define a variable to JavaScript global scope and AngularJS scope as 'var' attribute name.
       *
       * @param {Object} attrs
       * @param object
       */
      declareVarAttribute: function(attrs, object) {
        if (typeof attrs['var'] === 'string') {
          this._defineVar(attrs['var'], object);
        }
      },

      /**
       * @return {Boolean}
       */
      isWebView: function() {
        return !!(window.cordova || window.phonegap || window.PhoneGap);
      },

      /**
       * @return {Boolean}
       */
      isIOS7Above: (function() {
        var ua = window.navigator.userAgent;
        var match = ua.match(/(iPad|iPhone|iPod touch);.*CPU.*OS (\d+)_(\d+)/i);

        var result = match ? parseFloat(match[2] + '.' + match[3]) >= 7 : false;

        return function() {
          return result;
        };
      })(),

      /**
       * Define a variable to JavaScript global scope and AngularJS scope.
       *
       * Util.defineVar('foo', 'foo-value');
       * // => window.foo and $scope.foo is now 'foo-value'
       *
       * Util.defineVar('foo.bar', 'foo-bar-value');
       * // => window.foo.bar and $scope.foo.bar is now 'foo-bar-value'
       *
       * @param {String} name
       * @param object
       */
      _defineVar: function(name, object) {
        var names = name.split(/\./);

        function set(container, names, object) {
          var name;
          for (var i = 0; i < names.length - 1; i++) {
            name = names[i];
            if (container[name] === undefined || container[name] === null) {
              container[name] = {};
            }
            container = container[name];
          }

          container[names[names.length - 1]] = object;
        }

        set($window, names, object);
        set($rootScope, names, object);        
      }
    };

    return $onsen;
    
  });
})();
