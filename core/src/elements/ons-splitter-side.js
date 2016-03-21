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
import AnimatorFactory from 'ons/internal/animator-factory';
import internal from 'ons/internal';
import ModifierUtil from 'ons/internal/modifier-util';
import BaseElement from 'ons/base-element';
import SplitterAnimator from './ons-splitter/animator';
import GestureDetector from 'ons/gesture-detector';
import DoorLock from 'ons/doorlock';

const SPLIT_MODE = 'split';
const COLLAPSE_MODE = 'collapse';

class CollapseDetection {
  activate(element) {}
  inactivate() {}
}

const rewritables = {
  /**
   * @param {Element} splitterSideElement
   * @param {Function} callback
   */
  ready(splitterSideElement, callback) {
    setImmediate(callback);
  },

  /**
   * @param {Element} splitterSideElement
   * @param {HTMLFragment} target
   * @param {Object} options
   * @param {Function} callback
   */
  link(splitterSideElement, target, options, callback) {
    callback(target);
  }
};

class OrientationCollapseDetection extends CollapseDetection {
  /**
   * @param {String} orientation
   */
  constructor(orientation) {
    super();

    if (orientation !== 'portrait' && orientation !== 'landscape') {
      throw new Error(`Invalid orientation: ${orientation}`);
    }

    this._boundOnOrientationChange = this._onOrientationChange.bind(this);
    this._targetOrientation = orientation;
  }

  activate(element) {
    this._element = element;
    ons.orientation.on('change', this._boundOnOrientationChange);
    this._update(ons.orientation.isPortrait());
  }

  _onOrientationChange(info) {
    this._update(info.isPortrait);
  }

  _update(isPortrait) {
    if (isPortrait && this._targetOrientation === 'portrait') {
      this._element._updateMode(COLLAPSE_MODE);
    } else if (!isPortrait && this._targetOrientation === 'landscape') {
      this._element._updateMode(COLLAPSE_MODE);
    } else {
      this._element._updateMode(SPLIT_MODE);
    }
  }

  inactivate() {
    this._element = null;
    ons.orientation.off('change', this._boundOnOrientationChange);
  }
}

class StaticCollapseDetection extends CollapseDetection {
  activate(element) {
    element._updateMode(COLLAPSE_MODE);
  }
}

class MediaQueryCollapseDetection extends CollapseDetection {
  /**
   * @param {String} query
   */
  constructor(query) {
    super();

    this._mediaQueryString = query;
    this._boundOnChange = this._onChange.bind(this);
  }

  _onChange(queryList) {
    this._element._updateMode(queryList.matches ? COLLAPSE_MODE : SPLIT_MODE);
  }

  activate(element) {
    this._element = element;
    this._queryResult = window.matchMedia(this._mediaQueryString);
    this._queryResult.addListener(this._boundOnChange);
    this._onChange(this._queryResult);
  }

  inactivate() {
    this._element = null;
    this._queryResult.removeListener(this._boundOnChange);
    this._queryResult = null;
  }
}

class BaseMode {
  isOpen() {
    return false;
  }
  openMenu() {
    return false;
  }
  closeMenu() {
    return false;
  }
  enterMode() {}
  exitMode() {}
  handleGesture() {}
}

class SplitMode extends BaseMode {

  constructor(element) {
    super();
    this._element = element;
  }

  isOpen() {
    return false;
  }

  openMenu() {
    return Promise.reject('Not possible in Split Mode');
  }
  closeMenu() {
    return Promise.reject('Not possible in Split Mode');
  }

  /**
   * @param {Element} element
   */
  layout() {
    const element = this._element;
    element.style.width = element._getWidth();

    if (element._isLeftSide()) {
      element.style.left = '0';
      element.style.right = 'auto';
    } else {
      element.style.left = 'auto';
      element.style.right = '0';
    }
  }

  enterMode() {
    this.layout();
  }

