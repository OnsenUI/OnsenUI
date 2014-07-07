/*
Copyright 2013-2014 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

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

        if (attrs.ngController) {
          throw new Error('This element can\'t accept ng-controller directive.');
        }

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

