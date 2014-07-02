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
 * @id list
 * @name ons-list
 * @description
 * The container for list-item. Similar to <ul> but styled for mobile.
 * @demoURL
 * OnsenUI/demo/list/
 */
(function(){
  'use strict';

  var module = angular.module('onsen');

  module.directive('onsList', function($onsen) {
    return {
      restrict: 'E',
      replace: false,
      transclude: true,
      scope: false,

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclude.

      templateUrl: $onsen.DIRECTIVE_TEMPLATE_URL + '/list.tpl',
      link: function(scope, element, attrs, controller, transclude) {
        scope.modifierTemplater = $onsen.generateModifierTemplater(attrs);

        transclude(scope, function(clonedElement) {
          angular.element(element[0].querySelector('.list__container')).append(clonedElement);
        });
      }
    };
  });
})();

