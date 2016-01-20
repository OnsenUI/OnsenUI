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
import {AlertDialogAnimator, IOSAlertDialogAnimator, AndroidAlertDialogAnimator} from './animator';
import platform from 'ons/platform';
import BaseElement from 'ons/base-element';
import deviceBackButtonDispatcher from 'ons/device-back-button-dispatcher';
import DoorLock from 'ons/doorlock';

const scheme = {
  '': 'alert-dialog--*',
  '.alert-dialog-container': 'alert-dialog-container--*',
  '.alert-dialog-title': 'alert-dialog-title--*',
  '.alert-dialog-content': 'alert-dialog-content--*',
  '.alert-dialog-footer': 'alert-dialog-footer--*',
  '.alert-dialog-button': 'alert-dialog-button--*',
  '.alert-dialog-footer--one': 'alert-dialog-footer--one--*',
  '.alert-dialog-button--one': 'alert-dialog-button--one--*',
  '.alert-dialog-button--primal': 'alert-dialog-button--primal--*'
};

const _animatorDict = {
  'default': platform.isAndroid() ? AndroidAlertDialogAnimator : IOSAlertDialogAnimator,
  'fade': platform.isAndroid() ? AndroidAlertDialogAnimator : IOSAlertDialogAnimator,
  'none': AlertDialogAnimator
};

/**
 * @element ons-alert-dialog
 * @category dialog
 * @description
 *   [en]Alert dialog that is displayed on top of the current screen.[/en]
 *   [ja]現在のスクリーンにアラートダイアログを表示します。[/ja]
 * @codepen Qwwxyp
 * @guide UsingAlert
 *   [en]Learn how to use the alert dialog.[/en]
 *   [ja]アラートダイアログの使い方の解説。[/ja]
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
 * <script>
 *   ons.ready(function() {
 *     ons.createAlertDialog('alert.html').then(function(alertDialog) {
 *       alertDialog.show();
 *     });
 *   });
 * </script>
 *
 * <script type="text/ons-template" id="alert.html">
 *   <ons-alert-dialog animation="default" cancelable>
 *     <div class="alert-dialog-title">Warning!</div>
 *     <div class="alert-dialog-content">
 *       An error has occurred!
 *     </div>
 *     <div class="alert-dialog-footer">
 *       <button class="alert-dialog-button">OK</button>
 *     </div>
 *   </ons-alert-dialog>
 * </script>
 */
class AlertDialogElement extends BaseElement {

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
   *  [en]If this attribute is set the dialog can be closed by tapping the background or by pressing the back button.[/en]
   *  [ja]この属性があると、ダイアログが表示された時に、背景やバックボタンをタップした時にダイアログを閉じます。[/ja]
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
   *  [en]The animation used when showing and hiding the dialog. Can be either "none" or "default".[/en]
   *  [ja]ダイアログを表示する際のアニメーション名を指定します。デフォルトでは"none"か"default"が指定できます。[/ja]
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


  get _titleElement() {
    return util.findChild(this.children[0], '.alert-dialog-title');
  }

  get _contentElement() {
    return util.findChild(this.children[0], '.alert-dialog-content');
  }

  get _dialog() {
    return this;
  }

  createdCallback() {
    this._compile();
    this._mask = this._createMask(this.getAttribute('mask-color'));

    ModifierUtil.initModifier(this, scheme);

    this._animatorFactory = new AnimatorFactory({
      animators: _animatorDict,
      baseClass: AlertDialogAnimator,
      baseClassName: 'AlertDialogAnimator',
      defaultAnimation: this.getAttribute('animation')
    });

    this._visible = false;
    this._doorLock = new DoorLock();
    this._boundCancel = this._cancel.bind(this);
  }

  _compile() {
    this.style.display = 'none';
    this.style.zIndex = '20001';
    this.classList.add('alert-dialog');
  }

  /**
   * @method setDisabled
   * @signature setDisabled(disabled)
   * @description
   *   [en]Disable or enable the alert dialog.[/en]
   *   [ja]このアラートダイアログをdisabled状態にするかどうかを設定します。[/ja]
   * @param {Boolean} disabled
   *   [en]If true the dialog will be disabled.[/en]
   *   [ja]disabled状態にするかどうかを真偽値で指定します。[/ja]
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
   *   [ja]このアラートダイアログがdisabled状態かどうかを返します。[/ja]
   * @return {Boolean}
   *   [en]true if the dialog is disabled.[/en]
   *   [ja]disabled状態であればtrueを返します。[/ja]
   */
  isDisabled() {
    return this.hasAttribute('disabled');
  }