  exitMode() {
    const element = this._element;

    element.style.left = '';
    element.style.right = '';
    element.style.width = '';
    element.style.zIndex = '';
  }
}

class CollapseMode extends BaseMode {

  static get CLOSED_STATE() {
    return 'closed';
  }

  static get OPEN_STATE() {
    return 'open';
  }

  static get CHANGING_STATE() {
    return 'changing';
  }

  get _animator() {
    return this._element._getAnimator();
  }

  constructor(element) {
    super();

    this._state = CollapseMode.CLOSED_STATE;
    this._distance = 0;
    this._element = element;
    this._lock = new DoorLock();
  }

  _isLocked() {
    return this._lock.isLocked();
  }

  isOpen() {
    return this._state !== CollapseMode.CLOSED_STATE;
  }

  isClosed() {
    return this._state === CollapseMode.CLOSED_STATE;
  }

  handleGesture(event) {
    if (this._isLocked()) {
      return;
    }

    if (this._isOpenOtherSideMenu()) {
      return;
    }

    if (event.type === 'dragstart') {
      this._onDragStart(event);
    } else if (event.type === 'dragleft' || event.type === 'dragright') {
      if (!this._ignoreDrag) {
        this._onDrag(event);
      }
    } else if (event.type === 'dragend') {
      if (!this._ignoreDrag) {
        this._onDragEnd(event);
      }
    } else {
      throw new Error('Invalid state');
    }
  }

  _onDragStart(event) {
    this._ignoreDrag = ['left', 'right'].indexOf(event.gesture.direction) === -1;

    if (!this.isOpen() && this._isOpenOtherSideMenu()) {
      this._ignoreDrag = true;
    } else if (this._element._swipeTargetWidth > 0) {
      const distance = this._element._isLeftSide()
        ? event.gesture.center.clientX
        : window.innerWidth - event.gesture.center.clientX;
      if (!this.isOpen() && distance > this._element._swipeTargetWidth) {
        this._ignoreDrag = true;
      }
    }
  }

  _onDrag(event) {
    event.gesture.preventDefault();

    const deltaX = event.gesture.deltaX;
    const deltaDistance = this._element._isLeftSide() ? deltaX : -deltaX;

    const startEvent = event.gesture.startEvent;

    if (!('isOpen' in startEvent)) {
      startEvent.isOpen = this.isOpen();
      startEvent.distance = startEvent.isOpen ? this._element._getWidthInPixel() : 0;
      startEvent.width = this._element._getWidthInPixel();
    }

    const width = this._element._getWidthInPixel();

    if (deltaDistance < 0 && startEvent.distance <= 0) {
      return;
    }

    if (deltaDistance > 0 && startEvent.distance >= width) {
      return;
    }

    const distance = startEvent.isOpen ? deltaDistance + width : deltaDistance;
    const normalizedDistance = Math.max(0, Math.min(width, distance));

    startEvent.distance = normalizedDistance;

    this._state = CollapseMode.CHANGING_STATE;
    this._animator.translate(normalizedDistance);
  }

  _onDragEnd(event) {
    const deltaX = event.gesture.deltaX;
    const deltaDistance = this._element._isLeftSide() ? deltaX : -deltaX;
    const width = event.gesture.startEvent.width;
    const distance = event.gesture.startEvent.isOpen ? deltaDistance + width : deltaDistance;
    const direction = event.gesture.interimDirection;
    const shouldOpen =
      (this._element._isLeftSide() && direction === 'right' && distance > width * this._element._getThresholdRatioIfShouldOpen()) ||
      (!this._element._isLeftSide() && direction === 'left' && distance > width * this._element._getThresholdRatioIfShouldOpen());

    if (shouldOpen) {
      this._openMenu();
    } else {
      this._closeMenu();
    }
  }

