/**
 * @ngdoc directive
 * @id text-input
 * @name ons-text-input
 * @description
 * Component for doing text input.
 * @param placeholder The placeholder inside the input area.
 * @param disabled Wether the input should be disabled.
 */
(function(){
  'use strict';

  var module = angular.module('onsen');

  module.directive('onsTextInput', function($onsen) {
    return {
      restrict: 'E',
      replace: true,
      transclude: false,
      scope: {
        disabled: '='
      },
      templateUrl: $onsen.DIRECTIVE_TEMPLATE_URL + '/text_input.tpl',
      link: function($scope, element, attrs) {
        element.addClass($onsen.generateModifierTemplater(attrs)('text-input--*'));

        $scope.$watch(function() {
          return $scope.disabled;
        }, function(disabled) {
          var isDisabled = $scope.$eval(disabled);
          element.attr('disabled', isDisabled);
        });
      }
    };
  });
})();

