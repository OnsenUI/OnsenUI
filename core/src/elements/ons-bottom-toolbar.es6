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
import BaseElement from '../ons/base-element';

const scheme = {'': 'bottom-bar--*'};

class BottomToolbarElement extends BaseElement {

  createdCallback() {
    this.classList.add('bottom-bar');
    this.style.zIndex = '0';
    this._update();

    ModifierUtil.initModifier(this, scheme);
  }

  attributeChangedCallback(name, last, current) {
    if (name === 'inline') {
      this._update();
    } else if (name === 'modifier') {
      return ModifierUtil.onModifierChanged(last, current, this, scheme);
    }
  }

  _update() {
    const inline = typeof this.getAttribute('inline') === 'string';

    this.style.position = inline ? 'static' : 'absolute';
  }
}

window.OnsBottomToolbarElement = document.registerElement('ons-bottom-toolbar', {
  prototype: BottomToolbarElement.prototype
});
