'use strict';

(function() {
	var directives = angular.module('monaca.directives'); // no [] -> referencing existing module

	directives.directive('monacaTabbarItem', function(MONACA_CONSTANTS) {
		return {
			restrict: 'E',
			replace: true,
			transclude: true,
			require: '^?monacaTabbar',
			scope: {
				page: '@'
			},
			templateUrl: MONACA_CONSTANTS.DIRECTIVE_TEMPLATE_URL + '/tab_bar_item.html',
			link: function(scope, element, attrs, monacaTabbarController) {
				scope.isChecked = false;
				monacaTabbarController.addTabItem(scope);

				scope.toggle = function toggle() {
					scope.isChecked = true;					
					monacaTabbarController.gotSelected(scope);
				}

			}
		};
	});
})();