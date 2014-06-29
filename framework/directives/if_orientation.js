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

