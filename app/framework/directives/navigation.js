'use strict';

/* Directives */
var directives = angular.module('monaca.directives');

directives.directive('monacaNavigation', function() {
	return {
		restrict: 'E',
		replace: false,
		transclude: false,
		scope: {
			title: '@',
			page: '@',
			rightButtonIcon: '@',
			onRightButtonClick: '&'
		},
		templateUrl: 'framework/templates/navigation.html',
		// The linking function will add behavior to the template
		link: function(scope, element, attrs) {
			var childSources = [];
			var isBack = false;
			scope.canGoBack = false;

			scope.transitionEndCallback = function() {
				isBack = false;
			}

			var title = angular.element(element.children()[0]);
			scope.$watch('page', function(newPage) {
				if (newPage) {
					var newNavigationItem = {
						title: scope.title,
						source: newPage
					}
					scope.navigationItem = newNavigationItem;	
					
					childSources.push(newNavigationItem);					
					evaluateCanGoBack();
				}
			});

			//TODO: find a better way to check when the animation is ended.
			// Tried webkitTransitionEnd event but it wont get called if we dont stop the break point in debug.
			var count = 0;
			var countAnimation = function() {
				count++;
				// console.log("count " + count);
				if (count === 2) {
					count = 0;
					scope.transitionEndCallback();
				}
			}

			scope.getAnimation = function() {
				var animation;
				if (isBack) {
					animation = {
						enter: 'animate-enter-reverse',
						leave: 'animate-leave-reverse'
					};
				} else {
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
				scope.popPage();
			}	

			scope.rightButtonClicked = function() {
				console.log("NC right button clicked");
				scope.onRightButtonClick();
			}		

			scope.popPage = function(){
				if (childSources.length < 2) {
					return;
				}

				isBack = true;
				count = 0;
				childSources.pop();
				var previousNavigationItem = childSources.pop();
				scope.title = previousNavigationItem.title;
				scope.page = previousNavigationItem.source;
			}

			scope.pushPage = function(page, title){
				console.log('pushPage called. page: ' + page);
				scope.title = title;
				scope.page = page;
			}

			scope.presentPage = function(page){							
				callParent(scope, 'presentPage', page);
			}

			function callParent(scope, functionName, param){
				if(scope.$parent.hasOwnProperty(functionName)){					
					scope.$parent[functionName](param);
				}else{					
					callParent(scope.$parent, functionName, param);
				}
			}

			function evaluateCanGoBack(){
				if (childSources.length < 2) {
					scope.canGoBack = false;
				}else{
					scope.canGoBack = true;
				}
			}
		}
	}
});