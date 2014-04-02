(function(){
  'use strict';

  var directives = angular.module('onsen.directives'); // no [] -> referencing existing module

  directives.directive('onsIfOrientation', function(ONSEN_CONSTANTS) {
    return {
      restrict: 'A',
      replace: false,
      transclude: true,
      scope: true,
      templateUrl: ONSEN_CONSTANTS.DIRECTIVE_TEMPLATE_URL + '/if_orientation.tpl',
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

