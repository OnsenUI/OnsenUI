'use strict';

/* Directives */
angular.module('myApp.directives', [])
	.directive('monacaNavigation', function() {
		return {
			restrict: 'E',
			replace: false,
			transclude: true,
			scope: {
				childSource: '=childSource',
				title: '@title'
			},
			controller: function($scope) {                  
        	},
			templateUrl: 'templates/navigation.html',
			// The linking function will add behavior to the template
			link: function(scope, element, attrs) {
				// setTimeout(function(){
				// 	scope.source = '/app/1.htm';
				// }, 2000);
				var childSources = [];
				var isBack = false;

				scope.transitionEndCallback = function() {
					console.log('animation ended');
					isBack = false;
				}

				var content_region = element.find("#content-region");
				// element[0].addEventListener('transitionend', transitionEndCallback, false);        // mozilla					

				var title = angular.element(element.children()[0]);
				scope.$watch('childSource', function(value) {
					if (value) {
						console.log('pushing source to childSources');
						scope.child = value;
						childSources.push(value);
						console.log('childSources', childSources);
						var attrs = element.attrs;
						
					}
				});

				//TODO: find a better way to check when the animation is ended.
				// Tried webkitTransitionEnd event but it wont get called if we dont stop the break point in debug.
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
					if(childSources.length < 2){
						return;
					}
					
					isBack = true;
					count = 0;
					childSources.pop();
					var previousSource = childSources.pop();
					scope.childSource = previousSource;
				}
			}
		}
	});