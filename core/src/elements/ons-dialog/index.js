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

import ons from 'ons/ons';
import util from 'ons/util';
import ModifierUtil from 'ons/internal/modifier-util';
import AnimatorFactory from 'ons/internal/animator-factory';
import {DialogAnimator, IOSDialogAnimator, AndroidDialogAnimator, SlideDialogAnimator} from './animator';
import platform from 'ons/platform';
import BaseElement from 'ons/base-element';
import DoorLock from 'ons/doorlock';

const scheme = {
  '.dialog': 'dialog--*',
  '.dialog-container': 'dialog-container--*',
  '.dialog-mask': 'dialog-mask--*'
};

const templateSource = util.createElement(`
  <div>
    <div class="dialog-mask"></div>
    <div class="dialog">
      <div class="dialog-container"></div>
    </div>
  </div>
`);

const _animatorDict = {
  'default': platform.isAndroid() ? AndroidDialogAnimator : IOSDialogAnimator,
  'fade': platform.isAndroid() ? AndroidDialogAnimator : IOSDialogAnimator,
  'slide': SlideDialogAnimator,
  'none': DialogAnimator
};

/**
 * @element ons-dialog
 * @category dialog
 * @modifier material
 *   [en]Display a Material Design dialog.[/en]
 *   [ja]マテリアルデザインのダイアログを表示します。[/ja]
 * @description
 *  [en]Dialog that is displayed on top of current screen.[/en]
 *  [ja]現在のスクリーンにダイアログを表示します。[/ja]
 * @codepen zxxaGa
 * @guide UsingDialog
 *   [en]Learn how to use the dialog component.[/en]
 *   [ja]ダイアログコンポーネントの使い方[/ja]
 * @seealso ons-alert-dialog
 *   [en]ons-alert-dialog component[/en]
 *   [ja]ons-alert-dialogコンポーネント[/ja]
 * @seealso ons-popover
 *   [en]ons-popover component[/en]
 *   [ja]ons-popoverコンポーネント[/ja]
 * @example
 * <script>
 *   ons.ready(function() {
 *     ons.createDialog('dialog.html').then(function(dialog) {
 *       dialog.show();
 *     });
 *   });
 * </script>
 *
 * <script type="text/ons-template" id="dialog.html">
 *   <ons-dialog cancelable>
 *     ...
 *   </ons-dialog>
 * </script>
 */
class DialogElement extends BaseElement {

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
   *  [en]If this attribute is set the dialog can be closed by tapping the background or by pressing the back button.[/en]
   *  [ja]この属性があると、ダイアログが表示された時に、背景やバックボタンをタップした時にダイアログを閉じます。[/ja]
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
   *  [en]The animation used when showing and hiding the dialog. Can be either "none" or "default".[/en]
   *  [ja]ダイアログを表示する際のアニメーション名を指定します。"none"もしくは"default"を指定できます。[/ja]
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
   * @type {String}
   * @default rgba(0, 0, 0, 0.2)
   * @description
   *  [en]Color of the background mask. Default is "rgba(0, 0, 0, 0.2)".[/en]
   *  [ja]背景のマスクの色を指定します。"rgba(0, 0, 0, 0.2)"がデフォルト値です。[/ja]
   */

  /**
   * @return {Element}
   */
  get _mask() {
    return util.findChild(this, '.dialog-mask');
  }

  /**
   * @return {Element}
   */
  get _dialog() {
    return util.findChild(this, '.dialog');
  }

  createdCallback() {
    if (!this.hasAttribute('_compiled')) {
      this._compile();
      ModifierUtil.initModifier(this, scheme);

      this.setAttribute('_compiled', '');
    }

    this._visible = false;
    this._doorLock = new DoorLock();
    this._boundCancel = this._cancel.bind(this);

    this._animatorFactory = new AnimatorFactory({
      animators: _animatorDict,
      baseClass: DialogAnimator,
      baseClassName: 'DialogAnimator',
      defaultAnimation: this.getAttribute('animation')
    });
  }

  _compile() {
    const style = this.getAttribute('style');

    this.style.display = 'none';

    const template = templateSource.cloneNode(true);
    const dialog = template.children[1];

    if (style) {
      dialog.setAttribute('style', style);
    }

    while (this.firstChild) {
      dialog.children[0].appendChild(this.firstChild);
    }

    while (template.firstChild) {
      this.appendChild(template.firstChild);
    }

    this._dialog.style.zIndex = 20001;
    this._mask.style.zIndex = 20000;

    this.setAttribute('no-status-bar-fill', '');
  }

