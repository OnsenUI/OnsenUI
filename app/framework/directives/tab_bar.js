'use strict';

(function() {
	var directives = angular.module('monaca.directives'); // no [] -> referencing existing module

	directives.directive('monacaTabbar', function() {
		return {
			restrict: 'E',
			replace: false,
			transclude: true,
			templateUrl: 'maccha/app/framework/templates/tab_bar.html',
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