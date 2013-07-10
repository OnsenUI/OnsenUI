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
	.directive('zippy', function() {
	return {
		restrict: 'C',
		// This HTML will replace the zippy directive.
		replace: true,
		transclude: true,
		scope: {
			title: '@zippyTitle'
		},
		template: '<div>' + '<div class="title">{{title}}</div>' + '<div class="body" ng-transclude></div>' + '</div>',
		// The linking function will add behavior to the template
		link: function(scope, element, attrs) {
			// Title element
			var title = angular.element(element.children()[0]),
				// Opened / closed state
				opened = true;

			// Clicking on title should open/close the zippy
			title.bind('click', toggle);

			// Toggle the closed/opened state

			function toggle() {
				opened = !opened;
				element.removeClass(opened ? 'closed' : 'opened');
				element.addClass(opened ? 'opened' : 'closed');
			}

			// initialize the zippy
			toggle();
		}
	}
}).directive('monacaNavigation', function() {
	return {
		restrict: 'E',
		// This HTML will replace the zippy directive.
		replace: true,
		transclude: true,
		scope: {
			title: '@navigationTitle'
		},
		templateUrl: 'templates/navigation.html',
		// The linking function will add behavior to the template
		link: function(scope, element, attrs) {
			// Title element
			var title = angular.element(element.children()[0]),
				// Opened / closed state
				opened = true;

			// Clicking on title should open/close the zippy
			title.bind('click', toggle);

			// Toggle the closed/opened state

			function toggle() {
				opened = !opened;
				element.removeClass(opened ? 'closed' : 'opened');
				element.addClass(opened ? 'opened' : 'closed');
			}

			// initialize the zippy
			toggle();
		}
	}
});