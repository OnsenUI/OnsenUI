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

import BaseInputElement from './base-input.js';
import contentReady from '../../ons/content-ready.js';

export default class BaseCheckboxElement extends BaseInputElement {

  constructor() {
    super();

    if (this.constructor === BaseCheckboxElement) {
      util.throwAbstract();
    }

    contentReady(this, () => {
      this.attributeChangedCallback('checked', null, this.getAttribute('checked'));
    });
  }

  /* Inherited props */

  get _template() {
    return `
      <input type="${this.type}" class="${this._defaultClassName}__input">
      <span class="${this._defaultClassName}__checkmark"></span>
    `;
  }

  /* Own props */

  get _helper() {
    return this.querySelector('span');
  }

  get checked() {
    return this._input.checked;
  }

  set checked(val) {
    contentReady(this, () => {
      this._input.checked = val;
    });
  }

  static get observedAttributes() {
    return [...super.observedAttributes, 'checked'];
  }

  attributeChangedCallback(name, last, current) {
    switch (name) {
      case 'checked':
        this.checked = current !== null;
        break;
      default:
        super.attributeChangedCallback(name, last, current);
    }
  }
}
