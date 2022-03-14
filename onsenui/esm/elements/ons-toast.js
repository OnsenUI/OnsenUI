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
import autoStyle from '../ons/autostyle.js';
import ModifierUtil from '../ons/internal/modifier-util.js';
import AnimatorFactory from '../ons/internal/animator-factory.js';
import ToastAnimator from './ons-toast/animator.js';
import FadeToastAnimator from './ons-toast/fade-animator.js';
import AscendToastAnimator from './ons-toast/ascend-animator.js';
import LiftToastAnimator from './ons-toast/lift-animator.js';
import FallToastAnimator from './ons-toast/fall-animator.js';
import platform from '../ons/platform.js';
import BaseDialogElement from './base/base-dialog.js';
import contentReady from '../ons/content-ready.js';

const scheme = {
  '.toast': 'toast--*',
  '.toast__message': 'toast--*__message',
  '.toast__button': 'toast--*__button'
};

const defaultClassName = 'toast';

const _animatorDict = {
  'default': platform.isAndroid() ? AscendToastAnimator : LiftToastAnimator,
  'fade': FadeToastAnimator,
  'ascend': AscendToastAnimator,
  'lift': LiftToastAnimator,
  'fall': FallToastAnimator,
  'none': ToastAnimator
};

/**
 * @element ons-toast
 * @category dialog
 * @description
 *   [en]
 *     The Toast or Snackbar component is useful for displaying dismissable information or simple actions at (normally) the bottom of the page.
 *
 *     This component does not block user input, allowing the app to continue its flow. For simple toasts, consider `ons.notification.toast` instead.
 *   [/en]
 *   [ja][/ja]
 * @tutorial vanilla/Reference/toast
 * @seealso ons-alert-dialog
 *   [en]The `<ons-alert-dialog>` component is preferred for displaying undismissable information.[/en]
 *   [ja][/ja]
 */
export default class ToastElement extends BaseDialogElement {

  /**
   * @event preshow
   * @description
   *   [en]Fired just before the toast is displayed.[/en]
   *   [ja]ダイアログが表示される直前に発火します。[/ja]
   * @param {Object} event [en]Event object.[/en]
   * @param {Object} event.toast
   *   [en]Toast object.[/en]
   *   [ja]ダイアログのオブジェクト。[/ja]
   * @param {Function} event.cancel
   *   [en]Execute to stop the toast from showing.[/en]
   *   [ja]この関数を実行すると、ダイアログの表示を止めます。[/ja]
   */

  /**
   * @event postshow
   * @description
   *   [en]Fired just after the toast is displayed.[/en]
   *   [ja]ダイアログが表示された直後に発火します。[/ja]
   * @param {Object} event [en]Event object.[/en]
   * @param {Object} event.toast
   *   [en]Toast object.[/en]
   *   [ja]ダイアログのオブジェクト。[/ja]
   */

  /**
   * @event prehide
   * @description
   *   [en]Fired just before the toast is hidden.[/en]
   *   [ja]ダイアログが隠れる直前に発火します。[/ja]
   * @param {Object} event [en]Event object.[/en]
   * @param {Object} event.toast
   *   [en]Toast object.[/en]
   *   [ja]ダイアログのオブジェクト。[/ja]
   * @param {Function} event.cancel
   *   [en]Execute to stop the toast from hiding.[/en]
   *   [ja]この関数を実行すると、ダイアログが閉じようとするのを止めます。[/ja]
   */

  /**
   * @event posthide
   * @description
   * [en]Fired just after the toast is hidden.[/en]
   * [ja]ダイアログが隠れた後に発火します。[/ja]
   * @param {Object} event [en]Event object.[/en]
   * @param {Object} event.toast
   *   [en]Toast object.[/en]
   *   [ja]ダイアログのオブジェクト。[/ja]
   */

  /**
   * @attribute animation
   * @type {String}
   * @default default
   * @description
   *  [en]The animation used when showing and hiding the toast. Can be either `"default"`, `"ascend"` (Android), `"lift"` (iOS), `"fall"`, `"fade"` or `"none"`.[/en]
   *  [ja][/ja]
   */

  /**
   * @attribute animation-options
   * @type {Expression}
   * @description
   *  [en]Specify the animation's duration, timing and delay with an object literal. E.g. `{duration: 0.2, delay: 1, timing: 'ease-in'}`.[/en]
   *  [ja]アニメーション時のduration, timing, delayをオブジェクトリテラルで指定します。e.g. <code>{duration: 0.2, delay: 1, timing: 'ease-in'}</code>[/ja]
   */

  /**
   * @property animationOptions
   * @type {Object}
   * @description
   *   [en]Specify the animation's duration, timing and delay with an object literal. E.g. `{duration: 0.2, delay: 1, timing: 'ease-in'}`.[/en]
   *   [ja]アニメーション時のduration, timing, delayをオブジェクトリテラルで指定します。例：{duration: 0.2, delay: 1, timing: 'ease-in'}[/ja]
   */

  /**
   * @attribute visible
   * @type {Boolean}
   * @description
   *   [en]Whether the toast is visible or not.[/en]
   *   [ja]要素が見える場合に`true`。[/ja]
   */

  constructor() {
    super();

    this._defaultDBB = null;
    contentReady(this, () => this._compile());
  }

  get _scheme() {
    return scheme;
  }

  get _toast() {
    return util.findChild(this, `.${defaultClassName}`);
  }

