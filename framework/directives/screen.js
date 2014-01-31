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
						this.isReady = true;
						this.attachMethods();

						if (scope.page) {
							scope.ons.screen.presentPage(scope.page);
						}
					},

					onTransitionEnded: function() {
						this.isReady = true;
					},

					animateInBehindPage: function() {
						var behindPage = screenItems[screenItems.length - 2];						
						behindPage.attr('class', 'screen-page transition modal-behind');
					},

					animateInCurrentPage: function(pager) {
						pager.attr("class", "screen-page unmodal");
						var that = this;
						pager.bind('webkitTransitionEnd', function transitionEnded() {
							that.onTransitionEnded();
							// pager.unbind(transitionEnded);
						});
						element[0].offsetWidth;
						setTimeout(function() {
							pager.attr("class", "screen-page transition center");
							this.animateInBehindPage();
						}.bind(this), 0);

					},

					animateOutBehindPage: function() {
						var behindPage = screenItems[screenItems.length - 1];
						behindPage.attr('class', 'screen-page transition');
					},

					isEmpty: function() {
						return screenItems.length < 1;
					},

					onPageAdded: function(page){
						var blackMask = angular.element(page[0].querySelector('.onsen_screen-black-mask'));
						blackMask.removeClass('hide');
					},

					attachMethods: function() {
						scope.ons.screen.presentPage = function(page) {
							if (!this.isReady) {
								console.log('not ready -> ignore');
								return;
							} else {
								this.isReady = false;
							}

							var that = this;

							$http({
								url: page,
								method: "GET"
							}).error(function(e) {
								that.onTransitionEnded();
								console.error(e);
							}).success(function(data, status, headers, config) {
								var page = angular.element('<div></div>');
								page.addClass('screen-page');

								var blackMask = angular.element('<div></div>');
								blackMask.addClass('onsen_screen-black-mask hide');
								page.append(blackMask);

								var pageContainer = angular.element('<div></div>');
								pageContainer.addClass('screen-page__container');
								page.append(pageContainer);

								var templateHTML = angular.element(data);
								pageContainer.append(templateHTML);
								var pager = $compile(page)(scope);
								element.append(pager);

								if (!this.isEmpty()) {
									this.animateInCurrentPage(pager);
								} else {
									this.isReady = true;
								}

								screenItems.push(pager);
								setTimeout(function(){
									this.onPageAdded(pager);
								}.bind(this), 200);
							}.bind(this)).error(function(data, status, headers, config) {
								console.log('error', data, status);
							});
						}.bind(this);

						scope.ons.screen.dismissPage = function() {
							if (screenItems.length < 2 || !this.isReady) {
								// cant dismiss anymore
								return;
							}
							this.isReady = false;

							var currentPage = screenItems.pop();
							this.animateOutBehindPage();
							currentPage.attr("class", "screen-page transition unmodal");
							var that = this;
							currentPage.bind('webkitTransitionEnd', function transitionEnded() {
								currentPage.remove();
								that.isReady = true;
							});
						}.bind(this);
					}
				});

				var screen = new Screen();
			}
		}
	});
})();