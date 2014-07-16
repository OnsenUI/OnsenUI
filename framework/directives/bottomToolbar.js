/**
 * @ngdoc directive
 * @id bottom_toolbar
 * @name ons-bottom-toolbar
 * @description
 * Use this component to have toolbar position at the bottom of the page.
 * @seealso ons-toolbar ons-toolbar component
 */
(function(){
  'use strict';

  var module = angular.module('onsen');

  module.directive('onsBottomToolbar', function($onsen) {
    return {
      restrict: 'E',
      replace: false,

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclde.
      transclude: false,
      scope: false,

      compile: function(element, attrs) {

        var modifierTemplater = $onsen.generateModifierTemplater(attrs);

        element.addClass('bottom-bar');
        element.addClass(modifierTemplater('bottom-bar--*'));
        element.css({'z-index': 0});

        return {
          pre: function(scope, element, attrs) {
            // modifier
            scope.modifierTemplater = $onsen.generateModifierTemplater(attrs);

            var pageView = element.inheritedData('ons-page');
            if (pageView) {
              pageView.registerBottomToolbar(element);
            }
          }
        };
      }
    };
  });
})();