  _updateAnimatorFactory() {
    // Reset position style
    this._toast && (this._toast.style.top = this._toast.style.bottom = '');

    return new AnimatorFactory({
      animators: _animatorDict,
      baseClass: ToastAnimator,
      baseClassName: 'ToastAnimator',
      defaultAnimation: this.getAttribute('animation')
    });
  }

  /**
   * @property onDeviceBackButton
   * @type {Object}
   * @description
   *   [en]Back-button handler.[/en]
   *   [ja]バックボタンハンドラ。[/ja]
   */

  _compile() {
    autoStyle.prepare(this);

    this.style.display = 'none';
    this.style.zIndex = 10000; // Lower than dialogs

    const messageClassName = 'toast__message';
    const buttonClassName = 'toast__button';

    let toast = util.findChild(this, `.${defaultClassName}`);
    if (!toast) {
      toast = document.createElement('div');
      toast.classList.add(defaultClassName);
      while (this.childNodes[0]) {
        toast.appendChild(this.childNodes[0]);
      }
    }

    let button = util.findChild(toast, `.${buttonClassName}`);
    if (!button) {
      button = util.findChild(toast, e => util.match(e, '.button') || util.match(e, 'button'));
      if (button) {
        button.classList.remove('button');
        button.classList.add(buttonClassName);
        toast.appendChild(button);
      }
    }

    if (!util.findChild(toast, `.${messageClassName}`)) {
      let message = util.findChild(toast, '.message');
      if (!message) {
        message = document.createElement('div');
        for (let i = toast.childNodes.length - 1; i >= 0; i--) {
          if (toast.childNodes[i] !== button) {
            message.insertBefore(toast.childNodes[i], message.firstChild);
          }
        }
      }
      message.classList.add(messageClassName);

      toast.insertBefore(message, toast.firstChild);
    }

    if (toast.parentNode !== this) {
      this.appendChild(toast);
    }

    ModifierUtil.initModifier(this, this._scheme);
  }

  /**
   * @property visible
   * @type {Boolean}
   * @description
   *   [en]Whether the element is visible or not.[/en]
   *   [ja]要素が見える場合に`true`。[/ja]
   */

  /**
   * @method show
   * @signature show([options])
   * @param {Object} [options]
   *   [en]Parameter object.[/en]
   *   [ja]オプションを指定するオブジェクト。[/ja]
   * @param {String} [options.animation]
   *   [en]Animation name. Available animations are `"default"`, `"ascend"` (Android), `"lift"` (iOS), `"fall"`, `"fade"` or `"none"`.[/en]
   *   [ja][/ja]
   * @param {String} [options.animationOptions]
   *   [en]Specify the animation's duration, delay and timing. E.g. `{duration: 0.2, delay: 0.4, timing: 'ease-in'}`.[/en]
   *   [ja]アニメーション時のduration, delay, timingを指定します。e.g. {duration: 0.2, delay: 0.4, timing: 'ease-in'}[/ja]
   * @description
   *   [en]Show the element.[/en]
   *   [ja][/ja]
   * @return {Promise}
   *   [en]Resolves to the displayed element[/en]
   *   [ja][/ja]
   */

  /**
   * @method toggle
   * @signature toggle([options])
   * @param {Object} [options]
   *   [en]Parameter object.[/en]
   *   [ja]オプションを指定するオブジェクト。[/ja]
   * @param {String} [options.animation]
   *   [en]Animation name. Available animations are `"default"`, `"ascend"` (Android), `"lift"` (iOS), `"fall"`, `"fade"` or `"none"`.[/en]
   *   [ja][/ja]
   * @param {String} [options.animationOptions]
   *   [en]Specify the animation's duration, delay and timing. E.g. `{duration: 0.2, delay: 0.4, timing: 'ease-in'}`.[/en]
   *   [ja]アニメーション時のduration, delay, timingを指定します。e.g. {duration: 0.2, delay: 0.4, timing: 'ease-in'}[/ja]
   * @description
   *   [en]Toggle toast visibility.[/en]
   *   [ja][/ja]
   */

  /**
   * @method hide
   * @signature hide([options])
   * @param {Object} [options]
   *   [en]Parameter object.[/en]
   *   [ja]オプションを指定するオブジェクト。[/ja]
   * @param {String} [options.animation]
   *   [en]Animation name. Available animations are `"default"`, `"ascend"` (Android), `"lift"` (iOS), `"fall"`, `"fade"` or `"none"`.[/en]
   *   [ja][/ja]
   * @param {String} [options.animationOptions]
   *   [en]Specify the animation's duration, delay and timing. E.g. `{duration: 0.2, delay: 0.4, timing: 'ease-in'}`.[/en]
   *   [ja]アニメーション時のduration, delay, timingを指定します。e.g. {duration: 0.2, delay: 0.4, timing: 'ease-in'}[/ja]
   * @description
   *   [en]Hide toast.[/en]
   *   [ja][/ja]
   * @return {Promise}
   *   [en]Resolves to the hidden element[/en]
   *   [ja][/ja]
   */

  /**
   * @param {String} name
   * @param {Function} Animator
   */
  static registerAnimator(name, Animator) {
    if (!(Animator.prototype instanceof ToastAnimator)) {
      util.throw('"Animator" param must inherit OnsToastElement.ToastAnimator');
    }
    _animatorDict[name] = Animator;
  }

  static get animators() {
    return _animatorDict;
  }

  static get ToastAnimator() {
    return ToastAnimator;
  }
}

onsElements.Toast = ToastElement;
customElements.define('ons-toast', ToastElement);
