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

  var scheme = {
    '': 'tab-bar--*__item',
    'tab-bar__button': 'tab-bar--*__button'
  };
  var ModifierUtil = ons._internal.ModifierUtil;
  var util = ons._util;

  class TabElement extends ons._BaseElement {

    createdCallback() {
      this._compile();
    }

    _compile() {
      var fragment = document.createDocumentFragment(); 

      while (this.childNodes[0]) {
        let node = this.childNodes[0];
        this.removeChild(node);
        fragment.appendChild(node);
      }

      var template = `
        <input type="radio" style="display: none">
        <button class="tab-bar__button tab-bar-inner"></button>`;
      this.innerHTML = template;
      this.classList.add('tab-bar__item');

      var button = util.findChild(this, '.tab-bar__button');

      if (fragment.children.length === 0) {
        button.innerHTML = `
          <div class="tab-bar__icon">
            <ons-icon icon="ion-cloud" style="font-size: 28px; line-height: 34px; vertical-align: top;"></ons-icon>
          </div>
          <div class="tab-bar__label">label</div>`;
        this.classList.add('tab-bar__item--default');
      } else {
        button.appendChild(fragment);
      }

      // set tabbar name
      // set ng-click
      // set modifier templater
    }

    isPersistent() {
      return this.hasAttribute('persistent');
    }

    _tryToChange() {
      if (this.parentNode && this.parentNode.nodeName !== 'ons-tabbar') {
        this.parentNode._setActiveTab(this);
      }
    }

    _hasDefaultTemplate() {
      return this.classList.contains('tab-bar__item--default');
    }

    _setActive() {
      var radio = util.findChild(this, 'input');
      radio.checked = true;
      this.classList.add('active');
      this.querySelectorAll('[ons-tab-inactive]').style.display = 'none';
      this.querySelectorAll('[ons-tab-active]').style.display = 'inherit';
    }

    _setInactive() {
      var radio = util.findChild(this, 'input');
      radio.checked = false;
      this.classList.remove('active');
      this.querySelectorAll('[ons-tab-inactive]').style.display = 'inherit';
      this.querySelectorAll('[ons-tab-active]').style.display = 'none';
    }

    isActive() {
      return this.classList.contains('active');
    }

    canReload() {
      return !this.hasAttribute('no-reload');
    }

    detachedCallback() {
    }

    atachedCallback() {
      var tabbar = this.parentNode.parentNode;
      if (tabbar.nodeName.toLowerCase() !== 'ons-tabbar') {
        throw new Error('This ons-tab element is must be child of ons-tabbar element.');
      }
    }

    _ensureNodePosition() {
    }

    attributeChangedCallback(name, last, current) {
      // TODO: label
      // TODO: active
    }
  }

  if (!window.OnsTabElement) {
    window.OnsTabElement = document.registerElement('ons-tab', {
      prototype: TabElement.prototype
    });
  }
})();
