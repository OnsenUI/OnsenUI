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
import AnimatorFactory from 'ons/internal/animator-factory';
import NavigatorTransitionAnimator from './animator';
import IOSSlideNavigatorTransitionAnimator from './ios-slide-animator';
import IOSLiftNavigatorTransitionAnimator from './ios-lift-animator';
import IOSFadeNavigatorTransitionAnimator from './ios-fade-animator';
import MDSlideNavigatorTransitionAnimator from './md-slide-animator';
import MDLiftNavigatorTransitionAnimator from './md-lift-animator';
import MDFadeNavigatorTransitionAnimator from './md-fade-animator';
import NoneNavigatorTransitionAnimator from './none-animator';
import platform from 'ons/platform';
import BaseElement from 'ons/base-element';
import deviceBackButtonDispatcher from 'ons/device-back-button-dispatcher';

const _animatorDict = {
  'default': () => platform.isAndroid() ? MDFadeNavigatorTransitionAnimator : IOSSlideNavigatorTransitionAnimator,
  'slide': () => platform.isAndroid() ? MDSlideNavigatorTransitionAnimator : IOSSlideNavigatorTransitionAnimator,
  'lift': () => platform.isAndroid() ? MDLiftNavigatorTransitionAnimator : IOSLiftNavigatorTransitionAnimator,
  'fade': () => platform.isAndroid() ? MDFadeNavigatorTransitionAnimator : IOSFadeNavigatorTransitionAnimator,
  'slide-ios': IOSSlideNavigatorTransitionAnimator,
  'slide-md': MDSlideNavigatorTransitionAnimator,
  'lift-ios': IOSLiftNavigatorTransitionAnimator,
  'lift-md': MDLiftNavigatorTransitionAnimator,
  'fade-ios': IOSFadeNavigatorTransitionAnimator,
  'fade-md': MDFadeNavigatorTransitionAnimator,
  'none': NoneNavigatorTransitionAnimator
};

const rewritables = {
  /**
   * @param {Element} navigatorSideElement
   * @param {Function} callback
   */
  ready(navigatorElement, callback) {
    callback();
  },

  /**
   * @param {Element} navigatorElement
   * @param {Element} target
   * @param {Object} options
   * @param {Function} callback
   */
  link(navigatorElement, target, options, callback) {
    callback(target);
  }
};

/**
 * @element ons-navigator
 * @category navigation
 * @description
 *   [en]
 *     A component that provides page stack management and navigation. Stack navigation is the most common navigation pattern for mobile apps.
 *
 *     When a page is pushed on top of the stack it is displayed with a transition animation. When the user returns to the previous page the top page will be popped from the top of the stack and hidden with an opposite transition animation.
 *   [/en]
 *   [ja][/ja]
 * @codepen yrhtv
 * @tutorial vanilla/Reference/navigator
 * @guide PageNavigation
 *   [en]Guide for page navigation[/en]
 *   [ja]ページナビゲーションの概要[/ja]
 * @guide CallingComponentAPIsfromJavaScript
 *   [en]Using navigator from JavaScript[/en]
 *   [ja]JavaScriptからコンポーネントを呼び出す[/ja]
 * @guide EventHandling
 *   [en]Event handling descriptions[/en]
 *   [ja]イベント処理の使い方[/ja]
 * @guide DefiningMultiplePagesinSingleHTML
 *   [en]Defining multiple pages in single html[/en]
 *   [ja]複数のページを1つのHTMLに記述する[/ja]
 * @seealso ons-toolbar
 *   [en]The `<ons-toolbar>` component is used to display a toolbar on the top of a page.[/en]
 *   [ja][/ja]
 * @seealso ons-back-button
 *   [en]The `<ons-back-button>` component lets the user return to the previous page.[/en]
 *   [ja][/ja]
 * @example
 * <ons-navigator id="navigator">
 *   <ons-page>
 *     <ons-toolbar>
 *       <div class="center">
 *         Title
 *       </div>
 *     </ons-toolbar>
 *     <p>
 *       <ons-button
 *         onclick="document.getElementById('navigator').pushPage('page.html')">
 *         Push page
 *       </ons-button>
 *     </p>
 *   </ons-page>
 * </ons-navigator>
 *
 * <ons-template id="page.html">
 *   <ons-page>
 *     <ons-toolbar>
 *       <div class="left">
 *         <ons-back-button>Back</ons-back-button>
 *       </div>
 *       <div class="center">
 *         Another page
 *       </div>
 *     </ons-toolbar>
 *   </ons-page>
 * </ons-template>
 */
