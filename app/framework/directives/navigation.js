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
			initialLeftButtonIcon: '@leftButtonIcon',
			rightButtonIcon: '@',
			onLeftButtonClick: '&',
			onRightButtonClick: '&'
		},
		templateUrl: 'framework/templates/navigation.html',
		// The linking function will add behavior to the template
		link: function(scope, element, attrs) {
			var childSources = [];
			var isBack = false;
			var iconPrefix = 'topcoat-icon topcoat-icon--';
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

			function evaluateLeftButtonIcon(){
				if(scope.canGoBack){
					scope.leftButtonIcon = iconPrefix + 'back';
				}else{
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
				if(canPopPage()){
					scope.popPage();	
				}else{
					scope.onLeftButtonClick();
				}
				
			}	

			scope.rightButtonClicked = function() {
				console.log("NC right button clicked");
				scope.onRightButtonClick();
			}	

			function canPopPage(){
				return childSources.length > 1;
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

			//TODO: this hack is for monaca-screen scope.
			// it is strange that calling prensentPage() from child scope
			// doesn't propagate to monaca-screen scope.
			// -> find a way to not use callParent().

			// since our directive use scope:{...} it will not inherite prototypically. -> that why we need to use callParent();
			// https://github.com/angular/angular.js/wiki/Understanding-Scopes
			scope.presentPage = function(page){										
				callParent(scope, 'presentPage', page);
			}

			scope.openMenu = function(){
				callParent(scope, 'openMenu');
			}

			scope.closeMenu = function(){
				callParent(scope, 'closeMenu');
			}

			scope.toggleMenu = function(){
				callParent(scope, 'toggleMenu');
			}

			function callParent(scope, functionName, param){
				if(!scope.$parent){
					return;
				}

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
				evaluateLeftButtonIcon();
			}
		}
	}
});