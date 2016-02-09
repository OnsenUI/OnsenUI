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

import ModifierUtil from 'ons/internal/modifier-util';
import BaseElement from 'ons/base-element';

const scheme = {
  '.text-input': 'text-input--*',
  '.text-input__label': 'text-input--*__label',
  '.radio-button': 'radio-button--*',
  '.radio-button__input': 'radio-button--*__input',
  '.radio-button__checkmark': 'radio-button--*__checkmark',
  '.checkbox': 'checkbox--*',
  '.checkbox__input': 'checkbox--*__input',
  '.checkbox__checkmark': 'checkbox--*__checkmark'
};

const INPUT_ATTRIBUTES = [
  'autocapitalize',
  'autocomplete',
  'autocorrect',
  'autofocus',
  'checked',
  'disabled',
  'inputmode',
  'max',
  'maxlength',
  'min',
  'minlength',
  'name',
  'pattern',
  'placeholder',
  'readonly',
  'size',
  'step',
  'type',
  'validator',
  'value'
];

/**
 * @element ons-material-input
 * @category form
 * @description
 *  [en]Material Design input component.[/en]
 *  [ja]Material Designのinputコンポ―ネントです。[/ja]
 * @codepen ojQxLj
 * @guide UsingFormComponents
 *   [en]Using form components[/en]
 *   [ja]フォームを使う[/ja]
 * @guide EventHandling
 *   [en]Event handling descriptions[/en]
 *   [ja]イベント処理の使い方[/ja]
 * @example
 * <ons-material-input label="Username"></ons-material-input>
 */
class MaterialInputElement extends BaseElement {

  /**
   * @attribute label
   * @type {String}
   * @description
   *   [en]Text for animated floating label.[/en]
   *   [ja]アニメーションさせるフローティングラベルのテキストを指定します。[/ja]
   */

  /**
   * @attribute no-float
   * @description
   *  [en]If this attribute is present, the label will not be animated.[/en]
   *  [ja]この属性が設定された時、ラベルはアニメーションしないようになります。[/ja]
   */

  createdCallback() {
    if (!this.hasAttribute('_compiled')) {
      ons._prepareAutoStyling(this);
      this._compile();

      this.setAttribute('_compiled', '');
    }
  }

  _compile() {
    let helper = document.createElement('span');
    helper.classList.add('_helper');

    let inputContainer = document.createElement('span');
    inputContainer.appendChild(document.createElement('input'));
    inputContainer.appendChild(helper);

    let content = document.createElement('label');
    content.appendChild(inputContainer);

    let label = document.createElement('span');
    label.classList.add('input-label');

    ons._util.arrayFrom(this.childNodes).forEach(element => label.appendChild(element));
    this.hasAttribute('content-left') ? content.insertBefore(label, content.firstChild) : content.appendChild(label);

    this.appendChild(content);

    switch (this.getAttribute('type')) {
      case 'checkbox':
        this.classList.add('checkbox');
        this._input.classList.add('checkbox__input');
        this._helper.classList.add('checkbox__checkmark');
        this._updateBoundAttributes();
        break;

      case 'radio':
        this.classList.add('radio-button');
        this._input.classList.add('radio-button__input');
        this._helper.classList.add('radio-button__checkmark');
        this._updateBoundAttributes();
        break;

      default:
        this._input.classList.add('text-input');
        this._helper.classList.add('text-input__label');
        this._input.parentElement.classList.add('text-input__container');

        this._updateLabel();
        this._updateLabelColor();
        this._updateBoundAttributes();
        this._updateLabelClass();

        this._boundOnInput = this._onInput.bind(this);
        this._boundOnFocusin = this._onFocusin.bind(this);
        this._boundOnFocusout = this._onFocusout.bind(this);
        break;
    }

    this._boundDelegateEvent = this._delegateEvent.bind(this);

    if (this.id) {
      this._input.id = 'inner-' + this.id;
    }

    ModifierUtil.initModifier(this, scheme);
  }

  attributeChangedCallback(name, last, current) {
    if (name === 'modifier') {
      return ModifierUtil.onModifierChanged(last, current, this, scheme);
    }
    else if (name === 'placeholder') {
      return this._updateLabel();
    }
    else if (INPUT_ATTRIBUTES.indexOf(name) >= 0) {
      return this._updateBoundAttributes();
    }
  }

  attachedCallback() {
    if (this._input.type !== 'checkbox' && this._input.type !== 'radio') {
      this._input.addEventListener('input', this._boundOnInput);
      this._input.addEventListener('focusin', this._boundOnFocusin);
      this._input.addEventListener('focusout', this._boundOnFocusout);
    }

    this._input.addEventListener('focus', this._boundDelegateEvent);
    this._input.addEventListener('blur', this._boundDelegateEvent);
  }

  detachedCallback() {
    this._input.removeEventListener('input', this._boundOnInput);
    this._input.removeEventListener('focusin', this._boundOnFocusin);
    this._input.removeEventListener('focusout', this._boundOnFocusout);
    this._input.removeEventListener('focus', this._boundDelegateEvent);
    this._input.removeEventListener('blur', this._boundDelegateEvent);
  }

  _setLabel(value) {
    if (typeof this._helper.textContent !== 'undefined') {
      this._helper.textContent = value;
    }
    else {
      this._helper.innerText = value;
    }
  }

  _updateLabel() {
    this._setLabel(this.hasAttribute('placeholder') ? this.getAttribute('placeholder') : '');
  }

  _updateBoundAttributes() {
    INPUT_ATTRIBUTES.forEach((attr) => {
      if (this.hasAttribute(attr)) {
        this._input.setAttribute(attr, this.getAttribute(attr));
      }
      else {
        this._input.removeAttribute(attr);
      }
    });
  }

  _updateLabelColor() {
    if (this.value.length > 0 && this._input === document.activeElement) {
      this._helper.style.color = '';
    }
    else {
      this._helper.style.color = 'rgba(0, 0, 0, 0.5)';
    }
  }

  _updateLabelClass() {
    if (this.value === '') {
      this._helper.classList.remove('text-input__label--active');
    }
    else {
      this._helper.classList.add('text-input__label--active');
    }
  }

  _delegateEvent(event) {
    const e = new CustomEvent(event.type, {
      bubbles: false,
      cancelable: true
    });

    return this.dispatchEvent(e);
  }

  _onInput(event) {
    this._updateLabelClass();
    this._updateLabelColor();
  }

  _onFocusin(event) {
    this._updateLabelClass();
    this._updateLabelColor();
  }

  _onFocusout(event) {
    this._updateLabelColor();
  }

  get _input() {
    return this.querySelector('input');
  }

  get _helper() {
    return this.querySelector('._helper');
  }

  get value() {
    return this._input.value;
  }

  set value(val) {
    this._input.value = val;
    this._onInput();

    return this._input.val;
  }

  get checked() {
    return this._input.checked;
  }

  set checked(val) {
    this._input.checked = val;
  }
}

window.OnsInputElement = document.registerElement('ons-input', {
  prototype: MaterialInputElement.prototype
});