  layout() {

    if (this._state === CollapseMode.CHANGING_STATE) {
      return;
    }

    if (this._state === CollapseMode.CLOSED_STATE) {
      if (this._animator.isActivated()) {
        this._animator.layoutOnClose();
      }
    } else if (this._state === CollapseMode.OPEN_STATE) {
      if (this._animator.isActivated()) {
        this._animator.layoutOnOpen();
      }
    } else {
      throw new Error('Invalid state');
    }
  }

  // enter collapse mode
  enterMode() {
    this._animator.activate(this._element._getContentElement(), this._element, this._element._getMaskElement());

    this.layout();
  }

  // exit collapse mode
  exitMode() {
    this._animator.inactivate();
  }

  /**
   * @return {Boolean}
   */
  _isOpenOtherSideMenu() {
    return util.arrayFrom(this._element.parentElement.children).filter(child => {
      return child.nodeName.toLowerCase() === 'ons-splitter-side' && this._element !== child;
    }).filter(side => {
      return side.isOpen();
    }).length > 0;
  }

  /**
   * @param {Object} [options]
   * @param {Function} [options.callback]
   * @param {Boolean} [options.withoutAnimation]
   * @return {Promise} Resolves to the splitter side element
   */
  openMenu(options = {}) {
    if (this._state !== CollapseMode.CLOSED_STATE) {
      return Promise.reject('Not in Collapse Mode.');
    }

    return this._openMenu(options);
  }

  /**
   * @param {Object} [options]
   * @param {Function} [options.callback]
   * @param {Boolean} [options.withoutAnimation]
   * @return {Promise} Resolves to the splitter side element
   */
  _openMenu(options = {}) {
    if (this._isLocked()) {
      return Promise.reject('Splitter side is locked.');
    }

    if (this._isOpenOtherSideMenu()) {
      return Promise.reject('Another menu is already open.');
    }

    if (this._element._emitPreOpenEvent()) {
      return Promise.reject('Canceled in preopen event.');
    }

    options.callback = options.callback instanceof Function ? options.callback : () => {};

    const unlock = this._lock.lock();
    const done = () => {
      unlock();
      this._element._emitPostOpenEvent();
      options.callback();
    };

    if (options.withoutAnimation) {
      this._state = CollapseMode.OPEN_STATE;
      this.layout();
      done();
      return Promise.resolve(this._element);
    } else {
      this._state = CollapseMode.CHANGING_STATE;
      return new Promise(resolve => {
        this._animator.open(() => {
          this._state = CollapseMode.OPEN_STATE;
          this.layout();
          done();
          resolve(this._element);
        });
      });
    }
  }

  /**
   * @param {Object} [options]
   * @return {Promise} Resolves to the splitter side element
   */
  closeMenu(options = {}) {
    if (this._state !== CollapseMode.OPEN_STATE) {
      return Promise.reject('Not in Collapse Mode.');
    }

    return this._closeMenu(options);
  }

  /**
   * @param {Object} [options]
   * @return {Promise} Resolves to the splitter side element
   */
  _closeMenu(options = {}) {
    if (this._isLocked()) {
      return Promise.reject('Splitter side is locked.');
    }

    if (this._element._emitPreCloseEvent()) {
      return Promise.reject('Canceled in preclose event.');
    }

    options.callback = options.callback instanceof Function ? options.callback : () => {};

    const unlock = this._lock.lock();
    const done = () => {
      unlock();
      this._element._emitPostCloseEvent();
      setImmediate(options.callback);
    };

    if (options.withoutAnimation) {
      this._state = CollapseMode.CLOSED_STATE;
      this.layout();
      done();
      return Promise.resolve(this._element);
    } else {
      this._state = CollapseMode.CHANGING_STATE;
      return new Promise(resolve => {
        this._animator.close(() => {
          this._state = CollapseMode.CLOSED_STATE;
          this.layout();
          done();
          resolve(this._element);
        });
      });
    }
  }
}

