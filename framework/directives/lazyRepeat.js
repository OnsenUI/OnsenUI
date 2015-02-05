/**
 * @ngdoc directive
 * @id lazy-repeat 
 * @name ons-lazy-repeat
 * @description 
 *  [en]Using this component a list with millions of items can be rendered without a drop in performance. It does that by "lazily" loading elements into the DOM when they come into view and removing items from the DOM when they are not visible.[/en]
 *  [ja][/ja]
 * @param ons-lazy-repeat
 *  [en]A delegate object, can be either an object attached to the scope (when using AngularJS) or a normal JavaScript variable.[/en]
 *  [ja][/ja]
 * @example
 * <script>
 *   ons.bootstrap()
 *
 *   .controller('MyController', function($scope) {
 *     $scope.MyDelegate = {
 *       countItems: function() {
 *         // Return number of items.
 *         return 1000000;
 *       },
 *
 *       calculateItemHeight: function(index) {
 *         // Return the height of an item in pixels.
 *         return 45;
 *       },
 *
 *       configureItemScope: function(index, itemScope) {
 *         // Initialize scope
 *         itemScope.item = 'Item #' + (index + 1);
 *       },
 *
 *       destroyItemScope: function(index, itemScope) {
 *         // Optional method that is called when an item is unloaded.
 *         console.log('Destroyed item with index: ' + index);
 *       }
 *     };
 *   });
 * </script>
 *
 * <ons-list ng-controller="MyController">
 *   <ons-list-item ons-lazy-repeat="MyDelegate"`>
 *     {{ item }}
 *   </ons-list-item>
 * </ons-list>
 */
(function() {
  'use strict';

  var module = angular.module('onsen');

  /**
   * Lazy repeat directive.
   */
  module.directive('onsLazyRepeat', function($onsen, LazyRepeatView) {
    return {
      restrict: 'A',
      replace: false,
      transclude: 'element',
      compile: function(element, attrs, linker) {
        return function(scope, element, attrs) {
          var lazyRepeat = new LazyRepeatView(scope, element, attrs, linker);     

          scope.$on('$destroy', function() {
            scope = element = attrs = linker = null;
          });
        };
      }
    };
  });

})();
