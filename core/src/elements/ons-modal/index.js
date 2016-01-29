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
import ModalAnimator from './animator';
import FadeModalAnimator from './fade-animator';
import platform from 'ons/platform';
import BaseElement from 'ons/base-element';
import deviceBackButtonDispatcher from 'ons/device-back-button-dispatcher';
import DoorLock from 'ons/doorlock';

const scheme = {
  '': 'modal--*',
  'modal__content': 'modal--*__content'
};

const _animatorDict = {
  'default': ModalAnimator,
  'fade': FadeModalAnimator,
  'none': ModalAnimator
};

/**
 * @element ons-modal
 * @category modal
 * @description
 *   [en]
 *     Modal component that masks current screen.
 *     Underlying components are not subject to any events while the modal component is shown.
 *   [/en]
 *   [ja]
 *     画面全体をマスクするモーダル用コンポーネントです。下側にあるコンポーネントは、
 *     モーダルが表示されている間はイベント通知が行われません。
 *   [/ja]
 * @guide UsingModal
 *   [en]Using ons-modal component[/en]
 *   [ja]モーダルの使い方[/ja]
 * @guide CallingComponentAPIsfromJavaScript
 *   [en]Using navigator from JavaScript[/en]
 *   [ja]JavaScriptからコンポーネントを呼び出す[/ja]
 * @codepen devIg
 * @example
 * <ons-modal>
 *   ...
 * </ons-modal>
 */
class ModalElement extends BaseElement {

  /**
   * @attribute animation
   * @type {String}
   * @default default
   * @description
   *  [en]The animation used when showing and hiding the modal. Can be either "none" or "fade".[/en]
   *  [ja]モーダルを表示する際のアニメーション名を指定します。"none"もしくは"fade"を指定できます。[/ja]
   */

  /**
   * @attribute animation-options
   * @type {Expression}
   * @description
   *  [en]Specify the animation's duration, timing and delay with an object literal. E.g. <code>{duration: 0.2, delay: 1, timing: 'ease-in'}</code>[/en]
   *  [ja]アニメーション時のduration, timing, delayをオブジェクトリテラルで指定します。e.g. <code>{duration: 0.2, delay: 1, timing: 'ease-in'}</code>[/ja]
   */

  createdCallback() {
    if (!this.hasAttribute('_compiled')) {
      this._compile();
      ModifierUtil.initModifier(this, scheme);

      this.setAttribute('_compiled', '');
    }

    this._doorLock = new DoorLock();

    this._animatorFactory = new AnimatorFactory({
      animators: _animatorDict,
      baseClass: ModalAnimator,
      baseClassName: 'ModalAnimator',
      defaultAnimation: this.getAttribute('animation')
    });
  }

  /**
   * @method getDeviceBackButtonHandler
   * @signature getDeviceBackButtonHandler()
   * @return {Object}
   *   [en]Device back button handler.[/en]
   *   [ja]デバイスのバックボタンハンドラを返します。[/ja]
   * @description
   *   [en]Retrieve the back button handler.[/en]
   *   [ja]ons-modalに紐付いているバックボタンハンドラを取得します。[/ja]
   */
  getDeviceBackButtonHandler() {
    return this._deviceBackButtonHandler;
  }

  /**
   * @method setDeviceBackButtonHandler
   * @signature setDeviceBackButtonHandler(callback)
   * @return {Function} callback
   *   [en][/en]
   *   [ja][/ja]
   * @description
   *   [en][/en]
   *   [ja][/ja]
   */
  setDeviceBackButtonHandler(callback) {
    if (this._deviceBackButtonHandler) {
      this._deviceBackButtonHandler.destroy();
    }

    this._deviceBackButtonHandler = deviceBackButtonDispatcher.createHandler(this, callback);
    this._onDeviceBackButton = callback;
  }

  _onDeviceBackButton() {
    // Do nothing and stop device-backbutton handler chain.
    return;
  }

  _compile() {
    this.style.display = 'none';
    this.classList.add('modal');

    const wrapper = document.createElement('div');
    wrapper.classList.add('modal__content');

    while (this.childNodes[0]) {
      let node = this.childNodes[0];
      this.removeChild(node);
      wrapper.insertBefore(node, null);
    }

    this.appendChild(wrapper);
  }

  detachedCallback() {
    if (this._deviceBackButtonHandler) {
      this._deviceBackButtonHandler.destroy();
    }
  }

  attachedCallback() {
    setImmediate(this._ensureNodePosition.bind(this));
    this._deviceBackButtonHandler = deviceBackButtonDispatcher.createHandler(this, this._onDeviceBackButton.bind(this));
  }

  _ensureNodePosition() {
    if (!this.parentNode || this.hasAttribute('inline')) {
      return;
    }

    if (this.parentNode.nodeName.toLowerCase() !== 'ons-page') {
      var page = this;
      for (;;) {
        page = page.parentNode;

        if (!page) {
          return;
        }

        if (page.nodeName.toLowerCase() === 'ons-page') {
          break;
        }
      }
      page._registerExtraElement(this);
    }
  }