/**
 * @element ons-splitter-side
 * @category control
 * @description
 *  [en]The "ons-splitter-side" element is used as a child element of "ons-splitter".[/en]
 *  [ja]ons-splitter-side要素は、ons-splitter要素の子要素として利用します。[/ja]
 * @codepen rOQOML
 * @seealso ons-splitter
 *  [en]ons-splitter component[/en]
 *  [ja]ons-splitterコンポーネント[/ja]
 * @seealso ons-splitter-content
 *  [en]ons-splitter-content component[/en]
 *  [ja]ons-splitter-contentコンポーネント[/ja]
 * @example
 * <ons-splitter>
 *   <ons-splitter-content>
 *     ...
 *   </ons-splitter-content>
 *
 *   <ons-splitter-side side="left" width="80%" collapse>
 *     ...
 *   </ons-splitter-side>
 * </ons-splitter>
 */
class SplitterSideElement extends BaseElement {

  /**
   * @event modechange
   * @description
   *   [en]Fired just after the component's mode changes.[/en]
   *   [ja]この要素のモードが変化した際に発火します。[/ja]
   * @param {Object} event
   *   [en]Event object.[/en]
   *   [ja]イベントオブジェクトです。[/ja]
   * @param {Object} event.side
   *   [en]Component object.[/en]
   *   [ja]コンポーネントのオブジェクト。[/ja]
   * @param {String} event.mode
   *   [en]Returns the current mode. Can be either "collapse" or "split".[/en]
   *   [ja]現在のモードを返します。[/ja]
   */

  /**
   * @event preopen
   * @description
   *   [en]Fired just before the sliding menu is opened.[/en]
   *   [ja]スライディングメニューが開く前に発火します。[/ja]
   * @param {Object} event
   *   [en]Event object.[/en]
   *   [ja]イベントオブジェクトです。[/ja]
   * @param {Function} event.cancel
   *   [en]Call to cancel opening sliding menu.[/en]
   *   [ja]スライディングメニューが開くのをキャンセルします。[/ja]
   * @param {Object} event.side
   *   [en]Component object.[/en]
   *   [ja]コンポーネントのオブジェクト。[/ja]
   */

  /**
   * @event postopen
   * @description
   *   [en]Fired just after the sliding menu is opened.[/en]
   *   [ja]スライディングメニューが開いた後に発火します。[/ja]
   * @param {Object} event
   *   [en]Event object.[/en]
   *   [ja]イベントオブジェクトです。[/ja]
   * @param {Object} event.side
   *   [en]Component object.[/en]
   *   [ja]コンポーネントのオブジェクト。[/ja]
   */

  /**
   * @event preclose
   * @description
   *   [en]Fired just before the sliding menu is closed.[/en]
   *   [ja]スライディングメニューが閉じる前に発火します。[/ja]
   * @param {Object} event
   *   [en]Event object.[/en]
   *   [ja]イベントオブジェクトです。[/ja]
   * @param {Object} event.side
   *   [en]Component object.[/en]
   *   [ja]コンポーネントのオブジェクト。[/ja]
   * @param {Function} event.cancel
   *   [en]Call to cancel opening sliding-menu.[/en]
   *   [ja]スライディングメニューが閉じるのをキャンセルします。[/ja]
   */

  /**
   * @event postclose
   * @description
   *   [en]Fired just after the sliding menu is closed.[/en]
   *   [ja]スライディングメニューが閉じた後に発火します。[/ja]
   * @param {Object} event
   *   [en]Event object.[/en]
   *   [ja]イベントオブジェクトです。[/ja]
   * @param {Object} event.side
   *   [en]Component object.[/en]
   *   [ja]コンポーネントのオブジェクト。[/ja]
   */

  /**
   * @attribute animation
   * @initonly
   * @type {String}
   * @description
   *  [en]Specify the animation. Use one of "overlay", and "default".[/en]
   *  [ja]アニメーションを指定します。"overlay", "default"のいずれかを指定できます。[/ja]
   */

