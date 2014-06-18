/**
 * @ngdoc directive
 * @id col
 * @name ons-col
 * @description
 * Use with <ons-row> to layout component.
 * @param align Vertical align the column. Valid values are [top/center/bottom].
 * @param size The size of the column in percentage. Valid values are [10/20/25/33/67/75/80/90]
 * @param offset Offset the column. Valid values are [10/20/25/33/67/75/80/90]
 * @note For Android 4.3 and earlier, and iOS6 and earlier, when using mixed alignment with ons-row and ons-column, they may not be displayed correctly. You can use only one align.
 */
(function(){
  'use strict';

  var module = angular.module('onsen'); // no [] -> referencing existing module

  module.directive('onsCol', function($timeout, $onsen) {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      scope: {
        align: '@',
        size: '@',
        offst: '@'
      },
      templateUrl: $onsen.DIRECTIVE_TEMPLATE_URL + '/column.tpl',
      compile: function(elt, attr, transclude) {
        return function(scope, elt, attr) {
          transclude(scope.$parent, function(clone) {
            elt.append(clone);
          });
        };
      }
    };
  });
})();

