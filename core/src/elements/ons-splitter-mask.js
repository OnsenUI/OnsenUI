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

class SplitterMaskElement extends BaseElement {

  createdCallback() {
    this._boundOnClick = this._onClick.bind(this);
  }

  _onClick(event) {
    if (util.match(this.parentNode, 'ons-splitter')) {
      this.parentNode._sides.forEach(side => side.close('left').catch(() => {}));
    }
    event.stopPropagation();
  }

  attributeChangedCallback(name, last, current) {
  }

  attachedCallback() {
    this.addEventListener('click', this._boundOnClick);
  }

  detachedCallback() {
    this.removeEventListener('click', this._boundOnClick);
  }
}

window.OnsSplitterMaskElement = document.registerElement('ons-splitter-mask', {
  prototype: SplitterMaskElement.prototype
});
