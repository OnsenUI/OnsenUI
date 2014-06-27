/**
 * @ngdoc directive
 * @id bottom_toolbar
 * @name ons-bottom-toolbar
 * @description
 * Use this component to have toolbar position at the bottom of the page.
 * @demoURL
 * OnsenUI/demo/list/
 */
(function(){
  'use strict';

  var module = angular.module('onsen');

  module.directive('onsBottomToolbar', function($onsen) {
    return {
      restrict: 'E',
      transclude: true,
      replace: true,
      templateUrl: $onsen.DIRECTIVE_TEMPLATE_URL + '/bottom_toolbar.tpl',
      link: function(scope, element, attrs) {
        // modifier
        scope.modifierTemplater = $onsen.generateModifierTemplater(attrs);
      }
    };
  });
})();