  /**
   * @attribute animation-options
   * @type {Expression}
   * @description
   *  [en]Specify the animation's duration, timing and delay with an object literal. E.g. <code>{duration: 0.2, delay: 1, timing: 'ease-in'}</code>[/en]
   *  [ja]アニメーション時のduration, timing, delayをオブジェクトリテラルで指定します。e.g. <code>{duration: 0.2, delay: 1, timing: 'ease-in'}</code>[/ja]
   */

  /**
   * @attribute threshold-ratio-should-open
   * @type {Number}
   * @description
   *  [en]Specify how much the menu needs to be swiped before opening. A value between 0 and 1. Default is 0.3.[/en]
   *  [ja]どのくらいスワイプすればスライディングメニューを開くかどうかの割合を指定します。0から1の間の数値を指定します。スワイプの距離がここで指定した数値掛けるこの要素の幅よりも大きければ、スワイプが終わった時にこの要素を開きます。デフォルトは0.3です。[/ja]
   */

  /**
   * @attribute collapse
   * @type {String}
   * @description
   *   [en]
   *     Specify the collapse behavior. Valid values are "portrait", "landscape" or a media query.
   *     "portrait" or "landscape" means the view will collapse when device is in landscape or portrait orientation.
   *     If the value is a media query, the view will collapse when the media query is true.
   *     If the value is not defined, the view always be in "collapse" mode.
   *   [/en]
   *   [ja]
   *     左側のページを非表示にする条件を指定します。portrait, landscape、width #pxもしくはメディアクエリの指定が可能です。
   *     portraitもしくはlandscapeを指定すると、デバイスの画面が縦向きもしくは横向きになった時に適用されます。
   *     メディアクエリを指定すると、指定したクエリに適合している場合に適用されます。
   *     値に何も指定しない場合には、常にcollapseモードになります。
   *   [/ja]
   */

  /**
   * @attribute swipe-target-width
   * @type {String}
   * @description
   *   [en]The width of swipeable area calculated from the edge (in pixels). Use this to enable swipe only when the finger touch on the screen edge.[/en]
   *   [ja]スワイプの判定領域をピクセル単位で指定します。画面の端から指定した距離に達するとページが表示されます。[/ja]
   */

  /**
   * @attribute width
   * @type {String}
   * @description
   *   [en]Can be specified in either pixels or as a percentage, e.g. "90%" or "200px".[/en]
   *   [ja]この要素の横幅を指定します。pxと%での指定が可能です。eg. 90%, 200px[/ja]
   */

  /**
   * @attribute side
   * @type {String}
   * @description
   *   [en]Specify which side of the screen the ons-splitter-side element is located on. Possible values are "left" (default) and "right".[/en]
   *   [ja]この要素が左か右かを指定します。指定できる値は"left"か"right"のみです。[/ja]
   */

  /**
   * @attribute mode
   * @type {String}
   * @description
   *   [en]Current mode. Possible values are "collapse" or "split". This attribute is read only.[/en]
   *   [ja]現在のモードが設定されます。"collapse"もしくは"split"が指定されます。この属性は読み込み専用です。[/ja]
   */

  /**
   * @attribute page
   * @initonly
   * @type {String}
   * @description
   *   [en]The url of the menu page.[/en]
   *   [ja]ons-splitter-side要素に表示するページのURLを指定します。[/ja]
   */

  /**
   * @attribute swipeable
   * @type {Boolean}
   * @description
   *   [en]Whether to enable swipe interaction on collapse mode.[/en]
   *   [ja]collapseモード時にスワイプ操作を有効にする場合に指定します。[/ja]
   */

  get page() {
    return this._page;
  }

  get mode() {
    this._mode;
  }

  _updateForAnimationOptionsAttribute() {
    this._animationOptions = util.parseJSONObjectSafely(this.getAttribute('animation-options'), {});
  }

  _getMaskElement() {
    return util.findChild(this.parentElement, 'ons-splitter-mask');
  }

  _getContentElement() {
    return util.findChild(this.parentElement, 'ons-splitter-content');
  }

