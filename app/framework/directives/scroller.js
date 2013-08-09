'use strict';

(function() {
	var directives = angular.module('monaca.directives'); // no [] -> referencing existing module

	directives.directive('monacaScroller', function() {
		return {
			restrict: 'E',
			replace: false,
			transclude: true,
			templateUrl: 'maccha/app/framework/templates/scroller.html',
			link: function(scope, element, attrs) {
				setTimeout(function() {
					var wrapper = element[0].querySelector('.scroller-wrapper');
					var iScroll = new IScroll(wrapper, {
						momentum: true,
						bounce: true,
						hScrollbar: false,
						vScrollbar: false
					});
				}, 0);

			}
		};
	});
})();