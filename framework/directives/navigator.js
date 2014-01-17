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

	directives.directive('onsNavigator', function(ONSEN_CONSTANTS, $http, $compile) {
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
				onLeftButtonClick: '&',
				onRightButtonClick: '&'
			},
			templateUrl: ONSEN_CONSTANTS.DIRECTIVE_TEMPLATE_URL + '/navigator.tpl',
			// The linking function will add behavior to the template
			link: function(scope, element, attrs) {
				var navigatorItems = [];
				scope.ons = scope.ons || {};
				scope.ons.navigator = scope.ons.navigator || {};
				var container = angular.element(element[0].querySelector('.navigator-content'))
				var toolbar = angular.element(element[0].querySelector('.topcoat-navigation-bar'));
				var leftArrow = angular.element(toolbar[0].querySelector('.onsen_navigator__left-arrow'));				

				var Navigator = Class.extend({
					init: function() {
						this.attachMethods();
						leftArrow.bind('click', this.onBackButtonClicked.bind(this));
						if (scope.page) {
							var options = {
								title: scope.title,
								leftButtonIcon: scope.initialLeftButtonIcon,
								rightButtonIcon: scope.rightButtonIcon,
								onLeftButtonClick: scope.onLeftButtonClick,
								onRightButtonClick: scope.onRightButtonClick
							}
							scope.ons.navigator.pushPage(scope.page, options);
						}
					},

					animateBackLabelIn: function(inNavigatorItem, outNavigatorItem){
						var title = outNavigatorItem.options.title;
						var inBackLabel = angular.element('<div></div>');
						inBackLabel.addClass('topcoat-navigation-bar__item onsen_navigator-back-label right');
						inBackLabel.bind('click', this.onBackButtonClicked.bind(this));
						inNavigatorItem.backLabel = inBackLabel;
						toolbar.prepend(inBackLabel);
						inBackLabel.text(title);

						toolbar[0].offsetWidth;	
						inBackLabel.removeClass('right');										
						inBackLabel.addClass('transition center');

						var outLabel = outNavigatorItem.backLabel;
						if(outLabel){
							outLabel.bind('webkitTransitionEnd', function transitionEnded(e) {
								outLabel.remove();
								outLabel.unbind(transitionEnded);
							});
							outLabel.removeClass('center');
							outLabel.addClass('left');	
						}
						
					},

					onBackButtonClicked: function(){
						console.log('back clicked');
						scope.ons.navigator.popPage();
					},

					animateBackLabelOut: function(inNavigatorItem, outNavigatorItem){
						var outLabel = outNavigatorItem.backLabel;
						var inLabel = inNavigatorItem.backLabel;						
						toolbar.prepend(inLabel);

						outLabel.bind('webkitTransitionEnd', function transitionEnded(e) {
							outLabel.remove();
							outLabel.unbind(transitionEnded);
						});

						toolbar[0].offsetWidth;
						outLabel.removeClass('transition center');						
						outLabel.addClass('transition right');

						if(inLabel){
							inLabel.removeClass('left');
							inLabel.addClass('center');
							inLabel.bind('click', this.onBackButtonClicked.bind(this));
						}
						
					},

					animateTitleIn: function(inNavigatorItem, outNavigatorItem) {
						var inTitle = inNavigatorItem.options.title;
						var inTitleElement = angular.element('<span>' + inTitle + '</span>')
						inTitleElement.attr('class', 'topcoat-navigation-bar__item onsen_navigator-title center transition animate-right');
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

					animateRightButtonIn: function(inNavigatorItem, outNavigatorItem){
						if(inNavigatorItem.rightButtonElement || inNavigatorItem.options.rightButtonIcon){
							var rightButton;
							if(inNavigatorItem.rightButtonElement){
								rightButton = inNavigatorItem.rightButtonElement;
							}else{
								rightButton = angular.element('<div></div>');
								rightButton.addClass('onsen_navigator__right-button topcoat-navigation-bar__item transition hide');
								var icon = angular.element('<i></i>');
								icon.addClass(inNavigatorItem.options.rightButtonIcon + ' onsen_navigation-bar-height');
								rightButton.append(icon);
								inNavigatorItem.rightButtonElement = rightButton;
							}

							toolbar.append(rightButton);
							toolbar[0].offsetWidth;
							rightButton.removeClass('hide');
							rightButton.addClass('show');								
						
						}

						if(outNavigatorItem && outNavigatorItem.rightButtonElement){
							var rightButton = outNavigatorItem.rightButtonElement;
							rightButton.removeClass('show');
							rightButton.addClass('hide');
							rightButton.bind('webkitTransitionEnd', function transitionEnded(e) {
								rightButton.remove();
								rightButton.unbind(transitionEnded);
							});
						}
						
					},

					animateRightButtonOut: function(inNavigatorItem, outNavigatorItem){
						if(outNavigatorItem.rightButtonElement){
							var outRightButton = outNavigatorItem.rightButtonElement;
							toolbar[0].offsetWidth;
							outRightButton.removeClass('show');
							outRightButton.addClass('hide');
							outRightButton.bind('webkitTransitionEnd', function transitionEnded(e) {
								outRightButton.remove();
								outRightButton.unbind(transitionEnded);
							});
						}
						if(inNavigatorItem.rightButtonElement){
							var rightButton = inNavigatorItem.rightButtonElement;
							toolbar.append(rightButton);
							toolbar[0].offsetWidth;
							rightButton.removeClass('hide');
							rightButton.addClass('show');
						}

					},

					showBackButton: function(inNavigatorItem, outNavigatorItem) {											
						toolbar[0].offsetWidth;
						leftArrow.removeClass('hide');			
						leftArrow.addClass('transition show');						
					},

					hideBackButton: function(){
						leftArrow.removeClass('show');	
						leftArrow.addClass('hide');	
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
						element[0].offsetWidth;
						inPage.attr("class", "onsen_navigator-pager transition center");
						outPage.attr("class", "onsen_navigator-pager transition left");
					},

					animatePageOut: function(currentPage, previousPage) {
						// previousPage = $compile(previousPage)(scope);								
						previousPage.attr("class", "onsen_navigator-pager left");
						element[0].offsetWidth;
						previousPage.attr("class", "onsen_navigator-pager transition center");

						currentPage.bind('webkitTransitionEnd', function transitionEnded(e) {
							currentPage.remove();
							currentPage.unbind(transitionEnded);
						});

						currentPage.attr("class", "onsen_navigator-pager transition right");
					},

					isEmpty: function() {
						return navigatorItems.length < 1;
					},


					attachMethods: function() {
						scope.ons.navigator.pushPage = function(page, options) {
							console.log('push ', page);
							$http({
								url: page,
								method: "GET"
							}).success(function(data, status, headers, config) {
								var page = angular.element('<div></div>');
								page.addClass('onsen_navigator-pager');								
								var blackMask = angular.element('<div></div>');
								blackMask.addClass('onsen_navigator-black-mask');
								page.append(blackMask);

								var templateHTML = angular.element(data);
								page.append(templateHTML);
								var pager = $compile(page)(scope);
								container.append(pager);

								var navigatorItem = {
									page: pager,
									options: options
								};

								if (!this.isEmpty()) {
									var previousNavigatorItem = navigatorItems[navigatorItems.length - 1];
									var previousPage = previousNavigatorItem.page;
									this.animatePageIn(pager, previousPage);
									if (options.title) {
										this.animateTitleIn(navigatorItem, previousNavigatorItem);
									}
									this.animateBackLabelIn(navigatorItem, previousNavigatorItem);
									this.showBackButton(navigatorItem, previousNavigatorItem);
									this.animateRightButtonIn(navigatorItem, previousNavigatorItem);
								} else {
									// var leftButtonElement = angular.element('<div></div>');
									// leftButtonElement.addClass('topcoat-navigation-bar__item left quarter');
									// if (options.leftButtonIcon) {
									// 	leftButtonElement.addClass(options.leftButtonIcon);
									// }
									// toolbar.append(leftButtonElement);
									// navigatorItem.leftButtonElement = leftButtonElement;

									var titleElement = angular.element('<div></div>');
									titleElement.addClass('topcoat-navigation-bar__item onsen_navigator-title center animate-center');
									if (options.title) {
										titleElement.text(options.title);
									}
									toolbar.append(titleElement);
									navigatorItem.titleElement = titleElement;
									this.animateRightButtonIn(navigatorItem, null);
								}								

								navigatorItems.push(navigatorItem);
							}.bind(this)).error(function(data, status, headers, config) {
								console.error('error', data, status);
							});
						}.bind(this);

						scope.ons.navigator.popPage = function() {
							console.log('pop');
							if(navigatorItems.length < 2){
								return;
							}
							var currentNavigatorItem = navigatorItems.pop();
							var previousNavigatorItem = navigatorItems[navigatorItems.length - 1];

							var currentPage = currentNavigatorItem.page;
							var previousPage = previousNavigatorItem.page;
							this.animatePageOut(currentPage, previousPage);

							this.animateTitleOut(currentNavigatorItem, previousNavigatorItem);
							this.animateBackLabelOut(previousNavigatorItem, currentNavigatorItem);														
							if(navigatorItems.length < 2){
								this.hideBackButton();
							}

							this.animateRightButtonOut(previousNavigatorItem, currentNavigatorItem);
						}.bind(this);
					}
				});

				navigator = new Navigator();
			}



			// 	scope.$watch('page', function(newPage) {
			// 		if (newPage) {	
			// 			prepareAnimation();					
			// 			var newNavigationItem = {
			// 				title: scope.title,
			// 				source: newPage
			// 			}
			// 			scope.navigationItem = newNavigationItem;

			// 			childSources.push(newNavigationItem);
			// 			evaluateCanGoBack();
			// 		}
			// 	});

			// 	function prepareAnimation(){
			// 		if(isFirstRun){
			// 			scope.animation = null;
			// 			isFirstRun = false;
			// 		}else{
			// 			if(isBack){
			// 				scope.animation = {
			// 					enter: 'slide-right-enter',
			// 					leave: 'slide-right-leave'
			// 				};							
			// 				isBack = false;
			// 			}else{
			// 				scope.animation = {
			// 					enter: 'slide-left-enter',
			// 					leave: 'slide-left-leave'
			// 				};
			// 			}
			// 		}
			// 	}

			// 	function evaluateLeftButtonIcon() {
			// 		if (scope.canGoBack) {
			// 			scope.leftButtonIcon = "fa fa-2x fa-angle-left";
			// 		} else {
			// 			scope.leftButtonIcon = scope.initialLeftButtonIcon;
			// 		}
			// 	}


			// 	scope.leftButtonClicked = function() {
			// 		if (canPopPage()) {
			// 			scope.ons.navigator.popPage();
			// 		} else {
			// 			scope.onLeftButtonClick();
			// 		}

			// 	}

			// 	scope.rightButtonClicked = function() {
			// 		scope.onRightButtonClick();
			// 	}

			// 	function canPopPage() {
			// 		return childSources.length > 1;
			// 	}

			// 	scope.ons.navigator.popPage = function() {
			// 		if (childSources.length < 2) {
			// 			return;
			// 		}

			// 		isBack = true;
			// 		childSources.pop();
			// 		var previousNavigationItem = childSources.pop();
			// 		scope.title = previousNavigationItem.title;
			// 		scope.page = previousNavigationItem.source;
			// 	}

			// 	scope.ons.navigator.pushPage = function(page, options) {
			// 		scope.options = options;
			// 		scope.page = page;
			// 	};

			// 	scope.ons.navigator.resetToPage = function(page, options){
			// 		childSources = [];
			// 		scope.ons.navigator.pushPage(page, options);
			// 	};

			// 	scope.ons.navigator.setToolbarVisibility = function(shouldShow){
			// 		scope.hideToolbar = !shouldShow;
			// 	};

			// 	//TODO: this hack is for monaca-screen scope.
			// 	// since we are creating isolate scope, calling prensentPage() from child scope
			// 	// doesn't propagate to monaca-screen scope.
			// 	// -> find a way to not use callParent().

			// 	// since our directive use scope:{...} it will not inherite prototypically. -> that why we need to use callParent();
			// 	// https://github.com/angular/angular.js/wiki/Understanding-Scopes
			// 	scope.ons.screen = scope.ons.screen || {};
			// 	scope.ons.screen.presentPage = function(page) {
			// 		callParent(scope, 'ons.screen.presentPage', page);
			// 	};

			// 	scope.ons.screen.dismissPage = function() {
			// 		callParent(scope, 'ons.screen.dismissPage');
			// 	};

			// 	scope.ons.slidingMenu = scope.ons.slidingMenu || {};
			// 	scope.ons.slidingMenu.openMenu = function() {
			// 		callParent(scope, 'ons.slidingMenu.openMenu');
			// 	}

			// 	scope.ons.slidingMenu.closeMenu = function() {
			// 		callParent(scope, 'ons.slidingMenu.closeMenu');
			// 	}

			// 	scope.ons.slidingMenu.toggleMenu = function() {
			// 		callParent(scope, 'ons.slidingMenu.toggleMenu');
			// 	}

			// 	scope.ons.tabbar = scope.ons.tabbar || {};
			// 	scope.ons.tabbar.setTabbarVisibility = function(visibility){
			// 		callParent(scope, 'ons.tabbar.setTabbarVisibility', visibility);
			// 	}

			// 	// TODO: support params overloading.
			// 	// http://ejohn.org/apps/learn/#89 ?

			// 	function callParent(scope, functionName, param) {
			// 		if (!scope.$parent) {
			// 			return;
			// 		}

			// 		var parentFunction = stringToFunction(scope.$parent, functionName);
			// 		if (parentFunction) {
			// 			parentFunction.call(scope, param);
			// 		} else {
			// 			callParent(scope.$parent, functionName, param);
			// 		}					

			// 	}

			// 	function stringToFunction(root, str) {
			// 		var arr = str.split(".");

			// 		var fn = root;
			// 		for (var i = 0, len = arr.length; i < len; i++) {
			// 			fn = fn[arr[i]];
			// 		}

			// 		if (typeof fn !== "function") {
			// 			return false;
			// 		}

			// 		return fn;
			// 	};

			// 	function evaluateCanGoBack() {
			// 		if (childSources.length < 2) {
			// 			scope.canGoBack = false;
			// 		} else {
			// 			scope.canGoBack = true;
			// 		}
			// 		evaluateLeftButtonIcon();
			// 	}
			// }
		}
	});
})();