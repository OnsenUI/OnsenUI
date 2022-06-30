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

import onsElements from '../ons/elements.js';
import util from '../ons/util.js';
import AnimatorFactory from '../ons/internal/animator-factory.js';
import orientation from '../ons/orientation.js';
import internal from '../ons/internal/index.js';
import ModifierUtil from '../ons/internal/modifier-util.js';
import BaseElement from './base/base-element.js';
import SplitterAnimator from './ons-splitter/animator.js';
import SwipeReveal from '../ons/internal/swipe-reveal.js';
import DoorLock from '../ons/doorlock.js';
import contentReady from '../ons/content-ready.js';
import { PageLoader, defaultPageLoader} from '../ons/page-loader.js';
import SplitterElement from './ons-splitter.js';

const SPLIT_MODE = 'split';
const COLLAPSE_MODE = 'collapse';
const CLOSED_STATE = 'closed';
const OPEN_STATE = 'open';
const CHANGING_STATE = 'changing';

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
    this._onChange = this._onChange.bind(this);
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
      orientation.on('change', this._onChange);
      this._onChange({isPortrait: orientation.isPortrait()});
    } else {
      this._queryResult = window.matchMedia(this._target);
      this._queryResult.addListener(this._onChange);
      this._onChange(this._queryResult);
    }
  }

  disable() {
    if (this._orientation) {
      orientation.off('change', this._onChange);
    } else if (this._queryResult) {
      this._queryResult.removeListener(this._onChange);
      this._queryResult = null;
    }
  }
}

