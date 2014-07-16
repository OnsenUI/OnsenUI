/**
 * @ngdoc directive
 * @id toolbar_button
 * @name ons-toolbar-button
 * @param modifier Modifier name.
 * @description
 * Button component for toolbar.
 * @codepen aHmGL
 * @guide adding-a-toolbar Adding a toolbar
 * @seealso ons-toolbar ons-toolbar component
 * @seealso ons-bottom-toolbar ons-bottom-toolbar component
 * @seealso ons-back-button ons-back-button component
 */
(function(){
  'use strict';
  var module = angular.module('onsen');

  module.directive('onsToolbarButton', function($onsen) {
    return {
      restrict: 'E',
      transclude: true,
      templateUrl: $onsen.DIRECTIVE_TEMPLATE_URL + '/toolbar_button.tpl',
      link: {
        pre: function(scope, element, attrs, controller, transclude) {

          if (attrs.ngController) {
            throw new Error('This element can\'t accept ng-controller directive.');
          }

          scope.modifierTemplater = $onsen.generateModifierTemplater(attrs);
        }
      }
    };
  });
})();
