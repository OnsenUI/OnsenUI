/**
 * @ngdoc directive
 * @id icon
 * @name ons-icon
 * @description
 * Wrapper for font-awesome icon.
 * @param icon The icon name. set the icon name without "fa-" prefix. eg. to use "fa-home" icon, set it to "home". See all icons: http://fontawesome.io/icons/.
 * @param size The sizes of the icon. Valid values are [lg/2x/3x/4x/5x] or css font-size value.
 * @param rotate The degree to rotate the icon. Valid values are [90/180/270]
 * @param flip Flip the icon. Valid values are [horizontal/vertial]
 * @param fixed-width When used in the list, you want the icons to have the same width so that they align vertically by setting the value to true. Valid values are [true/false]. Default is true.
 * @param spin Whether to spin the icon. Valid values are [true/false]
 * @codepen xAhvg
 * @guide using-icons Using icons
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
        rotate: '@',
        flip: '@'
      },
      templateUrl: $onsen.DIRECTIVE_TEMPLATE_URL + '/icon.tpl',
      link: function($scope, element, attrs) {

        if (attrs.ngController) {
          throw new Error('This element can\'t accept ng-controller directive.');
        }

        $scope.style = {};
        $scope.sizeClass = '';

        attrs.$observe('size', function(size) {
          size = '' + size;

          if (size.match(/^[1-5]x|lg$/)) {
            $scope.sizeClass = 'fa-' + size;
            $scope.style['font-size'] = '';
          } else if (size.match(/^\d+(px|%|[a-zA-Z]+)$/)) {
            $scope.sizeClass = '';
            $scope.style['font-size'] = size;
          } else {
            $scope.sizeClass = 'fa-lg';
            $scope.style['font-size'] = '';
          }
        });

        attrs.$observe('spin', function(spin) {
          if (spin === 'true') {
            $scope.spin = 'spin';
          } else {
            $scope.spin = '';
          }
        });

        attrs.$observe('fixedWidth', function(fixedWidth) {
          if (fixedWidth === 'false') {
            $scope.fixedWidth = '';
          } else {
            $scope.fixedWidth = 'fw';
          }
        });
      }
    };
  });
})();

