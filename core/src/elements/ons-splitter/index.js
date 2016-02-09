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
import OverlaySplitterAnimator from './overlay-animator';
import SplitterAnimator from './animator';
import BaseElement from 'ons/base-element';
import deviceBackButtonDispatcher from 'ons/device-back-button-dispatcher';

/**
 * @element ons-splitter
 * @category control
 * @description
 *  [en]A component that enables responsive layout by implementing both a two-column layout and a sliding menu layout.[/en]
 *  [ja]sliding-menuとsplit-view両方の機能を持つレイアウトです。[/ja]
 * @codepen rOQOML
 * @guide CallingComponentAPIsfromJavaScript
 *   [en]Using components from JavaScript[/en]
 *   [ja]JavaScriptからコンポーネントを呼び出す[/ja]
 * @example
 * <ons-splitter>
 *   <ons-splitter-content>
 *     ...
 *   </ons-splitter-content>
 *
 *   <ons-splitter-side side="left" width="80%" collapse>
 *     ...
 *   </ons-splitter-side>
 * </ons-splitter>
 */
class SplitterElement extends BaseElement {

  createdCallback() {
    this._boundOnDeviceBackButton = this._onDeviceBackButton.bind(this);
    this._boundOnModeChange = this._onModeChange.bind(this);
  }

  _onModeChange(event) {
    if (event.target.parentElement === this) {
      this._layout();
    }
  }

  /**
   * @param {String} side 'left' or 'right'.
   * @return {Element}
   */
  _getSideElement(side) {
    const result = util.findChild(this, element => {
      return element.nodeName.toLowerCase() === 'ons-splitter-side' && element.getAttribute('side') === side;
    });

    if (result) {
      CustomElements.upgrade(result);
    }

    return result;
  }

  _layout() {
    const content = this._getContentElement();
    const left = this._getSideElement('left');
    const right = this._getSideElement('right');

    if (content) {
      if (left && left.getCurrentMode && left.getCurrentMode() === 'split') {
        content.style.left = left._getWidth();
      } else {
        content.style.left = '0px';
      }

      if (right && right.getCurrentMode && right.getCurrentMode() === 'split') {
        content.style.right = right._getWidth();
      } else {
        content.style.right = '0px';
      }
    }
  }

  /**
   * @return {Element}
   */
  _getContentElement() {
    return util.findChild(this, 'ons-splitter-content');
  }

  attributeChangedCallback(name, last, current) {
  }

  /**
   * @method openRight
   * @signature openRight([options])
   * @param {Object} [options]
   *   [en]Parameter object.[/en]
   *   [ja]オプションを指定するオブジェクト。[/ja]
   * @param {Function} [options.callback]
   *   [en]This function will be called after the menu has been opened.[/en]
   *   [ja]メニューが開いた後に呼び出される関数オブジェクトを指定します。[/ja]
   * @description
   *   [en]Open right ons-splitter-side menu on collapse mode.[/en]
   *   [ja]右のcollapseモードになっているons-splitter-side要素を開きます。[/ja]
   * @return {Promise}
   *   [en]Resolves to the splitter side element[/en]
   *   [ja][/ja]
   */
  openRight(options = {}) {
    return this._open('right', options);
  }

  _getMaskElement() {
    const mask = util.findChild(this, 'ons-splitter-mask');
    return mask || this.appendChild(document.createElement('ons-splitter-mask'));
  }

  /**
   * @method openLeft
   * @signature openLeft([options])
   * @param {Object} [options]
   *   [en]Parameter object.[/en]
   *   [ja]オプションを指定するオブジェクト。[/ja]
   * @param {Function} [options.callback]
   *   [en]This function will be called after the menu has been opened.[/en]
   *   [ja]メニューが開いた後に呼び出される関数オブジェクトを指定します。[/ja]
   * @description
   *   [en]Open left ons-splitter-side menu on collapse mode.[/en]
   *   [ja]左のcollapseモードになっているons-splitter-side要素を開きます。[/ja]
   * @return {Promise}
   *   [en]Resolves to the splitter side element[/en]
   *   [ja][/ja]
   */
  openLeft(options = {}) {
    return this._open('left', options);
  }

