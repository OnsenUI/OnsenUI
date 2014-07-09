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
 * @id toolbar_button
 * @name ons-toolbar-button
 * @param modifier Modifier name.
 * @description
 * Button component for toolbar.
 */
(function(){
  'use strict';
  var module = angular.module('onsen');

  module.directive('onsToolbarButton', function($onsen) {
    return {
      restrict: 'E',
      transclude: true,
      templateUrl: $onsen.DIRECTIVE_TEMPLATE_URL + '/toolbar_button.tpl',
      link: {
        pre: function(scope, element, attrs, controller, transclude) {

          if (attrs.ngController) {
            throw new Error('This element can\'t accept ng-controller directive.');
          }

          scope.modifierTemplater = $onsen.generateModifierTemplater(attrs);
        }
      }
    };
  });
})();