class NavigatorElement extends BaseElement {

  /**
   * @attribute page
   * @initonly
   * @type {String}
   * @description
   *   [en]First page to show when navigator is initialized.[/en]
   *   [ja]ナビゲーターが初期化された時に表示するページを指定します。[/ja]
   */

  /**
   * @attribute animation
   * @type {String}
   * @default default
   * @description
   *   [en]
   *     Animation name. Available animations are `"slide"`, `"lift"`, `"fade"` and `"none"`.
   *
   *     These are platform based animations. For fixed animations, add `"-ios"` or `"-md"` suffix to the animation name. E.g. `"lift-ios"`, `"lift-md"`. Defaults values are `"slide-ios"` and `"fade-md"` depending on the platform.
   *   [/en]
   *   [ja][/ja]
   */

  /**
   * @attribute animation-options
   * @type {Expression}
   * @description
   *  [en]Specify the animation's duration, timing and delay with an object literal. E.g. `{duration: 0.2, delay: 1, timing: 'ease-in'}`[/en]
   *  [ja]アニメーション時のduration, timing, delayをオブジェクトリテラルで指定します。e.g. `{duration: 0.2, delay: 1, timing: 'ease-in'}`[/ja]
   */

  /**
   * @event prepush
   * @description
   *   [en]Fired just before a page is pushed.[/en]
   *   [ja]pageがpushされる直前に発火されます。[/ja]
   * @param {Object} event [en]Event object.[/en]
   * @param {Object} event.navigator
   *   [en]Component object.[/en]
   *   [ja]コンポーネントのオブジェクト。[/ja]
   * @param {Object} event.currentPage
   *   [en]Current page object.[/en]
   *   [ja]現在のpageオブジェクト。[/ja]
   * @param {Function} event.cancel
   *   [en]Call this function to cancel the push.[/en]
   *   [ja]この関数を呼び出すと、push処理がキャンセルされます。[/ja]
   */

  /**
   * @event prepop
   * @description
   *   [en]Fired just before a page is popped.[/en]
   *   [ja]pageがpopされる直前に発火されます。[/ja]
   * @param {Object} event [en]Event object.[/en]
   * @param {Object} event.navigator
   *   [en]Component object.[/en]
   *   [ja]コンポーネントのオブジェクト。[/ja]
   * @param {Object} event.currentPage
   *   [en]Current page object.[/en]
   *   [ja]現在のpageオブジェクト。[/ja]
   * @param {Function} event.cancel
   *   [en]Call this function to cancel the pop.[/en]
   *   [ja]この関数を呼び出すと、pageのpopがキャンセルされます。[/ja]
   */

  /**
   * @event postpush
   * @description
   *   [en]Fired just after a page is pushed.[/en]
   *   [ja]pageがpushされてアニメーションが終了してから発火されます。[/ja]
   * @param {Object} event [en]Event object.[/en]
   * @param {Object} event.navigator
   *   [en]Component object.[/en]
   *   [ja]コンポーネントのオブジェクト。[/ja]
   * @param {Object} event.enterPage
   *   [en]Object of the next page.[/en]
   *   [ja]pushされたpageオブジェクト。[/ja]
   * @param {Object} event.leavePage
   *   [en]Object of the previous page.[/en]
   *   [ja]以前のpageオブジェクト。[/ja]
   */

  /**
   * @event postpop
   * @description
   *   [en]Fired just after a page is popped.[/en]
   *   [ja]pageがpopされてアニメーションが終わった後に発火されます。[/ja]
   * @param {Object} event [en]Event object.[/en]
   * @param {Object} event.navigator
   *   [en]Component object.[/en]
   *   [ja]コンポーネントのオブジェクト。[/ja]
   * @param {Object} event.enterPage
   *   [en]Object of the next page.[/en]
   *   [ja]popされて表示されるページのオブジェクト。[/ja]
   * @param {Object} event.leavePage
   *   [en]Object of the previous page.[/en]
   *   [ja]popされて消えるページのオブジェクト。[/ja]
   */

