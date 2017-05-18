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

import util from '../ons/util';
import BaseElement from './base/base-element';
import GestureDetector from '../ons/gesture-detector';
import DoorLock from '../ons/doorlock';
import animit from '../ons/animit';

const VerticalModeTrait = {

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

  _updateDimensionData: function(){
    this._style = window.getComputedStyle(this);
    this._dimensions = this.getBoundingClientRect();
  },

  _updateOffset: function(){
    if (this.centered) {
      const height = (this._dimensions.height || 0) - parseInt(this._style.paddingTop, 10) - parseInt(this._style.paddingBottom, 10);
      this._offset = -(height - this._getCarouselItemSize()) / 2;
    }
  },

  _layoutCarouselItems: function() {
    const children = this._getCarouselItemElements();

    const sizeAttr = this._getCarouselItemSizeAttr();
    const sizeInfo = this._decomposeSizeString(sizeAttr);

    for (let i = 0; i < children.length; i++) {
      children[i].style.position = 'absolute';
      children[i].style.height = sizeAttr;
      children[i].style.visibility = 'visible';
      children[i].style.top = (i * sizeInfo.number) + sizeInfo.unit;
    }
  },

  _setup: function(){
    this._updateDimensionData();
    this._updateOffset();
    this._layoutCarouselItems();
  }
};

const HorizontalModeTrait = {

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

  _updateDimensionData: function(){
    this._style = window.getComputedStyle(this);
    this._dimensions = this.getBoundingClientRect();
  },

  _updateOffset: function(){
    if (this.centered) {
      const width = (this._dimensions.width || 0) - parseInt(this._style.paddingLeft, 10) - parseInt(this._style.paddingRight, 10);
      this._offset = -(width - this._getCarouselItemSize()) / 2;
    }
  },

  _layoutCarouselItems: function() {
    const children = this._getCarouselItemElements();

    const sizeAttr = this._getCarouselItemSizeAttr();
    const sizeInfo = this._decomposeSizeString(sizeAttr);

    for (let i = 0; i < children.length; i++) {
      children[i].style.position = 'absolute';
      children[i].style.width = sizeAttr;
      children[i].style.visibility = 'visible';
      children[i].style.left = (i * sizeInfo.number) + sizeInfo.unit;
    }
  },

  _setup: function(){
    this._updateDimensionData();
    this._updateOffset();
    this._layoutCarouselItems();
  }
};

/**
 * @element ons-carousel
 * @category carousel
 * @description
 *   [en]
 *     Carousel component. A carousel can be used to display several items in the same space.
 *
 *     The component supports displaying content both horizontally and vertically. The user can scroll through the items by dragging and it can also be controller programmatically.
 *   [/en]
 *   [ja][/ja]
 * @codepen xbbzOQ
 * @tutorial vanilla/Reference/carousel
 * @seealso ons-carousel-item
 *   [en]`<ons-carousel-item>` component[/en]
 *   [ja]ons-carousel-itemコンポーネント[/ja]
 * @example
 * <ons-carousel style="width: 100%; height: 200px">
 *   <ons-carousel-item>
 *    ...
 *   </ons-carousel-item>
 *   <ons-carousel-item>
 *    ...
 *   </ons-carousel-item>
 * </ons-carousel>
 */
export default class CarouselElement extends BaseElement {

  /**
   * @event postchange
   * @description
   *   [en]Fired just after the current carousel item has changed.[/en]
   *   [ja]現在表示しているカルーセルの要素が変わった時に発火します。[/ja]
   * @param {Object} event
   *   [en]Event object.[/en]
   *   [ja]イベントオブジェクトです。[/ja]
   * @param {Object} event.carousel
   *   [en]Carousel object.[/en]
   *   [ja]イベントが発火したCarouselオブジェクトです。[/ja]
   * @param {Number} event.activeIndex
   *   [en]Current active index.[/en]
   *   [ja]現在アクティブになっている要素のインデックス。[/ja]
   * @param {Number} event.lastActiveIndex
   *   [en]Previous active index.[/en]
   *   [ja]以前アクティブだった要素のインデックス。[/ja]
   */

