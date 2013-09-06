(function(){
	'use strict';

	var directives = angular.module('onsen.directives'); // no [] -> referencing existing module

	directives.directive('onsTextArea', function(ONSEN_CONSTANTS, $timeout) {
		return {
			restrict: 'E',
			replace: true,
			transclude: true,
			templateUrl: ONSEN_CONSTANTS.DIRECTIVE_TEMPLATE_URL + '/text_area.tpl'
		};
	});
})();