  _getModeStrategy() {
    if (this._mode === COLLAPSE_MODE) {
      return this._collapseMode;
    } else if (this._mode === SPLIT_MODE) {
      return this._splitMode;
    }
  }

  createdCallback() {
    this._mode = null;
    this._page = null;
    this._isAttached = false;

    this._collapseStrategy = new CollapseDetection();
    this._animatorFactory = new AnimatorFactory({
      animators: window.OnsSplitterElement._animatorDict,
      baseClass: SplitterAnimator,
      baseClassName: 'SplitterAnimator',
      defaultAnimation: this.getAttribute('animation')
    });

    this._collapseMode = new CollapseMode(this);
    this._splitMode = new SplitMode(this);

    this._boundHandleGesture = this._handleGesture.bind(this);

    this._cancelModeDetection = () => {};

    this._updateMode(SPLIT_MODE);

    this._updateForAnimationAttribute();
    this._updateForWidthAttribute();
    this.hasAttribute('side') ? this._updateForSideAttribute() : this.setAttribute('side', 'left');
    this._updateForCollapseAttribute();
    this._updateForSwipeableAttribute();
    this._updateForSwipeTargetWidthAttribute();
    this._updateForAnimationOptionsAttribute();
  }

  _getAnimator() {
    return this._animator;
  }

  /**
   * @return {Boolean}
   */
  isSwipeable() {
    console.log('swipable : ' + this.hasAttribute('swipeable'));
    return this.hasAttribute('swipeable');
  }

  _emitPostOpenEvent() {
    util.triggerElementEvent(this, 'postopen', {side: this});
  }

  _emitPostCloseEvent() {
    util.triggerElementEvent(this, 'postclose', {side: this});
  }

  /**
   * @return {boolean} canceled or not
   */
  _emitPreOpenEvent() {
    return this._emitCancelableEvent('preopen');
  }

  _emitCancelableEvent(name) {
    let isCanceled = false;

    util.triggerElementEvent(this, name, {
      side: this,
      cancel: () => isCanceled = true
    });

    return isCanceled;
  }

  /**
   * @return {boolean}
   */
  _emitPreCloseEvent() {
    return this._emitCancelableEvent('preclose');
  }

  _updateForCollapseAttribute() {
    if (!this.hasAttribute('collapse')) {
      this._updateMode(SPLIT_MODE);
      return;
    }

    const collapse = ('' + this.getAttribute('collapse')).trim();

    if (collapse === '' || collapse === 'true') {
      this._updateCollapseStrategy(new StaticCollapseDetection());
    } else if (collapse === 'portrait' || collapse === 'landscape') {
      this._updateCollapseStrategy(new OrientationCollapseDetection(collapse));
    } else {
      this._updateCollapseStrategy(new MediaQueryCollapseDetection(collapse));
    }
  }

  /**
   * @param {CollapseDetection} strategy
   */
  _updateCollapseStrategy(strategy) {
    if (this._isAttached) {
      this._collapseStrategy.inactivate();
      strategy.activate(this);
    }

    this._collapseStrategy = strategy;
  }

  /**
   * @param {String} mode
   */
  _updateMode(mode) {

    if (mode !== COLLAPSE_MODE && mode !== SPLIT_MODE) {
      throw new Error(`invalid mode: ${mode}`);
    }

    if (mode === this._mode) {
      return;
    }

    const lastMode = this._getModeStrategy();

    if (lastMode) {
      lastMode.exitMode();
    }

    this._mode = mode;
    const currentMode = this._getModeStrategy();

    currentMode.enterMode();
    this.setAttribute('mode', mode);

    util.triggerElementEvent(this, 'modechange', {
      side: this,
      mode: mode
    });
  }

  _getThresholdRatioIfShouldOpen() {
    if (this.hasAttribute('threshold-ratio-should-open')) {
      const value = parseFloat(this.getAttribute('threshold-ratio-should-open'));
      return Math.max(0.0, Math.min(1.0, value));
    } else {
      // default value
      return 0.3;
    }
  }