  /**
   * @event refresh
   * @description
   *   [en]Fired when the carousel has been refreshed.[/en]
   *   [ja]カルーセルが更新された時に発火します。[/ja]
   * @param {Object} event
   *   [en]Event object.[/en]
   *   [ja]イベントオブジェクトです。[/ja]
   * @param {Object} event.carousel
   *   [en]Carousel object.[/en]
   *   [ja]イベントが発火したCarouselオブジェクトです。[/ja]
   */

  /**
   * @event overscroll
   * @description
   *   [en]Fired when the carousel has been overscrolled.[/en]
   *   [ja]カルーセルがオーバースクロールした時に発火します。[/ja]
   * @param {Object} event
   *   [en]Event object.[/en]
   *   [ja]イベントオブジェクトです。[/ja]
   * @param {Object} event.carousel
   *   [en]Fired when the carousel has been refreshed.[/en]
   *   [ja]カルーセルが更新された時に発火します。[/ja]
   * @param {Number} event.activeIndex
   *   [en]Current active index.[/en]
   *   [ja]現在アクティブになっている要素のインデックス。[/ja]
   * @param {String} event.direction
   *   [en]Can be one of either "up", "down", "left" or "right".[/en]
   *   [ja]オーバースクロールされた方向が得られます。"up", "down", "left", "right"のいずれかの方向が渡されます。[/ja]
   * @param {Function} event.waitToReturn
   *   [en]Takes a <code>Promise</code> object as an argument. The carousel will not scroll back until the promise has been resolved or rejected.[/en]
   *   [ja]この関数はPromiseオブジェクトを引数として受け取ります。渡したPromiseオブジェクトがresolveされるかrejectされるまで、カルーセルはスクロールバックしません。[/ja]
   */

  /**
   * @attribute direction
   * @type {String}
   * @description
   *   [en]The direction of the carousel. Can be either "horizontal" or "vertical". Default is "horizontal".[/en]
   *   [ja]カルーセルの方向を指定します。"horizontal"か"vertical"を指定できます。"horizontal"がデフォルト値です。[/ja]
   */

  /**
   * @attribute fullscreen
   * @description
   *   [en]If this attribute is set the carousel will cover the whole screen.[/en]
   *   [ja]この属性があると、absoluteポジションを使ってカルーセルが自動的に画面いっぱいに広がります。[/ja]
   */

  /**
   * @attribute overscrollable
   * @description
   *   [en]If this attribute is set the carousel will be scrollable over the edge. It will bounce back when released.[/en]
   *   [ja]この属性がある時、タッチやドラッグで端までスクロールした時に、バウンドするような効果が当たります。[/ja]
   */

  /**
   * @attribute centered
   * @description
   *   [en]If this attribute is set the carousel then the selected item will be in the center of the carousel instead of the beginning. Useful only when the items are smaller than the carousel. [/en]
   *   [ja]この属性がある時、選んでいるons-carousel-itemはカルーセルの真ん中へ行きます。項目がカルーセルよりも小さい場合にのみ、これは便利です。[/ja]
   */

  /**
   * @attribute item-width
   * @type {String}
   * @description
   *    [en]ons-carousel-item's width. Only works when the direction is set to "horizontal".[/en]
   *    [ja]ons-carousel-itemの幅を指定します。この属性は、direction属性に"horizontal"を指定した時のみ有効になります。[/ja]
   */

  /**
   * @attribute item-height
   * @type {String}
   * @description
   *   [en]ons-carousel-item's height. Only works when the direction is set to "vertical".[/en]
   *   [ja]ons-carousel-itemの高さを指定します。この属性は、direction属性に"vertical"を指定した時のみ有効になります。[/ja]
   */

  /**
   * @attribute auto-scroll
   * @description
   *   [en]If this attribute is set the carousel will be automatically scrolled to the closest item border when released.[/en]
   *   [ja]この属性がある時、一番近いcarousel-itemの境界まで自動的にスクロールするようになります。[/ja]
   */

