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
import autoStyle from 'ons/autostyle';
import ModifierUtil from 'ons/internal/modifier-util';
import BaseElement from 'ons/base-element';
import GestureDetector from 'ons/gesture-detector';

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
 * @category switch
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
 * @guide UsingFormComponents
 *   [en]Using form components[/en]
 *   [ja]フォームを使う[/ja]
 * @guide EventHandling
 *   [en]Event handling descriptions[/en]
 *   [ja]イベント処理の使い方[/ja]
 * @example
 * <ons-switch checked></ons-switch>
 * <ons-switch disabled></ons-switch>
 * <ons-switch modifier="material"></ons-switch>
 */

class SwitchElement extends BaseElement {

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
   *  [en]Specify the `id` attribute of the inner `<input>` element. This is useful when using `<label for="...">` elements.[/en]
   *  [ja][/ja]
   */

  /**
   * @property checked
   * @type {Boolean}
   * @description
   *   [en]This value is `true` if the switch is checked.[/en]
   *   [ja]スイッチがONの場合に`true`。[/ja]
   */

  get checked() {
    return this._checkbox.checked;
  }

  set checked(value) {
    if (!!value !== this._checkbox.checked) {
      this._checkbox.click();
      this._checkbox.checked = !!value;
      return util.toggleAttribute(this, 'checked', this.checked);
    }
  }

  /**
   * @property disabled
   * @type {Boolean}
   * @description
   *   [en]Whether the element is disabled or not.[/en]
   *   [ja]無効化されている場合に`true`。[/ja]
   */
  get disabled() {
    return this._checkbox.disabled;
  }

  set disabled(value) {
    this._checkbox.disabled = value;
    return util.toggleAttribute(this, 'disabled', this.disabled);
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

  createdCallback() {
    if (!this.hasAttribute('_compiled')) {
      this._compile();
    }

    this._checkbox = this.querySelector('.switch__input');
    this._handle = this.querySelector('.switch__handle');

    ['checked', 'disabled', 'modifier', 'name', 'input-id'].forEach(e => {
      this.attributeChangedCallback(e, null, this.getAttribute(e));
    });
  }

  _compile() {
    autoStyle.prepare(this);

    this.classList.add('switch');

    this.appendChild(template.cloneNode(true));

    this.setAttribute('_compiled', '');
  }

  detachedCallback() {
    this._checkbox.removeEventListener('change', this._onChange);
    this.removeEventListener('dragstart', this._onDragStart);
    this.removeEventListener('hold', this._onHold);
    this.removeEventListener('tap', this.click);
    this.removeEventListener('click', this._onClick);
    this._gestureDetector.dispose();
  }

  attachedCallback() {
    this._checkbox.addEventListener('change', this._onChange);
    this._gestureDetector = new GestureDetector(this, {dragMinDistance: 1, holdTimeout: 251});
    this.addEventListener('dragstart', this._onDragStart);
    this.addEventListener('hold', this._onHold);
    this.addEventListener('tap', this.click);
    this._boundOnRelease = this._onRelease.bind(this);
    this.addEventListener('click', this._onClick);
  }

  _onChange() {
    if (this.checked) {
      this.parentNode.setAttribute('checked', '');
    } else {
      this.parentNode.removeAttribute('checked');
    }
  }

  _onClick(ev) {
    if (ev.target.classList.contains('switch__touch')) {
      ev.preventDefault();
    }
  }

  click() {
    if (!this.disabled) {
      this.checked = !this.checked;
    }
  }

  _getPosition(e) {
    const l = this._locations;
    return Math.min(l[1], Math.max(l[0], this._startX + e.gesture.deltaX));
  }

  _onHold(e) {
    if (!this.disabled) {
      this.classList.add('switch--active');
      document.addEventListener('release', this._boundOnRelease);
    }
  }

  _onDragStart(e) {
    if (this.disabled || ['left', 'right'].indexOf(e.gesture.direction) === -1) {
      this.classList.remove('switch--active');
      return;
    }

    e.stopPropagation();

    this.classList.add('switch--active');
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

    this.checked = position >= (l[0] + l[1]) / 2;

    this.removeEventListener('drag', this._onDrag);
    document.removeEventListener('release', this._boundOnRelease);

    this._handle.style.left = '';
    this.classList.remove('switch--active');
  }

  attributeChangedCallback(name, last, current) {
    switch(name) {
      case 'modifier':
        this._isMaterial = (current || '').indexOf('material') !== -1;
        this._locations = locations[this._isMaterial ? 'material' : 'ios'];
        ModifierUtil.onModifierChanged(last, current, this, scheme);
        break;
      case 'input-id':
        this._checkbox.id = current;
        break;
      case 'checked':
        this._checkbox.checked = current !== null;
        util.toggleAttribute(this._checkbox, name, current !== null);
        break;
      case 'disabled':
        util.toggleAttribute(this._checkbox, name, current !== null);
    }
  }
}

window.OnsSwitchElement = document.registerElement('ons-switch', {
  prototype: SwitchElement.prototype
});
