/*
Copyright 2013-2015 ASIAL CORPORATION

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

(() => {
  'use strict';

  var util = ons._util;
  var ModifierUtil = ons._internal.ModifierUtil;
  var scheme = {'': 'carousel--*'};

  class CarouselElement extends ons._BaseElement {

    createdCallback() {
      ModifierUtil.initModifier(this, scheme);
      this._doorLock = new DoorLock();
      this._scroll = 0;
      this._lastActiveIndex = 0;

      this._boundOnDrag = this._onDrag.bind(this);
      this._boundOnDragEnd = this._onDragEnd.bind(this);
      this._boundOnResize = this._onResize.bind(this);

      this._mixin(this._isVertical() ? VerticalModeTrait : HorizontalModeTrait);

      this._layoutCarouselItems();
      this._setupInitialIndex();

      this._saveLastState();
    }

    _onResize() {
      this.refresh();
    }

    _onDirectionChange() {
     if (this._isVertical()) {
        this.style.overflowX = 'auto';
        this.style.overflowY = '';
      } else {
        this.style.overflowX = '';
        this.style.overflowY = 'auto';
      }
    }

    _saveLastState() {
      this._lastState = {
        elementSize: this._getCarouselItemSize(),
        carouselElementCount: this._getCarouselItemCount(),
        width: this._getCarouselItemSize() * this._getCarouselItemCount()
      };
    }

    /**
     * @return {Number}
     */
    _getCarouselItemSize() {
      var sizeAttr = this._getCarouselItemSizeAttr();
      var sizeInfo = this._decomposeSizeString(sizeAttr);
      var elementSize = this._getElementSize();

      if (sizeInfo.unit === '%') {
        return Math.round(sizeInfo.number / 100 * elementSize);
      } else if (sizeInfo.unit === 'px') {
        return sizeInfo.number;
      } else {
        throw new Error('Invalid state');
      }
    }

    /**
     * @return {Number}
     */
    _getInitialIndex() {
      var index = parseInt(this.getAttribute('initial-index'), 10);

      if (typeof index === 'number' && !isNaN(index)) {
        return Math.max(Math.min(index, this._getCarouselItemCount() - 1), 0);
      } else {
        return 0;
      }
    }

    /**
     * @return {String}
     */
    _getCarouselItemSizeAttr() {
      var attrName = 'item-' + (this._isVertical() ? 'height' : 'width');
      var itemSizeAttr = ('' + this.getAttribute(attrName)).trim();

      return itemSizeAttr.match(/^\d+(px|%)$/) ? itemSizeAttr : '100%';
    }

    /**
     * @return {Object}
     */
    _decomposeSizeString(size) {
      var matches = size.match(/^(\d+)(px|%)/);

      return {
        number: parseInt(matches[1], 10),
        unit: matches[2],
      };
    }

    _setupInitialIndex() {
      this._scroll = this._getCarouselItemSize() * this._getInitialIndex();
      this._lastActiveIndex = this._getInitialIndex();
      this._scrollTo(this._scroll);
    }

    /**
     * @param {Boolean} swipeable
     */
    setSwipeable(swipeable) {
      if (swipeable) {
        this.setAttribute('swipeable', '');
      } else {
        this.removeAttribute('swipeable');
      }
    }

    /**
     * @return {Boolean}
     */
    isSwipeable() {
      return this.hasAttribute('swipeable');
    }

    /**
     * @param {Number} ratio
     */
    setAutoScrollRatio(ratio) {
      if (ratio < 0.0 || ratio > 1.0) {
        throw new Error('Invalid ratio.');
      }

      this.setAttribute('auto-scroll-ratio', ratio);
    }

    /**
     * @return {Number}
     */
    getAutoScrollRatio() {
      var attr = this.getAttribute('auto-scroll-ratio');

      if (!attr) {
        return 0.5;
      }

      var scrollRatio = parseFloat(attr);
      if (scrollRatio < 0.0 || scrollRatio > 1.0) {
        throw new Error('Invalid ratio.');
      }

      return isNaN(scrollRatio) ? 0.5 : scrollRatio;
    }

    /**
     * @param {Number} index
     * @param {Object} [options]
     * @param {Function} [options.callback]
     * @param {String} [options.animation]
     */
    setActiveCarouselItemIndex(index, options) {
      options = options || {};

      index = Math.max(0, Math.min(index, this._getCarouselItemCount() - 1));
      var scroll = this._getCarouselItemSize() * index;
      var max = this._calculateMaxScroll();

      this._scroll = Math.max(0, Math.min(max, scroll));
      this._scrollTo(this._scroll, {animate: options.animation !== 'none', callback: options.callback});

      this._tryFirePostChangeEvent();
    }

    /**
     * @return {Number}
     */
    getActiveCarouselItemIndex() {
      var scroll = this._scroll;
      var count = this._getCarouselItemCount();
      var size = this._getCarouselItemSize();

      if (scroll < 0) {
        return 0;
      }

      for (var i = 0; i < count; i++) {
        if (size * i <= scroll && size * (i + 1) > scroll) {
          return i;
        }
      }

      // max carousel index
      return i;
    }

    /**
     * @param {Object} [options]
     * @param {Function} [options.callback]
     * @param {String} [options.animation]
     */
    next(options) {
      return this.setActiveCarouselItemIndex(this.getActiveCarouselItemIndex() + 1, options);
    }

    /**
     * @param {Object} [options]
     * @param {Function} [options.callback]
     * @param {String} [options.animation]
     */
    prev(options) {
      return this.setActiveCarouselItemIndex(this.getActiveCarouselItemIndex() - 1, options);
    }

    /**
     * @param {Boolean} enabled
     */
    setAutoScrollEnabled(enabled) {
      if (enabled) {
        this.setAttribute('auto-scroll', '');
      } else {
        this.removeAttribute('auto-scroll');
      }
    }

    /**
     * @param {Boolean} enabled
     */
    isAutoScrollEnabled(enabled) {
      return this.hasAttribute('auto-scroll');
    }

    /**
     * @param {Boolean} disabled
     */
    setDisabled(disabled) {
      if (disabled) {
        this.setAttribute('disabled', '');
      } else {
        this.removeAttribute('disabled');
      }
    }

    /**
     * @return {Boolean}
     */
    isDisabled() {
      return this.hasAttribute('disabled');
    }

    /**
     * @param {Boolean} scrollable
     */
    setOverscrollable(scrollable) {
      if (scrollable) {
        this.setAttribute('overscrollable', '');
      } else {
        this.removeAttribute('overscrollable');
      }
    }

    /**
     * @return {Boolean}
     */
    _isEnabledChangeEvent() {
      var elementSize = this._getElementSize();
      var carouselItemSize = this._getCarouselItemSize();

      return this.isAutoScrollEnabled() && elementSize === carouselItemSize;
    }

    /**
     * @return {Boolean}
     */
    _isVertical() {
      return this.getAttribute('direction') === 'vertical';
    }

    _prepareEventListeners() {
      this._gestureDetector = new ons.GestureDetector(this, {
        dragMinDistance: 1
      });

      this._gestureDetector.on('drag dragleft dragright dragup dragdown swipe swipeleft swiperight swipeup swipedown', this._boundOnDrag);
      this._gestureDetector.on('dragend', this._boundOnDragEnd);

      window.addEventListener('resize', this._boundOnResize, true);
    }

    _removeEventListeners() {
      this._gestureDetector.off('drag dragleft dragright dragup dragdown swipe swipeleft swiperight swipeup swipedown', this._boundOnDrag);
      this._gestureDetector.off('dragend', this._boundOnDragEnd);
      this._gestureDetector.dispose();

      window.removeEventListener('resize', this._boundOnResize, true);
    }

    _tryFirePostChangeEvent() {
      var currentIndex = this.getActiveCarouselItemIndex();

      if (this._lastActiveIndex !== currentIndex) {
        var lastActiveIndex = this._lastActiveIndex;
        this._lastActiveIndex = currentIndex;

        var event = new CustomEvent('postchange', {
          bubbles: true,
          detail: {
            carousel: this,
            activeIndex: currentIndex,
            lastActiveIndex: lastActiveIndex
          }
        });
        this.dispatchEvent(event);
      }
    }

    _onDrag(event) {
      if (!this.isSwipeable()) {
        return;
      }

      var direction = event.gesture.direction;
      if ((this._isVertical() && (direction === 'left' || direction === 'right')) || (!this._isVertical() && (direction === 'up' || direction === 'down'))) {
        return;
      }

      event.stopPropagation();

      this._lastDragEvent = event;

      var scroll = this._scroll - this._getScrollDelta(event);
      this._scrollTo(scroll);
      event.gesture.preventDefault();

      this._tryFirePostChangeEvent();
    }

    _onDragEnd(event) {
      this._currentElementSize = undefined;

      if (!this.isSwipeable()) {
        return;
      }

      this._scroll = this._scroll - this._getScrollDelta(event);

      if (this._getScrollDelta(event) !== 0) {
        event.stopPropagation();
      }

      if (this._isOverScroll(this._scroll)) {
        var waitForAction = false;
        var overscrollEvent = new CustomEvent('overscroll', {
          bubbles: true,
          detail: {
            carousel: this,
            activeIndex: this.getActiveCarouselItemIndex(),
            direction: this._getOverScrollDirection(),
            waitToReturn: (promise) => {
              waitForAction = true;
              promise.then(() => this._scrollToKillOverScroll());
            }
          }
        });
        this.dispatchEvent(overscrollEvent);

        if (!waitForAction) {
          this._scrollToKillOverScroll();
        }
      } else {
        this._startMomentumScroll(event);
      }
      this._lastDragEvent = null;

      event.gesture.preventDefault();
    }

    _getTouchEvents() {
      var EVENTS = [
        'drag', 'dragstart', 'dragend',
        'dragup', 'dragdown', 'dragleft', 
        'dragright', 'swipe', 'swipeup',
        'swipedown', 'swipeleft', 'swiperight'
      ];

      return EVENTS.join(' ');
    }


    /**
     * @param {Object} trait
     */
    _mixin(trait) {
      Object.keys(trait).forEach(function(key) {
        this[key] = trait[key];
      }.bind(this));
    }

    _startMomentumScroll(event) {
      if (this._lastDragEvent) {
        var velocity = this._getScrollVelocity(this._lastDragEvent);
        var duration = 0.3;
        var scrollDelta = duration * 100 * velocity;
        var scroll = this._scroll + (this._getScrollDelta(this._lastDragEvent) > 0 ? -scrollDelta : scrollDelta);
        scroll = this._normalizeScrollPosition(scroll);

        this._scroll = scroll;

        animit(this._getCarouselItemElements())
          .queue({
            transform: this._generateScrollTransform(this._scroll)
          }, {
            duration: duration,
            timing: 'cubic-bezier(.1, .7, .1, 1)'
          })
          .queue(function(done) {
            done();
            this._tryFirePostChangeEvent();
          }.bind(this))
          .play();
      }
    }

    _normalizeScrollPosition(scroll) {
      var max = this._calculateMaxScroll();

      if (this.isAutoScrollEnabled()) {
        var arr = [];
        var size = this._getCarouselItemSize();

        for (var i = 0; i < this._getCarouselItemCount(); i++) {
          if (max >= i * size) { 
            arr.push(i * size);
          }
        }
        arr.push(max);

        arr.sort(function(left, right) {
          left = Math.abs(left - scroll);
          right = Math.abs(right - scroll);

          return left - right;
        });

        arr = arr.filter(function(item, pos) {
          return !pos || item != arr[pos - 1];
        });

        var lastScroll = this._lastActiveIndex * size,
          scrollRatio = Math.abs(scroll - lastScroll) / size;

        if (scrollRatio <= this.getAutoScrollRatio()) {
          return lastScroll;
        }
        else if (scrollRatio > this.getAutoScrollRatio() && scrollRatio < 1.0) {
          if (arr[0] === lastScroll && arr.length > 1) {
            return arr[1];
          }
        }

        return arr[0];
      } else {
        return Math.max(0, Math.min(max, scroll));
      }
    }

    /**
     * @return {Array}
     */
    _getCarouselItemElements() {
      return ons._util.arrayFrom(this.querySelectorAll('ons-carousel-item'));
    }

    /**
     * @return {Boolean}
     */
    isOverscrollable() {
      return this.hasAttribute('overscrollable');
    }

    /**
     * @param {Number} scroll
     * @param {Object} [options]
     */
    _scrollTo(scroll, options) {
      options = options || {};
      var isOverscrollable = this.isOverscrollable();

      var normalizeScroll = (scroll) => {
        var ratio = 0.35;

        if (scroll < 0) {
          return isOverscrollable ? Math.round(scroll * ratio) : 0;
        }

        var maxScroll = this._calculateMaxScroll();
        if (maxScroll < scroll) {
          return isOverscrollable ? maxScroll + Math.round((scroll - maxScroll) * ratio) : maxScroll;
        }

        return scroll;
      };

      if (options.animate) {
        animit(this._getCarouselItemElements())
          .queue({
            transform: this._generateScrollTransform(normalizeScroll(scroll))
          }, {
            duration: 0.3,
            timing: 'cubic-bezier(.1, .7, .1, 1)'
          })
          .play(options.callback);
      } else {
        animit(this._getCarouselItemElements())
          .queue({
            transform: this._generateScrollTransform(normalizeScroll(scroll))
          })
          .play(options.callback);
      }
    }

    _calculateMaxScroll() {
      var max = this._getCarouselItemCount() * this._getCarouselItemSize() - this._getElementSize();
      return Math.ceil(max < 0 ? 0 : max); // Need to return an integer value.
    }

    _isOverScroll(scroll) {
      if (scroll < 0 || scroll > this._calculateMaxScroll()) {
        return true;
      }
      return false;
    }

    _getOverScrollDirection() {
      if (this._isVertical()) {
        if (this._scroll <= 0) {
          return 'up';
        }
        else {
          return 'down';
        }
      } else {
        if (this._scroll <= 0) {
          return 'left';
        }
        else {
          return 'right';
        }
      }
    }

    _scrollToKillOverScroll() {
      var duration = 0.4;
      
      if (this._scroll < 0) {
        animit(this._getCarouselItemElements())
          .queue({
            transform: this._generateScrollTransform(0)
          }, {
            duration: duration,
            timing: 'cubic-bezier(.1, .4, .1, 1)'
          })
          .play();
        this._scroll = 0;
        return;
      }

      var maxScroll = this._calculateMaxScroll();

      if (maxScroll < this._scroll) {
        animit(this._getCarouselItemElements())
          .queue({
            transform: this._generateScrollTransform(maxScroll)
          }, {
            duration: duration,
            timing: 'cubic-bezier(.1, .4, .1, 1)'
          })
          .play();
        this._scroll = maxScroll;
        return;
      }

      return;
    }

    /**
     * @return {Number}
     */
    _getCarouselItemCount() {
      return this._getCarouselItemElements().length;
    }

    /**
     * Refresh carousel item layout.
     */
    refresh() {
      // Bug fix
      if (this._getCarouselItemSize() === 0) {
        return;
      }

      this._mixin(this._isVertical() ? VerticalModeTrait : HorizontalModeTrait);
      this._layoutCarouselItems();

      if (this._lastState && this._lastState.width > 0) {
        var scroll = this._scroll;

        if (this._isOverScroll(scroll)) {
          this._scrollToKillOverScroll();
        } 
        else {
          if (this.isAutoScrollEnabled()) {
            scroll = this._normalizeScrollPosition(scroll);
          }

          this._scrollTo(scroll);
        }
      }

      this._saveLastState();

      var event = new CustomEvent('refresh', {
        bubbles: true,
        detail: {carousel: this}
      });
      this.dispatchEvent(event);
    }

    /**
     */
    first() {
      this.setActiveCarouselItemIndex(0);
    }

    /**
     */
    last() {
      this.setActiveCarouselItemIndex(
        Math.max(this._getCarouselItemCount() - 1, 0)
      );
    }

    attachedCallback() {
      this._prepareEventListeners();

      this._layoutCarouselItems();
      this._setupInitialIndex();

      this._saveLastState();
    }

    attributeChangedCallback(name, last, current) {
      if (name === 'modifier') {
        return ModifierUtil.onModifierChanged(last, current, this, scheme);
      } else if ('diration') {
        this._onDirectionChange();
      }
    }

    detachedCallback() {
      this._removeEventListeners();
    }
  }

  var VerticalModeTrait = {

    _getScrollDelta: function(event) {
      return event.gesture.deltaY;
    },

    _getScrollVelocity: function(event) {
      return event.gesture.velocityY;
    },

    _getElementSize: function() {
      if (!this._currentElementSize) {
        this._currentElementSize = this.getBoundingClientRect().height;
      }

      return this._currentElementSize;
    },

    _generateScrollTransform: function(scroll) {
      return 'translate3d(0px, ' + -scroll + 'px, 0px)';
    },

    _layoutCarouselItems: function() {
      var children = this._getCarouselItemElements();

      var sizeAttr = this._getCarouselItemSizeAttr();
      var sizeInfo = this._decomposeSizeString(sizeAttr);

      var computedStyle = window.getComputedStyle(this);
      var totalWidth = this.getBoundingClientRect().width || 0;
      var finalWidth = totalWidth - parseInt(computedStyle.paddingLeft, 10) - parseInt(computedStyle.paddingRight, 10);

      for (var i = 0; i < children.length; i++) {
        children[i].style.position = 'absolute';
        children[i].style.height = sizeAttr;
        children[i].style.width = finalWidth + 'px';
        children[i].style.visibility = 'visible';
        children[i].style.top = (i * sizeInfo.number) + sizeInfo.unit;
      }
    },
  };

  var HorizontalModeTrait = {

    _getScrollDelta: function(event) {
      return event.gesture.deltaX;
    },

    _getScrollVelocity: function(event) {
      return event.gesture.velocityX;
    },

    _getElementSize: function() {
      if (!this._currentElementSize) {
        this._currentElementSize = this.getBoundingClientRect().width;
      }

      return this._currentElementSize;
    },

    _generateScrollTransform: function(scroll) {
      return 'translate3d(' + -scroll + 'px, 0px, 0px)';
    },

    _layoutCarouselItems: function() {
      var children = this._getCarouselItemElements();

      var sizeAttr = this._getCarouselItemSizeAttr();
      var sizeInfo = this._decomposeSizeString(sizeAttr);

      var computedStyle = window.getComputedStyle(this);
      var totalHeight = this.getBoundingClientRect().height || 0;
      var finalHeight = totalHeight - parseInt(computedStyle.paddingTop, 10) - parseInt(computedStyle.paddingBottom, 10);

      for (var i = 0; i < children.length; i++) {
        children[i].style.position = 'absolute';
        children[i].style.height = finalHeight + 'px';
        children[i].style.width = sizeAttr;
        children[i].style.visibility = 'visible';
        children[i].style.left = (i * sizeInfo.number) + sizeInfo.unit;
      }
    },

  };


  if (!window.OnsCarouselElement) {
    window.OnsCaroselElement = document.registerElement('ons-carousel', {
      prototype: CarouselElement.prototype
    });
  }
})();