  /**
   * @attribute auto-scroll-ratio
   * @type {Number}
   * @description
   *    [en]A number between 0.0 and 1.0 that specifies how much the user must drag the carousel in order for it to auto scroll to the next item.[/en]
   *    [ja]0.0から1.0までの値を指定します。カルーセルの要素をどれぐらいの割合までドラッグすると次の要素に自動的にスクロールするかを指定します。[/ja]
   */

  /**
   * @attribute swipeable
   * @description
   *   [en]If this attribute is set the carousel can be scrolled by drag or swipe.[/en]
   *   [ja]この属性がある時、カルーセルをスワイプやドラッグで移動できるようになります。[/ja]
   */

  /**
   * @attribute disabled
   * @description
   *   [en]If this attribute is set the carousel is disabled.[/en]
   *   [ja]この属性がある時、dragやtouchやswipeを受け付けなくなります。[/ja]
   */

  /**
   * @attribute initial-index
   * @initonly
   * @type {Number}
   * @description
   *   [en]Specify the index of the ons-carousel-item to show initially. Default is 0.[/en]
   *   [ja]最初に表示するons-carousel-itemを0始まりのインデックスで指定します。デフォルト値は 0 です。[/ja]
   */

  /**
   * @attribute auto-refresh
   * @description
   *   [en]When this attribute is set the carousel will automatically refresh when the number of child nodes change.[/en]
   *   [ja]この属性がある時、子要素の数が変わるとカルーセルは自動的に更新されるようになります。[/ja]
   */

  /**
   * @attribute animation
   * @type {String}
   * @description
   *   [en]If this attribute is set to `"none"` the transitions will not be animated.[/en]
   *   [ja][/ja]
   */

  /**
   * @attribute animation-options
   * @type {Expression}
   * @description
   *   [en]Specify the animation's duration, timing and delay with an object literal. E.g. `{duration: 0.2, delay: 1, timing: 'ease-in'}`.[/en]
   *   [ja]アニメーション時のduration, timing, delayをオブジェクトリテラルで指定します。例：{duration: 0.2, delay: 1, timing: 'ease-in'}[/ja]
   */

  constructor() {
    super();

    this._doorLock = new DoorLock();
    this._scroll = 0;
    this._offset = 0;
    this._lastActiveIndex = 0;

    this._boundOnDrag = this._onDrag.bind(this);
    this._boundOnDragEnd = this._onDragEnd.bind(this);
    this._boundOnResize = this._onResize.bind(this);

    this._mixin(this._isVertical() ? VerticalModeTrait : HorizontalModeTrait);
  }

  _onResize() {
    const i = this._scroll / this._currentElementSize;
    delete this._currentElementSize;
    this.setActiveIndex(i);

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

    this.refresh();
  }

  _saveLastState() {
    this._lastState = {
      elementSize: this._getCarouselItemSize(),
      carouselElementCount: this.itemCount,
      width: this._getCarouselItemSize() * this.itemCount
    };
  }

  /**
   * @return {Number}
   */
  _getCarouselItemSize() {
    const sizeAttr = this._getCarouselItemSizeAttr();
    const sizeInfo = this._decomposeSizeString(sizeAttr);
    const elementSize = this._getElementSize();

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
    const index = parseInt(this.getAttribute('initial-index'), 10);

    if (typeof index === 'number' && !isNaN(index)) {
      return Math.max(Math.min(index, this.itemCount - 1), 0);
    } else {
      return 0;
    }
  }

  /**
   * @return {String}
   */
  _getCarouselItemSizeAttr() {
    const attrName = 'item-' + (this._isVertical() ? 'height' : 'width');
    const itemSizeAttr = ('' + this.getAttribute(attrName)).trim();

    return itemSizeAttr.match(/^\d+(px|%)$/) ? itemSizeAttr : '100%';
  }

