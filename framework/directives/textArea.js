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
 * @id text-area
 * @name ons-text-area
 * @description
 * Component for inputting text.
 * @param rows The number of rows
 * @param cols The number of columns
 * @param placeholder The placeholder inside the text area.
 * @param disabled Wether the input should be disabled.
 */
(function(){
  'use strict';

  var module = angular.module('onsen');

  module.directive('onsTextArea', function($onsen) {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      templateUrl: $onsen.DIRECTIVE_TEMPLATE_URL + '/text_area.tpl',
      link: function(scope, element, attrs) {

        if (attrs.ngContrller) {
          throw new Error('This element can\'t accept ng-controller directive.');
        }

        var classes = $onsen.generateModifierTemplater(attrs)('textarea--*');
        element.addClass(classes);
      }
    };
  });
})();

