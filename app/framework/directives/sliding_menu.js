'use strict';

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
		templateUrl: 'framework/templates/sliding_menu.html',
		link: function(scope, element, attrs) {
			scope.pages = {
				behind: scope.behindPage,
				above: scope.abovePage
			};	

			scope.status = "close";		

			scope.openMenu = function(){				
				scope.status = 'open';
			}

			scope.closeMenu = function(){
				scope.status = 'close';
			}

			scope.toggleMenu = function(){
				var newStatus = scope.status == 'close' ?
				'open' : 'close';

				scope.status = newStatus;
			}
		}
	};
});