  get animatorFactory() {
    return this._animatorFactory;
  }

  createdCallback() {
    this._isRunning = false;

    this._updateAnimatorFactory();
  }

  attachedCallback() {
    this.onDeviceBackButton = this._onDeviceBackButton.bind(this);

    rewritables.ready(this, () => {
      if (this.pages.length === 0 && this.hasAttribute('page')) {
        this.pushPage(this.getAttribute('page'), {animation: 'none'});
      } else {
        for (var i = 0; i < this.pages.length; i++) {
          if (this.pages[i].nodeName !== 'ONS-PAGE') {
            throw new Error('The children of <ons-navigator> need to be of type <ons-page>');
          }
        }

        if (this.topPage) {
          setTimeout(() => {
            this.topPage._show();
            this._updateLastPageBackButton();
          }, 0);
        }
      }
    });
  }

  _updateAnimatorFactory() {
    this._animatorFactory = new AnimatorFactory({
      animators: _animatorDict,
      baseClass: NavigatorTransitionAnimator,
      baseClassName: 'NavigatorTransitionAnimator',
      defaultAnimation: this.getAttribute('animation')
    });
  }

  detachedCallback() {
    this._backButtonHandler.destroy();
    this._backButtonHandler = null;
  }

  attributeChangedCallback(name, last, current) {
    if (name === 'animation') {
      this._updateAnimatorFactory();
    }
  }

  /**
   * @method popPage
   * @signature popPage([options])
   * @param {Object} [options]
   *   [en]Parameter object.[/en]
   *   [ja]オプションを指定するオブジェクト。[/ja]
   * @param {String} [options.animation]
   *   [en]
   *     Animation name. Available animations are `"slide"`, `"lift"`, `"fade"` and `"none"`.
   *
   *     These are platform based animations. For fixed animations, add `"-ios"` or `"-md"` suffix to the animation name. E.g. `"lift-ios"`, `"lift-md"`. Defaults values are `"slide-ios"` and `"fade-md"`.
   *   [/en]
   *   [ja][/ja]
   * @param {String} [options.animationOptions]
   *   [en]Specify the animation's duration, delay and timing. E.g. `{duration: 0.2, delay: 0.4, timing: 'ease-in'}`.[/en]
   *   [ja]アニメーション時のduration, delay, timingを指定します。e.g. {duration: 0.2, delay: 0.4, timing: 'ease-in'}[/ja]
   * @param {Boolean} [options.refresh]
   *   [en]The previous page will be refreshed (destroyed and created again) before popPage action.[/en]
   *   [ja]popPageする前に、前にあるページを生成しなおして更新する場合にtrueを指定します。[/ja]
   * @param {Function} [options.callback]
   *   [en]Function that is called when the transition has ended.[/en]
   *   [ja]このメソッドによる画面遷移が終了した際に呼び出される関数オブジェクトを指定します。[/ja]
   * @return {Promise}
   *   [en]Promise which resolves to the revealed page.[/en]
   *   [ja]明らかにしたページを解決するPromiseを返します。[/ja]
   * @description
   *   [en]Pops the current page from the page stack. The previous page will be displayed.[/en]
   *   [ja]現在表示中のページをページスタックから取り除きます。一つ前のページに戻ります。[/ja]
   */
  popPage(options = {}) {
    const popUpdate = () => new Promise((resolve) => {
      this.pages[this.pages.length - 1]._destroy();
      resolve();
    });
    options = this._prepareOptions(options);

    if (!options.refresh) {
      return this._popPage(options, popUpdate);
    }
    const index = this.pages.length - 2;

    if (!this.pages[index].name) {
      throw new Error('Refresh option cannot be used with pages directly inside the Navigator. Use ons-template instead.');
    }

    return new Promise(resolve => {
      internal.getPageHTMLAsync(this.pages[index].name).then(templateHTML => {
        const element = util.extend(this._createPageElement(templateHTML), {
          name: this.pages[index].name,
          data: this.pages[index].data,
          pushedOptions: this.pages[index].pushedOptions
        });

        rewritables.link(this, element, this.pages[index].options, element => {
          this.insertBefore(element, this.pages[index] ? this.pages[index] : null);
          this.pages[index + 1]._destroy();
          resolve();
        });
      });
    }).then(() => this._popPage(options, popUpdate));
  }

