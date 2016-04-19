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
import {DialogAnimator, IOSDialogAnimator, AndroidDialogAnimator, SlideDialogAnimator} from './animator';
import platform from 'ons/platform';
import BaseElement from 'ons/base-element';
import DoorLock from 'ons/doorlock';
import DeviceBackButtonDispatcher from 'ons/device-back-button-dispatcher';

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
  'default': () => platform.isAndroid() ? AndroidDialogAnimator : IOSDialogAnimator,
  'fade': () => platform.isAndroid() ? AndroidDialogAnimator : IOSDialogAnimator,
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
 *     To use the element it can either be attached directly to the `<body>` element or dynamically created from a template using the `<ons.createDialog(template)` utility function and the `<ons-template>` tag.
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
 * @guide UsingDialog
 *   [en]Learn how to use the dialog component.[/en]
 *   [ja]ダイアログコンポーネントの使い方[/ja]
 * @seealso ons-alert-dialog
 *   [en]`<ons-alert-dialog>` component[/en]
 *   [ja]ons-alert-dialogコンポーネント[/ja]
 * @seealso ons-popover
 *   [en]`<ons-popover>` component[/en]
 *   [ja]ons-popoverコンポーネント[/ja]
 * @example
 * <ons-dialog id="dialog">
 *   <p>This is a dialog!</p>
 * </ons-dialog>
 *
 * <script>
 *   document.getElementById('dialog').show();
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
    autoStyle.prepare(this);

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

    ModifierUtil.initModifier(this, scheme);

    this.setAttribute('_compiled', '');
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
    if (this.cancelable) {
      this._cancel();
    } else {
      event.callParentHandler();
    }
  }

  _cancel() {
    if (this.cancelable && !this._running) {
      this._running = true;
      this.hide({
        callback: () => {
          this._running = false;
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
   *   [en]Animation name. Available animations are `"none"`, `"fade"` and `"slide"`.[/en]
   *   [ja]アニメーション名を指定します。"none", "fade", "slide"のいずれかを指定します。[/ja]
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
  show(options = {}) {
    let cancel = false;
    const callback = options.callback || function() {};

    options.animationOptions = util.extend(
      options.animationOptions || {},
      AnimatorFactory.parseAnimationOptionsString(this.getAttribute('animation-options'))
    );

    util.triggerElementEvent(this, 'preshow', {
      dialog: this,
      cancel: function() {
        cancel = true;
      }
    });

    if (!cancel) {
      const tryShow = () => {
        const unlock = this._doorLock.lock();
        const animator = this._animatorFactory.newAnimator(options);

        this.style.display = 'block';
        this._mask.style.opacity = '1';

        return new Promise(resolve => {
          animator.show(this, () => {
            this._visible = true;
            unlock();

            util.triggerElementEvent(this, 'postshow', {dialog: this});

            callback();
            resolve(this);
          });
        });
      };

      return new Promise(resolve => {
        this._doorLock.waitUnlock(() => resolve(tryShow()));
      });
    } else {
      return Promise.reject('Canceled in preshow event.');
    }
  }

  /**
   * @method hide
   * @signature hide([options])
   * @param {Object} [options]
   *   [en]Parameter object.[/en]
   *   [ja]オプションを指定するオブジェクト。[/ja]
   * @param {String} [options.animation]
   *   [en]Animation name. Available animations are `"none"`, `"fade"` and `"slide"`.[/en]
   *   [ja]アニメーション名を指定します。"none", "fade", "slide"のいずれかを指定できます。[/ja]
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
  hide(options = {}) {
    let cancel = false;
    const callback = options.callback || function() {};

    options.animationOptions = util.extend(
      options.animationOptions || {},
      AnimatorFactory.parseAnimationOptionsString(this.getAttribute('animation-options'))
    );

    util.triggerElementEvent(this, 'prehide', {
      dialog: this,
      cancel: function() {
        cancel = true;
      }
    });

    if (!cancel) {
      const tryHide = () => {
        const unlock = this._doorLock.lock();
        const animator = this._animatorFactory.newAnimator(options);

        return new Promise(resolve => {
          animator.hide(this, () => {
            this.style.display = 'none';
            this._visible = false;
            unlock();

            util.triggerElementEvent(this, 'posthide', {dialog: this});

            callback();
            resolve(this);
          });
        });
      };

      return new Promise(resolve => {
        this._doorLock.waitUnlock(() => resolve(tryHide()));
      });
    } else {
      return Promise.reject('Canceled in prehide event.');
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
   * @property disabled
   * @type {Boolean}
   * @description
   *   [en]A boolean value that specifies whether the dialog is disabled or not.[/en]
   *   [ja][/ja]
   */
  set disabled(value) {
    if (value) {
      this.setAttribute('disabled', '');
    }
    else {
      this.removeAttribute('disabled');
    }
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  /**
   * @property cancelable
   * @type {Boolean}
   * @description
   *   [en]
   *     A boolean value that specifies whether the dialog is cancelable or not.
   *
   *     When the dialog is cancelable it can be closed by tapping the background or by pressing the back button on Android devices.
   *   [/en]
   *   [ja][/ja]
   */
  set cancelable(value) {
    if (value) {
      this.setAttribute('cancelable', '');
    }
    else {
      this.removeAttribute('cancelable');
    }
  }

  get cancelable() {
    return this.hasAttribute('cancelable');
  }


  attachedCallback() {
    this._deviceBackButtonHandler = DeviceBackButtonDispatcher.createHandler(this, this._onDeviceBackButton.bind(this));
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
