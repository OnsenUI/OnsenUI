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

const defaultClassName = 'card';
const scheme = {
  '': 'card--*',
  '.card__title': 'card--*__title',
  '.card__content': 'card--*__content'
};

/**
 * @element ons-card
 * @category visual
 * @modifier material
 *   [en]A card with material design.[/en]
 *   [ja]リストの上下のボーダーが無いリストを表示します。[/ja]
 * @description
 *   [en]
 *    Component to create a card that displays some information.
 *
 *    The card may be composed by divs with specially prepared classes `title` and/or `content`. You can also add your own content as you please.[/en]
 *   [ja][/ja]
 * @tutorial vanilla/Reference/card
 * @example
 * <ons-card>
 *   <p>Some content</p>
 * </ons-card>
 */
export default class CardElement extends BaseElement {

  /**
   * @attribute modifier
   * @type {String}
   * @description
   *   [en]The appearance of the card.[/en]
   *   [ja]リストの表現を指定します。[/ja]
   */

  constructor() {
    super();

    contentReady(this, () => {
      this._compile();
    });
  }

  _compile() {
    let title, content;

    for (let i = 0; i < this.children.length; i++) {
      const el = this.children[i];

      if (el.classList.contains('title')) {
        el.classList.add('card__title');
        title = el;
      }
      else if (el.classList.contains('content')) {
        el.classList.add('card__content');
        content = el;
      }
    }

    autoStyle.prepare(this);
    this.classList.add(defaultClassName);
    ModifierUtil.initModifier(this, scheme);
  }

  static get observedAttributes() {
    return ['modifier', 'class'];
  }

  attributeChangedCallback(name, last, current) {
    switch (name) {
      case 'class':
        util.restoreClass(this, defaultClassName, scheme);
        break;
      case 'modifier':
        ModifierUtil.onModifierChanged(last, current, this, scheme);
        break;
    }
  }
}

onsElements.Card = CardElement;
customElements.define('ons-card', CardElement);
