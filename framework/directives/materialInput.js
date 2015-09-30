/**
 * @ngdoc directive
 * @id material-input
 * @name ons-material-input
 * @category form
 * @description
 *  [en]Material Design input component.[/en]
 *  [ja][/ja]
 * @guide UsingFormComponents
 *   [en]Using form components[/en]
 *   [ja]フォームを使う[/ja]
 * @guide EventHandling
 *   [en]Event handling descriptions[/en]
 *   [ja]イベント処理の使い方[/ja]
 * @example
 * <ons-material-input label="Username"></ons-material-input>
 */

/**
 * @ngdoc attribute
 * @name label
 * @type {String}
 * @description
 *   [en]Text for animated floating label.[/en]
 *   [ja][/ja]
 */

/**
 * @ngdoc attribute
 * @name no-float
 * @description
 *  [en]If this attribute is present, the label will not be animated.[/en]
 *  [ja][/ja]
 */

/**
 * @ngdoc attribute
 * @name ng-model
 * @extensionOf angular
 * @description
 *   [en]Bind the value to a model. Works just like for normal input elements.[/en]
 *   [ja][/ja]
 */

/**
 * @ngdoc attribute
 * @name ng-change
 * @extensionOf angular
 * @description
 *   [en]Executes an expression when the value changes. Works just like for normal input elements.[/en]
 *   [ja][/ja]
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
          }.bind(this));
        }
      }
    };
  });
})();
