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
 * @id search-input
 * @name ons-search-input
 * @description
 * Component for inputting search text.
 * @param placeholder The placeholder inside the input area.
 * @param disabled Wether the input should be disabled.
 */
(function(){
  'use strict';

  var module = angular.module('onsen');

  module.directive('onsSearchInput', function($onsen) {
    return {
      restrict: 'E',
      replace: true,
      transclude: false,
      templateUrl: $onsen.DIRECTIVE_TEMPLATE_URL + '/search_input.tpl',
      link: function(scope, element, attrs) {
        element.addClass($onsen.generateModifierTemplater(attrs)('search-input--*'));
      }
    };
  });
})();

