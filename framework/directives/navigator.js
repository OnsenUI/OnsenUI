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
				var container = angular.element(element[0].querySelector('.navigator-content'))
				var toolbar = angular.element(element[0].querySelector('.topcoat-navigation-bar'));
				var leftSection = angular.element(toolbar[0].querySelector('#left-section'));
				var leftButtonContainer = angular.element(toolbar[0].querySelector('.onsen_navigator__left-button-container'));				
				var leftArrow = angular.element(leftButtonContainer[0].querySelector('i'));				

				var rightSection = angular.element(toolbar[0].querySelector('.onsen_navigator__right-button'));

				var leftButtonClickFn = $parse(scope.onLeftButtonClick);

				var Navigator = Class.extend({
					init: function() {
						this.attachMethods();						
						leftSection.bind('click', this.onLeftButtonClicked.bind(this));
						rightSection.bind('click', this.onRightButtonClicked.bind(this));
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
						inBackLabel.bind('click', this.onLeftButtonClicked.bind(this));
						inNavigatorItem.backLabel = inBackLabel;
						if(inNavigatorItem.options.leftButtonIcon){
							// no back label if user specify icon
							inBackLabel[0].style.display = 'none';
						}
						toolbar.prepend(inBackLabel);
						inBackLabel.text(title);

						toolbar[0].offsetWidth;	
						inBackLabel.removeClass('right');										
						inBackLabel.addClass('transition center topcoat-icon-button--quiet');

						var outLabel = outNavigatorItem.backLabel;
						if(outLabel){
							outLabel.bind('webkitTransitionEnd', function transitionEnded(e) {
								console.log('removing ', outLabel);
								outLabel.remove();
								outLabel.unbind(transitionEnded);
							});
							outLabel.removeClass('center');
							outLabel.addClass('left');	
						}
					},

					animateBackLabelOut: function(inNavigatorItem, outNavigatorItem){
						var outLabel = outNavigatorItem.backLabel;
						var inLabel = inNavigatorItem.backLabel;						
						toolbar.prepend(inLabel);

						if(outNavigatorItem.options.leftButtonIcon){
							// no back label if user specify icon
							outLabel.remove();
						}else{
							outLabel.bind('webkitTransitionEnd', function transitionEnded(e) {
								console.log('remove');
								outLabel.remove();
								outLabel.unbind(transitionEnded);
							});

							toolbar[0].offsetWidth;
							outLabel.removeClass('transition center');						
							outLabel.addClass('transition right');	
						}
						

						if(inLabel){
							inLabel.removeClass('left');
							inLabel.addClass('center');
							inLabel.bind('click', this.onLeftButtonClicked.bind(this));
						}
					},

					getCurrentNavigatorItem: function(){
						return navigatorItems[navigatorItems.length - 1];
					},

					onLeftButtonClicked: function(){
						console.log('back clicked');
						var onLeftButtonClick = this.getCurrentNavigatorItem().options.onLeftButtonClick;
						if(onLeftButtonClick){
							var onLeftButtonClickFn = $parse(onLeftButtonClick);
							if(onLeftButtonClick.indexOf('ons.navigator.') >= 0 ){								
								onLeftButtonClickFn(scope);
							}else{
								onLeftButtonClickFn(scope.$parent);
							}
						}else{
							if (this.canPopPage()) {
								scope.ons.navigator.popPage();
							}
						}						 
					},

					onRightButtonClicked: function(){
						var onRightButtonClick = this.getCurrentNavigatorItem().options.onRightButtonClick;
						if(onRightButtonClick){
							var onRightButtonClickFunction = $parse(onRightButtonClick);
							if(onRightButtonClick.indexOf('ons.navigator.') >= 0 ){								
								onRightButtonClickFunction(scope);
							}else{
								onRightButtonClickFunction(scope.$parent);
							}
						}
					},

					animateTitleIn: function(inNavigatorItem, outNavigatorItem) {
						var inTitle = inNavigatorItem.options.title || '';
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
						if(inNavigatorItem.rightButtonIconElement || inNavigatorItem.options.rightButtonIcon){
							var rightButtonIconElement;
							if(inNavigatorItem.rightButtonIconElement){
								rightButtonIconElement = inNavigatorItem.rightButtonIconElement;
							}else{								
								rightButtonIconElement = angular.element('<i></i>');
								rightButtonIconElement.addClass(inNavigatorItem.options.rightButtonIcon + ' onsen_navigation-bar-height onsen_fade');
								rightSection.append(rightButtonIconElement);
								inNavigatorItem.rightButtonIconElement = rightButtonIconElement;
							}
							
							rightSection[0].offsetWidth;
							rightButtonIconElement.removeClass('hide');
							rightButtonIconElement.addClass('transition show');								
						}

						if(outNavigatorItem && outNavigatorItem.rightButtonIconElement){
							var rightButton = outNavigatorItem.rightButtonIconElement;
							rightButton.removeClass('show');
							rightButton.addClass('transition hide');
							rightButton.bind('webkitTransitionEnd', function transitionEnded(e) {
								rightButton.remove();
								rightButton.unbind(transitionEnded);
							});
						}
						
					},

					animateRightButtonOut: function(inNavigatorItem, outNavigatorItem){
						if(outNavigatorItem.rightButtonIconElement){
							var outRightButton = outNavigatorItem.rightButtonIconElement;
							toolbar[0].offsetWidth;
							outRightButton.removeClass('show');
							outRightButton.addClass('transition hide');
							outRightButton.bind('webkitTransitionEnd', function transitionEnded(e) {
								outRightButton.remove();
								outRightButton.unbind(transitionEnded);
							});
						}
						if(inNavigatorItem.rightButtonIconElement){
							var rightButton = inNavigatorItem.rightButtonIconElement;
							rightSection.append(rightButton);
							rightSection[0].offsetWidth;
							rightButton.removeClass('hide');
							rightButton.addClass('transition show');
						}
					},

					setLeftButton: function(navigatorItem){
						var leftButtonIcon = navigatorItem.options.leftButtonIcon;
						if(leftButtonIcon){
							this.setBackButtonIcon(leftButtonIcon);
							this.showBackButton();
						}else{
							// no icon
							if(this.canPopPage()){
								this.setBackButtonIconAsLeftArrow();
							}else{
								// no icon and is root page
								this.hideBackButton();
								this.showBackButton();
							}
						}
					},

					setBackButtonIconAsLeftArrow: function(){
						leftArrow.attr('class', 'fa fa-angle-left fa-2x onsen_navigation-bar-height');
					},

					setBackButtonIcon: function(iconClass){
						leftArrow.attr('class', iconClass + ' onsen_navigation-bar-height');
					},

					showBackButton: function(inNavigatorItem, outNavigatorItem) {						
						toolbar[0].offsetWidth;
						leftButtonContainer.removeClass('hide');			
						leftButtonContainer.addClass('transition show');						
					},

					hideBackButton: function(){
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

					canPopPage: function(){
						return navigatorItems.length > 1;
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
									options: options || {}
								};

								if (!this.isEmpty()) {
									var previousNavigatorItem = navigatorItems[navigatorItems.length - 1];
									var previousPage = previousNavigatorItem.page;
									this.animatePageIn(pager, previousPage);									
									this.animateTitleIn(navigatorItem, previousNavigatorItem);
									
									this.animateBackLabelIn(navigatorItem, previousNavigatorItem);
									this.setBackButtonIconAsLeftArrow();
									this.showBackButton(navigatorItem, previousNavigatorItem);
									this.animateRightButtonIn(navigatorItem, previousNavigatorItem);									
								} else {								
									// root page
									var titleElement = angular.element('<div></div>');
									titleElement.addClass('topcoat-navigation-bar__item onsen_navigator-title center animate-center');
									if (options.title) {
										titleElement.text(options.title);
									}
									toolbar.append(titleElement);
									navigatorItem.titleElement = titleElement;
									this.animateRightButtonIn(navigatorItem, null);

									// // backButton icon
									// if(options.leftButtonIcon){
									// 	this.setBackButtonIcon(options.leftButtonIcon);
									// 	this.showBackButton();
									// }									
								}								
								navigatorItems.push(navigatorItem);
								this.setLeftButton(navigatorItem);
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
							// if(navigatorItems.length < 2){								
							// 	if(previousNavigatorItem.options.leftButtonIcon){
							// 		this.setBackButtonIcon(previousNavigatorItem.options.leftButtonIcon);
							// 		this.showBackButton();
							// 	}else{
							// 		this.hideBackButton();
							// 	}
							// }

							this.setLeftButton(previousNavigatorItem);

							this.animateRightButtonOut(previousNavigatorItem, currentNavigatorItem);
						}.bind(this);

						scope.leftButtonClicked = function(){
							this.onLeftButtonClicked();
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