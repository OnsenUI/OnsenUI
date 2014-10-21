/**
 * @ngdoc directive
 * @id popover 
 * @name ons-popover 
 * @description
 *    [en][/en]
 *    [ja][/ja]
 * @param ons-loading-placeholder 
 *    [en][/en]
 *    [ja][/ja]
 * @example
 */

(function(){
  'use strict';

  var module = angular.module('onsen');

  module.directive('onsPopover', function($onsen, PopoverView) {
    return {
      restrict: 'E',
      replace: false,
      transclude: true,
      scope: false,
      templateUrl: $onsen.DIRECTIVE_TEMPLATE_URL + '/popover.tpl',
      compile: function(element, attrs) {
        return function(scope, element, attrs) {
          var popover = new PopoverView(scope, element, attrs);

          $onsen.declareVarAttribute(attrs, popover);
          $onsen.aliasStack.register('ons.popover', popover);
          element.data('ons-popover', popover);

          scope.$on('$destroy', function() {
            popover._events = undefined;
            $onsen.removeModifierMethods(popover);
            element.data('ons-popover', undefined);
            $onsen.aliasStack.unregister('ons.popover', popover);
            element = null;
          });

          scope.direction = 'up';
          scope.arrowPosition = 'bottom';
       
          $onsen.cleaner.onDestroy(scope, function() {
            $onsen.clearComponent({
              scope: scope,
              attrs: attrs,
              element: element
            });
          });

          scope = element = attrs = null;
        };
      }    
    };
  });
})();

