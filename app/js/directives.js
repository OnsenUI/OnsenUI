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

				var childSources = [];
				var isBack = false;

				scope.transitionEndCallback = function() {
					console.log('animation ended');
					isBack = false;
				}

				var content_region = element.find("#content-region");
				// element[0].addEventListener('transitionend', transitionEndCallback, false);        // mozilla					

				var title = angular.element(element.children()[0]);
				scope.$watch(attrs.childSource, function(value) {
					if (value) {
						childSources.push(value);
						var attrs = element.attrs;
						console.log('element', element);
						console.log('attrs', attrs);
						console.log('pushing source to childSources & reseting to forward');
					}
				});


				var count = 0;
				var countAnimation = function() {
					count++;
					console.log("count " + count);
					if (count === 2) {
						count = 0;
						scope.transitionEndCallback();
					}
				}

				scope.getAnimation = function() {
					var animation;
					if (isBack) {
						console.log('animation backward');
						animation = {
							enter: 'animate-enter-reverse',
							leave: 'animate-leave-reverse'
						};
					} else {
						console.log('animation forward');
						animation = {
							enter: 'animate-enter',
							leave: 'animate-leave'
						};
					}
					countAnimation();
					return animation;
				}

				scope.leftButtonClicked = function() {
					console.log('left button clicked');
					isBack = true;
					count = 0;
					childSources.pop();
					var previousSource = childSources.pop();
					scope.source = previousSource;
				}
			}
		}
	});