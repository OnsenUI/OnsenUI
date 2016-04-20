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
import autoStyle from 'ons/autostyle';
import ModifierUtil from 'ons/internal/modifier-util';
import AnimatorFactory from 'ons/internal/animator-factory';
import animators from './animator';
import platform from 'ons/platform';
import BaseElement from 'ons/base-element';
import deviceBackButtonDispatcher from 'ons/device-back-button-dispatcher';
import DoorLock from 'ons/doorlock';

const scheme = {
  '.popover': 'popover--*',
  '.popover-mask': 'popover-mask--*',
  '.popover__container': 'popover__container--*',
  '.popover__content': 'popover__content--*',
  '.popover__arrow': 'popover__arrow--*'
};

const _animatorDict = {
  'default': () => platform.isAndroid() ? animators.MDFadePopoverAnimator : animators.IOSFadePopoverAnimator,
  'none': animators.PopoverAnimator,
  'fade-ios': animators.IOSFadePopoverAnimator,
  'fade-md': animators.MDFadePopoverAnimator
};

const templateSource = util.createFragment(`
  <div class="popover-mask"></div>
  <div class="popover__container">
    <div class="popover__content"></div>
    <div class="popover__arrow"></div>
  </div>
`);

const positions = {
  up: 'bottom',
  left: 'right',
  down: 'top',
  right: 'left'
};

const directions = Object.keys(positions);
/**
 * @element ons-popover
 * @category dialog
 * @description
 *  [en]A component that displays a popover next to an element.[/en]
 *  [ja]ある要素を対象とするポップオーバーを表示するコンポーネントです。[/ja]
 * @codepen ZYYRKo
 * @example
 * <script>
 * ons.ready(function() {
 *   ons.createPopover('popover.html').then(function(popover) {
 *     popover.show('#mybutton');
 *   });
 * });
 * </script>
 *
 * <script type="text/ons-template" id="popover.html">
 *   <ons-popover cancelable>
 *     <p style="text-align: center; opacity: 0.5;">This popover will choose which side it's displayed on automatically.</p>
 *   </ons-popover>
 * </script>
 */
class PopoverElement extends BaseElement {

  /**
   * @event preshow
   * @description
   *   [en]Fired just before the popover is displayed.[/en]
   *   [ja]ポップオーバーが表示される直前に発火します。[/ja]
   * @param {Object} event [en]Event object.[/en]
   * @param {Object} event.popover
   *   [en]Component object.[/en]
   *   [ja]コンポーネントのオブジェクト。[/ja]
   * @param {Function} event.cancel
   *   [en]Call this function to stop the popover from being shown.[/en]
   *   [ja]この関数を呼び出すと、ポップオーバーの表示がキャンセルされます。[/ja]
   */

  /**
   * @event postshow
   * @description
   *   [en]Fired just after the popover is displayed.[/en]
   *   [ja]ポップオーバーが表示された直後に発火します。[/ja]
   * @param {Object} event [en]Event object.[/en]
   * @param {Object} event.popover
   *   [en]Component object.[/en]
   *   [ja]コンポーネントのオブジェクト。[/ja]
   */

  /**
   * @event prehide
   * @description
   *   [en]Fired just before the popover is hidden.[/en]
   *   [ja]ポップオーバーが隠れる直前に発火します。[/ja]
   * @param {Object} event [en]Event object.[/en]
   * @param {Object} event.popover
   *   [en]Component object.[/en]
   *   [ja]コンポーネントのオブジェクト。[/ja]
   * @param {Function} event.cancel
   *   [en]Call this function to stop the popover from being hidden.[/en]
   *   [ja]この関数を呼び出すと、ポップオーバーが隠れる処理をキャンセルします。[/ja]
   */

  /**
   * @event posthide
   * @description
   *   [en]Fired just after the popover is hidden.[/en]
   *   [ja]ポップオーバーが隠れた後に発火します。[/ja]
   * @param {Object} event [en]Event object.[/en]
   * @param {Object} event.popover
   *   [en]Component object.[/en]
   *   [ja]コンポーネントのオブジェクト。[/ja]
   */

