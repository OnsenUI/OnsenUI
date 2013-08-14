'use strict';

var directives = angular.module('monaca.directives'); // no [] -> referencing existing module

directives.directive('monacaList', function(MONACA_CONSTANTS, $timeout) {
	return {
		restrict: 'E',
		replace: false,
		transclude: true,
		templateUrl: MONACA_CONSTANTS.DIRECTIVE_TEMPLATE_URL + '/list.html'
	};
});