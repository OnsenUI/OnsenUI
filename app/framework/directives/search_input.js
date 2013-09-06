(function(){
	'use strict';

	var directives = angular.module('onsen.directives'); // no [] -> referencing existing module

	directives.directive('onsSearchInput', function(ONSEN_CONSTANTS, $timeout) {
		return {
			restrict: 'E',
			replace: true,
			transclude: false,
			templateUrl: ONSEN_CONSTANTS.DIRECTIVE_TEMPLATE_URL + '/search_input.tpl'
		};
	});
})();

