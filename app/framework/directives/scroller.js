'use strict';

(function() {
	var directives = angular.module('monaca.directives'); // no [] -> referencing existing module

	directives.directive('monacaScroller', function(MONACA_CONSTANTS) {
		return {
			restrict: 'E',
			replace: false,
			transclude: true,
			scope: {
				onScrolled: '&',
				infinitScrollEnable: '@'
			},
			templateUrl: MONACA_CONSTANTS.DIRECTIVE_TEMPLATE_URL + '/scroller.html',
			link: function(scope, element, attrs) {
				// inifinte scroll
				var scrollerWrapper = element.find('.scroller-wrapper');
				var offset = parseInt(attrs.threshold) || 0;
				var e = scrollerWrapper[0];

				scrollerWrapper.bind('scroll', function() {
					if(scope.infinitScrollEnable){
						var scrollTopAndOffsetHeight = e.scrollTop + e.offsetHeight;
						var scrollHeightMinusOffset = e.scrollHeight - offset;
						console.log('scrollTopAndOffsetHeight: ' + scrollTopAndOffsetHeight + ', scrollHeightMinusOffset: ' + scrollHeightMinusOffset);
						if (scrollTopAndOffsetHeight >= scrollHeightMinusOffset) {
							console.log('we are there!');
							scope.onScrolled();
						} else {
							console.log('not yet there!');
						}
					}					
				});


				// IScroll for Android
				setTimeout(function() {
					var wrapper = element[0].querySelector('.scroller-wrapper');
					var iScroll = new IScroll(wrapper, {
						momentum: true,
						bounce: true,
						hScrollbar: false,
						vScrollbar: false
					});
				}, 1000);

			}
		};
	});
})();