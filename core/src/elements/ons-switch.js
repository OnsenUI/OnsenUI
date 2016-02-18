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

const scheme = {
  '': 'switch--*',
  '.switch__input': 'switch--*__input',
  '.switch__toggle': 'switch--*__toggle'
};

const templateSource = util.createElement(`
  <div>
    <input type="checkbox" class="switch__input">
    <div class="switch__toggle"></div>
  </div>
`);

let ExtendableLabelElement;
if (typeof HTMLLabelElement !== 'function') {
  // for Safari
  ExtendableLabelElement = () => {};
  ExtendableLabelElement.prototype = document.createElement('label');
} else {
  ExtendableLabelElement = HTMLLabelElement;
}

const generateId = (() => {
  let i = 0;
  return () => 'ons-switch-id-' + (i++);
})();

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
class SwitchElement extends ExtendableLabelElement {

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
    return this._getCheckbox().checked;
  }

  set checked(value) {
    this._getCheckbox().checked = value;
    if (this.checked) {
      this.setAttribute('checked', '');
    } else {
      this.removeAttribute('checked');
    }
    this._updateForCheckedAttribute();
  }

  get disabled() {
    return this._getCheckbox().disabled;
  }

  set disabled(value) {
    this._getCheckbox().disabled = value;
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
    return this._getCheckbox();
  }

  createdCallback() {
    if (!this.hasAttribute('_compiled')) {
      this._compile();
    }

    this._updateForCheckedAttribute();
    this._updateForDisabledAttribute();
  }

  _updateForCheckedAttribute() {
    if (this.hasAttribute('checked')) {
      this._getCheckbox().checked = true;
    } else {
      this._getCheckbox().checked = false;
    }
  }

  _updateForDisabledAttribute() {
    if (this.hasAttribute('disabled')) {
      this._getCheckbox().setAttribute('disabled', '');
    } else {
      this._getCheckbox().removeAttribute('disabled');
    }
  }

  _compile() {
    ons._autoStyle.prepare(this);

    this.classList.add('switch');
    const template = templateSource.cloneNode(true);
    while (template.children[0]) {
      this.appendChild(template.children[0]);
    }
    this._getCheckbox().setAttribute('name', generateId());

    ModifierUtil.initModifier(this, scheme);

    this.setAttribute('_compiled', '');
  }

  detachedCallback() {
    this._getCheckbox().removeEventListener('change', this._onChangeListener);
  }

  attachedCallback() {
    this._getCheckbox().addEventListener('change', this._onChangeListener);
  }

  _onChangeListener() {
    if (this.checked !== true) {
      this.removeAttribute('checked');
    } else {
      this.setAttribute('checked', '');
    }
  }

  /**
   * @return {Boolean}
   */
  _isChecked() {
    return this._getCheckbox().checked;
  }

  /**
   * @param {Boolean}
   */
  _setChecked(isChecked) {
    isChecked = !!isChecked;

    const checkbox = this._getCheckbox();

    if (checkbox.checked != isChecked) {
      checkbox.checked = isChecked;
    }
  }

  _getCheckbox() {
    return this.querySelector('input[type=checkbox]');
  }

  attributeChangedCallback(name, last, current) {
    if (name === 'modifier') {
      return ModifierUtil.onModifierChanged(last, current, this, scheme);
    } else if (name === 'checked') {
      this._updateForCheckedAttribute();
    } else if (name === 'disabled') {
      this._updateForDisabledAttribute();
    }
  }
}

window.OnsSwitchElement = document.registerElement('ons-switch', {
  prototype: SwitchElement.prototype
});
