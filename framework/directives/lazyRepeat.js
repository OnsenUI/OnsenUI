/**
 * @ngdoc directive
 * @id lazy-repeat 
 * @name ons-lazy-repeat
 * @description 
 *  [en][/en]
 *  [ja][/ja]
 */

(function() {
  'use strict';

  var module = angular.module('onsen');

  /**
   * Dialog directive.
   */
  module.directive('onsLazyRepeat', function($onsen, LazyRepeatView) {
    return {
      restrict: 'A',
      replace: false,
      compile: function(element, attrs) {
        return function(scope, element, attrs) {
          var lazyRepeat = new LazyRepeatView(scope, element, attrs);     

          scope.$on('$destroy', function() {
            scope = element = attrs = null;
          });
        };
      }
    };
  });

})();
