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
  module.factory('$onsen', function($rootScope, $window, $cacheFactory, $document, $templateCache, $http, $q, BackButtonHandlerStack, ComponentCleaner) {

    var unlockerDict = {
      _unlockersDict: {},

      _unlockedVarDict: {},

      /**
       * @param {String} name
       * @param {Function} unlocker
       */
      _addVarLock: function (name, unlocker) {
        if (!(unlocker instanceof Function)) {
          throw new Error('unlocker argument must be an instance of Function.');
        }

        if (this._unlockersDict[name]) {
          this._unlockersDict[name].push(unlocker);
        } else {
          this._unlockersDict[name] = [unlocker];
        }
      },

      /**
       * @param {String} varName
       */
      unlockVarName: function(varName) {
        var unlockers = this._unlockersDict[varName];

        if (unlockers) {
          unlockers.forEach(function(unlock) {
            unlock();
          });
        }
        this._unlockedVarDict[varName] = true;
      },

      /**
       * @param {Array} dependencies an array of var name
       * @param {Function} callback
       */
      addCallback: function(dependencies, callback) {
        if (!(callback instanceof Function)) {
          throw new Error('callback argument must be an instance of Function.');
        }

        var doorLock = new DoorLock();
        var self = this;

        dependencies.forEach(function(varName) {

          if (!self._unlockedVarDict[varName]) {
            // wait for variable declaration
            var unlock = doorLock.lock();
            self._addVarLock(varName, unlock);
          }

        });

        if (doorLock.isLocked()) {
          doorLock.waitUnlock(callback);
        } else {
          callback();
        }
      }
    };

    /**
     * Global object stack manager.
     *
     * e.g. "ons.screen", "ons.navigator"
     */
    var aliasStack = {
      _stackDict : {},

      /**
       * @param {String} name
       * @param {Object} object
       */
      register: function(name, object) {
        this._getStack(name).push(object);
        
        $onsen._defineVar(name, object);
      },

      /**
       * @param {String} name
       * @param {Object} target
       */
      unregister: function(name, target) {
        var stack = this._getStack(name);

        var index = stack.indexOf(target);
        if (index === -1) {
          throw new Error('no such object: ' + target);
        }
        stack.splice(index, 1);

        var obj = stack.length > 0 ? stack[stack.length - 1] : null;
        $onsen._defineVar(name, obj);
      },

      /**
       * @param {String} name
       */
      _getStack: function(name) {
        if (!this._stackDict[name]) {
          this._stackDict[name] = [];
        }

        return this._stackDict[name];
      }
    };

    var $onsen = {

      DIRECTIVE_TEMPLATE_URL: "templates",

      aliasStack: aliasStack,

      cleaner: ComponentCleaner,

      _defaultBackButtonListener: function() {
        navigator.app.exitApp();
        return true;
      },

      /**
       * @param {Object} params
       * @param {Scope} [params.scope]
       * @param {jqLite} [params.element]
       * @param {Array} [params.elements]
       * @param {Attributes} [params.attrs]
       */
      clearComponent: function(params) {
        if (params.scope) {
          ComponentCleaner.destroyScope(params.scope);
        }

        if (params.attrs) {
          ComponentCleaner.destroyAttributes(params.attrs);
        }

        if (params.element) {
          ComponentCleaner.destroyElement(params.element);
        }

        if (params.elements) {
          params.elements.forEach(function(element) {
            ComponentCleaner.destroyElement(element);
          });
        }
      },

      backButtonHandlerStack: (function() {
        var stack = new BackButtonHandlerStack();

        stack.push(function() {
          return $onsen._defaultBackButtonListener();
        });

        return stack;
      })(),

      /**
       * @param {Function}
       */
      setDefaultBackButtonListener: function(listener) {
        if (!(listener instanceof Function)) {
          throw new Error('listener argument must be function.');
        }
        this._defaultBackButtonListener = listener;
      },

      /**
       * Find first ancestor of el with tagName
       * or undefined if not found
       *
       * @param {jqLite} element
       * @param {String} tagName
       */
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
       * @param {Array} dependencies
       * @param {Function} callback
       */
      waitForVariables: function(dependencies, callback) {
        unlockerDict.addCallback(dependencies, callback);
      },

      /**
       * @param {jqLite} element
       * @param {String} name
       */
      findElementeObject: function(element, name) {
        return element.inheritedData(name);
      },

      /**
       * @param {String} page
       * @return {Promise}
       */
      getPageHTMLAsync: function(page) {
        var cache = $templateCache.get(page);

        if (cache) {
          var deferred = $q.defer();

          var html = typeof cache === 'string' ? cache : cache[1];
          deferred.resolve(this.normalizePageHTML(html));

          return deferred.promise;
          
        } else {
          return $http({
            url: page,
            method: 'GET'
          }).then(function(response) {
            var html = response.data;

            return this.normalizePageHTML(html);
          }.bind(this));
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
          var varName = attrs['var'];

          this._defineVar(varName, object);
          unlockerDict.unlockVarName(varName);
        }
      },

      /**
       * @return {Boolean}
       */
      isAndroid: function() {
        return !!window.navigator.userAgent.match(/android/i);
      },

      /**
       * @return {Boolean}
       */
      isIOS: function() {
        return !!window.navigator.userAgent.match(/(ipad|iphone|ipod touch)/i);
      },

      /**
       * @return {Boolean}
       */
      isWebView: function() {
        return window.ons.isWebView();
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
