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
import GestureDetector from '../ons/gesture-detector';

const defaultClassName = 'switch';

const scheme = {
  '': 'switch--*',
  '.switch__input': 'switch--*__input',
  '.switch__handle': 'switch--*__handle',
  '.switch__toggle': 'switch--*__toggle'
};

const template = util.createFragment(`
  <input type="checkbox" class="switch__input">
  <div class="switch__toggle">
    <div class="switch__handle">
      <div class="switch__touch"></div>
    </div>
  </div>
`);

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

export default class SwitchElement extends BaseElement {

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

  get checked() {
    return this._checked;
  }

  set checked(value) {
    this._checked = !!value;
    util.toggleAttribute(this, 'checked', this._checked);
  }

  /**
   * @property disabled
   * @type {Boolean}
   * @description
   *   [en]Whether the element is disabled or not.[/en]
   *   [ja]無効化されている場合に`true`。[/ja]
   */
  get disabled() {
    return this._disabled;
  }

  set disabled(value) {
    contentReady(this, () => {
      this._disabled = !!value;
      util.toggleAttribute(this, 'disabled', this._disabled);
      this._checkbox.disabled = this._disabled;
    });
  }

  /**
   * @property checkbox
   * @readonly
   * @type {HTMLElement}
   * @description
   *   [en]The underlying checkbox element.[/en]
   *   [ja]コンポーネント内部のcheckbox要素になります。[/ja]
   */
  get checkbox() {
    return this._checkbox;
  }

  constructor() {
    super();

    this._checked = false;
    this._disabled = false;

    this._boundOnChange = this._onChange.bind(this);

    contentReady(this, () => {
      this._compile();
      ['checked', 'disabled', 'modifier', 'name', 'value', 'input-id'].forEach(e => {
        this.attributeChangedCallback(e, null, this.getAttribute(e));
      });
    });
  }

  _compile() {
    autoStyle.prepare(this);

    this.classList.add(defaultClassName);

    if (!(util.findChild(this, '.switch__input') && util.findChild(this, '.switch__toggle'))) {
      this.appendChild(template.cloneNode(true));
    }

    ModifierUtil.initModifier(this, scheme);

    this._checkbox = this.querySelector('.switch__input');
    this._handle = this.querySelector('.switch__handle');

    this._checkbox.checked = this._checked;
    this._checkbox.disabled = this._disabled;
  }

  disconnectedCallback() {
    contentReady(this, () => {
      this._checkbox.removeEventListener('change', this._boundOnChange);
      this.removeEventListener('dragstart', this._onDragStart);
      this.removeEventListener('hold', this._onHold);
      this.removeEventListener('tap', this.click);
      this.removeEventListener('click', this._onClick);
      if (this._gestureDetector) {
        this._gestureDetector.dispose();
      }
    });
  }

  connectedCallback() {
    contentReady(this, () => {
      this._checkbox.addEventListener('change', this._boundOnChange);
      this.addEventListener('dragstart', this._onDragStart);
      this.addEventListener('hold', this._onHold);
      this.addEventListener('tap', this.click);
      this.addEventListener('click', this._onClick);
      this._gestureDetector = new GestureDetector(this, {dragMinDistance: 1, holdTimeout: 251});
      this._boundOnRelease = this._onRelease.bind(this);
    });
  }

  _onChange(event) {
    if (event && event.stopPropagation) {
      event.stopPropagation();
    }
    this.click();
  }

  _onClick(ev) {
    if (ev.target.classList.contains('switch__touch')) {
      ev.preventDefault();
    }
  }

  click() {
    if (!this._disabled) {
      this.checked = !this.checked;

      util.triggerElementEvent(this, 'change', {
        value: this.checked,
        switch: this,
        isInteractive: true
      });
    }
  }

  _getPosition(e) {
    const l = this._locations;
    return Math.min(l[1], Math.max(l[0], this._startX + e.gesture.deltaX));
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
      util.triggerElementEvent(this, 'change', {
        value: this.checked,
        switch: this,
        isInteractive: true
      });
    }

    this.removeEventListener('drag', this._onDrag);
    document.removeEventListener('release', this._boundOnRelease);

    this._handle.style.left = '';
    ModifierUtil.removeModifier(this, 'active');
  }

  static get observedAttributes() {
    return ['modifier', 'input-id', 'checked', 'value', 'disabled', 'class'];
  }

  static get events() {
    return ['change'];
  }

  /**
   * @property value
   * @type {String}
   * @description
   *   [en]The current value of the input.[/en]
   *   [ja][/ja]
   */
  get value() {
    return !this.hasOwnProperty('_checkbox')
      ? this.getAttribute('value')
      : this._checkbox.value;
  }

  set value(val) {
    contentReady(this, () => {
      this._checkbox.value = val;
    });
  }

  attributeChangedCallback(name, last, current) {
    contentReady(this, () => {
      switch(name) {
        case 'class':
          if (!this.classList.contains(defaultClassName)) {
            this.className = defaultClassName + ' ' + current;
          }
          break;

        case 'modifier':
          this._isMaterial = (current || '').indexOf('material') !== -1;
          this._locations = locations[this._isMaterial ? 'material' : 'ios'];
          ModifierUtil.onModifierChanged(last, current, this, scheme);
          break;

        case 'input-id':
          this._checkbox.id = current;
          break;

        case 'checked':
          this._checked = current !== null;
          this._checkbox.checked = current !== null;
          util.toggleAttribute(this._checkbox, name, current !== null);
          break;

        case 'disabled':
          this._disabled = current !== null;
          this._checkbox.disabled = current !== null;
          util.toggleAttribute(this._checkbox, name, current !== null);
          break;

        default:
          if (current !== null) {
            this._checkbox.setAttribute(name, current);
          } else {
            this._checkbox.removeAttribute(name);
          }
      }
    });
  }
}

customElements.define('ons-switch', SwitchElement);
