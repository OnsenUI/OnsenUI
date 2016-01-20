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
import BaseElement from 'ons/base-element';

var scheme = {
  '': 'back-button--*',
  '.back-button__icon': 'back-button--*__icon',
  '.back-button__label': 'back-button--*__label'
};

/**
 * @element ons-back-button
 * @category page
 * @description
 *   [en]Back button component for ons-toolbar. Can be used with ons-navigator to provide back button support.[/en]
 *   [ja]ons-toolbarに配置できる「戻るボタン」用コンポーネントです。ons-navigatorと共に使用し、ページを1つ前に戻る動作を行います。[/ja]
 * @codepen aHmGL
 * @seealso ons-toolbar
 *   [en]ons-toolbar component[/en]
 *   [ja]ons-toolbarコンポーネント[/ja]
 * @seealso ons-navigator
 *   [en]ons-navigator component[/en]
 *   [ja]ons-navigatorコンポーネント[/en]
 * @guide Addingatoolbar
 *   [en]Adding a toolbar[/en]
 *   [ja]ツールバーの追加[/ja]
 * @guide Returningfromapage
 *   [en]Returning from a page[/en]
 *   [ja]一つ前のページに戻る[/ja]
 * @example
 * <ons-back-button>
 *   Back
 * </ons-back-button>
 */
class BackButtonElement extends BaseElement {

  createdCallback() {
    this._options = {};
    this._compile();
    this._boundOnClick = this._onClick.bind(this);
    ModifierUtil.initModifier(this, scheme);
  }

  _compile() {
    this.classList.add('back-button');

    const label = util.createElement(`
      <span class="back-button__label">${this.innerHTML}</span>
    `);

    this.innerHTML = '';

    const icon = util.createElement(`
      <span class="back-button__icon"></span>
    `);

    this.appendChild(icon);
    this.appendChild(label);
  }

  /**
   * @return {object}
   */
  get options() {
    return this._options;
  }

  /**
   * @param {object}
   */
  set options(object) {
    this._options = object;
  }

  _onClick() {
    const navigator = util.findParent(this, 'ons-navigator');
    if (navigator) {
      this.options.cancelIfRunning = true;

      if (this.hasAttribute('animation')) {
        this.options.animation = this.getAttribute('animation');
      }

      if (this.hasAttribute('animation-options')) {
        this.options.animationOptions = util.animationOptionsParse(this.getAttribute('animation-options'));
      }

      if (this.hasAttribute('on-transition-end')) {
        this.options.onTransitionEnd = window.eval('(' + this.getAttribute('on-transition-end') + ')');
      }

      if (this.hasAttribute('refresh')) {
        this.options.refresh = this.getAttribute('refresh') === 'true';
      }

      navigator.popPage(this.options);
    }
  }

  attachedCallback() {
    this.addEventListener('click', this._boundOnClick, false);
  }

  attributeChangedCallback(name, last, current) {
    if (name === 'modifier') {
      return ModifierUtil.onModifierChanged(last, current, this, scheme);
    }
  }

  detachedCallback() {
    this.removeEventListener('click', this._boundOnClick, false);
  }

  show() {
    this.style.display = 'inline-block';
  }

  hide() {
    this.style.display = 'none';
  }
}

window.OnsBackButtonElement = document.registerElement('ons-back-button', {
  prototype: BackButtonElement.prototype
});
