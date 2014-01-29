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

	directives.directive('onsSplitView', function(ONSEN_CONSTANTS) {
		return {
			restrict: 'E',
			replace: false,
			transclude: false,
			scope: {
				secondaryPage: '@',
				mainPage: '@',
				collapse: '@',
				mainPageWidth: '@'
			},
			templateUrl: ONSEN_CONSTANTS.DIRECTIVE_TEMPLATE_URL + '/split_view.tpl',
			link: function(scope, element, attrs) {
				var SPLIT_MODE = 0;
				var COLLAPSE_MODE = 1;

				var Swiper = Class.extend({
					init: function(element) {
						this.$el = element;
						this.el = element[0];
						this.VERTICAL_THRESHOLD = 20;
						this.HORIZONTAL_THRESHOLD = 20;
						this.behindPage = element[0].querySelector('.secondary');
						this.$behindPage = angular.element(this.behindPage);
						this.abovePage = element[0].querySelector('.main');
						this.$abovePage = angular.element(this.abovePage);
						this.previousX = 0;
						this.MAX = this.abovePage.clientWidth * 0.7;
						this.currentX = 0;
						this.startX = 0;
						this.mode = SPLIT_MODE;

						this.hammertime = new Hammer(this.el);
						this.boundHammerEvent = this.handleEvent.bind(this);
						this.bindEvents();

						window.addEventListener("orientationchange", this.onOrientationChange.bind(this));
						window.addEventListener('resize', this.onResize.bind(this));
						
						this.considerChangingCollapse();
					},

					onOrientationChange: function(){
						this.considerChangingCollapse();
					},

					onResize: function() {				
						this.considerChangingCollapse();
						this.MAX = this.abovePage.clientWidth * 0.7;
					},

					considerChangingCollapse: function(){
						if (this.shouldCollapse()) {
							this.activateCollapseMode();
						} else {
							this.deactivateCollapseMode();
						}
					},

					shouldCollapse: function() {
						var orientation = window.orientation;

						switch (scope.collapse) {
							case undefined:
							case "none":
								return false;

							case "portrait":
								if (orientation == 180 || orientation == 0) {
									return true;
								} else {
									return false;
								}
								break;

							case "landscape":
								if (orientation == 90 || orientation == -90) {								
									return true;
								} else {
									return false;
								}
								break;
							
							default:
								// by width
								if (isNumber(scope.collapse)) {									
									console.log('window', window.innerWidth, scope.collapse);
									if (window.innerWidth < scope.collapse) {
										return true;
									} else {
										return false;
									}
								} else {
									// other cases
									return false;
								}
								break;
						}

					},

					setSize: function() {
						var behindSize = 100 - scope.mainPageWidth;
						this.behindPage.style.width = behindSize + '%';
						this.behindPage.style.opacity = 1;
						this.abovePage.style.width = scope.mainPageWidth + '%';
						var translate = behindSize * window.innerWidth / 100;
						console.log('translate', translate);
						this.translate2(translate);
					},

					activateCollapseMode: function() {
						console.log('activate collapse mode');
						this.behindPage.style.width = '100%';
						this.abovePage.style.width = '100%';						
						this.mode = COLLAPSE_MODE;
						this.activateHammer();
						this.translate(0);	

						if(Modernizr.boxshadow){
							this.$abovePage.addClass('onsen_split-view__shadow');
						}					
					},

					deactivateCollapseMode: function() {
						console.log('deactivate collapse mode');
						this.setSize();
						this.deactivateHammer();
						this.mode = SPLIT_MODE;
						if(Modernizr.boxshadow){
							this.$abovePage.removeClass('onsen_split-view__shadow');
						}	
					},

					activateHammer: function() {
						console.log('activate hammer');
						this.hammertime.on("dragleft dragright swipeleft swiperight release", this.boundHammerEvent);
					},

					deactivateHammer: function() {
						console.log('deactivate hammer');
						this.hammertime.off("dragleft dragright swipeleft swiperight release", this.boundHammerEvent);
					},

					bindEvents: function() {
						this.$abovePage.bind('webkitTransitionEnd', this.onTransitionEnd.bind(this));
					},

					handleEvent: function(ev) {						
						switch (ev.type) {

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

					onTransitionEnd: function() {
						console.log('transition ended');
						this.$abovePage.removeClass('transition');
						this.$behindPage.removeClass('transition');
					},

					close: function() {
						if (this.mode === SPLIT_MODE) {
							return;
						}
						this.startX = 0;
						if (this.currentX !== 0) {
							this.$abovePage.addClass('transition');
							this.$behindPage.addClass('transition');
							this.translate(0);
						}
					},

					open: function() {
						if (this.mode === SPLIT_MODE) {
							return;
						}
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
					},

					translate2: function(x) {
						this.behindPage.style.webkitTransform = 'translate3d(0, 0, 0)';
						this.abovePage.style.webkitTransform = 'translate3d(' + x + 'px, 0, 0)';
						this.currentX = x;
					}
				});

				function isNumber(n) {
					return !isNaN(parseFloat(n)) && isFinite(n);
				}

				var swiper = new Swiper(element);

				scope.pages = {
					behind: scope.secondaryPage,
					above: scope.mainPage
				};
				scope.ons = scope.ons || {};
				scope.ons.splitView = scope.ons.splitView || {};

				scope.ons.splitView.open = function() {
					swiper.open();
				};

				scope.ons.splitView.close = function() {
					swiper.close();
				};

				scope.ons.splitView.toggle = function() {
					swiper.toggle();
				};

				scope.ons.splitView.setMainPage = function(page) {
					if (page) {
						scope.pages.above = page;
					} else {
						throw new Error('cannot set undefined page');
					}
				};

				scope.ons.splitView.setSecondaryPage = function(page) {
					if (page) {
						scope.pages.behind = page;
					} else {
						throw new Error('cannot set undefined page');
					}
				};

				scope.ons.screen = scope.ons.screen || {};
				scope.ons.screen.presentPage = function(page) {
					callParent(scope, 'ons.screen.presentPage', page);
				};

				scope.ons.screen.dismissPage = function() {
					callParent(scope, 'ons.screen.dismissPage');
				};

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
				}
			}
		};
	});
})();