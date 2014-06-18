/**
 * @ngdoc directive
 * @id scroller
 * @name ons-scroller
 * @description
 * Makes the content inside this tag scrollable.
 */
(function() {
  'use strict';
  var module = angular.module('onsen'); // no [] -> referencing existing module

  module.directive('onsScroller', function($onsen, $timeout) {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      scope: {
        onScrolled: '&',
        infinitScrollEnable: '='
      },
      templateUrl: $onsen.DIRECTIVE_TEMPLATE_URL + '/scroller.tpl',
      link: function(scope, element, attrs) {
      }
    };
  });
})();
