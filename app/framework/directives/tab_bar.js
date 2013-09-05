'use strict';

(function() {
	var directives = angular.module('onsen.directives'); // no [] -> referencing existing module

	directives.directive('onsTabbar', function(ONSEN_CONSTANTS, $timeout) {
		return {
			restrict: 'E',
			replace: false,
			transclude: true,
			templateUrl: ONSEN_CONSTANTS.DIRECTIVE_TEMPLATE_URL + '/tab_bar.tpl',
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