  _layout() {
    this._getModeStrategy().layout();
  }

  _updateForSwipeTargetWidthAttribute() {
    if (this.hasAttribute('swipe-target-width')) {
      this._swipeTargetWidth = Math.max(0, parseInt(this.getAttribute('swipe-target-width'), 10));
    } else {
      this._swipeTargetWidth = -1;
    }
  }

  /**
   * @return {String} \d+(px|%)
   */
  _getWidth() {
    return this.hasAttribute('width') ? normalize(this.getAttribute('width')) : '80%';

    function normalize(width) {
      width = width.trim();

      if (width.match(/^\d+(px|%)$/)) {
        return width;
      }

      return '80%';
    }
  }

  _getWidthInPixel() {
    const width = this._getWidth();

    const [, num, unit] = width.match(/^(\d+)(px|%)$/);

    if (unit === 'px') {
      return parseInt(num, 10);
    }

    if (unit === '%') {
      const percent = parseInt(num, 10);

      return Math.round(this.parentElement.offsetWidth * percent / 100);
    }

    throw new Error('Invalid state');
  }

  /**
   * @return {String} 'left' or 'right'.
   */
  _getSide() {
    return normalize(this.getAttribute('side'));

    function normalize(side) {
      side = ('' + side).trim();
      return side === 'left' || side === 'right' ? side : 'left';
    }
  }

  _isLeftSide() {
    return this._getSide() === 'left';
  }

  _updateForWidthAttribute() {
    this._getModeStrategy().layout();
  }

  _updateForSideAttribute() {
    this._getModeStrategy().layout();
  }

  /**
   * @method getCurrentMode
   * @signature getCurrentMode()
   * @return {String}
   *   [en]Get current mode. Possible values are "collapse" or "split".[/en]
   *   [ja]このons-splitter-side要素の現在のモードを返します。"split"かもしくは"collapse"のどちらかです。[/ja]
   */
  getCurrentMode() {
    return this._mode;
  }

  /**
   * @return {Boolean}
   */
  isOpen() {
    return this._getModeStrategy().isOpen();
  }

  /**
   * @method open
   * @signature open([options])
   * @param {Object} [options]
   *   [en]Parameter object.[/en]
   *   [ja]オプションを指定するオブジェクト。[/ja]
   * @param {Function} [options.callback]
   *   [en]This function will be called after the menu has been opened.[/en]
   *   [ja]メニューが開いた後に呼び出される関数オブジェクトを指定します。[/ja]
   * @description
   *   [en]Open menu in collapse mode.[/en]
   *   [ja]collapseモードになっているons-splitterside要素を開きます。[/ja]
   * @return {Promise}
   *   [en]Resolves to the splitter side element[/en]
   *   [ja][/ja]
   */
  open(options = {}) {
    return this._getModeStrategy().openMenu(options);
  }

  /**
   * @method close
   * @signature close([options])
   * @param {Object} [options]
   *   [en]Parameter object.[/en]
   *   [ja]オプションを指定するオブジェクト。[/ja]
   * @param {Function} [options.callback]
   *   [en]This function will be called after the menu has been closed.[/en]
   *   [ja]メニューが閉じた後に呼び出される関数オブジェクトを指定します。[/ja]
   * @description
   *   [en]Close menu in collapse mode.[/en]
   *   [ja]collapseモードになっているons-splitter-side要素を閉じます。[/ja]
   * @return {Promise}
   *   [en]Resolves to the splitter side element[/en]
   *   [ja][/ja]
   */
  close(options = {}) {
    return this._getModeStrategy().closeMenu(options);
  }

