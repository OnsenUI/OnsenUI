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
import AnimatorFactory from 'ons/internal/animator-factory';
import PopoverAnimator from './animator';
import FadePopoverAnimator from './fade-animator';
import platform from 'ons/platform';
import BaseElement from 'ons/base-element';
import deviceBackButtonDispatcher from 'ons/device-back-button-dispatcher';
import DoorLock from 'ons/doorlock';

const scheme = {
  '.popover': 'popover--*',
  '.popover__content': 'popover__content--*'
};

const templateSource = util.createElement(`
  <div>
    <div class="popover-mask"></div>
    <div class="popover">
      <div class="popover__content"></div>
      <div class="popover__arrow"></div>
    </div>
  </div>
`);

const _animatorDict = {
  'fade': FadePopoverAnimator,
  'none': PopoverAnimator
};

/**
 * @element ons-popover
 * @category popover
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
      ModifierUtil.initModifier(this, scheme);

      this.setAttribute('_compiled', '');
    }

    this._visible = false;
    this._doorLock = new DoorLock();
    this._boundOnChange = this._onChange.bind(this);
    this._boundCancel = this._cancel.bind(this);


    this._animatorFactory = this._createAnimatorFactory();
  }

  _createAnimatorFactory() {
    return new AnimatorFactory({
      animators: _animatorDict,
      baseClass: PopoverAnimator,
      baseClassName: 'PopoverAnimator',
      defaultAnimation: this.getAttribute('animation') || 'fade'
    });
  }

  _onDeviceBackButton(event) {
    if (this.isCancelable()) {
      this._cancel();
    } else {
      event.callParentHandler();
    }
  }

  _setDirection(direction) {
    let arrowPosition;
    if (direction === 'up') {
      arrowPosition = 'bottom';
    } else if (direction === 'left') {
      arrowPosition = 'right';
    } else if (direction === 'down') {
      arrowPosition = 'top';
    } else if (direction == 'right') {
      arrowPosition = 'left';
    } else {
      throw new Error('Invalid direction.');
    }

    const popoverClassList = this._popover.classList;
    popoverClassList.remove('popover--up');
    popoverClassList.remove('popover--down');
    popoverClassList.remove('popover--left');
    popoverClassList.remove('popover--right');
    popoverClassList.add('popover--' + direction);

    const arrowClassList = this._arrow.classList;
    arrowClassList.remove('popover__top-arrow');
    arrowClassList.remove('popover__bottom-arrow');
    arrowClassList.remove('popover__left-arrow');
    arrowClassList.remove('popover__right-arrow');
    arrowClassList.add('popover__' + arrowPosition + '-arrow');
  }

  _positionPopoverByDirection(target, direction) {
    const el = this._popover;
    const pos = target.getBoundingClientRect();
    let own = el.getBoundingClientRect();
    const arrow = el.children[1];
    const offset = 14;
    const margin = 6;
    const radius = parseInt(window.getComputedStyle(el.querySelector('.popover__content')).borderRadius);

    arrow.style.top = '';
    arrow.style.left = '';

    this._setDirection(direction);

    // Position popover next to the target.
    if (['left', 'right'].indexOf(direction) > -1) {
      if (direction == 'left') {
        el.style.left = (pos.right - pos.width - own.width - offset) + 'px';
      } else {
        el.style.left = (pos.right + offset) + 'px';
      }
      el.style.top = (pos.bottom - pos.height / 2 - own.height / 2) + 'px';
    } else {
      if (direction == 'up') {
        el.style.top = (pos.bottom - pos.height - own.height - offset) + 'px';
      } else {
        el.style.top = (pos.bottom + offset) + 'px';
      }
      el.style.left = (pos.right - pos.width / 2 - own.width / 2) + 'px';
    }

    own = el.getBoundingClientRect();

    // This is the difference between the side and the hypothenuse of the arrow.
    const diff = (function(x) {
      return (x / 2) * Math.sqrt(2) - x / 2;
    })(parseInt(window.getComputedStyle(arrow).width));

    // This is the limit for the arrow. If it's moved further than this it's outside the popover.
    const limit = margin + radius + diff + 2;


    // Keep popover inside window and arrow inside popover.
    if (['left', 'right'].indexOf(direction) > -1) {
      if (own.top < margin) {
        arrow.style.top = Math.max(own.height / 2 + own.top - margin, limit)  + 'px';
        el.style.top = margin + 'px';
      } else if (own.bottom > window.innerHeight - margin) {
        arrow.style.top = Math.min(own.height / 2 - (window.innerHeight - own.bottom) + margin, own.height - limit) + 'px';
        el.style.top = (window.innerHeight - own.height - margin) + 'px';
      }
    } else {
      if (own.left < margin) {
        arrow.style.left = Math.max(own.width / 2 + own.left - margin, limit) + 'px';
        el.style.left = margin + 'px';
      } else if (own.right > window.innerWidth - margin) {
        arrow.style.left = Math.min(own.width / 2 - (window.innerWidth - own.right) + margin, own.width - limit) + 'px';
        el.style.left = (window.innerWidth - own.width - margin) + 'px';
      }
    }

    // Prevent animit from restoring the style.
    el.removeAttribute('data-animit-orig-style');
  }

  _positionPopover(target) {
    const directions = (() => {
      if (!this.hasAttribute('direction')) {
        return ['up', 'down', 'left', 'right'];
      } else {
        return this.getAttribute('direction').split(/\s+/);
      }
    })();

    const position = target.getBoundingClientRect();

    // The popover should be placed on the side with the most space.
    const scores = {
      left: position.left,
      right: window.innerWidth - position.right,
      up: position.top,
      down: window.innerHeight - position.bottom
    };

    const orderedDirections = Object.keys(scores).sort((a, b) => -(scores[a] - scores[b]));
    for (let i = 0, l = orderedDirections.length; i < l; i++) {
      const direction = orderedDirections[i];
      if (directions.indexOf(direction) > -1) {
        this._positionPopoverByDirection(target, direction);
        return;
      }
    }
  }

  _onChange() {
    setImmediate(() => {
      if (this._currentTarget) {
        this._positionPopover(this._currentTarget);
      }
    });
  }

  _compile() {
    const templateElement = templateSource.cloneNode(true);
    const content = templateElement.querySelector('.popover__content');
    const style = this.getAttribute('style');

    if (style) {
      this.removeAttribute('style');
    }

    while (this.childNodes[0]) {
      content.appendChild(this.childNodes[0]);
    }

    while (templateElement.children[0]) {
      this.appendChild(templateElement.children[0]);
    }

    if (style) {
      this._popover.setAttribute('style', style);
    }

    this.style.display = 'none';

    this._mask.style.zIndex = '20000';
    this._popover.style.zIndex = '20001';

    if (this.hasAttribute('mask-color')) {
      this._mask.style.backgroundColor = this.getAttribute('mask-color');
    }
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
   *   [en]Animation name. Available animations are "fade" and "none".[/en]
   *   [ja]アニメーション名を指定します。"fade"もしくは"none"を指定できます。[/ja]
   * @param {String} [options.animationOptions]
   *   [en]Specify the animation's duration, delay and timing. E.g.  <code>{duration: 0.2, delay: 0.4, timing: 'ease-in'}</code>[/en]
   *   [ja]アニメーション時のduration, delay, timingを指定します。e.g. <code>{duration: 0.2, delay: 0.4, timing: 'ease-in'}</code> [/ja]
   * @param {Function} [options.callback]
   *   [en]This function is called after the popover has been revealed.[/en]
   *   [ja]ポップオーバーが表示され終わった後に呼び出される関数オブジェクトを指定します。[/ja]
   * @description
   *   [en]Open the popover and point it at a target. The target can be either an event, a css selector or a DOM element..[/en]
   *   [ja]対象とする要素にポップオーバーを表示します。target引数には、$eventオブジェクトやDOMエレメントやCSSセレクタを渡すことが出来ます。[/ja]
   */
  show(target, options = {}) {
    const callback = options.callback || function() {};

    if (typeof target === 'string') {
      target = document.querySelector(target);
    } else if (target instanceof Event) {
      target = target.target;
    }

    if (!target) {
     throw new Error('Target undefined');
    }


    if (options.animation &&
      !(options.animation in _animatorDict)) {
      throw new Error(`Animator ${options.animation} is not registered.`);
    }

    options.animationOptions = util.extend(
      options.animationOptions || {},
      AnimatorFactory.parseAnimationOptionsString(this.getAttribute('animation-options'))
    );

    let canceled = false;
    util.triggerElementEvent(this, 'preshow', {
      popover: this,
      cancel: function() {
        canceled = true;
      }
    });

    if (!canceled) {
      this._doorLock.waitUnlock(() => {
        const unlock = this._doorLock.lock();

        this.style.display = 'block';

        this._currentTarget = target;
        this._positionPopover(target);

        const animator = this._animatorFactory.newAnimator(options);
        animator.show(this, () => {
          this._visible = true;
          unlock();

          util.triggerElementEvent(this, 'postshow', {popover: this});
          callback();
        });
      });
    }
  }

  /**
   * @method hide
   * @signature hide([options])
   * @param {Object} [options]
   *   [en]Parameter object.[/en]
   *   [ja]オプションを指定するオブジェクト。[/ja]
   * @param {String} [options.animation]
   *   [en]Animation name. Available animations are "fade" and "none".[/en]
   *   [ja]アニメーション名を指定します。"fade"もしくは"none"を指定できます。[/ja]
   * @param {String} [options.animationOptions]
   *   [en]Specify the animation's duration, delay and timing. E.g.  <code>{duration: 0.2, delay: 0.4, timing: 'ease-in'}</code>[/en]
   *   [ja]アニメーション時のduration, delay, timingを指定します。e.g. <code>{duration: 0.2, delay: 0.4, timing: 'ease-in'}</code> [/ja]
   * @param {Function} [options.callback]
   *   [en]This functions is called after the popover has been hidden.[/en]
   *   [ja]ポップオーバーが隠れた後に呼び出される関数オブジェクトを指定します。[/ja]
   * @description
   *   [en]Close the popover.[/en]
   *   [ja]ポップオーバーを閉じます。[/ja]
   */
  hide(options = {}) {
    const callback = options.callback || function() {};

    let canceled = false;
    util.triggerElementEvent(this, 'prehide', {
      popover: this,
      cancel: function() {
        canceled = true;
      }
    });

    if (!canceled) {
      this._doorLock.waitUnlock(() => {
        const unlock = this._doorLock.lock();

        const animator = this._animatorFactory.newAnimator(options);
        animator.hide(this, () => {
          this.style.display = 'none';
          this._visible = false;
          unlock();
          util.triggerElementEvent(this, 'posthide', {popover: this});
          callback();
        });
      });
    }
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
    return this._visible;
  }

  attachedCallback() {
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
    else if (name === 'direction') {
      this._boundOnChange();
    }
    else if (name === 'animation' || name === 'animation-options') {
      this._animatorFactory = this._createAnimatorFactory();
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
      this.hide();
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
  if (!(Animator.prototype instanceof PopoverAnimator)) {
    throw new Error('"Animator" param must inherit PopoverAnimator');
  }
  _animatorDict[name] = Animator;
};

window.OnsPopoverElement.PopoverAnimator = PopoverAnimator;

