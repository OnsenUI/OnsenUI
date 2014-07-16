/**
 * @ngdoc directive
 * @id back_button
 * @name ons-back-button
 * @description
 *   [en]Provides back button for toolbar that can be used for navigation.[/en]
 * @codepen aHmGL
 * @seealso ons-toolbar ons-toolbar component
 */
(function(){
  'use strict';
  var module = angular.module('onsen');

  module.directive('onsBackButton', function($onsen, $compile) {
    return {
      restrict: 'E',
      replace: false,
      templateUrl: $onsen.DIRECTIVE_TEMPLATE_URL + '/back_button.tpl',

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclude.
      transclude: true,
      scope: true,

      link: {
        pre: function(scope, element, attrs, controller, transclude) {
          scope.modifierTemplater = $onsen.generateModifierTemplater(attrs);

          transclude(scope, function(clonedElement) {
            element[0].querySelector('.back-button__label').appendChild(clonedElement[0]);
          });
        }
      }
    };
  });
})();
