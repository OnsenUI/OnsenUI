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

  module.factory('SplitView', function($compile, DefaultSlidingMenuAnimator, $onsen) {
    var SPLIT_MODE = 0;
    var COLLAPSE_MODE = 1;
    var MAIN_PAGE_RATIO = 0.9;

    var ON_PAGE_READY = 'onPageReady';

    var SplitView = Class.extend({

      init: function(scope, element) {
        element.addClass('onsen-sliding-menu');

        this._element = element;
        this._scope = scope;

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

        this._animator = new DefaultSlidingMenuAnimator();

        this._element.css('display', 'none');

        if (scope.mainPage) {
          this.setMainPage(scope.mainPage);
        }

        if (scope.secondaryPage) {
          this.setSecondaryPage(scope.secondaryPage);
        }

        var unlock = this._doorLock.lock();

        this._considerChangingCollapse();

        setTimeout(function() {
          this._element.css('display', 'block');
          unlock();
        }.bind(this), 1000 / 60 * 2);
      },

      /**
       * @param {String} templateHTML
       */
      _appendSecondPage: function(templateHTML) {
        var pageScope = this._scope.$parent.$new();
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
        var pageScope = this._scope.$parent.$new();
        var pageContent = $compile(templateHTML)(pageScope);

        this._abovePage.append(pageContent);

        if (this._currentPage) {
          this._currentPage.remove();
          this._currentPageScope.$destroy();
        }

        this._currentPage = pageContent;
        this._currentPageScope = pageScope;
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

        switch (this._scope.collapse) {
          case undefined:
          case 'none':
            return false;

          case 'portrait':
            return orientation === 180 || orientation === 0;

          case 'landscape':
            return orientation == 90 || orientation == -90;

          default:
            // by width
            if (this._scope.collapse === undefined) {
              return false;
            } 

            var widthToken;
            if (this._scope.collapse.indexOf('width') >= 0) {
              var tokens = this._scope.collapse.split(' ');
              widthToken = tokens[tokens.length - 1];
            } else {
              widthToken = this._scope.collapse;
            }

            if (widthToken.indexOf('px') > 0) {
              widthToken = widthToken.substr(0, widthToken.length - 2);
            }

            return isNumber(widthToken) && window.innerWidth < widthToken;
        }
      },

      _setSize: function() {
        if (!this._scope.mainPageWidth) {
          this._scope.mainPageWidth = '70';
        }

        var behindSize = 100 - this._scope.mainPageWidth.replace('%', '');
        this._behindPage.css({
          width: behindSize + '%',
          opacity: 1
        });

        this._abovePage.css({
          width: this._scope.mainPageWidth + '%'
        });

        this._translateAboveOnly(this._behindPage[0].clientWidth);
      },

      _activateCollapseMode: function() {
        if (this._mode !== COLLAPSE_MODE) {
          this._behindPage.removeAttr('style');
          this._abovePage.removeAttr('style');

          this._mode = COLLAPSE_MODE;

          this._onSwipableChanged(this._scope.swipable);

          this._animator.onAttached(
            this._element, this._abovePage, this._behindPage
          );

          this._translate(0);
        }
      },

      _activateSplitMode: function() {
        if (this._mode !== SPLIT_MODE) {
          this._animator.onDetached(
            this._element,
            this._abovePage,
            this._behindPage
          );

          this._behindPage.removeAttr('style');
          this._abovePage.removeAttr('style');

          this._setSize();
          this._deactivateHammer();
          this._mode = SPLIT_MODE;
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
        if (this._doorLock.isLocked()) {
          return;
        }

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
        this._scope.$root.$broadcast(ON_PAGE_READY); //make sure children can do something before the parent.
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

    return SplitView;

  });

})();
