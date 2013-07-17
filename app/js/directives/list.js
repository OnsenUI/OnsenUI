'use strict';

var directives = angular.module('monaca.directives'); // no [] -> referencing existing module

directives.directive('monacaList', function() {
	return {
		restrict: 'E',
		replace: false,
		transclude: true,
		scope: {
		},
		templateUrl: 'templates/list.html'
	};
});