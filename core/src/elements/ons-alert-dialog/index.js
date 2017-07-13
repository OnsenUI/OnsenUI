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

import util from '../../ons/util';
import autoStyle from '../../ons/autostyle';
import ModifierUtil from '../../ons/internal/modifier-util';
import AnimatorFactory from '../../ons/internal/animator-factory';
import { AlertDialogAnimator, IOSAlertDialogAnimator, AndroidAlertDialogAnimator } from './animator';
import platform from '../../ons/platform';
import BaseDialogElement from '../base/base-dialog';
import contentReady from '../../ons/content-ready';

const scheme = {
  '.alert-dialog': 'alert-dialog--*',
  '.alert-dialog-container': 'alert-dialog-container--*',
  '.alert-dialog-title': 'alert-dialog-title--*',
  '.alert-dialog-content': 'alert-dialog-content--*',
  '.alert-dialog-footer': 'alert-dialog-footer--*',
  '.alert-dialog-footer--rowfooter': 'alert-dialog-footer--rowfooter--*',
  '.alert-dialog-button--rowfooter': 'alert-dialog-button--rowfooter--*',
  '.alert-dialog-button--primal': 'alert-dialog-button--primal--*',
  '.alert-dialog-button': 'alert-dialog-button--*',
  'ons-alert-dialog-button': 'alert-dialog-button--*',
  '.alert-dialog-mask': 'alert-dialog-mask--*',
  '.text-input': 'text-input--*'
};

const _animatorDict = {
  'none': AlertDialogAnimator,
  'default': () => platform.isAndroid() ? AndroidAlertDialogAnimator : IOSAlertDialogAnimator,
  'fade': () => platform.isAndroid() ? AndroidAlertDialogAnimator : IOSAlertDialogAnimator
};

/**
 * @element ons-alert-dialog
 * @category dialog
 * @description
 *   [en]
 *     Alert dialog that is displayed on top of the current screen. Useful for displaying questions, warnings or error messages to the user. The title, content and buttons can be easily customized and it will automatically switch style based on the platform.
 *
 *     To use the element it can either be attached directly to the `<body>` element or dynamically created from a template using the `ons.createAlertDialog(template)` utility function and the `<ons-template>` tag.
 *   [/en]
 *   [ja][/ja]
 * @codepen Qwwxyp
 * @tutorial vanilla/Reference/dialog
 * @modifier material
 *   [en]Material Design style[/en]
 *   [ja][/ja]
 * @modifier rowfooter
 *   [en]Horizontally aligns the footer buttons.[/en]
 *   [ja][/ja]
 * @guide dialogs
 *   [en]Dialog components[/en]
 *   [ja]Dialog components[/ja]
 * @seealso ons-dialog
 *   [en]ons-dialog component[/en]
 *   [ja]ons-dialogコンポーネント[/ja]
 * @seealso ons-popover
 *   [en]ons-popover component[/en]
 *   [ja]ons-dialogコンポーネント[/ja]
 * @seealso ons.notification
 *   [en]Using ons.notification utility functions.[/en]
 *   [ja]アラートダイアログを表示するには、ons.notificationオブジェクトのメソッドを使うこともできます。[/ja]
 * @example
 * <ons-alert-dialog id="alert-dialog">
 *   <div class="alert-dialog-title">Warning!</div>
 *   <div class="alert-dialog-content">
 *     An error has occurred!
 *   </div>
 *   <div class="alert-dialog-footer">
 *     <button id="alert-dialog-button" class="alert-dialog-button">OK</button>
 *   </div>
 * </ons-alert-dialog>
 * <script>
 *   document.getElementById('alert-dialog').show();
 * </script>
 */
export default class AlertDialogElement extends BaseDialogElement {

  /**
   * @event preshow
   * @description
   *   [en]Fired just before the alert dialog is displayed.[/en]
   *   [ja]アラートダイアログが表示される直前に発火します。[/ja]
   * @param {Object} event [en]Event object.[/en]
   * @param {Object} event.alertDialog
   *   [en]Alert dialog object.[/en]
   *   [ja]アラートダイアログのオブジェクト。[/ja]
   * @param {Function} event.cancel
   *   [en]Execute to stop the dialog from showing.[/en]
   *   [ja]この関数を実行すると、アラートダイアログの表示を止めます。[/ja]
   */

  /**
   * @event postshow
   * @description
   *   [en]Fired just after the alert dialog is displayed.[/en]
   *   [ja]アラートダイアログが表示された直後に発火します。[/ja]
   * @param {Object} event [en]Event object.[/en]
   * @param {Object} event.alertDialog
   *   [en]Alert dialog object.[/en]
   *   [ja]アラートダイアログのオブジェクト。[/ja]
   */

