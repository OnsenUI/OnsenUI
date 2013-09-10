(function() {
	'use strict';
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
				var radioButton = element.find('input');

				monacaTabbarController.addTabItem(scope);

				scope.setActive = function() {					
					radioButton.attr('checked', true);

					monacaTabbarController.gotSelected(scope);
				};

				if (scope.active) {					
					radioButton.attr('checked', true);
					scope.setActive();
				}

			}
		};
	});
})();