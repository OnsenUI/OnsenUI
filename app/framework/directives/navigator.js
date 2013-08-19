'use strict';

(function() {
	var directives = angular.module('monaca.directives');

	directives.directive('monacaNavigator', function(MONACA_CONSTANTS) {
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
			templateUrl: MONACA_CONSTANTS.DIRECTIVE_TEMPLATE_URL + '/navigator.html',
			// The linking function will add behavior to the template
			link: function(scope, element, attrs) {
				var childSources = [];
				var isFirstRun = true;
				var isBack = false;
				var iconPrefix = 'topcoat-icon topcoat-icon--';
				scope.canGoBack = false;
				scope.monaca = {};				

				scope.$watch('page', function(newPage) {
					if (newPage) {	
						prepareAnimation();					
						var newNavigationItem = {
							title: scope.title,
							source: newPage
						}
						scope.navigationItem = newNavigationItem;

						childSources.push(newNavigationItem);
						evaluateCanGoBack();
					}
				});

				function prepareAnimation(){
					if(isFirstRun){
						scope.animation = null;
						isFirstRun = false;
					}else{
						if(isBack){
							scope.animation = {
								enter: 'slide-right-enter',
								leave: 'slide-right-leave'
							};							
							isBack = false;
						}else{
							scope.animation = {
								enter: 'slide-left-enter',
								leave: 'slide-left-leave'
							};
						}
						
					}
				}

				function evaluateLeftButtonIcon() {
					if (scope.canGoBack) {
						scope.leftButtonIcon = iconPrefix + 'back';
					} else {
						scope.leftButtonIcon = iconPrefix + scope.initialLeftButtonIcon;
					}
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

				scope.monaca.resetToPage = function(page, title){
					childSources = [];
					scope.monaca.pushPage(page, title);
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
					if (parentFunction) {
						parentFunction.call(scope, param);
					} else {
						callParent(scope.$parent, functionName, param);
					}					

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
})();