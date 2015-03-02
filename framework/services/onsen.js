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

(function(){
  'use strict';

  var module = angular.module('onsen');

  /**
   * Internal service class for framework implementation.
   */
  module.factory('$onsen', function($rootScope, $window, $cacheFactory, $document, $templateCache, $http, $q, $onsGlobal, ComponentCleaner, DeviceBackButtonHandler) {

    var unlockerDict = createUnlockerDict();
    var $onsen = createOnsenService();

    return $onsen;

    function createOnsenService() {
      return {

        DIRECTIVE_TEMPLATE_URL: 'templates',

        cleaner: ComponentCleaner,

        DeviceBackButtonHandler: DeviceBackButtonHandler,

        _defaultDeviceBackButtonHandler: DeviceBackButtonHandler.create(angular.element(document.body), function() {
          navigator.app.exitApp();
        }),

        getDefaultDeviceBackButtonHandler: function() {
          return this._defaultDeviceBackButtonHandler;
        },

        /**
         * @return {Boolean}
         */
        isEnabledAutoStatusBarFill: function() {
          return !!$onsGlobal._config.autoStatusBarFill;
        },

        /**
         * @param {HTMLElement} element
         * @return {Boolean}
         */
        shouldFillStatusBar: function(element) {
          if (this.isEnabledAutoStatusBarFill() && this.isWebView() && this.isIOS7Above()) {
            if (!(element instanceof HTMLElement)) {
              throw new Error('element must be an instance of HTMLElement');
            }
            var debug = element.tagName === 'ONS-TABBAR' ? console.log.bind(console) : angular.noop;

            for (;;) {
              if (element.hasAttribute('no-status-bar-fill')) {
                return false;
              }

              element = element.parentNode;
              debug(element);
              if (!element || !element.hasAttribute) {
                return true;
              }
            }
          }
          return false;
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

          if (!html.match(/^<(ons-page|ons-navigator|ons-tabbar|ons-sliding-menu|ons-split-view)/)) {
            html = '<ons-page>' + html + '</ons-page>';
          }
          
          return html;
        },

        /**
         * Create modifier templater function. The modifier templater generate css classes binded modifier name.
         *
         * @param {Object} attrs
         * @param {Array} [modifiers] an array of appendix modifier
         * @return {Function} 
         */
        generateModifierTemplater: function(attrs, modifiers) {
          var attrModifiers = attrs && typeof attrs.modifier === 'string' ? attrs.modifier.trim().split(/ +/) : [];
          modifiers = angular.isArray(modifiers) ? attrModifiers.concat(modifiers) : attrModifiers;

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
         * Add modifier methods to view object.
         *
         * @param {Object} view object
         * @param {String} template
         * @param {jqLite} element 
         */
        addModifierMethods: function(view, template, element) {
          var _tr = function(modifier) {
            return template.replace('*', modifier);
          };

          var fns = {
            hasModifier: function(modifier) {
              return element.hasClass(_tr(modifier));
            },

            removeModifier: function(modifier) {
              element.removeClass(_tr(modifier));
            },

            addModifier: function(modifier) {
              element.addClass(_tr(modifier)); 
            },

            setModifier: function(modifier) {
              var classes = element.attr('class').split(/\s+/),
                  patt = template.replace('*', '.');

              for (var i=0; i < classes.length; i++) {
                var cls = classes[i];

                if (cls.match(patt)) {
                  element.removeClass(cls);
                }
              }

              element.addClass(_tr(modifier));
            },

            toggleModifier: function(modifier) {
              var cls = _tr(modifier);
              if (element.hasClass(cls)) {
                element.removeClass(cls);  
              } else {
                element.addClass(cls);
              }
            }
          };

          var append = function(oldFn, newFn) {
            if (typeof oldFn !== 'undefined') {
              return function() {
                return oldFn.apply(null, arguments) || newFn.apply(null, arguments);
              };
            } else {
              return newFn;
            }
          };

          view.hasModifier = append(view.hasModifier, fns.hasModifier);
          view.removeModifier = append(view.removeModifier, fns.removeModifier);
          view.addModifier = append(view.addModifier, fns.addModifier);
          view.setModifier = append(view.setModifier, fns.setModifier);
          view.toggleModifier = append(view.toggleModifier, fns.toggleModifier);
        },

        /**
         * Remove modifier methods.
         *
         * @param {Object} view object
         */
        removeModifierMethods: function(view) {
          view.hasModifier = view.removeModifier =
            view.addModifier = view.setModifier =
            view.toggleModifier = undefined;
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
         * Fire a named event for a component. The view object, if it exists, is attached to event.component.
         *
         * @param {HTMLElement} [dom]
         * @param {String} event name
         */
        fireComponentEvent: function(dom, eventName) {
          var event = document.createEvent('HTMLEvents');

          event.component = dom ? 
            angular.element(dom).data(dom.nodeName.toLowerCase()) || null : null;
          event.initEvent(dom.nodeName.toLowerCase() + ':' + eventName, true, true);
          dom.dispatchEvent(event);
        },

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

          if (ons.componentBase) {
            set(ons.componentBase, names, object);
          }

          set($rootScope, names, object);
        }
      };
    }

    function createUnlockerDict() {

      return {
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
    }
  });
})();
