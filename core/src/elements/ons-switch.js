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
 * @category form
 * @description
 *  [en]Switch component. Can display either an iOS flat switch or a Material Design switch.[/en]
 *  [ja]スイッチを表示するコンポーネントです。[/ja]
 * @codepen LpXZQQ
 * @guide UsingFormComponents
 *   [en]Using form components[/en]
 *   [ja]フォームを使う[/ja]
 * @guide EventHandling
 *   [en]Event handling descriptions[/en]
 *   [ja]イベント処理の使い方[/ja]
 * @seealso ons-button
 *   [en]ons-button component[/en]
 *   [ja]ons-buttonコンポーネント[/ja]
 * @example
 * <ons-switch checked></ons-switch>
 * <ons-switch modifier="material"></ons-switch>
 */

class SwitchElement extends BaseElement {

  /**
   * @event change
   * @description
   *   [en]Fired when the value is changed.[/en]
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
   *   [en]Whether the switch should be disabled.[/en]
   *   [ja]スイッチを無効の状態にする場合に指定します。[/ja]
   */

  /**
   * @attribute checked
   * @description
   *   [en]Whether the switch is checked.[/en]
   *   [ja]スイッチがONの状態にするときに指定します。[/ja]
   */

  get checked() {
    return this._checkbox.checked;
  }

  set checked(value) {
    if (!!value != this._checkbox.checked) {
      this._checkbox.click();
      this._checkbox.checked = !!value;
      if (this.checked) {
        this.setAttribute('checked', '');
      } else {
        this.removeAttribute('checked');
      }
    }
  }

  get disabled() {
    return this._checkbox.disabled;
  }

  set disabled(value) {
    this._checkbox.disabled = value;
    if (this.disabled) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  /**
   * @method isChecked
   * @signature isChecked()
   * @return {Boolean}
   *   [en]true if the switch is on.[/en]
   *   [ja]ONになっている場合にはtrueになります。[/ja]
   * @description
   *   [en]Returns true if the switch is ON.[/en]
   *   [ja]スイッチがONの場合にtrueを返します。[/ja]
   */
  isChecked() {
    return this.checked;
  }

  /**
   * @method setChecked
   * @signature setChecked(checked)
   * @param {Boolean} checked
   *   [en]If true the switch will be set to on.[/en]
   *   [ja]ONにしたい場合にはtrueを指定します。[/ja]
   * @description
   *   [en]Set the value of the switch. isChecked can be either true or false.[/en]
   *   [ja]スイッチの値を指定します。isCheckedにはtrueもしくはfalseを指定します。[/ja]
   */
  setChecked(isChecked) {
    this.checked = !!isChecked;
  }

  /**
   * @method getCheckboxElement
   * @signature getCheckboxElement()
   * @return {HTMLElement}
   *   [en]The underlying checkbox element.[/en]
   *   [ja]コンポーネント内部のcheckbox要素になります。[/ja]
   * @description
   *   [en]Get inner input[type=checkbox] element.[/en]
   *   [ja]スイッチが内包する、input[type=checkbox]の要素を取得します。[/ja]
   */
  getCheckboxElement() {
    return this._checkbox;
  }

  createdCallback() {
    if (!this.hasAttribute('_compiled')) {
      this._compile();
    }
    this._checkbox = this.querySelector('input[type=checkbox]');
    this._handle = this.querySelector('.switch__handle');

    ['checked', 'disabled', 'modifier', 'name'].forEach(e => {
      this.attributeChangedCallback(e, null, this.getAttribute(e));
    });
  }

  _compile() {
    this.classList.add('switch');
    this.appendChild(template.cloneNode(true));
    this.setAttribute('_compiled', '');
  }

  detachedCallback() {
    this._checkbox.removeEventListener('change', this._onChange);
    this.removeEventListener('dragstart', this._onDragStart);
    this.removeEventListener('hold', this._onHold);
    this.removeEventListener('tap', this.click);
    this._gestureDetector.dispose();
  }

  attachedCallback() {
    this._checkbox.addEventListener('change', this._onChange);
    this._gestureDetector = new GestureDetector(this, {dragMinDistance: 1, holdTimeout: 251});
    this.addEventListener('dragstart', this._onDragStart);
    this.addEventListener('hold', this._onHold);
    this.addEventListener('tap', this.click);
    this._boundOnRelease = this._onRelease.bind(this);
  }

  _onChange() {
    if (this.checked) {
      this.parentNode.setAttribute('checked', '');
    } else {
      this.parentNode.removeAttribute('checked');
    }
  }

  click() {
    if (!this.disabled) {
      this.checked = !this.checked;
    }
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
    this.classList.add('switch--active');
    this._startX = this._locations[this.checked ? 1 : 0];// - e.gesture.deltaX;

    this.addEventListener('drag', this._onDrag);
    document.addEventListener('release', this._boundOnRelease);
  }

  _onDrag(e) {
    e.gesture.srcEvent.preventDefault();
    var l = this._locations;
    var position = Math.min(l[1], Math.max(l[0], this._startX + e.gesture.deltaX));
    this._handle.style.left = position + 'px';
    this.checked = position >= (l[0] + l[1]) / 2;
  };

  _onRelease(e) {
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
    case 'checked':   // eslint-disable-line no-fallthrough
      this._checkbox.checked = current !== null;
    case 'disabled':
      if (current !== null) {
        this._checkbox.setAttribute(name, '');
      } else {
        this._checkbox.removeAttribute(name);
      }
    }
  }
}

window.OnsSwitchElement = document.registerElement('ons-switch', {
  prototype: SwitchElement.prototype
});