  /**
   * @return {Object}
   */
  _decomposeSizeString(size) {
    const matches = size.match(/^(\d+)(px|%)/);

    return {
      number: parseInt(matches[1], 10),
      unit: matches[2],
    };
  }

  _setupInitialIndex() {
    this._scroll = (this._offset || 0) + this._getCarouselItemSize() * this._getInitialIndex();
    this._lastActiveIndex = this._getInitialIndex();
    this._scrollTo(this._scroll);
  }

  /**
   * @method setActiveIndex
   * @signature setActiveIndex(index, [options])
   * @param {Number} index
   *   [en]The index that the carousel should be set to.[/en]
   *   [ja]carousel要素のインデックスを指定します。[/ja]
   * @param {Object} [options]
   *   [en]Parameter object.[/en]
   *   [ja][/ja]
   * @param {Function} [options.callback]
   *   [en]A function that will be called after the animation is finished.[/en]
   *   [ja][/ja]
   * @param {String} [options.animation]
   *   [en]If this attribute is set to `"none"` the transitions will not be animated.[/en]
   *   [ja][/ja]
   * @param {Object} [options.animationOptions]
   *   [en]An object that can be used to specify duration, delay and timing function of the animation.[/en]
   *   [ja][/ja]
   * @description
   *   [en]Specify the index of the `<ons-carousel-item>` to show.[/en]
   *   [ja]表示するons-carousel-itemをindexで指定します。[/ja]
   * @return {Promise}
   *   [en]Resolves to the carousel element.[/en]
   *   [ja][/ja]
   */
  setActiveIndex(index, options = {}) {
    if (options && typeof options != 'object') {
      throw new Error('options must be an object. You supplied ' + options);
    }

    options.animation = options.animation || this.getAttribute('animation');
    options.animationOptions = util.extend(
      { duration: 0.3, timing: 'cubic-bezier(.1, .7, .1, 1)' },
      options.animationOptions || {},
      this.hasAttribute('animation-options') ? util.animationOptionsParse(this.getAttribute('animation-options')) : {}
    );

    index = Math.max(0, Math.min(index, this.itemCount - 1));
    const scroll = (this._offset || 0) + this._getCarouselItemSize() * index;
    const max = this._calculateMaxScroll();

    this._scroll = Math.max(0, Math.min(max, scroll));
    return this._scrollTo(this._scroll, options).then(() => {
      this._tryFirePostChangeEvent();
      return this;
    });

  }

  /**
   * @method getActiveIndex
   * @signature getActiveIndex()
   * @return {Number}
   *   [en]The current carousel item index.[/en]
   *   [ja]現在表示しているカルーセル要素のインデックスが返されます。[/ja]
   * @description
   *   [en]Returns the index of the currently visible `<ons-carousel-item>`.[/en]
   *   [ja]現在表示されているons-carousel-item要素のインデックスを返します。[/ja]
   */
  getActiveIndex() {
    const scroll = this._scroll - (this._offset || 0);
    const count = this.itemCount;
    const size = this._getCarouselItemSize();

    if (scroll < 0) {
      return 0;
    }

    let i;
    for (i = 0; i < count; i++) {
      if (size * i <= scroll && size * (i + 1) > scroll) {
        return i;
      }
    }

    // max carousel index
    return i;
  }

  /**
   * @method next
   * @signature next([options])
   * @param {Object} [options]
   *   [en]Parameter object.[/en]
   *   [ja][/ja]
   * @param {Function} [options.callback]
   *   [en]A function that will be executed after the animation has finished.[/en]
   *   [ja][/ja]
   * @param {String} [options.animation]
   *   [en]If this attribute is set to `"none"` the transitions will not be animated.[/en]
   *   [ja][/ja]
   * @param {Object} [options.animationOptions]
   *   [en]An object that can be used to specify the duration, delay and timing function of the animation.[/en]
   *   [ja][/ja]
   * @return {Promise}
   *   [en]Resolves to the carousel element[/en]
   *   [ja][/ja]
   * @description
   *   [en]Show next `<ons-carousel-item>`.[/en]
   *   [ja]次のons-carousel-itemを表示します。[/ja]
   */
  next(options) {
    return this.setActiveIndex(this.getActiveIndex() + 1, options);
  }

