'use strict';

(function() {
	var directives = angular.module('onsen.directives'); // no [] -> referencing existing module

	directives.directive('onsTabbarItem', function(ONSEN_CONSTANTS) {
		return {
			restrict: 'E',
			replace: true,
			transclude: true,
			require: '^?onsTabbar',
			scope: {
				page: '@',
				active: '@'
			},
			templateUrl: ONSEN_CONSTANTS.DIRECTIVE_TEMPLATE_URL + '/tab_bar_item.tpl',
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