  /**
   * @method getDeviceBackButtonHandler
   * @signature getDeviceBackButtonHandler()
   * @return {Object/null}
   *   [en]Device back button handler.[/en]
   *   [ja]デバイスのバックボタンハンドラを返します。[/ja]
   * @description
   *   [en]Retrieve the back button handler for overriding the default behavior.[/en]
   *   [ja]バックボタンハンドラを取得します。デフォルトの挙動を変更することができます。[/ja]
   */
  getDeviceBackButtonHandler() {
    return this._deviceBackButtonHandler;
  }

  _onDeviceBackButton(event) {
    if (this.isCancelable()) {
      this._cancel();
    } else {
      event.callParentHandler();
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

  /**
   * @method show
   * @signature show([options])
   * @param {Object} [options]
   *   [en]Parameter object.[/en]
   *   [ja]オプションを指定するオブジェクト。[/ja]
   * @param {String} [options.animation]
   *   [en]Animation name. Available animations are "none", "fade" and "slide".[/en]
   *   [ja]アニメーション名を指定します。"none", "fade", "slide"のいずれかを指定します。[/ja]
   * @param {String} [options.animationOptions]
   *   [en]Specify the animation's duration, delay and timing. E.g.  <code>{duration: 0.2, delay: 0.4, timing: 'ease-in'}</code>[/en]
   *   [ja]アニメーション時のduration, delay, timingを指定します。e.g. <code>{duration: 0.2, delay: 0.4, timing: 'ease-in'}</code> [/ja]
   * @param {Function} [options.callback]
   *   [en]This function is called after the dialog has been revealed.[/en]
   *   [ja]ダイアログが表示され終わった後に呼び出される関数オブジェクトを指定します。[/ja]
   * @description
   *  [en]Show the dialog.[/en]
   *  [ja]ダイアログを開きます。[/ja]
   */
  show(options = {}) {
    let cancel = false;
    const callback = options.callback || function() {};

    util.triggerElementEvent(this, 'preshow', {
      dialog: this,
      cancel: function() {
        cancel = true;
      }
    });

    options.animationOptions = util.extend(
      options.animationOptions || {},
      AnimatorFactory.parseAnimationOptionsString(this.getAttribute('animation-options'))
    );

    if (!cancel) {
      this._doorLock.waitUnlock(() => {
        const unlock = this._doorLock.lock();

        this.style.display = 'block';
        this._mask.style.opacity = '1';

        const animator = this._animatorFactory.newAnimator(options);

        animator.show(this, () => {
          this._visible = true;
          unlock();

          util.triggerElementEvent(this, 'postshow', {dialog: this});

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
   *   [en]Animation name. Available animations are "none", "fade" and "slide".[/en]
   *   [ja]アニメーション名を指定します。"none", "fade", "slide"のいずれかを指定できます。[/ja]
   * @param {String} [options.animationOptions]
   *   [en]Specify the animation's duration, delay and timing. E.g.  <code>{duration: 0.2, delay: 0.4, timing: 'ease-in'}</code>[/en]
   *   [ja]アニメーション時のduration, delay, timingを指定します。e.g. <code>{duration: 0.2, delay: 0.4, timing: 'ease-in'}</code> [/ja]
   * @param {Function} [options.callback]
   *   [en]This functions is called after the dialog has been hidden.[/en]
   *   [ja]ダイアログが隠れた後に呼び出される関数オブジェクトを指定します。[/ja]
   * @description
   *   [en]Hide the dialog.[/en]
   *   [ja]ダイアログを閉じます。[/ja]
   */
  hide(options = {}) {
    let cancel = false;
    const callback = options.callback || function() {};

    util.triggerElementEvent(this, 'prehide', {
      dialog: this,
      cancel: function() {
        cancel = true;
      }
    });

    options.animationOptions = util.extend(
      options.animationOptions || {},
      AnimatorFactory.parseAnimationOptionsString(this.getAttribute('animation-options'))
    );

    if (!cancel) {
      this._doorLock.waitUnlock(() => {
        const unlock = this._doorLock.lock();
        const animator = this._animatorFactory.newAnimator(options);

        animator.hide(this, () => {
          this.style.display = 'none';
          this._visible = false;
          unlock();
          util.triggerElementEvent(this, 'posthide', {dialog: this});
          callback();
        });
      });
    }
  }

  /**
   * @method destroy
   * @signature destroy()
   * @description
   *  [en]Destroy the dialog and remove it from the DOM tree.[/en]
   *  [ja]ダイアログを破棄して、DOMツリーから取り除きます。[/ja]
   */
  destroy() {
    if (this.parentElement) {
      this.parentElement.removeChild(this);
    }
  }

  /**
   * @method isShown
   * @signature isShown()
   * @description
   *   [en]Returns whether the dialog is visible or not.[/en]
   *   [ja]ダイアログが表示されているかどうかを返します。[/ja]
   * @return {Boolean}
   *   [en]true if the dialog is visible.[/en]
   *   [ja]ダイアログが表示されている場合にtrueを返します。[/ja]
   */
  isShown() {
    return this._visible;
  }

  /**
   * @method isCancelable
   * @signature isCancelable()
   * @description
   *   [en]Returns whether the dialog is cancelable or not.[/en]
   *   [ja]このダイアログがキャンセル可能かどうかを返します。[/ja]
   * @return {Boolean}
   *   [en]true if the dialog is cancelable.[/en]
   *   [ja]ダイアログがキャンセル可能な場合trueを返します。[/ja]
   */
  isCancelable() {
    return this.hasAttribute('cancelable');
  }

  /**
   * @method setDisabled
   * @signature setDisabled(disabled)
   * @description
   *   [en]Disable or enable the dialog.[/en]
   *   [ja]このダイアログをdisabled状態にするかどうかを設定します。[/ja]
   * @param {Boolean} disabled
   *   [en]If true the dialog will be disabled.[/en]
   *   [ja]trueを指定するとダイアログをdisabled状態になります。[/ja]
   */
  setDisabled(disabled) {
    if (typeof disabled !== 'boolean') {
      throw new Error('Argument must be a boolean.');
    }

    if (disabled) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  /**
   * @method isDisabled
   * @signature isDisabled()
   * @description
   *   [en]Returns whether the dialog is disabled or enabled.[/en]
   *   [ja]このダイアログがdisabled状態かどうかを返します。[/ja]
   * @return {Boolean}
   *   [en]true if the dialog is disabled.[/en]
   *   [ja]ダイアログがdisabled状態の場合trueを返します。[/ja]
   */
  isDisabled() {
    return this.hasAttribute('disabled');
  }

  /**
   * @method setCancelable
   * @signature setCancelable(cancelable)
   * @param {Boolean} cancelable
   *   [en]If true the dialog will be cancelable.[/en]
   *   [ja]ダイアログをキャンセル可能にする場合trueを指定します。[/ja]
   * @description
   *   [en]Define whether the dialog can be canceled by the user or not.[/en]
   *   [ja]ダイアログを表示した際に、ユーザがそのダイアログをキャンセルできるかどうかを指定します。[/ja]
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

  attachedCallback() {
    this._deviceBackButtonHandler = ons._deviceBackButtonDispatcher.createHandler(this, this._onDeviceBackButton.bind(this));

    this._mask.addEventListener('click', this._boundCancel, false);

  }

  detachedCallback() {
    this._deviceBackButtonHandler.destroy();
    this._deviceBackButtonHandler = null;

    this._mask.removeEventListener('click', this._boundCancel.bind(this), false);
  }

  attributeChangedCallback(name, last, current) {
    if (name === 'modifier') {
      return ModifierUtil.onModifierChanged(last, current, this, scheme);
    }
  }
}

const OnsDialogElement = window.OnsDialogElement = document.registerElement('ons-dialog', {
  prototype: DialogElement.prototype
});

/**
 * @param {String} name
 * @param {DialogAnimator} Animator
 */
OnsDialogElement.registerAnimator = function(name, Animator) {
  if (!(Animator.prototype instanceof DialogAnimator)) {
    throw new Error('"Animator" param must inherit OnsDialogElement.DialogAnimator');
  }
  _animatorDict[name] = Animator;
};

OnsDialogElement.DialogAnimator = DialogAnimator;
