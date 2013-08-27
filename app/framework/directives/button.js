'use strict';

var directives = angular.module('monaca.directives'); // no [] -> referencing existing module

directives.directive('monacaButton', function(MONACA_CONSTANTS) {
	return {
		restrict: 'E',
		replace: true,		
		transclude: true,
		templateUrl: MONACA_CONSTANTS.DIRECTIVE_TEMPLATE_URL + '/button.html'
	};
});