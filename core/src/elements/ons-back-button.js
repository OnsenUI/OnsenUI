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

import util from '../ons/util';
import autoStyle from '../ons/autostyle';
import ModifierUtil from '../ons/internal/modifier-util';
import BaseElement from './base/base-element';
import contentReady from '../ons/content-ready';
import iosBackButtonIcon from '../../images/ios-back-button-icon.svg';
import mdBackButtonIcon from '../../images/md-back-button-icon.svg';

const defaultClassName = 'back-button';

const scheme = {
  '': 'back-button--*',
  '.back-button__icon': 'back-button--*__icon',
  '.back-button__label': 'back-button--*__label'
};

/**
 * @element ons-back-button
 * @category navigation
 * @description
 *   [en]
 *     Back button component for `<ons-toolbar>`. Put it in the left part of the `<ons-toolbar>`.
 *
 *     It will find the parent `<ons-navigator>` element and pop a page when clicked. This behavior can be overriden by specifying the `onClick` property.
 *   [/en]
 *   [ja][/ja]
 * @codepen aHmGL
 * @tutorial vanilla/Reference/navigator
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

  /**
   * @property options.refresh
   * @description
   *   [en]The previous page will be refreshed (destroyed and created again) before popPage action.[/en]
   *   [ja]popPageする前に、前にあるページを生成しなおして更新する場合にtrueを指定します。[/ja]
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
  _onClick() {
    if (this.onClick) {
      this.onClick.apply(this);
    }
    else {
      const navigator = util.findParent(this, 'ons-navigator');
      if (navigator) {
        navigator.popPage(this.options);
      }
    }
  }

  connectedCallback() {
    this.addEventListener('click', this._boundOnClick, false);
  }

  static get observedAttributes() {
    return ['modifier', 'class'];
  }

  attributeChangedCallback(name, last, current) {
    switch (name) {
      case 'class':
        if (!this.classList.contains(defaultClassName)) {
          this.className = defaultClassName + ' ' + current;
        }
        break;

      case 'modifier': {
        ModifierUtil.onModifierChanged(last, current, this, scheme) && this._updateIcon();
        break;
      }
    }
  }

  disconnectedCallback() {
    this.removeEventListener('click', this._boundOnClick, false);
  }

  show() {
    this.style.display = 'inline-block';
  }

  hide() {
    this.style.display = 'none';
  }
}

customElements.define('ons-back-button', BackButtonElement);
