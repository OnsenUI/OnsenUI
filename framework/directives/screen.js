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

	directives.directive('onsScreen', function(ONSEN_CONSTANTS, $http, $compile, ScreenFactory) {
		return {
			restrict: 'E',
			replace: false,
			transclude: true,
			scope: {
				page: '@'
			},
			
			link: function(scope, element, attrs) {
				var screenItems = [];				

				var Screen = Class.extend({
					init: function() {
						this.isReady = true;
						this.attachMethods();

						if (scope.page) {
							scope.presentPage(scope.page);
						}

						attrs.$observe('page', function(page) {
							if (page) {
								this.resetToPage(page);
							}
						}.bind(this));
					},

					onTransitionEnded: function() {
						this.isReady = true;
					},

					animateInBehindPage: function() {
						var behindPage = screenItems[screenItems.length - 2].pageElement;						
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
							pager.attr("class", "screen-page transition screen_center");
							this.animateInBehindPage();
						}.bind(this), 0);

					},

					animateOutBehindPage: function() {
						var behindPage = screenItems[screenItems.length - 1].pageElement;
						behindPage.attr('class', 'screen-page transition');
					},

					isEmpty: function() {
						return screenItems.length < 1;
					},

					onPageAdded: function(page){
						var blackMask = angular.element(page[0].querySelector('.onsen_screen-black-mask'));
						blackMask.removeClass('hide');
					},

					presentPage: function(page){
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
							var pageEl = angular.element('<div></div>');
							pageEl.addClass('screen-page');

							var blackMask = angular.element('<div></div>');
							blackMask.addClass('onsen_screen-black-mask hide');
							pageEl.append(blackMask);

							var pageContainer = angular.element('<div></div>');
							pageContainer.addClass('screen-page__container');
							pageEl.append(pageContainer);

							var templateHTML = angular.element(data.trim());
							pageContainer.append(templateHTML);
							var compiledPage = $compile(pageEl)(scope.$parent);
							element.append(compiledPage);

							if (!this.isEmpty()) {
								this.animateInCurrentPage(compiledPage);
							} else {
								this.isReady = true;
							}

							var screenItem = {
								pageUrl: page,
								pageElement: compiledPage
							}								

							screenItems.push(screenItem);
							setTimeout(function(){
								this.onPageAdded(compiledPage);
							}.bind(this), 200);
						}.bind(this)).error(function(data, status, headers, config) {
							console.log('error', data, status);
						});
					},

					dismissPage: function(){
						if (screenItems.length < 2 || !this.isReady) {
							// cant dismiss anymore
							return;
						}
						this.isReady = false;

						var screenItem = screenItems.pop();
						var currentPage = screenItem.pageElement;
						this.animateOutBehindPage();
						currentPage.attr("class", "screen-page transition unmodal");
						var that = this;
						currentPage.bind('webkitTransitionEnd', function transitionEnded() {
							currentPage.remove();
							that.isReady = true;
							scope.$apply(function(){
								attrs.page = screenItems[screenItems.length - 1].pageUrl;
								console.log('page is now ', attrs.page);
							});
						});
					},

					resetToPage: function(page){
						scope.presentPage(page);
						for (var i = 0; i < screenItems.length - 1; i++) {
							screenItems[i].pageElement.remove();
						}
					},

					attachMethods: function() {
						scope.presentPage = this.presentPage.bind(this);

						scope.resetToPage = this.resetToPage.bind(this);

						scope.dismissPage = this.dismissPage.bind(this);
					}
				});

				var screen = new Screen();
				ScreenFactory.addScreen(scope);
			}
		}
	});
})();