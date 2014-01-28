(function() {
	'use strict';

	var directives = angular.module('onsen.directives'); // no [] -> referencing existing module

	directives.directive('onsIfPlatform', function(ONSEN_CONSTANTS) {
		return {
			restrict: 'A',
			replace: false,
			transclude: true,
			scope: true,
			templateUrl: ONSEN_CONSTANTS.DIRECTIVE_TEMPLATE_URL + '/if_platform.tpl',
			link: function($scope, element, attrs) {

				var platform;
				if (navigator.userAgent.match(/Android/i)) {
					platform = "android";
				}


				if (navigator.userAgent.match(/BlackBerry/i)) {
					platform = "blackberry";
				}

				if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
					platform = "ios";
				}

				if (navigator.userAgent.match(/IEMobile/i)) {
					platform = "window";
				}

				$scope.platform = platform;				


				attrs.$observe('onsIfPlatform', function(userPlatform) {
					if (userPlatform) {
						$scope.userPlatform = userPlatform.toLowerCase();
					}
				});				
			}
		};
	});
})();