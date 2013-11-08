/*
Copyright 2013 ASIAL CORPORATION, KRUY VANNA, HIROSHI SHIKATA

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/


(function() {
	'use strict';
	var directives = angular.module('onsen.directives'); // no [] -> referencing existing module

	directives.directive('onsSlidingMenu', function(ONSEN_CONSTANTS) {
		return {
			restrict: 'E',
			replace: false,
			transclude: false,
			scope: {
				behindPage: '@',
				abovePage: '@'
			},
			templateUrl: ONSEN_CONSTANTS.DIRECTIVE_TEMPLATE_URL + '/sliding_menu.tpl',
			link: function(scope, element, attrs) {
				scope.pages = {
					behind: scope.behindPage,
					above: scope.abovePage
				};
				scope.ons = scope.ons || {};
				scope.ons.slidingMenu = scope.ons.slidingMenu || {};

				scope.status = "close";

				scope.ons.slidingMenu.openMenu = function() {
					scope.status = 'open';
				}

				scope.ons.slidingMenu.closeMenu = function() {
					scope.status = 'close';
				}

				scope.ons.slidingMenu.toggleMenu = function() {
					var newStatus = scope.status == 'close' ?
						'open' : 'close';
						
					scope.status = newStatus;
				}

				scope.ons.slidingMenu.setAbovePage = function(page){					
					if(page){
						scope.pages.above = page;
					}else{
						throw new Error('cannot set undefined page');
					}
				}

				scope.ons.slidingMenu.setBehindPage = function(page){					
					if(page){
						scope.pages.behind = page;
					}else{
						throw new Error('cannot set undefined page');
					}
				}

				scope.ons.screen = scope.ons.screen || {};
				scope.ons.screen.presentPage = function(page) {
					callParent(scope, 'ons.screen.presentPage', page);
				}

				scope.ons.screen.dismissPage = function() {
					callParent(scope, 'ons.screen.dismissPage');
				}

				function callParent(scope, functionName, param) {
					if (!scope.$parent) {
						return;
					}

					var parentFunction = stringToFunction(scope.$parent, functionName);
					if (parentFunction) {
						parentFunction.call(scope, param);
					} else {
						callParent(scope.$parent, functionName, param);
					}					

				}

				function stringToFunction(root, str) {
					var arr = str.split(".");

					var fn = root;
					for (var i = 0, len = arr.length; i < len; i++) {
						fn = fn[arr[i]];
					}

					if (typeof fn !== "function") {
						return false;
					}

					return fn;
				};
			}
		};
	});
})();