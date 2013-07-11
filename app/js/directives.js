'use strict';

/* Directives */


angular.module('myApp.directives', [])
	.directive('monacaNavigation', function() {
	return {
		restrict: 'E',
		replace: false,
		transclude: true,

		templateUrl: 'templates/navigation.html',
		// The linking function will add behavior to the template
		link: function(scope, element, attrs) {
			// Title element
			var childSources = [];
			var title = angular.element(element.children()[0]);
			scope.$watch(attrs.childSource, function(value) {
				if(value){
					childSources.push(value);					
				}				
			});

			scope.leftButtonClicked = function(){
				childSources.pop();
				var previousSource = childSources.pop();
				scope.source = previousSource;				
			}
		}
	}
});