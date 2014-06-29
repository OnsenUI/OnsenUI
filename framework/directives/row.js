/**
 * @ngdoc directive
 * @id row
 * @name ons-row
 * @description
 * Use <ons-row> and <ons-col> grid system to layout component. By default, all <ons-col> inside a <ons-row> will have the same width. You can specify any <ons-col> to have a specific width and let others take the remaining width in a <ons-row>. You can event vertical align each <ons-col> in a <ons-row>
 * @param align Short hand attribute for aligning all colum in a row. Valid values are [top/bottom/center].
 * @note For Android 4.3 and earlier, and iOS6 and earlier, when using mixed alignment with ons-row and ons-column, they may not be displayed correctly. You can use only one align.
 */
(function(){
  'use strict';

  var module = angular.module('onsen');

  module.directive('onsRow', function($onsen, $timeout) {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      scope: {
        align: '@'
      },
      templateUrl: $onsen.DIRECTIVE_TEMPLATE_URL + '/row.tpl',
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

