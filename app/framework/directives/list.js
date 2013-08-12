'use strict';

var directives = angular.module('monaca.directives'); // no [] -> referencing existing module

directives.directive('monacaList', function(MONACA_CONSTANTS) {
	return {
		restrict: 'E',
		replace: false,
		transclude: true,
		scope: {
			monacaItems: "=",
			triggerItemClicked: "&itemClick"
		},
		templateUrl: MONACA_CONSTANTS.DIRECTIVE_TEMPLATE_URL + '/list.html',
		link: function(scope, element, attrs) {

			scope.itemClick = function(index){
				scope.triggerItemClicked({
					index: index
				});
			}			
		}
	};
});