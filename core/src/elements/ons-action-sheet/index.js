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
import { ActionSheetAnimator, IOSActionSheetAnimator, MDActionSheetAnimator } from './animator';
import platform from '../../ons/platform';
import BaseDialogElement from '../base/base-dialog';
import contentReady from '../../ons/content-ready';

const scheme = {
  '.action-sheet': 'action-sheet--*',
  '.action-sheet-mask': 'action-sheet-mask--*',
  '.action-sheet-title': 'action-sheet-title--*'
};

const _animatorDict = {
  'default': () => platform.isAndroid() ? MDActionSheetAnimator : IOSActionSheetAnimator,
  'none': ActionSheetAnimator
};

/**
 * @element ons-action-sheet
 * @category dialog
 * @description
 *   [en]
 *     Action/bottom sheet that is displayed on top of current screen.
 *
 *     This element can either be attached directly to the `<body>` or dynamically created from a template using the `ons.createElement(template, { append: true })` utility function and the `<ons-template>` tag.
 *
 *     The action sheet is useful for displaying a list of options and asking the user to make a decision. A `ons-action-sheet-button` is provided for this purpose, although it can contain any type of content.
 *
 *     It will automatically be displayed as Material Design (bottom sheet) when running on an Android device.
 *   [/en]
 *   [ja]
 *     アクションシート、もしくはボトムシートを現在のスクリーン上に表示します。
 *
 *     この要素は、`<body>`要素に直接アタッチされるか、もしくは`ons.createElement(template, { append: true })`と`<ons-template>`タグを使ってテンプレートから動的に生成されます。
 *
 *     アクションシートは、選択肢のリストを表示してユーザーに尋ねるのに便利です。`ons-action-sheet-button`は、この要素の中に置くために提供されていますが、それ以外にも他のどのような要素を含むことができます。
 *
 *     Androidデバイスで実行されるときには、自動的にマテリアルデザイン(ボトムシート)として表示されます。
 *   [/ja]
 * @modifier material
 *   [en]Display a Material Design bottom sheet.[/en]
 *   [ja]マテリアルデザインのボトムシートを表示します。[/ja]
 * @tutorial vanilla/reference/action-sheet
 * @guide theming.html#modifiers [en]More details about the `modifier` attribute[/en][ja]modifier属性の使い方[/ja]
 * @seealso ons-popover
 *   [en]`<ons-popover>` component[/en]
 *   [ja]ons-popoverコンポーネント[/ja]
 * @seealso ons-modal
 *   [en]`<ons-modal>` component[/en]
 *   [ja]ons-modalコンポーネント[/ja]
 * @example
 * <ons-action-sheet id="sheet">
 *   <ons-action-sheet-button>Label</ons-action-sheet-button>
 *   <ons-action-sheet-button>Label</ons-action-sheet-button>
 * </ons-action-sheet>
 *
 * <script>
 *   document.getElementById('sheet').show();
 * </script>
 */
export default class ActionSheetElement extends BaseDialogElement {

  /**
   * @event preshow
   * @description
   * [en]Fired just before the action sheet is displayed.[/en]
   * [ja]ダイアログが表示される直前に発火します。[/ja]
   * @param {Object} event [en]Event object.[/en]
   * @param {Object} event.actionSheet
   *   [en]Component object.[/en]
   *   [ja]コンポーネントのオブジェクト。[/ja]
   * @param {Function} event.cancel
   *   [en]Execute this function to stop the action sheet from being shown.[/en]
   *   [ja]この関数を実行すると、ダイアログの表示がキャンセルされます。[/ja]
   */

  /**
   * @event postshow
   * @description
   * [en]Fired just after the action sheet is displayed.[/en]
   * [ja]ダイアログが表示された直後に発火します。[/ja]
   * @param {Object} event [en]Event object.[/en]
   * @param {Object} event.actionSheet
   *   [en]Component object.[/en]
   *   [ja]コンポーネントのオブジェクト。[/ja]
   */

  /**
   * @event prehide
   * @description
   * [en]Fired just before the action sheet is hidden.[/en]
   * [ja]ダイアログが隠れる直前に発火します。[/ja]
   * @param {Object} event [en]Event object.[/en]
   * @param {Object} event.actionSheet
   *   [en]Component object.[/en]
   *   [ja]コンポーネントのオブジェクト。[/ja]
   * @param {Function} event.cancel
   *   [en]Execute this function to stop the action sheet from being hidden.[/en]
   *   [ja]この関数を実行すると、ダイアログの非表示がキャンセルされます。[/ja]
   */

  /**
   * @event posthide
   * @description
   * [en]Fired just after the action sheet is hidden.[/en]
   * [ja]ダイアログが隠れた後に発火します。[/ja]
   * @param {Object} event [en]Event object.[/en]
   * @param {Object} event.actionSheet
   *   [en]Component object.[/en]
   *   [ja]コンポーネントのオブジェクト。[/ja]
   */

  /**
   * @attribute title
   * @type {String}
   * @description
   *  [en]Optional title of the action sheet. A new element will be created containing this string.[/en]
   *  [ja]アクションシートのタイトルを指定します。ここで指定した文字列を含む新しい要素が作成されます。[/ja]
   */