  /**
   * @attribute modifier
   * @type {String}
   * @description
   *  [en]The appearance of the popover.[/en]
   *  [ja]ポップオーバーの表現を指定します。[/ja]
   */

  /**
   * @attribute direction
   * @type {String}
   * @description
   *  [en]
   *    A space separated list of directions. If more than one direction is specified,
   *    it will be chosen automatically. Valid directions are "up", "down", "left" and "right".
   *  [/en]
   *  [ja]
   *    ポップオーバーを表示する方向を空白区切りで複数指定できます。
   *    指定できる方向は、"up", "down", "left", "right"の4つです。空白区切りで複数指定することもできます。
   *    複数指定された場合、対象とする要素に合わせて指定した値から自動的に選択されます。
   *  [/ja]
   */

  /**
   * @attribute cancelable
   * @description
   *   [en]If this attribute is set the popover can be closed by tapping the background or by pressing the back button.[/en]
   *   [ja]この属性があると、ポップオーバーが表示された時に、背景やバックボタンをタップした時にをポップオーバー閉じます。[/ja]
   */

  /**
   * @attribute cover-target
   * @description
   *   [en]If set the popover will cover the target on the screen.[/en]
   *   [ja][/ja]
   */

  /**
   * @attribute animation
   * @type {String}
   * @description
   *   [en]The animation used when showing an hiding the popover. Can be either "none" or "fade".[/en]
   *   [ja]ポップオーバーを表示する際のアニメーション名を指定します。[/ja]
   */

  /**
   * @attribute animation-options
   * @type {Expression}
   * @description
   *  [en]Specify the animation's duration, timing and delay with an object literal. E.g. <code>{duration: 0.2, delay: 1, timing: 'ease-in'}</code>[/en]
   *  [ja]アニメーション時のduration, timing, delayをオブジェクトリテラルで指定します。e.g. <code>{duration: 0.2, delay: 1, timing: 'ease-in'}</code>[/ja]
   */

  /**
   * @attribute mask-color
   * @type {Color}
   * @description
   *   [en]Color of the background mask. Default is "rgba(0, 0, 0, 0.2)".[/en]
   *   [ja]背景のマスクの色を指定します。デフォルトは"rgba(0, 0, 0, 0.2)"です。[/ja]
   */

  get _mask() {
    return this.children[0];
  }

  get _popover() {
    return this.children[1];
  }

  get _content() {
    return this._popover.children[0];
  }

  get _arrow() {
    return this._popover.children[1];
  }

  createdCallback() {
    if (!this.hasAttribute('_compiled')) {
      this._compile();
    }

    this._doorLock = new DoorLock();
    this._boundOnChange = this._onChange.bind(this);
    this._boundCancel = this._cancel.bind(this);

    this._initAnimatorFactory();
  }

  _initAnimatorFactory() {
    const factory = new AnimatorFactory({
      animators: _animatorDict,
      baseClass: animators.PopoverAnimator,
      baseClassName: 'PopoverAnimator',
      defaultAnimation: this.getAttribute('animation') || 'default'
    });
    this._animator = (options) => factory.newAnimator(options);
  }

  _onDeviceBackButton(event) {
    if (this.isCancelable()) {
      this._cancel();
    } else {
      event.callParentHandler();
    }
  }

