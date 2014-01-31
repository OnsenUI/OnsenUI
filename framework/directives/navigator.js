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

	directives.directive('onsNavigator', function(ONSEN_CONSTANTS, $http, $compile, $parse) {
		return {
			restrict: 'E',
			replace: false,
			transclude: false,
			scope: {
				title: '@',
				page: '@',
				hideToolbar: '@',
				initialLeftButtonIcon: '@leftButtonIcon',
				rightButtonIcon: '@',
				onLeftButtonClick: '@',
				onRightButtonClick: '@'
			},
			templateUrl: ONSEN_CONSTANTS.DIRECTIVE_TEMPLATE_URL + '/navigator.tpl',
			// The linking function will add behavior to the template
			link: function(scope, element, attrs) {
				
				var leftButtonClick = attrs.onLeftButtonClick;
				var rightButtonClick = attrs.onRightButtonClick;
				var navigatorItems = [];
				scope.ons = scope.ons || {};
				scope.ons.navigator = scope.ons.navigator || {};
				var container = angular.element(element[0].querySelector('.navigator-content'));
				var toolbar = angular.element(element[0].querySelector('.topcoat-navigation-bar'));
				var toolbarContent = angular.element(element[0].querySelector('.navigator-toolbar__content'));
				var leftSection = angular.element(toolbarContent[0].querySelector('#left-section'));
				var leftButtonContainer = angular.element(toolbarContent[0].querySelector('.onsen_navigator__left-button-container'));
				var leftArrow = angular.element(leftButtonContainer[0].querySelector('i'));

				var rightSection = angular.element(toolbarContent[0].querySelector('.onsen_navigator__right-button'));
				var rightSectionIcon = angular.element(rightSection[0].querySelector('#right-section-icon'));				

				var leftButtonClickFn = $parse(scope.onLeftButtonClick);				

				var Navigator = Class.extend({
					init: function() {
						this.setReady(true);
						this.attachMethods();
						leftSection.bind('click', this.onLeftButtonClicked.bind(this));
						this.attachFastClickEvent(leftSection[0]);
						rightSection.bind('click', this.onRightButtonClicked.bind(this));
						this.attachFastClickEvent(rightSection[0]);
						if (scope.page) {
							var options = {
								title: scope.title,
								leftButtonIcon: scope.initialLeftButtonIcon,
								rightButtonIcon: scope.rightButtonIcon,
								onLeftButtonClick: scope.onLeftButtonClick,
								onRightButtonClick: scope.onRightButtonClick
							};
							scope.ons.navigator.pushPage(scope.page, options);
						}
						this.checkiOS7();

						attrs.$observe('title', function(title){
							if(title){
								this.setTitle(title);
							}
						}.bind(this));	
					},

					attachFastClickEvent: function(el){
						FastClick.attach(el);						
					},

					onTransitionEnded: function(){
						this.setReady(true);
					},

					setReady: function(ready){
						this.ready = ready;
					},

					isReady: function(){
						return this.ready;
					},

					checkiOS7: function() {						
						console.log('check ios 7');
						if (window.device && window.device.platform) {
							console.log('check ios 7 ' + window.device.platform + ', ' + window.device.version + ', ' + parseFloat(window.device.version));
							if (window.device.platform === 'iOS' && parseFloat(window.device.version) >= 7) {
								console.log('adjust');
								this.adjustForiOS7();
							}
						} else {
							document.addEventListener("deviceready", this.checkiOS7.bind(this), false);
						}
					},

					adjustForiOS7: function() {
						toolbar[0].style.height = toolbarContent[0].clientHeight + 20 + 'px';
						toolbar[0].style.paddingTop = '20px';
					},

					animateBackLabelIn: function(inNavigatorItem, outNavigatorItem) {
						var title = outNavigatorItem.options.title;
						var inBackLabel = angular.element('<div></div>');
						inBackLabel.addClass('onsen_navigator-back-label onsen_navigator-item topcoat-navigation-bar__line-height right');
						inBackLabel.bind('click', this.onLeftButtonClicked.bind(this));
						this.attachFastClickEvent(inBackLabel[0]);
						inNavigatorItem.backLabel = inBackLabel;
						if (inNavigatorItem.options.leftButtonIcon) {
							// no back label if user specify icon
							inBackLabel[0].style.display = 'none';
						}
						toolbarContent.prepend(inBackLabel);
						inBackLabel.text(title);

						toolbarContent[0].offsetWidth;
						inBackLabel.removeClass('right');
						inBackLabel.addClass('transition center topcoat-icon-button--quiet');

						var outLabel = outNavigatorItem.backLabel;
						if (outLabel) {
							outLabel.bind('webkitTransitionEnd', function transitionEnded(e) {
								outLabel.remove();
								outLabel.unbind(transitionEnded);
							});
							outLabel.removeClass('center');
							outLabel.addClass('left');
						}
					},

					animateBackLabelOut: function(inNavigatorItem, outNavigatorItem) {
						var outLabel = outNavigatorItem.backLabel;
						var inLabel = inNavigatorItem.backLabel;
						toolbarContent.prepend(inLabel);

						if (outNavigatorItem.options.leftButtonIcon) {
							// no back label if user specify icon
							outLabel.remove();
						} else {
							outLabel.bind('webkitTransitionEnd', function transitionEnded(e) {
								outLabel.remove();
								outLabel.unbind(transitionEnded);
							});

							toolbarContent[0].offsetWidth;
							outLabel.removeClass('transition center');
							outLabel.addClass('transition right');
						}


						if (inLabel) {
							toolbarContent[0].offsetWidth;
							inLabel.removeClass('left');
							inLabel.addClass('transition center');
							inLabel.bind('click', this.onLeftButtonClicked.bind(this));
							this.attachFastClickEvent(inLabel[0]);
						}
					},

					getCurrentNavigatorItem: function() {
						return navigatorItems[navigatorItems.length - 1];
					},

					onLeftButtonClicked: function() {
						console.log('left button clicked');
						var onLeftButtonClick = this.getCurrentNavigatorItem().options.onLeftButtonClick;
						if (onLeftButtonClick) {
							var onLeftButtonClickFn = $parse(onLeftButtonClick);
							if (onLeftButtonClick.indexOf('ons.navigator.') >= 0) {
								onLeftButtonClickFn(scope);
							} else {
								onLeftButtonClickFn(scope.$parent);
							}
						} else {
							if (this.canPopPage()) {
								scope.ons.navigator.popPage();
							}
						}
					},

					onRightButtonClicked: function() {
						var onRightButtonClick = this.getCurrentNavigatorItem().options.onRightButtonClick;
						if (onRightButtonClick) {
							var onRightButtonClickFunction = $parse(onRightButtonClick);
							if (onRightButtonClick.indexOf('ons.navigator.') >= 0) {
								onRightButtonClickFunction(scope);
							} else {
								onRightButtonClickFunction(scope.$parent);
							}
						}
					},

					setTitle: function(title){ // no animation
						if(this.isEmpty()){
							return;
						}
						var currentNavigatorItem = navigatorItems[navigatorItems.length - 1];
						currentNavigatorItem.options.title = title;
						if(currentNavigatorItem.titleElement){
							currentNavigatorItem.titleElement.text(title);
						}						
					},

					animateTitleIn: function(inNavigatorItem, outNavigatorItem) {
						var inTitle = inNavigatorItem.options.title || '';
						var inTitleElement = angular.element('<span>' + inTitle + '</span>');
						inTitleElement.attr('class', 'onsen_navigator-item onsen_navigator-title topcoat-navigation-bar__line-height center transition animate-right');
						var outTitleElement = outNavigatorItem.titleElement;
						outTitleElement.after(inTitleElement);
						outTitleElement.bind('webkitTransitionEnd', function transitionEnded(e) {
							outTitleElement.remove();
							outTitleElement.unbind(transitionEnded);
						});
						inNavigatorItem.titleElement = inTitleElement;
						element[0].offsetWidth;
						inTitleElement.removeClass('animate-right');
						inTitleElement.addClass('animate-center');
						outTitleElement.removeClass('animate-center');
						outTitleElement.addClass('transition animate-left');
					},

					animateRightButtonIn: function(inNavigatorItem, outNavigatorItem) {
						if (inNavigatorItem.rightButtonIconElement || inNavigatorItem.options.rightButtonIcon) {
							var rightButtonIconElement;
							if (inNavigatorItem.rightButtonIconElement) {
								rightButtonIconElement = inNavigatorItem.rightButtonIconElement;
							} else {
								rightButtonIconElement = angular.element('<i></i>');
								rightButtonIconElement.addClass(inNavigatorItem.options.rightButtonIcon + ' topcoat-navigation-bar__line-height onsen_fade');
								rightSectionIcon.append(rightButtonIconElement);
								inNavigatorItem.rightButtonIconElement = rightButtonIconElement;
							}

							rightSection[0].offsetWidth;
							rightButtonIconElement.removeClass('hide');
							rightButtonIconElement.addClass('transition show');
						}

						if (outNavigatorItem && outNavigatorItem.rightButtonIconElement) {
							var rightButton = outNavigatorItem.rightButtonIconElement;
							rightButton.removeClass('show');
							rightButton.addClass('transition hide');
							rightButton.bind('webkitTransitionEnd', function transitionEnded(e) {
								rightButton.remove();
								rightButton.unbind(transitionEnded);
							});
						}

					},

					animateRightButtonOut: function(inNavigatorItem, outNavigatorItem) {
						if (outNavigatorItem.rightButtonIconElement) {
							var outRightButton = outNavigatorItem.rightButtonIconElement;
							toolbarContent[0].offsetWidth;
							outRightButton.removeClass('show');
							outRightButton.addClass('transition hide');
							outRightButton.bind('webkitTransitionEnd', function transitionEnded(e) {
								outRightButton.remove();
								outRightButton.unbind(transitionEnded);
							});
						}
						if (inNavigatorItem.rightButtonIconElement) {
							var rightButton = inNavigatorItem.rightButtonIconElement;
							rightSectionIcon.append(rightButton);
							rightSection[0].offsetWidth;
							rightButton.removeClass('hide');
							rightButton.addClass('transition show');
						}
					},

					setLeftButton: function(navigatorItem) {
						var leftButtonIcon = navigatorItem.options.leftButtonIcon;
						if (leftButtonIcon) {
							this.setBackButtonIcon(leftButtonIcon);
							this.showBackButton();
						} else {
							// no icon
							if (this.canPopPage()) {
								this.showBackButton();
								this.setBackButtonIconAsLeftArrow();
							} else {
								// no icon and is root page
								this.hideBackButton();
							}
						}
					},

					setBackButtonIconAsLeftArrow: function() {
						leftArrow.attr('class', 'fa fa-angle-left fa-2x topcoat-navigation-bar__line-height');
					},

					setBackButtonIcon: function(iconClass) {
						leftArrow.attr('class', iconClass + ' topcoat-navigation-bar__line-height');
					},

					showBackButton: function() {
						toolbarContent[0].offsetWidth;
						leftButtonContainer.removeClass('hide');
						leftButtonContainer.addClass('transition show');
					},

					hideBackButton: function() {
						leftButtonContainer.removeClass('show');
						leftButtonContainer.addClass('hide');
					},

					animateTitleOut: function(currentNavigatorItem, previousNavigatorItem) {

						var inTitleElement = previousNavigatorItem.titleElement;
						var outTitleElement = currentNavigatorItem.titleElement;
						outTitleElement.after(inTitleElement);
						element[0].offsetWidth;
						outTitleElement.bind('webkitTransitionEnd', function transitionEnded(e) {
							outTitleElement.remove();
							outTitleElement.unbind(transitionEnded);
						});
						outTitleElement.removeClass('animate-center');
						outTitleElement.addClass('transition animate-right');
						inTitleElement.removeClass('animate-left');
						inTitleElement.addClass('animate-center');
					},

					animatePageIn: function(inPage, outPage) {
						inPage.attr("class", "onsen_navigator-pager right");

						var that = this;
						inPage.bind('webkitTransitionEnd', function transitionEnded(e) {							
							that.onTransitionEnded();
						});
						
						element[0].offsetWidth;
						inPage.attr("class", "onsen_navigator-pager transition center");
						outPage.attr("class", "onsen_navigator-pager transition left");
					},

					animatePageOut: function(currentPage, previousPage) {
						previousPage.attr("class", "onsen_navigator-pager left");
						element[0].offsetWidth;
						previousPage.attr("class", "onsen_navigator-pager transition center");

						var that = this;
						currentPage.bind('webkitTransitionEnd', function transitionEnded(e) {
							currentPage.remove();
							currentPage.unbind(transitionEnded);
							that.onTransitionEnded();
						});

						currentPage.attr("class", "onsen_navigator-pager transition right");
					},

					isEmpty: function() {
						return navigatorItems.length < 1;
					},

					canPopPage: function() {
						return navigatorItems.length > 1;
					},


					attachMethods: function() {
						scope.ons.navigator.resetToPage = function(page, options){
							if(!this.isReady()){
								return;
							}
							var navigatorItem;							
							for (var i = 0; i < navigatorItems.length; i++) {
								navigatorItem = navigatorItems[i];
								if(navigatorItem.backLabel){
									navigatorItem.backLabel.remove();
								}
								if(navigatorItem.titleElement){
									navigatorItem.titleElement.remove();
								}
								if(navigatorItem.rightButtonIconElement){
									navigatorItem.rightButtonIconElement.remove();
								}								
							};
							
							container.empty();
							navigatorItems = [];
							scope.ons.navigator.pushPage(page, options);
						}.bind(this);

						scope.ons.navigator.pushPage = function(page, options) {
							if(!this.isReady()){
								console.log('not ready => ignore');
								return;
							}

							var that = this;

							this.setReady(false);

							$http({
								url: page,
								method: "GET"
							}).error(function(e){
								that.onTransitionEnded();
								console.error(e);
							}).success(function(data, status, headers, config) {
								var page = angular.element('<div></div>');
								page.addClass('onsen_navigator-pager');
								var blackMask = angular.element('<div></div>');
								blackMask.addClass('onsen_navigator-black-mask');
								page.append(blackMask);

								var templateHTML = angular.element(data);

								var navigatorToolbar = templateHTML[0].querySelector('ons-navigator-toolbar');
								if (navigatorToolbar) {
									if (options === undefined) {
										options = {};
									}

									var $navigatorToolbar = angular.element(navigatorToolbar);
									var title = $navigatorToolbar.attr('title');
									var leftButtonIcon = $navigatorToolbar.attr('left-button-icon');
									var rightButtonIcon = $navigatorToolbar.attr('right-button-icon');
									var onLeftButtonClick = $navigatorToolbar.attr('on-left-button-click');
									var onRightButtonClick = $navigatorToolbar.attr('on-right-button-click');
									options.title = options.title || title;
									options.leftButtonIcon = options.leftButtonIcon || leftButtonIcon;
									options.rightButtonIcon = options.rightButtonIcon || rightButtonIcon;
									options.onLeftButtonClick = options.onLeftButtonClick || onLeftButtonClick;
									options.onRightButtonClick = options.onRightButtonClick || onRightButtonClick;

									$navigatorToolbar.remove();
								}

								page.append(templateHTML);
								var pager = $compile(page)(scope);
								container.append(pager);

								var navigatorItem = {
									page: pager,
									options: options || {}
								};

								if (!this.isEmpty()) {
									var previousNavigatorItem = navigatorItems[navigatorItems.length - 1];
									var previousPage = previousNavigatorItem.page;
									this.animatePageIn(pager, previousPage);
									this.animateTitleIn(navigatorItem, previousNavigatorItem);

									this.animateBackLabelIn(navigatorItem, previousNavigatorItem);
									this.animateRightButtonIn(navigatorItem, previousNavigatorItem);
								} else {
									// root page
									var titleElement = angular.element('<div></div>');
									titleElement.addClass('onsen_navigator-item onsen_navigator-title topcoat-navigation-bar__line-height center animate-center');
									if (options.title) {
										titleElement.text(options.title);
									}
									toolbarContent.append(titleElement);
									navigatorItem.titleElement = titleElement;
									this.animateRightButtonIn(navigatorItem, null);
									this.setReady(true);
								}
								navigatorItems.push(navigatorItem);
								this.setLeftButton(navigatorItem);

							}.bind(this)).error(function(data, status, headers, config) {
								console.error('error', data, status);
							});
						}.bind(this);

						scope.ons.navigator.popPage = function() {
							if (navigatorItems.length < 2 || !this.isReady()) {
								return;
							}
							this.setReady(false);

							var currentNavigatorItem = navigatorItems.pop();
							var previousNavigatorItem = navigatorItems[navigatorItems.length - 1];

							var currentPage = currentNavigatorItem.page;
							var previousPage = previousNavigatorItem.page;
							this.animatePageOut(currentPage, previousPage);

							this.animateTitleOut(currentNavigatorItem, previousNavigatorItem);
							this.animateBackLabelOut(previousNavigatorItem, currentNavigatorItem);

							this.setLeftButton(previousNavigatorItem);
							this.animateRightButtonOut(previousNavigatorItem, currentNavigatorItem);
						}.bind(this);

						scope.leftButtonClicked = function() {
							this.onLeftButtonClicked();
						}.bind(this);
					}
				});

				var navigator = new Navigator();


				//TODO: this hack is for monaca-screen scope.
				// since we are creating isolate scope, calling prensentPage() from child scope
				// doesn't propagate to monaca-screen scope.
				// -> find a way to not use callParent().

				// since our directive use scope:{...} it will not inherite prototypically. -> that why we need to use callParent();
				// https://github.com/angular/angular.js/wiki/Understanding-Scopes
				scope.ons.screen = scope.ons.screen || {};
				scope.ons.screen.presentPage = function(page) {
					callParent(scope, 'ons.screen.presentPage', page);
				};

				scope.ons.screen.dismissPage = function() {
					callParent(scope, 'ons.screen.dismissPage');
				};

				scope.ons.slidingMenu = scope.ons.slidingMenu || {};
				scope.ons.slidingMenu.openMenu = function() {
					callParent(scope, 'ons.slidingMenu.openMenu');
				}

				scope.ons.slidingMenu.closeMenu = function() {
					callParent(scope, 'ons.slidingMenu.closeMenu');
				}

				scope.ons.slidingMenu.toggleMenu = function() {
					callParent(scope, 'ons.slidingMenu.toggleMenu');
				}

				scope.ons.slidingMenu.setBehindPage = function(page) {
					callParent(scope, 'ons.slidingMenu.setBehindPage', page);
				}

				scope.ons.slidingMenu.setAbovePage = function(page) {
					callParent(scope, 'ons.slidingMenu.setAbovePage', page);
				}

				scope.ons.splitView = scope.ons.splitView || {};
				scope.ons.splitView.open = function() {
					callParent(scope, 'ons.splitView.open');
				}

				scope.ons.splitView.close = function() {
					callParent(scope, 'ons.splitView.close');
				}

				scope.ons.splitView.toggle = function() {
					callParent(scope, 'ons.splitView.toggle');
				}

				scope.ons.splitView.setMainPage = function(page) {
					callParent(scope, 'ons.splitView.setMainPage', page);
				}

				scope.ons.splitView.setSecondaryPage = function(page) {
					callParent(scope, 'ons.splitView.setSecondaryPage', page);
				}

				scope.ons.tabbar = scope.ons.tabbar || {};
				scope.ons.tabbar.setTabbarVisibility = function(visibility) {
					callParent(scope, 'ons.tabbar.setTabbarVisibility', visibility);
				}

				// TODO: support params overloading.
				// http://ejohn.org/apps/learn/#89 ?

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

		}
	});
})();