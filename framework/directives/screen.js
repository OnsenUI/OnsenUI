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

	directives.directive('onsScreen', function(ONSEN_CONSTANTS, $http, $compile) {
		return {
			restrict: 'E',
			replace: false,
			transclude: false,
			scope: {
				page: '@'
			},
			
			// The linking function will add behavior to the template
			link: function(scope, element, attrs) {
				var screenItems = [];
				scope.ons = scope.ons || {};
				scope.ons.screen = scope.ons.screen || {};

				var Screen = Class.extend({
					init: function() {
						this.attachMethods();

						if (scope.page) {
							scope.ons.screen.presentPage(scope.page);
						}
					},

					animateInBehindPage: function(){
						var behindPage = screenItems[screenItems.length - 1];
						behindPage.attr('class', 'screen-page transition modal-behind');
					},

					animateInCurrentPage: function(pager) {
						pager.attr("class", "screen-page unmodal");
						element[0].offsetWidth;						
						pager.attr("class", "screen-page transition center");
					},

					animateOutBehindPage: function(){
						var behindPage = screenItems[screenItems.length - 1];
						behindPage.attr('class', 'screen-page transition');
					},

					isEmpty: function() {
						return screenItems.length < 1;
					},

					attachMethods: function() {
						scope.ons.screen.presentPage = function(page) {
							$http({
								url: page,
								method: "GET"
							}).success(function(data, status, headers, config) {
								var page = angular.element('<div></div>');
								page.addClass('screen-page');
								var templateHTML = angular.element(data);
								page.append(templateHTML);
								var pager = $compile(page)(scope);
								element.append(pager);

								if (!this.isEmpty()) {									
									this.animateInBehindPage();
									this.animateInCurrentPage(pager);
								}

								screenItems.push(pager);
							}.bind(this)).error(function(data, status, headers, config) {
								console.log('error', data, status);
							});
						}.bind(this);

						scope.ons.screen.dismissPage = function() {
							var currentPage = screenItems.pop();
							this.animateOutBehindPage();
							currentPage.attr("class", "screen-page transition unmodal");
							currentPage[0].addEventListener('webkitTransitionEnd', function transitionEnded(e) {
								currentPage.remove();
								currentPage[0].removeEventListener(transitionEnded);
							});							
						}.bind(this);
					}
				});

				screen = new Screen();
			}
		}
	});
})();