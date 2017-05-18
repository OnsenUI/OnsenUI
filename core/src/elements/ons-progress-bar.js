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
import ModifierUtil from '../ons/internal/modifier-util';
import BaseElement from './base/base-element';
import contentReady from '../ons/content-ready';

const scheme = {
  '.progress-bar': 'progress-bar--*',
  '.progress-bar__primary': 'progress-bar--*__primary',
  '.progress-bar__secondary': 'progress-bar--*__secondary'
};

const template = util.createElement(`
  <div class="progress-bar">
    <div class="progress-bar__secondary"></div>
    <div class="progress-bar__primary"></div>
  </div>
`);

/**
 * @element ons-progress-bar
 * @category visual
 * @description
 *   [en]
 *     The component is used to display a linear progress bar. It can either display a progress bar that shows the user how much of a task has been completed. In the case where the percentage is not known it can be used to display an animated progress bar so the user can see that an operation is in progress.
 *   [/en]
 *   [ja][/ja]
 * @codepen zvQbGj
 * @tutorial vanilla/Reference/progress
 * @seealso ons-progress-circular
 *   [en]The `<ons-progress-circular>` component displays a circular progress indicator.[/en]
 *   [ja][/ja]
 * @example
 * <ons-progress-bar
 *  value="55"
 *  secondary-value="87">
 * </ons-progress-bar>
 *
 * <ons-progress-bar
 *  indeterminate>
 * </ons-progress-bar>
 */
export default class ProgressBarElement extends BaseElement {

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

  constructor() {
    super();

    contentReady(this, () => this._compile());
  }

  _compile() {
    if (!this._isCompiled()) {
      this._template = template.cloneNode(true);
    } else {
      this._template = util.findChild(this, '.progress-bar');
    }

    this._primary = util.findChild(this._template, '.progress-bar__primary');
    this._secondary = util.findChild(this._template, '.progress-bar__secondary');

    this._updateDeterminate();
    this._updateValue();

    this.appendChild(this._template);

    ModifierUtil.initModifier(this, scheme);
  }

  _isCompiled() {
    if (!util.findChild(this, '.progress-bar')) {
      return false;
    }

    const barElement = util.findChild(this, '.progress-bar');

    if (!util.findChild(barElement, '.progress-bar__secondary')) {
      return false;
    }

    if (!util.findChild(barElement, '.progress-bar__primary')) {
      return false;
    }

    return true;
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
      contentReady(this, () => {
        this._template.classList.add(`progress-bar--indeterminate`);
        this._template.classList.remove(`progress-bar--determinate`);
      });
    }
    else {
      contentReady(this, () => {
        this._template.classList.add(`progress-bar--determinate`);
        this._template.classList.remove(`progress-bar--indeterminate`);
      });
    }
  }

  _updateValue() {
    contentReady(this, () => {
      this._primary.style.width = (this.hasAttribute('value')) ? this.getAttribute('value') + '%' : '0%';
      this._secondary.style.width = this.hasAttribute('secondary-value') ? this.getAttribute('secondary-value') + '%' : '0%';
    });
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
}

customElements.define('ons-progress-bar', ProgressBarElement);
