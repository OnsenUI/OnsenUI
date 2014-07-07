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

/**
 * @ngdoc directive
 * @id bottom_toolbar
 * @name ons-bottom-toolbar
 * @description
 * Use this component to have toolbar position at the bottom of the page.
 * @demoURL
 * OnsenUI/demo/list/
 */
(function(){
  'use strict';

  var module = angular.module('onsen');

  module.directive('onsBottomToolbar', function($onsen) {
    return {
      restrict: 'E',
      replace: false,

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclde.
      transclude: false,
      scope: false,

      compile: function(element, attrs) {

        var modifierTemplater = $onsen.generateModifierTemplater(attrs);

        element.addClass('bottom-bar');
        element.addClass(modifierTemplater('bottom-bar--*'));
        element.css({'z-index': 0});

        return {
          pre: function(scope, element, attrs) {
            // modifier
            scope.modifierTemplater = $onsen.generateModifierTemplater(attrs);

            var pageView = element.inheritedData('ons-page');
            if (pageView) {
              pageView.registerBottomToolbar(element);
            }
          }
        };
      }
    };
  });
})();

