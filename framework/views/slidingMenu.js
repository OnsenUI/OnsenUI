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
    _distance: 0,

    /**
     * @member Number
     */
    _maxDistance: undefined,

    /**
     * @param {Object} options
     * @param {Number} maxDistance
     */
    init: function(options) {
      if (!angular.isNumber(options.maxDistance)) {
        throw new Error('options.maxDistance must be number');
      }

      this.setMaxDistance(options.maxDistance);
    },

    /**
     * @param {Number} maxDistance
     */
    setMaxDistance: function(maxDistance) {
      if (maxDistance <= 0) {
        throw new Error('maxDistance must be greater then zero.');
      }

      this._maxDistance = maxDistance;
    },

    /**
     * @return {Boolean}
     */
    shouldOpen: function() {
      return !this.isOpened() && this._distance >= this._maxDistance / 2;
    },

    /**
     * @return {Boolean}
     */
    shouldClose: function() {
      return !this.isClosed() && this._distance < this._maxDistance / 2;
    },

    openOrClose: function(callback) {
      if (this.shouldOpen()) {
        this.open(callback);
      } else if (this.shouldClose()) {
        this.close(callback);
      }
    },

    close: function(callback) {
      callback = callback || function() {};

      if (!this.isClosed()) {
        this._distance = 0;
        this.emit('close', {callback: callback});
      } else {
        callback();
      }
    },

    open: function(callback) {
      callback = callback || function() {};

      if (!this.isOpened()) {
        this._distance = this._maxDistance;
        this.emit('open', {callback: callback});
      } else {
        callback();
      }
    },

    /**
     * @return {Boolean}
     */
    isClosed: function() {
      return this._distance === 0;
    },

    /**
     * @return {Boolean}
     */
    isOpened: function() {
      return this._distance === this._maxDistance;
    },

    /**
     * @return {Number}
     */
    getX: function() {
      return this._distance;
    },

    /**
     * @return {Number}
     */
    getMaxDistance: function() {
      return this._maxDistance;
    },

    /**
     * @param {Number} x
     */
    translate: function(x) {
      this._distance = Math.max(0, Math.min(this._maxDistance, x));

      var options = {
        distance: this._distance,
        maxDistance: this._maxDistance
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
  module.factory('SlidingMenuView', function($onsen, $compile, SlidingMenuAnimator, DefaultSlidingMenuAnimator, 
                                             PushSlidingMenuAnimator, OverlaySlidingMenuAnimator) {

    var SlidingMenuView = Class.extend({
      _scope: undefined,
      _attrs: undefined,

      _element: undefined,
      _behindPage: undefined,
      _abovePage: undefined,

      _doorLock: undefined,

      _isRightMenu: false,

      init: function(scope, element, attrs) {
        this._scope = scope;
        this._attrs = attrs;
        this._element = element;

        this._behindPage = angular.element(element[0].querySelector('.onsen-sliding-menu__behind'));
        this._abovePage = angular.element(element[0].querySelector('.onsen-sliding-menu__above'));

        this._doorLock = new DoorLock();

        this._isRightMenu = attrs.side === 'right';

        var maxDistance = this._normalizeMaxSlideDistanceAttr();
        this._logic = new SlidingMenuViewModel({maxDistance: Math.max(maxDistance, 1)});
        this._logic.on('translate', this._translate.bind(this));
        this._logic.on('open', function(options) {
          this._open(options.callback);
        }.bind(this));
        this._logic.on('close', function(options) {
          this._close(options.callback);
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
          var maxDistance = this._normalizeMaxSlideDistanceAttr();
          this._logic.setMaxDistance(maxDistance);

          unlock();

          this._behindPage.css({opacity: 1});

          this._animator = this._getAnimatorOption();
          this._animator.onAttached(
            this._element,
            this._abovePage,
            this._behindPage,
            {
              isRight: this._isRightMenu,
              width: this._attrs.maxSlideDistance
            }
          );

        }.bind(this), 400);

        scope.$on('$destroy', this._destroy.bind(this));
      },

      _refreshBehindPageWidth: function() {
        if ('maxSlideDistance' in this._attrs && this._animator) {
          this._animator.updateMenuPageWidth(
            this._behindPage,
            this._attrs.maxSlideDistance,
            {isRight: this._isRightMenu}
          );
        }
      },

      _destroy: function() {
        this.emit('destroy', {slidingMenu: this});

        this._element = null;
        this._scope = null;
        this._attrs = null;
      },

      _getAnimatorOption: function() {
        var animator = SlidingMenuView._animatorDict[this._attrs.type];

        if (!(animator instanceof SlidingMenuAnimator)) {
          animator = SlidingMenuView._animatorDict['default'];
        }

        return animator;
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
        this._refreshBehindPageWidth();
      },

      _onMaxSlideDistanceChanged: function() {
        this._recalculateMAX();
        this._refreshBehindPageWidth();
      },

      /**
       * @return {Number}
       */
      _normalizeMaxSlideDistanceAttr: function() {
        var maxDistance = this._attrs.maxSlideDistance;

        if (!('maxSlideDistance' in this._attrs)) {
          maxDistance = 0.9 * this._abovePage[0].clientWidth;
        } else if (typeof maxDistance == 'string') {
          if (maxDistance.indexOf('px', maxDistance.length - 2) !== -1) {
            maxDistance = parseInt(maxDistance.replace('px', ''), 10);
          } else if (maxDistance.indexOf('%', maxDistance.length - 1) > 0) {
            maxDistance = maxDistance.replace('%', '');
            maxDistance = parseFloat(maxDistance) / 100 * this._abovePage[0].clientWidth;
          }
        } else {
          throw new Error('invalid state');
        }

        return maxDistance;
      },

      _recalculateMAX: function() {
        var maxDistance = this._normalizeMaxSlideDistanceAttr();

        if (maxDistance) {
          this._logic.setMaxDistance(parseInt(maxDistance, 10));
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

        if (this._currentPageElement) {
          this._currentPageElement.remove();
          this._currentPageScope.$destroy();
        }

        this._currentPageElement = pageContent;
        this._currentPageScope = pageScope;
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
       * @param {Object} options
       * @param {Boolean} [options.closeMenu]
       * @param {Boolean} [options.callback]
       */
      setBehindPage: function(page, options) {
        if (page) {
          options = options || {};
          options.callback = options.callback || function() {};

          var self = this;
          $onsen.getPageHTMLAsync(page).then(function(html) {
            self._appendBehindPage(angular.element(html));
            if (options.closeMenu) {
              self.close();
            }
            options.callback();
          }, function() {
            throw new Error('Page is not found: ' + page);
          });
        } else {
          throw new Error('cannot set undefined page');
        }
      },

      /**
       * @param {String} pageUrl
       * @param {Object} options
       * @param {Boolean} [options.closeMenu]
       * @param {Boolean} [options.callback]
       */
      setAbovePage: function(pageUrl, options) {

        options = options || {};
        options.callback = options.callback || function() {};

        var done = function() {
          if (options.closeMenu) {
            this.close();
          }
          options.callback();
        }.bind(this);

        if (this.currentPageUrl === pageUrl) {
          done();
          return;
        }

        if (pageUrl) {
          var self = this;
          $onsen.getPageHTMLAsync(pageUrl).then(function(html) {
            self._appendAbovePage(pageUrl, html);
            done();
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

            var deltaDistance = this._isRightMenu ? -event.gesture.deltaX : event.gesture.deltaX;

            if (deltaDistance < 0 && this._logic.isClosed()) {
              break;
            }

            if (deltaDistance > 0 && this._logic.isOpened()) {
              break;
            }

            var distance = deltaDistance > 0 ?
              deltaDistance : deltaDistance + this._logic.getMaxDistance();

            this._logic.translate(distance);

            break;

          case 'swipeleft':
            event.gesture.preventDefault();

            if (this._isRightMenu) {
              this.open();
            } else {
              this.close();
            }

            break;

          case 'swiperight':
            event.gesture.preventDefault();

            if (this._isRightMenu) {
              this.close();
            } else {
              this.open();
            }

            break;

          case 'release':
            if (this._logic.shouldOpen()) {
              this.open();
            } else if (this._logic.shouldClose()) {
              this.close();
            }

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
        return this._isRightMenu ? this._abovePage[0].clientWidth - x < this._swipeTargetWidth : x < this._swipeTargetWidth;
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

        this.emit('preclose');

        this._doorLock.waitUnlock(function() {
          this._logic.close(callback);
        }.bind(this));
      },

      _close: function(callback) {
        callback = callback || function() {};

        var unlock = this._doorLock.lock();
        this._animator.close(this._abovePage, this._behindPage, function() {
          unlock();
          this.emit('postclose');
          callback();
        }.bind(this));
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

        this.emit('preopen');

        this._doorLock.waitUnlock(function() {
          this._logic.open(callback);
        }.bind(this));
      },

      _open: function(callback) {
        callback = callback || function() {};
        var unlock = this._doorLock.lock();

        this._animator.open(this._abovePage, this._behindPage, function() {
          unlock();
          this.emit('postopen');
          callback();
        }.bind(this));
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

    // Preset sliding menu animators.
    SlidingMenuView._animatorDict = {
      'default': new DefaultSlidingMenuAnimator(),
      'overlay': new OverlaySlidingMenuAnimator(),
      'reveal': new DefaultSlidingMenuAnimator(),
      'push': new PushSlidingMenuAnimator()
    };

    /**
     * @param {String} name
     * @param {NavigatorTransitionAnimator} animator
     */
    SlidingMenuView.registerSlidingMenuAnimator = function(name, animator) {
      if (!(animator instanceof SlidingMenuAnimator)) {
        throw new Error('"animator" param must be an instance of SlidingMenuAnimator');
      }

      this._animatorDict[name] = animator;
    };

    MicroEvent.mixin(SlidingMenuView);

    return SlidingMenuView;
  });
})();