  /**
   * @event prehide
   * @description
   *   [en]Fired just before the alert dialog is hidden.[/en]
   *   [ja]アラートダイアログが隠れる直前に発火します。[/ja]
   * @param {Object} event [en]Event object.[/en]
   * @param {Object} event.alertDialog
   *   [en]Alert dialog object.[/en]
   *   [ja]アラートダイアログのオブジェクト。[/ja]
   * @param {Function} event.cancel
   *   [en]Execute to stop the dialog from hiding.[/en]
   *   [ja]この関数を実行すると、アラートダイアログが閉じようとするのを止めます。[/ja]
   */

  /**
   * @event posthide
   * @description
   * [en]Fired just after the alert dialog is hidden.[/en]
   * [ja]アラートダイアログが隠れた後に発火します。[/ja]
   * @param {Object} event [en]Event object.[/en]
   * @param {Object} event.alertDialog
   *   [en]Alert dialog object.[/en]
   *   [ja]アラートダイアログのオブジェクト。[/ja]
   */

  /**
   * @attribute modifier
   * @type {String}
   * @description
   *  [en]The appearance of the dialog.[/en]
   *  [ja]ダイアログの見た目を指定します。[/ja]
   */

  /**
   * @attribute cancelable
   * @description
   *  [en]If this attribute is set the dialog can be closed by tapping the background or by pressing the back button on Android devices.[/en]
   *  [ja][/ja]
   */

  /**
   * @attribute disabled
   * @description
   *  [en]If this attribute is set the dialog is disabled.[/en]
   *  [ja]この属性がある時、アラートダイアログはdisabled状態になります。[/ja]
   */

  /**
   * @attribute animation
   * @type {String}
   * @default default
   * @description
   *  [en]The animation used when showing and hiding the dialog. Can be either `"none"` or `"default"`.[/en]
   *  [ja]ダイアログを表示する際のアニメーション名を指定します。デフォルトでは"none"か"default"が指定できます。[/ja]
   */

  /**
   * @attribute animation-options
   * @type {Expression}
   * @description
   *  [en]Specify the animation's duration, timing and delay with an object literal. E.g. `{duration: 0.2, delay: 1, timing: 'ease-in'}`.[/en]
   *  [ja]アニメーション時のduration, timing, delayをオブジェクトリテラルで指定します。例：{duration: 0.2, delay: 1, timing: 'ease-in'}[/ja]
   */

  /**
   * @attribute mask-color
   * @type {String}
   * @default rgba(0, 0, 0, 0.2)
   * @description
   *  [en]Color of the background mask. Default is "rgba(0, 0, 0, 0.2)".[/en]
   *  [ja]背景のマスクの色を指定します。"rgba(0, 0, 0, 0.2)"がデフォルト値です。[/ja]
   */

  constructor() {
    super();

    contentReady(this, () => this._compile());
  }

  get _scheme() {
    return scheme;
  }

  /**
   * @return {Element}
   */
  get _mask() {
    return util.findChild(this, '.alert-dialog-mask');
  }

  /**
   * @return {Element}
   */
  get _dialog() {
    return util.findChild(this, '.alert-dialog');

  }

  /**
   * @return {Element}
   */
  get _titleElement() {
    return util.findChild(this._dialog.children[0], '.alert-dialog-title');
  }

  /**
   * @return {Element}
   */
  get _contentElement() {
    return util.findChild(this._dialog.children[0], '.alert-dialog-content');
  }

  _updateAnimatorFactory() {
    return new AnimatorFactory({
      animators: _animatorDict,
      baseClass: AlertDialogAnimator,
      baseClassName: 'AlertDialogAnimator',
      defaultAnimation: this.getAttribute('animation')
    });
  }

  _compile() {
    autoStyle.prepare(this);

    this.style.display = 'none';
    this.style.zIndex = 10001;

    /**
     * Expected result after compile:
     *
     * <ons-alert-dialog style="none">
     *   <div class="alert-dialog-mask"></div>
     *   <div class="alert-dialog">
     *     <div class="alert-dialog-container">...</div>
     *   </div>
     * </ons-alert-dialog>
     */

    const content = document.createDocumentFragment();

    if (!this._mask && !this._dialog) {
      while (this.firstChild) {
        content.appendChild(this.firstChild);
      }
    }

    if (!this._mask) {
      const mask = document.createElement('div');
      mask.classList.add('alert-dialog-mask');
      this.insertBefore(mask, this.children[0]);
    }

    if (!this._dialog) {
      const dialog = document.createElement('div');
      dialog.classList.add('alert-dialog');
      this.insertBefore(dialog, null);
    }

    if (!util.findChild(this._dialog, '.alert-dialog-container')) {
      const container = document.createElement('div');
      container.classList.add('alert-dialog-container');
      this._dialog.appendChild(container);
    }

    this._dialog.children[0].appendChild(content);

    this._dialog.style.zIndex = 20001;
    this._mask.style.zIndex = 20000;

    ModifierUtil.initModifier(this, this._scheme);
  }