  _positionPopover(target) {
    const {_radius: radius, _content: el, _margin: margin} = this;
    const pos = target.getBoundingClientRect();
    const isMD = util.hasModifier(this, 'material');
    const cover = isMD && this.hasAttribute('cover-target');

    const distance = {
      top: pos.top - margin,
      left: pos.left - margin,
      right: window.innerWidth - pos.right - margin,
      bottom: window.innerHeight - pos.bottom - margin
    };

    const {vertical, primary, secondary} = this._calculateDirections(distance);
    this._popover.classList.add('popover--' + primary);

    const offset = cover ? 0 : (vertical ? pos.height : pos.width) + (isMD ? 0 : 14);
    this.style[primary] = Math.max(0, distance[primary] + offset) + margin + 'px';
    el.style[primary] = 0;

    const l = vertical ? 'width' : 'height';
    const sizes = (style => ({
      width: parseInt(style.getPropertyValue('width')),
      height: parseInt(style.getPropertyValue('height'))
    }))(window.getComputedStyle(el));

    el.style[secondary] = Math.max(0, distance[secondary] - (sizes[l] - pos[l]) / 2) + 'px';
    this._arrow.style[secondary] = Math.max(radius, distance[secondary] + pos[l] / 2) + 'px';

    this._setTransformOrigin(distance, sizes, pos, primary);

    // Prevent animit from restoring the style.
    el.removeAttribute('data-animit-orig-style');
  }

  _setTransformOrigin(distance, sizes, pos, primary) {
    const calc = (a, o, l) => primary === a ? sizes[l] / 2 : distance[a] + (primary === o ? -sizes[l] : sizes[l] - pos[l]) / 2;
    const [x, y] = [calc('left', 'right', 'width') + 'px', calc('top', 'bottom', 'height') + 'px'];
    util.extend(this._popover.style, {
      transformOrigin: x + ' ' + y,
      webkitTransformOriginX: x,
      webkitTransformOriginY: y
    });
  }

  _calculateDirections(distance) {
    const options = (this.getAttribute('direction') || 'up down left right').split(/\s+/).map(e => positions[e]);
    const primary = options.sort((a, b) => distance[a] - distance[b])[0];
    const vertical = ['top', 'bottom'].indexOf(primary) !== -1;
    let secondary;

    if (vertical) {
      secondary = distance.left < distance.right ? 'left' : 'right';
    } else {
      secondary = distance.top < distance.bottom ? 'top' : 'bottom';
    }

    return {vertical, primary, secondary};
  }

  _clearStyles() {
    ['top', 'bottom', 'left', 'right'].forEach(e => {
      this._arrow.style[e] = this._content.style[e] = this.style[e] = '';
      this._popover.classList.remove(`popover--${e}`);
    });
  }

  _onChange() {
    setImmediate(() => {
      if (this._currentTarget) {
        this._positionPopover(this._currentTarget);
      }
    });
  }

  _compile() {
    autoStyle.prepare(this);

    this.classList.add('popover');

    const template = templateSource.cloneNode(true);
    const content = template.querySelector('.popover__content');

    while (this.childNodes[0]) {
      content.appendChild(this.childNodes[0]);
    }

    this.appendChild(template);

    if (this.hasAttribute('style')) {
      this._popover.setAttribute('style', this.getAttribute('style'));
      this.removeAttribute('style');
    }

    if (this.hasAttribute('mask-color')) {
      this._mask.style.backgroundColor = this.getAttribute('mask-color');
    }

    ModifierUtil.initModifier(this, scheme);

    this.setAttribute('_compiled', '');
  }

  _prepareAnimationOptions(options) {
    if (options.animation && !(options.animation in _animatorDict)) {
      throw new Error(`Animator ${options.animation} is not registered.`);
    }

    options.animationOptions = util.extend(
      AnimatorFactory.parseAnimationOptionsString(this.getAttribute('animation-options')),
      options.animationOptions || {}
    );
  }

  _executeAction(actions, options = {}) {
    const callback = options.callback;
    const {action, before, after} = actions;

    this._prepareAnimationOptions(options);

    let canceled = false;
    util.triggerElementEvent(this, `pre${action}`, { // synchronous
      popover: this,
      cancel: () => canceled = true
    });

    if (canceled) {
      return Promise.reject(`Canceled in pre${action} event.`);
    }

    return new Promise(resolve => {
      this._doorLock.waitUnlock(() => {
        const unlock = this._doorLock.lock();

        before && before();

        this._animator(options)[action](this, () => {
          after && after();

          unlock();

          util.triggerElementEvent(this, `post${action}`, {popover: this});

          callback && callback();
          resolve(this);
        });
      });
    });
  }

