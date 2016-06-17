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
import autoStyle from 'ons/autostyle';
import ModifierUtil from 'ons/internal/modifier-util';
import BaseElement from 'ons/base-element';
import internal from 'ons/internal';
import OnsTabbarElement from './ons-tabbar';
import contentReady from 'ons/content-ready';

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
      <ons-icon icon="ion-cloud"></ons-icon>
    </div>
    <div class="tab-bar__label">label</div>
  </div>
`);

/**
 * @element ons-tab
 * @category tabbar
 * @description
 *   [en]Represents a tab inside tab bar. Each `<ons-tab>` represents a page.[/en]
 *   [ja]
 *     タブバーに配置される各アイテムのコンポーネントです。それぞれのons-tabはページを表します。
 *     ons-tab要素の中には、タブに表示されるコンテンツを直接記述することが出来ます。
 *   [/ja]
 * @codepen pGuDL
 * @tutorial vanilla/Reference/tabbar
 * @guide UsingTabBar
 *   [en]Using tab bar[/en]
 *   [ja]タブバーを使う[/ja]
 * @guide DefiningMultiplePagesinSingleHTML
 *   [en]Defining multiple pages in single html[/en]
 *   [ja]複数のページを1つのHTMLに記述する[/ja]
 * @seealso ons-tabbar
 *   [en]ons-tabbar component[/en]
 *   [ja]ons-tabbarコンポーネント[/ja]
 * @seealso ons-page
 *   [en]ons-page component[/en]
 *   [ja]ons-pageコンポーネント[/ja]
 * @seealso ons-icon
 *   [en]ons-icon component[/en]
 *   [ja]ons-iconコンポーネント[/ja]
 * @example
 * <ons-tabbar>
 *   <ons-tab
 *     page="home.html"
 *     label="Home"
 *     active>
 *   </ons-tab>
 *   <ons-tab
 *     page="settings.html"
 *     label="Settings"
 *     active>
 *   </ons-tab>
 * </ons-tabbar>
 *
 * <ons-template id="home.html">
 *   ...
 * </ons-template>
 *
 * <ons-template id="settings.html">
 *   ...
 * </ons-template>

 */
class TabElement extends BaseElement {

  /**
   * @attribute page
   * @initonly
   * @type {String}
   * @description
   *   [en]The page that is displayed when the tab is tapped.[/en]
   *   [ja]ons-tabが参照するページへのURLを指定します。[/ja]
   */

  /**
   * @attribute icon
   * @type {String}
   * @description
   *   [en]
   *     The icon name for the tab. Can specify the same icon name as `<ons-icon>`.
   *     If you need to use your own icon, create a CSS class with `background-image` or any CSS properties and specify the name of your CSS class here.
   *   [/en]
   *   [ja]
   *     アイコン名を指定します。ons-iconと同じアイコン名を指定できます。
   *     個別にアイコンをカスタマイズする場合は、background-imageなどのCSSスタイルを用いて指定できます。
   *   [/ja]
   */

  /**
   * @attribute active-icon
   * @type {String}
   * @description
   *   [en]The name of the icon when the tab is active.[/en]
   *   [ja]アクティブの際のアイコン名を指定します。[/ja]
   */

  /**
   * @attribute label
   * @type {String}
   * @description
   *   [en]The label of the tab item.[/en]
   *   [ja]アイコン下に表示されるラベルを指定します。[/ja]
   */

  /**
   * @attribute active
   * @description
   *   [en]This attribute should be set to the tab that is active by default.[/en]
   *   [ja][/ja]
   */

  createdCallback() {
    if (this.hasAttribute('label') || this.hasAttribute('icon')) {
      if (!this.hasAttribute('_compiled')) {
        this._compile();
      }
    } else {
      contentReady(this, () => {
        if (!this.hasAttribute('_compiled')) {
          this._compile();
        }
      });
    }

    this._boundOnClick = this._onClick.bind(this);
  }

  _compile() {
    autoStyle.prepare(this);

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

    ModifierUtil.initModifier(this, scheme);
    this._updateRipple();

    this.setAttribute('_compiled', '');
  }

  _updateRipple() {
    // util.updateRipple(this.querySelector('.tab-bar__button'), this);
  }

  _updateDefaultTemplate() {
    if (!this._hasDefaultTemplate) {
      return;
    }

    const button = util.findChild(this, '.tab-bar__button');

    if (button.children.length == 0) {
      const template = defaultInnerTemplateSource.cloneNode(true);
      while (template.children[0]) {
        button.appendChild(template.children[0]);
      }

      if (!button.querySelector('.tab-bar__icon')) {
        button.insertBefore(template.querySelector('.tab-bar__icon'), button.firstChild);
      }

      if (!button.querySelector('.tab-bar__label')) {
        button.appendChild(template.querySelector('.tab-bar__label'));
      }
    }

    const self = this;
    const icon = this.getAttribute('icon');
    const label = this.getAttribute('label');

    if (typeof icon === 'string') {
      getIconElement().setAttribute('icon', icon);
    } else {
      const wrapper = button.querySelector('.tab-bar__icon');
      if (wrapper) {
        wrapper.remove();
      }
    }

    if (typeof label === 'string') {
      getLabelElement().textContent = label;
    } else {
      const label = getLabelElement();
      if (label) {
        label.remove();
      }
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

  setActive() {
    const radio = util.findChild(this, 'input');
    radio.checked = true;
    this.classList.add('active');

    util.arrayFrom(this.querySelectorAll('[ons-tab-inactive], ons-tab-inactive'))
      .forEach(element => element.style.display = 'none');
    util.arrayFrom(this.querySelectorAll('[ons-tab-active], ons-tab-active'))
      .forEach(element => element.style.display = 'inherit');
  }

  setInactive() {
    const radio = util.findChild(this, 'input');
    radio.checked = false;
    this.classList.remove('active');

    util.arrayFrom(this.querySelectorAll('[ons-tab-inactive], ons-tab-inactive'))
      .forEach(element => element.style.display = 'inherit');
    util.arrayFrom(this.querySelectorAll('[ons-tab-active], ons-tab-active'))
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
    if (!this.pageElement) {
      this._createPageElement(this.getAttribute('page'), (element) => {
        link(element, element => {
          this.pageElement = element;
          callback(element);
        });
      });
    } else {
      callback(this.pageElement);
    }
  }

  set pageElement(el) {
    this._pageElement = el;
  }

  get pageElement() {
    if (typeof this._pageElement !== 'undefined') {
      return this._pageElement;
    }

    const tabbar = this._findTabbarElement();
    const index = this._findTabIndex();

    return tabbar._contentElement.children[index];
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

  detachedCallback() {
    this.removeEventListener('click', this._boundOnClick, false);
  }

  attachedCallback() {
    contentReady(this, () => {
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
      } else {
        OnsTabbarElement.rewritables.ready(tabbar, () => {
          setImmediate(() => {
            if (this.hasAttribute('page')) {
              this._createPageElement(this.getAttribute('page'), pageElement => {
                OnsTabbarElement.rewritables.link(tabbar, pageElement, {}, pageElement => {
                  this.pageElement = pageElement;
                  this.pageElement.style.display = 'none';
                  tabbar._contentElement.appendChild(this.pageElement);
                });
              });
            }
          });
        });
      }

      this.addEventListener('click', this._boundOnClick, false);
    });
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
    switch (name) {
      case 'modifier':
        contentReady(this, () => ModifierUtil.onModifierChanged(last, current, this, scheme));
        break;
      case 'ripple':
        contentReady(this, () => this._updateRipple());
        break;
      case 'icon':
      case 'label':
        contentReady(this, () => this._updateDefaultTemplate());
        break;
    }
  }
}

window.OnsTabElement = document.registerElement('ons-tab', {
  prototype: TabElement.prototype
});

document.registerElement('ons-tabbar-item', {
  prototype: Object.create(TabElement.prototype)
});
