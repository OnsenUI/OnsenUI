'use strict';

var directives = angular.module('onsen.directives'); // no [] -> referencing existing module

directives.directive('onsListItem', function(ONSEN_CONSTANTS) {
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		templateUrl: ONSEN_CONSTANTS.DIRECTIVE_TEMPLATE_URL + '/list_item.html'
	};
});