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

	directives.service('Screen', function(ONSEN_CONSTANTS, $http, $compile, ScreenStack, requestAnimationFrame, debugLog) {
		var TRANSITION_END = "webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd";
		var TRANSITION_START = "webkitAnimationStart animationStart msAnimationStart oAnimationStart";

		var Screen = Class.extend({
			init: function(scope, element, attrs) {
				this.screenItems = [];
				this.scope = scope;
				this.element = element;
				this.attrs = attrs;

				this.isReady = true;
				this.attachMethods();

				this.attrs.$observe('page', function(page) {
					if (page) {
					this.resetToPage(page);
					}
				}.bind(this));
			},

			onTransitionEnded: function() {
				debugLog('onTransitionEnded: isReady = true');
				this.isReady = true;
			},

			animateInBehindPage: function() {
				var behindPage = this.screenItems[this.screenItems.length - 2].pageElement;
				try {
					behindPage.attr('class', 'screen-page transition modal-behind');
				} catch(e) {
					console.log(e);
				}
			},

			animateInCurrentPage: function(pager) {
				pager.attr("class", "screen-page unmodal");
				var that = this;
				pager.bind(TRANSITION_START, function transitionEnded() {
					that.isReady = false;
				});
				pager.bind(TRANSITION_END, function transitionEnded() {
					that.onTransitionEnded();
				});

				setTimeout(function() {
					requestAnimationFrame(function() {
						pager.attr("class", "screen-page transition screen-center");
						that.animateInBehindPage();
					});
				}, 10);
			},

			animateOutBehindPage: function() {
				var behindPage = this.screenItems[this.screenItems.length - 1].pageElement;
				behindPage.attr('class', 'screen-page transition');
			},

			isEmpty: function() {
				return this.screenItems.length < 1;
			},

			onPageAdded: function(page) {
				var blackMask = angular.element(page[0].querySelector('.onsen_screen-black-mask'));
				blackMask.removeClass('hide');
			},

			/**
			 * @param {String} pageUrl
			 * @param {DOMElement} element This element is must be ons-page element.
			 */
			_presentPageDOM: function(pageUrl, element) {
				var pageEl = angular.element('<div></div>');
				pageEl.addClass('screen-page');

				var blackMask = angular.element('<div></div>');
				blackMask.addClass('onsen_screen-black-mask hide');
				pageEl.append(blackMask);

				var pageContainer = angular.element('<div></div>');
				pageContainer.addClass('screen-page__container');
				pageEl.append(pageContainer);

				var templateHTML = angular.element(element);
				pageContainer.append(templateHTML);

				var pageScope = this.scope.$parent.$new();
				var compiledPage = $compile(pageEl)(pageScope);

				this.element.append(compiledPage);

				var isAnimate = this.screenItems.length >= 1;
				if (isAnimate) {
					this.animateInCurrentPage(compiledPage);
				} else {
					debugLog('_presentPageDOM: isReady = true');
					this.isReady = true;
				}

				var screenItem = {
					pageUrl: pageUrl,
					pageElement: compiledPage,
					pageScope: pageScope
				};

				this.screenItems.push(screenItem);

				setTimeout(function() {
					this.onPageAdded(compiledPage);
				}.bind(this), 400);
			},

			presentPage: function(page){
				if (!this.isReady) {
					return;
				}

				var that = this;

				$http({
					url: page,
					method: "GET"
				}).error(function(e) {
					that.onTransitionEnded();
					console.error(e);
				}).success(function(data, status, headers, config) {
					that._presentPageDOM(page, angular.element(data.trim())[0]);
				}.bind(this)).error(function(data, status, headers, config) {
					console.log('error', data, status);
				});
			},

			dismissPage: function(){
				if (this.screenItems.length < 2 || !this.isReady) {
					debugLog('Can\'t dismiss anymore');
					debugLog(this.screenItems);
					return;
				}

				var screenItem = this.screenItems.pop();
				var currentPage = screenItem.pageElement;
				this.animateOutBehindPage();
				currentPage.attr("class", "screen-page transition unmodal");
				var that = this;

				currentPage.bind(TRANSITION_START, function transitionEnded() {
					that.isReady = false;
				});
				currentPage.bind(TRANSITION_END, function transitionEnded() {
					currentPage.remove();
					that.isReady = true;
					debugLog('dismissPage() transtion end: isReady = true');
					screenItem.pageScope.$destroy();
				});
			},

			resetToPage: function(page){
				this.scope.presentPage(page);
				for (var i = 0; i < this.screenItems.length - 1; i++) {
					this.screenItems[i].pageElement.remove();
				}
			},

			attachMethods: function() {
				this.scope.presentPage = this.presentPage.bind(this);
				this.scope.resetToPage = this.resetToPage.bind(this);
				this.scope.dismissPage = this.dismissPage.bind(this);
			}
		});

		return Screen;
	});

	directives.directive('onsScreen', function(ONSEN_CONSTANTS, $http, $compile, Screen, ScreenStack) {

		return {
			restrict: 'E',
			replace: false,
			transclude: true,
			scope: {
				page: '='
			},

			compile: function(element, attrs, transclude) {
				return function(scope, element, attrs) {
					var screen = new Screen(scope, element, attrs);
					if (!attrs.page) {
						transclude(scope.$parent, function(clone) {
							var wrapper = angular.element('<div></div>');
							wrapper.attr('class', 'page');
							wrapper.append(clone);
							screen._presentPageDOM('', wrapper);
						});
					}
					ScreenStack.addScreen(scope);
					scope.$on('$destroy', function(){
						ScreenStack.removeScreen(scope);
					});
				}
				
			}
		}
	});
})();
