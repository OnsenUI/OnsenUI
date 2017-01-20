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
import BaseElement from '../ons/base-element';
import contentReady from '../ons/content-ready';

const scheme = {
  '': 'select-*',
  '.select-input': 'select-input--*'
};

const defaultClassName = 'select';

const INPUT_ATTRIBUTES = [
  'autofocus',
  'disabled',
  'form',
  'multiple',
  'name',
  'required',
  'size'
];

/**
 * @element ons-select
 * @category form
 * @modifier material
 *  [en]Displays a Material Design select input.[/en]
 *  [ja][/ja]
 * @modifier underbar
 *  [en]Displays a horizontal line underneath a select input.[/en]
 *  [ja][/ja]
 * @description
 *   [en]
 *     Select component. If you want to place a select on a page, use `<ons-select>`.
 *
 *     The component will automatically display as a Material Design select on Android.
 *   [/en]
 *   [ja]ボタン用コンポーネント。ツールバーにボタンを設置する場合は、コンポーネントを使用します。[/ja]
 * @codepen hLayx
 * @tutorial vanilla/Reference/select
 * @guide Select [en]Guide for `<ons-select>`[/en][ja]<ons-select>の使い方[/ja]
 * @guide using-modifier [en]More details about the `modifier` attribute[/en][ja]modifier属性の使い方[/ja]
 * @guide cross-platform-styling [en]Information about cross platform styling[/en][ja]Information about cross platform styling[/ja]
 * @example
 * <ons-select>
 *   <option value="1">1</option>
 *   <option value="2">2nd</option>
 *   <option value="3">3rd option</option>
 * </ons-select>
 */

export default class SelectElement extends BaseElement {

  /**
   * @attribute multiple
   * @description
   *  [en]If this attribute is defined, multiple options can be selected at once.[/en]
   *  [ja][/ja]
   */

  /**
   * @attribute disabled
   * @description
   *   [en]Specify if select input should be disabled.[/en]
   *   [ja]ボタンを無効化する場合は指定します。[/ja]
   */

  init() {
    contentReady(this, () => {
      this._compile();
    });
  }

  static get observedAttributes() {
    return ['modifier', 'class', ...INPUT_ATTRIBUTES];
  }

  attributeChangedCallback(name, last, current) {
    switch (name) {
      case 'class':
        if (!this.classList.contains(defaultClassName)) {
          this.className = defaultClassName + ' ' + current;
        }
        break;
      case 'modifier':
        ModifierUtil.onModifierChanged(last, current, this, scheme);
        break;
    }

    if (INPUT_ATTRIBUTES.indexOf(name) >= 0) {
      contentReady(this, () => this._updateBoundAttributes());
    }
  }

  _updateBoundAttributes() {
    INPUT_ATTRIBUTES.forEach((attr) => {
      if (this.hasAttribute(attr)) {
        this._select.setAttribute(attr, this.getAttribute(attr));
      }
      else {
        this._select.removeAttribute(attr);
      }
    });
  }

  get _select() {
    return this.querySelector('select');
  }

  _compile() {
    autoStyle.prepare(this);

    this.classList.add(defaultClassName);
    const sel = document.createElement('select');
    sel.classList.add('select-input');
    util.arrayFrom(this.childNodes).forEach(element => sel.appendChild(element));
    this.appendChild(sel);

    ModifierUtil.initModifier(this, scheme);

    const self = this;
    ['disabled', 'length', 'multiple', 'name', 'options', 'selectedIndex', 'size', 'value'].forEach(function (key, index, arr) {
      self.__defineGetter__(key, function () {
        return self._select[key];
      });
      self.__defineSetter__(key, function (value) {
        self._select[key] = value;
      });
    });
    this.__defineGetter__('form', function () {
      return self._select['form'];
    })
    this.__defineGetter__('type', function () {
      return self._select['type'];
    })
    this.add = function (option, index = null) {
      self._select.add(option, index);
    }
    this.remove = function (index) {
      self._select.remove(index);
    }
  }
}

customElements.define('ons-select', SelectElement);
