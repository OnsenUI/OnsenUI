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
  '.progress-bar': 'progress-bar--*',
  '.progress-bar__primary': 'progress-bar__primary--*',
  '.progress-bar__secondary': 'progress-bar__secondary--*'
};

const template = util.createElement(`
  <div class="progress-bar">
    <div class="progress-bar__secondary"></div>
    <div class="progress-bar__primary"></div>
  </div>
`);

class ProgressBarElement extends BaseElement {
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
      this._template.classList.add(`progress-bar--indeterminate`);
      this._template.classList.remove(`progress-bar--determinate`);
    }
    else {
      this._template.classList.add(`progress-bar--determinate`);
      this._template.classList.remove(`progress-bar--indeterminate`);
    }
  }

  _updateValue() {
    this._primary.style.width = (this.hasAttribute('value')) ? this.getAttribute('value') + '%' : '0%';
    this._secondary.style.width = this.hasAttribute('secondary-value') ? this.getAttribute('secondary-value') + '%' : '0%';
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

window.OnsProgressBarElement = document.registerElement('ons-progress-bar', {
  prototype: ProgressBarElement.prototype
});
