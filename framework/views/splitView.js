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

  module.factory('SplitView', function($compile, RevealSlidingMenuAnimator, $onsen) {
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

        if ($onsen.isIOS()) {
          window.addEventListener('orientationchange', this._onResize.bind(this));
        } else {
          window.addEventListener('resize', this._onResize.bind(this));
        }

        this._animator = new RevealSlidingMenuAnimator();

        this._element.css('display', 'none');

        if (scope.mainPage) {
          this.setMainPage(scope.mainPage);
        }

        if (scope.secondaryPage) {
          this.setSecondaryPage(scope.secondaryPage);
        }

        var unlock = this._doorLock.lock();

        this._considerChangingCollapse();
        this._setSize();

        setTimeout(function() {
          this._element.css('display', 'block');
          unlock();
        }.bind(this), 1000 / 60 * 2);

        scope.$on('$destroy', this._destroy.bind(this));
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

      _onResize: function() {
        var lastMode = this._mode;
        this._considerChangingCollapse();

        if (lastMode === COLLAPSE_MODE && this._mode === COLLAPSE_MODE) {
          this._animator.onResized({
            isOpened: this._currentX > 0,
            width: '90%'
          });
        }

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
        if (this._mode === SPLIT_MODE) {
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

          this._abovePage.css('left', behindSize + '%');
          this._currentX = this._behindPage[0].clientWidth;
        }
      },

      _activateCollapseMode: function() {
        if (this._mode !== COLLAPSE_MODE) {
          this._behindPage.attr('style', '');
          this._abovePage.attr('style', '');

          this._mode = COLLAPSE_MODE;

          this._onSwipableChanged(this._scope.swipable);

          this._animator.setup(
            this._element,
            this._abovePage,
            this._behindPage,
            {isRight: false, width: '90%'}
          );
          this._currentX = this._startX = 0;
        }
      },

      _activateSplitMode: function() {
        this._animator.destroy();

        this._behindPage.attr('style', '');
        this._abovePage.attr('style', '');

        this._mode = SPLIT_MODE;
        this._setSize();
        this._deactivateHammer();
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
            event.preventDefault();
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

      close: function(callback) {
        callback = callback || function() {};

        if (this._mode === SPLIT_MODE) {
          callback();
          return;
        } else if (this._mode === COLLAPSE_MODE) {
          this._startX = 0;

          if (this._currentX !== 0) {
            var self = this;
            this._doorLock.waitUnlock(function() {
              var unlock = self._doorLock.lock();
              self._currentX = 0;

              self._animator.closeMenu(function() {
                unlock();
                self._onTransitionEnd();
                callback();
              });
            });
          }
        }
      },

      open: function(callback) {
        callback = callback || function() {};

        if (this._mode === SPLIT_MODE) {
          callback();
          return;
        } else if (this._mode === COLLAPSE_MODE) {
          this._startX = this._max;

          if (this._currentX != this._max) {
            var self = this;
            this._doorLock.waitUnlock(function() {
              var unlock = self._doorLock.lock();
              self._currentX = self._max;

              self._animator.openMenu(function() {
                unlock();
                self._onTransitionEnd();
                callback();
              });
            });
          }
        }
      },

      toggle: function(callback) {
        if (this._startX === 0) {
          this.open(callback);
        } else {
          this.close(callback);
        }
      },

      _translate: function(x) {
        if (this._mode === COLLAPSE_MODE) {
          this._currentX = x;

          var options = {
            distance: x,
            maxDistance: this._max
          };

          this._animator.translateMenu(options);
        }
      },

      _destroy: function() {
        this.emit('destroy', {splitView: this});

        this._element = null;
        this._scope = null;
      }
    });

    function isNumber(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }

    MicroEvent.mixin(SplitView);

    return SplitView;
  });
})();
