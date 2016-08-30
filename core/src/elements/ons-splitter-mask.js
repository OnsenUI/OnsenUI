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

import BaseElement from 'ons/base-element';
import util from 'ons/util';

export default class SplitterMaskElement extends BaseElement {

  init() {
    this._boundOnClick = this._onClick.bind(this);
  }

  _onClick(event) {
    if (util.match(this.parentNode, 'ons-splitter')) {
      this.parentNode._sides.forEach(side => side.close('left').catch(() => {}));
    }
    event.stopPropagation();
  }

  static get observedAttributes() {
    return [];
  }

  attributeChangedCallback(name, last, current) {
  }

  connectedCallback() {
    this.addEventListener('click', this._boundOnClick);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this._boundOnClick);
  }
}

customElements.define('ons-splitter-mask', SplitterMaskElement);