  /**
   * @property disabled
   * @type {Boolean}
   * @description
   *   [en]Whether the element is disabled or not.[/en]
   *   [ja]無効化されている場合に`true`。[/ja]
   */

  /**
   * @property cancelable
   * @type {Boolean}
   * @description
   *   [en]Whether the dialog is cancelable or not. A cancelable dialog can be closed by tapping the background or by pressing the back button on Android devices.[/en]
   *   [ja][/ja]
   */

  /**
   * @method show
   * @signature show([options])
   * @param {Object} [options]
   *   [en]Parameter object.[/en]
   *   [ja]オプションを指定するオブジェクトです。[/ja]
   * @param {String} [options.animation]
   *   [en]Animation name. Available animations are `"fade"` and `"none"`.[/en]
   *   [ja]アニメーション名を指定します。指定できるのは、"fade", "none"のいずれかです。[/ja]
   * @param {String} [options.animationOptions]
   *   [en]Specify the animation's duration, delay and timing. E.g.  `{duration: 0.2, delay: 0.4, timing: 'ease-in'}`.[/en]
   *   [ja]アニメーション時のduration, delay, timingを指定します。e.g. <code>{duration: 0.2, delay: 0.4, timing: 'ease-in'}</code> [/ja]
   * @param {Function} [options.callback]
   *   [en]Function to execute after the dialog has been revealed.[/en]
   *   [ja]ダイアログが表示され終わった時に呼び出されるコールバックを指定します。[/ja]
   * @description
   *   [en]Show the alert dialog.[/en]
   *   [ja]ダイアログを表示します。[/ja]
   * @return {Promise}
   *   [en]A `Promise` object that resolves to the displayed element.[/en]
   *   [ja][/ja]
   */

  /**
   * @method hide
   * @signature hide([options])
   * @param {Object} [options]
   *   [en]Parameter object.[/en]
   *   [ja]オプションを指定するオブジェクト。[/ja]
   * @param {String} [options.animation]
   *   [en]Animation name. Available animations are `"fade"` and `"none"`.[/en]
   *   [ja]アニメーション名を指定します。"fade", "none"のいずれかを指定します。[/ja]
   * @param {String} [options.animationOptions]
   *   [en]Specify the animation's duration, delay and timing. E.g.  <code>{duration: 0.2, delay: 0.4, timing: 'ease-in'}</code>[/en]
   *   [ja]アニメーション時のduration, delay, timingを指定します。e.g. <code>{duration: 0.2, delay: 0.4, timing: 'ease-in'}</code> [/ja]
   * @param {Function} [options.callback]
   *   [en]Function to execute after the dialog has been hidden.[/en]
   *   [ja]このダイアログが閉じた時に呼び出されるコールバックを指定します。[/ja]
   * @description
   *   [en]Hide the alert dialog.[/en]
   *   [ja]ダイアログを閉じます。[/ja]
   * @return {Promise}
   *   [en]Resolves to the hidden element[/en]
   *   [ja][/ja]
   */

  /**
   * @property visible
   * @readonly
   * @type {Boolean}
   * @description
   *   [en]Whether the dialog is visible or not.[/en]
   *   [ja]要素が見える場合に`true`。[/ja]
   */

  /**
   * @property onDeviceBackButton
   * @type {Object}
   * @description
   *   [en]Back-button handler.[/en]
   *   [ja]バックボタンハンドラ。[/ja]
   */

  /**
   * @param {String} name
   * @param {DialogAnimator} Animator
   */
  static registerAnimator(name, Animator) {
    if (!(Animator.prototype instanceof AlertDialogAnimator)) {
      throw new Error('"Animator" param must inherit OnsAlertDialogElement.AlertDialogAnimator');
    }
    _animatorDict[name] = Animator;
  }

  static get animators() {
    return _animatorDict;
  }

  static get AlertDialogAnimator() {
    return AlertDialogAnimator;
  }
}

customElements.define('ons-alert-dialog', AlertDialogElement);