  /**
   * @method prev
   * @signature prev([options])
   * @param {Object} [options]
   *   [en]Parameter object.[/en]
   *   [ja][/ja]
   * @param {Function} [options.callback]
   *   [en]A function that will be executed after the animation has finished.[/en]
   *   [ja][/ja]
   * @param {String} [options.animation]
   *   [en]If this attribute is set to `"none"` the transitions will not be animated.[/en]
   *   [ja][/ja]
   * @param {Object} [options.animationOptions]
   *   [en]An object that can be used to specify the duration, delay and timing function of the animation.[/en]
   *   [ja][/ja]
   * @return {Promise}
   *   [en]Resolves to the carousel element[/en]
   *   [ja][/ja]
   * @description
   *   [en]Show previous `<ons-carousel-item>`.[/en]
   *   [ja]前のons-carousel-itemを表示します。[/ja]
   */
  prev(options) {
    return this.setActiveIndex(this.getActiveIndex() - 1, options);
  }

  /**
   * @return {Boolean}
   */
  _isEnabledChangeEvent() {
    const elementSize = this._getElementSize();
    const carouselItemSize = this._getCarouselItemSize();

    return this.autoScroll && Math.abs(elementSize - carouselItemSize) < 0.5;
  }

  /**
   * @return {Boolean}
   */
  _isVertical() {
    return this.getAttribute('direction') === 'vertical';
  }

  _show() {
    window.addEventListener('resize', this._boundOnResize, true);
  }

  _prepareEventListeners() {
    this._gestureDetector = new GestureDetector(this, {
      dragMinDistance: 1,
      dragLockToAxis: true
    });
    this._mutationObserver = new MutationObserver(() => this.refresh());

    this._updateSwipeable();
    this._updateAutoRefresh();

    window.addEventListener('resize', this._boundOnResize, true);
  }

  _hide() {
    window.removeEventListener('resize', this._boundOnResize, true);
  }

  _removeEventListeners() {
    this._gestureDetector.dispose();
    this._gestureDetector = null;

    this._mutationObserver.disconnect();
    this._mutationObserver = null;

    window.removeEventListener('resize', this._boundOnResize, true);
  }

  _updateSwipeable() {
    if (this._gestureDetector) {
      if (this.swipeable) {
        this._gestureDetector.on('drag dragleft dragright dragup dragdown swipe swipeleft swiperight swipeup swipedown', this._boundOnDrag);
        this._gestureDetector.on('dragend', this._boundOnDragEnd);
      } else {
        this._gestureDetector.off('drag dragleft dragright dragup dragdown swipe swipeleft swiperight swipeup swipedown', this._boundOnDrag);
        this._gestureDetector.off('dragend', this._boundOnDragEnd);
      }
    }
  }

  _updateAutoRefresh() {
    if (this._mutationObserver) {
      if (this.hasAttribute('auto-refresh')) {
        this._mutationObserver.observe(this, {childList: true});
      } else {
        this._mutationObserver.disconnect();
      }
    }
  }

  _tryFirePostChangeEvent() {
    const currentIndex = this.getActiveIndex();

    if (this._lastActiveIndex !== currentIndex) {
      const lastActiveIndex = this._lastActiveIndex;
      this._lastActiveIndex = currentIndex;

      util.triggerElementEvent(this, 'postchange', {
        carousel: this,
        activeIndex: currentIndex,
        lastActiveIndex: lastActiveIndex
      });
    }
  }

  _isWrongDirection(d) {
    // this._lastDragDirection = d;
    return this._isVertical() ? (d === 'left' || d === 'right') : (d === 'up' || d === 'down');
  }