  /**
   * @method load
   * @signature load(page, [options])
   * @param {String} page
   *   [en]Page URL. Can be either an HTML document or an <ons-template>.[/en]
   *   [ja]pageのURLか、ons-templateで宣言したテンプレートのid属性の値を指定します。[/ja]
   * @param {Object} [options]
   * @param {Function} [options.callback]
   * @description
   *   [en]Show the page specified in pageUrl in the right section[/en]
   *   [ja]指定したURLをメインページを読み込みます。[/ja]
   * @return {Promise}
   *   [en]Resolves to the new page element[/en]
   *   [ja][/ja]
   */
  load(page, options = {}) {
    this._page = page;

    options.callback = options.callback instanceof Function ? options.callback : () => {};
    return internal.getPageHTMLAsync(page).then((html) => {
      return new Promise(resolve => {
        rewritables.link(this, util.createFragment(html), options, (fragment) => {
          util.propagateAction(this, '_hide');
          this.innerHTML = '';

          this.appendChild(fragment);

          util.propagateAction(this, '_show');

          options.callback();
          resolve(this.firstChild);
        });
      });
    });
  }

  /**
   * @param {Object} [options]
   */
  toggle(options = {}) {
    return this.isOpen() ? this.close(options) : this.open(options);
  }

  attributeChangedCallback(name, last, current) {
    if (name === 'width') {
      this._updateForWidthAttribute();
    } else if (name === 'side') {
      this._updateForSideAttribute();
    } else if (name === 'collapse') {
      this._updateForCollapseAttribute();
    } else if (name === 'swipeable') {
      this._updateForSwipeableAttribute();
    } else if (name === 'swipe-target-width') {
      this._updateForSwipeTargetWidthAttribute();
    } else if (name === 'animation-options') {
      this._updateForAnimationOptionsAttribute();
    } else if (name === 'animation') {
      this._updateForAnimationAttribute();
    }
  }

  _updateForAnimationAttribute() {
    const isActivated = this._animator && this._animator.isActivated();

    if (isActivated) {
      this._animator.inactivate();
    }

    this._animator = this._createAnimator();

    if (isActivated) {
      this._animator.activate(this._getContentElement(), this, this._getMaskElement());
    }
  }

  _updateForSwipeableAttribute() {
    if (this._gestureDetector) {
      if (this.isSwipeable()) {
        this._gestureDetector.on('dragstart dragleft dragright dragend', this._boundHandleGesture);
      } else {
        this._gestureDetector.off('dragstart dragleft dragright dragend', this._boundHandleGesture);
      }
    }
  }

  _assertParent() {
    const parentElementName = this.parentElement.nodeName.toLowerCase();
    if (parentElementName !== 'ons-splitter') {
      throw new Error(`"${parentElementName}" element is not allowed as parent element.`);
    }
  }

  attachedCallback() {
    this._isAttached = true;
    this._collapseStrategy.activate(this);
    this._assertParent();

    this._gestureDetector = new GestureDetector(this.parentElement, {dragMinDistance: 1});
    this._updateForSwipeableAttribute();

    if (this.hasAttribute('page')) {
      setImmediate(() => rewritables.ready(this, () => this.load(this.getAttribute('page'))));
    }
  }

  detachedCallback() {
    this._isAttached = false;
    this._collapseStrategy.inactivate();

    this._gestureDetector.dispose();
    this._gestureDetector = null;

    this._updateForSwipeableAttribute();
  }

  _handleGesture(event) {
    return this._getModeStrategy().handleGesture(event);
  }

  _show() {
    util.propagateAction(this, '_show');
  }

  _hide() {
    util.propagateAction(this, '_hide');
  }

  _destroy() {
    util.propagateAction(this, '_destroy');
    this.remove();
  }

  _createAnimator() {
    return this._animatorFactory.newAnimator({
      animation: this.getAttribute('animation'),
      animationOptions: AnimatorFactory.parseAnimationOptionsString(this.getAttribute('animation-options'))
    });
  }
}

window.OnsSplitterSideElement = document.registerElement('ons-splitter-side', {
  prototype: SplitterSideElement.prototype
});

window.OnsSplitterSideElement.rewritables = rewritables;
