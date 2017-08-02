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
import platform from '../ons/platform';
import BaseElement from './base/base-element';
import GestureDetector from '../ons/gesture-detector';
import animit from '../ons/animit';

const STATE_INITIAL = 'initial';
const STATE_PREACTION = 'preaction';
const STATE_ACTION = 'action';

const removeTransform = (el) => {
  el.style.transform = '';
  el.style.WebkitTransform = '';
  el.style.transition = '';
  el.style.WebkitTransition = '';
};

/**
 * @element ons-pull-hook
 * @category control
 * @description
 *   [en]
 *     Component that adds **Pull to refresh** functionality to an `<ons-page>` element.
 *
 *     It can be used to perform a task when the user pulls down at the top of the page. A common usage is to refresh the data displayed in a page.
 *   [/en]
 *   [ja][/ja]
 * @codepen WbJogM
 * @tutorial vanilla/Reference/pull-hook
 * @example
 * <ons-page>
 *   <ons-pull-hook>
 *     Release to refresh
 *   </ons-pull-hook>
 * </ons-page>
 *
 * <script>
 *   document.querySelector('ons-pull-hook').onAction = function(done) {
 *     setTimeout(done, 1000);
 *   };
 * </script>
 */
export default class PullHookElement extends BaseElement {

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

  constructor() {
    super();

    this._boundOnDrag = this._onDrag.bind(this);
    this._boundOnDragStart = this._onDragStart.bind(this);
    this._boundOnDragEnd = this._onDragEnd.bind(this);
    this._boundOnScroll = this._onScroll.bind(this);

    this._setState(STATE_INITIAL, true);
    this._hide(); // Fix for transparent toolbar transitions
  }

  _setStyle() {
    const height = this.height;

    this.style.height = `${height}px`;
    this.style.lineHeight = `${height}px`;
  }

  _onScroll(event) {
    const element = this._pageElement;

    if (element.scrollTop < 0) {
      element.scrollTop = 0;
    }
  }

  _generateTranslationTransform(scroll) {
    return `translate3d(0px, ${scroll}px, 0px)`;
  }

  _canConsumeGesture(gesture) {
    return gesture.direction === 'up' || gesture.direction === 'down';
  }

  _onDragStart(event) {
    if (!event.gesture || this.disabled) {
      return;
    }

    this._ignoreDrag = event.consumed;

    if (!this._ignoreDrag) {
      const consume = event.consume;
      event.consume = () => {
        consume && consume();
        this._ignoreDrag = true;
        // This elements resizes .page__content so it is safer
        // to hide it when other components are dragged.
        this._hide();
      };

      if (this._canConsumeGesture(event.gesture)) {
        consume && consume();
        event.consumed = true;
        this._show(); // Not enough due to 'dragLockAxis'
      }
    }

    this._startScroll = this._getCurrentScroll();
  }

