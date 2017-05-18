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
import { DialogAnimator, IOSDialogAnimator, AndroidDialogAnimator, SlideDialogAnimator } from './animator';
import platform from '../../ons/platform';
import BaseDialogElement from '../base/base-dialog';
import contentReady from '../../ons/content-ready';

const scheme = {
  '.dialog': 'dialog--*',
  '.dialog-container': 'dialog-container--*',
  '.dialog-mask': 'dialog-mask--*'
};

const _animatorDict = {
  'default': () => platform.isAndroid() ? AndroidDialogAnimator : IOSDialogAnimator,
  'slide': SlideDialogAnimator,
  'none': DialogAnimator
};

/**
 * @element ons-dialog
 * @category dialog
 * @description
 *   [en]
 *     Dialog that is displayed on top of current screen. As opposed to the `<ons-alert-dialog>` element, this component can contain any kind of content.
 *
 *     To use the element it can either be attached directly to the `<body>` element or dynamically created from a template using the `ons.createDialog(template)` utility function and the `<ons-template>` tag.
 *
 *     The dialog is useful for displaying menus, additional information or to ask the user to make a decision.
 *
 *     It will automatically be displayed as Material Design when running on an Android device.
 *   [/en]
 *   [ja][/ja]
 * @modifier material
 *   [en]Display a Material Design dialog.[/en]
 *   [ja]マテリアルデザインのダイアログを表示します。[/ja]
 * @codepen zxxaGa
 * @tutorial vanilla/Reference/dialog
 * @guide dialogs
 *   [en]Dialog components[/en]
 *   [ja]Dialog components[/ja]
 * @guide using-modifier [en]More details about the `modifier` attribute[/en][ja]modifier属性の使い方[/ja]
 * @seealso ons-alert-dialog
 *   [en]`<ons-alert-dialog>` component[/en]
 *   [ja]ons-alert-dialogコンポーネント[/ja]
 * @seealso ons-popover
 *   [en]`<ons-popover>` component[/en]
 *   [ja]ons-popoverコンポーネント[/ja]
 * @seealso ons-modal
 *   [en]`<ons-modal>` component[/en]
 *   [ja]ons-modalコンポーネント[/ja]
 * @example
 * <ons-dialog id="dialog">
 *   <p>This is a dialog!</p>
 * </ons-dialog>
 *
 * <script>
 *   document.getElementById('dialog').show();
 * </script>
 */
export default class DialogElement extends BaseDialogElement {

  /**
   * @event preshow
   * @description
   * [en]Fired just before the dialog is displayed.[/en]
   * [ja]ダイアログが表示される直前に発火します。[/ja]
   * @param {Object} event [en]Event object.[/en]
   * @param {Object} event.dialog
   *   [en]Component object.[/en]
   *   [ja]コンポーネントのオブジェクト。[/ja]
   * @param {Function} event.cancel
   *   [en]Execute this function to stop the dialog from being shown.[/en]
   *   [ja]この関数を実行すると、ダイアログの表示がキャンセルされます。[/ja]
   */

  /**
   * @event postshow
   * @description
   * [en]Fired just after the dialog is displayed.[/en]
   * [ja]ダイアログが表示された直後に発火します。[/ja]
   * @param {Object} event [en]Event object.[/en]
   * @param {Object} event.dialog
   *   [en]Component object.[/en]
   *   [ja]コンポーネントのオブジェクト。[/ja]
   */

  /**
   * @event prehide
   * @description
   * [en]Fired just before the dialog is hidden.[/en]
   * [ja]ダイアログが隠れる直前に発火します。[/ja]
   * @param {Object} event [en]Event object.[/en]
   * @param {Object} event.dialog
   *   [en]Component object.[/en]
   *   [ja]コンポーネントのオブジェクト。[/ja]
   * @param {Function} event.cancel
   *   [en]Execute this function to stop the dialog from being hidden.[/en]
   *   [ja]この関数を実行すると、ダイアログの非表示がキャンセルされます。[/ja]
   */

  /**
   * @event posthide
   * @description
   * [en]Fired just after the dialog is hidden.[/en]
   * [ja]ダイアログが隠れた後に発火します。[/ja]
   * @param {Object} event [en]Event object.[/en]
   * @param {Object} event.dialog
   *   [en]Component object.[/en]
   *   [ja]コンポーネントのオブジェクト。[/ja]
   */

  /**
   * @attribute modifier
   * @type {String}
   * @description
   *  [en]The appearance of the dialog.[/en]
   *  [ja]ダイアログの表現を指定します。[/ja]
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
   *  [ja]この属性がある時、ダイアログはdisabled状態になります。[/ja]
   */

  /**
   * @attribute animation
   * @type {String}
   * @default default
   * @description
   *  [en]The animation used when showing and hiding the dialog. Can be either `"none"` or `"default"`.[/en]
   *  [ja]ダイアログを表示する際のアニメーション名を指定します。"none"もしくは"default"を指定できます。[/ja]
   */

  /**
   * @attribute animation-options
   * @type {Expression}
   * @description
   *  [en]Specify the animation's duration, timing and delay with an object literal. E.g. `{duration: 0.2, delay: 1, timing: 'ease-in'}`.[/en]
   *  [ja]アニメーション時のduration, timing, delayをオブジェクトリテラルで指定します。e.g. `{duration: 0.2, delay: 1, timing: 'ease-in'}`[/ja]
   */

