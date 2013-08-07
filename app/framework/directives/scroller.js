'use strict';

var directives = angular.module('monaca.directives'); // no [] -> referencing existing module

directives.directive('monacaScroller', function() {
	return {
		restrict: 'E',
		replace: false,
		transclude: true,
		templateUrl: 'framework/templates/scroller.html',
		link: function(scope, element, attrs) {
			setTimeout(function(){
				var wrapper = element.find('.scroller-wrapper').get(0);				
				var iScroll = new IScroll(wrapper, {
					momentum: true,
					bounceLock: true,
					bounce: true
				});
			}, 0);
			
		}
	};
});