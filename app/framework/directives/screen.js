'use strict';

(function() {
	var directives = angular.module('onsen.directives');

	directives.directive('onsScreen', function(ONSEN_CONSTANTS) {
		return {
			restrict: 'E',
			replace: false,
			transclude: false,
			scope: {
				page: '@'
			},
			templateUrl: ONSEN_CONSTANTS.DIRECTIVE_TEMPLATE_URL + '/screen.tpl',
			// The linking function will add behavior to the template
			link: function(scope, element, attrs) {
				var screenItems = [];
				var isBack = false;
				var isFirstRun = true;
				scope.canGoBack = false;
				scope.ons = scope.ons || {};
				scope.ons.screen = scope.ons.screen || {};

				scope.$watch('page', function(newPage) {
					if (newPage) {
						prepareAnimation();
						var newScreenItem = {
							source: newPage
						}
						scope.screenItem = newScreenItem;

						screenItems.push(newScreenItem);						
					}
				});

				function prepareAnimation(){
					if(isFirstRun){
						scope.animation = null;
						isFirstRun = false;
					}else{
						if(isBack){
							scope.animation = {
								enter: 'unmodal-enter',
								leave: 'unmodal-leave'
							};							
							isBack = false;
						}else{
							scope.animation = {
								enter: 'modal-enter',
								leave: 'modal-leave'
							};
						}
					}
				}

				scope.ons.screen.presentPage = function(page) {
					console.log('present page called, page:' + page);
					scope.page = page;
				}

				scope.ons.screen.dismissPage = function() {
					if (screenItems.length < 2) {
						return;
					}

					isBack = true;
					screenItems.pop();
					var previousScreenItem = screenItems.pop();
					scope.page = previousScreenItem.source;
				}				
			}
		}
	});
})();