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
 * @id radio_button
 * @name ons-radio-button
 * @description
 * Radio button component
 * @param ng-model The model to bind to
 * @param value The value to be set to the model when this button is selected
 * @param left-label The label to be shown on the left of the button
 * @param right-label The label to be shown on the right of the button
 * @param name The group name of this radio button
 * @note Square box may be displayed for radio button in Android 2.3
 */
(function(){
  'use strict';

  var module = angular.module('onsen');

  module.directive('onsRadioButton', function($onsen) {
    return {
      restrict: 'E',
      replace: false,
      scope: {
        value: '@',
        ngModel: '=',
        leftLabel: '@',
        rightLabel: '@',
        name: '@'
      },
      transclude: true,
      templateUrl: $onsen.DIRECTIVE_TEMPLATE_URL + '/radio_button.tpl',
      link: function($scope, element, attrs) {

        if (attrs.ngController) {
          throw new Error('This element can\'t accept ng-controller directive.');
        }

        var radioButton = element.find('input');
        var checked = false;

        $scope.modifierTemplater = $onsen.generateModifierTemplater(attrs);

        attrs.$observe('disabled', function(disabled) {
          if (disabled === undefined) {
            radioButton.attr('disabled', false);
          } else {
            radioButton.attr('disabled', true);
          }
        });
      }
    };
  });
})();

