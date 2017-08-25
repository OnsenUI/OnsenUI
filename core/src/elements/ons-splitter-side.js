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
import AnimatorFactory from '../ons/internal/animator-factory';
import orientation from '../ons/orientation';
import internal from '../ons/internal';
import ModifierUtil from '../ons/internal/modifier-util';
import BaseElement from './base/base-element';
import SplitterAnimator from './ons-splitter/animator';
import GestureDetector from '../ons/gesture-detector';
import DoorLock from '../ons/doorlock';
import contentReady from '../ons/content-ready';
import { PageLoader, defaultPageLoader} from '../ons/page-loader';
import SplitterElement from './ons-splitter';

const SPLIT_MODE = 'split';
const COLLAPSE_MODE = 'collapse';
const CLOSED_STATE = 'closed';
const OPEN_STATE = 'open';
const CHANGING_STATE = 'changing';

const WATCHED_ATTRIBUTES = ['animation', 'width', 'side', 'collapse', 'swipeable', 'swipe-target-width', 'animation-options', 'open-threshold'];


const rewritables = {
  /**
   * @param {Element} splitterSideElement
   * @param {Function} callback
   */
  ready(splitterSideElement, callback) {
    setImmediate(callback);
  }
};

class CollapseDetection {
  constructor(element, target) {
    this._element = element;
    this._boundOnChange = this._onChange.bind(this);
    target && this.changeTarget(target);
  }

  changeTarget(target) {
    this.disable();
    this._target = target;
    if (target) {
      this._orientation = ['portrait', 'landscape'].indexOf(target) !== -1;
      this.activate();
    }
  }

  _match(value) {
    if (this._orientation) {
      return this._target === (value.isPortrait ? 'portrait' : 'landscape');
    }
    return value.matches;
  }

  _onChange(value) {
    this._element._updateMode(this._match(value) ? COLLAPSE_MODE : SPLIT_MODE);
  }

  activate() {
    if (this._orientation) {
      orientation.on('change', this._boundOnChange);
      this._onChange({isPortrait: orientation.isPortrait()});
    } else {
      this._queryResult = window.matchMedia(this._target);
      this._queryResult.addListener(this._boundOnChange);
      this._onChange(this._queryResult);
    }
  }

  disable() {
    if (this._orientation) {
      orientation.off('change', this._boundOnChange);
    } else if (this._queryResult) {
      this._queryResult.removeListener(this._boundOnChange);
      this._queryResult = null;
    }
  }
}

const widthToPx = (width, parent) => {
  const [value, px] = [parseInt(width, 10), /px/.test(width)];
  return px ? value : Math.round(parent.offsetWidth * value / 100);
};

class CollapseMode {
  get _animator() {
    return this._element._animator;
  }

  constructor(element) {
    this._active = false;
    this._state = CLOSED_STATE;
    this._element = element;
    this._lock = new DoorLock();
  }

  isOpen() {
    return this._active && this._state !== CLOSED_STATE;
  }

  handleGesture(e) {
    if (!e.gesture || !this._active || this._lock.isLocked() || this._isOpenOtherSideMenu()) {
      return;
    }
    if (e.type === 'dragstart') {
      this._onDragStart(e);
    } else if (!this._ignoreDrag) {
      e.type === 'dragend' ? this._onDragEnd(e) : this._onDrag(e);
    }
  }

  _canConsumeGesture(gesture) {
    const isOpen = this.isOpen();
    const validDrag = d => this._element._side === 'left'
      ? ((d === 'left' && isOpen) || (d === 'right' && !isOpen))
      : ((d === 'left' && !isOpen) || (d === 'right' && isOpen));

    const distance = this._element._side === 'left' ? gesture.center.clientX : window.innerWidth - gesture.center.clientX;
    const area = this._element._swipeTargetWidth;

    return (validDrag(gesture.direction) || validDrag(gesture.interimDirection)) && !(area && distance > area && !isOpen);
  }

  _onDragStart(event) {
    this._ignoreDrag = event.consumed || !this._canConsumeGesture(event.gesture);

    if (!this._ignoreDrag) {
      event.consume && event.consume();
      event.consumed = true;

      this._width = widthToPx(this._element._width, this._element.parentNode);
      this._startDistance = this._distance = this.isOpen() ? this._width : 0;

      util.skipContentScroll(event.gesture);
    }
  }

  _onDrag(event) {
    event.stopPropagation();
    event.gesture.preventDefault();

    const delta = this._element._side === 'left' ? event.gesture.deltaX : -event.gesture.deltaX;
    const distance = Math.max(0, Math.min(this._width, this._startDistance + delta));
    if (distance !== this._distance) {
      this._animator.translate(distance);
      this._distance = distance;
      this._state = CHANGING_STATE;
    }
  }