  /**
   * @param {String} side
   * @param {Object} [options]
   * @return {Promise} Resolves to the splitter side element
   */
  _open(side, options = {}) {
    const menu = this._getSideElement(side);

    if (menu) {
      return menu.open(options);
    } else {
      throw new Error('child "ons-splitter-side" element is not found in this element.');
    }
  }

  /**
   * @method closeRight
   * @signature closeRight([options])
   * @param {Object} [options]
   *   [en]Parameter object.[/en]
   *   [ja]オプションを指定するオブジェクト。[/ja]
   * @param {Function} [options.callback]
   *   [en]This function will be called after the menu has been closed.[/en]
   *   [ja]メニューが閉じた後に呼び出される関数オブジェクトを指定します。[/ja]
   * @description
   *   [en]Close right ons-splitter-side menu on collapse mode.[/en]
   *   [ja]右のcollapseモードになっているons-splitter-side要素を閉じます。[/ja]
   * @return {Promise}
   *   [en]Resolves to the splitter side element[/en]
   *   [ja][/ja]
   */
  closeRight(options = {}) {
    return this._close('right', options);
  }

  /**
   * @method closeLeft
   * @signature closeLeft([options])
   * @param {Object} [options]
   *   [en]Parameter object.[/en]
   *   [ja]オプションを指定するオブジェクト。[/ja]
   * @param {Function} [options.callback]
   *   [en]This function will be called after the menu has been closed.[/en]
   *   [ja]メニューが閉じた後に呼び出される関数オブジェクトを指定します。[/ja]
   * @description
   *   [en]Close left ons-splitter-side menu on collapse mode.[/en]
   *   [ja]左のcollapseモードになっているons-splitter-side要素を閉じます。[/ja]
   * @return {Promise}
   *   [en]Resolves to the splitter side element[/en]
   *   [ja][/ja]
   */
  closeLeft(options = {}) {
    return this._close('left', options);
  }

  /**
   * @param {String} side
   * @param {Object} [options]
   * @return {Promise} Resolves to the splitter side element
   */
  _close(side, options = {}) {
    const menu = this._getSideElement(side);

    if (menu) {
      return menu.close(options);
    } else {
      throw new Error('child "ons-splitter-side" element is not found in this element.');
    }
  }

  /**
   * @param {Object} [options]
   * @return {Promise} Resolves to the splitter side element
   */
  toggleLeft(options = {}) {
    return this._toggle('left', options);
  }

  /**
   * @param {Object} [options]
   * @return {Promise} Resolves to the splitter side element
   */
  toggleRight(options = {}) {
    return this._toggle('right', options);
  }

  /**
   * @param {String} side
   * @param {Object} [options]
   * @return {Promise} Resolves to the splitter side element
   */
  _toggle(side, options = {}) {
    const menu = this._getSideElement(side);

    if (menu) {
      return menu.toggle(options);
    } else {
      throw new Error('child "ons-splitter-side" element is not found in this element.');
    }
  }

  /**
   * @method leftIsOpen
   * @signature leftIsOpen()
   * @return {Boolean}
   *   [en]Whether the left ons-splitter-side on collapse mode is opened.[/en]
   *   [ja]左のons-splitter-sideが開いているかどうかを返します。[/ja]
   * @description
   *   [en]Determines whether the left ons-splitter-side on collapse mode is opened.[/en]
   *   [ja]左のons-splitter-side要素が開いているかどうかを返します。[/ja]
   */
  leftIsOpen() {
    return this._isOpen('left');
  }

  /**
   * @method rightIsOpen
   * @signature rightIsOpen()
   * @return {Boolean}
   *   [en]Whether the right ons-splitter-side on collapse mode is opened.[/en]
   *   [ja]右のons-splitter-sideが開いているかどうかを返します。[/ja]
   * @description
   *   [en]Determines whether the right ons-splitter-side on collapse mode is opened.[/en]
   *   [ja]右のons-splitter-side要素が開いているかどうかを返します。[/ja]
   */
  rightIsOpen() {
    return this._isOpen('right');
  }

  /**
   * @param {String} side
   * @return {Boolean}
   */
  _isOpen(side) {
    const menu = this._getSideElement(side);

    if (menu) {
      return menu.isOpen();
    }

    return false;
  }