  _onDrag(event) {
    if (this._isWrongDirection(event.gesture.direction) || (event.target && event.target.tagName.toLowerCase() === 'input' && event.target.type === 'range')) {
      return;
    }

    event.stopPropagation();

    this._lastDragEvent = event;

    const scroll = this._scroll - this._getScrollDelta(event);
    this._scrollTo(scroll);
    event.gesture.preventDefault();

    this._tryFirePostChangeEvent();
  }

  _onDragEnd(event) {
    if (!this._lastDragEvent) {
      return;
    }
    this._currentElementSize = undefined;
    this._scroll = this._scroll - this._getScrollDelta(event);

    // if (!this._isWrongDirection(this._lastDragDirection) && this._getScrollDelta(event) !== 0) {
    //   event.stopPropagation();
    // }

    if (this._isOverScroll(this._scroll)) {
      let waitForAction = false;
      util.triggerElementEvent(this, 'overscroll', {
        carousel: this,
        activeIndex: this.getActiveIndex(),
        direction: this._getOverScrollDirection(),
        waitToReturn: (promise) => {
          waitForAction = true;
          promise.then(() => this._scrollToKillOverScroll());
        }
      });

      if (!waitForAction) {
        this._scrollToKillOverScroll();
      }
    } else {
      this._startMomentumScroll();
    }
    this._lastDragEvent = null;

    event.gesture.preventDefault();
  }

  /**
   * @param {Object} trait
   */
  _mixin(trait) {
    Object.keys(trait).forEach(function(key) {
      this[key] = trait[key];
    }.bind(this));
  }

