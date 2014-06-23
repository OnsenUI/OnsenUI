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

  var SlidingMenuAnimator = Class.extend({

    /**
     * @param {jqLite} abovePage
     * @param {jqLite} behindPage
     * @param {Object} options
     * @param {Number} options.x
     * @param {Function} callback
     */
    open: function(abovePage, behindPage, options, callback) {
      behindPage.css('display', 'block');

      var max = abovePage[0].clientWidth * MAIN_PAGE_RATIO;

      var aboveTransform = this._generateAbovePageTransform(max);
      var behindStyle = this._generateBehindPageStyle(abovePage, max);

      animit(abovePage[0])
        .queue({
          transform: aboveTransform
        }, {
          duration: 0.4,
          timing: 'cubic-bezier(.1, .7, .1, 1)'
        })
        .queue(function(done) {
          callback();
          done();
        })
        .play();

      animit(behindPage[0])
        .queue(behindStyle, {
          duration: 0.4,
          timing: 'cubic-bezier(.1, .7, .1, 1)'
        })
        .play();
    },

    /**
     * @param {jqLite} abovePage
     * @param {jqLite} behindPage
     * @param {Object} options
     * @param {Number} options.x
     * @param {Function} callback
     */
    close: function(abovePage, behindPage, options, callback) {

      var aboveTransform = this._generateAbovePageTransform(0);
      var behindStyle = this._generateBehindPageStyle(abovePage, 0);

      animit(abovePage[0])
        .queue({
          transform: aboveTransform
        }, {
          duration: 0.4,
          timing: 'cubic-bezier(.1, .7, .1, 1)'
        })
        .resetStyle()
        .queue(function(done) {
          behindPage.css('display', 'none');
          callback();
          done();
        })
        .play();

      animit(behindPage[0])
        .queue(behindStyle, {
          duration: 0.4,
          timing: 'cubic-bezier(.1, .7, .1, 1)'
        })
        .queue(function(done) {
          done();
        })
        .play();
    },

    /**
     * @param {jqLite} abovePage
     * @param {jqLite} behindPage
     * @param {Object} options
     * @param {Number} options.x
     * @param {Function} callback
     */
    translate: function(abovePage, behindPage, options, callback) {
      behindPage.css('display', 'block');

      var aboveTransform = this._generateAbovePageTransform(options.x);
      var behindStyle = this._generateBehindPageStyle(abovePage, options.x);

      animit(abovePage[0])
        .queue({transform: aboveTransform})
        .play();

      animit(behindPage[0])
        .queue(behindStyle)
        .play();

      callback();
    },

    _generateAbovePageTransform: function(x) {
      var aboveTransform = 'translate3d(' + x + 'px, 0, 0)';

      return aboveTransform;
    },

    _generateBehindPageStyle: function(abovePage, x) {
      var max = abovePage[0].clientWidth * MAIN_PAGE_RATIO;
      var behindX = Math.min((x - max) / max * 10, 0);
      var behindTransform = 'translate3d(' + behindX + '%, 0, 0)';
      var opacity = 1 + behindX / 100;

      return {
        transform: behindTransform,
        opacity: opacity
      };
    }
  });

  var MAIN_PAGE_RATIO = 0.9;

  module.factory('SlidingMenu', function($onsen, $compile) {

    var Swiper = Class.extend({
      init: function(scope, element, attrs) {
        this._doorLock = new DoorLock();

        this._scope = scope;
        this._attrs = attrs;
        this._element = element;

        this._behindPage = angular.element(element[0].querySelector('.onsen-sliding-menu__behind'));
        this._abovePage = angular.element(element[0].querySelector('.onsen-sliding-menu__above'));

        this._previousX = 0;
        this._MAX = this._abovePage[0].clientWidth * MAIN_PAGE_RATIO;

        attrs.$observe('maxSlideDistance', this._onMaxSlideDistanceChanged.bind(this));
        attrs.$observe('swipable', this._onSwipableChanged.bind(this));
        attrs.$observe('swipeTargetWidth', this._onSwipeTargetWidthChanged.bind(this));

        window.addEventListener('resize', this._onWindowResize.bind(this));

        this._currentX = 0;
        this._startX = 0;

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
          angular.element(element[0].querySelector('.onsen-sliding-menu__black-mask')).css('display', 'block');
        }.bind(this), 400);
      },

      _onSwipableChanged: function(swipable) {
        swipable = swipable === '' || swipable === undefined || swipable == 'true' || swipable;

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
          this._MAX = parseInt(maxDistance, 10);
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
        if (this._isInsideIgnoredElement(event.target)){
          event._gesture.stopDetect();
        }

        switch (event.type) {

          case 'touch':
            if (this.isClosed()) {
              if (!this._isInsideSwipeTargetArea(event.gesture.center.pageX)) {
                event.gesture.stopDetect();
              }
            }

            break;

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
            if (this._currentX > this._MAX / 2) {
              this.open();
            } else {
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
        return x < this._swipeTargetWidth;
      },

      /**
       * @return {Boolean}
       */
      isClosed: function() {
        return this._startX === 0;
      },

      /**
       * Close sliding-menu page.
       */
      close: function() {
        this._startX = 0;

        if (this._currentX !== 0) {
          new SlidingMenuAnimator().close(this._abovePage, this._behindPage, {max: this._MAX}, function() { });

          this._currentX = 0;
        }
      },

      /**
       * Open sliding-menu page.
       */
      open: function() {
        this._startX = this._MAX;

        if (this._currentX != this._MAX) {
          new SlidingMenuAnimator().open(this._abovePage, this._behindPage, {max: this._MAX}, function() { });

          this._currentX = this._MAX;
        }
      },

      /**
       * Toggle sliding-menu page.
       */
      toggle: function() {
        if (this._startX === 0) {
          this.open();
        } else {
          this.close();
        }
      },

      /**
       * Toggle sliding-menu page.
       */
      toggleMenu: function() {
        this.toggle();
      },

      _translate: function(x) {
        this._currentX = x;

        var options = {
          x: x,
          max: this._MAX
        };

        new SlidingMenuAnimator().translate(this._abovePage, this._behindPage, options, function() { });
      }
    });
    return Swiper;
  });

  module.directive('onsSlidingMenu', function($compile, SlidingMenu, SlidingMenuStack, $onsen) {
    return {
      restrict: 'E',
      replace: false,

      transclude: false,
      scope: true,

      templateUrl: $onsen.DIRECTIVE_TEMPLATE_URL + '/sliding_menu.tpl',

      link: function(scope, element, attrs) {

        if (attrs.ngController) {
          throw new Error('This element can\'t accept ng-controlelr directive.');
        }

        var slidingMenu = new SlidingMenu(scope, element, attrs);

        $onsen.declareVarAttribute(attrs, slidingMenu);
        SlidingMenuStack.addSlidingMenu(slidingMenu);

        scope.$on('$destroy', function(){
          SlidingMenuStack.removeSlidingMenu(swiper);
        });
      }
    };
  });
})();