  _onDragEnd(event) {
    event.stopPropagation();

    const {_distance: distance, _width: width, _element: el} = this;
    const direction = event.gesture.interimDirection;
    const shouldOpen = el._side !== direction && distance > width * el._threshold;
    this.executeAction(shouldOpen ? 'open' : 'close');
    this._ignoreDrag = true;
  }

  layout() {
    if (this._active && this._state === OPEN_STATE) {
      this._animator.open();
    }
  }

  // enter collapse mode
  enterMode() {
    if (!this._active) {
      this._active = true;
      this._animator && this._animator.activate(this._element);
      this.layout();
    }
  }

  // exit collapse mode
  exitMode() {
    this._animator && this._animator.deactivate();
    this._state = CLOSED_STATE;
    this._active = false;
  }

  _isOpenOtherSideMenu() {
    return util.arrayFrom(this._element.parentElement.children).some(e => {
      return util.match(e, 'ons-splitter-side') && e !== this._element && e.isOpen;
    });
  }

  /**
   * @param {String} name - 'open' or 'close'
   * @param {Object} [options]
   * @param {Function} [options.callback]
   * @param {Boolean} [options.withoutAnimation]
   * @return {Promise} Resolves to the splitter side element or false if not in collapse mode
   */
  executeAction(name, options = {}) {
    const FINAL_STATE = name === 'open' ? OPEN_STATE : CLOSED_STATE;

    if (!this._active) {
      return Promise.resolve(false);
    }

    if (this._state === FINAL_STATE) {
      return Promise.resolve(this._element);
    }
    if (this._lock.isLocked()) {
      return Promise.reject('Splitter side is locked.');
    }
    if (name === 'open' && this._isOpenOtherSideMenu()) {
      return Promise.reject('Another menu is already open.');
    }
    if (this._element._emitEvent(`pre${name}`)) {
      return Promise.reject(`Canceled in pre${name} event.`);
    }

    const callback = options.callback;
    const unlock = this._lock.lock();
    const done = () => {
      this._state = FINAL_STATE;
      this.layout();
      unlock();
      this._element._emitEvent(`post${name}`);
      callback && callback();
    };

    if (options.withoutAnimation) {
      done();
      return Promise.resolve(this._element);
    }
    this._state = CHANGING_STATE;
    return new Promise(resolve => {
      this._animator[name](() => {
        done();
        resolve(this._element);
      });
    });
  }
}

