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
	var directives = angular.module('onsen.directives');

	directives.directive('onsScreen', function(ONSEN_CONSTANTS) {
		return {
			restrict: 'E',
			replace: false,
			transclude: false,
			scope: {
				page: '@'
			},
			templateUrl: ONSEN_CONSTANTS.DIRECTIVE_TEMPLATE_URL + '/screen.tpl',
			// The linking function will add behavior to the template
			link: function(scope, element, attrs) {
				var screenItems = [];
				var isBack = false;
				var isFirstRun = true;
				scope.canGoBack = false;
				scope.ons = scope.ons || {};
				scope.ons.screen = scope.ons.screen || {};

				scope.$watch('page', function(newPage) {
					if (newPage) {
						prepareAnimation();
						var newScreenItem = {
							source: newPage
						}
						scope.screenItem = newScreenItem;

						screenItems.push(newScreenItem);						
					}
				});

				function prepareAnimation(){
					if(isFirstRun){
						scope.animation = null;
						isFirstRun = false;
					}else{
						if(isBack){
							scope.animation = {
								enter: 'unmodal-enter',
								leave: 'unmodal-leave'
							};							
							isBack = false;
						}else{
							scope.animation = {
								enter: 'modal-enter',
								leave: 'modal-leave'
							};
						}
					}
				}

				scope.ons.screen.presentPage = function(page) {
					scope.page = page;
				}

				scope.ons.screen.dismissPage = function() {
					if (screenItems.length < 2) {
						return;
					}

					isBack = true;
					screenItems.pop();
					var previousScreenItem = screenItems.pop();
					scope.page = previousScreenItem.source;
				}				
			}
		}
	});
})();