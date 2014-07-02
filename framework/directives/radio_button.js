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

