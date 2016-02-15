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
 *   [en]A material design progress component. It's displayed as a circular progress indicator.[/en]
 *   [ja]マテリアルデザインのprogressコンポーネントです。circularなプログレスインジケータを表示します。[/ja]
 * @codepen EVzMjR
 * @example
 * <ons-progress-circular
 *  value="55"
 *  secondary-value="87">
 * </ons-progress-circular>
 */
class ProgressCircularElement extends BaseElement {

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

  createdCallback() {
    if (!this.hasAttribute('_compiled')) {
      this._compile();
      ModifierUtil.initModifier(this, scheme);

      this.setAttribute('_compiled', '');
    }
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
      let per = Math.ceil(this.getAttribute('value') * 251.32 * 0.01);
      this._primary.style['stroke-dasharray'] = per + '%, 251.32%';
    }
    if (this.hasAttribute('secondary-value')) {
      let per =  Math.ceil(this.getAttribute('secondary-value') * 251.32 * 0.01);
      this._secondary.style['stroke-dasharray'] = per + '%, 251.32%';
    }
  }

  _compile() {
    this._template = template.cloneNode(true);

    this._primary = this._template.childNodes[3];
    this._secondary = this._template.childNodes[1];

    this._updateDeterminate();
    this._updateValue();

    this.appendChild(this._template);
  }
}

window.OnsProgressCircularElement = document.registerElement('ons-progress-circular', {
  prototype: ProgressCircularElement.prototype
});