  _popPage(options, update = () => Promise.resolve(), pages = []) {
    if (this._isRunning) {
      return Promise.reject('popPage is already running.');
    }

    if (this.pages.length <= 1) {
      return Promise.reject('ons-navigator\'s page stack is empty.');
    }

    if (this._emitPrePopEvent()) {
      return Promise.reject('Canceled in prepop event.');
    }

    const l = this.pages.length;

    this._isRunning = true;

    this.pages[l - 2].updateBackButton((l - 2) > 0);

    return new Promise(resolve => {
      var leavePage = this.pages[l - 1];
      var enterPage = this.pages[l - 2];
      enterPage.style.display = 'block';

      options.animation = leavePage.pushedOptions.animation || options.animation;
      options.animationOptions = util.extend({}, leavePage.pushedOptions.animationOptions, options.animationOptions || {});

      const callback = () => {
        pages.pop();
        update(pages, this).then(() => {
          this._isRunning = false;

          enterPage._show();
          util.triggerElementEvent(this, 'postpop', {leavePage, enterPage, navigator: this});

          if (typeof options.callback === 'function') {
            options.callback();
          }

          resolve(enterPage);
        });
      };

      leavePage._hide();
      const animator = this._animatorFactory.newAnimator(options);
      animator.pop(this.pages[l - 2], this.pages[l - 1], callback);
    }).catch(() => this._isRunning = false);
  }


  /**
   * @method pushPage
   * @signature pushPage(page, [options])
   * @param {String} [page]
   *   [en]Page URL. Can be either a HTML document or a template defined with the `<ons-template>` tag.[/en]
   *   [ja]pageのURLか、もしくはons-templateで宣言したテンプレートのid属性の値を指定できます。[/ja]
   * @param {Object} [options]
   *   [en]Parameter object.[/en]
   *   [ja]オプションを指定するオブジェクト。[/ja]
   * @param {String} [options.page]
   *   [en]Page URL. Only necessary if `page` parameter is omitted.[/en]
   *   [ja][/ja]
   * @param {String} [options.pageHTML]
   *   [en]HTML code that will be computed as a new page. Overwrites `page` parameter.[/en]
   *   [ja][/ja]
   * @param {String} [options.animation]
   *   [en]
   *     Animation name. Available animations are `"slide"`, `"lift"`, `"fade"` and `"none"`.
   *
   *     These are platform based animations. For fixed animations, add `"-ios"` or `"-md"` suffix to the animation name. E.g. `"lift-ios"`, `"lift-md"`. Defaults values are `"slide-ios"` and `"fade-md"`.
   *   [/en]
   *   [ja][/ja]
   * @param {String} [options.animationOptions]
   *   [en]Specify the animation's duration, delay and timing. E.g. `{duration: 0.2, delay: 0.4, timing: 'ease-in'}`[/en]
   *   [ja]アニメーション時のduration, delay, timingを指定します。e.g. `{duration: 0.2, delay: 0.4, timing: 'ease-in'}` [/ja]
   * @param {Function} [options.callback]
   *   [en]Function that is called when the transition has ended.[/en]
   *   [ja]pushPage()による画面遷移が終了した時に呼び出される関数オブジェクトを指定します。[/ja]
   * @param {Any} [options.data]
   *   [en]Custom data that will be stored in the new page element.[/en]
   *   [ja][/ja]
   * @return {Promise}
   *   [en]Promise which resolves to the pushed page.[/en]
   *   [ja]追加したページを解決するPromiseを返します。[/ja]
   * @description
   *   [en]Pushes the specified page into the stack.[/en]
   *   [ja]指定したpageを新しいページスタックに追加します。新しいページが表示されます。[/ja]
   */
  pushPage(page, options = {}) {
    options = this._prepareOptions(options, page);
    const run = templateHTML => new Promise(resolve => {
      const element = util.extend(this._createPageElement(templateHTML), {
        name: options.page,
        data: options.data
      });
      element.style.display = 'none';
      this.appendChild(element);
      resolve();
    });

    if (options.pageHTML) {
      return this._pushPage(options, () => run(options.pageHTML));
    }
    return this._pushPage(options, () => internal.getPageHTMLAsync(options.page).then(run));
  }

