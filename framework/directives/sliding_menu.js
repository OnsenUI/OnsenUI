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

	directives.directive('onsSlidingMenu', function(ONSEN_CONSTANTS, $http, $compile, SlidingMenuFactory) {
		return {
			restrict: 'E',
			replace: false,
			transclude: false,
			scope: {
				behindPage: '@',
				abovePage: '@',
				maxSlideDistance: '@',
				swipable: '@',
				swipeTargetWidth: '@'
			},
			templateUrl: ONSEN_CONSTANTS.DIRECTIVE_TEMPLATE_URL + '/sliding_menu.tpl',
			link: function(scope, element, attrs) {
				var MAIN_PAGE_RATIO = 0.9;

				var Swiper = Class.extend({
					init: function(element) {
						this.$el = element;
						this.el = element[0];
						this.VERTICAL_THRESHOLD = 20;
						this.HORIZONTAL_THRESHOLD = 20;
						this.behindPage = element[0].querySelector('.behind');
						this.$behindPage = angular.element(this.behindPage);
						this.abovePage = element[0].querySelector('.above');
						this.$abovePage = angular.element(this.abovePage);
						this.blackMask = element[0].querySelector('.onsen_sliding-menu-black-mask');
						this.previousX = 0;
						this.MAX = this.abovePage.clientWidth * MAIN_PAGE_RATIO;						

						scope.$watch('maxSlideDistance', this.onMaxSlideDistanceChanged.bind(this));
						scope.$watch('swipable', this.onSwipableChanged.bind(this));
						scope.$watch('swipeTargetWidth', this.onSwipeTargetWidthChanged.bind(this));
						window.addEventListener("resize", this.onWindowResize.bind(this));

						this.currentX = 0;
						this.startX = 0;

						this.boundHandleEvent = this.handleEvent.bind(this);

						this.attachMethods();
						this.bindEvents();

						if (scope.abovePage) {
							scope.setAbovePage(scope.abovePage);
						}

						if (scope.behindPage) {
							scope.setBehindPage(scope.behindPage);
						}

						window.setTimeout(function() {
							this.behindPage.style.opacity = 1;
							this.blackMask.style.opacity = 1;
						}.bind(this), 100);
					},

					onSwipableChanged: function(swipable){
						if(swipable == "" || swipable == undefined){
							swipable = true;
						}else{
							swipable = (swipable == "true");
						}

						if(swipable){
							this.activateHammer();
						}else{
							this.deactivateHammer();
						}
					},

					onSwipeTargetWidthChanged: function(targetWidth){
						var width = parseInt(targetWidth);
						if(width < 0 || !targetWidth){
							this.swipeTargetWidth = this.abovePage.clientWidth;
						}else{
							this.swipeTargetWidth = width;
						}
					},

					onWindowResize: function(){
						this.recalculateMAX();
					},

					onMaxSlideDistanceChanged: function(){						
						this.recalculateMAX();
					},

					recalculateMAX: function(){
						if (scope.maxSlideDistance && this.MAX > parseInt(scope.maxSlideDistance, 10)) {
							this.MAX = parseInt(scope.maxSlideDistance);
						}
					},

					activateHammer: function(){
						this.hammertime.on("touch dragleft dragright swipeleft swiperight release", this.boundHandleEvent);
					},

					deactivateHammer: function(){
						this.hammertime.off("touch dragleft dragright swipeleft swiperight release", this.boundHandleEvent);
					},

					bindEvents: function() {
						this.hammertime = new Hammer(this.el);						
						this.$abovePage.bind('webkitTransitionEnd', this.onTransitionEnd.bind(this));
					},

					attachMethods: function() {
						scope.setBehindPage = function(page) {
							if (page) {
								$http({
									url: page,
									method: "GET"
								}).error(function(e) {
									console.error(e);
								}).success(function(data, status, headers, config) {
									var templateHTML = angular.element(data.trim());
									var page = angular.element('<div></div>');
									page.addClass('page');
									var pageContent = $compile(templateHTML)(scope.$parent);
									page.append(pageContent);
									this.$behindPage.append(page);

								}.bind(this));
							} else {
								throw new Error('cannot set undefined page');
							}
						}.bind(this);

						scope.setAbovePage = function(pageUrl) {
							if (this.currentPageUrl === pageUrl) {
								// same page -> ignore
								return;
							}

							if (pageUrl) {
								$http({
									url: pageUrl,
									method: "GET"
								}).error(function(e) {
									console.error(e);
								}).success(function(data, status, headers, config) {
									var templateHTML = angular.element(data.trim());
									var pageElement = angular.element('<div></div>');
									pageElement.addClass('page');
									pageElement[0].style.opacity = 0;
									var pageContent = $compile(templateHTML)(scope.$parent);
									pageElement.append(pageContent);
									this.$abovePage.append(pageElement);

									// prevent black flash
									setTimeout(function() {
										pageElement[0].style.opacity = 1;
										if (this.currentPageElement) {
											this.currentPageElement.remove();
										}
										this.currentPageElement = pageElement;
									}.bind(this), 0);

									this.currentPageUrl = pageUrl;
								}.bind(this));
							} else {
								throw new Error('cannot set undefined page');
							}
						}.bind(this);
					},


					handleEvent: function(ev) {						
						switch (ev.type) {

							case 'touch':
								if(this.isClosed()){
									if(!this.isInsideSwipeTargetArea(ev.gesture.center.pageX)){
										ev.gesture.stopDetect();
									}	
								}
								
								break;

							case 'dragleft':
							case 'dragright':
								ev.gesture.preventDefault();
								var deltaX = ev.gesture.deltaX;
								this.currentX = this.startX + deltaX;
								if (this.currentX >= 0) {
									this.translate(this.currentX);
								}
								break;

							case 'swipeleft':
								ev.gesture.preventDefault();
								this.close();
								break;

							case 'swiperight':
								ev.gesture.preventDefault();
								this.open();
								break;

							case 'release':
								if (this.currentX > this.MAX / 2) {
									this.open();
								} else {
									this.close();
								}
								break;
						}
					},

					isInsideSwipeTargetArea: function(x){
						return x < this.swipeTargetWidth;
					},

					onTransitionEnd: function() {
						this.$abovePage.removeClass('transition');
						this.$behindPage.removeClass('transition');
					},

					isClosed: function(){
						return this.startX == 0;
					},

					close: function() {
						this.startX = 0;
						if (this.currentX !== 0) {
							this.$abovePage.addClass('transition');
							this.$behindPage.addClass('transition');
							this.translate(0);
						}
					},

					open: function() {
						this.startX = this.MAX;
						if (this.currentX != this.MAX) {
							this.$abovePage.addClass('transition');
							this.$behindPage.addClass('transition');
							this.translate(this.MAX);
						}
					},

					toggle: function() {
						if (this.startX === 0) {
							this.open();
						} else {
							this.close();
						}
					},

					translate: function(x) {
						this.abovePage.style.webkitTransform = 'translate3d(' + x + 'px, 0, 0)';
						var behind = (x - this.MAX) / this.MAX * 10;
						var opacity = 1 + behind / 100;
						this.behindPage.style.webkitTransform = 'translate3d(' + behind + '%, 0, 0)';
						this.behindPage.style.opacity = opacity;
						this.currentX = x;
					}
				});

				var swiper = new Swiper(element);


				scope.openMenu = function() {
					swiper.open();
				};

				scope.closeMenu = function() {
					swiper.close();
				};

				scope.toggleMenu = function() {
					swiper.toggle();
				};


				SlidingMenuFactory.addSlidingMenu(scope);
			}
		};
	});
})();