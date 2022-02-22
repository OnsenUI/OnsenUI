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
import ModifierUtil from '../ons/internal/modifier-util.js';
import AnimatorFactory from '../ons/internal/animator-factory.js';
import OverlaySplitterAnimator from './ons-splitter/overlay-animator.js';
import PushSplitterAnimator from './ons-splitter/push-animator.js';
import RevealSplitterAnimator from './ons-splitter/reveal-animator.js';
import BaseElement from './base/base-element.js';
import deviceBackButtonDispatcher from '../ons/internal/device-back-button-dispatcher.js';
import contentReady from '../ons/content-ready.js';

const _animatorDict = {
  default: OverlaySplitterAnimator,
  overlay: OverlaySplitterAnimator,
  push: PushSplitterAnimator,
  reveal: RevealSplitterAnimator
};

/**
 * @element ons-splitter
 * @category menu
 * @description
 *  [en]
 *    A component that enables responsive layout by implementing both a two-column layout and a sliding menu layout.
 *
 *    It can be configured to automatically expand into a column layout on large screens and collapse the menu on smaller screens. When the menu is collapsed the user can open it by swiping.
 *  [/en]
 *  [ja][/ja]
 * @codepen rOQOML
 * @tutorial vanilla/Reference/splitter
 * @guide fundamentals.html#managing-pages
 *  [en]Managing multiple pages.[/en]
 *  [ja]複数のページを管理する[/ja]
 * @seealso ons-splitter-content
 *  [en]The `<ons-splitter-content>` component contains the main content of the page.[/en]
 *  [ja]ons-splitter-contentコンポーネント[/ja]
 * @seealso ons-splitter-side
 *  [en]The `<ons-splitter-side>` component contains the menu.[/en]
 *  [ja]ons-splitter-sideコンポーネント[/ja]
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
export default class SplitterElement extends BaseElement {

  _getSide(side) {
    const element = util.findChild(this, e => {
      return util.match(e, 'ons-splitter-side') && e.getAttribute('side') === side;
    });
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

  /**
   * @property side
   * @readonly
   * @type {HTMLElement}
   * @description
   *   [en]First `<ons-splitter-side>` element regardless the actual side.[/en]
   *   [ja][/ja]
   */
  get side() {
    return util.findChild(this, 'ons-splitter-side');
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

  get topPage() {
    return this.content._content;
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
      if (this.content) {
        this.content.style[side.side] = side.mode === 'split' ? side.style.width : 0;
      }
    });
  }

  constructor() {
    super();

    this._onModeChange = this._onModeChange.bind(this);

    contentReady(this, () => {
      !this.mask && this.appendChild(document.createElement('ons-splitter-mask'));
      this._layout();
    });
  }

  connectedCallback() {
    this.onDeviceBackButton = this._onDeviceBackButton.bind(this);
    this.addEventListener('modechange', this._onModeChange, false);
  }

  disconnectedCallback() {
    this._backButtonHandler.destroy();
    this._backButtonHandler = null;
    this.removeEventListener('modechange', this._onModeChange, false);
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

  static registerAnimator(name, Animator) {
    if (!(Animator instanceof SplitterAnimator)) {
      util.throwAnimator('Splitter');
    }
    _animatorDict[name] = Animator;
  }

  static get SplitterAnimator() {
    return SplitterAnimator;
  }

  static get animators() {
    return _animatorDict;
  }
}

onsElements.Splitter = SplitterElement;
customElements.define('ons-splitter', SplitterElement);
