'use strict';

var directives = angular.module('onsen.directives'); // no [] -> referencing existing module

directives.directive('onsList', function(ONSEN_CONSTANTS, $timeout) {
	return {
		restrict: 'E',
		replace: false,
		transclude: true,
		templateUrl: ONSEN_CONSTANTS.DIRECTIVE_TEMPLATE_URL + '/list.html'
	};
});