  /**
   * @attribute mask-color
   * @type {String}
   * @default rgba(0, 0, 0, 0.2)
   * @description
   *  [en]Color of the background mask. Default is `"rgba(0, 0, 0, 0.2)"`.[/en]
   *  [ja]背景のマスクの色を指定します。"rgba(0, 0, 0, 0.2)"がデフォルト値です。[/ja]
   */

  constructor() {
    super();

    contentReady(this, () => this._compile());
  }

  get _scheme() {
    return scheme;
  }

  get _mask() {
    return util.findChild(this, '.dialog-mask');
  }

  get _dialog() {
    return util.findChild(this, '.dialog');
  }

  _updateAnimatorFactory() {
    return new AnimatorFactory({
      animators: _animatorDict,
      baseClass: DialogAnimator,
      baseClassName: 'DialogAnimator',
      defaultAnimation: this.getAttribute('animation')
    });
  }

  _compile() {
    autoStyle.prepare(this);

    this.style.display = 'none';
    this.style.zIndex = 10001;

    /* Expected result:
     *   <ons-dialog>
     *     <div class="dialog-mask"></div>
     *     <div class="dialog">
     *       <div class="dialog-container">...</div>
     *     </div>
     *   </ons-dialog>
     */

    if (!this._dialog) {
      const dialog = document.createElement('div');
      dialog.classList.add('dialog');

      const container = document.createElement('div');
      container.classList.add('dialog-container');
      while (this.firstChild) {
        container.appendChild(this.firstChild);
      }
      dialog.appendChild(container);

      this.appendChild(dialog);
    }

    if (!this._mask) {
      const mask = document.createElement('div');
      mask.classList.add('dialog-mask');
      this.insertBefore(mask, this.firstChild);
    }

    this._dialog.style.zIndex = 20001;
    this._mask.style.zIndex = 20000;

    this.setAttribute('status-bar-fill', '');

    ModifierUtil.initModifier(this, this._scheme);
  }

  /**
   * @property onDeviceBackButton
   * @type {Object}
   * @description
   *   [en]Back-button handler.[/en]
   *   [ja]バックボタンハンドラ。[/ja]
   */

  /**
   * @method show
   * @signature show([options])
   * @param {Object} [options]
   *   [en]Parameter object.[/en]
   *   [ja]オプションを指定するオブジェクト。[/ja]
   * @param {String} [options.animation]
   *   [en]Animation name. Available animations are `"none"` and `"slide"`.[/en]
   *   [ja]アニメーション名を指定します。"none", "slide"のいずれかを指定します。[/ja]
   * @param {String} [options.animationOptions]
   *   [en]Specify the animation's duration, delay and timing. E.g. `{duration: 0.2, delay: 0.4, timing: 'ease-in'}`.[/en]
   *   [ja]アニメーション時のduration, delay, timingを指定します。e.g. `{duration: 0.2, delay: 0.4, timing: 'ease-in'}` [/ja]
   * @param {Function} [options.callback]
   *   [en]This function is called after the dialog has been revealed.[/en]
   *   [ja]ダイアログが表示され終わった後に呼び出される関数オブジェクトを指定します。[/ja]
   * @description
   *  [en]Show the dialog.[/en]
   *  [ja]ダイアログを開きます。[/ja]
   * @return {Promise} Resolves to the displayed element.
   */

  /**
   * @method hide
   * @signature hide([options])
   * @param {Object} [options]
   *   [en]Parameter object.[/en]
   *   [ja]オプションを指定するオブジェクト。[/ja]
   * @param {String} [options.animation]
   *   [en]Animation name. Available animations are `"none"` and `"slide"`.[/en]
   *   [ja]アニメーション名を指定します。"none", "slide"のいずれかを指定できます。[/ja]
   * @param {String} [options.animationOptions]
   *   [en]Specify the animation's duration, delay and timing. E.g. `{duration: 0.2, delay: 0.4, timing: 'ease-in'}`.[/en]
   *   [ja]アニメーション時のduration, delay, timingを指定します。e.g. `{duration: 0.2, delay: 0.4, timing: 'ease-in'}`[/ja]
   * @param {Function} [options.callback]
   *   [en]This functions is called after the dialog has been hidden.[/en]
   *   [ja]ダイアログが隠れた後に呼び出される関数オブジェクトを指定します。[/ja]
   * @description
   *   [en]Hide the dialog.[/en]
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
   * @property disabled
   * @type {Boolean}
   * @description
   *   [en]Whether the dialog is disabled or not.[/en]
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
   * @param {String} name
   * @param {DialogAnimator} Animator
   */
  static registerAnimator(name, Animator) {
    if (!(Animator.prototype instanceof DialogAnimator)) {
      throw new Error('"Animator" param must inherit OnsDialogElement.DialogAnimator');
    }
    _animatorDict[name] = Animator;
  }

  static get animators() {
    return _animatorDict;
  }

  static get DialogAnimator() {
    return DialogAnimator;
  }
}

customElements.define('ons-dialog', DialogElement);
