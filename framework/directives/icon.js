/**
 * @ngdoc directive
 * @id button
 * @name ons-icon
 * @description
 * Wrapper for font-awesome icon.
 * @param icon The icon name. set the icon name without "fa-" prefix. eg. to use "fa-home" icon, set it to "home". See all icons: http://fontawesome.io/icons/.
 * @param size The sizes of the icon. Valid values are [lg/2x/3x/4x//5x]
 * @param rotate The degree to rotate the icon. Valid values are [90/180/270]
 * @param flip Flip the icon. Valid values are [horizontal/vertial]
 * @param fixed-width When used in the list, you want the icons to have the same width so that they align vertically by setting the value to true. Valid values are [true/false]
 * @param spin Whether to spin the icon. Valid values are [true/false]
 */
(function(){
  'use strict';

  var module = angular.module('onsen');

  module.directive('onsIcon', function($onsen) {
    return {
      restrict: 'E',
      replace: true,
      transclude: false,
      scope: {
        icon: '@',
        size: '@',
        rotate: '@',
        flip: '@'
      },
      templateUrl: $onsen.DIRECTIVE_TEMPLATE_URL + '/icon.tpl',
      link: function($scope, element, attrs) {
        attrs.$observe('spin', function(spin) {
          if (spin === 'true') {
            $scope.spin = 'spin';
          } else {
            $scope.spin = '';
          }
        });

        attrs.$observe('fixedWidth', function(fixedWidth){
          if (fixedWidth === 'true') {
            $scope.fixedWidth = 'fw';
          } else {
            $scope.fixedWidth = '';
          }
        });
      }
    };
  });
})();

