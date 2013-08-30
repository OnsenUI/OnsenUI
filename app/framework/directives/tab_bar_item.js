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
				page: '@',
				active: '@'
			},
			templateUrl: MONACA_CONSTANTS.DIRECTIVE_TEMPLATE_URL + '/tab_bar_item.html',
			link: function(scope, element, attrs, monacaTabbarController) {
				monacaTabbarController.addTabItem(scope);

				scope.setActive = function() {
					monacaTabbarController.gotSelected(scope);
				}

				if (scope.active) {
					var radioButton = element.find('input');
					radioButton.attr('checked', true);
					scope.setActive();
				}

			}
		};
	});
})();