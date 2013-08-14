'use strict';

var directives = angular.module('monaca.directives'); // no [] -> referencing existing module

directives.directive('monacaList', function(MONACA_CONSTANTS, $timeout) {
	return {
		restrict: 'E',
		replace: false,
		transclude: true,
		templateUrl: MONACA_CONSTANTS.DIRECTIVE_TEMPLATE_URL + '/list.html',
		scope: {
			onScrolled: '&',
			infinitScrollEnable: '='
		},
		link: function(scope, element, attrs) {
			// inifinte scroll
			var scrollerWrapper = element[0].querySelector('.scroller-wrapper');
			var offset = parseInt(attrs.threshold) || 0;
			var e = scrollerWrapper;

			scrollerWrapper.addEventListener('scroll', function() {
				// console.log('onScroll');
				if (scope.infinitScrollEnable) {
					var scrollTopAndOffsetHeight = e.scrollTop + e.offsetHeight;
					var scrollHeightMinusOffset = e.scrollHeight - offset;
					// console.log('scrollTopAndOffsetHeight: ' + scrollTopAndOffsetHeight + ', scrollHeightMinusOffset: ' + scrollHeightMinusOffset);
					if (scrollTopAndOffsetHeight >= scrollHeightMinusOffset) {
						// console.log('we are there!');
						scope.onScrolled();
					} else {
						// console.log('not yet there!');
					}
				}
			});

			// IScroll for Android
			if (!Modernizr.overflowtouch) {
				$timeout(function() {
					var wrapper = element[0].querySelector('.scroller-wrapper');
					var iScroll = new IScroll(wrapper, {
						momentum: true,
						bounce: true,
						hScrollbar: false,
						vScrollbar: false
					});

					iScroll.on('scrollStart', function(e) {
						console.log('scroll start');
						// console.log('scrollerHeight:' + iScroll.maxScrollY + ', distantY: ' + iScroll.y);

						var scrolled = iScroll.y - offset;
						// console.log('scrollerHeight:' + iScroll.maxScrollY + ', distantY: ' + iScroll.y + ', scrolled:' + scrolled);
						if (scrolled < iScroll.maxScrollY) {
							// TODO: find a better way to know when content is upated so we can refresh
							iScroll.refresh();
						}

					});

					iScroll.on('scrollEnd', function(e) {
						console.log('scroll end');
						var scrolled = iScroll.y - offset;
						// console.log('scrollerHeight:' + iScroll.maxScrollY + ', distantY: ' + iScroll.y + ', scrolled:' + scrolled);
						if (scrolled < iScroll.maxScrollY) {
							console.log('we are there!');
							scope.onScrolled();
						}
					});
				}, 0);
			}
		}
	};
});