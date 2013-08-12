'use strict';

(function() {
	var directives = angular.module('monaca.directives');

	directives.directive('monacaScreen', function(MONACA_CONSTANTS) {
		return {
			restrict: 'E',
			replace: false,
			transclude: false,
			scope: {
				page: '@'
			},
			templateUrl: MONACA_CONSTANTS.DIRECTIVE_TEMPLATE_URL + '/screen.html',
			// The linking function will add behavior to the template
			link: function(scope, element, attrs) {
				var screenItems = [];
				var isBack = false;
				var isFirstRun = true;
				scope.canGoBack = false;
				scope.monaca = {};

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

				scope.monaca.presentPage = function(page) {
					console.log('present page called, page:' + page);
					scope.page = page;
				}

				scope.monaca.dismissPage = function() {
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