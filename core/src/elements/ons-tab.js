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
import autoStyle from '../ons/autostyle';
import ModifierUtil from '../ons/internal/modifier-util';
import BaseElement from './base/base-element';
import internal from '../ons/internal';
import TabbarElement from './ons-tabbar';
import contentReady from '../ons/content-ready';
import { PageLoader, defaultPageLoader } from '../ons/page-loader';

const defaultClassName = 'tabbar__item';

const scheme = {
  '': 'tabbar--*__item',
  '.tabbar__button': 'tabbar--*__button'
};

const templateSource = util.createElement(`
  <div>
    <input type="radio" style="display: none">
    <button class="tabbar__button"></button>
  </div>
`);

const defaultInnerTemplateSource = util.createElement(`
  <div>
    <div class="tabbar__icon">
      <ons-icon icon="ion-cloud"></ons-icon>
    </div>
    <div class="tabbar__label">label</div>
    <div class="tabbar__badge notification">1</div>
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
 * @guide multiple-page-navigation
 *   [en]Managing multiple pages.[/en]
 *   [ja]Managing multiple pages[/ja]]
 * @guide templates
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
export default class TabElement extends BaseElement {

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
   * @attribute badge
   * @type {String}
   * @description
   *   [en]Display a notification badge on top of the tab.[/en]
   *   [ja]バッジに表示する内容を指定します。[/ja]
   */

  /**
   * @attribute active
   * @description
   *   [en]This attribute should be set to the tab that is active by default.[/en]
   *   [ja][/ja]
   */

  constructor() {
    super();

    this._pageLoader = defaultPageLoader;
    this._page = null;

    if (this.hasAttribute('label') || this.hasAttribute('icon') || this.hasAttribute('badge')) {
      this._compile();
    } else {
      contentReady(this, () => {
        this._compile();
      });
    }

    this._boundOnClick = this._onClick.bind(this);
  }

  _getPageTarget() {
    return this.page || this.getAttribute('page');
  }

  set page(page) {
    this._page = page;
  }

  get page() {
    return this._page;
  }

  set pageLoader(loader) {
    if (!(loader instanceof PageLoader)) {
      throw Error('First parameter must be an instance of PageLoader.');
    }
    this._pageLoader = loader;
  }

  get pageLoader() {
    return this._pageLoader;
  }

  _templateLoaded() {
    if (this.children.length == 0) {
      return false;
    }

    const hasInput = this._input.getAttribute('type') === 'radio';
    const hasButton = this._button;

    return !!(hasInput && hasButton);
  }

  _compile() {
    autoStyle.prepare(this);

    this.classList.add(defaultClassName);

    if (!this._templateLoaded()) {
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

      if (hasChildren) {
        this._button.appendChild(fragment);
        this._hasDefaultTemplate = false;
      } else {
        this._hasDefaultTemplate = true;
        this._updateDefaultTemplate();
      }
    }

    ModifierUtil.initModifier(this, scheme);
    this._updateRipple();
  }

  _updateRipple() {
    util.updateRipple(this.querySelector('.tabbar__button'), this.hasAttribute('ripple'));
  }

  _updateDefaultTemplate() {
    if (!this._hasDefaultTemplate) {
      return;
    }

    const button = this._button;
    const template = defaultInnerTemplateSource.cloneNode(true);
    if (button.children.length === 0) {
      while (template.children[0]) {
        button.appendChild(template.children[0]);
      }
    }

    if (!button.querySelector('.tabbar__icon')) {
      button.insertBefore(template.querySelector('.tabbar__icon'), button.firstChild);
    }

    if (!button.querySelector('.tabbar__label')) {
      button.appendChild(template.querySelector('.tabbar__label'));
    }

    if (!button.querySelector('.tabbar__badge')) {
      button.appendChild(template.querySelector('.tabbar__badge'));
    }

    const icon = this.getAttribute('icon');
    const label = this.getAttribute('label');
    const badge = this.getAttribute('badge');

    const iconElement = button.querySelector('.tabbar__icon').children[0];
    const labelElement = button.querySelector('.tabbar__label');
    const badgeElement = button.querySelector('.tabbar__badge');

    if (iconElement) {
      if (typeof icon === 'string') {
        const last = iconElement.getAttribute('icon');
        iconElement.setAttribute('icon', icon);
        // dirty fix for https://github.com/OnsenUI/OnsenUI/issues/1654
        iconElement.attributeChangedCallback('icon', last, icon);
      } else {
        iconElement.parentElement.remove();
      }
    }

    if (labelElement) {
      if (typeof label === 'string') {
        labelElement.textContent = label;
      } else {
        labelElement.remove();
      }
    }

    if (badgeElement) {
      if (typeof badge === 'string') {
        badgeElement.textContent = badge;
      } else {
        badgeElement.remove();
      }
    }
  }

  get _input() {
    return this.children[0];
  }

  get _button() {
    return util.findChild(this, '.tabbar__button');
  }

  _onClick() {
    if (this.onClick instanceof Function) {
      this.onClick();
    } else {
      const tabbar = this._findTabbarElement();
      if (tabbar) {
        tabbar.setActiveTab(this._findTabIndex());
      }
    }
  }

  setActive() {
    this._input.checked = true;
    this.classList.add('active');
    this.setAttribute('active', '');

    if (this.hasAttribute('icon') && this.hasAttribute('active-icon')) {
      const icon = this.getAttribute('active-icon');
      const iconElement = this._button.querySelector('.tabbar__icon').children[0];
      iconElement.setAttribute('icon', icon);
    }

    util.arrayFrom(this.querySelectorAll('[ons-tab-inactive], ons-tab-inactive'))
      .forEach(element => element.style.display = 'none');
    util.arrayFrom(this.querySelectorAll('[ons-tab-active], ons-tab-active'))
      .forEach(element => element.style.display = 'inherit');
  }

  setInactive() {
    this._input.checked = false;
    this.classList.remove('active');
    this.removeAttribute('active');

    if (this.hasAttribute('icon')) {
      const icon = this.getAttribute('icon');
      const iconElement = this._button.querySelector('.tabbar__icon').children[0];
      iconElement.setAttribute('icon', icon);
    }

    util.arrayFrom(this.querySelectorAll('[ons-tab-inactive], ons-tab-inactive'))
      .forEach(element => element.style.display = 'inherit');
    util.arrayFrom(this.querySelectorAll('[ons-tab-active], ons-tab-active'))
      .forEach(element => element.style.display = 'none');
  }

  /**
   * @param {Element} parent
   * @param {Function} callback
   */
  _loadPageElement(parent, callback) {
    if (!this._loadedPage && !this._getPageTarget()) {
      const pages = this._findTabbarElement().pages;
      const index = this._findTabIndex();
      if (!pages[index]) {
        throw Error('Page was not provided to <ons-tab> index ' + index);
      }
      callback(pages[index]);
    } else if (this._loadingPage) {
      this._loadingPage.then(pageElement => {
        callback(pageElement);
      });
    } else if (!this._loadedPage) {
      const deferred = util.defer();
      this._loadingPage = deferred.promise;

      this._pageLoader.load({ page: this._getPageTarget(), parent }, pageElement => {
        this._loadedPage = pageElement;
        deferred.resolve(pageElement);
        delete this._loadingPage;

        callback(pageElement);
      });
    } else {
      callback(this._loadedPage);
    }
  }

  get pageElement() {
    if (this._loadedPage) {
      return this._loadedPage;
    }

    const tabbar = this._findTabbarElement();
    const index = this._findTabIndex();

    return tabbar._contentElement.children[index];
  }

  /**
   * @return {Boolean}
   */
  isActive() {
    return this.classList.contains('active');
  }

  disconnectedCallback() {
    this.removeEventListener('click', this._boundOnClick, false);
    if (this._loadedPage) {
      this._pageLoader.unload(this._loadedPage);
      this._loadedPage = null;
    }
  }

  connectedCallback() {
    contentReady(this, () => {
      this._ensureElementPosition();

      const tabbar = this._findTabbarElement();

      if (tabbar.hasAttribute('modifier')) {
        const prefix = this.hasAttribute('modifier') ? this.getAttribute('modifier') + ' ' : '';
        this.setAttribute('modifier', prefix + tabbar.getAttribute('modifier'));
      }

      const onReady = () => {
        if (this._getPageTarget() && !this.hasLoaded) {
          this.hasLoaded = true;
          this._loadPageElement(tabbar._contentElement, pageElement => {
            pageElement.style.display = 'none';
            tabbar._contentElement.appendChild(pageElement);
          });
        }

        if (this.hasAttribute('active')) {
          tabbar.setActiveTab(this._findTabIndex());
        }
      };

      TabbarElement.rewritables.ready(tabbar, onReady);

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

  static get observedAttributes() {
    return ['modifier', 'ripple', 'icon', 'label', 'page', 'badge', 'class'];
  }

  attributeChangedCallback(name, last, current) {
    switch (name) {
      case 'class':
        if (!this.classList.contains(defaultClassName)) {
          this.className = defaultClassName + ' ' + current;
        }
        break;
      case 'modifier':
        contentReady(this, () => ModifierUtil.onModifierChanged(last, current, this, scheme));
        break;
      case 'ripple':
        this._templateLoaded() && contentReady(this, () => this._updateRipple());
        break;
      case 'icon':
      case 'label':
      case 'badge':
        contentReady(this, () => this._updateDefaultTemplate());
        break;
      case 'page':
        if (typeof current === 'string') {
          this._page = current;
        }
        break;
    }
  }
}

customElements.define('ons-tab', TabElement);
