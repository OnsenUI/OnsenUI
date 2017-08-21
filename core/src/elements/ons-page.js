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
import internal from '../ons/internal';
import autoStyle from '../ons/autostyle';
import ModifierUtil from '../ons/internal/modifier-util';
import BaseElement from './base/base-element';
import deviceBackButtonDispatcher from '../ons/device-back-button-dispatcher';
import contentReady from '../ons/content-ready';

import './ons-toolbar'; // ensures that 'ons-toolbar' element is registered

const defaultClassName = 'page';
const scheme = {
  '': 'page--*',
  '.page__content': 'page--*__content',
  '.page__background': 'page--*__background'
};

const nullToolbarElement = document.createElement('ons-toolbar'); // requires that 'ons-toolbar' element is registered

/**
 * @element ons-page
 * @category page
 * @modifier material
 *   [en]Material Design style[/en]
 *   [ja][/ja]
 * @description
 *   [en]
 *     This component defines the root of each page. If the content is large it will become scrollable.
 *
 *     A navigation bar can be added to the top of the page using the `<ons-toolbar>` element.
 *   [/en]
 *   [ja]ページ定義のためのコンポーネントです。このコンポーネントの内容はスクロールが許可されます。[/ja]
 * @tutorial vanilla/Reference/page
 * @guide creating-a-page
 *   [en]Setting up a page in its `init` event[/en]
 *   [ja]Setting up a page in its `init` event[/ja]
 * @guide templates
 *   [en]Defining multiple pages in single html[/en]
 *   [ja]複数のページを1つのHTMLに記述する[/ja]
 * @guide multiple-page-navigation
 *   [en]Managing multiple pages[/en]
 *   [ja]複数のページを管理する[/ja]
 * @guide using-modifier [en]More details about the `modifier` attribute[/en][ja]modifier属性の使い方[/ja]
 * @seealso ons-toolbar
 *   [en]Use the `<ons-toolbar>` element to add a navigation bar to the top of the page.[/en]
 *   [ja][/ja]
 * @example
 * <ons-page>
 *   <ons-toolbar>
 *     <div class="left">
 *       <ons-back-button>Back</ons-back-button>
 *     </div>
 *     <div class="center">Title</div>
 *     <div class="right">
 *       <ons-toolbar-button>
 *         <ons-icon icon="md-menu"></ons-icon>
 *       </ons-toolbar-button>
 *     </div>
 *   </ons-toolbar>
 *
 *   <p>Page content</p>
 * </ons-page>
 *
 * @example
 * <script>
 *   myApp.handler = function(done) {
 *     loadMore().then(done);
 *   }
 * </script>
 *
 * <ons-page on-infinite-scroll="myApp.handler">
 *   <ons-toolbar>
 *     <div class="center">List</div>
 *   </ons-toolbar>
 *
 *   <ons-list>
 *     <ons-list-item>#1</ons-list-item>
 *     <ons-list-item>#2</ons-list-item>
 *     <ons-list-item>#3</ons-list-item>
 *     ...
 *   </ons-list>
 * </ons-page>
 */
export default class PageElement extends BaseElement {

  /**
   * @event init
   * @description
   *   [en]Fired right after the page is attached.[/en]
   *   [ja]ページがアタッチされた後に発火します。[/ja]
   * @param {Object} event [en]Event object.[/en]
   */

  /**
   * @event show
   * @description
   *   [en]Fired right after the page is shown.[/en]
   *   [ja]ページが表示された後に発火します。[/ja]
   * @param {Object} event [en]Event object.[/en]
   */

  /**
   * @event hide
   * @description
   *   [en]Fired right after the page is hidden.[/en]
   *   [ja]ページが隠れた後に発火します。[/ja]
   * @param {Object} event [en]Event object.[/en]
   */

  /**
   * @event destroy
   * @description
   *   [en]Fired right before the page is destroyed.[/en]
   *   [ja]ページが破棄される前に発火します。[/ja]
   * @param {Object} event [en]Event object.[/en]
   */

  /**
   * @attribute modifier
   * @type {String}
   * @description
   *   [en]Specify modifier name to specify custom styles.[/en]
   *   [ja]スタイル定義をカスタマイズするための名前を指定します。[/ja]
   */

