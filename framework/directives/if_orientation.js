(function(){
	'use strict';

	var directives = angular.module('onsen.directives'); // no [] -> referencing existing module

	directives.directive('onsOrientation', function(ONSEN_CONSTANTS) {
		return {
			restrict: 'A',
			replace: false,			
			transclude: true,
			scope: true,
			templateUrl: ONSEN_CONSTANTS.DIRECTIVE_TEMPLATE_URL + '/orientation.tpl',
			link: function($scope, element, attrs){

				function getLandscapeOrPortraitFromInteger(orientation){
					if(orientation == 90 || orientation == -90){
						return 'landscape';
					}

					if(orientation == 0 || orientation == 180){
						return 'portrait';
					}
				}

				$scope.orientation = getLandscapeOrPortraitFromInteger(window.orientation);

				window.addEventListener("orientationchange", function() {
					$scope.$apply(function(){
						$scope.orientation = getLandscapeOrPortraitFromInteger(window.orientation);
					});
				}, false);

				attrs.$observe('onsOrientation', function(userOrientation){
					if(userOrientation){
						$scope.userOrientation = userOrientation;
					}
				});				
			}
		};
	});
})();

