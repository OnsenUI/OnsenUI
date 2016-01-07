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

import ModifierUtil from '../ons/internal/modifier-util';
import BaseElement from '../ons/base-element';

const scheme = {'': 'toolbar-button--*'};

class ToolbarButtonElement extends BaseElement {

  createdCallback() {
    this.classList.add('toolbar-button');

    ModifierUtil.initModifier(this, scheme);
  }

  attributeChangedCallback(name, last, current) {
    if (name === 'modifier') {
      return ModifierUtil.onModifierChanged(last, current, this, scheme);
    }
  }
}

window.OnsToolbarButton = document.registerElement('ons-toolbar-button', {
  prototype: ToolbarButtonElement.prototype
});

