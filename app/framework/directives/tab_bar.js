'use strict';

(function() {
	var directives = angular.module('monaca.directives'); // no [] -> referencing existing module

	directives.directive('monacaTabbar', function(MONACA_CONSTANTS) {
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
					angular.forEach(tabItems, function(tabItem) {
						if (selectedTabItem != tabItem) {
							tabItem.isChecked = false;
						}
					});
				}

				this.addTabItem = function(tabItem) {
					console.log('addTabItem()');
					tabItems.push(tabItem);
				}
			}
		};
	});
})();