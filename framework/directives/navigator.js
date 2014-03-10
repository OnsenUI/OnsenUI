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

	directives.service('Navigator', function(ONSEN_CONSTANTS, $http, $compile, $parse, NavigatorStack, requestAnimationFrame) {
		var TRANSITION_END = "webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd";

		var Navigator = Class.extend({
			/**
			 * @property {Array}
			 */
			navigatorItems: undefined,

			/**
			 * @property {DOMElement}
			 */
			container: undefined,

			/**
			 * @property {DOMElement}
			 */
			toolbar: undefined,

			/**
			 * @property {DOMElement}
			 */
			toolbarContent: undefined,

			/**
			 * @property {DOMElement}
			 */
			leftSection: undefined,

			/**
			 * @property {DOMElement}
			 */
			leftButtonContainer: undefined,

			/**
			 * @property {DOMElement}
			 */
			leftArrow: undefined,

			/**
			 * @property {DOMElement}
			 */
			rightSection: undefined,

			/**
			 * @property {DOMElement}
			 */
			rightSectionIcon: undefined,

			/**
			 * @property {Function}
			 */
			leftButtonClickFn: undefined,

			/**
			 * @property {DOMElement}
			 */
			element: undefined,

			/**
			 * @property {Object}
			 */
			attrs: undefined,

			/**
			 * @property {Object}
			 */
			scope: undefined,

			/**
			 * @param {Object} scope
			 * @param {Object} element
			 * @param {Object} attrs
			 */
			init: function(scope, element, attrs) {
				this.scope = scope;
				this.element = element;
				this.attrs = attrs;

				this.navigatorItems = [];

				this.container = angular.element(element[0].querySelector('.navigator-content'));
				this.toolbar = angular.element(element[0].querySelector('.topcoat-navigation-bar'));
				this.toolbarContent = angular.element(element[0].querySelector('.navigator-toolbar__content'));
				this.leftSection = angular.element(this.toolbarContent[0].querySelector('.left-section'));
				this.leftButtonContainer = angular.element(this.toolbarContent[0].querySelector('.onsen_navigator__left-button-container'));
				this.leftArrow = angular.element(this.leftButtonContainer[0].querySelector('i'));

				this.rightSection = angular.element(this.toolbarContent[0].querySelector('.onsen_navigator__right-button'));
				this.rightSectionIcon = angular.element(this.rightSection[0].querySelector('.right-section-icon'));

				this.leftButtonClickFn = $parse(scope.onLeftButtonClick);

				this.setReady(true);

				// fix android 2.3 click event not fired some times when used with sliding menu
				this.leftButtonContainer.bind('touchend', function() { });

				this.leftButtonContainer.bind('click', this.onLeftButtonClicked.bind(this));
				this.attachFastClickEvent(this.leftSection[0]);
				this.rightSection.bind('click', this.onRightButtonClicked.bind(this));
				this.attachFastClickEvent(this.rightSection[0]);
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
				this.scope.pushPage = this.pushPage.bind(this);
				this.scope.popPage = this.popPage.bind(this);
				this.scope.resetToPage = this.resetToPage.bind(this);
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
						setTimeout( this.adjustForiOS7.bind(this), 0);
					}
				} else {
					document.addEventListener("deviceready", this.checkiOS7.bind(this), false);
				}
			},

			adjustForiOS7: function() {
				this.toolbar[0].style.height = this.toolbar[0].clientHeight + 20 + 'px';
				this.toolbar[0].style.paddingTop = '20px';
			},

			animateBackLabelIn: function(inNavigatorItem, outNavigatorItem) {
				var title = outNavigatorItem.options.title;
				var inBackLabel = angular.element('<div></div>');
				inBackLabel.addClass('onsen_navigator-back-label onsen_navigator-item topcoat-navigation-bar__line-height topcoat-icon-button--quiet navigate_right');
				inBackLabel.bind('click', this.onLeftButtonClicked.bind(this));
				this.attachFastClickEvent(inBackLabel[0]);
				inNavigatorItem.backLabel = inBackLabel;
				if (inNavigatorItem.options.leftButtonIcon) {
					// no back label if user specify icon
					inBackLabel[0].style.display = 'none';
				}
				this.toolbarContent.prepend(inBackLabel);
				inBackLabel.text(title);

				this.toolbarContent[0].offsetWidth;
				setTimeout(function(){
					inBackLabel.removeClass('navigate_right');
					inBackLabel.addClass('transition navigate_center');
				}, 10);
				

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
				this.toolbarContent.prepend(inLabel);

				if (outNavigatorItem.options.leftButtonIcon) {
					// no back label if user specify icon
					outLabel.remove();
				} else {
					outLabel.bind(TRANSITION_END, function transitionEnded(e) {
						outLabel.remove();
						outLabel.unbind(transitionEnded);
					});

					this.toolbarContent[0].offsetWidth;
					outLabel.removeClass('transition navigate_center');
					outLabel.addClass('transition navigate_right');
				}


				if (inLabel) {
					this.toolbarContent[0].offsetWidth;
					inLabel.removeClass('navigate_left');
					inLabel.addClass('transition navigate_center');
					inLabel.bind('click', this.onLeftButtonClicked.bind(this));
					this.attachFastClickEvent(inLabel[0]);
				}
			},

			getCurrentNavigatorItem: function() {
				return this.navigatorItems[this.navigatorItems.length - 1];
			},

			onLeftButtonClicked: function() {
				var onLeftButtonClick = this.getCurrentNavigatorItem().options.onLeftButtonClick;
				if (onLeftButtonClick) {
					var onLeftButtonClickFn = $parse(onLeftButtonClick);							
					onLeftButtonClickFn(this.scope.$parent);
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
					onRightButtonClickFn(this.scope.$parent);
				}
			},

			setTitle: function(title) { // no animation
				if (this.isEmpty()) {
					return;
				}
				var currentNavigatorItem = this.navigatorItems[this.navigatorItems.length - 1];
				currentNavigatorItem.options.title = title;
				if (currentNavigatorItem.titleElement) {
					currentNavigatorItem.titleElement.text(title);
				}
			},

			animateTitleIn: function(inNavigatorItem, outNavigatorItem) {
				var inTitle = inNavigatorItem.options.title || '';
				var inTitleElement = angular.element('<span>' + inTitle + '</span>');
				inTitleElement.attr('class', 'onsen_navigator-item onsen_navigator-title topcoat-navigation-bar__title topcoat-navigation-bar__line-height center transition animate-right');
				var outTitleElement = outNavigatorItem.titleElement;
				outTitleElement.after(inTitleElement);
				outTitleElement.bind(TRANSITION_END, function transitionEnded(e) {
					outTitleElement.remove();
					outTitleElement.unbind(transitionEnded);
				});
				inNavigatorItem.titleElement = inTitleElement;
				setTimeout(function(){
					inTitleElement.removeClass('animate-right');
					inTitleElement.addClass('animate-center');
					outTitleElement.removeClass('animate-center');
					outTitleElement.addClass('transition animate-left');
				}, 10);
			},

			animateRightButtonIn: function(inNavigatorItem, outNavigatorItem) {
				if (inNavigatorItem.rightButtonIconElement || inNavigatorItem.options.rightButtonIcon) {
					var rightButtonIconElement;
					if (inNavigatorItem.rightButtonIconElement) {
						rightButtonIconElement = inNavigatorItem.rightButtonIconElement;
					} else {
						rightButtonIconElement = angular.element('<i></i>');
						rightButtonIconElement.addClass(inNavigatorItem.options.rightButtonIcon + ' topcoat-navigation-bar__line-height onsen_fade');
						this.rightSectionIcon.append(rightButtonIconElement); // fix bug on ios. strange that we cant use rightSectionIcon.append() here
						inNavigatorItem.rightButtonIconElement = rightButtonIconElement;
					}

					this.rightSection[0].offsetWidth;
					setTimeout(function(){
						rightButtonIconElement.removeClass('hide');
						rightButtonIconElement.addClass('transition show');
					}, 10);							
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
					this.toolbarContent[0].offsetWidth;
					outRightButton.removeClass('show');
					outRightButton.addClass('transition hide');
					outRightButton.bind(TRANSITION_END, function transitionEnded(e) {
						outRightButton.remove();
						outRightButton.unbind(transitionEnded);
					});
				}
				if (inNavigatorItem.rightButtonIconElement) {
					var rightButton = inNavigatorItem.rightButtonIconElement;
					this.rightSectionIcon.append(rightButton);
					this.rightSection[0].offsetWidth;
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
				this.leftArrow.attr('class', 'fa fa-angle-left fa-2x topcoat-navigation-bar__line-height');
			},

			setBackButtonIcon: function(iconClass) {
				this.leftArrow.attr('class', iconClass + ' topcoat-navigation-bar__line-height');
			},

			showBackButton: function() {
				this.toolbarContent[0].offsetWidth;
				var that = this;
				setTimeout(function(){
					that.leftButtonContainer.removeClass('hide');
					that.leftButtonContainer.addClass('transition show');
				}, 200);
				
			},

			hideBackButton: function() {
				this.leftButtonContainer.removeClass('show');
				this.leftButtonContainer.addClass('hide');
			},

			animateTitleOut: function(currentNavigatorItem, previousNavigatorItem) {

				var inTitleElement = previousNavigatorItem.titleElement;
				var outTitleElement = currentNavigatorItem.titleElement;
				outTitleElement.after(inTitleElement);
				this.element[0].offsetWidth;
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

				// wait 10ms fo reflow
				setTimeout(function(){
					inPage.attr("class", "onsen_navigator-pager transition navigator_center");
					outPage.attr("class", "onsen_navigator-pager transition navigate_left");
				}, 10);
				
			},

			animatePageOut: function(currentPage, previousPage) {
				previousPage.attr("class", "onsen_navigator-pager navigate_left");
				this.element[0].offsetWidth;
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
				return this.navigatorItems.length < 1;
			},

			canPopPage: function() {
				return this.navigatorItems.length > 1;
			},
			
			resetToPage: function(page, options) {
				if (!this.isReady()) {
					return;
				}
				var navigatorItem;
				for (var i = 0; i < this.navigatorItems.length; i++) {
					navigatorItem = this.navigatorItems[i];
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

				this.container.empty();
				this.navigatorItems = [];
				this.pushPage(page, options);
			},

			_pushPageDOM: function(page, element, options) {

				var page = angular.element('<div></div>');
				page.addClass('onsen_navigator-pager');
				var blackMask = angular.element('<div></div>');
				blackMask.addClass('onsen_navigator-black-mask');
				page.append(blackMask);

				var templateHTML = angular.element(element);
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
				var pageScope = this.scope.$parent.$new();
				var pager = $compile(page)(pageScope);
				this.container.append(pager);

				var navigatorItem = {
					page: pager,
					options: options || {},
					pageScope: pageScope
				};

				if (!this.isEmpty()) {
					var previousNavigatorItem = this.navigatorItems[this.navigatorItems.length - 1];
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
					titleElement.addClass('onsen_navigator-item onsen_navigator-title topcoat-navigation-bar__title topcoat-navigation-bar__line-height center animate-center');
					if (options.title) {
						titleElement.text(options.title);
					}
					this.toolbarContent.append(titleElement);
					navigatorItem.titleElement = titleElement;
					this.animateRightButtonIn(navigatorItem, null);
					this.setReady(true);
				}
				this.navigatorItems.push(navigatorItem);
				this.setLeftButton(navigatorItem);

			},

			pushPage: function(page, options) {
				if (options && typeof options != "object") {
					throw new Error('options must be an objected. You supplied ' + options);
				}
				if (!this.isReady()) {
					return;
				}

				var that = this;

				this.setReady(false);

				$http({
					url: page,
					method: 'GET'
				}).error(function(e) {
					that.onTransitionEnded();
					console.error(e);
				}).success(function(data, status, headers, config) {
					that._pushPageDOM(page, angular.element(data.trim())[0], options);
				}).error(function(data, status, headers, config) {
					console.error('error', data, status);
				});
			},

			popPage: function() {
				if (this.navigatorItems.length < 2 || !this.isReady()) {
					return;
				}
				this.setReady(false);

				var currentNavigatorItem = this.navigatorItems.pop();
				var previousNavigatorItem = this.navigatorItems[this.navigatorItems.length - 1];

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

		return Navigator;
	});

	directives.directive('onsNavigator', function(ONSEN_CONSTANTS, $http, $compile, $parse, NavigatorStack, Navigator, $templateCache) {
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

			compile: function(element, attrs, transclude) {

				var path = ONSEN_CONSTANTS.DIRECTIVE_TEMPLATE_URL + '/navigator.tpl';
				element.append(angular.element($templateCache.get(path))[0]);

				return function (scope, element, attrs) {
					var navigator = new Navigator(scope, element, attrs);

					if (!attrs.page) {
						transclude(scope.$parent, function(clone) {

							var wrapper = angular.element('<div></div>');
							wrapper.attr('class', 'page');
							wrapper.append(clone);

							navigator._pushPageDOM('', wrapper, {});
						});
					}

					NavigatorStack.addNavigator(scope);
					scope.$on('$destroy', function(){
						NavigatorStack.removeNavigator(scope);
					});
				};
			}

		}
	});
})();