  /**
   * @method setCancelable
   * @signature setCancelable(cancelable)
   * @description
   *   [en]Define whether the dialog can be canceled by the user or not.[/en]
   *   [ja]アラートダイアログを表示した際に、ユーザがそのダイアログをキャンセルできるかどうかを指定します。[/ja]
   * @param {Boolean} cancelable
   *   [en]If true the dialog will be cancelable.[/en]
   *   [ja]キャンセルできるかどうかを真偽値で指定します。[/ja]
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
   * @method show
   * @signature show([options])
   * @param {Object} [options]
   *   [en]Parameter object.[/en]
   *   [ja]オプションを指定するオブジェクトです。[/ja]
   * @param {String} [options.animation]
   *   [en]Animation name. Available animations are "fade", "slide" and "none".[/en]
   *   [ja]アニメーション名を指定します。指定できるのは、"fade", "slide", "none"のいずれかです。[/ja]
   * @param {String} [options.animationOptions]
   *   [en]Specify the animation's duration, delay and timing. E.g.  <code>{duration: 0.2, delay: 0.4, timing: 'ease-in'}</code>[/en]
   *   [ja]アニメーション時のduration, delay, timingを指定します。e.g. <code>{duration: 0.2, delay: 0.4, timing: 'ease-in'}</code> [/ja]
   * @param {Function} [options.callback]
   *   [en]Function to execute after the dialog has been revealed.[/en]
   *   [ja]ダイアログが表示され終わった時に呼び出されるコールバックを指定します。[/ja]
   * @description
   *   [en]Show the alert dialog.[/en]
   *   [ja]ダイアログを表示します。[/ja]
   */
  show(options = {}) {
    let cancel = false;
    const callback = options.callback || function() {};

    options.animationOptions = util.extend(
      options.animationOptions || {},
      AnimatorFactory.parseAnimationOptionsString(this.getAttribute('animation-options'))
    );

    util.triggerElementEvent(this, 'preshow', {
      alertDialog: this,
      cancel: function() {
        cancel = true;
      }
    });

    if (!cancel) {
      this._doorLock.waitUnlock(() => {
        const unlock = this._doorLock.lock();

        this._mask.style.display = 'block';
        this._mask.style.opacity = 1;
        this.style.display = 'block';

        const animator = this._animatorFactory.newAnimator(options);
        animator.show(this, () => {
          this._visible = true;
          unlock();
          util.triggerElementEvent(this, 'postshow', {alertDialog: this});
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
   *   [en]Animation name. Available animations are "fade", "slide" and "none".[/en]
   *   [ja]アニメーション名を指定します。"fade", "slide", "none"のいずれかを指定します。[/ja]
   * @param {String} [options.animationOptions]
   *   [en]Specify the animation's duration, delay and timing. E.g.  <code>{duration: 0.2, delay: 0.4, timing: 'ease-in'}</code>[/en]
   *   [ja]アニメーション時のduration, delay, timingを指定します。e.g. <code>{duration: 0.2, delay: 0.4, timing: 'ease-in'}</code> [/ja]
   * @param {Function} [options.callback]
   *   [en]Function to execute after the dialog has been hidden.[/en]
   *   [ja]このダイアログが閉じた時に呼び出されるコールバックを指定します。[/ja]
   * @description
   *   [en]Hide the alert dialog.[/en]
   *   [ja]ダイアログを閉じます。[/ja]
   */
  hide(options = {}) {
    let cancel = false;
    const callback = options.callback || function() {};

    util.triggerElementEvent(this, 'prehide', {
      alertDialog: this,
      cancel: function() {
        cancel = true;
      }
    });

    if (!cancel) {
      this._doorLock.waitUnlock(() => {
        const unlock = this._doorLock.lock();

        const animator = this._animatorFactory.newAnimator(options);
        animator.hide(this, () => {
          this.style.display = 'none';
          this._mask.style.display = 'none';
          this._visible = false;
          unlock();
          util.triggerElementEvent(this, 'posthide', {alertDialog: this});
          callback();
        });
      });
    }
  }

  /**
   * @method isShown
   * @signature isShown()
   * @return {Boolean}
   * @description
   *   [en]Returns whether the dialog is visible or not.[/en]
   *   [ja]ダイアログが表示されているかどうかを返します。[/ja]
   * @return {Boolean}
   *   [en]true if the dialog is currently visible.[/en]
   *   [ja]ダイアログが表示されていればtrueを返します。[/ja]
   */
  isShown() {
    return this._visible;
  }

  /**
   * @method destroy
   * @signature destroy()
   * @description
   *   [en]Destroy the alert dialog and remove it from the DOM tree.[/en]
   *   [ja]ダイアログを破棄して、DOMツリーから取り除きます。[/ja]
   */
  destroy() {
    if (this.parentElement) {
      this.parentElement.removeChild(this);
    }

    if (this._mask.parentElement) {
      this._mask.parentElement.removeChild(this._mask);
    }
  }

  /**
   * @method isCancelable
   * @signature isCancelable()
   * @description
   *   [en]Returns whether the dialog is cancelable or not.[/en]
   *   [ja]このアラートダイアログがキャンセル可能かどうかを返します。[/ja]
   * @return {Boolean}
   *   [en]true if the dialog is cancelable.[/en]
   *   [ja]キャンセル可能であればtrueを返します。[/ja]
   */
  isCancelable() {
    return this.hasAttribute('cancelable');
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

  _createMask(color) {
    this._mask = util.createElement('<div></div>');
    this._mask.classList.add('alert-dialog-mask');
    this._mask.style.zIndex = 20000;
    this._mask.style.display = 'none';

    if (color) {
      this._mask.style.backgroundColor = color;
    }

    document.body.appendChild(this._mask);
    return this._mask;
  }

  attachedCallback() {
    this._deviceBackButtonHandler = deviceBackButtonDispatcher.createHandler(this, this._onDeviceBackButton.bind(this));

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

const OnsAlertDialogElement = window.OnsAlertDialogElement = document.registerElement('ons-alert-dialog', {
  prototype: AlertDialogElement.prototype
});

/**
 * @param {String} name
 * @param {DialogAnimator} Animator
 */
OnsAlertDialogElement.registerAnimator = function(name, Animator) {
  if (!(Animator.prototype instanceof AlertDialogAnimator)) {
    throw new Error('"Animator" param must inherit OnsAlertDialogElement.AlertDialogAnimator');
  }
  _animatorDict[name] = Animator;
};

OnsAlertDialogElement.AlertDialogAnimator = AlertDialogAnimator;