  _pushPage(options = {}, update = () => Promise.resolve(), pages = [], page = {}) {
    if (this._isRunning) {
      return Promise.reject('pushPage is already running.');
    }

    if (this._emitPrePushEvent()) {
      return Promise.reject('Canceled in prepush event.');
    }

    this._isRunning = true;

    const animationOptions = AnimatorFactory.parseAnimationOptionsString(this.getAttribute('animation-options'));
    options = util.extend({}, this.options || {}, {animationOptions}, options);

    const animator = this._animatorFactory.newAnimator(options);

    pages.push(page);

    return update(pages, this).then(() => {
      const pageLength = this.pages.length;

      var enterPage  = this.pages[pageLength - 1];
      var leavePage = this.pages[pageLength - 2];

      if (enterPage.nodeName !== 'ONS-PAGE') {
        throw new Error('Only elements of type <ons-page> can be pushed to the navigator');
      }

      enterPage.updateBackButton(pageLength - 1);

      enterPage.pushedOptions = options;
      enterPage.data = enterPage.data || options.data;
      enterPage.name = enterPage.name || options.page;

      return new Promise(resolve => {
        var done = () => {
          this._isRunning = false;

          if (leavePage) {
            leavePage.style.display = 'none';
          }

          enterPage._show();
          util.triggerElementEvent(this, 'postpush', {leavePage, enterPage, navigator: this});

          if (typeof options.callback === 'function') {
            options.callback();
          }

          resolve(enterPage);
        };

        enterPage.style.display = 'none';

        var push = () =>  {
          enterPage.style.display = 'block';
          if (leavePage) {
            leavePage._hide();
            animator.push(enterPage, leavePage, done);
          } else {
            done();
          }
        };

        options._linked ? push() : rewritables.link(this, enterPage, options, push);
      });
    }).catch((error) => {
      this._isRunning = false;
      throw error;
    });
  }

  /**
   * @method replacePage
   * @signature replacePage(page, [options])
   * @return {Promise}
   *   [en]Promise which resolves to the new page.[/en]
   *   [ja]新しいページを解決するPromiseを返します。[/ja]
   * @description
   *   [en]Replaces the current top page with the specified one. Extends `pushPage()` parameters.[/en]
   *   [ja]現在表示中のページをを指定したページに置き換えます。[/ja]
   */
  replacePage(page, options = {}) {
    options = this._prepareOptions(options, page);
    const callback = options.callback;

    options.callback = () => {
      if (this.pages.length > 1) {
        this.pages[this.pages.length - 2]._destroy();
      }
      this._updateLastPageBackButton();
      callback && callback();
    };

    return this.pushPage(options);
  }

  /**
   * @method insertPage
   * @signature insertPage(index, page, [options])
   * @param {Number} index
   *   [en]The index where it should be inserted.[/en]
   *   [ja]スタックに挿入する位置のインデックスを指定します。[/ja]
   * @return {Promise}
   *   [en]Promise which resolves to the inserted page.[/en]
   *   [ja]指定したページを解決するPromiseを返します。[/ja]
   * @description
   *   [en]Insert the specified page into the stack with at a position defined by the `index` argument. Extends `pushPage()` parameters.[/en]
   *   [ja]指定したpageをページスタックのindexで指定した位置に追加します。[/ja]
   */
  insertPage(index, page, options = {}) {
    options = this._prepareOptions(options, page);
    index = this._normalizeIndex(index);

    if (index >= this.pages.length) {
      return this.pushPage(options);
    }

    const run = templateHTML => {
      const element = util.extend(this._createPageElement(templateHTML), {
        name: options.page,
        data: options.data,
        pushedOptions: options
      });

      options.animationOptions = util.extend(
        {},
        AnimatorFactory.parseAnimationOptionsString(this.getAttribute('animation-options')),
        options.animationOptions || {}
      );

      return new Promise(resolve => {
        element.style.display = 'none';
        this.insertBefore(element, this.pages[index]);
        this.topPage.updateBackButton(true);

        rewritables.link(this, element, options, element => {
          setTimeout(() => {
            element = null;
            resolve(this.pages[index]);
          }, 1000 / 60);
        });
      });
    };

    if (options.pageHTML) {
      return run(options.pageHTML);
    } else {
      return internal.getPageHTMLAsync(options.page).then(run);
    }
  }

