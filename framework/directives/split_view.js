/*
Copyright 2013-2014 ASIAL CORPORATION

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
  var module = angular.module('onsen');

  module.directive('onsSplitView', function($http, $compile, $templateCache, SplitViewStack, $onsen) {

    var ON_PAGE_READY = "onPageReady";

    return {
      restrict: 'E',
      replace: false,
      transclude: false,
      scope: {
        secondaryPage: '@',
        mainPage: '@',
        collapse: '@',
        swipable: '@',
        mainPageWidth: '@'
      },
      templateUrl: $onsen.DIRECTIVE_TEMPLATE_URL + '/split_view.tpl',
      link: function(scope, element, attrs) {
        var SPLIT_MODE = 0;
        var COLLAPSE_MODE = 1;
        var MAIN_PAGE_RATIO = 0.9;

        var TRANSITION_END = "webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd";
        var BROWSER_TRANSFORMS = [
          "webkitTransform",
          "mozTransform",
          "msTransform",
          "oTransform",
          "transform"
        ];

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
            this.MAX = this.abovePage.clientWidth * MAIN_PAGE_RATIO;
            this.currentX = 0;
            this.startX = 0;
            this.mode = SPLIT_MODE;

            this.hammertime = new Hammer(this.el);
            this.boundHammerEvent = this.handleEvent.bind(this);
            this.bindEvents();

            scope.$watch('swipable', this.onSwipableChanged.bind(this));

            window.addEventListener("orientationchange", this.onOrientationChange.bind(this));
            window.addEventListener('resize', this.onResize.bind(this));

            this.attachMethods();

            if (scope.mainPage) {
              scope.setMainPage(scope.mainPage);
            }

            if (scope.secondaryPage) {
              scope.setSecondaryPage(scope.secondaryPage);
            }

            window.setTimeout(function() {
              this.considerChangingCollapse();
            }.bind(this), 100);
          },

          appendSecondPage: function(templateHTML) {
            var page = angular.element('<div></div>');
            page.addClass('page');
            var pageScope = scope.$parent.$new();
            var pageContent = $compile(templateHTML)(pageScope);
            page.append(pageContent);
            this.$behindPage.append(page);


            if (this.currentBehindPageElement) {
              this.currentBehindPageElement.remove();
              this.currentBehindPageScope.$destroy();
            }

            this.currentBehindPageElement = page;
            this.currentBehindPageScope = pageScope;
          },

          appendMainPage: function(templateHTML) {
            var page = angular.element('<div></div>');
            page.addClass('page');
            page[0].style.opacity = 0;
            var pageScope = scope.$parent.$new();
            var pageContent = $compile(templateHTML)(pageScope);
            page.append(pageContent);
            this.$abovePage.append(page);

            // prevent black flash
            setTimeout(function() {
              page[0].style.opacity = 1;
              if (this.currentPage) {
                this.currentPage.remove();
                this.currentPageScope.$destroy();
              }
              this.currentPage = page;
              this.currentPageScope = pageScope;
            }.bind(this), 0);
          },

          attachMethods: function() {
            scope.setSecondaryPage = function(page) {
              if (page) {
                var templateHTML = $templateCache.get(page);
                if (templateHTML) {
                  this.appendSecondPage(templateHTML);
                } else {
                  $http({
                      url: page,
                      method: "GET",
                      cache: $onsen.predefinedPageCache
                    }).error(function(e) {
                      console.error(e);
                    }).success(function(data, status, headers, config) {
                    templateHTML = angular.element(data.trim());
                    this.appendSecondPage(templateHTML);
                  }.bind(this));
                }
              } else {
                throw new Error('cannot set undefined page');
              }
            }.bind(this);

            scope.setMainPage = function(page) {
              if (page) {
                var templateHTML = $templateCache.get(page);
                if (templateHTML) {
                  this.appendMainPage(templateHTML);
                } else {
                  $http({
                      url: page,
                      method: "GET",
                      cache: $onsen.predefinedPageCache
                    }).error(function(e) {
                      console.error(e);
                    }).success(function(data, status, headers, config) {
                    templateHTML = angular.element(data.trim());
                    this.appendMainPage(templateHTML);
                  }.bind(this));
                }
              } else {
                throw new Error('cannot set undefined page');
              }
            }.bind(this);
          },

          onOrientationChange: function() {
            this.considerChangingCollapse();
          },

          onResize: function() {
            this.considerChangingCollapse();
            this.MAX = this.abovePage.clientWidth * MAIN_PAGE_RATIO;
          },

          considerChangingCollapse: function() {
            if (this.shouldCollapse()) {
              this.activateCollapseMode();
            } else {
              this.deactivateCollapseMode();
            }
          },

          shouldCollapse: function() {
            var orientation = window.orientation;

            if (orientation === undefined) {
              orientation = window.innerWidth > window.innerHeight ? 90 : 0;
            }

            switch (scope.collapse) {
              case undefined:
              case "none":
                return false;

              case "portrait":
                if (orientation === 180 || orientation === 0) {
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
                if (scope.collapse === undefined) {
                  return false;
                } else {
                  var widthToken;
                  if (scope.collapse.indexOf('width') >= 0) {
                    var tokens = scope.collapse.split(' ');
                    widthToken = tokens[tokens.length - 1];
                  } else {
                    widthToken = scope.collapse;
                  }

                  if (widthToken.indexOf('px') > 0) {
                    widthToken = widthToken.substr(0, widthToken.length - 2);
                  }

                  if (isNumber(widthToken)) {
                    if (window.innerWidth < widthToken) {
                      return true;
                    } else {
                      return false;
                    }
                  }

                  return false;
                }

                break;
            }

          },

          setSize: function() {
            if(!scope.mainPageWidth){
              scope.mainPageWidth = "70";
            }
            var behindSize = 100 - scope.mainPageWidth.replace('%', '');
            this.behindPage.style.width = behindSize + '%';
            this.behindPage.style.opacity = 1;
            this.abovePage.style.width = scope.mainPageWidth + '%';
            var translate = this.behindPage.clientWidth;
            this.translateAboveOnly(translate);
          },

          activateCollapseMode: function() {
            this.behindPage.style.width = '100%';
            this.abovePage.style.width = '100%';
            this.mode = COLLAPSE_MODE;
            this.onSwipableChanged(scope.swipable);
            this.translate(0);

            if (Modernizr.boxshadow) {
              this.$abovePage.addClass('onsen_split-view__shadow');
            }
          },

          deactivateCollapseMode: function() {
            this.setSize();
            this.deactivateHammer();
            this.mode = SPLIT_MODE;
            if (Modernizr.boxshadow) {
              this.$abovePage.removeClass('onsen_split-view__shadow');
            }
          },

          activateHammer: function() {
            this.hammertime.on("dragleft dragright swipeleft swiperight release", this.boundHammerEvent);
          },

          deactivateHammer: function() {
            this.hammertime.off("dragleft dragright swipeleft swiperight release", this.boundHammerEvent);
          },

          bindEvents: function() {
            this.$abovePage.bind(TRANSITION_END, this.onTransitionEnd.bind(this));
          },

          onSwipableChanged: function(swipable) {
            if (swipable === "" || swipable === undefined) {
              swipable = true;
            } else {
              swipable = (swipable == "true");
            }

            if (swipable) {
              this.activateHammer();
            } else {
              this.deactivateHammer();
            }
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
            this.$abovePage.removeClass('transition');
            this.$behindPage.removeClass('transition');
            scope.$root.$broadcast(ON_PAGE_READY); //make sure children can do something before the parent.
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
            var aboveTransform = 'translate3d(' + x + 'px, 0, 0)';

            var behind = (x - this.MAX) / this.MAX * 10;
            var opacity = 1 + behind / 100;
            var behindTransform = 'translate3d(' + behind + '%, 0, 0)';

            var property;
            for (var i = 0; i < BROWSER_TRANSFORMS.length; i++) {
              property = BROWSER_TRANSFORMS[i];
              this.abovePage.style[property] = aboveTransform;
              this.behindPage.style[property] = behindTransform;
            }

            this.behindPage.style.opacity = opacity;
            this.currentX = x;
          },

          translateAboveOnly: function(x) {
            var aboveTransform = 'translate3d(' + x + 'px, 0, 0)';
            var behindTransform = 'translate3d(0, 0, 0)';

            var property;
            for (var i = 0; i < BROWSER_TRANSFORMS.length; i++) {
              property = BROWSER_TRANSFORMS[i];
              this.abovePage.style[property] = aboveTransform;
              this.behindPage.style[property] = behindTransform;
            }

            this.currentX = x;
          }
        });

        function isNumber(n) {
          return !isNaN(parseFloat(n)) && isFinite(n);
        }

        var swiper = new Swiper(element);
        var splitView = {
          open: function() {
            return swiper.open();
          }, 

          close: function() {
            return swiper.close();
          },

          setMainPage : function() {
            return swiper.setMainPage.apply(swiper, arguments);
          }, 

          setSecondaryPage: function() {
            return swiper.setSecondaryPage.apply(swiper, arguments);
          },

          toggle: function() {
            return swiper.toggle();
          }
        };
        $onsen.declareVarAttribute(attrs, splitView);

        angular.extend(scope, splitView);
        SplitViewStack.addSplitView(scope);

        scope.$on('$destroy', function(){
          SplitViewStack.removeSplitView(scope);
        });
      }
    };
  });
})();