const widthToPx = (width, parent) => {
  const [value, px] = [parseInt(width, 10), /px/.test(width)];
  return px ? value : Math.round(parent.offsetWidth * value / 100);
};

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
 * @guide fundamentals.html#managing-pages
 *  [en]Managing multiple pages.[/en]
 *  [ja]複数のページを管理する[/ja]
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
   * @event swipe
   * @description
   *   [en]Fired whenever the user slides the splitter.[/en]
   *   [ja][/ja]
   * @param {Object} event [en]Event object.[/en]
   * @param {Object} event.ratio
   *   [en]Decimal ratio (0-1).[/en]
   *   [ja][/ja]
   * @param {Object} event.animationOptions
   *   [en][/en]
   *   [ja][/ja]
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
   * @property animationOptions
   * @type {Object}
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
   *     The string `"portrait"` means the view will collapse when the device is in portrait orientation.
   *     The string `"landscape"` means the view will collapse when the device is in landscape orientation.
   *     If the value is a media query, the view will collapse when the media query resolves to `true`.
   *     If the attribute is set, including as an empty string, the view will always be in `"collapse"` mode.
   *     If the attribute is not set, the view will be in `"split"` mode.
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

  /**
   * @property swipeable
   * @type {Boolean}
   * @description
   *   [en]Whether to enable swipe interaction on collapse mode.[/en]
   *   [ja]collapseモード時にスワイプ操作を有効にする場合に指定します。[/ja]
   */

  constructor() {
    super();

    this._page = null;
    this._state = CLOSED_STATE;
    this._lock = new DoorLock();
    this._pageLoader = defaultPageLoader;
    this._collapseDetection = new CollapseDetection(this);

    this._animatorFactory = new AnimatorFactory({
      animators: SplitterElement.animators,
      baseClass: SplitterAnimator,
      baseClassName: 'SplitterAnimator',
      defaultAnimation: this.getAttribute('animation')
    });

    contentReady(this, () => {
      // These attributes are used early by the parent element
      this.attributeChangedCallback('width');
      if (!this.hasAttribute('side')) {
        this.setAttribute('side', 'left');
      }

      rewritables.ready(this, () => {
        const page = this._page || this.getAttribute('page');
        page && this.load(page);
      });
    });
  }

  connectedCallback() {
    if (!util.match(this.parentNode, 'ons-splitter')) {
      util.throw('Parent must be an ons-splitter element');
    }

    if (!this._swipe) {
      this._swipe = new SwipeReveal({
        element: this,
        elementHandler: this.parentElement,
        swipeMax: () => {
          const ratio = 1;
          this._onSwipe && this._onSwipe(ratio, this._animationOpt);
          util.triggerElementEvent(this, 'swipe', { ratio, animationOptions: this._animationOpt });
          this.open();
        },
        swipeMid: (distance, width) => {
          const ratio = distance / width;
          this._onSwipe && this._onSwipe(ratio);
          util.triggerElementEvent(this, 'swipe', { ratio });
          this._animator.translate(distance);
        },
        swipeMin: () => {
          const ratio = 0;
          this._onSwipe && this._onSwipe(ratio, this._animationOpt);
          util.triggerElementEvent(this, 'swipe', { ratio, animationOptions: this._animationOpt });
          this.close();
        },
        getThreshold: () => Math.max(0, Math.min(1, parseFloat(this.getAttribute('open-threshold')) || 0.3)),
        getSide: () => this.side,
        isInitialState: () => {
          const closed = this._state === CLOSED_STATE;
          this._state = CHANGING_STATE;
          return closed;
        },
        ignoreSwipe: (event, distance) => {
          const isOpen = this.isOpen;
          const validDrag = d => this.side === 'left'
            ? ((d === 'left' && isOpen) || (d === 'right' && !isOpen))
            : ((d === 'left' && !isOpen) || (d === 'right' && isOpen));

          const area = Math.max(0, parseInt(this.getAttribute('swipe-target-width'), 10) || 0);

          return this._mode === SPLIT_MODE || this._lock.isLocked() || this._isOtherSideOpen()
            || !validDrag(event.gesture.direction)
            || (!isOpen && area !== 0 && distance > area);
        }
      });

      this.attributeChangedCallback('swipeable');
    }

    contentReady(this, () => {
      this.constructor.observedAttributes.forEach(attr => this.attributeChangedCallback(attr, null, this.getAttribute(attr)));
    });
  }

  get side() {
    return this.getAttribute('side') === 'right' ? 'right' : 'left';
  }

  set side(value) {
    if (value) {
      this.setAttribute('side', value);
    } else {
      tihs.removeAttribute('side');
    }
  }

  disconnectedCallback() {
    this._swipe && this._swipe.dispose();
    this._animator = this._animationOpt = this._swipe = null;
  }

  static get observedAttributes() {
    return ['animation', 'width', 'collapse', 'swipeable', 'animation-options'];
  }

  attributeChangedCallback(name, last, current) {
    switch (name) {
      case 'swipeable':
        this._swipe && this._swipe.update();
        break;
      case 'width':
        current = this.getAttribute('width'); // Sometimes undefined. CE bug?
        this.style.width = /^\d+(px|%)$/.test(current) ? current : '80%';
        break;
      case 'animation':
      case 'animation-options':
        this._updateAnimation();
        break;
      default:
        this[util.camelize(`_update-${name}`)](current);
    }
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

  _isOtherSideOpen() {
    return !!util.findChild(this.parentElement,
      el => el instanceof this.constructor && el !== this && el._mode === COLLAPSE_MODE && el.isOpen
    );
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

  _updateMode(mode) {
    if (mode !== this._mode) {
      this._mode = mode;
      this.setAttribute('mode', mode); // readonly attribute for the users

      if (mode === SPLIT_MODE) {
        this._animator && this._animator.deactivate();
        this._state = CLOSED_STATE;
      } else {
        this._animator && this._animator.activate(this);
        this._state === OPEN_STATE && this._animator.open();
      }

      util.triggerElementEvent(this, 'modechange', { side: this, mode });
    }
  }

  _updateAnimation(animation = this.getAttribute('animation')) {
    if (this.parentNode) {
      this._animator && this._animator.deactivate();
      this._animator = this._animatorFactory.newAnimator({animation});
      this._animator.activate(this);
      this._animationOpt = {
        timing: this._animator.duration,
        duration: this._animator.duration
      };
      this._animator.updateOptions(this.animationOptions);
    }
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
      util.throwPageLoader();
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
   * @property onSwipe
   * @type {Function}
   * @description
   *   [en]Hook called whenever the user slides the splitter. It gets a decimal ratio (0-1) and an animationOptions object as arguments.[/en]
   *   [ja][/ja]
   */
  get onSwipe() {
    return this._onSwipe;
  }

  set onSwipe(value) {
    if (value && !(value instanceof Function)) {
      util.throw('"onSwipe" must be a function');
    }
    this._onSwipe = value;
  }

  get animationOptions() {
    return this.hasAttribute('animation-options') ?
      AnimatorFactory.parseAnimationOptionsString(this.getAttribute('animation-options')) : {};
  }

  set animationOptions(value) {
    if (value === undefined || value === null) {
      this.removeAttribute('animation-options');
    } else {
      this.setAttribute('animation-options', JSON.stringify(value));
    }
  }

  /**
   * @property isOpen
   * @type {Boolean}
   * @description
   *   [en]Specifies whether the menu is opened.[/en]
   *   [ja][/ja]
   */
  get isOpen() {
    return this._mode === COLLAPSE_MODE && this._state !== CLOSED_STATE;
  }

  set isOpen(value) {
    this.toggle({}, value);
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
  open(options) {
    return this.toggle(options, true);
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
  close(options) {
    return this.toggle(options, false);
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
  toggle(options = {}, force) {
    const shouldOpen = typeof force === 'boolean' ? force : !this.isOpen;
    const action = shouldOpen ? 'open' : 'close';
    const FINAL_STATE = shouldOpen ? OPEN_STATE : CLOSED_STATE;

    if (this._mode === SPLIT_MODE) {
      return Promise.resolve(false);
    }
    if (this._state === FINAL_STATE) {
      return Promise.resolve(this);
    }
    if (this._lock.isLocked()) {
      return Promise.reject('Another splitter-side action is already running.');
    }
    if (shouldOpen && this._isOtherSideOpen()) {
      return Promise.reject('Another menu is already open.');
    }
    if (this._emitEvent(`pre${action}`)) {
      return Promise.reject(`Canceled in pre${action} event.`);
    }

    const unlock = this._lock.lock();
    this._state = CHANGING_STATE;

    if (options.animation) {
      this._updateAnimation(options.animation);
    }

    return new Promise(resolve => {
      this._animator[action](() => {
        util.iosPageScrollFix(shouldOpen);
        this._state = FINAL_STATE;
        unlock();
        this._emitEvent(`post${action}`);
        options.callback instanceof Function && options.callback(this);
        resolve(this);
      });
    });
  }

  /**
   * @method load
   * @signature load(page, [options])
   * @param {String} page
   *   [en]Page URL. Can be either an HTML document or a `<template>`.[/en]
   *   [ja]pageのURLか、`<template>`で宣言したテンプレートのid属性の値を指定します。[/ja]
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
    return ['preopen', 'postopen', 'preclose', 'postclose', 'modechange', 'swipe'];
  }

  static get rewritables() {
    return rewritables;
  }
}

util.defineBooleanProperties(SplitterSideElement, ['swipeable']);

onsElements.SplitterSide = SplitterSideElement;
customElements.define('ons-splitter-side', SplitterSideElement);
