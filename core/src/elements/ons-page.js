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
import DeviceBackButtonDispatcher from 'ons/device-back-button-dispatcher';
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
 * @description
 *   [en]Should be used as root component of each page. The content inside page component is scrollable.[/en]
 *   [ja]ページ定義のためのコンポーネントです。このコンポーネントの内容はスクロールが許可されます。[/ja]
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
 * @example
 * <ons-page>
 *   <ons-toolbar>
 *     <div class="center">Title</div>
 *   </ons-toolbar>
 *
 *   ...
 * </ons-page>
 *
 *
 * // Infinite Scroll handler
 * page.onInfiniteScroll = function(done) {
 *   // load more content and call done
 * };
 */
class PageElement extends BaseElement {

  /**
   * @event init
   * @description
   *   [en]Fired right after the page is attached.[/en]
   *   [ja]ページがアタッチされた後に発火します。[/ja]
   * @param {Object} event [en]Event object.[/en]
   * @param {Object} event.page
   *   [en]Page object.[/en]
   *   [ja]ページのオブジェクト。[/ja]
   */

  /**
   * @event show
   * @description
   *   [en]Fired right after the page is shown.[/en]
   *   [ja]ページが表示された後に発火します。[/ja]
   * @param {Object} event [en]Event object.[/en]
   * @param {Object} event.page
   *   [en]Page object.[/en]
   *   [ja]ページのオブジェクト。[/ja]
   */

  /**
   * @event hide
   * @description
   *   [en]Fired right after the page is hidden.[/en]
   *   [ja]ページが隠れた後に発火します。[/ja]
   * @param {Object} event [en]Event object.[/en]
   * @param {Object} event.page
   *   [en]Page object.[/en]
   *   [ja]ページのオブジェクト。[/ja]
   */

  /**
   * @event destroy
   * @description
   *   [en]Fired right before the page is destroyed.[/en]
   *   [ja]ページが破棄される前に発火します。[/ja]
   * @param {Object} event [en]Event object.[/en]
   * @param {Object} event.page
   *   [en]Page object.[/en]
   *   [ja]ページのオブジェクト。[/ja]
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

  /**
   * @property onInfiniteScroll
   * @description
   *  [en]Function to be executed on infinite scroll. The function receives a done callback that must be called when it's finished.[/en]
   *  [ja][/ja]
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
      this.eventDetail = {
        page: this
      };
      this.options = {};
    });
  }

  attachedCallback() {
    contentReady(this, () => {
      if (!this._isMuted) {
        if (this._skipInit) {
          this.removeAttribute('_skipinit');
        } else {
          setImmediate(() => util.triggerElementEvent(this, 'init', this.eventDetail));
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

  updateBackButton(shouldShowButton) {
    if (this.backButton) {
      if (shouldShowButton) {
        this.backButton.show();
      } else {
        this.backButton.hide();
      }
    }
  }

  set name(str) {
    this.setAttribute('name', str);
  }

  get name() {
   return this.getAttribute('name');
  }

  get backButton() {
    return util.findChildRecursively(this, 'ons-back-button');
  }

  _tryToFillStatusBar(){
    return internal.shouldFillStatusBar(this).then(
      () => this.setAttribute('status-bar-fill', ''),
      () => this.removeAttribute('status-bar-fill')
    );
  }

  /**
   * @return {boolean}
   */
  get isShown() {
    return this._isShown;
  }

  /**
   * @param {boolean}
   */
  set isShown(value) {
    this._isShown = value;
  }

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

  _onScroll() {
    const c = this._contentElement,
      overLimit = (c.scrollTop + c.clientHeight) / c.scrollHeight >= this._infiniteScrollLimit;

    if (this._onInfiniteScroll && !this._loadingContent && overLimit) {
      this._loadingContent = true;
      this._onInfiniteScroll(() => this._loadingContent = false);
    }
  }

  /**
   * @method getDeviceBackButtonHandler
   * @signature getDeviceBackButtonHandler()
   * @return {Object/null}
   *   [en]Device back button handler.[/en]
   *   [ja]デバイスのバックボタンハンドラを返します。[/ja]
   * @description
   *   [en]Get the associated back button handler. This method may return null if no handler is assigned.[/en]
   *   [ja]バックボタンハンドラを取得します。このメソッドはnullを返す場合があります。[/ja]
   */
  getDeviceBackButtonHandler() {
    return this._deviceBackButtonHandler || null;
  }

  /**
   * @method setDeviceBackButtonHandler
   * @signature setDeviceBackButtonHandler(callback)
   * @param {Function} callback
   *   [en]Device back button handler.[/en]
   *   [ja]デバイスのバックボタンハンドラを返します。[/ja]
   * @description
   *   [en]Set the associated back button handler.[/en]
   *   [ja]バックボタンハンドラを設定します。[/ja]
   */
  setDeviceBackButtonHandler(callback) {
    if (this._deviceBackButtonHandler) {
      this._deviceBackButtonHandler.destroy();
    }

    this._deviceBackButtonHandler = DeviceBackButtonDispatcher.createHandler(this, callback);
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
    this._contentElement.setAttribute('no-status-bar-fill', '');
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

    if (!util.findChild(this, '.page__background') || !util.findChild(this, '.page__content')) {

      const background = util.create('.page__background');
      const content = util.create('.page__content');

      while (this.firstChild) {
        content.appendChild(this.firstChild);
      }

      this.appendChild(background);
      this.appendChild(content);
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
    if (!this.isShown && util.isAttached(this)) {
      this.isShown = true;

      if (!this._isMuted) {
        util.triggerElementEvent(this, 'show', this.eventDetail);
      }

      util.propagateAction(this._contentElement, '_show');
    }
  }

  _hide() {
    if (this.isShown) {
      this.isShown = false;

      if (!this._isMuted) {
        util.triggerElementEvent(this, 'hide', this.eventDetail);
      }

      util.propagateAction(this._contentElement, '_hide');
    }
  }

  _destroy() {
    this._hide();

    if (!this._isMuted) {
      util.triggerElementEvent(this, 'destroy', this.eventDetail);
    }

    if (this.getDeviceBackButtonHandler()) {
      this.getDeviceBackButtonHandler().destroy();
    }

    util.propagateAction(this._contentElement, '_destroy');

    this.remove();
  }

  /**
   * @property name
   * @readonly
   * @type {String}
   * @description
   *   [en]Page's name. Matches its filename or ons-template ID if applicable.[/en]
   *   [ja][/ja]
   */
  get name() {
    return this._name;
  }

  /**
   * @property data
   * @type {*}
   * @description
   *   [en]User's custom data passed to pushPage-like methods.[/en]
   *   [ja][/ja]
   */
}

window.OnsPageElement = document.registerElement('ons-page', {
  prototype: PageElement.prototype
});
