'use strict';

(function() {
	var directives = angular.module('monaca.directives'); // no [] -> referencing existing module

	directives.directive('monacaSlidingMenu', function() {
		return {
			restrict: 'E',
			replace: false,
			transclude: false,
			scope: {
				behindPage: '@',
				abovePage: '@'
			},
			templateUrl: 'maccha/app/framework/templates/sliding_menu.html',
			link: function(scope, element, attrs) {
				scope.pages = {
					behind: scope.behindPage,
					above: scope.abovePage
				};
				scope.monaca = {};

				scope.status = "close";

				scope.monaca.openMenu = function() {
					scope.status = 'open';
				}

				scope.monaca.closeMenu = function() {
					scope.status = 'close';
				}

				scope.monaca.toggleMenu = function() {
					var newStatus = scope.status == 'close' ?
						'open' : 'close';

					scope.status = newStatus;
				}
			}
		};
	});
})();