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

  var SlidingMenuViewModel = Class.extend({

    /**
     * @member Number
     */
    _x: 0,

    /**
     * @member Number
     */
    _maxX: undefined,

    /**
     * @param {Object} options
     * @param {Number} maxX
     */
    init: function(options) {
      this._maxX = options.maxX;

      if (!angular.isNumber(options.maxX)) {
        throw new Error('options.maxX must be number');
      }
    },

    /**
     * @param {Number} maxX
     */
    setMaxX: function(maxX) {
      this._maxX = maxX;
    },

    shouldOpen: function() {
      return this._x >= this._maxX / 2;
    },

    openOrClose: function() {
      if (this.shouldOpen()) {
        this.open();
      } else {
        this.close();
      }
    },

    close: function() {
      if (!this.isClosed()) {
        this._x = 0;
        this.emit('close', {});
      }
    },

    open: function() {
      if (!this.isOpened()) {
        this._x = this._maxX;
        this.emit('open', {});
      }
    },

    /**
     * @return {Boolean}
     */
    isClosed: function() {
      return this._x === 0;
    },

    /**
     * @return {Boolean}
     */
    isOpened: function() {
      return this._x === this._maxX;
    },

    /**
     * @return {Number}
     */
    getX: function() {
      return this._x;
    },

    /**
     * @return {Number}
     */
    getMaxX: function() {
      return this._maxX;
    },

    /**
     * @param {Number} x
     */
    translate: function(x) {
      this._x = Math.max(0, Math.min(this._maxX, x));

      var options = {
        x: this._x,
        maxX: this._maxX
      };

      this.emit('translate', options);
    },

    toggle: function() {
      if (this.isClosed()) {
        this.open();
      } else {
        this.close();
      }
    }

  });
  MicroEvent.mixin(SlidingMenuViewModel);

  var MAIN_PAGE_RATIO = 0.9;
  module.factory('SlidingMenuView', function($onsen, DefaultSlidingMenuAnimator, $compile) {

    var SlidingMenuView = Class.extend({
      _scope: undefined,
      _attrs: undefined,

      _element: undefined,
      _behindPage: undefined,
      _abovePage: undefined,

      _doorLock: undefined,

      init: function(scope, element, attrs) {
        this._scope = scope;
        this._attrs = attrs;
        this._element = element;

        this._behindPage = angular.element(element[0].querySelector('.onsen-sliding-menu__behind'));
        this._abovePage = angular.element(element[0].querySelector('.onsen-sliding-menu__above'));

        this._doorLock = new DoorLock();

        var maxX = this._abovePage[0].clientWidth * MAIN_PAGE_RATIO;
        this._logic = new SlidingMenuViewModel({maxX: maxX});
        this._logic.on('translate', this._translate.bind(this));
        this._logic.on('open', function() {
          this._open();
        }.bind(this));
        this._logic.on('close', function() {
          this._close();
        }.bind(this));

        attrs.$observe('maxSlideDistance', this._onMaxSlideDistanceChanged.bind(this));
        attrs.$observe('swipable', this._onSwipableChanged.bind(this));
        attrs.$observe('swipeTargetWidth', this._onSwipeTargetWidthChanged.bind(this));

        window.addEventListener('resize', this._onWindowResize.bind(this));

        this._boundHandleEvent = this._handleEvent.bind(this);
        this._bindEvents();

        if (attrs.abovePage) {
          this.setAbovePage(attrs.abovePage);
        }

        if (attrs.behindPage) {
          this.setBehindPage(attrs.behindPage);
        }

        var unlock = this._doorLock.lock();

        window.setTimeout(function() {
          unlock();

          this._behindPage.css({opacity: 1});

          this._animator = new DefaultSlidingMenuAnimator();
          this._animator.onAttached(this._element, this._abovePage, this._behindPage);
        }.bind(this), 400);
      },

      _onSwipableChanged: function(swipable) {
        swipable = swipable === '' || swipable === undefined || swipable == 'true';

        this.setSwipable(swipable);
      },

      /**
       * @param {Boolean} enabled
       */
      setSwipable: function(enabled) {
        if (enabled) {
          this._activateHammer();
        } else {
          this._deactivateHammer();
        }
      },

      /**
       * @param {Number} targetWidth
       */
      setSwipeTargetWidth: function(targetWidth) {
        var width = parseInt(targetWidth, 10);
        if (width < 0 || !targetWidth) {
          this._swipeTargetWidth = this._abovePage[0].clientWidth;
        } else {
          this._swipeTargetWidth = width;
        }
      },

      _onSwipeTargetWidthChanged: function(targetWidth) {
        if (typeof targetWidth == 'string') {
          targetWidth = targetWidth.replace('px', '');
        }

        this.setSwipeTargetWidth(targetWidth);
      },

      _onWindowResize: function() {
        this._recalculateMAX();
      },

      _onMaxSlideDistanceChanged: function() {
        this._recalculateMAX();
      },

      _recalculateMAX: function() {
        var maxDistance = this._attrs.maxSlideDistance;

        if (typeof maxDistance == 'string') {
          if (maxDistance.indexOf('px') > 0) {
            maxDistance = maxDistance.replace('px', '');
          } else if (maxDistance.indexOf('%') > 0) {
            maxDistance = maxDistance.replace('%', '');
            maxDistance = parseFloat(maxDistance) / 100 * this._abovePage[0].clientWidth;
          }
        }

        if (maxDistance) {
          this._logic.setMaxX(parseInt(maxDistance, 10));
        }
      },

      _activateHammer: function(){
        this._hammertime.on('touch dragleft dragright swipeleft swiperight release', this._boundHandleEvent);
      },

      _deactivateHammer: function(){
        this._hammertime.off('touch dragleft dragright swipeleft swiperight release', this._boundHandleEvent);
      },

      _bindEvents: function() {
        this._hammertime = new Hammer(this._element[0]);
      },

      _appendAbovePage: function(pageUrl, templateHTML) {
        var pageScope = this._scope.$parent.$new();
        var pageContent = $compile(templateHTML)(pageScope);

        this._abovePage.append(pageContent);

        // prevent black flash
        setTimeout(function() {
          pageContent.css({opacity: 1});

          if (this._currentPageElement) {
            this._currentPageElement.remove();
            this._currentPageScope.$destroy();
          }

          this._currentPageElement = pageContent;
          this._currentPageScope = pageScope;
        }.bind(this), 0);

        this._currentPageUrl = pageUrl;
      },

      /**
       * @param {String}
       */
      _appendBehindPage: function(templateHTML) {
        var pageScope = this._scope.$parent.$new();
        var pageContent = $compile(templateHTML)(pageScope);

        this._behindPage.append(pageContent);

        if (this._currentBehindPageScope) {
          this._currentBehindPageScope.$destroy();
          this._currentBehindPageElement.remove();
        }

        this._currentBehindPageElement = pageContent;
        this._currentBehindPageScope = pageScope;
      },

      /**
       * @param {String} page
       * @param {Function} callback
       */
      setBehindPage: function(page, callback) {
        if (page) {
          callback = callback || function() {};
          var self = this;
          $onsen.getPageHTMLAsync(page).then(function(html) {
            self._appendBehindPage(angular.element(html));
            callback();
          }, function() {
            throw new Error('Page is not found: ' + page);
          });
        } else {
          throw new Error('cannot set undefined page');
        }
      },

      /**
       * @param {String} pageUrl
       * @param {Function} callback
       */
      setAbovePage: function(pageUrl, callback) {
        if (this.currentPageUrl === pageUrl) {
          // same page -> ignore
          return;
        }

        callback = callback || function() {};

        if (pageUrl) {
          var self = this;
          $onsen.getPageHTMLAsync(pageUrl).then(function(html) {
            self._appendAbovePage(pageUrl, html);
            callback();
          }, function() {
            throw new Error('Page is not found: ' + page);
          });
        } else {
          throw new Error('cannot set undefined page');
        }
      },

      _handleEvent: function(event) {

        if (this._doorLock.isLocked()) {
          return;
        }

        if (this._isInsideIgnoredElement(event.target)){
          event._gesture.stopDetect();
        }

        switch (event.type) {

          case 'touch':
            if (this._logic.isClosed()) {
              if (!this._isInsideSwipeTargetArea(event.gesture.center.pageX)) {
                event.gesture.stopDetect();
              }
            }

            break;

          case 'dragleft':
          case 'dragright':
            event.gesture.preventDefault();

            if (event.gesture.deltaX < 0 && this._logic.isClosed()) {
              break;
            }

            if (event.gesture.deltaX > 0 && this._logic.isOpened()) {
              break;
            }

            var x = event.gesture.deltaX > 0
              ? event.gesture.deltaX
              : event.gesture.deltaX + this._logic.getMaxX() ;

            this._logic.translate(x);

            break;

          case 'swipeleft':
            event.gesture.preventDefault();
            this._logic.close();

            break;

          case 'swiperight':
            event.gesture.preventDefault();
            this._logic.open();

            break;

          case 'release':
            this._logic.openOrClose();

            break;
        }
      },

      /**
       * @param {jqLite} element
       * @return {Boolean}
       */
      _isInsideIgnoredElement: function(element) {
        do {
          if (element.getAttribute && element.getAttribute('sliding-menu-ignore')) {
            return true;
          }
          element = element.parentNode;
        } while (element);

        return false;
      },

      _isInsideSwipeTargetArea: function(x) {
        return x < this._swipeTargetWidth;
      },

      closeMenu: function() {
        return this.close.apply(this, arguments);
      },

      /**
       * Close sliding-menu page.
       *
       * @param {Function} callback
       */
      close: function(callback) {
        callback = callback || function() {};

        this._doorLock.waitUnlock(function() {
          this._logic.close();
        }.bind(this));
      },

      _close: function(callback) {
        callback = callback || function() {};

        var unlock = this._doorLock.lock();
        this._animator.close(this._abovePage, this._behindPage, function() {
          unlock();
          callback();
        });
      },

      openMenu: function() {
        return this.open.apply(this, arguments);
      },

      /**
       * Open sliding-menu page.
       *
       * @param {Function} callback
       */
      open: function(callback) {
        callback = callback || function() {};

        this._doorLock.waitUnlock(function() {
          this._logic.open();
        }.bind(this));
      },

      _open: function(callback) {
        callback = callback || function() {};
        var unlock = this._doorLock.lock();
        
        this._animator.open(this._abovePage, this._behindPage, function() {
          unlock();
          callback();
        });
      },

      /**
       * Toggle sliding-menu page.
       */
      toggle: function(callback) {
        if (this._logic.isClosed()) {
          this.open(callback);
        } else {
          this.close(callback);
        }
      },

      /**
       * Toggle sliding-menu page.
       */
      toggleMenu: function() {
        return this.toggle.apply(this, arguments);
      },

      /**
       * @param {Object} event
       */
      _translate: function(event) {
        this._animator.translate(this._abovePage, this._behindPage, event);
      }
    });

    return SlidingMenuView;
  });
})();
