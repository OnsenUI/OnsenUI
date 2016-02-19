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

const STATE_INITIAL = 'initial';
const STATE_PREACTION = 'preaction';
const STATE_ACTION = 'action';

/**
 * @element ons-pull-hook
 * @category control
 * @description
 *   [en]Component that adds "pull-to-refresh" to an <ons-page> element.[/en]
 *   [ja]ons-page要素以下でいわゆるpull to refreshを実装するためのコンポーネントです。[/ja]
 * @codepen WbJogM
 * @guide UsingPullHook
 *   [en]How to use Pull Hook[/en]
 *   [ja]プルフックを使う[/ja]
 * @example
 *   TODO
 */
class PullHookElement extends BaseElement {

  /**
   * @event changestate
   * @description
   *   [en]Fired when the state is changed. The state can be either "initial", "preaction" or "action".[/en]
   *   [ja]コンポーネントの状態が変わった場合に発火します。状態は、"initial", "preaction", "action"のいずれかです。[/ja]
   * @param {Object} event
   *   [en]Event object.[/en]
   *   [ja]イベントオブジェクト。[/ja]
   * @param {Object} event.pullHook
   *   [en]Component object.[/en]
   *   [ja]コンポーネントのオブジェクト。[/ja]
   * @param {String} event.state
   *   [en]Current state.[/en]
   *   [ja]現在の状態名を参照できます。[/ja]
   */

  /**
   * @attribute disabled
   * @description
   *   [en]If this attribute is set the "pull-to-refresh" functionality is disabled.[/en]
   *   [ja]この属性がある時、disabled状態になりアクションが実行されなくなります[/ja]
   */

  /**
   * @attribute height
   * @type {String}
   * @description
   *   [en]Specify the height of the component. When pulled down further than this value it will switch to the "preaction" state. The default value is "64px".[/en]
   *   [ja]コンポーネントの高さを指定します。この高さ以上にpull downすると"preaction"状態に移行します。デフォルトの値は"64px"です。[/ja]
   */

  /**
   * @attribute threshold-height
   * @type {String}
   * @description
   *   [en]Specify the threshold height. The component automatically switches to the "action" state when pulled further than this value. The default value is "96px". A negative value or a value less than the height will disable this property.[/en]
   *   [ja]閾値となる高さを指定します。この値で指定した高さよりもpull downすると、このコンポーネントは自動的に"action"状態に移行します。[/ja]
   */

  /**
   * @attribute fixed-content
   * @description
   *   [en]If this attribute is set the content of the page will not move when pulling.[/en]
   *   [ja]この属性がある時、プルフックが引き出されている時にもコンテンツは動きません。[/ja]
   */

  createdCallback() {
    if (!this.hasAttribute('_compiled')) {
      this._scrollElement = this._createScrollElement();
      this.setAttribute('_compiled', '');
    } else {
      this._scrollElement = this.parentElement;
    }

    this._pageElement = this._scrollElement.parentElement;

    if (!this._pageElement.classList.contains('page__content') && !this._pageElement.classList.contains('ons-scroller__content')) {
      throw new Error('<ons-pull-hook> must be a direct descendant of an <ons-page> or an <ons-scroller> element.');
    }

    this._boundOnDrag = this._onDrag.bind(this);
    this._boundOnDragStart = this._onDragStart.bind(this);
    this._boundOnDragEnd = this._onDragEnd.bind(this);
    this._boundOnScroll = this._onScroll.bind(this);

    this._currentTranslation = 0;

    this._setState(STATE_INITIAL, true);
    this._setStyle();
  }

  _createScrollElement() {
    const scrollElement = util.createElement('<div class="scroll"><div>');

    const pageElement = this.parentElement;

    scrollElement.appendChild(this);
    while (pageElement.firstChild) {
      scrollElement.appendChild(pageElement.firstChild);
    }
    pageElement.appendChild(scrollElement);

    return scrollElement;
  }

  _setStyle() {
    const height = this.getHeight();

    this.style.top = '-' + height + 'px';
    this.style.height = height + 'px';
    this.style.lineHeight = height + 'px';
  }

  _onScroll(event) {
    const element = this._pageElement;

    if (element.scrollTop < 0) {
      element.scrollTop = 0;
    }
  }

  _generateTranslationTransform(scroll) {
    return 'translate3d(0px, ' + scroll + 'px, 0px)';
  }

