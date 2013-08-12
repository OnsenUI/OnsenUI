'use strict';

(function() {
	var directives = angular.module('monaca.directives'); // no [] -> referencing existing module

	directives.directive('monacaSlidingMenu', function(MONACA_CONSTANTS) {
		return {
			restrict: 'E',
			replace: false,
			transclude: false,
			scope: {
				behindPage: '@',
				abovePage: '@'
			},
			templateUrl: MONACA_CONSTANTS.DIRECTIVE_TEMPLATE_URL + '/sliding_menu.html',
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

				scope.monaca.setAbovePage = function(page){					
					if(page){
						scope.pages.above = page;
					}else{
						throw new Error('cannot set undefined page');
					}
				}

				scope.monaca.setBehindPage = function(page){					
					if(page){
						scope.pages.behind = page;
					}else{
						throw new Error('cannot set undefined page');
					}
				}
			}
		};
	});
})();