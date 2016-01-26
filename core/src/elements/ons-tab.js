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
import internal from 'ons/internal';
import OnsTabbarElement from './ons-tabbar';

const scheme = {
  '': 'tab-bar--*__item',
  '.tab-bar__button': 'tab-bar--*__button'
};
const templateSource = util.createElement(`
  <div>
    <input type="radio" style="display: none">
    <button class="tab-bar__button tab-bar-inner"></button>
  </div>
`);
const defaultInnerTemplateSource = util.createElement(`
  <div>
    <div class="tab-bar__icon">
      <ons-icon icon="ion-cloud" style="font-size: 28px; line-height: 34px; vertical-align: top;"></ons-icon>
    </div>
    <div class="tab-bar__label">label</div>
  </div>
`);

class TabElement extends BaseElement {

  createdCallback() {
    if (!this.hasAttribute('_compiled')) {
      this._compile();
      ModifierUtil.initModifier(this, scheme);

      this.setAttribute('_compiled', '');
    }

    this._boundOnClick = this._onClick.bind(this);
  }

  _compile() {
    const fragment = document.createDocumentFragment();
    let hasChildren = false;

    while (this.childNodes[0]) {
      const node = this.childNodes[0];
      this.removeChild(node);
      fragment.appendChild(node);

      if (node.nodeType == Node.ELEMENT_NODE) {
        hasChildren = true;
      }
    }

    const template = templateSource.cloneNode(true);
    while (template.children[0]) {
      this.appendChild(template.children[0]);
    }
    this.classList.add('tab-bar__item');

    const button = util.findChild(this, '.tab-bar__button');

    if (hasChildren) {
      button.appendChild(fragment);
      this._hasDefaultTemplate = false;
    } else {
      this._hasDefaultTemplate = true;
      this._updateDefaultTemplate();
    }
  }

  _updateDefaultTemplate() {
    if (!this._hasDefaultTemplate) {
      return;
    }

    const button = util.findChild(this, '.tab-bar__button');

    const template = defaultInnerTemplateSource.cloneNode(true);
    while (template.children[0]) {
      button.appendChild(template.children[0]);
    }

    const self = this;
    const icon = this.getAttribute('icon');
    const label = this.getAttribute('label');

    if (typeof icon === 'string') {
      getIconElement().setAttribute('icon', icon);
    } else {
      const wrapper = button.querySelector('.tab-bar__icon');
      wrapper.parentNode.removeChild(wrapper);
    }

    if (typeof label === 'string') {
      getLabelElement().textContent = label;
    } else {
      getLabelElement().parentNode.removeChild(getLabelElement());
    }

    function getLabelElement() {
      return self.querySelector('.tab-bar__label');
    }

    function getIconElement() {
      return self.querySelector('ons-icon');
    }
  }

  _onClick() {
    const tabbar = this._findTabbarElement();
    if (tabbar) {
      tabbar.setActiveTab(this._findTabIndex());
    }
  }

  isPersistent() {
    return this.hasAttribute('persistent');
  }

  setActive() {
    const radio = util.findChild(this, 'input');
    radio.checked = true;
    this.classList.add('active');

    util.arrayFrom(this.querySelectorAll('[ons-tab-inactive]'))
      .forEach(element => element.style.display = 'none');
    util.arrayFrom(this.querySelectorAll('[ons-tab-active]'))
      .forEach(element => element.style.display = 'inherit');
  }

  setInactive() {
    const radio = util.findChild(this, 'input');
    radio.checked = false;
    this.classList.remove('active');

    util.arrayFrom(this.querySelectorAll('[ons-tab-inactive]'))
      .forEach(element => element.style.display = 'inherit');
    util.arrayFrom(this.querySelectorAll('[ons-tab-active]'))
      .forEach(element => element.style.display = 'none');
  }

  /**
   * @return {Boolean}
   */
  isLoaded() {
    return false;
  }

  /**
   * @param {Function} callback
   * @param {Function} link
   */
  _loadPageElement(callback, link) {
    if (this.isPersistent()) {
      if (!this._pageElement) {
        this._createPageElement(this.getAttribute('page'), (element) => {
          link(element, element => {
            this._pageElement = element;
            callback(element);
          });
        });
      } else {
        callback(this._pageElement);
      }
    } else {
      this._pageElement = null;
      this._createPageElement(this.getAttribute('page'), callback);
    }
  }

  /**
   * @param {String} page
   * @param {Function} callback
   */
  _createPageElement(page, callback) {
    internal.getPageHTMLAsync(page).then(html => {
      callback(util.createElement(html.trim()));
    });
  }

  /**
   * @return {Boolean}
   */
  isActive() {
    return this.classList.contains('active');
  }

  /**
   * @return {Boolean}
   */
  canReload() {
    return !this.hasAttribute('no-reload');
  }

  detachedCallback() {
    this.removeEventListener('click', this._boundOnClick, false);
  }

  attachedCallback() {
    this._ensureElementPosition();

    const tabbar = this._findTabbarElement();

    if (tabbar.hasAttribute('modifier')) {
      const prefix = this.hasAttribute('modifier') ? this.getAttribute('modifier') + ' ' : '';
      this.setAttribute('modifier', prefix + tabbar.getAttribute('modifier'));
    }

    if (this.hasAttribute('active')) {
      const tabIndex = this._findTabIndex();

      OnsTabbarElement.rewritables.ready(tabbar, () => {
        setImmediate(() => tabbar.setActiveTab(tabIndex, {animation: 'none'}));
      });
    }

    this.addEventListener('click', this._boundOnClick, false);
  }

  _findTabbarElement() {
    if (this.parentNode && this.parentNode.nodeName.toLowerCase() === 'ons-tabbar') {
      return this.parentNode;
    }

    if (this.parentNode.parentNode && this.parentNode.parentNode.nodeName.toLowerCase() === 'ons-tabbar') {
      return this.parentNode.parentNode;
    }

    return null;
  }

  _findTabIndex() {
    const elements = this.parentNode.children;
    for (let i = 0; i < elements.length; i++) {
      if (this === elements[i]) {
        return i;
      }
    }
  }

  _ensureElementPosition() {
    if (!this._findTabbarElement()) {
      throw new Error('This ons-tab element is must be child of ons-tabbar element.');
    }
  }

  attributeChangedCallback(name, last, current) {
    if (this._hasDefaultTemplate) {
      if (name === 'icon' || name === 'label') {
        this._updateDefaultTemplate();
      }
    }

    if (name === 'modifier') {
      return ModifierUtil.onModifierChanged(last, current, this, scheme);
    }
  }
}

window.OnsTabElement = document.registerElement('ons-tab', {
  prototype: TabElement.prototype
});

document.registerElement('ons-tabbar-item', {
  prototype: Object.create(TabElement.prototype)
});
