/**
 * @element ons-material-input
 */

/**
 * @attribute ng-model
 * @description
 *   [en]Bind the value to a model. Works just like for normal input elements.[/en]
 *   [ja]この要素の値をモデルに紐付けます。通常のinput要素の様に動作します。[/ja]
 */

/**
 * @attribute ng-change
 * @description
 *   [en]Executes an expression when the value changes. Works just like for normal input elements.[/en]
 *   [ja]値が変わった時にこの属性で指定したexpressionが実行されます。通常のinput要素の様に動作します。[/ja]
 */

(function(){
  'use strict';

  angular.module('onsen').directive('onsMaterialInput', function($parse) {
    return {
      restrict: 'E',
      replace: false,
      scope: true,

      link: function(scope, element, attrs) {
        CustomElements.upgrade(element[0]);

        if (attrs.ngModel) {
          var set = $parse(attrs.ngModel).assign;

          scope.$parent.$watch(attrs.ngModel, function(value) {
            element[0].value = value;
          });

          element[0]._input.addEventListener('input', function() {
            set(scope.$parent, element[0].value);
            if (attrs.ngChange) {
              scope.$eval(attrs.ngChange);
            }
            scope.$parent.$evalAsync();
          });
        }
      }
    };
  });
})();