  _startMomentumScroll() {
    if (this._lastDragEvent) {
      const velocity = this._getScrollVelocity(this._lastDragEvent);
      const duration = 0.3;
      const scrollDelta = duration * 100 * velocity;
      const scroll = this._normalizeScrollPosition(
        this._scroll + (this._getScrollDelta(this._lastDragEvent) > 0 ? -scrollDelta : scrollDelta)
      );

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
    const max = this._calculateMaxScroll();

    if (!this.autoScroll) {
      return Math.max(0, Math.min(max, scroll));
    }
    let arr = [];
    const size = this._getCarouselItemSize();
    const nbrOfItems = this.itemCount;

    for (let i = 0; i < nbrOfItems; i++) {
      if (i * size + this._offset < max) {
        arr.push(i * size + this._offset);
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

    const lastScroll = this._lastActiveIndex * size + this._offset;
    const scrollRatio = Math.abs(scroll - lastScroll) / size;
    let result = arr[0];

    if (scrollRatio <= this.autoScrollRatio) {
      result = lastScroll;
    } else if (scrollRatio < 1.0) {
      if (arr[0] === lastScroll && arr.length > 1) {
        result = arr[1];
      }
    }

    return Math.max(0, Math.min(max, result));
  }

  /**
   * @return {Array}
   */
  _getCarouselItemElements() {
    return util.arrayFrom(this.children)
      .filter((child) => child.nodeName.toLowerCase() === 'ons-carousel-item');
  }

  /**
   * @param {Number} scroll
   * @param {Object} [options]
   * @return {Promise} Resolves to the carousel element
   */
  _scrollTo(scroll, options = {}) {
    const isOverscrollable = this.overscrollable;

    const normalizeScroll = (scroll) => {
      const ratio = 0.35;

      if (scroll < 0) {
        return isOverscrollable ? Math.round(scroll * ratio) : 0;
      }

      const maxScroll = this._calculateMaxScroll();
      if (maxScroll < scroll) {
        return isOverscrollable ? maxScroll + Math.round((scroll - maxScroll) * ratio) : maxScroll;
      }

      return scroll;
    };

    return new Promise(resolve => {
      animit(this._getCarouselItemElements())
        .queue({
          transform: this._generateScrollTransform(normalizeScroll(scroll))
        }, options.animation  !== 'none' ? options.animationOptions : {})
        .play(() => {
          if (options.callback instanceof Function) {
            options.callback();
          }
          resolve();
        });
    });
  }

  _calculateMaxScroll() {
    const max = this.itemCount * this._getCarouselItemSize() - this._getElementSize();
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
      return this._scroll <= 0 ? 'up' : 'down';
    } else {
      return this._scroll <= 0 ? 'left' : 'right';
    }
  }

  _scrollToKillOverScroll() {
    const duration = 0.4;

    if (this._scroll < 0) {
      animit(this._getCarouselItemElements())
        .queue({
          transform: this._generateScrollTransform(0)
        }, {
          duration: duration,
          timing: 'cubic-bezier(.1, .4, .1, 1)'
        })
        .queue(function(done) {
          done();
          this._tryFirePostChangeEvent();
        }.bind(this))
        .play();
      this._scroll = 0;
      return;
    }

    const maxScroll = this._calculateMaxScroll();

    if (maxScroll < this._scroll) {
      animit(this._getCarouselItemElements())
        .queue({
          transform: this._generateScrollTransform(maxScroll)
        }, {
          duration: duration,
          timing: 'cubic-bezier(.1, .4, .1, 1)'
        })
        .queue(function(done) {
          done();
          this._tryFirePostChangeEvent();
        }.bind(this))
        .play();
      this._scroll = maxScroll;
      return;
    }

    return;
  }

  /**
   * @property itemCount
   * @readonly
   * @type {Number}
   * @description
   *   [en]The number of carousel items.[/en]
   *   [ja]カルーセル要素の数です。[/ja]
   */
  get itemCount() {
    return this._getCarouselItemElements().length;
  }

  /**
   * @method refresh
   * @signature refresh()
   * @description
   *   [en]Update the layout of the carousel. Used when adding `<ons-carousel-items>` dynamically or to automatically adjust the size.[/en]
   *   [ja]レイアウトや内部の状態を最新のものに更新します。ons-carousel-itemを動的に増やしたり、ons-carouselの大きさを動的に変える際に利用します。[/ja]
   */
  refresh() {
    // Bug fix
    if (this._getCarouselItemSize() === 0) {
      return;
    }

    this._mixin(this._isVertical() ? VerticalModeTrait : HorizontalModeTrait);
    this._setup();

    if (this._lastState && this._lastState.width > 0) {
      let scroll = this._scroll;// - this._offset;

      if (this._isOverScroll(scroll)) {
        this._scrollToKillOverScroll();
      } else {
        if (this.autoScroll) {
          scroll = this._normalizeScrollPosition(scroll);
        }

        this._scrollTo(scroll);
      }
    }

    this._saveLastState();

    util.triggerElementEvent(this, 'refresh', {carousel: this});
  }

  /**
   * @method first
   * @signature first()
   * @param {Object} [options]
   *   [en]Parameter object.[/en]
   *   [ja][/ja]
   * @param {Function} [options.callback]
   *   [en]A function that will be executed after the animation has finished.[/en]
   *   [ja][/ja]
   * @param {String} [options.animation]
   *   [en]If this is set to `"none"`, the transitions will not be animated.[/en]
   *   [ja][/ja]
   * @param {Object} [options.animationOptions]
   *   [en]An object that can be used to specify the duration, delay and timing function of the animation.[/en]
   *   [ja][/ja]
   * @return {Promise}
   *   [en]Resolves to the carousel element[/en]
   *   [ja][/ja]
   * @description
   *   [en]Show first `<ons-carousel-item>`.[/en]
   *   [ja]最初のons-carousel-itemを表示します。[/ja]
   */
  first(options) {
    return this.setActiveIndex(0, options);
  }

  /**
   * @method last
   * @signature last()
   * @param {Object} [options]
   *   [en]Parameter object.[/en]
   *   [ja][/ja]
   * @param {Function} [options.callback]
   *   [en]A function that will be executed after the animation has finished.[/en]
   *   [ja][/ja]
   * @param {String} [options.animation]
   *   [en]If this attribute is set to `"none"` the transitions will not be animated.[/en]
   *   [ja][/ja]
   * @param {Object} [options.animationOptions]
   *   [en]An object that can be used to specify the duration, delay and timing function of the animation.[/en]
   *   [ja][/ja]
   * @return {Promise}
   *   [en]Resolves to the carousel element[/en]
   *   [ja]Resolves to the carousel element[/ja]
   * @description
   *   [en]Show last ons-carousel item.[/en]
   *   [ja]最後のons-carousel-itemを表示します。[/ja]
   */
  last(options) {
    this.setActiveIndex(
      Math.max(this.itemCount - 1, 0), options
    );
  }

  connectedCallback() {
    this._prepareEventListeners();

    this._setup();
    this._setupInitialIndex();

    this._saveLastState();

    // Fix rendering glitch on Android 4.1
    if (this.offsetHeight === 0) {
      setImmediate(() => this.refresh());
    }
  }

  static get observedAttributes() {
    return ['swipeable', 'auto-refresh', 'direction'];
  }

  attributeChangedCallback(name, last, current) {
    switch (name) {
      case 'swipeable':
        this._updateSwipeable();
        break;
      case 'auto-refresh':
        this._updateAutoRefresh();
        break;
      case 'direction':
        this._onDirectionChange();
    }
  }

  disconnectedCallback() {
    this._removeEventListeners();
  }

  /**
   * @property autoScrollRatio
   * @type {Number}
   * @description
   *   [en]The current auto scroll ratio. [/en]
   *   [ja]現在のオートスクロールのratio値。[/ja]
   */
  get autoScrollRatio() {
    const attr = this.getAttribute('auto-scroll-ratio');

    if (!attr) {
      return 0.5;
    }

    const scrollRatio = parseFloat(attr);
    if (scrollRatio < 0.0 || scrollRatio > 1.0) {
      throw new Error('Invalid ratio.');
    }

    return isNaN(scrollRatio) ? 0.5 : scrollRatio;
  }

  set autoScrollRatio(ratio) {
    if (ratio < 0.0 || ratio > 1.0) {
      throw new Error('Invalid ratio.');
    }

    this.setAttribute('auto-scroll-ratio', ratio);
  }

  /**
   * @property swipeable
   * @type {Boolean}
   * @description
   *   [en]true if the carousel is swipeable.[/en]
   *   [ja]swipeableであればtrueを返します。[/ja]
   */
  get swipeable() {
    return this.hasAttribute('swipeable');
  }

  set swipeable(value) {
    return util.toggleAttribute(this, 'swipeable', value);
  }

  /**
   * @property autoScroll
   * @type {Boolean}
   * @description
   *   [en]true if auto scroll is enabled.[/en]
   *   [ja]オートスクロールが有効であればtrueを返します。[/ja]
   */
  get autoScroll() {
    return this.hasAttribute('auto-scroll');
  }

  set autoScroll(value) {
    return util.toggleAttribute(this, 'auto-scroll', value);
  }

  /**
   * @property disabled
   * @type {Boolean}
   * @description
   *   [en]Whether the carousel is disabled or not.[/en]
   *   [ja]無効化されている場合に`true`。[/ja]
   */
  get disabled() {
    return this.hasAttribute('disabled');
  }

  set disabled(value) {
    return util.toggleAttribute(this, 'disabled', value);
  }

  /**
   * @property overscrollable
   * @type {Boolean}
   * @description
   *   [en]Whether the carousel is overscrollable or not.[/en]
   *   [ja]overscrollできればtrueを返します。[/ja]
   */
  get overscrollable() {
    return this.hasAttribute('overscrollable');
  }

  set overscrollable(value) {
    return util.toggleAttribute(this, 'overscrollable', value);
  }

  /**
   * @property centered
   * @type {Boolean}
   * @description
   *   [en]Whether the carousel is centered or not.[/en]
   *   [ja]centered状態になっていればtrueを返します。[/ja]
   */
  get centered() {
    return this.hasAttribute('centered');
  }

  set centered(value) {
    return util.toggleAttribute(this, 'centered', value);
  }

  static get events() {
    return ['postchange', 'refresh', 'overscroll'];
  }
}

customElements.define('ons-carousel', CarouselElement);
