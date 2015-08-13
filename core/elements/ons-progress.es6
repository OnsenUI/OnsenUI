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

(() => {
  'use strict';

  const util = ons._util;
  const ModifierUtil = ons._internal.ModifierUtil;

  const scheme = {
    'progress-bar': 'progress-progress--*',
    'progress-circular': 'progress-circular--*'
  };
  const barTemplate = util.createElement(`
    <div class="progress-bar">
      <div class="progress-bar__primary"></div>
      <div class="progress-bar__secondary"></div>
    </div>
  `);
  const circularTemplate = util.createElement(`
    <svg class="progress-circular">
      <circle class="progress-circular__secondary" cx="50%" cy="50%" r="25%" fill="none" stroke-width="5%" stroke-miterlimit="10"/>
      <circle class="progress-circular__primary" cx="50%" cy="50%" r="25%" fill="none" stroke-width="5%" stroke-miterlimit="10"/>
    </svg>
  `);

  class ProgressElement extends ons._BaseElement {

    createdCallback() {

      if (this.hasAttribute('type') && this.getAttribute('type') === 'circular') {
        this._type = 'circular';
      } else {
        this._type = 'bar';
      }

      this._compile();

      ModifierUtil.initModifier(this, scheme);
    }

    attributeChangedCallback(name, last, current) {
      if (name === 'modifier') {
        return ModifierUtil.onModifierChanged(last, current, this, scheme);
      } else if (name === 'value' || name === 'secondary-value') {
        this._updateValue();
      }
    }

    _updateValue() {
      console.log('updating values');
      if (this._type === 'bar') {
        this._primary.style.width = (this.hasAttribute('value')) ? this.getAttribute('value') + '%' : '0%';
        this._secondary.style.width = (this.hasAttribute('secondary-value')) ? this.getAttribute('secondary-value') + '%' : '0%';
      } else {
        if (this.hasAttribute('value')) {
          let per = this.getAttribute('value') * 160 * 0.01;
          this._template.querySelector('.progress-circular__primary').style['stroke-dasharray'] = per + '%, 250%';
        }
        if (this.hasAttribute('secondary-value')) {
          let per = this.getAttribute('secondary-value') * 160 * 0.01;
          this._template.querySelector('.progress-circular__secondary').style['stroke-dasharray'] = per + '%, 250%';
        }
      }
    }

    _compile() {
      if (this._type === 'bar') {
        this._template = barTemplate.cloneNode(true);
        this._primary = this._template.children[0];
        this._secondary = this._template.children[1];
        if (this.hasAttribute('indeterminate')) {
          this._template.classList.add('progress-bar--indeterminate');
        } else {
         this._template.classList.add('progress-bar--determinate');
          this._updateValue();
        }
      } else {
        this._template = circularTemplate.cloneNode(true);
        if (!this.hasAttribute('indeterminate')) {
          this._template.classList.add('progress-circular--determinate');
          this._updateValue();
        }
      }

      this.appendChild(this._template);
    }

  }

  if (!window.OnsProgressElement) {
    window.OnsProgressElement = document.registerElement('ons-progress', {
      prototype: ProgressElement.prototype
    });
  }
})();