  /**
   * @method show
   * @signature show(target, [options])
   * @param {String|Event|HTMLElement} target
   *   [en]Target element. Can be either a CSS selector, an event object or a DOM element.[/en]
   *   [ja]ポップオーバーのターゲットとなる要素を指定します。CSSセレクタかeventオブジェクトかDOM要素のいずれかを渡せます。[/ja]
   * @param {Object} [options]
   *   [en]Parameter object.[/en]
   *   [ja]オプションを指定するオブジェクト。[/ja]
   * @param {String} [options.animation]
   *   [en]Animation name.  Use one of "fade-ios", "fade-md", "none" and "default".[/en]
   *   [ja]アニメーション名を指定します。"fade-ios", "fade-md", "none", "default"のいずれかを指定できます。[/ja]
   * @param {String} [options.animationOptions]
   *   [en]Specify the animation's duration, delay and timing. E.g.  <code>{duration: 0.2, delay: 0.4, timing: 'ease-in'}</code>[/en]
   *   [ja]アニメーション時のduration, delay, timingを指定します。e.g. <code>{duration: 0.2, delay: 0.4, timing: 'ease-in'}</code> [/ja]
   * @param {Function} [options.callback]
   *   [en]This function is called after the popover has been revealed.[/en]
   *   [ja]ポップオーバーが表示され終わった後に呼び出される関数オブジェクトを指定します。[/ja]
   * @description
   *   [en]Open the popover and point it at a target. The target can be either an event, a css selector or a DOM element..[/en]
   *   [ja]対象とする要素にポップオーバーを表示します。target引数には、$eventオブジェクトやDOMエレメントやCSSセレクタを渡すことが出来ます。[/ja]
   * @return {Promise}
   *   [en]Resolves to the displayed element[/en]
   *   [ja][/ja]
   */
  show(target, options = {}) {
    if (typeof target === 'string') {
      target = document.querySelector(target);
    } else if (target instanceof Event) {
      target = target.target;
    }
    if (!(target instanceof HTMLElement)) {
     throw new Error('Invalid target');
    }

    return this._executeAction({
      action: 'show',
      before: () => {
        this.style.display = 'block';
        this._currentTarget = target;
        this._positionPopover(target);
      }
    }, options);
  }

  /**
   * @method hide
   * @signature hide([options])
   * @param {Object} [options]
   *   [en]Parameter object.[/en]
   *   [ja]オプションを指定するオブジェクト。[/ja]
   * @param {String} [options.animation]
   *   [en]Animation name.  Use one of "fade-ios", "fade-md", "none" and "default".[/en]
   *   [ja]アニメーション名を指定します。"fade-ios", "fade-md", "none", "default"のいずれかを指定できます。[/ja]
   * @param {String} [options.animationOptions]
   *   [en]Specify the animation's duration, delay and timing. E.g.  <code>{duration: 0.2, delay: 0.4, timing: 'ease-in'}</code>[/en]
   *   [ja]アニメーション時のduration, delay, timingを指定します。e.g. <code>{duration: 0.2, delay: 0.4, timing: 'ease-in'}</code> [/ja]
   * @param {Function} [options.callback]
   *   [en]This functions is called after the popover has been hidden.[/en]
   *   [ja]ポップオーバーが隠れた後に呼び出される関数オブジェクトを指定します。[/ja]
   * @description
   *   [en]Close the popover.[/en]
   *   [ja]ポップオーバーを閉じます。[/ja]
   * @return {Promise}
   *   [en]Resolves to the hidden element[/en]
   *   [ja][/ja]
   */
  hide(options = {}) {
    return this._executeAction({
      action: 'hide',
      after: () => {
        this.style.display = 'none';
        this._clearStyles();
      }
    }, options);
  }

  /**
   * @method isShown
   * @signature isShown()
   * @return {Boolean}
   *   [en]true if the popover is visible.[/en]
   *   [ja]ポップオーバーが表示されている場合にtrueとなります。[/ja]
   * @description
   *   [en]Returns whether the popover is visible or not.[/en]
   *   [ja]ポップオーバーが表示されているかどうかを返します。[/ja]
   */
  isShown() {
    return window.getComputedStyle(this).getPropertyValue('display') !== 'none';
  }

