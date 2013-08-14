'use strict';

(function() {
	var directives = angular.module('monaca.directives'); // no [] -> referencing existing module

	directives.directive('monacaScroller', function(MONACA_CONSTANTS, $timeout) {
		return {
			restrict: 'E',
			replace: false,
			transclude: true,
			scope: {
				onScrolled: '&',
				infinitScrollEnable: '='
			},
			templateUrl: MONACA_CONSTANTS.DIRECTIVE_TEMPLATE_URL + '/scroller.html'			
		};
	});
})();