  /**
   * @method loadContentPage
   * @signature loadContentPage(pageUrl)
   * @param {String} pageUrl
   *   [en]Page URL. Can be either an HTML document or an <code>&lt;ons-template&gt;</code>.[/en]
   *   [ja]pageのURLか、ons-templateで宣言したテンプレートのid属性の値を指定します。[/ja]
   * @description
   *   [en]Show the page specified in pageUrl in the ons-splitter-content pane.[/en]
   *   [ja]ons-splitter-content要素に表示されるページをpageUrlに指定します。[/ja]
   */
  loadContentPage(page, options = {}) {
    const content = this._getContentElement();

    if (content) {
      return content.load(page, options);
    } else {
      throw new Error('child "ons-splitter-content" element is not found in this element.');
    }
  }

  _onDeviceBackButton(handler) {
    const left = this._getSideElement('left');
    const right = this._getSideElement('right');

    if (left.isOpen()) {
      left.close();
      return;
    }

    if (right.isOpen()) {
      right.close();
      return;
    }

    handler.callParentHandler();
  }

  attachedCallback() {
    this._deviceBackButtonHandler = deviceBackButtonDispatcher.createHandler(this, this._boundOnDeviceBackButton);
    this._assertChildren();

    this.addEventListener('modechange', this._boundOnModeChange, false);

    setImmediate(() => this._layout());
  }

  /**
   * @method getDeviceBackButtonHandler
   * @signature getDeviceBackButtonHandler()
   * @return {Object}
   *   [en]Device back-button handler.[/en]
   *   [ja]デバイスのバックボタンハンドラを返します。[/ja]
   * @description
   *   [en]Retrieve the back-button handler.[/en]
   *   [ja]ons-splitter要素に紐付いているバックボタンハンドラを取得します。[/ja]
   */
  getDeviceBackButtonHandler() {
    return this._deviceBackButtonHandler;
  }

  _assertChildren() {
    const names = ['ons-splitter-content', 'ons-splitter-side', 'ons-splitter-mask'];
    let contentCount = 0;
    let sideCount = 0;
    let maskCount = 0;

    util.arrayFrom(this.children).forEach(element => {
      const name = element.nodeName.toLowerCase();
      if (names.indexOf(name) === -1) {
        throw new Error(`"${name}" element is not allowed in "ons-splitter" element.`);
      }

      if (name === 'ons-splitter-content') {
        contentCount++;
      } else if (name === 'ons-splitter-content') {
        sideCount++;
      } else if (name === 'ons-splitter-mask') {
        maskCount++;
      }
    });

    if (contentCount > 1) {
      throw new Error('too many <ons-splitter-content> elements.');
    }

    if (sideCount > 2) {
      throw new Error('too many <ons-splitter-side> elements.');
    }

    if (maskCount > 1) {
      throw new Error('too many <ons-splitter-mask> elements.');
    }

    if (maskCount === 0) {
      this.appendChild(document.createElement('ons-splitter-mask'));
    }
  }

  detachedCallback() {
    this._deviceBackButtonHandler.destroy();
    this._deviceBackButtonHandler = null;

    this.removeEventListener('modechange', this._boundOnModeChange, false);
  }

  _show() {
    util.arrayFrom(this.children).forEach(child => {
      if (child._show instanceof Function) {
        child._show();
      }
    });
  }

  _hide() {
    util.arrayFrom(this.children).forEach(child => {
      if (child._hide instanceof Function) {
        child._hide();
      }
    });
  }

  _destroy() {
    util.arrayFrom(this.children).forEach(child => {
      if (child._destroy instanceof Function) {
        child._destroy();
      }
    });
    this.remove();
  }
}

window.OnsSplitterElement = document.registerElement('ons-splitter', {
  prototype: SplitterElement.prototype
});

window.OnsSplitterElement._animatorDict = {
  default: OverlaySplitterAnimator,
  overlay: OverlaySplitterAnimator
};

window.OnsSplitterElement.registerAnimator = function(name, Animator) {
  if (!(Animator instanceof SplitterAnimator)) {
    throw new Error('Animator parameter must be an instance of SplitterAnimator.');
  }
  window.OnsSplitterElement._animatorDict[name] = Animator;
};

window.OnsSplitterElement.SplitterAnimator = SplitterAnimator;