  _onDrag(event) {
    if (!event.gesture || this.disabled || this._ignoreDrag || !this._canConsumeGesture(event.gesture)) {
      return;
    }

    // Necessary due to 'dragLockAxis' (25px)
    if (this.style.display === 'none') {
      this._show();
    }

    event.stopPropagation();

    // Hack to make it work on Android 4.4 WebView. Scrolls manually near the top of the page so
    // there will be no inertial scroll when scrolling down. Allowing default scrolling will
    // kill all 'touchmove' events.
    if (platform.isAndroid()) {
      const element = this._pageElement;
      element.scrollTop = this._startScroll - event.gesture.deltaY;
      if (element.scrollTop < window.innerHeight && event.gesture.direction !== 'up') {
        event.gesture.preventDefault();
      }
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

    if (this._thresholdHeightEnabled() && scroll >= this.thresholdHeight) {
      event.gesture.stopDetect();

      setImmediate(() => this._finish());
    } else if (scroll >= this.height) {
      this._setState(STATE_PREACTION);
    } else {
      this._setState(STATE_INITIAL);
    }

    this._translateTo(scroll);
  }

  _onDragEnd(event) {
    if (!event.gesture || this.disabled || this._ignoreDrag) {
      return;
    }

    event.stopPropagation();

    if (this._currentTranslation > 0) {
      const scroll = this._currentTranslation;

      if (scroll > this.height) {
        this._finish();
      } else {
        this._translateTo(0, {animate: true});
      }
    }
  }

  /**
   * @property onAction
   * @type {Function}
   * @description
   *   [en]This will be called in the `action` state if it exists. The function will be given a `done` callback as it's first argument.[/en]
   *   [ja][/ja]
   */
  get onAction() {
    return this._onAction;
  }

  set onAction(value) {
    if (!(value instanceof Function) && value !== null) {
      throw new Error('onAction must be a function or null');
    }
    this._onAction = value;
  }

  _finish() {
    this._setState(STATE_ACTION);
    this._translateTo(this.height, {animate: true});
    const action = this.onAction || (done => done());
    action(() => {
      this._translateTo(0, {animate: true});
      this._setState(STATE_INITIAL);
    });
  }

  /**
   * @property height
   * @type {Number}
   * @description
   *   [en]The height of the pull hook in pixels. The default value is `64px`.[/en]
   *   [ja][/ja]
   */
  set height(value) {
    if (!util.isInteger(value)) {
      throw new Error('The height must be an integer');
    }

    this.setAttribute('height', `${value}px`);
  }

  get height() {
    return parseInt(this.getAttribute('height') || '64', 10);
  }

  /**
   * @property thresholdHeight
   * @type {Number}
   * @description
   *   [en]The thresholdHeight of the pull hook in pixels. The default value is `96px`.[/en]
   *   [ja][/ja]
   */
  set thresholdHeight(value) {
    if (!util.isInteger(value)) {
      throw new Error('The threshold height must be an integer');
    }

    this.setAttribute('threshold-height', `${value}px`);
  }

  get thresholdHeight() {
    return parseInt(this.getAttribute('threshold-height') || '96', 10);
  }

  _thresholdHeightEnabled() {
    const th = this.thresholdHeight;
    return th > 0 && th >= this.height;
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
   * @property state
   * @readonly
   * @type {String}
   * @description
   *   [en]Current state of the element.[/en]
   *   [ja][/ja]
   */
  get state() {
    return this._getState();
  }

  _getCurrentScroll() {
    return this._pageElement.scrollTop;
  }

  /**
   * @property pullDistance
   * @readonly
   * @type {Number}
   * @description
   *   [en]The current number of pixels the pull hook has moved.[/en]
   *   [ja]現在のプルフックが引き出された距離をピクセル数。[/ja]
   */
  get pullDistance() {
    return this._currentTranslation;
  }

  /**
   * @property disabled
   * @type {Boolean}
   * @description
   *   [en]Whether the element is disabled or not.[/en]
   *   [ja]無効化されている場合に`true`。[/ja]
   */
  set disabled(value) {
    return util.toggleAttribute(this, 'disabled', value);
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  _isContentFixed() {
    return this.hasAttribute('fixed-content');
  }

  _getScrollableElement() {
    if (this._isContentFixed()) {
      return this;
    } else {
      return this._pageElement;
    }
  }

  _show() {
    // Run asyncrhonously to avoid conflicts with Animit's style clean
    setImmediate(() => {
      this.style.display = '';
      if (this._pageElement) {
        this._pageElement.style.marginTop = `-${this.height}px`;
      }
    });
  }

  _hide() {
    this.style.display = 'none';
    if (this._pageElement) {
      this._pageElement.style.marginTop = '';
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
        const el = this._getScrollableElement();
        removeTransform(el);
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

  _disableDragLock() { // e2e tests need it
    this._dragLockDisabled = true;
    this._destroyEventListeners();
    this._createEventListeners();
  }

  _createEventListeners() {
    this._gestureDetector = new GestureDetector(this._pageElement, {
      dragMinDistance: 1,
      dragDistanceCorrection: false,
      dragLockToAxis: !this._dragLockDisabled
    });

    // Bind listeners
    //
    // Note:
    // If we swipe up/down a screen too fast,
    // the gesture detector occasionally dispatches a `dragleft` or `dragright`,
    // so we need to have the pull hook listen to `dragleft` and `dragright` as well as `dragup` and `dragdown`.
    this._gestureDetector.on('drag', this._boundOnDrag);
    this._gestureDetector.on('dragstart', this._boundOnDragStart);
    this._gestureDetector.on('dragend', this._boundOnDragEnd);

    this._pageElement.addEventListener('scroll', this._boundOnScroll, false);
  }

  _destroyEventListeners() {
    if (this._gestureDetector) {
      this._gestureDetector.off('drag', this._boundOnDrag);
      this._gestureDetector.off('dragstart', this._boundOnDragStart);
      this._gestureDetector.off('dragend', this._boundOnDragEnd);

      this._gestureDetector.dispose();
      this._gestureDetector = null;
    }

    this._pageElement.removeEventListener('scroll', this._boundOnScroll, false);
  }

  connectedCallback() {
    this._currentTranslation = 0;
    this._pageElement = this.parentNode;

    this._createEventListeners();
    this._setStyle();
  }

  disconnectedCallback() {
    this._hide();

    this._destroyEventListeners();
  }

  static get observedAttributes() {
    return ['height'];
  }

  attributeChangedCallback(name, last, current) {
    if (name === 'height' && this._pageElement) {
      this._setStyle();
    }
  }

  static get STATE_INITIAL() {
    return STATE_INITIAL;
  }

  static get STATE_PREACTION() {
    return STATE_PREACTION;
  }

  static get STATE_ACTION() {
    return STATE_ACTION;
  }

  static get events() {
    return ['changestate']
  }
}

customElements.define('ons-pull-hook', PullHookElement);
