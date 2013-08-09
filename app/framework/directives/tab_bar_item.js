'use strict';

(function() {
	var directives = angular.module('monaca.directives'); // no [] -> referencing existing module

	directives.directive('monacaTabbarItem', function() {
		return {
			restrict: 'E',
			replace: true,
			transclude: true,
			require: '^?monacaTabbar',
			scope: {
				page: '@'
			},
			templateUrl: 'maccha/app/framework/templates/tab_bar_item.html',
			link: function(scope, element, attrs, monacaTabbarController) {
				
				monacaTabbarController.addTabItem(scope);

				scope.toggle = function toggle() {
					console.log('toggle()');						
					monacaTabbarController.gotSelected(scope);
				}

			}
		};
	});
})();