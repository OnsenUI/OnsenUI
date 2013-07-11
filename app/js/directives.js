'use strict';

/* Directives */


angular.module('myApp.directives', []).
directive('appVersion', ['version',
	function(version) {
		return function(scope, elm, attrs) {
			elm.text(version);
		};
	}
])
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
				childSources.push(value);
				console.log('sources,', childSources);
			});

			scope.leftButtonClicked = function(){
				childSources.pop();
				var previousSource = childSources.pop();
				scope.source = previousSource;
				console.log('back!');
			}
		}
	}
});