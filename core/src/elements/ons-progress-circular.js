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

const scheme = {
  '.progress-circular': 'progress-circular--*',
  '.progress-circular__background': 'progress-circular--*__background',
  '.progress-circular__primary': 'progress-circular--*__primary',
  '.progress-circular__secondary': 'progress-circular--*__secondary'
};

const template = util.createElement(`
  <svg class="progress-circular">
    <circle class="progress-circular__background" />
    <circle class="progress-circular__secondary" />
    <circle class="progress-circular__primary" />
  </svg>
`);

/**
 * @element ons-progress-circular
 * @category visual
 * @description
 *   [en]
 *     This component displays a circular progress indicator. It can either be used to show how much of a task has been completed or to show a looping animation to indicate that an operation is currently running.
 *   [/en]
 *   [ja][/ja]
 * @codepen EVzMjR
 * @tutorial vanilla/Reference/progress
 * @seealso ons-progress-bar
 *   [en]The `<ons-progress-bar>` component displays a bar progress indicator.[/en]
 *   [ja][/ja]
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

  constructor() {
    super();

    contentReady(this, () => this._compile());
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
        ModifierUtil.addModifier(this, 'indeterminate');
      });
    }
    else {
      contentReady(this, () => {
        ModifierUtil.removeModifier(this, 'indeterminate');
      });
    }
  }

  _updateValue() {
    if (this.hasAttribute('value')) {
      contentReady(this, () => {
        const per = Math.ceil(this.getAttribute('value') * 251.32 * 0.01);
        this._primary.style['stroke-dasharray'] = per + '%, 251.32%';
      });
    }
    if (this.hasAttribute('secondary-value')) {
      contentReady(this, () => {
        const per =  Math.ceil(this.getAttribute('secondary-value') * 251.32 * 0.01);
        this._secondary.style.display = null;
        this._secondary.style['stroke-dasharray'] = per + '%, 251.32%';
      });
    } else {
      contentReady(this, () => {
        this._secondary.style.display = 'none';
      });
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
    if (this._isCompiled()) {
      this._template = util.findChild(this, '.progress-circular');
    } else {
      this._template = template.cloneNode(true);
    }

    this._primary = util.findChild(this._template, '.progress-circular__primary');
    this._secondary = util.findChild(this._template, '.progress-circular__secondary');

    this._updateDeterminate();
    this._updateValue();

    this.appendChild(this._template);

    autoStyle.prepare(this);
    ModifierUtil.initModifier(this, scheme);
  }

  _isCompiled() {
    if (!util.findChild(this, '.progress-circular')) {
      return false;
    }

    const svg = util.findChild(this, '.progress-circular');

    if (!util.findChild(svg, '.progress-circular__secondary')) {
      return false;
    }

    if (!util.findChild(svg, '.progress-circular__primary')) {
      return false;
    }

    return true;
  }
}

customElements.define('ons-progress-circular', ProgressCircularElement);
