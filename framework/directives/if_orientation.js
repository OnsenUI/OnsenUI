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
			link: function($scope, element, attrs){

				function getLandscapeOrPortraitFromInteger(orientation){
					if(orientation === undefined ){
						console.log('not orientation');
						return window.screen.width > window.screen.height ? 'landscape' : 'portrait';
					}

					if(orientation == 90 || orientation == -90){
						return 'landscape';
					}

					if(orientation == 0 || orientation == 180){
						return 'portrait';
					}
				}

				$scope.orientation = getLandscapeOrPortraitFromInteger(window.orientation);

				window.addEventListener("orientationchange", function() {
					console.log('orientation changed' + window.orientation);
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

