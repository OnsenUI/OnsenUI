'use strict';

/* Directives */
var directives = angular.module('monaca.directives');

directives.directive('monacaScreen', function() {
	return {
		restrict: 'E',
		replace: false,
		transclude: false,
		scope: {			
			page: '='
		},
		templateUrl: 'templates/screen.html',
		// The linking function will add behavior to the template
		link: function(scope, element, attrs) {
			var screenItems = [];
			var isBack = false;
			scope.canGoBack = false;

			scope.transitionEndCallback = function() {
				isBack = false;
			}

			var title = angular.element(element.children()[0]);
			scope.$watch('page', function(newPage) {
				if (newPage) {
					var newScreenItem = {						
						source: newPage
					}
					scope.screenItem = newScreenItem;	
					
					screenItems.push(newScreenItem);					
					// evaluateCanGoBack();
				}
			});

			scope.dismissViewController = function() {
				console.log('dismissViewController called');
				if (screenItems.length < 2) {
					return;
				}

				isBack = true;
				count = 0;
				screenItems.pop();
				var previousScreenItem = screenItems.pop();
				// scope.navigationItem = previousScreenItem;
				scope.title = previousScreenItem.title;
				scope.page = previousScreenItem.source;
			}	

			scope.$on('dismissViewController', function(event) {
				console.log("received dismiss");
				scope.dismissViewController();
			});

			//TODO: find a better way to check when the animation is ended.
			// Tried webkitTransitionEnd event but it wont get called if we dont stop the break point in debug.
			var count = 0;
			var countAnimation = function() {
				count++;
				if (count === 2) {
					count = 0;
					scope.transitionEndCallback();
				}
			}

			scope.getAnimation = function() {
				var animation;
				if (isBack) {
					animation = {
						enter: 'animate-modal-enter-reverse',
						leave: 'animate-modal-leave-reverse'
					};
				} else {
					animation = {
						enter: 'animate-modal-enter',
						leave: 'animate-modal-leave'
					};
				}
				countAnimation();
				return animation;
			}				
		}
	}
});