  /**
   * @attribute on-infinite-scroll
   * @type {String}
   * @description
   *   [en]Path of the function to be executed on infinite scrolling. Example: `app.loadData`. The function receives a done callback that must be called when it's finished.[/en]
   *   [ja][/ja]
   */

  constructor() {
    super();

    this._deriveHooks();

    this.classList.add(defaultClassName);
    this._initialized = false;

    contentReady(this, () => {
      this._compile();

      this._isShown = false;
      this._contentElement = this._getContentElement();
      this._backgroundElement = this._getBackgroundElement();
    });
  }

  connectedCallback() {
    if (this._initialized) {
      return;
    }

    this._initialized = true;

    contentReady(this, () => {
      setImmediate(() => {
        this.onInit && this.onInit();
        util.triggerElementEvent(this, 'init');
      });

      if (!util.hasAnyComponentAsParent(this)) {
        setImmediate(() => this._show());
      }

      this._tryToFillStatusBar();

      if (this.hasAttribute('on-infinite-scroll')) {
        this.attributeChangedCallback('on-infinite-scroll', null, this.getAttribute('on-infinite-scroll'));
      }
    });
  }

  updateBackButton(show) {
    if (this.backButton) {
      show ? this.backButton.show() : this.backButton.hide();
    }
  }

  set name(str) {
    this.setAttribute('name', str);
  }

  get name() {
    return this.getAttribute('name');
  }

  get backButton() {
    return this.querySelector('ons-back-button');
  }

  _tryToFillStatusBar(){
    internal.autoStatusBarFill(() => {
      const filled = util.findParent(this, e => e.hasAttribute('status-bar-fill'), e => !e.nodeName.match(/ons-modal/i));
      util.toggleAttribute(this, 'status-bar-fill', !filled && (this._canAnimateToolbar() || !this._hasAPageControlChild()));
    });
  }

  _hasAPageControlChild() {
    return util.findChild(this._contentElement, util.isPageControl);
  }

  /**
   * @property onInfiniteScroll
   * @description
   *  [en]Function to be executed when scrolling to the bottom of the page. The function receives a done callback as an argument that must be called when it's finished.[/en]
   *  [ja][/ja]
   */
  set onInfiniteScroll(value) {
    if (value && !(value instanceof Function)) {
      throw new Error('onInfiniteScroll must be a function or null');
    }

    contentReady(this, () => {
      if (!value) {
        this._contentElement.removeEventListener('scroll', this._boundOnScroll);
      } else if (!this._onInfiniteScroll) {
        this._infiniteScrollLimit = 0.9;
        this._boundOnScroll = this._onScroll.bind(this);
        setImmediate(() => this._contentElement.addEventListener('scroll', this._boundOnScroll));
      }
      this._onInfiniteScroll = value;
    });
  }

  get onInfiniteScroll() {
    return this._onInfiniteScroll;
  }

  _onScroll() {
    const c = this._contentElement,
      overLimit = (c.scrollTop + c.clientHeight) / c.scrollHeight >= this._infiniteScrollLimit;

    if (this._onInfiniteScroll && !this._loadingContent && overLimit) {
      this._loadingContent = true;
      this._onInfiniteScroll(() => this._loadingContent = false);
    }
  }

  /**
   * @property onDeviceBackButton
   * @type {Object}
   * @description
   *   [en]Back-button handler.[/en]
   *   [ja]バックボタンハンドラ。[/ja]
   */
  get onDeviceBackButton() {
    return this._backButtonHandler;
  }

  set onDeviceBackButton(callback) {
    if (this._backButtonHandler) {
      this._backButtonHandler.destroy();
    }

    this._backButtonHandler = deviceBackButtonDispatcher.createHandler(this, callback);
  }

  get scrollTop() {
    return this._contentElement.scrollTop;
  }

  set scrollTop(newValue) {
    this._contentElement.scrollTop = newValue;
  }

  /**
   * @return {HTMLElement}
   */
  _getContentElement() {
    const result = util.findChild(this, '.page__content');
    if (result) {
      return result;
    }
    throw Error('fail to get ".page__content" element.');
  }

  /**
   * @return {Boolean}
   */
  _canAnimateToolbar() {
    if (util.findChild(this, 'ons-toolbar')) {
      return true;
    }
    return !!util.findChild(this._contentElement, el => {
      return util.match(el, 'ons-toolbar') && !el.hasAttribute('inline');
    });
  }

