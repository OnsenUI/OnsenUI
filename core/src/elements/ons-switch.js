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
import BaseCheckboxElement from './base/base-checkbox';
import contentReady from '../ons/content-ready';
import GestureDetector from '../ons/gesture-detector';

const scheme = {
  '': 'switch--*',
  '.switch__input': 'switch--*__input',
  '.switch__handle': 'switch--*__handle',
  '.switch__toggle': 'switch--*__toggle'
};

const locations = {
  ios: [1, 21],
  material: [0, 16]
};

/**
 * @element ons-switch
 * @category form
 * @description
 *   [en]
 *     Switch component. The switch can be toggled both by dragging and tapping.
 *
 *     Will automatically displays a Material Design switch on Android devices.
 *   [/en]
 *   [ja]スイッチを表示するコンポーネントです。[/ja]
 * @modifier material
 *   [en]Material Design switch[/en]
 *   [ja][/ja]
 * @codepen LpXZQQ
 * @tutorial vanilla/Reference/switch
 * @guide adding-page-content
 *   [en]Using form components[/en]
 *   [ja]フォームを使う[/ja]
 * @guide using-modifier [en]More details about the `modifier` attribute[/en][ja]modifier属性の使い方[/ja]
 * @example
 * <ons-switch checked></ons-switch>
 * <ons-switch disabled></ons-switch>
 * <ons-switch modifier="material"></ons-switch>
 */

export default class SwitchElement extends BaseCheckboxElement {

  constructor() {
    super();

    contentReady(this, () => {
      this.attributeChangedCallback('modifier', null, this.getAttribute('modifier'));
    });

    this._boundOnChange = this._onChange.bind(this);
    this._boundOnRelease = this._onRelease.bind(this);
  }

  get _scheme() {
    return scheme;
  }

  get _defaultElementClass() {
    return 'switch';
  }

  get _template() {
    return `
      <input type="${this.type}" class="${this._defaultElementClass}__input">
      <div class="${this._defaultElementClass}__toggle">
        <div class="${this._defaultElementClass}__handle">
          <div class="${this._defaultElementClass}__touch"></div>
        </div>
      </div>
    `;
  }

  get type() {
    return 'checkbox';
  }

  /* Own props */

  _getPosition(e) {
    const l = this._locations;
    return Math.min(l[1], Math.max(l[0], this._startX + e.gesture.deltaX));
  }

  _emitChangeEvent() {
    util.triggerElementEvent(this, 'change', {
      value: this.checked,
      switch: this,
      isInteractive: true
    });
  }

  _onChange(event) {
    if (event && event.stopPropagation) {
      event.stopPropagation();
    }

    this._emitChangeEvent();
  }

  _onClick(ev) {
    if (ev.target.classList.contains(`${this.defaultElementClass}__touch`)) {
      ev.preventDefault();
    }
  }

  _onHold(e) {
    if (!this.disabled) {
      ModifierUtil.addModifier(this, 'active');
      document.addEventListener('release', this._boundOnRelease);
    }
  }

  _onDragStart(e) {
    if (this.disabled || ['left', 'right'].indexOf(e.gesture.direction) === -1) {
      ModifierUtil.removeModifier(this, 'active');
      return;
    }

    e.stopPropagation();

    ModifierUtil.addModifier(this, 'active');
    this._startX = this._locations[this.checked ? 1 : 0];// - e.gesture.deltaX;

    this.addEventListener('drag', this._onDrag);
    document.addEventListener('release', this._boundOnRelease);
  }

  _onDrag(e) {
    e.gesture.srcEvent.preventDefault();
    this._handle.style.left = this._getPosition(e) + 'px';
  }

  _onRelease(e) {
    const l = this._locations;
    const position = this._getPosition(e);
    const previousValue = this.checked;

    this.checked = position >= (l[0] + l[1]) / 2;

    if (this.checked !== previousValue) {
      this._emitChangeEvent();
    }

    this.removeEventListener('drag', this._onDrag);
    document.removeEventListener('release', this._boundOnRelease);

    this._handle.style.left = '';
    ModifierUtil.removeModifier(this, 'active');
  }

