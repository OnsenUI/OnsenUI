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

window.ons = (function(){
  'use strict';

  var module = angular.module('onsen', ['templates-main']);
  angular.module('onsen.directives', ['onsen']); // for BC

  // JS Global facade for Onsen UI.
  var ons = createOnsenFacade();
  initKeyboardEvents();
  waitDeviceReady();
  waitOnsenUILoad();
  initAngularModule();

  return ons;

  function waitDeviceReady() {
    var unlockDeviceReady = ons._readyLock.lock();
    window.addEventListener('DOMContentLoaded', function() {
      if (ons.isWebView()) {
        window.document.addEventListener('deviceready', unlockDeviceReady, false);
      } else {
        unlockDeviceReady();
      }
    }, false);
  }

  function waitOnsenUILoad() {
    var unlockOnsenUI = ons._readyLock.lock();
    module.run(function($compile, $rootScope, $onsen) {
      // for initialization hook.
      if (document.readyState === 'loading' || document.readyState == 'uninitialized') {
        window.addEventListener('DOMContentLoaded', function() {
          document.body.appendChild(document.createElement('ons-dummy-for-init'));
        });
      } else if (document.body) {
        document.body.appendChild(document.createElement('ons-dummy-for-init'));
      } else {
        throw new Error('Invalid initialization state.');
      }

      $rootScope.$on('$ons-ready', unlockOnsenUI);
    });
  }

  function initAngularModule() {
    module.value('$onsGlobal', ons);
    module.run(function($compile, $rootScope, $onsen) {
      ons._onsenService = $onsen;

      $rootScope.ons = window.ons;
      $rootScope.console = window.console;
      $rootScope.alert = window.alert;

      ons.$compile = $compile;
    });
  }

  function initKeyboardEvents() {
    ons.softwareKeyboard = new MicroEvent();
    ons.softwareKeyboard._visible = false;

    if (typeof cordova !== 'undefined') {
      var onShow = function() {
        ons.softwareKeyboard._visible = true;
        ons.softwareKeyboard.emit('show');
      },
          onHide = function() {
        ons.softwareKeyboard._visible = false;
        ons.softwareKeyboard.emit('hide');
      };

      var bindEvents = function() {
        if (typeof Keyboard !== 'undefined') {
          // https://github.com/martinmose/cordova-keyboard/blob/95f3da3a38d8f8e1fa41fbf40145352c13535a00/README.md
          Keyboard.onshow = onShow;
          Keyboard.onhide = onHide;
          ons.softwareKeyboard.emit('init', {visible: Keyboard.isVisible});
          return true;
        } else if (typeof cordova.plugins !== 'undefined' && typeof cordova.plugins.Keyboard !== 'undefined') {
          // https://github.com/driftyco/ionic-plugins-keyboard/blob/ca27ecf/README.md
          window.addEventListener('native.keyboardshow', onShow);
          window.addEventListener('native.keyboardhide', onHide);
          ons.softwareKeyboard.emit('init', {visible: cordova.plugins.Keyboard.isVisible});
          return true;
        }
        return false;
      };

      document.addEventListener('deviceready', bindEvents);
    }
  }

  function createOnsenFacade() {
    var ons = {

      _readyLock: new DoorLock(),

      _onsenService: null,

      _config: {
        autoStatusBarFill: true
      },

      _unlockersDict: {},

      /**
       * Bootstrap this document as a Onsen UI application.
       *
       * If you want use your AngularJS module, use "ng-app" directive and "angular.module()" manually.
       *
       * @param {Array} [deps] dependency modules
       */
      bootstrap : function(deps) {
        deps = ['onsen'].concat(angular.isArray(deps) ? deps : []);

        var doc = window.document;
        if (doc.readyState == 'loading' || doc.readyState == 'uninitialized') {
          doc.addEventListener('DOMContentLoaded', function() {
            angular.bootstrap(doc.documentElement, deps);
          }, false);
        } else if (doc.documentElement) {
          angular.bootstrap(doc.documentElement, deps);
        } else {
          throw new Error('Invalid state');
        }
      },

      /**
       * Enable status bar fill feature on iOS7 and above.
       */
      enableAutoStatusBarFill: function() {
        if (this.isReady()) {
          throw new Error('This method must be called before ons.isReady() is true.');
        }
        this._config.autoStatusBarFill = true;
      },

      /**
       * Disabled status bar fill feature on iOS7 and above.
       */
      disableAutoStatusBarFill: function() {
        if (this.isReady()) {
          throw new Error('This method must be called before ons.isReady() is true.');
        }
        this._config.autoStatusBarFill = false;
      },

      /**
       * @param {String} [name]
       * @param {Object/jqLite/HTMLElement} dom $event object or jqLite object or HTMLElement object.
       * @return {Object}
       */
      findParentComponentUntil: function(name, dom) {
        var element;
        if (dom instanceof HTMLElement) {
          element = angular.element(dom);
        } else if (dom instanceof angular.element) {
          element = dom;
        } else if (dom.target) {
          element = angular.element(dom.target);
        }

        return element.inheritedData(name);
      },

      /**
       * @param {Function} listener
       */
      setDefaultDeviceBackButtonListener: function(listener) {
        this._getOnsenService().getDefaultDeviceBackButtonHandler().setListener(listener);
      },

      /**
       * Disable this framework to handle cordova "backbutton" event.
       */
      disableDeviceBackButtonHandler: function() {
        this._getOnsenService().DeviceBackButtonHandler.disable();
      },

      /**
       * Enable this framework to handle cordova "backbutton" event.
       */
      enableDeviceBackButtonHandler: function() {
        this._getOnsenService().DeviceBackButtonHandler.enable();
      },

      /**
       * Find view object correspond dom element queried by CSS selector.
       *
       * @param {String} selector CSS selector
       * @param {HTMLElement} [dom]
       * @return {Object/void}
       */
      findComponent: function(selector, dom) {
        var target = (dom ? dom : document).querySelector(selector);
        return target ? angular.element(target).data(target.nodeName.toLowerCase()) || null : null;
      },

      /**
       * @return {Boolean}
       */
      isReady: function() {
        return !ons._readyLock.isLocked();
      },

      /**
       * @param {HTMLElement} dom
       */
      compile : function(dom) {
        if (!ons.$compile) {
          throw new Error('ons.$compile() is not ready. Wait for initialization with ons.ready().');
        }

        if (!(dom instanceof HTMLElement)) {
          throw new Error('First argument must be an instance of HTMLElement.');
        }

        var scope = angular.element(dom).scope();
        if (!scope) {
          throw new Error('AngularJS Scope is null. Argument DOM element must be attached in DOM document.');
        }

        ons.$compile(dom)(scope);
      },

      _getOnsenService: function() {
        if (!this._onsenService) {
          throw new Error('$onsen is not loaded, wait for ons.ready().');
        }

        return this._onsenService;
      },

      /**
       * @param {Array} [dependencies]
       * @param {Function} callback
       */
      ready : function(/* dependencies, */callback) {
        if (callback instanceof Function) {
          if (ons.isReady()) {
            callback();
          } else {
            ons._readyLock.waitUnlock(callback);
          }
        } else if (angular.isArray(callback) && arguments[1] instanceof Function) {
          var dependencies = callback;
          callback = arguments[1];

          ons.ready(function() {
            var $onsen = ons._getOnsenService();
            $onsen.waitForVariables(dependencies, callback);
          });
        }
      },

      /**
       * @return {Boolean}
       */
      isWebView: function() {

        if (document.readyState === 'loading' || document.readyState == 'uninitialized') {
          throw new Error('isWebView() method is available after dom contents loaded.');
        }

        return !!(window.cordova || window.phonegap || window.PhoneGap);
      }
    };
    return ons;
  }

})();