  /**
   * @return {HTMLElement}
   */
  _getBackgroundElement() {
    const result = util.findChild(this, '.page__background');
    if (result) {
      return result;
    }
    throw Error('fail to get ".page__background" element.');
  }

  /**
   * @return {HTMLElement}
   */
  _getBottomToolbarElement() {
    return util.findChild(this, 'ons-bottom-toolbar') || internal.nullElement;
  }

  /**
   * @return {HTMLElement}
   */
  _getToolbarElement() {
    return util.findChild(this, 'ons-toolbar') || nullToolbarElement;
  }

  static get observedAttributes() {
    return ['modifier', 'on-infinite-scroll', 'class'];
  }

  attributeChangedCallback(name, last, current) {
    switch (name) {
      case 'class':
        if (!this.classList.contains(defaultClassName)) {
          this.className = defaultClassName + ' ' + current;
        }
        break;
      case 'modifier':
        ModifierUtil.onModifierChanged(last, current, this, scheme);
        break;
      case 'on-infinite-scroll':
        if (current === null) {
          this.onInfiniteScroll = null;
        } else {
          this.onInfiniteScroll = (done) => {
            const f = util.findFromPath(current);
            this.onInfiniteScroll = f;
            f(done);
          };
        }
        break;
    }
  }

  _compile() {
    autoStyle.prepare(this);

    const toolbar = util.findChild(this, 'ons-toolbar');

    const background = util.findChild(this, '.page__background') || util.findChild(this, '.background') || document.createElement('div');
    background.classList.add('page__background');
    this.insertBefore(background, !toolbar && this.firstChild || toolbar && toolbar.nextSibling);

    const content = util.findChild(this, '.page__content') || util.findChild(this, '.content') || document.createElement('div');
    content.classList.add('page__content');
    if (!content.parentElement) {
      util.arrayFrom(this.childNodes).forEach(node => {
        if (node.nodeType !== 1 || this._elementShouldBeMoved(node)) {
          content.appendChild(node);
        }
      });
    }
    this.insertBefore(content, background.nextSibling);

    // Make wrapper pages transparent for animations
    if (!background.style.backgroundColor
      && content.children.length === 1
      && util.isPageControl(content.children[0])
    ) {
        background.style.backgroundColor = 'transparent';
    }

    ModifierUtil.initModifier(this, scheme);
  }

  _elementShouldBeMoved(el) {
    if (el.classList.contains('page__background')) {
      return false;
    }
    const tagName = el.tagName.toLowerCase();
    if (tagName === 'ons-fab') {
      return !el.hasAttribute('position');
    }
    const fixedElements = ['script', 'ons-toolbar', 'ons-bottom-toolbar', 'ons-modal', 'ons-speed-dial', 'ons-dialog', 'ons-alert-dialog', 'ons-popover', 'ons-action-sheet'];
    return el.hasAttribute('inline') || fixedElements.indexOf(tagName) === -1;
  }

  _show() {
    if (!this._isShown && util.isAttached(this)) {
      this._isShown = true;
      this.onShow && this.onShow();
      util.triggerElementEvent(this, 'show');
      util.propagateAction(this, '_show');
    }
  }

  _hide() {
    if (this._isShown) {
      this._isShown = false;
      this.onHide && this.onHide();
      util.triggerElementEvent(this, 'hide');
      util.propagateAction(this, '_hide');
    }
  }

  _destroy() {
    this._hide();

    this.onDestroy && this.onDestroy();
    util.triggerElementEvent(this, 'destroy');

    if (this.onDeviceBackButton) {
      this.onDeviceBackButton.destroy();
    }

    util.propagateAction(this, '_destroy');

    this.remove();
  }

  _deriveHooks() {
    this.constructor.events.forEach(event => {
      const key = 'on' + event.charAt(0).toUpperCase() + event.slice(1);
      Object.defineProperty(this, key, {
        enumerable: true,
        get: () => this[`_${key}`],
        set: value => {
          if (!(value instanceof Function)) {
            throw new Error(`${key} hook must be a function`);
          }
          this[`_${key}`] = value.bind(this);
        }
      });
    });
  }

  static get events() {
    return ['init', 'show', 'hide', 'destroy'];
  }

  /**
   * @property data
   * @type {*}
   * @description
   *   [en]User's custom data passed to `pushPage()`-like methods.[/en]
   *   [ja][/ja]
   */
}

customElements.define('ons-page', PageElement);
