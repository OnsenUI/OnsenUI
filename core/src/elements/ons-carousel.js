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
import contentReady from '../ons/content-ready';
import Swiper from '../ons/internal/swiper';

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
   * @default 0
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

    contentReady(this, () => this._compile());
  }

  _compile() {
    const target = this.children[0] && this.children[0].tagName !== 'ONS-CAROUSEL-ITEM' && this.children[0] || document.createElement('div');
    if (!target.parentNode) {
      while (this.firstChild) {
        target.appendChild(this.firstChild);
      }
      this.appendChild(target);
    }

    !this.children[1] && this.appendChild(document.createElement('div'));

    this.appendChild = this.appendChild.bind(target);
    this.insertBefore = this.insertBefore.bind(target);
  }

  connectedCallback() {
    if (!this._swiper) {
      this._swiper = new Swiper({
        getElement: () => this,
        getInitialIndex: () => this.getAttribute('initial-index'),
        getAutoScrollRatio: () => this.autoScrollRatio,
        isVertical: () => this.vertical,
        isOverScrollable: () => this.overscrollable,
        isCentered: () => this.centered,
        isAutoScrollable: () => this.autoScroll,
        itemSize: this.itemSize,
        overScrollHook: this._onOverScroll.bind(this),
        preChangeHook: this._onChange.bind(this, 'prechange'),
        postChangeHook: this._onChange.bind(this, 'postchange'),
        refreshHook: this._onRefresh.bind(this),
        scrollHook: this._onSwipe
      });

      contentReady(this, () => this._swiper.init({
        swipeable: this.hasAttribute('swipeable'),
        autoRefresh: this.hasAttribute('auto-refresh')
      }));
    }
  }

  disconnectedCallback() {
    if (this._swiper && this._swiper.initialized) {
      this._swiper.dispose();
      this._swiper = null;
    }
  }

  static get observedAttributes() {
    return ['swipeable', 'auto-refresh', 'direction', 'item-height', 'item-width'];
  }

  attributeChangedCallback(name, last, current) {
    if (!this._swiper) {
      return;
    }

    switch (name) {
      case 'swipeable':
        this._swiper.updateSwipeable(this.hasAttribute('swipeable'));
        break;
      case 'auto-refresh':
        this._swiper.updateAutoRefresh(this.hasAttribute('auto-refresh'));
        break;
      case 'item-height':
        this.vertical && this._swiper.updateItemSize(this.itemSize);
        break;
      case 'item-width':
        this.vertical || this._swiper.updateItemSize(this.itemSize);
        break;
      case 'direction':
        this._swiper.refresh();
    }
  }

  _show() {
    this._swiper.resizeOn();
  }

  _hide() {
    this._swiper.resizeOff();
  }

  _onOverScroll({ direction, killOverScroll }) {
    let waitForAction = false;
    util.triggerElementEvent(this, 'overscroll', {
      carousel: this,
      activeIndex: this.getActiveIndex(),
      direction,
      waitToReturn: promise => {
        waitForAction = true;
        promise.then(killOverScroll);
      }
    });

    return waitForAction;
  }

  _onChange(eventName, { activeIndex, lastActiveIndex }) {
    util.triggerElementEvent(this, eventName, { carousel: this, activeIndex, lastActiveIndex });
  }

  _onRefresh() {
    util.triggerElementEvent(this, 'refresh', { carousel: this });
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
      { duration: .3, timing: 'cubic-bezier(.4, .7, .5, 1)' },
      options.animationOptions || {},
      this.hasAttribute('animation-options') ? util.animationOptionsParse(this.getAttribute('animation-options')) : {}
    );

    return this._swiper.setActiveIndex(index, options)
      .then(() => {
        options.callback instanceof Function && options.callback(this);
        return Promise.resolve(this);
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
    return this._swiper.getActiveIndex();
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
    this.setActiveIndex(Math.max(this.itemCount - 1, 0), options);
  }

  /**
   * @method refresh
   * @signature refresh()
   * @description
   *   [en]Update the layout of the carousel. Used when adding `<ons-carousel-items>` dynamically or to automatically adjust the size.[/en]
   *   [ja]レイアウトや内部の状態を最新のものに更新します。ons-carousel-itemを動的に増やしたり、ons-carouselの大きさを動的に変える際に利用します。[/ja]
   */
  refresh() {
    this._swiper.refresh();
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
    return this._swiper.itemCount;
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
   * @property onSwipe
   * @type {Function}
   * @description
   *   [en]Hook called whenever the user slides the carousel. It gets a decimal index and an animationOptions object as arguments.[/en]
   *   [ja][/ja]
   */
  get onSwipe() {
    return this._onSwipe;
  }

  set onSwipe(value) {
    if (value && !(value instanceof Function)) {
      throw new Error(`'onSwipe' must be a function.`)
    }
    this._onSwipe = value;
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

  get vertical() {
    return this.getAttribute('direction') === 'vertical';
  }

  get itemSize() {
    const itemSizeAttr = (this.getAttribute(`item-${this.vertical ? 'height' : 'width'}`) || '').trim();
    return itemSizeAttr.match(/^\d+(px|%)$/) ? itemSizeAttr : '100%';
  }

  /**
   * @property autoScrollRatio
   * @type {Number}
   * @description
   *   [en]The current auto scroll ratio. [/en]
   *   [ja]現在のオートスクロールのratio値。[/ja]
   */
  get autoScrollRatio() {
    return parseFloat(this.getAttribute('auto-scroll-ratio'));
  }

  set autoScrollRatio(ratio) {
    this.setAttribute('auto-scroll-ratio', ratio);
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
