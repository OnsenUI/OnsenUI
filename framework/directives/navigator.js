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
  'use strict';
  var directives = angular.module('onsen.directives');

  directives.directive('onsNavigator', function(ONSEN_CONSTANTS, $http, $compile, $parse, NavigatorStack, Navigator, OnsenUtil, $templateCache) {
    return {
      restrict: 'E',
      replace: false,
      transclude: true,
      scope: {},

      compile: function(element, attrs, transclude) {
        return {
          pre: function preLink(scope, iElement, iAttrs, controller) {
          },

          post: function postLink(scope, iElement, attrs, controller) {
            var navigator = new Navigator({
              scope: scope, 
              element: iElement[0], 
              attrs: attrs
            });

            OnsenUtil.declareVarAttribute(attrs, navigator);

            if (!attrs.page) {
              var pageScope = navigator._createPageScope();
              transclude(pageScope, function(compiledPageContent) {
                navigator._pushPageDOM('', compiledPageContent, pageScope, {});
              });
            }

            NavigatorStack.addNavigator(navigator);
            scope.$on('$destroy', function(){
              NavigatorStack.removeNavigator(navigator);
            });
          }
        };
      }
    };
  });
})();
