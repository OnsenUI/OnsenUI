(function() {
	'use strict';
	var directives = angular.module('onsen.directives'); // no [] -> referencing existing module

	directives.directive('onsScrollable', function(ONSEN_CONSTANTS, $timeout) {
		return {
			restrict: 'A',
			replace: false,
			transclude: false,
			link: function(scope, element, attrs) {
				// inifinte scroll

				var scrollWrapper;
				if (!element.hasClass('scroller-wrapper')) {
					console.error('missing .scroller-wrapper class for monaca-scrollable');
					return;
				}

				

				scrollWrapper = element[0];
				var offset = parseInt(attrs.threshold) || 0;

				scrollWrapper.addEventListener('scroll', function() {
					if (scope.infinitScrollEnable) {
						var scrollTopAndOffsetHeight = scrollWrapper.scrollTop + scrollWrapper.offsetHeight;
						var scrollHeightMinusOffset = scrollWrapper.scrollHeight - offset;

						if (scrollTopAndOffsetHeight >= scrollHeightMinusOffset) {
							scope.onScrolled();
						}
					}
				});

				// IScroll for Android
				if (!Modernizr.overflowtouch) {
					$timeout(function() {
						var iScroll = new IScroll(scrollWrapper, {
							momentum: true,
							bounce: true,
							hScrollbar: false,
							vScrollbar: false,
							preventDefault: false
						});

						iScroll.on('scrollStart', function(e) {
							var scrolled = iScroll.y - offset;
							console.log('scrolled: ' + scrolled + ', max-scroll:' + iScroll.maxScrollY, + ', max-scroll + 40:' + (iScroll.maxScrollY + 40));
							if (scrolled < (iScroll.maxScrollY + 40) ) {
								// TODO: find a better way to know when content is upated so we can refresh
								iScroll.refresh();
							}

						});

						iScroll.on('scrollEnd', function(e) {
							var scrolled = iScroll.y - offset;
							if (scrolled < iScroll.maxScrollY) {
								// console.log('we are there!');
								scope.onScrolled();
							}
						});
					}, 500);
				}
			}
		};
	});
})();