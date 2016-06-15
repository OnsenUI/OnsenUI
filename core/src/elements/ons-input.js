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
import contentReady from 'ons/content-ready';

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
 * @element ons-input
 * @category input
 * @modifier material
 *  [en]Displays a Material Design input.[/en]
 *  [ja][/ja]
 * @modifier underbar
 *  [en]Displays a horizontal line underneath a text input.[/en]
 *  [ja][/ja]
 * @description
 *  [en]
 *    An input element. The `type` attribute can be used to change the input type. All text input types as well as `checkbox` and `radio` are supported.
 *
 *    The component will automatically render as a Material Design input on Android devices.
 *
 *    Most attributes that can be used for a normal `<input>` element can also be used on the `<ons-input>` element.
 *  [/en]
 *  [ja][/ja]
 * @codepen ojQxLj
 * @tutorial vanilla/Reference/input
 * @seealso ons-range
 *   [en]The `<ons-range>` element is used to display a range slider.[/en]
 *   [ja][/ja]
 * @seealso ons-switch
 *   [en]The `<ons-switch>` element is used to display a draggable toggle switch.[/en]
 *   [ja][/ja]
 * @guide UsingFormComponents
 *   [en]Using form components[/en]
 *   [ja]フォームを使う[/ja]
 * @guide EventHandling
 *   [en]Event handling descriptions[/en]
 *   [ja]イベント処理の使い方[/ja]
 * @example
 * <ons-input placeholder="Username" float></ons-input>
 * <ons-input type="checkbox" checked></ons-input>
 */
class InputElement extends BaseElement {

  /**
   * @attribute placeholder
   * @type {String}
   * @description
   *   [en]Placeholder text. In Material Design, this placeholder will be a floating label.[/en]
   *   [ja][/ja]
   */

  /**
   * @attribute float
   * @description
   *  [en]If this attribute is present, the placeholder will be animated in Material Design.[/en]
   *  [ja]この属性が設定された時、ラベルはアニメーションするようになります。[/ja]
   */

  /**
   * @attribute type
   * @type {String}
   * @description
   *  [en]
   *    Specify the input type. This is the same as the "type" attribute for normal inputs. However, for "range" you should instead use <ons-range> element.
   *
   *    Please take a look at [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-type) for an exhaustive list of possible values. Depending on the platform and browser version some of these might not work.
   *  [/en]
   *  [ja][/ja]
   */

  /**
   * @attribute input-id
   * @type {String}
   * @description
   *  [en]Specify the "id" attribute of the inner `<input>` element. This is useful when using <label for="..."> elements.[/en]
   *  [ja][/ja]
   */

  /**
   * @attribute content-left
   * @description
   *  [en]The HTML content of `<ons-input>` is placed before the actual input as a label. Omit this to display it after the input.[/en]
   *  [ja][/ja]
   */

  createdCallback() {
    contentReady(this, () => {
      this._compile();
      this.attributeChangedCallback('checked', null, this.getAttribute('checked'));
    });

    this._boundOnInput = this._onInput.bind(this);
    this._boundOnFocusin = this._onFocusin.bind(this);
    this._boundOnFocusout = this._onFocusout.bind(this);
    this._boundDelegateEvent = this._delegateEvent.bind(this);
  }

  _compile() {
    autoStyle.prepare(this);

    if (this.children.length !== 0) {
      return;
    }

    const helper = document.createElement('span');
    helper.classList.add('_helper');

    const container = document.createElement('label');
    container.appendChild(document.createElement('input'));
    container.appendChild(helper);

    const label = document.createElement('span');
    label.classList.add('input-label');

    util.arrayFrom(this.childNodes).forEach(element => label.appendChild(element));
    this.hasAttribute('content-left') ? container.insertBefore(label, container.firstChild) : container.appendChild(label);

    this.appendChild(container);

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
        break;
    }

    if (this.hasAttribute('input-id')) {
      this._input.id = this.getAttribute('input-id');
    }

    ModifierUtil.initModifier(this, scheme);
  }

  attributeChangedCallback(name, last, current) {
    if (name === 'modifier') {
      return contentReady(this, () => ModifierUtil.onModifierChanged(last, current, this, scheme));
    } else if (name === 'placeholder') {
      return contentReady(this, () => this._updateLabel());
    } if (name === 'input-id') {
      contentReady(this, () => this._input.id = current);
    } if (name === 'checked') {
      this.checked = current !== null;
    }
    else if (INPUT_ATTRIBUTES.indexOf(name) >= 0) {
      return contentReady(this, () => this._updateBoundAttributes());
    }
  }

  attachedCallback() {
    contentReady(this, () => {
      if (this._input.type !== 'checkbox' && this._input.type !== 'radio') {
        this._input.addEventListener('input', this._boundOnInput);
        this._input.addEventListener('focusin', this._boundOnFocusin);
        this._input.addEventListener('focusout', this._boundOnFocusout);
      }

      this._input.addEventListener('focus', this._boundDelegateEvent);
      this._input.addEventListener('blur', this._boundDelegateEvent);
    });
  }

  detachedCallback() {
    contentReady(this, () => {
      this._input.removeEventListener('input', this._boundOnInput);
      this._input.removeEventListener('focusin', this._boundOnFocusin);
      this._input.removeEventListener('focusout', this._boundOnFocusout);
      this._input.removeEventListener('focus', this._boundDelegateEvent);
      this._input.removeEventListener('blur', this._boundDelegateEvent);
    });
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
    else if (['checkbox', 'radio'].indexOf(this.getAttribute('type')) === -1){
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

  /**
   * @property value
   * @type {String}
   * @description
   *   [en]The current value of the input.[/en]
   *   [ja][/ja]
   */
  get value() {
    return this._input === null
      ? this.getAttribute('value')
      : this._input.value;
  }

  set value(val) {
    this.setAttribute('value', val);

    contentReady(this, () => {
      this._input.value = val;
      this._onInput();
    });

    return val;
  }

  /**
   * @property checked
   * @type {Boolean}
   * @description
   *   [en]Whether the input is checked or not. Only works for `radio` and `checkbox` type inputs.[/en]
   *   [ja][/ja]
   */
  get checked() {
    return this._input.checked;
  }

  set checked(val) {
    contentReady(this, () => {
      this._input.checked = val;
    });
  }

  /**
   * @property disabled
   * @type {Boolean}
   * @description
   *   [en]Whether the input is disabled or not.[/en]
   *   [ja]無効化されている場合に`true`。[/ja]
   */
  set disabled(value) {
    return util.toggleAttribute(this, 'disabled', value);
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  get _isTextInput() {
    return this.type !== 'radio' && this.type !== 'checkbox';
  }

  get type() {
    return this.getAttribute('type');
  }
}

window.OnsInputElement = document.registerElement('ons-input', {
  prototype: InputElement.prototype
});
