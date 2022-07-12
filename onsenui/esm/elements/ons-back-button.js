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
import autoStyle from '../ons/autostyle.js';
import ModifierUtil from '../ons/internal/modifier-util.js';
import BaseElement from './base/base-element.js';
import contentReady from '../ons/content-ready.js';

const defaultClassName = 'back-button';

const scheme = {
  '': 'back-button--*',
  '.back-button__icon': 'back-button--*__icon',
  '.back-button__label': 'back-button--*__label'
};

// original image file at misc/images/ios-back-button-icon.svg
const iosBackButtonIcon = `
  <?xml version="1.0" encoding="UTF-8"?>
  <svg width="13px" height="21px" viewBox="0 0 13 21" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <title>ios-back-button-icon</title>
      <desc>Created with Sketch.</desc>
      <defs></defs>
      <g id="toolbar-back-button" stroke="none" stroke-width="1" fill-rule="evenodd">
          <g id="ios" transform="translate(-34.000000, -30.000000)">
              <polygon id="ios-back-button-icon" points="34 40.5 44.5 30 46.5 32 38 40.5 46.5 49 44.5 51"></polygon>
          </g>
      </g>
  </svg>
`;

// original image file at misc/images/md-back-button-icon.svg
const mdBackButtonIcon = `
  <?xml version="1.0" encoding="UTF-8"?>
  <svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <title>md-back-button-icon</title>
      <desc>Created with Sketch.</desc>
      <defs></defs>
      <g id="toolbar-back-button" stroke="none" stroke-width="1" fill-rule="evenodd">
          <g id="android" transform="translate(-32.000000, -32.000000)" fill-rule="nonzero">
              <polygon id="md-back-button-icon" points="48 39 35.83 39 41.42 33.41 40 32 32 40 40 48 41.41 46.59 35.83 41 48 41"></polygon>
          </g>
      </g>
  </svg>
`;

/**
 * @element ons-back-button
 * @category navigation
 * @description
 *   [en]
 *     Back button component for `<ons-toolbar>`. Put it in the left part of the `<ons-toolbar>`.
 *
 *     It will find the parent `<ons-navigator>` element and pop a page when clicked. This behavior can be overriden by specifying the `onClick` property and calling event.preventDefault in its callback.
 *   [/en]
 *   [ja][/ja]
 * @codepen aHmGL
 * @tutorial vanilla/Reference/back-button
 * @modifier material
 *   [en]Material Design style[/en]
 *   [ja][/ja]
 * @seealso ons-toolbar
 *   [en]ons-toolbar component[/en]
 *   [ja]ons-toolbarコンポーネント[/ja]
 * @seealso ons-navigator
 *   [en]ons-navigator component[/en]
 *   [ja]ons-navigatorコンポーネント[/ja]
 * @example
 * <ons-toolbar>
 *   <div class="left">
 *     <ons-back-button>Back</ons-back-button>
 *   </div>
 *   <div class="center">
 *     Title
 *   <div>
 * </ons-toolbar>
 */

export default class BackButtonElement extends BaseElement {
  /**
   * @attribute modifier
   * @type {String}
   * @description
   *  [en]The appearance of the back button.[/en]
   *  [ja]バックボタンの見た目を指定します。[/ja]
   */

  constructor() {
    super();

    contentReady(this, () => {
      this._compile();
    });

    this._options = {};
    this._boundOnClick = this._onClick.bind(this);

    const {onConnected, onDisconnected} = util.defineListenerProperty(this, 'click');
    this._connectOnClick = onConnected;
    this._disconnectOnClick = onDisconnected;
  }

  _updateIcon(icon = util.findChild(this, '.back-button__icon')) {
    icon.innerHTML = autoStyle.getPlatform(this) === 'android' || util.hasModifier(this, 'material') ? mdBackButtonIcon : iosBackButtonIcon;
  }

  _compile() {
    autoStyle.prepare(this);

    this.classList.add(defaultClassName);

    if (!util.findChild(this, '.back-button__label')) {
      const label = util.create('span.back-button__label');

      while (this.childNodes[0]) {
        label.appendChild(this.childNodes[0]);
      }
      this.appendChild(label);
    }

    if (!util.findChild(this, '.back-button__icon')) {
      const icon = util.create('span.back-button__icon');
      this._updateIcon(icon);

      this.insertBefore(icon, this.children[0]);
    }

    util.updateRipple(this, undefined, {center: '', 'size': 'contain', 'background': 'transparent'});

    ModifierUtil.initModifier(this, scheme);
  }

  /**
   * @property options
   * @type {Object}
   * @description
   *   [en]Options object.[/en]
   *   [ja]オプションを指定するオブジェクト。[/ja]
   */

  /**
   * @property options.animation
   * @type {String}
   * @description
   *   [en]Animation name. Available animations are "slide", "lift", "fade" and "none".
   *     These are platform based animations. For fixed animations, add "-ios" or "-md"
   *     suffix to the animation name. E.g. "lift-ios", "lift-md". Defaults values are "slide-ios" and "fade-md".
   *   [/en]
   *   [ja][/ja]
   */

  /**
   * @property options.animationOptions
   * @type {String}
   * @description
   *   [en]Specify the animation's duration, delay and timing. E.g.  `{duration: 0.2, delay: 0.4, timing: 'ease-in'}`[/en]
   *   [ja]アニメーション時のduration, delay, timingを指定します。e.g. `{duration: 0.2, delay: 0.4, timing: 'ease-in'}` [/ja]
   */

  /**
   * @property options.callback
   * @type {String}
   * @description
   *   [en]Function that is called when the transition has ended.[/en]
   *   [ja]このメソッドによる画面遷移が終了した際に呼び出される関数オブジェクトを指定します。[/ja]
   */

  get options() {
    return this._options;
  }

  set options(object) {
    this._options = object;
  }

  /**
   * @property onClick
   * @type {Function}
   * @description
   *   [en]Used to override the default back button behavior.[/en]
   *   [ja][/ja]
   */

  _onClick(event) {
    setTimeout(() => {
      if (!event.defaultPrevented) {
        const navigator = util.findParent(this, 'ons-navigator');
        if (navigator) {
          navigator.popPage({...this.options, onsBackButton: true});
        }
      }
    });
  }

  connectedCallback() {
    this.addEventListener('click', this._boundOnClick, false);
    this._connectOnClick();
  }

  static get observedAttributes() {
    return ['modifier', 'class'];
  }

  attributeChangedCallback(name, last, current) {
    switch (name) {
      case 'class':
        util.restoreClass(this, defaultClassName, scheme);
        break;

      case 'modifier': {
        ModifierUtil.onModifierChanged(last, current, this, scheme) && this._updateIcon();
        break;
      }
    }
  }

  disconnectedCallback() {
    this.removeEventListener('click', this._boundOnClick, false);
    this._disconnectOnClick();
  }

  show() {
    this.style.display = 'inline-block';
  }

  hide() {
    this.style.display = 'none';
  }
}

onsElements.BackButton = BackButtonElement;
customElements.define('ons-back-button', BackButtonElement);