  click() {
    if (!this.disabled) {
      this.checked = !this.checked;
      this._emitChangeEvent();
    }
  }

  get _handle() {
    return this.querySelector(`.${this._defaultElementClass}__handle`);
  }

  get checkbox() {
    return this._input;
  }

  connectedCallback() {
    contentReady(this, () => {
      this._input.addEventListener('change', this._boundOnChange);
    });

    this.addEventListener('dragstart', this._onDragStart);
    this.addEventListener('hold', this._onHold);
    this.addEventListener('tap', this.click);
    this.addEventListener('click', this._onClick);
    this._gestureDetector = new GestureDetector(this, {dragMinDistance: 1, holdTimeout: 251});
  }

  disconnectedCallback() {
    contentReady(this, () => {
      this._input.removeEventListener('change', this._boundOnChange);
    });

    this.removeEventListener('dragstart', this._onDragStart);
    this.removeEventListener('hold', this._onHold);
    this.removeEventListener('tap', this.click);
    this.removeEventListener('click', this._onClick);
    if (this._gestureDetector) {
      this._gestureDetector.dispose();
    }
  }

  static get observedAttributes() {
    return [...super.observedAttributes, 'modifier'];
  }

  attributeChangedCallback(name, last, current) {
    if (name === 'modifier') {
      const md = (current || '').indexOf('material') !== -1;
      this._locations = locations[md ? 'material' : 'ios'];
    }

    super.attributeChangedCallback(name, last, current);
  }

  /**
   * @event change
   * @description
   *   [en]Fired when the switch is toggled.[/en]
   *   [ja]ON/OFFが変わった時に発火します。[/ja]
   * @param {Object} event
   *   [en]Event object.[/en]
   *   [ja]イベントオブジェクト。[/ja]
   * @param {Object} event.switch
   *   [en]Switch object.[/en]
   *   [ja]イベントが発火したSwitchオブジェクトを返します。[/ja]
   * @param {Boolean} event.value
   *   [en]Current value.[/en]
   *   [ja]現在の値を返します。[/ja]
   * @param {Boolean} event.isInteractive
   *   [en]True if the change was triggered by the user clicking on the switch.[/en]
   *   [ja]タップやクリックなどのユーザの操作によって変わった場合にはtrueを返します。[/ja]
   */

  /**
   * @attribute modifier
   * @type {String}
   * @description
   *  [en]The appearance of the switch.[/en]
   *  [ja]スイッチの表現を指定します。[/ja]
   */

  /**
   * @attribute disabled
   * @description
   *   [en]Whether the switch is be disabled.[/en]
   *   [ja]スイッチを無効の状態にする場合に指定します。[/ja]
   */

  /**
   * @attribute checked
   * @description
   *   [en]Whether the switch is checked.[/en]
   *   [ja]スイッチがONの状態にするときに指定します。[/ja]
   */

  /**
   * @attribute input-id
   * @type {String}
   * @description
   *   [en]Specify the `id` attribute of the inner `<input>` element. This is useful when using `<label for="...">` elements.[/en]
   *   [ja][/ja]
   */

  /**
   * @property checked
   * @type {Boolean}
   * @description
   *   [en]This value is `true` if the switch is checked.[/en]
   *   [ja]スイッチがONの場合に`true`。[/ja]
   */

  /**
   * @property value
   * @type {String}
   * @description
   *   [en]The current value of the input.[/en]
   *   [ja][/ja]
   */

  /**
   * @property disabled
   * @type {Boolean}
   * @description
   *   [en]Whether the element is disabled or not.[/en]
   *   [ja]無効化されている場合に`true`。[/ja]
   */

  /**
   * @property checkbox
   * @readonly
   * @type {HTMLElement}
   * @description
   *   [en]The underlying checkbox element.[/en]
   *   [ja]コンポーネント内部のcheckbox要素になります。[/ja]
   */

}

customElements.define('ons-switch', SwitchElement);