  /**
   * @method isShown
   * @signature isShown()
   * @return {Boolean}
   *   [en]true if the modal is visible.[/en]
   *   [ja]モーダルが表示されている場合にtrueとなります。[/ja]
   * @description
   *   [en]Returns whether the modal is visible or not.[/en]
   *   [ja]モーダルが表示されているかどうかを返します。[/ja]
   */
  isShown() {
    return this.style.display !== 'none';
  }

  /**
   * @method show
   * @signature show([options])
   * @param {Object} [options]
   *   [en]Parameter object.[/en]
   *   [ja]オプションを指定するオブジェクト。[/ja]
   * @param {String} [options.animation]
   *   [en]Animation name. Available animations are "none" and "fade".[/en]
   *   [ja]アニメーション名を指定します。"none", "fade"のいずれかを指定します。[/ja]
   * @param {String} [options.animationOptions]
   *   [en]Specify the animation's duration, delay and timing. E.g.  <code>{duration: 0.2, delay: 0.4, timing: 'ease-in'}</code>[/en]
   *   [ja]アニメーション時のduration, delay, timingを指定します。e.g. <code>{duration: 0.2, delay: 0.4, timing: 'ease-in'}</code> [/ja]
   * @description
   *   [en]Show modal.[/en]
   *   [ja]モーダルを表示します。[/ja]
   */
  show(options = {}) {
    options.animationOptions = util.extend(
      options.animationOptions || {},
      AnimatorFactory.parseAnimationOptionsString(this.getAttribute('animation-options'))
    );

    var callback = options.callback || function() {};

    this._doorLock.waitUnlock(() => {
      var unlock = this._doorLock.lock(),
        animator = this._animatorFactory.newAnimator(options);

      this.style.display = 'table';
      animator.show(this, function() {
        unlock();
        callback();
      });
    });
  }

  /**
   * @method toggle
   * @signature toggle([options])
   * @param {Object} [options]
   *   [en]Parameter object.[/en]
   *   [ja]オプションを指定するオブジェクト。[/ja]
   * @param {String} [options.animation]
   *   [en]Animation name. Available animations are "none" and "fade".[/en]
   *   [ja]アニメーション名を指定します。"none", "fade"のいずれかを指定します。[/ja]
   * @param {String} [options.animationOptions]
   *   [en]Specify the animation's duration, delay and timing. E.g.  <code>{duration: 0.2, delay: 0.4, timing: 'ease-in'}</code>[/en]
   *   [ja]アニメーション時のduration, delay, timingを指定します。e.g. <code>{duration: 0.2, delay: 0.4, timing: 'ease-in'}</code> [/ja]
   * @description
   *   [en]Toggle modal visibility.[/en]
   *   [ja]モーダルの表示を切り替えます。[/ja]
   */
  toggle() {
    if (this.isShown()) {
      return this.hide.apply(this, arguments);
    } else {
      return this.show.apply(this, arguments);
    }
  }

  /**
   * @method hide
   * @signature hide([options])
   * @param {Object} [options]
   *   [en]Parameter object.[/en]
   *   [ja]オプションを指定するオブジェクト。[/ja]
   * @param {String} [options.animation]
   *   [en]Animation name. Available animations are "none" and "fade".[/en]
   *   [ja]アニメーション名を指定します。"none", "fade"のいずれかを指定します。[/ja]
   * @param {String} [options.animationOptions]
   *   [en]Specify the animation's duration, delay and timing. E.g.  <code>{duration: 0.2, delay: 0.4, timing: 'ease-in'}</code>[/en]
   *   [ja]アニメーション時のduration, delay, timingを指定します。e.g. <code>{duration: 0.2, delay: 0.4, timing: 'ease-in'}</code> [/ja]
   * @description
   *   [en]Hide modal.[/en]
   *   [ja]モーダルを非表示にします。[/ja]
   */
  hide(options = {}) {
    options.animationOptions = util.extend(
      options.animationOptions || {},
      AnimatorFactory.parseAnimationOptionsString(this.getAttribute('animation-options'))
    );

    const callback = options.callback || function() {};

    this._doorLock.waitUnlock(() => {
      const unlock = this._doorLock.lock(),
        animator = this._animatorFactory.newAnimator(options);

      animator.hide(this, () => {
        this.style.display = 'none';
        unlock();
        callback();
      });
    });
  }

  attributeChangedCallback(name, last, current) {
    if (name === 'modifier') {
      return ModifierUtil.onModifierChanged(last, current, this, scheme);
    }
  }
}

window.OnsModalElement = document.registerElement('ons-modal', {
  prototype: ModalElement.prototype
});

/**
 * @param {String} name
 * @param {Function} Animator
 */
window.OnsModalElement.registerAnimator = function(name, Animator) {
  if (!(Animator.prototype instanceof ModalAnimator)) {
    throw new Error('"Animator" param must inherit OnsModalElement.ModalAnimator');
  }
  _animatorDict[name] = Animator;
};

window.OnsModalElement.ModalAnimator = ModalAnimator;

