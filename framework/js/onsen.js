/* jshint evil:true */

(function(){
  'use strict';

  var module = angular.module('onsen');

  module.run(function($compile, $rootScope) {
    ons.$compile = $compile;
    $rootScope.$on('$ons-ready', function() {
      ons.isReady = function() {
        return true;
      };
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
     * @return {Boolean}
     */
    isReady : function() {
      return false;
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
     * @param {Function} callback
     */
    ready : function(callback) {
      if (ons.isReady()) {
        callback();
      } else {
        module.run(function($rootScope) {
          if (ons.isReady()) {
            callback();
          } else {
            var off = $rootScope.$on('$ons-ready', function() {
              off();
              callback();
            });
          }
        });
      }
    }
  };

})();