  _onDrag(event) {
    if (this.isDisabled()) {
      return;
    }

    // Ignore when dragging left and right.
    if (event.gesture.direction === 'left' || event.gesture.direction === 'right') {
      return;
    }

    // Hack to make it work on Android 4.4 WebView. Scrolls manually near the top of the page so
    // there will be no inertial scroll when scrolling down. Allowing default scrolling will
    // kill all 'touchmove' events.
    const element = this._pageElement;
    element.scrollTop = this._startScroll - event.gesture.deltaY;
    if (element.scrollTop < window.innerHeight && event.gesture.direction !== 'up') {
      event.gesture.preventDefault();
    }

    if (this._currentTranslation === 0 && this._getCurrentScroll() === 0) {
      this._transitionDragLength = event.gesture.deltaY;

      const direction = event.gesture.interimDirection;
      if (direction === 'down') {
        this._transitionDragLength -= 1;
      } else {
        this._transitionDragLength += 1;
      }
    }

    const scroll = Math.max(event.gesture.deltaY - this._startScroll, 0);

    if (this._thresholdHeightEnabled() && scroll >= this.getThresholdHeight()) {
      event.gesture.stopDetect();

      setImmediate(() => {
        this._setState(STATE_ACTION);
        this._translateTo(this.getHeight(), {animate: true});

        this._waitForAction(this._onDone.bind(this));
      });
    } else if (scroll >= this.getHeight()) {
      this._setState(STATE_PREACTION);
    } else {
      this._setState(STATE_INITIAL);
    }

    event.stopPropagation();
    this._translateTo(scroll);
  }

  _onDragStart(event) {
    if (this.isDisabled()) {
      return;
    }

    this._startScroll = this._getCurrentScroll();
  }

  _onDragEnd(event) {
    if (this.isDisabled()) {
      return;
    }

    if (this._currentTranslation > 0) {
      const scroll = this._currentTranslation;

      if (scroll > this.getHeight()) {
        this._setState(STATE_ACTION);

        this._translateTo(this.getHeight(), {animate: true});

        this._waitForAction(this._onDone.bind(this));
      } else {
        this._translateTo(0, {animate: true});
      }
    }
  }

  /**
   * @param {Function} callback
   */
  setActionCallback(callback) {
    this._callback = callback;
  }

  _waitForAction(done) {
    if (this._callback instanceof Function) {
      this._callback.call(null, done);
    } else {
      done();
    }

  }

  _onDone(done) {
    // Check if the pull hook still exists.
    this._translateTo(0, {animate: true});
    this._setState(STATE_INITIAL);
  }

  /**
   * @method getHeight
   * @signature getHeight()
   * @return {Number}
   * @description
   *   [en]Returns the height of the pull hook in pixels.[/en]
   *   [ja]プルフックの高さをピクセル数で返します。[/ja]
   */
  getHeight() {
    return parseInt(this.getAttribute('height') || '64', 10);
  }

  /**
   * @method setHeight
   * @signature setHeight(height)
   * @param {Number} height
   *   [en]Desired height.[/en]
   *   [ja]要素の高さを指定します。[/ja]
   * @description
   *   [en]Specify the height.[/en]
   *   [ja]高さを指定できます。[/ja]
   */
  setHeight(height) {
    this.setAttribute('height', height + 'px');

    this._setStyle();
  }

  /**
   * @method setThresholdHeight
   * @signature setThresholdHeight(thresholdHeight)
   * @param {Number} thresholdHeight
   *   [en]Desired threshold height.[/en]
   *   [ja]プルフックのアクションを起こす閾値となる高さを指定します。[/ja]
   * @description
   *   [en]Specify the threshold height.[/en]
   *   [ja]閾値となる高さを指定できます。[/ja]
   */
  setThresholdHeight(thresholdHeight) {
    this.setAttribute('threshold-height', thresholdHeight + 'px');
  }

  /**
   * @method getThresholdHeight
   * @signature getThresholdHeight()
   * @description
   *   [en]Returns the height of the threshold in pixels.[/en]
   *   [ja]閾値、となる高さをピクセル数で返します。[/ja]
   * @return {Number}
   */
  getThresholdHeight() {
    return parseInt(this.getAttribute('threshold-height') || '96', 10);
  }

  _thresholdHeightEnabled() {
    const th = this.getThresholdHeight();
    return th > 0 && th >= this.getHeight();
  }

  _setState(state, noEvent) {
    const lastState = this._getState();

    this.setAttribute('state', state);

    if (!noEvent && lastState !== this._getState()) {
      util.triggerElementEvent(this, 'changestate', {
        pullHook: this,
        state: state,
        lastState: lastState
      });
    }
  }

