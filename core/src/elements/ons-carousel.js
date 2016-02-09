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

import util from 'ons/util';
import ModifierUtil from 'ons/internal/modifier-util';
import BaseElement from 'ons/base-element';
import GestureDetector from 'ons/gesture-detector';
import DoorLock from 'ons/doorlock';

const scheme = {'': 'carousel--*'};

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

  _layoutCarouselItems: function() {
    const children = this._getCarouselItemElements();

    const sizeAttr = this._getCarouselItemSizeAttr();
    const sizeInfo = this._decomposeSizeString(sizeAttr);

    const computedStyle = window.getComputedStyle(this);
    const totalWidth = this.getBoundingClientRect().width || 0;
    const finalWidth = totalWidth - parseInt(computedStyle.paddingLeft, 10) - parseInt(computedStyle.paddingRight, 10);

    for (let i = 0; i < children.length; i++) {
      children[i].style.position = 'absolute';
      children[i].style.height = sizeAttr;
      children[i].style.width = finalWidth + 'px';
      children[i].style.visibility = 'visible';
      children[i].style.top = (i * sizeInfo.number) + sizeInfo.unit;
    }
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

  _layoutCarouselItems: function() {
    const children = this._getCarouselItemElements();

    const sizeAttr = this._getCarouselItemSizeAttr();
    const sizeInfo = this._decomposeSizeString(sizeAttr);

    const computedStyle = window.getComputedStyle(this);
    const totalHeight = this.getBoundingClientRect().height || 0;
    const finalHeight = totalHeight - parseInt(computedStyle.paddingTop, 10) - parseInt(computedStyle.paddingBottom, 10);

    for (let i = 0; i < children.length; i++) {
      children[i].style.position = 'absolute';
      children[i].style.height = finalHeight + 'px';
      children[i].style.width = sizeAttr;
      children[i].style.visibility = 'visible';
      children[i].style.left = (i * sizeInfo.number) + sizeInfo.unit;
    }
  }
};

