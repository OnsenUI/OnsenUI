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
  '': 'speed-dial__item--*',
};

class SpeedDialItemElement extends BaseElement {

  createdCallback() {
    ModifierUtil.initModifier(this, scheme);
    this.classList.add('fab');
    this.classList.add('fab--mini');
    this.classList.add('speed-dial__item');
    this._boundOnClick = this._onClick.bind(this);
  }

  attributeChangedCallback(name, last, current) {
    if (name === 'modifier') {
      return ModifierUtil.onModifierChanged(last, current, this, scheme);
    }
  }

  attachedCallback() {
    this.addEventListener('click', this._boundOnClick, false);
  }

  detachedCallback() {
    this.removeEventListener('click', this._boundOnClick, false);
  }

  _onClick(e) {
    e.stopPropagation();
  }
}

window.OnsSpeedDialItemElement = document.registerElement('ons-speed-dial-item', {
  prototype: SpeedDialItemElement.prototype
});