  _getState() {
    return this.getAttribute('state');
  }

  /**
   * @method getCurrentState
   * @signature getCurrentState()
   * @return {String}
   * @description
   *   [en]Returns the current state of the element.[/en]
   *   [ja]要素の現在の状態を返します。[/ja]
   */
  getCurrentState() {
    return this._getState();
  }

  _getCurrentScroll() {
    return this._pageElement.scrollTop;
  }

  /**
   * @method getPullDistance
   * @signature getPullDistance()
   * @return {Number}
   * @description
   *   [en]Returns the current number of pixels the pull hook has moved.[/en]
   *   [ja]現在のプルフックが引き出された距離をピクセル数で返します。[/ja]
   */
  getPullDistance() {
    return this._currentTranslation;
  }

  /**
   * @method isDisabled
   * @signature isDisabled()
   * @return {Boolean}
   *   [en]true if the pull hook is disabled.[/en]
   *   [ja]プルフックがdisabled状態の場合、trueを返します。[/ja]
   * @description
   *   [en]Returns whether the component is disabled or enabled.[/en]
   *   [ja]disabled状態になっているかを得ることが出来ます。[/ja]
   */
  isDisabled() {
    return this.hasAttribute('disabled');
  }

  _isContentFixed() {
    return this.hasAttribute('fixed-content');
  }

  /**
   * @method setDisabled
   * @signature setDisabled(disabled)
   * @param {Boolean} disabled
   *   [en]If true the pull hook will be disabled.[/en]
   *   [ja]trueを指定すると、プルフックがdisabled状態になります。[/ja]
   * @description
   *   [en]Disable or enable the component.[/en]
   *   [ja]disabled状態にするかどうかを設定できます。[/ja]
   */
  setDisabled(disabled) {
    if (disabled) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  _getScrollableElement() {
    if (this._isContentFixed()) {
      return this;
    } else {
      return this._scrollElement;
    }
  }

  /**
   * @param {Number} scroll
   * @param {Object} options
   * @param {Function} [options.callback]
   */
  _translateTo(scroll, options = {}) {
    if (this._currentTranslation == 0 && scroll == 0) {
      return;
    }

    const done = () => {
      if (scroll === 0) {
        this._getScrollableElement().removeAttribute('style');
      }

      if (options.callback) {
        options.callback();
      }
    };

    this._currentTranslation = scroll;

    if (options.animate) {
      animit(this._getScrollableElement())
        .queue({
          transform: this._generateTranslationTransform(scroll)
        }, {
          duration: 0.3,
          timing: 'cubic-bezier(.1, .7, .1, 1)'
        })
        .play(done);
    } else {
      animit(this._getScrollableElement())
        .queue({
          transform: this._generateTranslationTransform(scroll)
        })
        .play(done);
    }
  }

  _getMinimumScroll() {
    const scrollHeight = this._scrollElement.getBoundingClientRect().height;
    const pageHeight = this._pageElement.getBoundingClientRect().height;

    return scrollHeight > pageHeight ? -(scrollHeight - pageHeight) : 0;
  }

  _createEventListeners() {
    this._gestureDetector = new GestureDetector(this._pageElement, {
      dragMinDistance: 1,
      dragDistanceCorrection: false
    });

    // Bind listeners
    this._gestureDetector.on('drag', this._boundOnDrag);
    this._gestureDetector.on('dragstart', this._boundOnDragStart);
    this._gestureDetector.on('dragend', this._boundOnDragEnd);

    this._scrollElement.parentElement.addEventListener('scroll', this._boundOnScroll, false);
  }

  _destroyEventListeners() {
    this._gestureDetector.off('drag', this._boundOnDrag);
    this._gestureDetector.off('dragstart', this._boundOnDragStart);
    this._gestureDetector.off('dragend', this._boundOnDragEnd);

    this._gestureDetector.dispose();
    this._gestureDetector = null;

    this._scrollElement.parentElement.removeEventListener('scroll', this._boundOnScroll, false);
  }

  attachedCallback() {
    this._createEventListeners();
  }

  detachedCallback() {
    this._destroyEventListeners();
  }

  attributeChangedCallback(name, last, current) {
  }
}

window.OnsPullHookElement = document.registerElement('ons-pull-hook', {
  prototype: PullHookElement.prototype
});

window.OnsPullHookElement.STATE_ACTION = STATE_ACTION;
window.OnsPullHookElement.STATE_INITIAL = STATE_INITIAL;
window.OnsPullHookElement.STATE_PREACTION = STATE_PREACTION;
