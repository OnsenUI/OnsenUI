(function(){
	'use strict';

	var directives = angular.module('onsen.directives'); // no [] -> referencing existing module

	directives.directive('onsIcon', function(ONSEN_CONSTANTS) {
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
			templateUrl: ONSEN_CONSTANTS.DIRECTIVE_TEMPLATE_URL + '/icon.tpl',
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

