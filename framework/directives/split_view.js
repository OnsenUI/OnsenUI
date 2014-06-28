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

  module.directive('onsSplitView', function($compile, SlidingMenu, $onsen) {

    var ON_PAGE_READY = 'onPageReady';

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

        var SplitView = Class.extend({

          init: function(element) {
            element.addClass('onsen-sliding-menu');

            this._element = element;
            this._abovePage = angular.element(element[0].querySelector('.onsen-split-view__main'));
            this._behindPage = angular.element(element[0].querySelector('.onsen-split-view__secondary'));

            this._previousX = 0;
            this._max = this._abovePage[0].clientWidth * MAIN_PAGE_RATIO;
            this._currentX = 0;
            this._startX = 0;
            this._mode = SPLIT_MODE;
            this._doorLock = new DoorLock();

            this._hammertime = new Hammer(this._element[0]);
            this._boundHammerEvent = this._handleEvent.bind(this);

            scope.$watch('swipable', this._onSwipableChanged.bind(this));

            window.addEventListener('orientationchange', this._onOrientationChange.bind(this));
            window.addEventListener('resize', this._onResize.bind(this));

            this._animator = new SlidingMenu.SlidingMenuAnimator();

            if (scope.mainPage) {
              this.setMainPage(scope.mainPage);
            }

            if (scope.secondaryPage) {
              this.setSecondaryPage(scope.secondaryPage);
            }

            var unlock = this._doorLock.lock();
            setTimeout(function() {
              this._considerChangingCollapse();
              unlock();
            }.bind(this), 1000 / 60);
          },

          /**
           * @param {String} templateHTML
           */
          _appendSecondPage: function(templateHTML) {
            var pageScope = scope.$parent.$new();
            var pageContent = $compile(templateHTML)(pageScope);

            this._behindPage.append(pageContent);

            if (this._currentBehindPageElement) {
              this._currentBehindPageElement.remove();
              this._currentBehindPageScope.$destroy();
            }

            this._currentBehindPageElement = pageContent;
            this._currentBehindPageScope = pageScope;
          },

          /**
           * @param {String} templateHTML
           */
          _appendMainPage: function(templateHTML) {
            var pageScope = scope.$parent.$new();
            var pageContent = $compile(templateHTML)(pageScope);
            pageContent.css({opacity: 0});

            this._abovePage.append(pageContent);

            // prevent black flash
            setTimeout(function() {
              pageContent.css({opacity: 1});

              if (this._currentPage) {
                this._currentPage.remove();
                this._currentPageScope.$destroy();
              }

              this._currentPage = pageContent;
              this._currentPageScope = pageScope;
            }.bind(this), 0);
          },

          /**
           * @param {String} page
           */
          setSecondaryPage : function(page) {
            if (page) {
              $onsen.getPageHTMLAsync(page).then(function(html) {
                this._appendSecondPage(angular.element(html.trim()));
              }.bind(this), function() {
                throw new Error('Page is not found: ' + page);
              });
            } else {
              throw new Error('cannot set undefined page');
            }
          },

          /**
           * @param {String} page
           */
          setMainPage : function(page) {
            if (page) {
              $onsen.getPageHTMLAsync(page).then(function(html) {
                this._appendMainPage(angular.element(html.trim()));
              }.bind(this), function() {
                throw new Error('Page is not found: ' + page);
              });
            } else {
              throw new Error('cannot set undefined page');
            }
          },

          _onOrientationChange: function() {
            this._considerChangingCollapse();
          },

          _onResize: function() {
            this._considerChangingCollapse();
            this._max = this._abovePage[0].clientWidth * MAIN_PAGE_RATIO;
          },

          _considerChangingCollapse: function() {
            if (this._shouldCollapse()) {
              this._activateCollapseMode();
            } else {
              this._activateSplitMode();
            }
          },

          _shouldCollapse: function() {
            var orientation = window.orientation;

            if (orientation === undefined) {
              orientation = window.innerWidth > window.innerHeight ? 90 : 0;
            }

            switch (scope.collapse) {
              case undefined:
              case 'none':
                return false;

              case 'portrait':
                return orientation === 180 || orientation === 0;
                break;

              case 'landscape':
                return orientation == 90 || orientation == -90;
                break;

              default:
                // by width
                if (scope.collapse === undefined) {
                  return false;
                } 

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

                return isNumber(widthToken) && window.innerWidth < widthToken;
                break;
            }
          },

          _setSize: function() {
            if (!scope.mainPageWidth) {
              scope.mainPageWidth = '70';
            }

            var behindSize = 100 - scope.mainPageWidth.replace('%', '');
            this._behindPage.css({
              width: behindSize + '%',
              opacity: 1
            });

            this._abovePage.css({
              width: scope.mainPageWidth + '%'
            });

            this._translateAboveOnly(this._behindPage[0].clientWidth);
          },

          _activateCollapseMode: function() {
            if (this._mode !== COLLAPSE_MODE) {
              this._behindPage.removeAttr('style');
              this._abovePage.removeAttr('style');

              this._mode = COLLAPSE_MODE;

              this._onSwipableChanged(scope.swipable);
              this._translate(0);

              this._animator.activate(this._element);

              if (Modernizr.boxshadow) {
                this._abovePage.addClass('onsen-split-view__shadow');
              }
            }
          },

          _activateSplitMode: function() {
            if (this._mode !== SPLIT_MODE) {
              this._animator.deactivate(this._element);

              this._behindPage.removeAttr('style');
              this._abovePage.removeAttr('style');

              this._setSize();
              this._deactivateHammer();
              this._mode = SPLIT_MODE;

              if (Modernizr.boxshadow) {
                this._abovePage.removeClass('onsen-split-view__shadow');
              }
            } else {
              this._setSize();
            }
          },

          _activateHammer: function() {
            this._hammertime.on('dragleft dragright swipeleft swiperight release', this._boundHammerEvent);
          },

          _deactivateHammer: function() {
            this._hammertime.off('dragleft dragright swipeleft swiperight release', this._boundHammerEvent);
          },

          _onSwipableChanged: function(swipable) {
            swipable = swipable === '' || swipable === undefined || swipable == 'true';

            if (swipable) {
              this._activateHammer();
            } else {
              this._deactivateHammer();
            }
          },

          _handleEvent: function(event) {
            switch (event.type) {

              case 'dragleft':
              case 'dragright':
                event.gesture.preventDefault();
                var deltaX = event.gesture.deltaX;

                this._currentX = this._startX + deltaX;
                if (this._currentX >= 0) {
                  this._translate(this._currentX);
                }
                break;

              case 'swipeleft':
                event.gesture.preventDefault();
                this.close();
                break;

              case 'swiperight':
                event.gesture.preventDefault();
                this.open();
                break;

              case 'release':
                if (this._currentX > this._max / 2) {
                  this.open();
                } else {
                  this.close();
                }
                break;
            }
          },

          _onTransitionEnd: function() {
            scope.$root.$broadcast(ON_PAGE_READY); //make sure children can do something before the parent.
          },

          close: function() {
            if (this._mode === SPLIT_MODE) {
              return;
            } else if (this._mode === COLLAPSE_MODE) {
              this._startX = 0;

              if (this._currentX !== 0) {
                var self = this;
                this._doorLock.waitUnlock(function() {
                  var unlock = self._doorLock.lock();
                  self._currentX = 0;

                  self._animator.close(
                    self._abovePage,
                    self._behindPage,
                    {max: self._max},
                    function() {
                      unlock();
                      self._onTransitionEnd();
                    }
                  );
                });
              }
            }
          },

          open: function() {
            if (this._mode === SPLIT_MODE) {
              return;
            } else if (this._mode === COLLAPSE_MODE) {
              this._startX = this._max;

              if (this._currentX != this._max) {
                var self = this;
                this._doorLock.waitUnlock(function() {
                  var unlock = self._doorLock.lock();
                  self._currentX = self._max;

                  self._animator.open(
                    self._abovePage, 
                    self._behindPage, 
                    {max: self._max},
                    function() {
                      unlock();
                      self._onTransitionEnd();
                    }
                  );
                });
              }
            }
          },

          toggle: function() {
            if (this._startX === 0) {
              this.open();
            } else {
              this.close();
            }
          },

          _translate: function(x) {
            if (this._mode === COLLAPSE_MODE) {
              this._currentX = x;

              var options = {
                x: x,
                max: this._max
              };

              this._animator.translate(this._abovePage, this._behindPage, options);
            }
          },

          _translateAboveOnly: function(x) {
            var aboveTransform = 'translate2d(' + x + 'px, 0)';
            var behindTransform = 'none';

            this._abovePage.css('left', x + 'px');
            this._currentX = x;
          }
        });

        function isNumber(n) {
          return !isNaN(parseFloat(n)) && isFinite(n);
        }

        var splitView = new SplitView(element);
        $onsen.declareVarAttribute(attrs, splitView);

        element.data('ons-split-view', splitView);
        $onsen.aliasStack.register('ons.splitView', splitView);

        scope.$on('$destroy', function() {
          element.data('ons-split-view', undefined);
          $onsen.aliasStack.unregister('ons.splitView', splitView);
        });
      }
    };
  });
})();
