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
import platform from 'ons/platform';
import internal from 'ons/internal';
import autoStyle from 'ons/autostyle';
import ModifierUtil from 'ons/internal/modifier-util';
import BaseElement from 'ons/base-element';
import animatorFactory from './animator';
import contentReady from 'ons/content-ready';

const scheme = {
  '.tab-bar__content': 'tab-bar--*__content',
  '.tab-bar': 'tab-bar--*'
};

const rewritables = {
  /**
   * @param {Element} tabbarElement
   * @param {Function} callback
   */
  ready(tabbarElement, callback) {
    callback();
  },

  /**
   * @param {Element} tabbarElement
   * @param {Element} target
   * @param {Object} options
   * @param {Function} callback
   */
  link(tabbarElement, target, options, callback) {
    callback(target);
  },

  /**
   * @param {Element} tabbarElement
   * @param {Element} target
   * @param {Function} callback
   */
  unlink(tabbarElement, target, callback) {
    callback(target);
  }
};

/**
 * @element ons-tabbar
 * @category tabbar
 * @description
 *   [en]A component to display a tab bar on the bottom of a page. Used with `<ons-tab>` to manage pages using tabs.[/en]
 *   [ja]タブバーをページ下部に表示するためのコンポーネントです。ons-tabと組み合わせて使うことで、ページを管理できます。[/ja]
 * @codepen pGuDL
 * @tutorial vanilla/Reference/tabbar
 * @guide UsingTabBar
 *   [en]Using tab bar[/en]
 *   [ja]タブバーを使う[/ja]
 * @guide EventHandling
 *   [en]Event handling descriptions[/en]
 *   [ja]イベント処理の使い方[/ja]
 * @guide CallingComponentAPIsfromJavaScript
 *   [en]Using navigator from JavaScript[/en]
 *   [ja]JavaScriptからコンポーネントを呼び出す[/ja]
 * @guide DefiningMultiplePagesinSingleHTML
 *   [en]Defining multiple pages in single html[/en]
 *   [ja]複数のページを1つのHTMLに記述する[/ja]
 * @seealso ons-tab
 *   [en]The `<ons-tab>` component.[/en]
 *   [ja]ons-tabコンポーネント[/ja]
 * @seealso ons-page
 *   [en]The `<ons-page>` component.[/en]
 *   [ja]ons-pageコンポーネント[/ja]
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
class TabbarElement extends BaseElement {

  /**
   * @event prechange
   * @description
   *   [en]Fires just before the tab is changed.[/en]
   *   [ja]アクティブなタブが変わる前に発火します。[/ja]
   * @param {Object} event
   *   [en]Event object.[/en]
   *   [ja]イベントオブジェクト。[/ja]
   * @param {Number} event.index
   *   [en]Current index.[/en]
   *   [ja]現在アクティブになっているons-tabのインデックスを返します。[/ja]
   * @param {Object} event.tabItem
   *   [en]Tab item object.[/en]
   *   [ja]tabItemオブジェクト。[/ja]
   * @param {Function} event.cancel
   *   [en]Call this function to cancel the change event.[/en]
   *   [ja]この関数を呼び出すと、アクティブなタブの変更がキャンセルされます。[/ja]
   */

  /**
   * @event postchange
   * @description
   *   [en]Fires just after the tab is changed.[/en]
   *   [ja]アクティブなタブが変わった後に発火します。[/ja]
   * @param {Object} event
   *   [en]Event object.[/en]
   *   [ja]イベントオブジェクト。[/ja]
   * @param {Number} event.index
   *   [en]Current index.[/en]
   *   [ja]現在アクティブになっているons-tabのインデックスを返します。[/ja]
   * @param {Object} event.tabItem
   *   [en]Tab item object.[/en]
   *   [ja]tabItemオブジェクト。[/ja]
   */

  /**
   * @event reactive
   * @description
   *   [en]Fires if the already open tab is tapped again.[/en]
   *   [ja]すでにアクティブになっているタブがもう一度タップやクリックされた場合に発火します。[/ja]
   * @param {Object} event
   *   [en]Event object.[/en]
   *   [ja]イベントオブジェクト。[/ja]
   * @param {Number} event.index
   *   [en]Current index.[/en]
   *   [ja]現在アクティブになっているons-tabのインデックスを返します。[/ja]
   * @param {Object} event.tabItem
   *   [en]Tab item object.[/en]
   *   [ja]tabItemオブジェクト。[/ja]
   */

  /**
   * @attribute animation
   * @type {String}
   * @default none
   * @description
   *   [en]Animation name. Available values are `"none"`, `"slide"` and `"fade"`. Default is `"none"`.[/en]
   *   [ja]ページ読み込み時のアニメーションを指定します。"none"、"fade"、"slide"のいずれかを選択できます。デフォルトは"none"です。[/ja]
   */

  /**
   * @attribute animation-options
   * @type {Expression}
   * @description
   *  [en]Specify the animation's duration, timing and delay with an object literal. E.g. `{duration: 0.2, delay: 1, timing: 'ease-in'}`.[/en]
   *  [ja]アニメーション時のduration, timing, delayをオブジェクトリテラルで指定します。e.g. {duration: 0.2, delay: 1, timing: 'ease-in'}[/ja]
   */

  /**
   * @attribute position
   * @initonly
   * @type {String}
   * @default bottom
   * @description
   *   [en]Tabbar's position. Available values are `"bottom"` and `"top"`. Use `"auto"` to choose position depending on platform (iOS bottom, Android top).[/en]
   *   [ja]タブバーの位置を指定します。"bottom"もしくは"top"を選択できます。デフォルトは"bottom"です。[/ja]
   */

  createdCallback() {
    contentReady(this, () => {
      if (!this.hasAttribute('_compiled')) {
        this._compile();
      }

      for (var i = 0; i < this.firstChild.children.length; i++) {
        this.firstChild.children[i].style.display = 'none';
      }

      var activeIndex = this.getAttribute('activeIndex');

      if (activeIndex && this.children[1].children.length > activeIndex) {
        this.children[1].children[activeIndex].setAttribute('active', 'true');
      }

      autoStyle.prepare(this);
      ModifierUtil.initModifier(this, scheme);
    });
    this._animator = options => animatorFactory.newAnimator(this, options);
  }

  get _content() {
    return util.findChild(this, '.tab-bar__content');
  }

  _compile() {
    var content = util.create('.ons-tab-bar__content.tab-bar__content');
    var tabbar = util.create('.tab-bar.ons-tab-bar__footer.ons-tabbar-inner');

    while (this.firstChild) {
      tabbar.appendChild(this.firstChild);
    }

    this.appendChild(content);
    this.appendChild(tabbar);

    this._updatePosition();

    this.setAttribute('_compiled', '');
  }

  _updatePosition(position = this.getAttribute('position')) {
    var top = this._top = position === 'top' || (position === 'auto' && platform.isAndroid());
    var action = top ? util.addModifier : util.removeModifier;

    action(this, 'top');

    var page = util.findParent(this, 'ons-page');
    if (page) {
      this.style.top = top ? window.getComputedStyle(page._content, null).getPropertyValue('padding-top') : '';

      if (util.match(page.firstChild, 'ons-toolbar')) {
        action(page.firstChild, 'noshadow');
      }
    }

    internal.autoStatusBarFill(() => {
      const filled = util.findParent(this, e => e.hasAttribute('status-bar-fill'));
      util.toggleAttribute(this, 'status-bar-fill', top && !filled);
    });
  }

  get _tabbar() {
    return util.findChild(this, '.tab-bar');
  }

  /**
   * @method loadPage
   * @signature loadPage(url, [options])
   * @param {String} url
   *   [en]Page URL. Can be either an HTML document or an `<ons-template>` id.[/en]
   *   [ja]pageのURLか、もしくはons-templateで宣言したid属性の値を利用できます。[/ja]
   * @description
   *   [en]Displays a new page without changing the active index.[/en]
   *   [ja]現在のアクティブなインデックスを変更せずに、新しいページを表示します。[/ja]
   * @param {Object} [options]
   *   [en][/en]
   *   [ja][/ja]
   * @param {Object} [options.animation]
   *   [en][/en]
   *   [ja][/ja]
   * @param {Object} [options.callback]
   *   [en][/en]
   *   [ja][/ja]
   * @return {Promise}
   *   [en]Resolves to the new page element.[/en]
   *   [ja][/ja]
   */
  loadPage(page, options = {}) {
    return new Promise(resolve => {
      OnsTabElement.prototype._createPageElement(page, pageElement => {
        resolve(this._loadPageDOMAsync(pageElement, options));
      });
    });
  }

  /**
   * @param {Element} pageElement
   * @param {Object} [options]
   * @param {Object} [options.animation]
   * @param {Object} [options.callback]
   * @return {Promise} Resolves to the new page element.
   */
  _loadPageDOMAsync(pageElement, options = {}) {
    return new Promise(resolve => {
      rewritables.link(this, pageElement, options, pageElement => {
        this._content.appendChild(pageElement);

        if (this.getActiveTabIndex() !== -1) {
          resolve(this._switchPage(pageElement, options));
        } else {
          if (options.callback instanceof Function) {
              options.callback();
          }

          this._oldPage = pageElement;
          resolve(pageElement);
        }
      });
    });
  }

  /**
   * @return {Element/null}
   */
  _getCurrentPageElement() {
    const page = util.findChild(this._content, e => e.style.display !== 'none') || null;

    if (page && page.nodeName.toLowerCase() !== 'ons-page') {
      throw new Error('Invalid state: page element must be a "ons-page" element.');
    }

    return page;
  }

  get pages() {
    return util.arrayFrom(this._content.children);
  }

  /**
   * @param {Element} element
   * @param {Object} options
   * @param {String} [options.animation]
   * @param {Function} [options.callback]
   * @param {Object} [options.animationOptions]
   * @param {Number} options.newindex
   * @param {Number} options.oldIndex
   * @return {Promise} Resolves to the new page element.
   */
  _switchPage(newPage, options) {
    const oldPage = this._oldPage;

    return util.executeAction(this, 'switchTab', util.extend({newPage, oldPage}, options), {
      before: () => oldPage && oldPage._hide(),
      after: () => {
        if (oldPage) {
          oldPage.style.display = 'none';
        }
        newPage.style.display = 'block';

        newPage._show();
        this._oldPage = newPage;
      },
      resolveTo: newPage
    });
  }

  /**
   * @method setActiveTab
   * @signature setActiveTab(index, [options])
   * @param {Number} index
   *   [en]Tab index.[/en]
   *   [ja]タブのインデックスを指定します。[/ja]
   * @param {Object} [options]
   *   [en]Parameter object.[/en]
   *   [ja]オプションを指定するオブジェクト。[/ja]
   * @param {Boolean} [options.keepPage]
   *   [en]If true the page will not be changed.[/en]
   *   [ja]タブバーが現在表示しているpageを変えない場合にはtrueを指定します。[/ja]
   * @param {String} [options.animation]
   *   [en]Animation name. Available animations are `"fade"`, `"slide"` and `"none"`.[/en]
   *   [ja]アニメーション名を指定します。`"fade"`、`"slide"`、`"none"`のいずれかを指定できます。[/ja]
   * @param {String} [options.animationOptions]
   *   [en]Specify the animation's duration, delay and timing. E.g. `{duration: 0.2, delay: 0.4, timing: 'ease-in'}`.[/en]
   *   [ja]アニメーション時のduration, delay, timingを指定します。e.g. {duration: 0.2, delay: 0.4, timing: 'ease-in'}[/ja]
   * @description
   *   [en]Show specified tab page. Animations and other options can be specified by the second parameter.[/en]
   *   [ja]指定したインデックスのタブを表示します。アニメーションなどのオプションを指定できます。[/ja]
   * @return {Promise}
   *   [en]Resolves to the new page element.[/en]
   *   [ja][/ja]
   */
  setActiveTab(index, options = {}) {
    const selectedTab = this._tabbar.children[index],
      oldIndex = this.getActiveTabIndex(),
      previousPage = this._getCurrentPageElement(),
      eventData = {index, tabItem: selectedTab},
      callback = options.callback;

    if (!selectedTab) {
      return Promise.reject('Specified index does not match any tab.');
    }

    if (index === oldIndex) {
      util.triggerElementEvent(this, 'reactive', eventData);

      return Promise.resolve(previousPage);
    }

    if (util.emitEvent(this, 'prechange', eventData)) {
      return Promise.reject('Canceled in prechange event.');
    }

    selectedTab.setActive();

    util.arrayFrom(this._tabbar.children).forEach(tab => {
      if (tab != selectedTab) {
        tab.setInactive();
      }
    });

    if (selectedTab.isLoaded() || options.keepPage) {
      util.triggerElementEvent(this, 'postchange', eventData);
      return Promise.resolve(previousPage);
    }

    const params = util.extend({}, options, {
      oldIndex: oldIndex,
      newIndex: index,
      callback: () => {
        util.triggerElementEvent(this, 'postchange', eventData);
        callback && callback();
      }
    });

    const link = (element, callback) => {
      rewritables.link(this, element, options, callback);
    };

    return new Promise(resolve => {
      selectedTab._loadPageElement(page => {
        if (!util.isAttached(page)) {
          this._content.appendChild(page);
        }

        page.removeAttribute('style');
        resolve(this._switchPage(page, params));
      }, link);
    });
  }


  /**
   * @method setTabbarVisibility
   * @signature setTabbarVisibility(visible)
   * @param {Boolean} visible
   * @description
   *   [en]Used to hide or show the tab bar.[/en]
   *   [ja][/ja]
   */
  setTabbarVisibility(visible) {
    this._content.style[this._top ? 'top' : 'bottom'] = visible ? '' : '0px';
    this._tabbar.style.display = visible ? '' : 'none';
  }

  /**
   * @method getActiveTabIndex
   * @signature getActiveTabIndex()
   * @return {Number}
   *   [en]The index of the currently active tab.[/en]
   *   [ja]現在アクティブになっているタブのインデックスを返します。[/ja]
   * @description
   *   [en]Returns tab index on current active tab. If active tab is not found, returns -1.[/en]
   *   [ja]現在アクティブになっているタブのインデックスを返します。現在アクティブなタブがない場合には-1を返します。[/ja]
   */
  getActiveTabIndex() {
    var tabs = this._tabbar.children;

    for (var i = 0; i < tabs.length; i++) {
      if (tabs[i] instanceof window.OnsTabElement && tabs[i].isActive && tabs[i].isActive()) {
        return i;
      }
    }

    return -1;
  }

  detachedCallback() { }

  attachedCallback() { }

  _show() {
    const currentPageElement = this._getCurrentPageElement();
    if (currentPageElement) {
      currentPageElement._show();
    }
  }

  _hide() {
    const currentPageElement = this._getCurrentPageElement();
    if (currentPageElement) {
      currentPageElement._hide();
    }
  }

  _destroy() {
    const pages = this._content.children;
    for (let i = pages.length - 1; i >= 0; i--) {
      pages[i]._destroy();
    }
    this.remove();
  }

  attributeChangedCallback(name, last, current) {
    if (name === 'modifier') {
      return ModifierUtil.onModifierChanged(last, current, this, scheme);
    }
  }
}

window.OnsTabbarElement = document.registerElement('ons-tabbar', {
  prototype: TabbarElement.prototype
});
animatorFactory.assign(window.OnsTabbarElement);

window.OnsTabbarElement.rewritables = rewritables;

export default OnsTabbarElement;
