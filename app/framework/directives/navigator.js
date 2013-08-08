'use strict';

/* Directives */
var directives = angular.module('monaca.directives');

directives.directive('monacaNavigator', function() {
	return {
		restrict: 'E',
		replace: false,
		transclude: false,
		scope: {
			title: '@',
			page: '@',
			initialLeftButtonIcon: '@leftButtonIcon',
			rightButtonIcon: '@',
			onLeftButtonClick: '&',
			onRightButtonClick: '&'
		},
		templateUrl: 'framework/templates/navigator.html',
		// The linking function will add behavior to the template
		link: function(scope, element, attrs) {
			var childSources = [];
			var isBack = false;
			var iconPrefix = 'topcoat-icon topcoat-icon--';
			scope.canGoBack = false;
			scope.monaca = {};

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

			function evaluateLeftButtonIcon() {
				if (scope.canGoBack) {
					scope.leftButtonIcon = iconPrefix + 'back';
				} else {
					scope.leftButtonIcon = iconPrefix + scope.initialLeftButtonIcon;
				}
			}

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
				console.log('left button clicked canPop: ' + canPopPage());
				if (canPopPage()) {
					scope.monaca.popPage();
				} else {
					scope.onLeftButtonClick();
				}

			}

			scope.rightButtonClicked = function() {
				console.log("NC right button clicked");
				scope.onRightButtonClick();
			}

			function canPopPage() {
				return childSources.length > 1;
			}

			scope.monaca.popPage = function() {
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

			scope.monaca.pushPage = function(page, title) {
				console.log('pushPage called. page: ' + page);
				scope.title = title;
				scope.page = page;
			}

			//TODO: this hack is for monaca-screen scope.
			// since we are creating isolate scope, calling prensentPage() from child scope
			// doesn't propagate to monaca-screen scope.
			// -> find a way to not use callParent().

			// since our directive use scope:{...} it will not inherite prototypically. -> that why we need to use callParent();
			// https://github.com/angular/angular.js/wiki/Understanding-Scopes
			scope.monaca.presentPage = function(page) {
				console.log('NC present page');
				callParent(scope, 'monaca.presentPage', page);
			}

			scope.monaca.dismissPage = function() {
				callParent(scope, 'monaca.dismissPage');
			}

			scope.monaca.openMenu = function() {
				callParent(scope, 'monaca.openMenu');
			}

			scope.monaca.closeMenu = function() {
				callParent(scope, 'monaca.closeMenu');
			}

			scope.monaca.toggleMenu = function() {
				callParent(scope, 'monaca.toggleMenu');
			}

			// TODO: support params overloading.
			// http://ejohn.org/apps/learn/#89 ?
			function callParent(scope, functionName, param) {
				if (!scope.$parent) {
					return;
				}

				var parentFunction = stringToFunction(scope.$parent, functionName);
				if(parentFunction){					
					parentFunction.call(scope, param);
				}else{
					callParent(scope.$parent, functionName, param);
				}

				// var code = 'scope.' + functionName;
				// if (eval(code)) {
				// 	eval(code + '();');
				// } else {
				// 	callParent(scope.$parent, functionName, param);
				// }

			}

			function stringToFunction(root, str) {
				var arr = str.split(".");

				var fn = root;
				for (var i = 0, len = arr.length; i < len; i++) {
					fn = fn[arr[i]];
				}

				if (typeof fn !== "function") {
					return false;
				}

				return fn;
			};

			function evaluateCanGoBack() {
				if (childSources.length < 2) {
					scope.canGoBack = false;
				} else {
					scope.canGoBack = true;
				}
				evaluateLeftButtonIcon();
			}
		}
	}
});