  /**
   * @method resetToPage
   * @signature resetToPage(page, [options])
   * @return {Promise}
   *   [en]Promise which resolves to the new top page.[/en]
   *   [ja]新しいトップページを解決するPromiseを返します。[/ja]
   * @description
   *   [en]Clears page stack and adds the specified page to the stack. Extends `pushPage()` parameters.[/en]
   *   [ja]ページスタックをリセットし、指定したページを表示します。[/ja]
   */
  resetToPage(page, options = {}) {
    options = this._prepareOptions(options, page);

    if (!options.animator && !options.animation) {
      options.animation = 'none';
    }

    const callback = options.callback;

    options.callback = () => {
      while (this.pages.length > 1) {
        this.pages[0]._destroy();
      }

      this.pages[0].updateBackButton(false);
      callback && callback();
    };

    if (!options.page && !options.pageHTML && this.hasAttribute('page')) {
      options.page = this.getAttribute('page');
    }

    return this.pushPage(options);
  }

  /**
   * @method bringPageTop
   * @signature bringPageTop(item, [options])
   * @param {String|Number} item
   *   [en]Page URL or index of an existing page in navigator's stack.[/en]
   *   [ja]ページのURLかもしくはons-navigatorのページスタックのインデックス値を指定します。[/ja]
   * @return {Promise}
   *   [en]Promise which resolves to the new top page.[/en]
   *   [ja]新しいトップページを解決するPromiseを返します。[/ja]
   * @description
   *   [en]Brings the given page to the top of the page stack if it already exists or pushes it into the stack if doesn't. Extends `pushPage()` parameters.[/en]
   *   [ja]指定したページをページスタックの一番上に移動します。もし指定したページが無かった場合新しくpushされます。[/ja]
   */
  bringPageTop(item, options = {}) {
    if (['number', 'string'].indexOf(typeof item) === -1) {
      throw new Error('First argument must be a page name or the index of an existing page. You supplied ' + item);
    }
    const index = typeof item === 'number' ? this._normalizeIndex(item) : this._lastIndexOfPage(item);
    const page = this.pages[index];

    if (index < 0) {
      return this.pushPage(item, options);
    }
    options = this._prepareOptions(options);

    if (index === this.pages.length - 1) {
      return Promise.resolve(page);
    }
    if (!page) {
      throw new Error('Failed to find item ' + item);
    }
    if (this._isRunning) {
      return Promise.reject('pushPage is already running.');
    }
    if (this._emitPrePushEvent()) {
      return Promise.reject('Canceled in prepush event.');
    }

    util.extend(options, {
      page: page.name,
      _linked: true
    });
    page.style.display = 'none';
    page.setAttribute('_skipinit', '');
    page.parentNode.appendChild(page);
    return this._pushPage(options);
  }

  _prepareOptions(options = {}, page) {
    if (typeof page === 'object' && page !== null) {
      options = page;
      page = options.page;
    }
    if (typeof options != 'object') {
      throw new Error('options must be an object. You supplied ' + options);
    }
    page = page || options.page;

    return util.extend({}, this.options || {}, options, {page});
  }

  _updateLastPageBackButton() {
    const index = this.pages.length - 1;
    if (index >= 0) {
      this.pages[index].updateBackButton(index > 0);
    }
  }

  _normalizeIndex(index) {
    return index >= 0 ? index : Math.abs(this.pages.length + index) % this.pages.length;
  }

  _onDeviceBackButton(event) {
    if (this.pages.length > 1) {
      this.popPage();
    } else {
      event.callParentHandler();
    }
  }

  _lastIndexOfPage(pageName) {
    let index;
    for (index = this.pages.length - 1; index >= 0; index--) {
      if (this.pages[index].name === pageName) {
        break;
      }
    }
    return index;
  }

  _emitPreEvent(name, data = {}) {
    let isCanceled = false;

    util.triggerElementEvent(this, 'pre' + name, util.extend({
      navigator: this,
      currentPage: this.pages[this.pages.length - 1],
      cancel: () => isCanceled = true
    }, data));

    return isCanceled;
  }

