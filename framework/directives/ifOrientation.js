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
 * @id if-orientation
 * @name ons-if-orientation
 * @description
 * Conditionally display content depending on screen orientation. Valid values are [portrait/landscape]. Different from other components, this component is used as attribute in any element.
 * @param ons-if-orientation Either portrait or landscape.
 */
(function(){
  'use strict';

  var module = angular.module('onsen');

  module.directive('onsIfOrientation', function($onsen) {
    return {
      restrict: 'A',
      replace: false,
      transclude: true,
      scope: true,
      templateUrl: $onsen.DIRECTIVE_TEMPLATE_URL + '/if_orientation.tpl',
      link: function($scope, element, attrs) {

        if (attrs.ngController) {
          throw new Error('This element can\'t accept ng-controller directive.');
        }

        function getLandscapeOrPortraitFromInteger(orientation){
          if (orientation === undefined ) {
            return window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
          }

          if (orientation == 90 || orientation == -90) {
            return 'landscape';
          }

          if (orientation === 0 || orientation == 180) {
            return 'portrait';
          }
        }

        $scope.orientation = getLandscapeOrPortraitFromInteger(window.orientation);

        window.addEventListener("orientationchange", function() {
          $scope.$apply(function(){
            $scope.orientation = getLandscapeOrPortraitFromInteger(window.orientation);
          });
        }, false);

        window.addEventListener("resize", function() {
          $scope.$apply(function(){
            $scope.orientation = getLandscapeOrPortraitFromInteger(window.orientation);
          });
        }, false);

        attrs.$observe('onsIfOrientation', function(userOrientation){
          if(userOrientation){
            $scope.userOrientation = userOrientation;
          }
        });
      }
    };
  });
})();