  /**
   * @attribute modifier
   * @type {String}
   * @description
   *  [en]The appearance of the action sheet.[/en]
   *  [ja]ダイアログの表現を指定します。[/ja]
   */

  /**
   * @attribute cancelable
   * @description
   *  [en]If this attribute is set the action sheet can be closed by tapping the background or by pressing the back button on Android devices.[/en]
   *  [ja]この属性が設定されると、アクションシートの背景やAndroidデバイスのバックボタンを推すことでアクションシートが閉じるようになります。[/ja]
   */

  /**
   * @attribute disabled
   * @description
   *  [en]If this attribute is set the action sheet is disabled.[/en]
   *  [ja]この属性がある時、ダイアログはdisabled状態になります。[/ja]
   */

  /**
   * @attribute animation
   * @type {String}
   * @default default
   * @description
   *  [en]The animation used when showing and hiding the action sheet. Can be either `"none"` or `"default"`.[/en]
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
    return util.findChild(this, '.action-sheet-mask');
  }

  get _sheet() {
    return util.findChild(this, '.action-sheet');
  }

  get _title() {
    return this.querySelector('.action-sheet-title');
  }

  _updateAnimatorFactory() {
    return new AnimatorFactory({
      animators: _animatorDict,
      baseClass: ActionSheetAnimator,
      baseClassName: 'ActionSheetAnimator',
      defaultAnimation: this.getAttribute('animation')
    });
  }

  _compile() {
    autoStyle.prepare(this);

    this.style.display = 'none';
    this.style.zIndex = 10001;

    /* Expected result:
     *   <ons-action-sheet>
     *     <div class="action-sheet-mask"></div>
     *     <div class="action-sheet">
     *       <div class="action-sheet-title></div>
     *       ...
     *     </div>
     *   </ons-action-sheet>
     */

    if (!this._sheet) {
      const sheet = document.createElement('div');
      sheet.classList.add('action-sheet');

      while (this.firstChild) {
        sheet.appendChild(this.firstChild);
      }

      this.appendChild(sheet);
    }

    if (!this._title && this.hasAttribute('title')) {
      const title = document.createElement('div');
      title.innerHTML = this.getAttribute('title');
      title.classList.add('action-sheet-title');
      this._sheet.insertBefore(title, this._sheet.firstChild);
    }

    if (!this._mask) {
      const mask = document.createElement('div');
      mask.classList.add('action-sheet-mask');
      this.insertBefore(mask, this.firstChild);
    }

    this._sheet.style.zIndex = 20001;
    this._mask.style.zIndex = 20000;

    ModifierUtil.initModifier(this, this._scheme);
  }

  _updateTitle() {
    if (this._title) {
      this._title.innerHTML = this.getAttribute('title');
    }
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
   *   [en]This function is called after the action sheet has been revealed.[/en]
   *   [ja]ダイアログが表示され終わった後に呼び出される関数オブジェクトを指定します。[/ja]
   * @description
   *  [en]Show the action sheet.[/en]
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
   *   [en]This functions is called after the action sheet has been hidden.[/en]
   *   [ja]ダイアログが隠れた後に呼び出される関数オブジェクトを指定します。[/ja]
   * @description
   *   [en]Hide the action sheet.[/en]
   *   [ja]ダイアログを閉じます。[/ja]
   * @return {Promise}
   *   [en]Resolves to the hidden element[/en]
   *   [ja]隠れた要素を解決します。[/ja]
   */

  /**
   * @property visible
   * @readonly
   * @type {Boolean}
   * @description
   *   [en]Whether the action sheet is visible or not.[/en]
   *   [ja]要素が見える場合に`true`。[/ja]
   */

  /**
   * @property disabled
   * @type {Boolean}
   * @description
   *   [en]Whether the action sheet is disabled or not.[/en]
   *   [ja]無効化されている場合に`true`。[/ja]
   */

  /**
   * @property cancelable
   * @type {Boolean}
   * @description
   *   [en]Whether the action sheet is cancelable or not. A cancelable action sheet can be closed by tapping the background or by pressing the back button on Android devices.[/en]
   *   [ja]アクションシートがキャンセル可能かどうかを設定します。キャンセル可能なアクションシートは、背景をタップしたりAndroidデバイスのバックボタンを推すことで閉じるようになります。[/ja]
   */

  static get observedAttributes() {
    return [...super.observedAttributes, 'title'];
  }

  attributeChangedCallback(name, last, current) {
    if (name === 'title') {
      this._updateTitle();
    } else {
      super.attributeChangedCallback(name, last, current);
    }
  }

  /**
   * @param {String} name
   * @param {ActionSheetAnimator} Animator
   */
  static registerAnimator(name, Animator) {
    if (!(Animator.prototype instanceof ActionSheetAnimator)) {
      throw new Error('"Animator" param must inherit OnsActionSheetElement.ActionSheetAnimator');
    }
    _animatorDict[name] = Animator;
  }

  static get animators() {
    return _animatorDict;
  }

  static get ActionSheetAnimator() {
    return ActionSheetAnimator;
  }
}

customElements.define('ons-action-sheet', ActionSheetElement);
