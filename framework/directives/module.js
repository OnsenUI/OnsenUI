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
  var directiveModules = angular.module('onsen.directives', ['onsen.services', 'templates-main']);
  angular.module('onsen', ['onsen.directives']); // facade

  directiveModules.run(function($rootScope, $window) {
    $rootScope.ons = window.ons;
    $rootScope.ons.$get = function(id) {
      id = id.replace('#', '');
      return angular.element(document.getElementById(id)).isolateScope();
    };

    // Find first ancestor of el with tagName
    // or undefined if not found
    $rootScope.ons.upTo = function(el, tagName) {
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
    };

    $rootScope.console = $window.console;
    $rootScope.alert = $window.alert;
  });

  directiveModules.service('debugLog', function() {
    return window.ONSEN_DEBUG ? function() {
      console.log.apply(window.console, arguments);
    } : function() { };
  });

  directiveModules.service('requestAnimationFrame', function() {
    var fn = window.webkitRequestAnimationFrame || 
             window.mozRequestAnimationFrame || 
             window.oRequestAnimationFrame || 
             window.msRequestAnimationFrame ||
             window.requestAnimationFrame ||
    function(callback) {
      return window.setTimeout(callback, 1000 / 60); // 60fps
    };

    return fn;
  });

  directiveModules.factory('ONSEN_CONSTANTS', function() {
    var CONSTANTS = {
      DIRECTIVE_TEMPLATE_URL: "templates"
    };

    return CONSTANTS;
  });

  directiveModules.directive('onsDummyForInit', function($rootScope) {
    var isReady = false;
    return {
      restrict: 'E',
      priority: Number.MAX_VALUE,

      link: {
        pre: function() {
        },
        post: function() {
          if (!isReady) {
            setTimeout(function() { 
              if (!isReady) {
                $rootScope.$broadcast('$ons-ready');
                isReady = true;
              }
            }, 1000 /60);
          }
        }
      }
    };
  });
})();
