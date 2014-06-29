/**
 * @ngdoc directive
 * @id checkbox
 * @name ons-checkbox
 * @description
 * Checkbox component.
 * @param ng-model The model to bind to
 * @param ng-true-value The value to be set to the model when this checkbox is checked
 * @param ng-false-value The value to be set to the model when this checkbox is unchecked.
 */
(function(){
  'use strict';

  var module = angular.module('onsen'); 

  module.directive('onsCheckbox', function($onsen) {
    return {
      require: '?ngModel',
      restrict: 'E',
      replace: true,
      scope: {
        ngModel: '=',
        ngTrueValue: '@',
        ngFalseValue: '@'
      },
      transclude: true,
      templateUrl: $onsen.DIRECTIVE_TEMPLATE_URL + '/checkbox.tpl',
      link: function($scope, element, attrs, ngModel) {
        var checkbox = element.find('input');
        var checked = false;
        attrs.$observe('disabled', function(disabled) {
          if (disabled === undefined) {
            checkbox.attr('disabled', false);
          } else {
            checkbox.attr('disabled', true);
          }
        });

        $scope.modifierTemplater = $onsen.generateModifierTemplater(attrs);

        if (ngModel) {
          ngModel.$render = function() {
            checked = ( ngModel.$viewValue == 'true' || ngModel.$viewValue == $scope.ngTrueValue );
            checkbox.attr('checked', checked);
          };

          checkbox.bind('change', function(){
            $scope.$apply(function(){
              ngModel.$setViewValue(checkbox[0].checked);
            });
          });
        }
      }
    };
  });
})();

