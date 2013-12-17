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

	directives.directive('onsSlidingMenu', function(ONSEN_CONSTANTS) {
		return {
			restrict: 'E',
			replace: false,
			transclude: false,
			scope: {
				behindPage: '@',
				abovePage: '@'
			},
			templateUrl: ONSEN_CONSTANTS.DIRECTIVE_TEMPLATE_URL + '/sliding_menu.tpl',
			link: function(scope, element, attrs) {				

				var Swiper = Class.extend({
					init: function(element){
						console.log('init');
						this.abovePage = element[0].querySelector('.above');
						this.$abovePage = angular.element(this.abovePage);
						this.previousX = 0;
						this.MAX = this.abovePage.clientWidth * 0.7;
						this.startX = 0;
						this.status = 

						this.bindEvents();
					},

					bindEvents: function(){
						// touch
						this.abovePage.addEventListener('touchstart', this.onTouchStart.bind(this));
						this.abovePage.addEventListener('touchmove', this.onTouchMove.bind(this));						
						this.abovePage.addEventListener('touchend', this.onTouchEnd.bind(this));

						// mouse
						this.abovePage.addEventListener('mousedown', this.onMouseDown.bind(this));						
						this.abovePage.addEventListener('mouseup', this.onMouseUp.bind(this));
						this.abovePage.addEventListener('mouseleave', this.onMouseLeave.bind(this));
						this.$abovePage.bind('webkitTransitionEnd', this.onTransitionEnd.bind(this));        
					},

					onTransitionEnd: function(){
						this.$abovePage.removeClass('transition');
					},

					close: function(){
						this.$abovePage.addClass('transition');
						this.translate(0);
						this.startX = 0;
						console.log('close');
					},

					open: function(){
						console.log('close');
						this.$abovePage.addClass('transition');
						this.translate(this.MAX);
						this.startX = this.MAX;
					},

					translate: function(x){
						this.abovePage.style.webkitTransform = 'translate3d(' + x + 'px, 0, 0)';
						this.currentX = x;
					},

					onMouseMove: function(event){
						var x = event.clientX;
						this.onMove(x);
					},

					onTouchMove: function(event){
						var touches = event.changedTouches;
						var currentTouch = touches[0];
						var x = currentTouch.pageX;
						this.onMove(x);
					},

					onMove: function(x){						
						var distant = x - this.previousX;
						var toBeTranslate = this.startX + distant;
						if(toBeTranslate < 0){
							return;
						}
						console.log(this.startX, distant);
						this.translate(toBeTranslate);
					},

					onMouseDown: function(event){
						var x = event.clientX;
						this.boundMouseMove = this.onMouseMove.bind(this);
						this.abovePage.addEventListener('mousemove', this.boundMouseMove);
						this.setStart(x);
					},

					onTouchStart: function(event){
						var touches = event.changedTouches;
						var x = touches[0].pageX;
						this.setStart(x);
					},

					setStart: function(x){						
						this.previousX = x;
					},

					onMouseUp: function(event){
						console.log('mouse up');
						this.onEnd();
						this.abovePage.removeEventListener('mousemove', this.boundMouseMove);
					},

					onMouseLeave: function(){
						this.onMouseUp();
					},

					onTouchEnd: function(event){
						this.onEnd();
					},

					onEnd: function(){
						if( this.currentX > this.MAX/2 ){
							this.open();
						}else{
							this.close();
						}
					}
				});

				var swiper = new Swiper(element);

				scope.pages = {
					behind: scope.behindPage,
					above: scope.abovePage
				};
				scope.ons = scope.ons || {};
				scope.ons.slidingMenu = scope.ons.slidingMenu || {};

				scope.status = "close";

				scope.ons.slidingMenu.openMenu = function() {
					scope.status = 'open';
				}

				scope.ons.slidingMenu.closeMenu = function() {
					scope.status = 'close';
				}

				scope.ons.slidingMenu.toggleMenu = function() {
					var newStatus = scope.status == 'close' ?
						'open' : 'close';
						
					scope.status = newStatus;
				}

				scope.ons.slidingMenu.setAbovePage = function(page){					
					if(page){
						scope.pages.above = page;
					}else{
						throw new Error('cannot set undefined page');
					}
				}

				scope.ons.slidingMenu.setBehindPage = function(page){					
					if(page){
						scope.pages.behind = page;
					}else{
						throw new Error('cannot set undefined page');
					}
				}

				scope.ons.screen = scope.ons.screen || {};
				scope.ons.screen.presentPage = function(page) {
					callParent(scope, 'ons.screen.presentPage', page);
				}

				scope.ons.screen.dismissPage = function() {
					callParent(scope, 'ons.screen.dismissPage');
				}

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
		};
	});
})();