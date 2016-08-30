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

const scheme = {
  '.progress-circular': 'progress-circular--*',
  '.progress-circular__primary': 'progress-circular__primary--*',
  '.progress-circular__secondary': 'progress-circular__secondary--*'
};

const template = util.createElement(`
  <svg class="progress-circular">
    <circle class="progress-circular__secondary" cx="50%" cy="50%" r="40%" fill="none" stroke-width="10%" stroke-miterlimit="10"/>
    <circle class="progress-circular__primary" cx="50%" cy="50%" r="40%" fill="none" stroke-width="10%" stroke-miterlimit="10"/>
  </svg>
`);

/**
 * @element ons-progress-circular
 * @category progress
 * @description
 *   [en]
 *     This component displays a circular progress indicator. It can either be used to show how much of a task has been completed or to show a looping animation to indicate that an operation is currently running.
 *   [/en]
 *   [ja][/ja]
 * @codepen EVzMjR
 * @tutorial vanilla/Reference/progress
 * @example
 * <ons-progress-circular
 *  value="55"
 *  secondary-value="87">
 * </ons-progress-circular>
 *
 * <ons-progress-circular
 *  indeterminate>
 * </ons-progress-circular>
 */
export default class ProgressCircularElement extends BaseElement {

  /**
   * @attribute modifier
   * @type {String}
   * @description
   *   [en]Change the appearance of the progress indicator.[/en]
   *   [ja]プログレスインジケータの見た目を変更します。[/ja]
   */

  /**
   * @attribute value
   * @type {Number}
   * @description
   *   [en]Current progress. Should be a value between 0 and 100.[/en]
   *   [ja]現在の進行状況の値を指定します。0から100の間の値を指定して下さい。[/ja]
   */

  /**
   * @attribute secondary-value
   * @type {Number}
   * @description
   *   [en]Current secondary progress. Should be a value between 0 and 100.[/en]
   *   [ja]現在の２番目の進行状況の値を指定します。0から100の間の値を指定して下さい。[/ja]
   */

  /**
   * @attribute indeterminate
   * @description
   *   [en]If this attribute is set, an infinite looping animation will be shown.[/en]
   *   [ja]この属性が設定された場合、ループするアニメーションが表示されます。[/ja]
   */

  init() {
    if (!this.hasAttribute('_compiled')) {
      this._compile();
    }
  }

  static get observedAttributes() {
    return ['modifier', 'value', 'secondary-value', 'indeterminate'];
  }

  attributeChangedCallback(name, last, current) {
    if (name === 'modifier') {
      return ModifierUtil.onModifierChanged(last, current, this, scheme);
    } else if (name === 'value' || name === 'secondary-value') {
      this._updateValue();
    } else if (name === 'indeterminate') {
      this._updateDeterminate();
    }
  }

  _updateDeterminate() {
    if (this.hasAttribute('indeterminate')) {
      this._template.classList.add(`progress-circular--indeterminate`);
      this._template.classList.remove(`progress-circular--determinate`);
    }
    else {
      this._template.classList.add(`progress-circular--determinate`);
      this._template.classList.remove(`progress-circular--indeterminate`);
    }
  }

  _updateValue() {
    if (this.hasAttribute('value')) {
      const per = Math.ceil(this.getAttribute('value') * 251.32 * 0.01);
      this._primary.style['stroke-dasharray'] = per + '%, 251.32%';
    }
    if (this.hasAttribute('secondary-value')) {
      const per =  Math.ceil(this.getAttribute('secondary-value') * 251.32 * 0.01);
      this._secondary.style['stroke-dasharray'] = per + '%, 251.32%';
    }
  }

  /**
   * @property value
   * @type {Number}
   * @description
   *   [en]Current progress. Should be a value between 0 and 100.[/en]
   *   [ja]現在の進行状況の値を指定します。0から100の間の値を指定して下さい。[/ja]
   */
  set value(value) {
    if (typeof value !== 'number' || value < 0 || value > 100) {
      throw new Error('Invalid value');
    }

    this.setAttribute('value', Math.floor(value));
  }

  get value() {
    return parseInt(this.getAttribute('value') || '0');
  }

  /**
   * @property secondaryValue
   * @type {Number}
   * @description
   *   [en]Current secondary progress. Should be a value between 0 and 100.[/en]
   *   [ja]現在の２番目の進行状況の値を指定します。0から100の間の値を指定して下さい。[/ja]
   */
  set secondaryValue(value) {
    if (typeof value !== 'number' || value < 0 || value > 100) {
      throw new Error('Invalid value');
    }

    this.setAttribute('secondary-value', Math.floor(value));
  }

  get secondaryValue() {
    return parseInt(this.getAttribute('secondary-value') || '0');
  }

  /**
   * @property indeterminate
   * @type {Boolean}
   * @description
   *   [en]If this property is `true`, an infinite looping animation will be shown.[/en]
   *   [ja]この属性が設定された場合、ループするアニメーションが表示されます。[/ja]
   */
  set indeterminate(value) {
    if (value) {
      this.setAttribute('indeterminate', '');
    }
    else {
      this.removeAttribute('indeterminate');
    }
  }

  get indeterminate() {
    return this.hasAttribute('indeterminate');
  }

  _compile() {
    this._template = template.cloneNode(true);

    this._primary = this._template.childNodes[3];
    this._secondary = this._template.childNodes[1];

    this._updateDeterminate();
    this._updateValue();

    this.appendChild(this._template);

    ModifierUtil.initModifier(this, scheme);

    this.setAttribute('_compiled', '');
  }
}

customElements.define('ons-progress-circular', ProgressCircularElement);
