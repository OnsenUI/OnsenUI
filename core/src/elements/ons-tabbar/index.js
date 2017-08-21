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

import util from '../../ons/util';
import platform from '../../ons/platform';
import internal from '../../ons/internal';
import autoStyle from '../../ons/autostyle';
import ModifierUtil from '../../ons/internal/modifier-util';
import AnimatorFactory from '../../ons/internal/animator-factory';
import BaseElement from '../base/base-element';
import {TabbarAnimator, TabbarFadeAnimator, TabbarNoneAnimator, TabbarSlideAnimator} from './animator';
import TabElement from '../ons-tab';
import contentReady from '../../ons/content-ready';

const scheme = {
  '.tabbar__content': 'tabbar--*__content',
  '.tabbar': 'tabbar--*'
};

const _animatorDict = {
  'default': TabbarNoneAnimator,
  'fade': TabbarFadeAnimator,
  'slide': TabbarSlideAnimator,
  'none': TabbarNoneAnimator
};

const rewritables = {
  /**
   * @param {Element} tabbarElement
   * @param {Function} callback
   */
  ready(tabbarElement, callback) {
    callback();
  }
};

const generateId = (() => {
  let i = 0;
  return () => 'ons-tabbar-gen-' + (i++);
})();

/**
 * @element ons-tabbar
 * @category tabbar
 * @description
 *   [en]A component to display a tab bar on the bottom of a page. Used with `<ons-tab>` to manage pages using tabs.[/en]
 *   [ja]タブバーをページ下部に表示するためのコンポーネントです。ons-tabと組み合わせて使うことで、ページを管理できます。[/ja]
 * @codepen pGuDL
 * @tutorial vanilla/Reference/tabbar
 * @guide multiple-page-navigation
 *  [en]Managing multiple pages.[/en]
 *  [ja]Managing multiple pages[/ja]
 * @guide templates
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
export default class TabbarElement extends BaseElement {

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

  constructor() {
    super();

    this._tabbarId = generateId();

    contentReady(this, () => {
      this._compile();

      const activeIndex = this.getAttribute('activeIndex');

      const tabbar = this._tabbarElement;
      if (activeIndex && tabbar.children.length > activeIndex) {
        tabbar.children[activeIndex].setAttribute('active', 'true');
      }

      autoStyle.prepare(this);
      ModifierUtil.initModifier(this, scheme);

      this._animatorFactory = new AnimatorFactory({
        animators: _animatorDict,
        baseClass: TabbarAnimator,
        baseClassName: 'TabbarAnimator',
        defaultAnimation: this.getAttribute('animation')
      });
    });
  }

  connectedCallback() {
    contentReady(this, () => this._updatePosition());
  }

  get _contentElement() {
    return util.findChild(this, '.tabbar__content');
  }

  get _tabbarElement() {
    return util.findChild(this, '.tabbar');
  }

  _compile() {
    if (this._contentElement && this._tabbarElement) {
      const content = util.findChild(this, '.tabbar__content');
      const bar = util.findChild(this, '.tabbar');

      content.classList.add('ons-tabbar__content');
      bar.classList.add('ons-tabbar__footer');
    } else {

      const content = util.create('.ons-tabbar__content.tabbar__content');
      const tabbar = util.create('.tabbar.ons-tabbar__footer');

      while (this.firstChild) {
        tabbar.appendChild(this.firstChild);
      }

      this.appendChild(content);
      this.appendChild(tabbar);
    }
  }

  _updatePosition(position = this.getAttribute('position')) {
    const top = this._top = position === 'top' || (position === 'auto' && platform.isAndroid());
    const action = top ? util.addModifier : util.removeModifier;

    action(this, 'top');

    const page = util.findParent(this, 'ons-page');
    if (page) {
      contentReady(page, () => {
        this.style.top = top ? window.getComputedStyle(page._getContentElement(), null).getPropertyValue('padding-top') : '';

        if (page.children[0] && util.match(page.children[0], 'ons-toolbar')) {
          action(page.children[0], 'noshadow');
        }
      });
    }

    internal.autoStatusBarFill(() => {
      const filled = util.findParent(this, e => e.hasAttribute('status-bar-fill'));
      util.toggleAttribute(this, 'status-bar-fill', top && !filled);
    });
  }

  _getTabbarElement() {
    return util.findChild(this, '.tabbar');
  }

  /**
   * @return {String}
   */
  getTabbarId() {
    return this._tabbarId;
  }

  /**
   * @return {Element/null}
   */
  _getCurrentPageElement() {
    const pages = this._contentElement.children;
    let page = null;
    for (var i = 0; i < pages.length; i++) {
      if (pages[i].style.display !== 'none') {
        page = pages[i];
        break;
      }
    }

    if (page && page.nodeName.toLowerCase() !== 'ons-page') {
      throw new Error('Invalid state: page element must be a "ons-page" element.');
    }

    return page;
  }

  get topPage() {
    return this._getCurrentPageElement();
  }

  get pages() {
    return util.arrayFrom(this._contentElement.children);
  }

  /**
   * @param {Element} element
   * @param {Object} options
   * @param {String} [options.animation]
   * @param {Function} [options.callback]
   * @param {Object} [options.animationOptions]
   * @param {Number} options.selectedTabIndex
   * @param {Number} options.previousTabIndex
   * @return {Promise} Resolves to the new page element.
   */
  _switchPage(element, options) {
    const oldPageElement = this._oldPageElement || internal.nullElement;
    this._oldPageElement = element;
    const animator = this._animatorFactory.newAnimator(options);

    return new Promise(resolve => {
      if (oldPageElement !== internal.nullElement) {
        oldPageElement._hide();
      }

      animator.apply(element, oldPageElement, options.selectedTabIndex, options.previousTabIndex, () => {
        if (oldPageElement !== internal.nullElement) {
          oldPageElement.style.display = 'none';
        }

        element.style.display = 'block';
        element._show();

        if (options.callback instanceof Function) {
          options.callback();
        }

        resolve(element);
      });
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
    if (options && typeof options != 'object') {
      throw new Error('options must be an object. You supplied ' + options);
    }

    options.animationOptions = util.extend(
      options.animationOptions || {},
      AnimatorFactory.parseAnimationOptionsString(this.getAttribute('animation-options'))
    );

    if (!options.animation && this.hasAttribute('animation')) {
      options.animation = this.getAttribute('animation');
    }

    const previousTab = this._getActiveTabElement(),
      selectedTab = this._getTabElement(index),
      previousTabIndex = this.getActiveTabIndex(),
      selectedTabIndex = index,
      previousPageElement = this._getCurrentPageElement();

    if (!selectedTab) {
      return Promise.reject('Specified index does not match any tab.');
    }

    if (selectedTabIndex === previousTabIndex) {
      util.triggerElementEvent(this, 'reactive', {
        index: selectedTabIndex,
        tabItem: selectedTab
      });

      return Promise.resolve(previousPageElement);
    }

    let canceled = false;

    util.triggerElementEvent(this, 'prechange', {
      index: selectedTabIndex,
      tabItem: selectedTab,
      cancel: () => canceled = true
    });

    if (canceled) {
      selectedTab.setInactive();
      if (previousTab) {
        previousTab.setActive();
      }
      return Promise.reject('Canceled in prechange event.');
    }

    selectedTab.setActive();

    const params = {
      ...options,
      previousTabIndex: previousTabIndex,
      selectedTabIndex: selectedTabIndex
    };

    if (previousTab) {
      previousTab.setInactive();
    } else {
      params.animation = 'none';
    }

    return new Promise(resolve => {
      selectedTab._loadPageElement(this._contentElement, pageElement => {
        pageElement.removeAttribute('style');

        this._switchPage(pageElement, params)
          .then(page => {
            util.triggerElementEvent(this, 'postchange', {
              index: selectedTabIndex,
              tabItem: selectedTab
            });

            return resolve(page);
          });
      });
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
    this._contentElement.style[this._top ? 'top' : 'bottom'] = visible ? '' : '0px';
    this._getTabbarElement().style.display = visible ? '' : 'none';
  }

  show() {
    this.setTabbarVisibility(true);
  }

  hide() {
    this.setTabbarVisibility(false);
  }

  /**
   * @property visible
   * @readonly
   * @type {Boolean}
   * @description
   *   [en]Whether the tabbar is visible or not.[/en]
   *   [ja]タブバーが見える場合に`true`。[/ja]
   */
  get visible() {
    return this._getTabbarElement().style.display !== 'none';
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
    const tabs = this._getTabbarElement().children;

    for (var i = 0; i < tabs.length; i++) {
      if (tabs[i] instanceof TabElement && tabs[i].isActive && tabs[i].isActive()) {
        return i;
      }
    }

    return -1;
  }

  /**
   * @return {Number} When active tab is not found, returns -1.
   */
  _getActiveTabElement() {
    return this._getTabElement(this.getActiveTabIndex());
  }

  /**
   * @return {Element}
   */
  _getTabElement(index) {
    return this._getTabbarElement().children[index];
  }

  disconnectedCallback() { }

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
    const tabs = this._getTabbarElement().children;
    for (let i = tabs.length - 1; i >= 0; i--) {
      tabs[i].remove();
    }
    this.remove();
  }

  static get observedAttributes() {
    return ['modifier', 'position'];
  }

  attributeChangedCallback(name, last, current) {
    if (name === 'modifier') {
      ModifierUtil.onModifierChanged(last, current, this, scheme);
      const isTop = m => /(^|\s+)top($|\s+)/i.test(m);
      isTop(last) !== isTop(current) && this._updatePosition();
    } else if(name === 'position') {
      this._updatePosition();
    }
  }

  static get rewritables() {
    return rewritables;
  }

  static get TabbarAnimator() {
    return TabbarAnimator;
  }

  static get events() {
    return ['prechange', 'postchange', 'reactive'];
  }

  /**
   * @param {String} name
   * @param {Function} Animator
   */
  static registerAnimator(name, Animator) {
    if (!(Animator.prototype instanceof TabbarAnimator)) {
      throw new Error('"Animator" param must inherit TabbarElement.TabbarAnimator');
    }
    _animatorDict[name] = Animator;
  }

  static get animators() {
    return _animatorDict;
  }
}

customElements.define('ons-tabbar', TabbarElement);