  _emitPrePushEvent() {
    return this._emitPreEvent('push');
  }

  _emitPrePopEvent() {
    const l = this.pages.length;
    return this._emitPreEvent('pop', {
      leavePage: this.pages[l - 1],
      enterPage: this.pages[l - 2]
    });
  }

  _createPageElement(templateHTML) {
    const pageElement = util.createElement(internal.normalizePageHTML(templateHTML));

    if (pageElement.nodeName.toLowerCase() !== 'ons-page') {
      throw new Error('You must supply an "ons-page" element to "ons-navigator".');
    }

    CustomElements.upgrade(pageElement);

    return pageElement;
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
   * @property topPage
   * @readonly
   * @type {HTMLElement}
   * @description
   *   [en]Current top page element. Use this method to access options passed by `pushPage()`-like methods.[/en]
   *   [ja]現在のページを取得します。pushPage()やresetToPage()メソッドの引数を取得できます。[/ja]
   */
  get topPage() {
    return this.pages[this.pages.length - 1] || null;
  }

  /**
   * @property pages
   * @readonly
   * @type {HTMLCollection}
   * @description
   *   [en]Navigator's page stack.[/en]
   *   [ja][/ja]
   */
  get pages() {
    return this.children;
  }

  /**
   * @property options
   * @type {Object}
   * @description
   *   [en]Default options object. Attributes have priority over this property.[/en]
   *   [ja][/ja]
   */

  /**
   * @property options.animation
   * @type {String}
   * @description
   *   [en]
   *     Animation name. Available animations are `"slide"`, `"lift"`, `"fade"` and `"none"`.
   *     These are platform based animations. For fixed animations, add `"-ios"` or `"-md"` suffix to the animation name. E.g. `"lift-ios"`, `"lift-md"`. Defaults values are `"slide-ios"` and `"fade-md"`.
   *   [/en]
   *   [ja][/ja]
   */

  /**
   * @property options.animationOptions
   * @type {String}
   * @description
   *   [en]Specify the animation's duration, delay and timing. E.g. `{duration: 0.2, delay: 0.4, timing: 'ease-in'}`.[/en]
   *   [ja]アニメーション時のduration, delay, timingを指定します。e.g. `{duration: 0.2, delay: 0.4, timing: 'ease-in'}` [/ja]
   */

  /**
   * @property options.callback
   * @type {String}
   * @description
   *   [en]Function that is called when the transition has ended.[/en]
   *   [ja]このメソッドによる画面遷移が終了した際に呼び出される関数オブジェクトを指定します。[/ja]
   */

  /**
   * @property options.refresh
   * @default  false
   * @type {Boolean}
   * @description
   *   [en]If this parameter is `true`, the previous page will be refreshed (destroyed and created again) before `popPage()` action.[/en]
   *   [ja]popPageする前に、前にあるページを生成しなおして更新する場合にtrueを指定します。[/ja]
   */
  get options() {
    return this._options;
  }
  set options(object) {
    this._options = object;
  }

  set _isRunning(value) {
    this.setAttribute('_is-running', value ? 'true' : 'false');
  }
  get _isRunning() {
   return JSON.parse(this.getAttribute('_is-running'));
  }

  _show() {
    if (this.topPage) {
      this.topPage._show();
    }
  }

  _hide() {
    if (this.topPage) {
      this.topPage._hide();
    }
  }

  _destroy() {
    for (let i = this.pages.length - 1; i >= 0; i--) {
      this.pages[i]._destroy();
    }

    this.remove();
  }

}

window.OnsNavigatorElement = document.registerElement('ons-navigator', {
  prototype: NavigatorElement.prototype
});

/**
 * @param {String} name
 * @param {Function} Animator
 */
window.OnsNavigatorElement.registerAnimator = function(name, Animator) {
  if (!(Animator.prototype instanceof NavigatorTransitionAnimator)) {
    throw new Error('"Animator" param must inherit OnsNavigatorElement.NavigatorTransitionAnimator');
  }

  _animatorDict[name] = Animator;
};

window.OnsNavigatorElement.rewritables = rewritables;
window.OnsNavigatorElement.NavigatorTransitionAnimator = NavigatorTransitionAnimator;

