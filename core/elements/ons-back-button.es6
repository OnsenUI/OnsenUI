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

  var scheme = {
    '': 'back-button--*',
    '.back-button__icon': 'back-button--*__icon',
    '.back-button__label': 'back-button--*__label'
  };

  class BackButtonElement extends ons._BaseElement {

    createdCallback() {
      this._compile();
      this._boundOnClick = this._onClick.bind(this);
      ModifierUtil.initModifier(this, scheme);
    }

    _compile() {
      this.classList.add('back-button');

      const label = ons._util.createElement(`
        <span class="back-button__label">${this.innerHTML}</span>
      `);

      this.innerHTML = '';

      const icon = ons._util.createElement(`
        <span class="back-button__icon"></span>
      `);

      this.appendChild(icon);
      this.appendChild(label);
    }

    _onClick() {
      const navigator = util.findParent(this, 'ons-navigator');
      if (navigator) {
        navigator.popPage({cancelIfRunning: true});
      }
    }

    attachedCallback() {
      this.addEventListener('click', this._boundOnClick, false);
    }

    attributeChangedCallback(name, last, current) {
      if (name === 'modifier') {
        return ModifierUtil.onModifierChanged(last, current, this, scheme);
      }
    }

    detachedCallback() {
      this.removeEventListener('click', this._boundOnClick, false);
    }

    show() {
      this.style.display = 'inline-block';
    }

    hide() {
      this.style.display = 'none';
    }
  }

  if (!window.OnsBackButtonElement) {
    window.OnsBackButtonElement = document.registerElement('ons-back-button', {
      prototype: BackButtonElement.prototype
    });
  }
})();
