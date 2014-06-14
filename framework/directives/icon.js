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
      link: function($scope, element, attrs){
        attrs.$observe('spin', function(spin){
          if(spin === "true"){
            $scope.spin = 'spin';
          }else{
            $scope.spin = '';
          }
        });

        attrs.$observe('fixedWidth', function(fixedWidth){
          if(fixedWidth === "true"){
            $scope.fixedWidth = 'fw';
          }else{
            $scope.fixedWidth = '';
          }
        });
      }
    };
  });
})();

