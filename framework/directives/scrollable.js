/*
Copyright 2013 ASIAL CORPORATION, KRUY VANNA, HIROSHI SHIKATA

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/



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
					console.error('missing .scroller-wrapper class for ons-scrollable');
					return;
				}

				

				scrollWrapper = element[0];
				var offset = parseInt(attrs.threshold) || 10;

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