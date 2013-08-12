'use strict';

(function() {
	var directives = angular.module('monaca.directives'); // no [] -> referencing existing module

	directives.directive('monacaTabbar', function(MONACA_CONSTANTS, $timeout) {
		return {
			restrict: 'E',
			replace: false,
			transclude: true,
			templateUrl: MONACA_CONSTANTS.DIRECTIVE_TEMPLATE_URL + '/tab_bar.html',
			controller: function($scope) {
				$scope.selectedTabItem = {
					source: ''
				};

				var tabItems = [];

				this.gotSelected = function(selectedTabItem) {					
					$scope.selectedTabItem.source = selectedTabItem.page;					
				}

				this.addTabItem = function(tabItem) {					
					tabItems.push(tabItem);
				}
			}
		};
	});
})();