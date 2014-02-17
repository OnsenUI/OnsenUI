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

	directives.directive('onsTabbar', function(ONSEN_CONSTANTS, $timeout) {
		return {
			restrict: 'E',
			replace: false,
			transclude: true,			
			templateUrl: ONSEN_CONSTANTS.DIRECTIVE_TEMPLATE_URL + '/tab_bar.tpl',
			controller: function($scope, $element, $attrs) {
				var footer = $element[0].querySelector('.footer');

				$scope.selectedTabItem = {
					source: ''
				};

				$attrs.$observe('hideTabbar', function(hide){
					$scope.hideTabbar = hide;					
					onTabbarVisibilityChanged();
				});

				function onTabbarVisibilityChanged(){
					if($scope.hideTabbar){
						$scope.tabbarHeight = 0;
					}else{					
						$scope.tabbarHeight = footer.clientHeight + 'px';
					}
				}
			
				var tabItems = [];

				this.gotSelected = function(selectedTabItem) {					
					$scope.selectedTabItem.source = selectedTabItem.page;					
				}

				this.addTabItem = function(tabItem) {					
					tabItems.push(tabItem);
				}

				$scope.ons = $scope.ons || {};
				$scope.ons.tabbar = {};
				$scope.ons.tabbar.setTabbarVisibility = function(visible){
					$scope.hideTabbar = !visible;
					onTabbarVisibilityChanged();
				}
			}
		};
	});
})();