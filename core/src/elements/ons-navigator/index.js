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
import ModifierUtil from 'ons/internal/modifier-util';
import AnimatorFactory from 'ons/internal/animator-factory';
import NavigatorTransitionAnimator from './animator';
import IOSSlideNavigatorTransitionAnimator from './ios-slide-animator';
import SimpleSlideNavigatorTransitionAnimator from './simple-slide-animator';
import LiftNavigatorTransitionAnimator from './lift-animator';
import FadeNavigatorTransitionAnimator from './fade-animator';
import NoneNavigatorTransitionAnimator from './none-animator';
import platform from 'ons/platform';
import BaseElement from 'ons/base-element';
import NavigatorPage from './navigator-page';
import deviceBackButtonDispatcher from 'ons/device-back-button-dispatcher';
import DoorLock from 'ons/doorlock';

const _animatorDict = {
  'default': platform.isAndroid() ? SimpleSlideNavigatorTransitionAnimator : IOSSlideNavigatorTransitionAnimator,
  'slide': platform.isAndroid() ? SimpleSlideNavigatorTransitionAnimator : IOSSlideNavigatorTransitionAnimator,
  'simpleslide': SimpleSlideNavigatorTransitionAnimator,
  'lift': LiftNavigatorTransitionAnimator,
  'fade': FadeNavigatorTransitionAnimator,
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
 *   [en]A component that provides page stack management and navigation. This component does not have a visible content.[/en]
 *   [ja]ページスタックの管理とナビゲーション機能を提供するコンポーネント。画面上への出力はありません。[/ja]
 * @codepen yrhtv
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
 *   [en]ons-toolbar component[/en]
 *   [ja]ons-toolbarコンポーネント[/ja]
 * @seealso ons-back-button
 *   [en]ons-back-button component[/en]
 *   [ja]ons-back-buttonコンポーネント[/ja]
 * @example
 * <ons-navigator animation="slide" var="app.navi">
 *   <ons-page>
 *     <ons-toolbar>
 *       <div class="center">Title</div>
 *     </ons-toolbar>
 *
 *     <p style="text-align: center">
 *       <ons-button modifier="light" ng-click="app.navi.pushPage('page.html');">Push</ons-button>
 *     </p>
 *   </ons-page>
 * </ons-navigator>
 *
 * <ons-template id="page.html">
 *   <ons-page>
 *     <ons-toolbar>
 *       <div class="center">Title</div>
 *     </ons-toolbar>
 *
 *     <p style="text-align: center">
 *       <ons-button modifier="light" ng-click="app.navi.popPage();">Pop</ons-button>
 *     </p>
 *   </ons-page>
 * </ons-template>
 */
class NavigatorElement extends BaseElement {

  /**
   * @attribute animation-options
   * @type {Expression}
   * @description
   *  [en]Specify the animation's duration, timing and delay with an object literal. E.g. <code>{duration: 0.2, delay: 1, timing: 'ease-in'}</code>[/en]
   *  [ja]アニメーション時のduration, timing, delayをオブジェクトリテラルで指定します。e.g. <code>{duration: 0.2, delay: 1, timing: 'ease-in'}</code>[/ja]
   */

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
   *  [en]Specify the transition animation. Use one of "slide", "simpleslide", "fade", "lift", "none" and "default".[/en]
   *  [ja]画面遷移する際のアニメーションを指定します。"slide", "simpleslide", "fade", "lift", "none", "default"のいずれかを指定できます。[/ja]
   */

  /**
   * @attribute prepush
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
   * @attribute prepop
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
   * @attribute postpush
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
  createdCallback() {
    this._doorLock = new DoorLock();
    this._pages = [];
    this._boundOnDeviceBackButton = this._onDeviceBackButton.bind(this);
    this._isPushing = this._isPopping = false;

    this._initialHTML = this.innerHTML;
    this.innerHTML = '';

    this._animatorFactory = new AnimatorFactory({
      animators: _animatorDict,
      baseClass: NavigatorTransitionAnimator,
      baseClassName: 'NavigatorTransitionAnimator',
      defaultAnimation: this.getAttribute('animation')
    });
  }

  /**
   * @return {Boolean}
   */
  canPopPage() {
    return this._pages.length > 1;
  }

  /**
   * @method replacePage
   * @signature replacePage(pageUrl, [options])
   * @param {String} [pageUrl]
   *   [en]Page URL. Can be either a HTML document or an <code>&lt;ons-template&gt;</code>.[/en]
   *   [ja]pageのURLか、もしくはons-templateで宣言したテンプレートのid属性の値を指定できます。[/ja]
   * @param {Object} [options]
   *   [en]Parameter object.[/en]
   *   [ja]オプションを指定するオブジェクト。[/ja]
   * @param {String} [options.page]
   *   [en]PageURL. Only necssary if `page` parameter is omitted.[/en]
   *   [ja][/ja]
   * @param {String} [options.pageHTML]
   *   [en]HTML code that will be computed as a new page. Overwrites `page` parameter.[/en]
   *   [ja][/ja]
   * @param {String} [options.animation]
   *   [en]Animation name. Available animations are "slide", "simpleslide", "lift", "fade" and "none".[/en]
   *   [ja]アニメーション名を指定できます。"slide", "simpleslide", "lift", "fade", "none"のいずれかを指定できます。[/ja]
   * @param {String} [options.animationOptions]
   *   [en]Specify the animation's duration, delay and timing. E.g.  <code>{duration: 0.2, delay: 0.4, timing: 'ease-in'}</code>[/en]
   *   [ja]アニメーション時のduration, delay, timingを指定します。e.g. <code>{duration: 0.2, delay: 0.4, timing: 'ease-in'}</code> [/ja]
   * @param {Function} [options.onTransitionEnd]
   *   [en]Function that is called when the transition has ended.[/en]
   *   [ja]このメソッドによる画面遷移が終了した際に呼び出される関数オブジェクトを指定します。[/ja]
   * @description
   *   [en]Replaces the current page with the specified one.[/en]
   *   [ja]現在表示中のページをを指定したページに置き換えます。[/ja]
   */

  /**
   * Replaces the current page with the specified one.
   *
   * @param {String} page
   * @param {Object} [options]
   */
  replacePage(page, options = {}) {

    if (typeof page === 'object' && page !== null) {
      options = page;
    } else {
      options.page = page;
    }

    if (options && typeof options != 'object') {
      throw new Error('options must be an object. You supplied ' + options);
    }

    const onTransitionEnd = options.onTransitionEnd || function() {};

    if (this._pages.length === 1) {
      options._forceHideBackButton = true;
    }

    options.onTransitionEnd = () => {
      if (this._pages.length > 1) {
        this._pages[this._pages.length - 2].destroy();
      }
      onTransitionEnd();
    };

    return this.pushPage(options.page, options);
  }

  /**
   * @method popPage
   * @signature popPage([options])
   * @param {Object} [options]
   *   [en]Parameter object.[/en]
   *   [ja]オプションを指定するオブジェクト。[/ja]
   * @param {String} [options.animation]
   *   [en]Animation name. Available animations are "slide", "simpleslide", "lift", "fade" and "none".[/en]
   *   [ja]アニメーション名を指定します。"slide", "simpleslide", "lift", "fade", "none"のいずれかを指定できます。[/ja]
   * @param {String} [options.animationOptions]
   *   [en]Specify the animation's duration, delay and timing. E.g.  <code>{duration: 0.2, delay: 0.4, timing: 'ease-in'}</code>[/en]
   *   [ja]アニメーション時のduration, delay, timingを指定します。e.g. <code>{duration: 0.2, delay: 0.4, timing: 'ease-in'}</code> [/ja]
   * @param {Boolean} [options.refresh]
   *   [en]The previous page will be refreshed (destroyed and created again) before popPage action.[/en]
   *   [ja]popPageする前に、前にあるページを生成しなおして更新する場合にtrueを指定します。[/ja]
   * @param {Function} [options.onTransitionEnd]
   *   [en]Function that is called when the transition has ended.[/en]
   *   [ja]このメソッドによる画面遷移が終了した際に呼び出される関数オブジェクトを指定します。[/ja]
   * @description
   *   [en]Pops the current page from the page stack. The previous page will be displayed.[/en]
   *   [ja]現在表示中のページをページスタックから取り除きます。一つ前のページに戻ります。[/ja]
   */

  /**
   * Pops current page from the page stack.
   *
   * @param {Object} [options]
   * @param {String} [options.animation]
   * @param {Object} [options.animationOptions]
   * @param {Boolean} [options.refresh]
   * @param {Function} [options.onTransitionEnd]
   * @param {Boolean} [options.cancelIfRunning]
   * @return {Promise} Resolves to the new top page object.
   */
  popPage(options = {}) {

    if (options && typeof options != 'object') {
      throw new Error('options must be an object. You supplied ' + options);
    }

    if (options.cancelIfRunning && this._isPopping) {
      return Promise.reject('popPage is already running.');
    }

    options.animationOptions = util.extend(
      options.animationOptions || {},
      AnimatorFactory.parseAnimationOptionsString(this.getAttribute('animation-options'))
    );

    const tryPopPage = () => {
      if (this._pages.length <= 1) {
        throw new Error('ons-navigator\'s page stack is empty.');
      }

      if (this._emitPrePopEvent()) {
        return Promise.reject('Canceled in prepop event.');
      }

      const unlock = this._doorLock.lock();

      if (options.refresh) {
        const index = this._pages.length - 2;

        if (!this._pages[index].page) {
          throw new Error('Refresh option cannot be used with pages directly inside the Navigator. Use ons-template instead.');
        }

        return internal.getPageHTMLAsync(this._pages[index].page).then(templateHTML => {
          const element = this._createPageElement(templateHTML);
          const pageObject = this._createPageObject(this._pages[index].page, element, this._pages[index].options);

          return new Promise(resolve => {
            rewritables.link(this, element, this._pages[index].options, element => {
              this.insertBefore(element, this._pages[index] ? this._pages[index].element : null);
              this._pages.splice(index, 0, pageObject);

              this._pages[index + 1].destroy();
              resolve(this._popPage(options, unlock));
            });
          });
        });

      } else {
        return this._popPage(options, unlock);
      }
    };

    return new Promise(resolve => {
      this._doorLock.waitUnlock(() => resolve(tryPopPage()));
    });
  }

  _popPage(options, unlock) {
    options.animationOptions = util.extend(
      options.animationOptions || {},
      AnimatorFactory.parseAnimationOptionsString(this.getAttribute('animation-options'))
    );

    const leavePage = this._pages.pop();
    const enterPage = this._pages[this._pages.length - 1];

    enterPage.updateBackButton();

    leavePage.element._hide();
    if (enterPage) {
      enterPage.element.style.display = 'block';
      enterPage.element._show();
    }

    // for "postpop" event
    const eventDetail = {
      leavePage: leavePage,
      enterPage: this._pages[this._pages.length - 1],
      navigator: this
    };

    return new Promise(resolve => {
      const callback = () => {
        leavePage.destroy();

        this._isPopping = false;
        unlock();

        const event = util.triggerElementEvent(this, 'postpop', eventDetail);
        event.leavePage = null;

        if (typeof options.onTransitionEnd === 'function') {
          options.onTransitionEnd();
        }

        resolve(enterPage);
      };

      this._isPopping = true;

      const animator = this._animatorFactory.newAnimator(options, leavePage.options.animator);
      animator.pop(enterPage, leavePage, callback);
    });
  }

  /**
   * @method insertPage
   * @signature insertPage(index, pageUrl, [options])
   * @param {Number} index
   *   [en]The index where it should be inserted.[/en]
   *   [ja]スタックに挿入する位置のインデックスを指定します。[/ja]
   * @param {String} pageUrl
   *   [en]Page URL. Can be either a HTML document or a <code>&lt;ons-template&gt;</code>.[/en]
   *   [ja]pageのURLか、もしくはons-templateで宣言したテンプレートのid属性の値を指定できます。[/ja]
   * @param {Object} [options]
   *   [en]Parameter object.[/en]
   *   [ja]オプションを指定するオブジェクト。[/ja]
   * @param {String} [options.animation]
   *   [en]Animation name. Available animations are "slide", "simpleslide", "lift", "fade" and "none".[/en]
   *   [ja]アニメーション名を指定します。"slide", "simpleslide", "lift", "fade", "none"のいずれかを指定できます。[/ja]
   * @description
   *   [en]Insert the specified pageUrl into the page stack with specified index.[/en]
   *   [ja]指定したpageUrlをページスタックのindexで指定した位置に追加します。[/ja]
   */

  /**
   * Insert page object that has the specified pageUrl into the page stack and
   * if options object is specified, apply the options.
   *
   * @param {Number} index
   * @param {String} page
   * @param {Object} [options]
   * @param {String/NavigatorTransitionAnimator} [options.animation]
   * @return {Promise} Resolves to the inserted page object
   */
  insertPage(index, page, options = {}) {

    if (typeof page === 'object' && page !== null) {
      options = page;
    } else {
      options.page = page;
    }

    if (options && typeof options != 'object') {
      throw new Error('options must be an object. You supplied ' + options);
    }

    index = this._normalizeIndex(index);

    if (index >= this._pages.length) {
      return this.pushPage.apply(this, [].slice.call(arguments, 1));
    }

    const tryInsertPage = () => {
      const unlock = this._doorLock.lock();

      return internal.getPageHTMLAsync(page).then(templateHTML => {
        const element = this._createPageElement(templateHTML);
        const pageObject = this._createPageObject(page, element, options);

        return new Promise(resolve => {
          rewritables.link(this, element, options, element => {
            element.style.display = 'none';
            this.insertBefore(element, this._pages[index].element);
            this._pages.splice(index, 0, pageObject);
            this.getCurrentPage().updateBackButton();

            setTimeout(() => {
              unlock();
              element = null;
              resolve(this._pages[index]);
            }, 1000 / 60);
          });
        });
      });
    };

    return new Promise(resolve => {
      this._doorLock.waitUnlock(() => resolve(tryInsertPage()));
    });
  }

  _normalizeIndex(index) {
    if (index < 0) {
      index = Math.abs(this._pages.length + index) % this._pages.length;
    }
    return index;
  }

  /**
   * @method getCurrentPage
   * @signature getCurrentPage()
   * @return {Object}
   *   [en]Current page object.[/en]
   *   [ja]現在のpageオブジェクト。[/ja]
   * @description
   *   [en]Get current page's navigator item. Use this method to access options passed by pushPage() or resetToPage() method.[/en]
   *   [ja]現在のページを取得します。pushPage()やresetToPage()メソッドの引数を取得できます。[/ja]
   */

  /**
   * Get current page's navigator item.
   *
   * Use this method to access options passed by pushPage() or resetToPage() method.
   * eg. ons.navigator.getCurrentPage().options
   *
   * @return {Object}
   */
  getCurrentPage() {
    if (this._pages.length <= 0) {
      throw new Error('Invalid state');
    }
    return this._pages[this._pages.length - 1];
  }

  _show() {
    if (this._pages[this._pages.length - 1]) {
      this._pages[this._pages.length - 1].element._show();
    }
  }

  _hide() {
    if (this._pages[this._pages.length - 1]) {
      this._pages[this._pages.length - 1].element._hide();
    }
  }

  _destroy() {
    for (let i = this._pages.length - 1; i >= 0; i--) {
      this._pages[i].destroy();
    }
    this.remove();
  }

  get pages() {
    return this._pages.slice(0);
  }

  _onDeviceBackButton(event) {
    if (this._pages.length > 1) {
      this.popPage();
    } else {
      event.callParentHandler();
    }
  }

  /**
   * @method resetTopage
   * @signature resetToPage(pageUrl, [options])
   * @param {String/undefined} [pageUrl]
   *   [en]Page URL. Can be either a HTML document or an <code>&lt;ons-template&gt;</code>. If the value is undefined or '', the navigator will be reset to the page that was first displayed.[/en]
   *   [ja]pageのURLか、もしくはons-templateで宣言したテンプレートのid属性の値を指定できます。undefinedや''を指定すると、ons-navigatorが最初に表示したページを指定したことになります。[/ja]
   * @param {Object} [options]
   *   [en]Parameter object.[/en]
   *   [ja]オプションを指定するオブジェクト。[/ja]
   * @param {String} [options.page]
   *   [en]PageURL. Only necssary if `page` parameter is omitted.[/en]
   *   [ja][/ja]
   * @param {String} [options.pageHTML]
   *   [en]HTML code that will be computed as a new page. Overwrites `page` parameter.[/en]
   *   [ja][/ja]
   * @param {String} [options.animation]
   *   [en]Animation name. Available animations are "slide", "simpleslide", "lift", "fade" and "none".[/en]
   *   [ja]アニメーション名を指定できます。"slide", "simpleslide", "lift", "fade", "none"のいずれかを指定できます。[/ja]
   * @param {Function} [options.onTransitionEnd]
   *   [en]Function that is called when the transition has ended.[/en]
   *   [ja]このメソッドによる画面遷移が終了した際に呼び出される関数オブジェクトを指定します。[/ja]
   * @description
   *   [en]Clears page stack and adds the specified pageUrl to the page stack.[/en]
   *   [ja]ページスタックをリセットし、指定したページを表示します。[/ja]
   */

  /**
   * Clears page stack and add the specified pageUrl to the page stack.
   * If options object is specified, apply the options.
   * the options object include all the attributes of this navigator.
   *
   * If page is undefined, navigator will push initial page contents instead of.
   *
   * @param {String/undefined} page
   * @param {Object} [options]
   * @return {Promise} Resolves to the new top page object.
   */
  resetToPage(page, options = {}) {

    if (typeof page === 'object' && page !== null) {
      options = page;
    } else {
      options.page = page;
    }

    if (options && typeof options != 'object') {
      throw new Error('options must be an object. You supplied ' + options);
    }

    if (!options.animator && !options.animation) {
      options.animation = 'none';
    }

    const onTransitionEnd = options.onTransitionEnd || function() {};

    options.onTransitionEnd = () => {
      while (this._pages.length > 1) {
        this._pages.shift().destroy();
      }
      this._pages[0].updateBackButton();
      onTransitionEnd();
    };

    if (!options.pageHTML && (options.page === undefined || page === '')) {
      if (this.hasAttribute('page')) {
        options.page = this.getAttribute('page');
      } else {
        options.pageHTML = this._initialHTML;
        options.page = '';
      }
    }

    return this.pushPage(options.page, options);
  }

  attributeChangedCallback(name, last, current) {
  }

  attachedCallback() {
    this._deviceBackButtonHandler = deviceBackButtonDispatcher.createHandler(this, this._boundOnDeviceBackButton);

    rewritables.ready(this, () => {
      if (this._pages.length === 0) {
        if (!this.getAttribute('page')) {
          const element = this._createPageElement(this._initialHTML || '');

          this._pushPageDOM(this._createPageObject('', element, {}), function() {});
        } else {
          this.pushPage(this.getAttribute('page'), {animation: 'none'});
        }
      }
    });
  }

  detachedCallback() {
    this._deviceBackButtonHandler.destroy();
    this._deviceBackButtonHandler = null;
  }

  /**
   * @method pushPage
   * @signature pushPage(page, [options])
   * @param {String} [page]
   *   [en]Page URL. Can be either a HTML document or a <code>&lt;ons-template&gt;</code>.[/en]
   *   [ja]pageのURLか、もしくはons-templateで宣言したテンプレートのid属性の値を指定できます。[/ja]
   * @param {Object} [options]
   *   [en]Parameter object.[/en]
   *   [ja]オプションを指定するオブジェクト。[/ja]
   * @param {String} [options.page]
   *   [en]PageURL. Only necssary if `page` parameter is omitted.[/en]
   *   [ja][/ja]
   * @param {String} [options.pageHTML]
   *   [en]HTML code that will be computed as a new page. Overwrites `page` parameter.[/en]
   *   [ja][/ja]
   * @param {String} [options.animation]
   *   [en]Animation name. Available animations are "slide", "simpleslide", "lift", "fade" and "none".[/en]
   *   [ja]アニメーション名を指定します。"slide", "simpleslide", "lift", "fade", "none"のいずれかを指定できます。[/ja]
   * @param {String} [options.animationOptions]
   *   [en]Specify the animation's duration, delay and timing. E.g.  <code>{duration: 0.2, delay: 0.4, timing: 'ease-in'}</code>[/en]
   *   [ja]アニメーション時のduration, delay, timingを指定します。e.g. <code>{duration: 0.2, delay: 0.4, timing: 'ease-in'}</code> [/ja]
   * @param {Function} [options.onTransitionEnd]
   *   [en]Function that is called when the transition has ended.[/en]
   *   [ja]pushPage()による画面遷移が終了した時に呼び出される関数オブジェクトを指定します。[/ja]
   * @description
   *   [en]Pushes the specified pageUrl into the page stack.[/en]
   *   [ja]指定したpageUrlを新しいページスタックに追加します。新しいページが表示されます。[/ja]
   */

  /**
   * Pushes the specified pageUrl into the page stack and
   * if options object is specified, apply the options.
   *
   * @param {String} page
   * @param {Object} [options]
   * @param {String/NavigatorTransitionAnimator} [options.animation]
   * @param {Object} [options.animationOptions]
   * @param {Function} [options.onTransitionEnd]
   * @param {Boolean} [options.cancelIfRunning]
   * @param {String} [options.pageHTML]
   * @return {Promise} Resolves to the new top page object.
   */
  pushPage(page, options = {}) {

    if (typeof page === 'object' && page !== null) {
      options = page;
    } else {
      options.page = page;
    }

    if (options && typeof options != 'object') {
      throw new Error('options must be an object. You supplied ' + options);
    }

    if (options.cancelIfRunning && this._isPushing) {
      return Promise.reject('pushPage is already running.');
    }

    if (this._emitPrePushEvent()) {
      return Promise.reject('Canceled in prepush event.');
    }

    options.animationOptions = util.extend(
      options.animationOptions || {},
      AnimatorFactory.parseAnimationOptionsString(this.getAttribute('animation-options'))
    );

    this._isPushing = true;

    return new Promise(resolve => {
      this._doorLock.waitUnlock(() => resolve(this._pushPage(options)));
    });
  }

  _pushPage(options) {
    const unlock = this._doorLock.lock();
    const done = function() {
      unlock();
    };

    const run = templateHTML => {
      const element = this._createPageElement(templateHTML);
      return this._pushPageDOM(this._createPageObject(options.page, element, options), done);
    };

    if (options.pageHTML) {
      return run(options.pageHTML);
    } else {
      return internal.getPageHTMLAsync(options.page).then(run);
    }
  }

  /**
   * @param {Object} pageObject
   * @param {Function} [unlock]
   */
 _pushPageDOM(pageObject, unlock) {
    unlock = unlock || function() {};

    let element = pageObject.element;
    let options = pageObject.options;

    // for "postpush" event
    const eventDetail = {
      enterPage: pageObject,
      leavePage: this._pages[this._pages.length - 1],
      navigator: this
    };

    this._pages.push(pageObject);
    pageObject.updateBackButton();

    return new Promise(resolve => {

      const done = () => {
        if (this._pages[this._pages.length - 2]) {
          this._pages[this._pages.length - 2].element.style.display = 'none';
        }

        this._isPushing = false;
        unlock();

        util.triggerElementEvent(this, 'postpush', eventDetail);

        if (typeof options.onTransitionEnd === 'function') {
          options.onTransitionEnd();
        }
        element = null;

        resolve(this._pages[this._pages.length - 1]);
      };

      this._isPushing = true;

      rewritables.link(this, element, options, element => {
        CustomElements.upgrade(element);

        setTimeout(() => {
          if (this._pages.length > 1) {
            const leavePage = this._pages.slice(-2)[0];
            const enterPage = this._pages.slice(-1)[0];

            this.appendChild(element);
            leavePage.element._hide();
            enterPage.element._show();

            options.animator.push(enterPage, leavePage, done);
          } else {
            this.appendChild(element);
            element._show();

            done();
          }
        }, 1000 / 60);
      });

    });
  }

  /**
   * @method bingPageTop
   * @signature bringPageTop(item, [options])
   * @param {String|Number} item
   *   [en]Page URL or index of an existing page in navigator's stack.[/en]
   *   [ja]ページのURLかもしくはons-navigatorのページスタックのインデックス値を指定します。[/ja]
   * @param {Object} [options]
   *   [en]Parameter object.[/en]
   *   [ja]オプションを指定するオブジェクト。[/ja]
   * @param {String} [options.animation]
   *   [en]Animation name. Available animations are "slide", "simpleslide", "lift", "fade" and "none".[/en]
   *   [ja]アニメーション名を指定します。"slide", "simpleslide", "lift", "fade", "none"のいずれかを指定できます。[/ja]
   * @param {String} [options.animationOptions]
   *   [en]Specify the animation's duration, delay and timing. E.g.  <code>{duration: 0.2, delay: 0.4, timing: 'ease-in'}</code>[/en]
   *   [ja]アニメーション時のduration, delay, timingを指定します。e.g. <code>{duration: 0.2, delay: 0.4, timing: 'ease-in'}</code> [/ja]
   * @param {Function} [options.onTransitionEnd]
   *   [en]Function that is called when the transition has ended.[/en]
   *   [ja]pushPage()による画面遷移が終了した時に呼び出される関数オブジェクトを指定します。[/ja]
   * @description
   *   [en]Brings the given page to the top of the page-stack if already exists or pushes it into the stack if doesn't.[/en]
   *   [ja]指定したページをページスタックの一番上に移動します。もし指定したページが無かった場合新しくpushされます。[/ja]
   */

  /**
   * Brings the given pageUrl or index to the top of the page stack
   * if already exists or pushes the page into the stack if doesn't.
   * If options object is specified, apply the options.
   *
   * @param {String|Number} item Page name or valid index.
   * @param {Object} options
   * @return {Promise} Resolves to the new top page object.
   */
  bringPageTop(item, options = {}) {

    if (options && typeof options != 'object') {
      throw new Error('options must be an object. You supplied ' + options);
    }

    if (options.cancelIfRunning && this._isPushing) {
      return Promise.reject('pushPage is already running.');
    }

    if (this._emitPrePushEvent()) {
      return Promise.reject('Canceled in prepush event.');
    }


    let index;
    if (typeof item === 'string') {
      options.page = item;
      index = this._lastIndexOfPage(options.page);
    } else if (typeof item === 'number') {
      index = this._normalizeIndex(item);
      if (item >= this._pages.length) {
        throw new Error('The provided index does not match an existing page.');
      }
      options.page = this._pages[index].page;
    } else {
      throw new Error('First argument must be a page name or the index of an existing page. You supplied ' + item);
    }


    if (index < 0) {
      // Fallback pushPage
      return new Promise(resolve => {
        this._doorLock.waitUnlock(() => resolve(this._pushPage(options)));
      });
    } else if (index === this._pages.length - 1) {
      // Page is already the top
      return Promise.resolve(this._pages[index]);
    } else {
      // Bring to top
      const tryBringPageTop = () => {
        const unlock = this._doorLock.lock();
        const done = function() {
          unlock();
        };

        let pageObject = this._pages.splice(index, 1)[0];
        pageObject.element.style.display = 'block';
        pageObject.element.setAttribute('_skipinit', '');

        if (options.animation) {
          options.animator = this._animatorFactory.newAnimator(options);
        }

        pageObject.options = util.extend(pageObject.options, options);
        return this._pushPageDOM(pageObject, done);
      };

      return new Promise(resolve => {
        this._doorLock.waitUnlock(() => resolve(tryBringPageTop()));
      });
    }
  }

  /**
   * @param {String} page
   * @return {Number} Returns the last index at which the given page
   * is found in the page-stack, or -1 if it is not present.
   */
  _lastIndexOfPage(page) {
    let index;
    for (index = this._pages.length - 1; index >= 0; index--) {
      if (this._pages[index].page === page) {
        break;
      }
    }
    return index;
  }

  /**
   * @return {Boolean} Whether if event is canceled.
   */
  _emitPrePushEvent() {
    let isCanceled = false;

    util.triggerElementEvent(this, 'prepush', {
      navigator: this,
      currentPage: this._pages.length > 0 ? this.getCurrentPage() : undefined,
      cancel: function() {
        isCanceled = true;
      }
    });

    return isCanceled;
  }

  /**
   * @return {Boolean} Whether if event is canceled.
   */
  _emitPrePopEvent() {
    let isCanceled = false;

    const leavePage = this.getCurrentPage();
    util.triggerElementEvent(this, 'prepop', {
      navigator: this,
      // TODO: currentPage will be deprecated
      currentPage: leavePage,
      leavePage: leavePage,
      enterPage: this._pages[this._pages.length - 2],
      cancel: function() {
        isCanceled = true;
      }
    });

    return isCanceled;
  }

  /**
   * @param {String} page
   * @param {Element} element
   * @param {Object} options
   */
  _createPageObject(page, element, options) {

    options.animator = this._animatorFactory.newAnimator(options);

    return new NavigatorPage({
      page: page,
      element: element,
      options: options,
      navigator: this
    });
  }

  _createPageElement(templateHTML) {
    const pageElement = util.createElement(internal.normalizePageHTML(templateHTML));

    if (pageElement.nodeName.toLowerCase() !== 'ons-page') {
      throw new Error('You must supply an "ons-page" element to "ons-navigator".');
    }

    return pageElement;
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

