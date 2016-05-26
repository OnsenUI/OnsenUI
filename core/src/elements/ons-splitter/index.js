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
import SplitterAnimator from './animator';
import BaseElement from 'ons/base-element';
import deviceBackButtonDispatcher from 'ons/device-back-button-dispatcher';
import contentReady from 'ons/content-ready';

/**
 * @element ons-splitter
 * @category splitter
 * @description
 *  [en]
 *    A component that enables responsive layout by implementing both a two-column layout and a sliding menu layout.
 *
 *    It can be configured to automatically expand into a column layout on large screens and collapse the menu on smaller screens. When the menu is collapsed the user can open it by swiping.
 *  [/en]
 *  [ja][/ja]
 * @codepen rOQOML
 * @tutorial vanilla/Reference/splitter
 * @seealso ons-splitter-content
 *  [en]The `<ons-splitter-content>` component contains the main content of the page.[/en]
 *  [ja]ons-splitter-contentコンポーネント[/ja]
 * @seealso ons-splitter-side
 *  [en]The `<ons-splitter-side>` component contains the menu.[/en]
 *  [ja]ons-splitter-sideコンポーネント[/ja]
 * @guide CallingComponentAPIsfromJavaScript
 *   [en]Using components from JavaScript[/en]
 *   [ja]JavaScriptからコンポーネントを呼び出す[/ja]
 * @example
 * <ons-splitter id="splitter">
 *   <ons-splitter-content>
 *     ...
 *   </ons-splitter-content>
 *
 *   <ons-splitter-side side="left" width="80%" collapse swipeable>
 *     ...
 *   </ons-splitter-side>
 * </ons-splitter>
 *
 * <script>
 *   var splitter = document.getElementById('splitter');
 *   splitter.left.open();
 * </script>
 */
class SplitterElement extends BaseElement {

  _getSide(side) {
    const element = util.findChild(this, e => {
      return util.match(e, 'ons-splitter-side') && e.getAttribute('side') === side;
    });
    element && CustomElements.upgrade(element);
    return element;
  }

  /**
   * @property left
   * @readonly
   * @type {HTMLElement}
   * @description
   *   [en]Left `<ons-splitter-side>` element.[/en]
   *   [ja][/ja]
   */
  get left() {
    return this._getSide('left');
  }
  /**
   * @property right
   * @readonly
   * @type {HTMLElement}
   * @description
   *   [en]Right `<ons-splitter-side>` element.[/en]
   *   [ja][/ja]
   */
  get right() {
    return this._getSide('right');
  }

  get _sides() {
    return [this.left, this.right].filter(e => e);
  }
  /**
   * @property content
   * @readonly
   * @type {HTMLElement}
   * @description
   *   [en]The `<ons-splitter-content>` element.[/en]
   *   [ja][/ja]
   */
  get content() {
    return util.findChild(this, 'ons-splitter-content');
  }

  get mask() {
    return util.findChild(this, 'ons-splitter-mask');
  }

  /**
   * @property onDeviceBackButton
   * @type {Object}
   * @description
   *   [en]Back-button handler.[/en]
   *   [ja]バックボタンハンドラ。[/ja]
   */
  get onDeviceBackButton() {
    return this._backButtonHandler;
  }

  set onDeviceBackButton(callback) {
    if (this._backButtonHandler) {
      this._backButtonHandler.destroy();
    }

    this._backButtonHandler = deviceBackButtonDispatcher.createHandler(this, callback);
  }

  _onDeviceBackButton(event) {
    this._sides.some(s => s.isOpen ? s.close() : false) || event.callParentHandler();
  }

  _onModeChange(e) {
    if (e.target.parentNode) {
      contentReady(this, () => {
        this._layout();
      });
    }
  }

  _layout() {
    this._sides.forEach(side => {
      this.content.style[side._side] = side.mode === 'split' ? side._width : 0;
    });
  }

  createdCallback() {
    this._boundOnModeChange = this._onModeChange.bind(this);

    contentReady(this, () => {
      this._compile();
      this._layout();
    });
  }

  _compile() {
    if (!this.mask) {
      this.appendChild(document.createElement('ons-splitter-mask'));
    }
  }

  attachedCallback() {
    this.onDeviceBackButton = this._onDeviceBackButton.bind(this);
    this.addEventListener('modechange', this._boundOnModeChange, false);
  }

  detachedCallback() {
    this._backButtonHandler.destroy();
    this._backButtonHandler = null;
    this.removeEventListener('modechange', this._boundOnModeChange, false);
  }

  attributeChangedCallback(name, last, current) {}

  _show() {
    util.propagateAction(this, '_show');
  }

  _hide() {
    util.propagateAction(this, '_hide');
  }

  _destroy() {
    util.propagateAction(this, '_destroy');
    this.remove();
  }
}

window.OnsSplitterElement = document.registerElement('ons-splitter', {
  prototype: SplitterElement.prototype
});

window.OnsSplitterElement._animatorDict = {
  default: SplitterAnimator,
  overlay: SplitterAnimator
};

window.OnsSplitterElement.registerAnimator = function(name, Animator) {
  if (!(Animator instanceof SplitterAnimator)) {
    throw new Error('Animator parameter must be an instance of SplitterAnimator.');
  }
  window.OnsSplitterElement._animatorDict[name] = Animator;
};

window.OnsSplitterElement.SplitterAnimator = SplitterAnimator;

export default OnsSplitterElement;
