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

	directives.directive('onsNavigator', function(ONSEN_CONSTANTS, $http, $compile, $parse, NavigatorStack) {
		return {
			restrict: 'E',
			replace: false,
			transclude: true,
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

				var TRANSITION_END = "webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd";

				var leftButtonClick = attrs.onLeftButtonClick;
				var rightButtonClick = attrs.onRightButtonClick;
				var navigatorItems = [];

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

						leftButtonContainer.bind('touchend', function(){   // fix android 2.3 click event not fired some times when used with sliding menu
						});

						leftButtonContainer.bind('click', this.onLeftButtonClicked.bind(this));
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
							this.pushPage(scope.page, options);
						}
						this.checkiOS7();

						attrs.$observe('title', function(title) {
							if (title) {
								this.setTitle(title);
							}
						}.bind(this));

						this.attachScopeMethods();
					},

					attachScopeMethods: function(){
						scope.pushPage = this.pushPage.bind(this);
						scope.popPage = this.popPage.bind(this);
						scope.resetToPage = this.resetToPage.bind(this);
					},

					attachFastClickEvent: function(el) {
						if (el && el.nodeType) {
							FastClick.attach(el);
						}

					},

					onTransitionEnded: function() {
						this.setReady(true);
					},

					setReady: function(ready) {
						this.ready = ready;
					},

					isReady: function() {
						return this.ready;
					},

					checkiOS7: function() {
						if (window.device && window.device.platform) {
							if (window.device.platform === 'iOS' && parseFloat(window.device.version) >= 7) {
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
						inBackLabel.addClass('onsen_navigator-back-label onsen_navigator-item topcoat-navigation-bar__line-height navigate_right');
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
						inBackLabel.removeClass('navigate_right');
						inBackLabel.addClass('transition navigate_center topcoat-icon-button--quiet');

						var outLabel = outNavigatorItem.backLabel;
						if (outLabel) {
							outLabel.bind(TRANSITION_END, function transitionEnded(e) {
								outLabel.remove();
								outLabel.unbind(transitionEnded);
							});
							outLabel.removeClass('navigate_center');
							outLabel.addClass('navigate_left');
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
							outLabel.bind(TRANSITION_END, function transitionEnded(e) {
								outLabel.remove();
								outLabel.unbind(transitionEnded);
							});

							toolbarContent[0].offsetWidth;
							outLabel.removeClass('transition navigate_center');
							outLabel.addClass('transition navigate_right');
						}


						if (inLabel) {
							toolbarContent[0].offsetWidth;
							inLabel.removeClass('navigate_left');
							inLabel.addClass('transition navigate_center');
							inLabel.bind('click', this.onLeftButtonClicked.bind(this));
							this.attachFastClickEvent(inLabel[0]);
						}
					},

					getCurrentNavigatorItem: function() {
						return navigatorItems[navigatorItems.length - 1];
					},

					onLeftButtonClicked: function() {
						var onLeftButtonClick = this.getCurrentNavigatorItem().options.onLeftButtonClick;
						if (onLeftButtonClick) {
							var onLeftButtonClickFn = $parse(onLeftButtonClick);							
							onLeftButtonClickFn(scope.$parent);
						} else {
							if (this.canPopPage()) {
								this.popPage();
							}
						}
					},

					onRightButtonClicked: function() {
						var onRightButtonClick = this.getCurrentNavigatorItem().options.onRightButtonClick;
						if (onRightButtonClick) {
							var onRightButtonClickFn = $parse(onRightButtonClick);
							onRightButtonClickFn(scope.$parent);
						}
					},

					setTitle: function(title) { // no animation
						if (this.isEmpty()) {
							return;
						}
						var currentNavigatorItem = navigatorItems[navigatorItems.length - 1];
						currentNavigatorItem.options.title = title;
						if (currentNavigatorItem.titleElement) {
							currentNavigatorItem.titleElement.text(title);
						}
					},

					animateTitleIn: function(inNavigatorItem, outNavigatorItem) {
						var inTitle = inNavigatorItem.options.title || '';
						var inTitleElement = angular.element('<span>' + inTitle + '</span>');
						inTitleElement.attr('class', 'onsen_navigator-item onsen_navigator-title topcoat-navigation-bar__line-height center transition animate-right');
						var outTitleElement = outNavigatorItem.titleElement;
						outTitleElement.after(inTitleElement);
						outTitleElement.bind(TRANSITION_END, function transitionEnded(e) {
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
								angular.element(toolbar[0].querySelector('#right-section-icon')).append(rightButtonIconElement); // fix bug on ios. strange that we cant use rightSectionIcon.append() here
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
							rightButton.bind(TRANSITION_END, function transitionEnded(e) {
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
							outRightButton.bind(TRANSITION_END, function transitionEnded(e) {
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
						outTitleElement.bind(TRANSITION_END, function transitionEnded(e) {
							outTitleElement.remove();
							outTitleElement.unbind(transitionEnded);
						});
						outTitleElement.removeClass('animate-center');
						outTitleElement.addClass('transition animate-right');
						inTitleElement.removeClass('animate-left');
						inTitleElement.addClass('animate-center');
					},

					animatePageIn: function(inPage, outPage) {
						var that = this;
						inPage.bind(TRANSITION_END, function transitionEnded(e) {
							that.onTransitionEnded();
						});

						element[0].offsetWidth;
						inPage.attr("class", "onsen_navigator-pager transition navigator_center");
						outPage.attr("class", "onsen_navigator-pager transition navigate_left");
					},

					animatePageOut: function(currentPage, previousPage) {
						previousPage.attr("class", "onsen_navigator-pager navigate_left");
						element[0].offsetWidth;
						previousPage.attr("class", "onsen_navigator-pager transition navigator_center");

						var that = this;
						currentPage.bind(TRANSITION_END, function transitionEnded(e) {
							var currentPageScope = currentPage.scope();
							if(currentPageScope){
								currentPageScope.$destroy();
							}
							currentPage.remove();
							currentPage.unbind(transitionEnded);
							that.onTransitionEnded();
						});

						currentPage.attr("class", "onsen_navigator-pager transition navigate_right");
					},

					isEmpty: function() {
						return navigatorItems.length < 1;
					},

					canPopPage: function() {
						return navigatorItems.length > 1;
					},
					
					resetToPage: function(page, options) {
						if (!this.isReady()) {
							return;
						}
						var navigatorItem;
						for (var i = 0; i < navigatorItems.length; i++) {
							navigatorItem = navigatorItems[i];
							if (navigatorItem.backLabel) {
								navigatorItem.backLabel.remove();
							}
							if (navigatorItem.titleElement) {
								navigatorItem.titleElement.remove();
							}
							if (navigatorItem.rightButtonIconElement) {
								navigatorItem.rightButtonIconElement.remove();
							}
						};

						container.empty();
						navigatorItems = [];
						this.pushPage(page, options);
					},

					pushPage: function(page, options) {
						if(options && typeof options != "object"){
							throw new Error('options must be an objected. You supplied ' + options);
						}
						if (!this.isReady()) {
							return;
						}

						var that = this;

						this.setReady(false);

						$http({
							url: page,
							method: "GET"
						}).error(function(e) {
							that.onTransitionEnded();
							console.error(e);
						}).success(function(data, status, headers, config) {
							var page = angular.element('<div></div>');
							page.addClass('onsen_navigator-pager');
							var blackMask = angular.element('<div></div>');
							blackMask.addClass('onsen_navigator-black-mask');
							page.append(blackMask);

							var templateHTML = angular.element(data.trim());
							templateHTML.addClass('navigator-page');

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
							var pageScope = scope.$parent.$new();
							var pager = $compile(page)(pageScope);
							container.append(pager);

							var navigatorItem = {
								page: pager,
								options: options || {},
								pageScope: pageScope
							};

							if (!this.isEmpty()) {
								var previousNavigatorItem = navigatorItems[navigatorItems.length - 1];
								var previousPage = previousNavigatorItem.page;
								pager.addClass('navigate_right');
								
								setTimeout(function(){
									this.animatePageIn(pager, previousPage);
									this.animateTitleIn(navigatorItem, previousNavigatorItem);

									this.animateBackLabelIn(navigatorItem, previousNavigatorItem);
									this.animateRightButtonIn(navigatorItem, previousNavigatorItem);
								}.bind(this), 0);
								
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
					},

					popPage: function() {
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
						currentNavigatorItem.pageScope.$destroy();
					}					
				});

				var navigator = new Navigator();

				NavigatorStack.addNavigator(scope);				
				scope.$on('$destroy', function(){
					NavigatorStack.removeNavigator(scope);
				});
			}

		}
	});
})();