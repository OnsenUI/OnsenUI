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

  var module = angular.module('onsen', ['templates-main']);

  var readyLock = new DoorLock();

  var unlockOnsenUI = readyLock.lock();

  // for BC
  angular.module('onsen.directives', ['onsen']);

  var onsenService;
  module.run(function($compile, $rootScope, $onsen) {
    onsenService = $onsen;

    $rootScope.ons = window.ons;
    $rootScope.console = window.console;
    $rootScope.alert = window.alert;

    ons.$compile = $compile;
    $rootScope.$on('$ons-ready', function() {
      unlockOnsenUI();
    });

    // for initialization hook.
    if (document.readyState === 'loading' || document.readyState == 'uninitialized') {
      angular.element(document.body).on('DOMContentLoaded', function() {
        var dom = document.createElement('ons-dummy-for-init');
        document.body.appendChild(dom);
      });
    } else if (document.body) {
      var dom = document.createElement('ons-dummy-for-init');
      document.body.appendChild(dom);
    } else {
      throw new Error('Invalid initialization state.');
    }
  });

  // JS Global facade for Onsen UI.
  var ons = window.ons = {

    _readyLock: readyLock,

    _unlockersDict: {},

    /**
     * Bootstrap this document as a Onsen UI application.
     *
     * If you want use your AngularJS module, use "ng-app" directive and "angular.module()" manually.
     */
    bootstrap : function() {
      var doc = window.document;
      if (doc.readyState == 'loading' || doc.readyState == 'uninitialized') {
        doc.addEventListener('DOMContentLoaded', function() {
          angular.bootstrap(doc.documentElement, ['onsen']);
        }, false);
      } else if (doc.documentElement) {
        angular.bootstrap(doc.documentElement, ['onsen']);
      } else {
        throw new Error('Invalid state');
      }
    },

    /**
     * @param {String} name
     * @param {Object/jqLite/HTMLElement} dom $event object or jqLite object or HTMLElement object.
     * @return {Object}
     */
    getDirectiveObject: function(name, dom) {
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
     * @return {Boolean}
     */
    isReady: function() {
      return !readyLock.isLocked();
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

    /**
     * @return {BackButtonHandlerStack}
     */
    getBackButtonHandlerStack: function() {
      return this._getOnsenService().backButtonHandlerStack;
    },

    _getOnsenService: function() {
      if (!onsenService) {
        throw new Error('$onsen is not loaded, wait for ons.ready().');
      }

      return onsenService;
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
          readyLock.waitUnlock(callback);
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


  var unlockDeviceReady = readyLock.lock();
  window.addEventListener('DOMContentLoaded', function() {
    if (ons.isWebView()) {
      window.document.addEventListener('deviceready', unlockDeviceReady, false);
    } else {
      unlockDeviceReady();
    }
  }, false);

})();
