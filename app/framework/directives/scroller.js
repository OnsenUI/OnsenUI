'use strict';

(function() {
	var directives = angular.module('onsen.directives'); // no [] -> referencing existing module

	directives.directive('onsScroller', function(ONSEN_CONSTANTS, $timeout) {
		return {
			restrict: 'E',
			replace: false,
			transclude: true,
			scope: {
				onScrolled: '&',
				infinitScrollEnable: '='
			},
			templateUrl: ONSEN_CONSTANTS.DIRECTIVE_TEMPLATE_URL + '/scroller.tpl'			
		};
	});
})();