/**
 * @element ons-carousel
 * @category carousel
 * @description
 *   [en]Carousel component.[/en]
 *   [ja]カルーセルを表示できるコンポーネント。[/ja]
 * @codepen xbbzOQ
 * @guide UsingCarousel
 *   [en]Learn how to use the carousel component.[/en]
 *   [ja]carouselコンポーネントの使い方[/ja]
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
class CarouselElement extends BaseElement {

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

    this.refresh();
  }

  _saveLastState() {
    this._lastState = {
      elementSize: this._getCarouselItemSize(),
      carouselElementCount: this.getCarouselItemCount(),
      width: this._getCarouselItemSize() * this.getCarouselItemCount()
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
      return Math.max(Math.min(index, this.getCarouselItemCount() - 1), 0);
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
    this._scroll = this._getCarouselItemSize() * this._getInitialIndex();
    this._lastActiveIndex = this._getInitialIndex();
    this._scrollTo(this._scroll);
  }

  /**
   * @method setSwipeable
   * @signature setSwipeable(swipeable)
   * @param {Boolean} swipeable
   *   [en]If value is true the carousel will be swipeable.[/en]
   *   [ja]swipeableにする場合にはtrueを指定します。[/ja]
   * @description
   *   [en]Set whether the carousel is swipeable or not.[/en]
   *   [ja]swipeできるかどうかを指定します。[/ja]
   */
  setSwipeable(swipeable) {
    if (swipeable) {
      this.setAttribute('swipeable', '');
    } else {
      this.removeAttribute('swipeable');
    }
  }

  /**
   * @method isSwipeable
   * @signature isSwipeable()
   * @return {Boolean}
   *   [en]true if the carousel is swipeable.[/en]
   *   [ja]swipeableであればtrueを返します。[/ja]
   * @description
   *   [en]Returns whether the carousel is swipeable or not.[/en]
   *   [ja]swipeable属性があるかどうかを返します。[/ja]
   */
  isSwipeable() {
    return this.hasAttribute('swipeable');
  }

  /**
   * @method setAutoScrollRatio
   * @signature setAutoScrollRatio(ratio)
   * @param {Number} ratio
   *   [en]The desired ratio.[/en]
   *   [ja]オートスクロールするのに必要な0.0から1.0までのratio値を指定します。[/ja]
   * @description
   *   [en]Set the auto scroll ratio. Must be a value between 0.0 and 1.0.[/en]
   *   [ja]オートスクロールするのに必要なratio値を指定します。0.0から1.0を必ず指定しなければならない。[/ja]
   */
  setAutoScrollRatio(ratio) {
    if (ratio < 0.0 || ratio > 1.0) {
      throw new Error('Invalid ratio.');
    }

    this.setAttribute('auto-scroll-ratio', ratio);
  }

  /**
   * @method getAutoScrollRatio
   * @signature getAutoScrollRatio()
   * @return {Number}
   *   [en]The current auto scroll ratio.[/en]
   *   [ja]現在のオートスクロールのratio値。[/ja]
   * @description
   *   [en]Returns the current auto scroll ratio.[/en]
   *   [ja]現在のオートスクロールのratio値を返します。[/ja]
   */
  getAutoScrollRatio() {
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

  /**
   * @method setActiveCarouselItemIndex
   * @signature setActiveCarouselItemIndex(index, [options])
   * @param {Number} index
   *   [en]The index that the carousel should be set to.[/en]
   *   [ja]carousel要素のインデックスを指定します。[/ja]
   * @param {Object} [options]
   *   [en][/en]
   *   [ja][/ja]
   * @param {Function} [options.callback]
   *   [en][/en]
   *   [ja][/ja]
   * @param {String} [options.animation]
   *   [en][/en]
   *   [ja][/ja]
   * @description
   *   [en]Specify the index of the ons-carousel-item to show.[/en]
   *   [ja]表示するons-carousel-itemをindexで指定します。[/ja]
   * @param {Object} [options.animationOptions]
   * @return {Promise} Resolves to the carousel element
>>>>>>> master
   */
  setActiveCarouselItemIndex(index, options = {}) {

    if (options && typeof options != 'object') {
      throw new Error('options must be an object. You supplied ' + options);
    }

    options.animationOptions = util.extend(
      { duration: 0.3, timing: 'cubic-bezier(.1, .7, .1, 1)' },
      options.animationOptions || {},
      this.hasAttribute('animation-options') ? util.animationOptionsParse(this.getAttribute('animation-options')) : {}
    );

    index = Math.max(0, Math.min(index, this.getCarouselItemCount() - 1));
    const scroll = this._getCarouselItemSize() * index;
    const max = this._calculateMaxScroll();

    this._scroll = Math.max(0, Math.min(max, scroll));
    return this._scrollTo(this._scroll, options).then(() => {
      this._tryFirePostChangeEvent();
      return this;
    });

  }

  /**
   * @method getActiveCarouselItemIndex
   * @signature getActiveCarouselItemIndex()
   * @return {Number}
   *   [en]The current carousel item index.[/en]
   *   [ja]現在表示しているカルーセル要素のインデックスが返されます。[/ja]
   * @description
   *   [en]Returns the index of the currently visible ons-carousel-item.[/en]
   *   [ja]現在表示されているons-carousel-item要素のインデックスを返します。[/ja]
   */
  getActiveCarouselItemIndex() {
    const scroll = this._scroll;
    const count = this.getCarouselItemCount();
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
   *   [en][/en]
   *   [ja][/ja]
   * @param {Function} [options.callback]
   *   [en][/en]
   *   [ja][/ja]
   * @param {String} [options.animation]
   *   [en][/en]
   *   [ja][/ja]
   * @param {Object} [options.animationOptions]
   *   [en][/en]
   *   [ja][/ja]
   * @return {Promise}
   *   [en]Resolves to the carousel element[/en]
   *   [ja][/ja]
   * @description
   *   [en]Show next ons-carousel item.[/en]
   *   [ja]次のons-carousel-itemを表示します。[/ja]
   */
  next(options) {
    return this.setActiveCarouselItemIndex(this.getActiveCarouselItemIndex() + 1, options);
  }

  /**
   * @method prev
   * @signature prev([options])
   * @param {Object} [options]
   *   [en][/en]
   *   [ja][/ja]
   * @param {Function} [options.callback]
   *   [en][/en]
   *   [ja][/ja]
   * @param {String} [options.animation]
   *   [en][/en]
   *   [ja][/ja]
   * @param {Object} [options.animationOptions]
   *   [en][/en]
   *   [ja][/ja]
   * @return {Promise}
   *   [en]Resolves to the carousel element[/en]
   *   [ja][/ja]
   * @description
   *   [en]Show previous ons-carousel item.[/en]
   *   [ja]前のons-carousel-itemを表示します。[/ja]
   */
  prev(options) {
    return this.setActiveCarouselItemIndex(this.getActiveCarouselItemIndex() - 1, options);
  }

  /**
   * @method setAutoScrollEnabled
   * @signature setAutoScrollEnabled(enabled)
   * @param {Boolean} enabled
   *   [en]If true auto scroll will be enabled.[/en]
   *   [ja]オートスクロールを有効にする場合にはtrueを渡します。[/ja]
   * @description
   *   [en]Enable or disable "auto-scroll" attribute.[/en]
   *   [ja]auto-scroll属性があるかどうかを設定します。[/ja]
   */
  setAutoScrollEnabled(enabled) {
    if (enabled) {
      this.setAttribute('auto-scroll', '');
    } else {
      this.removeAttribute('auto-scroll');
    }
  }

  /**
   * @method isAutoScrollEnabled
   * @signature isAutoScrollEnabled()
   * @return {Boolean}
   *   [en]true if auto scroll is enabled.[/en]
   *   [ja]オートスクロールが有効であればtrueを返します。[/ja]
   * @description
   *   [en]Returns whether the "auto-scroll" attribute is set or not.[/en]
   *   [ja]auto-scroll属性があるかどうかを返します。[/ja]
   */
  isAutoScrollEnabled() {
    return this.hasAttribute('auto-scroll');
  }

  /**
   * @method setDisabled
   * @signature setDisabled(disabled)
   * @param {Boolean} disabled
   *   [en]If true the carousel will be disabled.[/en]
   *   [ja]disabled状態にする場合にはtrueを指定します。[/ja]
   * @description
   *   [en]Disable or enable the dialog.[/en]
   *   [ja]disabled属性があるかどうかを設定します。[/ja]
   */
  setDisabled(disabled) {
    if (disabled) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  /**
   * @method isDisabled
   * @signature isDisabled()
   * @return {Boolean}
   *   [en]Whether the carousel is disabled or not.[/en]
   *   [ja]disabled状態になっていればtrueを返します。[/ja]
   * @description
   *   [en]Returns whether the dialog is disabled or enabled.[/en]
   *   [ja]disabled属性があるかどうかを返します。[/ja]
   */
  isDisabled() {
    return this.hasAttribute('disabled');
  }

  /**
   * @method setOverscrollable
   * @signature setOverscrollable(overscrollable)
   * @param {Boolean} overscrollable
   *   [en]If true the carousel will be overscrollable.[/en]
   *   [ja]overscrollできるかどうかを指定します。[/ja]
   * @description
   *   [en]Set whether the carousel is overscrollable or not.[/en]
   *   [ja]overscroll属性があるかどうかを設定します。[/ja]
   */
  setOverscrollable(scrollable) {
    if (scrollable) {
      this.setAttribute('overscrollable', '');
    } else {
      this.removeAttribute('overscrollable');
    }
  }

  /**
   * @method isOverscrollable
   * @signature isOverscrollable()
   * @return {Boolean}
   *   [en]Whether the carousel is overscrollable or not.[/en]
   *   [ja]overscrollできればtrueを返します。[/ja]
   * @description
   *   [en]Returns whether the carousel is overscrollable or not.[/en]
   *   [ja]overscroll属性があるかどうかを返します。[/ja]
   */
  isOverscrollable() {
    return this.hasAttribute('overscrollable');
  }

  /**
   * @return {Boolean}
   */
  _isEnabledChangeEvent() {
    const elementSize = this._getElementSize();
    const carouselItemSize = this._getCarouselItemSize();

    return this.isAutoScrollEnabled() && elementSize === carouselItemSize;
  }

  /**
   * @return {Boolean}
   */
  _isVertical() {
    return this.getAttribute('direction') === 'vertical';
  }

  _prepareEventListeners() {
    this._gestureDetector = new GestureDetector(this, {
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
    const currentIndex = this.getActiveCarouselItemIndex();

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

  _onDrag(event) {
    if (!this.isSwipeable()) {
      return;
    }

    const direction = event.gesture.direction;
    if ((this._isVertical() && (direction === 'left' || direction === 'right')) || (!this._isVertical() && (direction === 'up' || direction === 'down'))) {
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
    this._currentElementSize = undefined;

    if (!this.isSwipeable()) {
      return;
    }

    this._scroll = this._scroll - this._getScrollDelta(event);

    if (this._getScrollDelta(event) !== 0) {
      event.stopPropagation();
    }

    if (this._isOverScroll(this._scroll)) {
      let waitForAction = false;
      util.triggerElementEvent(this, 'overscroll', {
        carousel: this,
        activeIndex: this.getActiveCarouselItemIndex(),
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

    if (this.isAutoScrollEnabled()) {
      let arr = [];
      const size = this._getCarouselItemSize();
      const nbrOfItems = this.getCarouselItemCount();

      for (let i = 0; i < nbrOfItems; i++) {
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

      const lastScroll = this._lastActiveIndex * size;
      const scrollRatio = Math.abs(scroll - lastScroll) / size;

      if (scrollRatio <= this.getAutoScrollRatio()) {
        return lastScroll;
      } else if (scrollRatio > this.getAutoScrollRatio() && scrollRatio < 1.0) {
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
    return util.arrayFrom(this.children)
      .filter((child) => child.nodeName.toLowerCase() === 'ons-carousel-item');
  }

  /**
   * @param {Number} scroll
   * @param {Object} [options]
   * @return {Promise} Resolves to the carousel element
   */
  _scrollTo(scroll, options = {}) {
    const isOverscrollable = this.isOverscrollable();

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
    const max = this.getCarouselItemCount() * this._getCarouselItemSize() - this._getElementSize();
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
   * @method getCarouselItemCount
   * @signature getCarouselItemCount)
   * @return {Number}
   *   [en]The number of carousel items.[/en]
   *   [ja]カルーセル要素の数です。[/ja]
   * @description
   *   [en]Returns the current number of carousel items..[/en]
   *   [ja]現在のカルーセル要素を数を返します。[/ja]
   */
  getCarouselItemCount() {
    return this._getCarouselItemElements().length;
  }

  /**
   * @method refresh
   * @signature refresh()
   * @description
   *   [en]Update the layout of the carousel. Used when adding ons-carousel-items dynamically or to automatically adjust the size.[/en]
   *   [ja]レイアウトや内部の状態を最新のものに更新します。ons-carousel-itemを動的に増やしたり、ons-carouselの大きさを動的に変える際に利用します。[/ja]
 */
  refresh() {
    // Bug fix
    if (this._getCarouselItemSize() === 0) {
      return;
    }

    this._mixin(this._isVertical() ? VerticalModeTrait : HorizontalModeTrait);
    this._layoutCarouselItems();

    if (this._lastState && this._lastState.width > 0) {
      let scroll = this._scroll;

      if (this._isOverScroll(scroll)) {
        this._scrollToKillOverScroll();
      } else {
        if (this.isAutoScrollEnabled()) {
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
   * @return {Promise}
   *   [en]Resolves to the carousel element[/en]
   *   [ja][/ja]
   * @description
   *   [en]Show first ons-carousel item.[/en]
   *   [ja]最初のons-carousel-itemを表示します。[/ja]
   */
  first(options) {
    return this.setActiveCarouselItemIndex(0, options);
  }

  /**
   * @method last
   * @signature last()
   * @return {Promise}
   *   [en]Resolves to the carousel element[/en]
   *   [ja]Resolves to the carousel element[/ja]
   * @description
   *   [en]Show last ons-carousel item.[/en]
   *   [ja]最後のons-carousel-itemを表示します。[/ja]
   */
  last(options) {
    this.setActiveCarouselItemIndex(
      Math.max(this.getCarouselItemCount() - 1, 0), options
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
    } else if (name === 'direction') {
      this._onDirectionChange();
    }
  }

  detachedCallback() {
    this._removeEventListeners();
  }
}

window.OnsCarouselElement = document.registerElement('ons-carousel', {
  prototype: CarouselElement.prototype
});
