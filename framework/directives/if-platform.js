(function(){
	'use strict';

	var directives = angular.module('onsen.directives'); // no [] -> referencing existing module

	directives.directive('onsIfPlatform', function(ONSEN_CONSTANTS) {
		return {
			restrict: 'A',
			replace: false,			
			transclude: true,
			scope: true,
			templateUrl: ONSEN_CONSTANTS.DIRECTIVE_TEMPLATE_URL + '/if_platform.tpl',
			link: function($scope, element, attrs){

				function onDeviceReady(){
					$scope.$apply(function(){
						$scope.platform = window.device.platform;
					});
				}

				document.addEventListener("deviceready", onDeviceReady, false);				

				attrs.$observe('onsIfPlatform', function(userPlatform){
					if(userPlatform){
						$scope.userPlatform = userPlatform;
					}
				});				

				setTimeout(function(){
					$scope.$apply(function(){
						$scope.platform = window.device.platform;
					});
				}, 1000);
			}
		};
	});
})();