  attachedCallback() {
    this._margin = this._margin || parseInt(window.getComputedStyle(this).getPropertyValue('top'));
    this._radius = parseInt(window.getComputedStyle(this._content).getPropertyValue('border-radius'));

    this._mask.addEventListener('click', this._boundCancel, false);

    this._deviceBackButtonHandler = deviceBackButtonDispatcher.createHandler(this, this._onDeviceBackButton.bind(this));

    this._popover.addEventListener('DOMNodeInserted', this._boundOnChange, false);
    this._popover.addEventListener('DOMNodeRemoved', this._boundOnChange, false);

    window.addEventListener('resize', this._boundOnChange, false);
  }

  detachedCallback() {
    this._mask.removeEventListener('click', this._boundCancel, false);

    this._deviceBackButtonHandler.destroy();
    this._deviceBackButtonHandler = null;

    this._popover.removeEventListener('DOMNodeInserted', this._boundOnChange, false);
    this._popover.removeEventListener('DOMNodeRemoved', this._boundOnChange, false);

    window.removeEventListener('resize', this._boundOnChange, false);
  }

  attributeChangedCallback(name, last, current) {
    if (name === 'modifier') {
      return ModifierUtil.onModifierChanged(last, current, this, scheme);
    }
    if (name === 'direction') {
      return this._boundOnChange();
    }
    if (name === 'animation') {
      this._initAnimatorFactory();
    }
  }

  /**
   * @method setCancelable
   * @signature setCancelable(cancelable)
   * @param {Boolean} cancelable
   *   [en]If true the popover will be cancelable.[/en]
   *   [ja]ポップオーバーがキャンセル可能にしたい場合にtrueを指定します。[/ja]
   * @description
   *   [en]Set whether the popover can be canceled by the user when it is shown.[/en]
   *   [ja]ポップオーバーを表示した際に、ユーザがそのポップオーバーをキャンセルできるかどうかを指定します。[/ja]
   */
  setCancelable(cancelable) {
    if (typeof cancelable !== 'boolean') {
      throw new Error('Argument must be a boolean.');
    }

    if (cancelable) {
      this.setAttribute('cancelable', '');
    } else {
      this.removeAttribute('cancelable');
    }
  }

  /**
   * @method isCancelable
   * @signature isCancelable()
   * @return {Boolean}
   *   [en]true if the popover is cancelable.[/en]
   *   [ja]ポップオーバーがキャンセル可能であればtrueとなります。[/ja]
   * @description
   *   [en]Returns whether the popover is cancelable or not.[/en]
   *   [ja]このポップオーバーがキャンセル可能かどうかを返します。[/ja]
   */
  isCancelable() {
    return this.hasAttribute('cancelable');
  }

  /**
   * @method destroy
   * @signature destroy()
   * @description
   *   [en]Destroy the popover and remove it from the DOM tree.[/en]
   *   [ja]ポップオーバーを破棄して、DOMツリーから取り除きます。[/ja]
   */
  destroy() {
    if (this.parentElement) {
      this.parentElement.removeChild(this);
    }
  }

  _cancel() {
    if (this.isCancelable()) {
      this.hide({
        callback: () => {
          util.triggerElementEvent(this, 'cancel');
        }
      });
    }
  }
}

window.OnsPopoverElement = document.registerElement('ons-popover', {
  prototype: PopoverElement.prototype
});

/**
 * @param {String} name
 * @param {PopoverAnimator} Animator
 */
window.OnsPopoverElement.registerAnimator = function(name, Animator) {
  if (!(Animator.prototype instanceof animators.PopoverAnimator)) {
    throw new Error('"Animator" param must inherit PopoverAnimator');
  }
  _animatorDict[name] = Animator;
};

window.OnsPopoverElement.PopoverAnimator = animators.PopoverAnimator;