/**
 * @element ons-splitter-side
 * @category menu
 * @description
 *  [en]
 *    The `<ons-splitter-side>` element is used as a child element of `<ons-splitter>`.
 *
 *    It will be displayed on either the left or right side of the `<ons-splitter-content>` element.
 *
 *    It supports two modes: collapsed and split. When it's in collapsed mode it will be hidden from view and can be displayed when the user swipes the screen or taps a button. In split mode the element is always shown. It can be configured to automatically switch between the two modes depending on the screen size.
 *  [/en]
 *  [ja]ons-splitter-side要素は、ons-splitter要素の子要素として利用します。[/ja]
 * @codepen rOQOML
 * @tutorial vanilla/Reference/splitter
 * @guide multiple-page-navigation
 *  [en]Managing multiple pages.[/en]
 *  [ja]Managing multiple pages[/ja]
 * @seealso ons-splitter
 *  [en]The `<ons-splitter>` is the parent component.[/en]
 *  [ja]ons-splitterコンポーネント[/ja]
 * @seealso ons-splitter-content
 *  [en]The `<ons-splitter-content>` component contains the main content of the page.[/en]
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
export default class SplitterSideElement extends BaseElement {

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
   *   [en]Returns the current mode. Can be either `"collapse"` or `"split"`.[/en]
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
   * @type {String}
   * @default  default
   * @description
   *  [en]Specify the animation. Use one of `overlay`, `push`, `reveal` or  `default`.[/en]
   *  [ja]アニメーションを指定します。"overlay", "push", "reveal", "default"のいずれかを指定できます。[/ja]
   */

  /**
   * @attribute animation-options
   * @type {Expression}
   * @description
   *  [en]Specify the animation's duration, timing and delay with an object literal. E.g. `{duration: 0.2, delay: 1, timing: 'ease-in'}`.[/en]
   *  [ja]アニメーション時のduration, timing, delayをオブジェクトリテラルで指定します。e.g. {duration: 0.2, delay: 1, timing: 'ease-in'}[/ja]
   */

  /**
   * @attribute open-threshold
   * @type {Number}
   * @default  0.3
   * @description
   *  [en]Specify how much the menu needs to be swiped before opening. A value between `0` and `1`.[/en]
   *  [ja]どのくらいスワイプすればスライディングメニューを開くかどうかの割合を指定します。0から1の間の数値を指定します。スワイプの距離がここで指定した数値掛けるこの要素の幅よりも大きければ、スワイプが終わった時にこの要素を開きます。デフォルトは0.3です。[/ja]
   */

  /**
   * @attribute collapse
   * @type {String}
   * @description
   *   [en]
   *     Specify the collapse behavior. Valid values are `"portrait"`, `"landscape"` or a media query.
   *     The strings `"portrait"` and `"landscape"` means the view will collapse when device is in landscape or portrait orientation.
   *     If the value is a media query, the view will collapse when the media query resolves to `true`.
   *     If the value is not defined, the view always be in `"collapse"` mode.
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
   *   [en]Can be specified in either pixels or as a percentage, e.g. `90%` or `200px`.[/en]
   *   [ja]この要素の横幅を指定します。pxと%での指定が可能です。eg. 90%, 200px[/ja]
   */

  /**
   * @attribute side
   * @type {String}
   * @default left
   * @description
   *   [en]Specify which side of the screen the `<ons-splitter-side>` element is located. Possible values are `"left"` and `"right"`.[/en]
   *   [ja]この要素が左か右かを指定します。指定できる値は"left"か"right"のみです。[/ja]
   */

  /**
   * @attribute mode
   * @type {String}
   * @description
   *   [en]Current mode. Possible values are `"collapse"` or `"split"`. This attribute is read only.[/en]
   *   [ja]現在のモードが設定されます。"collapse"もしくは"split"が指定されます。この属性は読み込み専用です。[/ja]
   */

  /**
   * @attribute page
   * @initonly
   * @type {String}
   * @description
   *   [en]The URL of the menu page.[/en]
   *   [ja]ons-splitter-side要素に表示するページのURLを指定します。[/ja]
   */

  /**
   * @attribute swipeable
   * @type {Boolean}
   * @description
   *   [en]Whether to enable swipe interaction on collapse mode.[/en]
   *   [ja]collapseモード時にスワイプ操作を有効にする場合に指定します。[/ja]
   */

  constructor() {
    super();

    this._page = null;
    this._pageLoader = defaultPageLoader;
    this._collapseMode = new CollapseMode(this);
    this._collapseDetection = new CollapseDetection(this);

    this._animatorFactory = new AnimatorFactory({
      animators: SplitterElement.animators,
      baseClass: SplitterAnimator,
      baseClassName: 'SplitterAnimator',
      defaultAnimation: this.getAttribute('animation')
    });
    this._boundHandleGesture = (e) => this._collapseMode.handleGesture(e);
    this._watchedAttributes = WATCHED_ATTRIBUTES;
    contentReady(this, () => {
      rewritables.ready(this, () => {
        const page = this._getPageTarget();

        if (page) {
          this.load(page);
        }
      });
    });
  }

  connectedCallback() {
    if (!util.match(this.parentNode, 'ons-splitter')) {
      throw new Error('Parent must be an ons-splitter element.');
    }

    this._gestureDetector = new GestureDetector(this.parentElement, {dragMinDistance: 1});

    contentReady(this, () => {
      this._watchedAttributes.forEach(e => this._update(e));
    });

    if (!this.hasAttribute('side')) {
      this.setAttribute('side', 'left');
    }
  }

  _getPageTarget() {
    return this._page || this.getAttribute('page');
  }

  get side() {
    return this.getAttribute('side') === 'right' ? 'right' : 'left';
  }

  disconnectedCallback() {
    this._collapseDetection.disable();
    this._gestureDetector.dispose();
    this._gestureDetector = null;
  }

  static get observedAttributes() {
    return WATCHED_ATTRIBUTES;
  }

  attributeChangedCallback(name, last, current) {
    this.parentNode && this._update(name, current);
  }

  _update(name, value) {
    name = '_update' + name.split('-').map(e => e[0].toUpperCase() + e.slice(1)).join('');
    return this[name](value);
  }

  _emitEvent(name) {
    if (name.slice(0, 3) !== 'pre') {
      return util.triggerElementEvent(this, name, {side: this});
    }
    let isCanceled = false;

    util.triggerElementEvent(this, name, {
      side: this,
      cancel: () => isCanceled = true
    });

    return isCanceled;
  }

  _updateCollapse(value = this.getAttribute('collapse')) {
    if (value === null || value === 'split') {
      this._collapseDetection.disable();
      return this._updateMode(SPLIT_MODE);
    }
    if (value === '' || value === 'collapse') {
      this._collapseDetection.disable();
      return this._updateMode(COLLAPSE_MODE);
    }

    this._collapseDetection.changeTarget(value);
  }

  // readonly attribute for the users
  _updateMode(mode) {
    if (mode !== this._mode) {
      this._mode = mode;
      this._collapseMode[mode === COLLAPSE_MODE ? 'enterMode' : 'exitMode']();
      this.setAttribute('mode', mode);

      util.triggerElementEvent(this, 'modechange', {side: this, mode: mode});
    }
  }

  _updateOpenThreshold(threshold = this.getAttribute('open-threshold')) {
    this._threshold = Math.max(0, Math.min(1, parseFloat(threshold) || 0.3));
  }

  _updateSwipeable(swipeable = this.getAttribute('swipeable')) {
    const action = swipeable === null ? 'off' : 'on';

    if (this._gestureDetector) {
      this._gestureDetector[action]('drag dragstart dragend', this._boundHandleGesture);
    }
  }

  _updateSwipeTargetWidth(value = this.getAttribute('swipe-target-width')) {
    this._swipeTargetWidth = Math.max(0, parseInt(value) || 0);
  }

  _updateWidth() {
    this.style.width = this._width;
  }

  get _width() {
    const width = this.getAttribute('width');
    return /^\d+(px|%)$/.test(width) ? width : '80%';
  }

  set _width(value) {
    this.setAttribute('width', value);
  }

  _updateSide(side = this.getAttribute('side')) {
    this._side = side === 'right' ? side : 'left';
  }

  _updateAnimation(animation = this.getAttribute('animation')) {
    this._animator && this._animator.deactivate();
    this._animator = this._animatorFactory.newAnimator({animation});
    this._animator.activate(this);
  }

  _updateAnimationOptions(value = this.getAttribute('animation-options')) {
    this._animator.updateOptions(AnimatorFactory.parseAnimationOptionsString(value));
  }

  /**
   * @property page
   * @type {*}
   * @description
   *   [en]Page location to load in the splitter side.[/en]
   *   [ja]この要素内に表示するページを指定します。[/ja]
   */
  get page() {
    return this._page;
  }

  /**
   * @param {*} page
   */
  set page(page) {
    this._page = page;
  }

  get _content() {
    return this.children[0];
  }

  /**
   * @property pageLoader
   * @description
   *   [en][/en]
   *   [ja][/ja]
   */
  get pageLoader() {
    return this._pageLoader;
  }

  set pageLoader(loader) {
    if (!(loader instanceof PageLoader)) {
      throw Error('First parameter must be an instance of PageLoader.');
    }
    this._pageLoader = loader;
  }

  /**
   * @property mode
   * @readonly
   * @type {String}
   * @description
   *   [en]Current mode. Possible values are "split", "collapse", "closed", "open" or "changing".[/en]
   *   [ja][/ja]
   */
  get mode() {
    return this._mode;
  }

  /**
   * @property isOpen
   * @type {Boolean}
   * @readonly
   * @description
   *   [en]This value is `true` when the menu is open..[/en]
   *   [ja][/ja]
   */
  get isOpen() {
    return this._collapseMode.isOpen();
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
   *   [ja]collapseモードになっているons-splitter-side要素を開きます。[/ja]
   * @return {Promise}
   *   [en]Resolves to the splitter side element or false if not in collapse mode[/en]
   *   [ja][/ja]
   */
  open(options = {}) {
    return this._collapseMode.executeAction('open', options);
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
   *   [en]Resolves to the splitter side element or false if not in collapse mode[/en]
   *   [ja][/ja]
   */
  close(options = {}) {
    return this._collapseMode.executeAction('close', options);
  }

  /**
   * @method toggle
   * @signature toggle([options])
   * @param {Object} [options]
   * @description
   *   [en]Opens if it's closed. Closes if it's open.[/en]
   *   [ja]開けている場合は要素を閉じますそして開けている場合は要素を開きます。[/ja]
   * @return {Promise}
   *   [en]Resolves to the splitter side element or false if not in collapse mode[/en]
   *   [ja][/ja]
   */
  toggle(options = {}) {
    return this.isOpen ? this.close(options) : this.open(options);
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
    const callback = options.callback || (() => {});

    return new Promise(resolve => {
      let oldContent = this._content || null;

      this._pageLoader.load({page, parent: this}, pageElement => {
        if (oldContent) {
          this._pageLoader.unload(oldContent);
          oldContent = null;
        }

        setImmediate(() => this._show());

        callback(pageElement);
        resolve(pageElement);
      });
    });
  }

  _show() {
    if (this._content) {
      this._content._show();
    }
  }

  _hide() {
    if (this._content) {
      this._content._hide();
    }
  }

  _destroy() {
    if (this._content) {
      this._pageLoader.unload(this._content);
    }
    this.remove();
  }

  static get events() {
    return ['preopen', 'postopen', 'preclose', 'postclose', 'modechange'];
  }

  static get rewritables() {
    return rewritables;
  }
}

customElements.define('ons-splitter-side', SplitterSideElement);
