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
import internal from 'ons/internal';
import autoStyle from 'ons/autostyle';
import ModifierUtil from 'ons/internal/modifier-util';
import BaseElement from 'ons/base-element';
import deviceBackButtonDispatcher from 'ons/device-back-button-dispatcher';
import contentReady from 'ons/content-ready';

const scheme = {
  '': 'page--*',
  '.page__content': 'page--*__content',
  '.page__background': 'page--*__background'
};

const nullToolbarElement = document.createElement('ons-toolbar');

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
 * @guide ManagingMultiplePages
 *   [en]Managing multiple pages[/en]
 *   [ja]複数のページを管理する[/ja]
 * @guide Pagelifecycle
 *   [en]Page life cycle events[/en]
 *   [ja]ページライフサイクルイベント[/ja]
 * @guide HandlingBackButton
 *   [en]Handling back button[/en]
 *   [ja]バックボタンに対応する[/ja]
 * @guide OverridingCSSstyles
 *   [en]Overriding CSS styles[/en]
 *   [ja]CSSスタイルのオーバーライド[/ja]
 * @guide DefiningMultiplePagesinSingleHTML
 *   [en]Defining multiple pages in single html[/en]
 *   [ja]複数のページを1つのHTMLに記述する[/ja]
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
 * // Infinite Scroll handler
 * page.onInfiniteScroll = function(done) {
 *   loadMore().then(done);
 * };
 */
class PageElement extends BaseElement {

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

  createdCallback() {
    this.classList.add('page');

    contentReady(this, () => {
      if (!this.hasAttribute('_compiled')) {
        this._compile();
      }

      this._isShown = false;
      this._contentElement = this._getContentElement();
      this._isMuted = this.hasAttribute('_muted');
      this._skipInit = this.hasAttribute('_skipinit');
      this.pushedOptions = {};
    });
  }

  attachedCallback() {
    contentReady(this, () => {
      if (!this._isMuted) {
        if (this._skipInit) {
          this.removeAttribute('_skipinit');
        } else {
          setImmediate(() => util.triggerElementEvent(this, 'init'));
        }
      }

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
      const filled = util.findParent(this, e => e.hasAttribute('status-bar-fill'));
      util.toggleAttribute(this, 'status-bar-fill', !filled && (this._canAnimateToolbar() || !this._hasAPageControlChild()));
    });
  }

  _hasAPageControlChild() {
    return util.findChild(this._contentElement, e => e.nodeName.match(/ons-(splitter|sliding-menu|navigator|tabbar)/i));
  }

  /**
   * @property onInfiniteScroll
   * @description
   *  [en]Function to be executed when scrolling to the bottom of the page. The function receives a done callback as an argument that must be called when it's finished.[/en]
   *  [ja][/ja]
   */
  set onInfiniteScroll(value) {
    if (value === null) {
      this._onInfiniteScroll = null;
      this._contentElement.removeEventListener('scroll', this._boundOnScroll);
      return;
    }
    if (!(value instanceof Function)) {
      throw new Error('onInfiniteScroll must be a function or null');
    }
    if (!this._onInfiniteScroll) {
      this._infiniteScrollLimit = 0.9;
      this._boundOnScroll = this._onScroll.bind(this);
      this._contentElement.addEventListener('scroll', this._boundOnScroll);
    }
    this._onInfiniteScroll = value;
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

  /**
   * Register toolbar element to this page.
   *
   * @param {HTMLElement} element
   */
  _registerToolbar(element) {
    this.insertBefore(element, this.children[0]);
  }

  /**
   * Register toolbar element to this page.
   *
   * @param {HTMLElement} element
   */
  _registerBottomToolbar(element) {
    this.classList.add('page-with-bottom-toolbar');
    this.appendChild(element);
  }

  attributeChangedCallback(name, last, current) {
    if (name === 'modifier') {
      return ModifierUtil.onModifierChanged(last, current, this, scheme);
    } else if (name === '_muted') {
      this._isMuted = this.hasAttribute('_muted');
    } else if (name === '_skipinit') {
      this._skipInit = this.hasAttribute('_skipinit');
    } else if (name === 'on-infinite-scroll') {
      if (current === null) {
        this.onInfiniteScroll = null;
      } else {
        this.onInfiniteScroll = (done) => {
          const f = util.findFromPath(current);
          this.onInfiniteScroll = f;
          f(done);
        };
      }
    }
  }

  _compile() {
    autoStyle.prepare(this);

    if (!util.findChild(this, '.page__content')) {
      const content = util.create('.page__content');

      util.arrayFrom(this.childNodes).forEach(node => {
        if (!node.classList || !node.classList.contains('page__background')) {
          content.appendChild(node);
        }
      });

      this.appendChild(content);
    }

    if (!util.findChild(this, '.page__background')) {
      const background = util.create('.page__background');
      this.insertBefore(background, util.findChild(this, '.page__content'));
    }

    ModifierUtil.initModifier(this, scheme);

    this.setAttribute('_compiled', '');
  }

  _registerExtraElement(element) {
    let extra = util.findChild(this, '.page__extra');
    if (!extra) {
      extra = util.create('.page__extra', {zIndex: 10001});
      this.appendChild(extra);
    }

    extra.appendChild(element);
  }

  _show() {
    if (!this._isShown && util.isAttached(this)) {
      this._isShown = true;

      if (!this._isMuted) {
        util.triggerElementEvent(this, 'show');
      }

      util.propagateAction(this._contentElement, '_show');
    }
  }

  _hide() {
    if (this._isShown) {
      this._isShown = false;

      if (!this._isMuted) {
        util.triggerElementEvent(this, 'hide');
      }

      util.propagateAction(this._contentElement, '_hide');
    }
  }

  _destroy() {
    this._hide();

    if (!this._isMuted) {
      util.triggerElementEvent(this, 'destroy');
    }

    if (this.onDeviceBackButton) {
      this.onDeviceBackButton.destroy();
    }

    util.propagateAction(this._contentElement, '_destroy');

    this.remove();
  }

  /**
   * @property data
   * @type {*}
   * @description
   *   [en]User's custom data passed to `pushPage()`-like methods.[/en]
   *   [ja][/ja]
   */
}

window.OnsPageElement = document.registerElement('ons-page', {
  prototype: PageElement.prototype
});
