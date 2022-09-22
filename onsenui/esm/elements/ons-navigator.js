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

import onsElements from '../ons/elements.js';
import util from '../ons/util.js';
import internal from '../ons/internal/index.js';
import SwipeReveal from '../ons/internal/swipe-reveal.js';
import AnimatorFactory from '../ons/internal/animator-factory.js';
import NavigatorAnimator from './ons-navigator/animator.js';
import IOSSlideNavigatorAnimator from './ons-navigator/ios-slide-animator.js';
import IOSLiftNavigatorAnimator from './ons-navigator/ios-lift-animator.js';
import IOSFadeNavigatorAnimator from './ons-navigator/ios-fade-animator.js';
import MDSlideNavigatorAnimator from './ons-navigator/md-slide-animator.js';
import MDLiftNavigatorAnimator from './ons-navigator/md-lift-animator.js';
import MDFadeNavigatorAnimator from './ons-navigator/md-fade-animator.js';
import NoneNavigatorAnimator from './ons-navigator/none-animator.js';
import platform from '../ons/platform.js';
import contentReady from '../ons/content-ready.js';
import BaseElement from './base/base-element.js';
import deviceBackButtonDispatcher from '../ons/internal/device-back-button-dispatcher.js';
import {PageLoader, defaultPageLoader, instantPageLoader} from '../ons/page-loader.js';

const _animatorDict = {
  'default': function () { return platform.isAndroid() ? MDFadeNavigatorAnimator : IOSSlideNavigatorAnimator; },
  'slide': function () { return platform.isAndroid() ? MDSlideNavigatorAnimator : IOSSlideNavigatorAnimator; },
  'lift': function () { return platform.isAndroid() ? MDLiftNavigatorAnimator : IOSLiftNavigatorAnimator; },
  'fade': function () { return platform.isAndroid() ? MDFadeNavigatorAnimator : IOSFadeNavigatorAnimator; },
  'slide-ios': IOSSlideNavigatorAnimator,
  'slide-md': MDSlideNavigatorAnimator,
  'lift-ios': IOSLiftNavigatorAnimator,
  'lift-md': MDLiftNavigatorAnimator,
  'fade-ios': IOSFadeNavigatorAnimator,
  'fade-md': MDFadeNavigatorAnimator,
  'none': NoneNavigatorAnimator
};

const rewritables = {
  /**
   * @param {Element} navigatorSideElement
   * @param {Function} callback
   */
  ready(navigatorElement, callback) {
    callback();
  }
};

const verifyPageElement = el => (el.nodeName !== 'ONS-PAGE') && util.throw( 'Only page elements can be children of navigator');

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
 * @guide lifecycle.html#events
 *   [en]Overview of page events[/en]
 *   [ja]Overview of page events[/ja]
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
 * <template id="page.html">
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
 * </template>
 */
export default class NavigatorElement extends BaseElement {

  /**
   * @attribute page
   * @initonly
   * @type {String}
   * @description
   *   [en]First page to show when navigator is initialized.[/en]
   *   [ja]ナビゲーターが初期化された時に表示するページを指定します。[/ja]
   */

  /**
   * @attribute swipeable
   * @type {Boolean}
   * @description
   *   [en]Enable iOS "swipe to pop" feature.[/en]
   *   [ja][/ja]
   */

  /**
   * @attribute swipe-target-width
   * @type {String}
   * @default 20px
   * @description
   *   [en]The width of swipeable area calculated from the edge (in pixels). Use this to enable swipe only when the finger touch on the screen edge.[/en]
   *   [ja]スワイプの判定領域をピクセル単位で指定します。画面の端から指定した距離に達するとページが表示されます。[/ja]
   */

  /**
   * @attribute swipe-threshold
   * @type {Number}
   * @default 0.2
   * @description
   *  [en]Specify how much the page needs to be swiped before popping. A value between `0` and `1`.[/en]
   *  [ja][/ja]
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
   * @property animationOptions
   * @type {Object}
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
   * @param {Object} event.swipeToPop
   *   [en]True if the pop was triggered by the user swiping to pop.[/en]
   *   [ja][/ja]
   * @param {Object} event.onsBackButton
   *   [en]True if the pop was caused by pressing an ons-back-button.[/en]
   *   [ja][/ja]
   */

  /**
   * @event swipe
   * @description
   *   [en]Fired whenever the user slides the navigator (swipe-to-pop).[/en]
   *   [ja][/ja]
   * @param {Object} event [en]Event object.[/en]
   * @param {Object} event.ratio
   *   [en]Decimal ratio (0-1).[/en]
   *   [ja][/ja]
   * @param {Object} event.animationOptions
   *   [en][/en]
   *   [ja][/ja]
   */

  get animatorFactory() {
    return this._animatorFactory;
  }

  constructor() {
    super();

    this._isRunning = false;
    this._initialized = false;
    this._pageLoader = defaultPageLoader;
    this._pageMap = new WeakMap();

    this._updateAnimatorFactory();
  }

  /**
   * @property pageLoader
   * @type {PageLoader}
   * @description
   *   [en]PageLoader instance. It can be overriden to change the way pages are loaded by this element. Useful for lib developers.[/en]
   *   [ja]PageLoaderインスタンスを格納しています。[/ja]
   */
  get pageLoader() {
    return this._pageLoader;
  }

  set pageLoader(pageLoader) {
    if (!(pageLoader instanceof PageLoader)) {
      util.throwPageLoader();
    }
    this._pageLoader = pageLoader;
  }

  _getPageTarget() {
    return this._page || this.getAttribute('page');
  }

  /**
   * @property page
   * @type {*}
   * @description
   *   [en]Specify the page to be loaded during initialization. This value takes precedence over the `page` attribute. Useful for lib developers.[/en]
   *   [ja]初期化時に読み込むページを指定します。`page`属性で指定した値よりも`page`プロパティに指定した値を優先します。[/ja]
   */
  get page() {
    return this._page;
  }

  set page(page) {
    this._page = page;
  }

  connectedCallback() {
    this.onDeviceBackButton = this._onDeviceBackButton.bind(this);

    if (!platform.isAndroid() || this.getAttribute('swipeable') === 'force') {
      let swipeAnimator;

      this._swipe = new SwipeReveal({
        element: this,
        getThreshold: () => Math.max(0.2, parseFloat(this.getAttribute('swipe-threshold')) || 0),

        swipeMax: () => {
          const ratio = 1;
          const animationOptions = { duration: swipeAnimator.durationSwipe, timing: swipeAnimator.timingSwipe };
          this._onSwipe && this._onSwipe(ratio, animationOptions);
          util.triggerElementEvent(this, 'swipe', { ratio, animationOptions });
          this[this.swipeMax ? 'swipeMax' : 'popPage']({ animator: swipeAnimator, swipeToPop: true });
          swipeAnimator = null;
        },
        swipeMid: (distance, width) => {
          const ratio = distance / width;
          this._onSwipe && this._onSwipe(ratio);
          util.triggerElementEvent(this, 'swipe', { ratio });
          swipeAnimator.translate(distance, width, this.topPage.previousElementSibling, this.topPage);
        },
        swipeMin: () => {
          const ratio = 0;
          const animationOptions = { duration: swipeAnimator.durationRestore, timing: swipeAnimator.timingSwipe };
          this._onSwipe && this._onSwipe(ratio, animationOptions);
          util.triggerElementEvent(this, 'swipe', { ratio, animationOptions });
          swipeAnimator.restore(this.topPage.previousElementSibling, this.topPage);
          swipeAnimator = null;
        },

        ignoreSwipe: (event, distance) => {
          // Basic conditions
          if (!this._isRunning && this.children.length > 1) {

            // Area or directional issues
            const area = parseInt(this.getAttribute('swipe-target-width') || 25, 10);
            if (event.gesture.direction ===  'right' && area > distance) {

              // Swipes on ons-back-button and its children
              const isBB = el => /ons-back-button/i.test(el.tagName);
              if (!isBB(event.target) && !util.findParent(event.target, isBB, p => /ons-page/i.test(p.tagName))) {

                // Animator is swipeable
                const animation = (this.topPage.pushedOptions || {}).animation || this.animatorFactory._animation;
                const Animator = _animatorDict[animation] instanceof Function
                  ? _animatorDict[animation].call()
                  : _animatorDict[animation];

                if (typeof Animator !== 'undefined' && Animator.swipeable) {
                  swipeAnimator = new Animator(); // Prepare for the swipe
                  return false;
                }
              }
            }
          }

          return true; // Ignore swipe
        }
      });

      this.attributeChangedCallback('swipeable');
    }

    if (this._initialized) {
      return;
    }

    this._initialized = true;

    const deferred = util.defer();
    this.loaded = deferred.promise;

    rewritables.ready(this, () => {
      const show = !util.hasAnyComponentAsParent(this);
      const options = { animation: 'none', show };

      if (this.pages.length === 0 && this._getPageTarget()) {
        this.pushPage(this._getPageTarget(), options).then(() => deferred.resolve());
      } else if (this.pages.length > 0) {
        for (var i = 0; i < this.pages.length; i++) {
          verifyPageElement(this.pages[i]);
        }

        if (this.topPage) {
          contentReady(this.topPage, () =>
            setTimeout(() => {
              deferred.resolve();
              show && this.topPage._show();
              this._updateLastPageBackButton();
            }, 0)
          );
        }
      } else {
        contentReady(this, () => {
          if (this.pages.length === 0 && this._getPageTarget()) {
            this.pushPage(this._getPageTarget(), options).then(() => deferred.resolve());
          } else {
            deferred.resolve();
          }
        });
      }
    });
  }

  _updateAnimatorFactory() {
    this._animatorFactory = new AnimatorFactory({
      animators: _animatorDict,
      baseClass: NavigatorAnimator,
      baseClassName: 'NavigatorAnimator',
      defaultAnimation: this.getAttribute('animation')
    });
  }

  disconnectedCallback() {
    this._backButtonHandler.destroy();
    this._backButtonHandler = null;

    this._swipe && this._swipe.dispose();
    this._swipe = null;
  }

  static get observedAttributes() {
    return ['animation', 'swipeable'];
  }

  attributeChangedCallback(name, last, current) {
    switch (name) {
      case 'animation':
        this._updateAnimatorFactory();
        break;
      case 'swipeable':
        this._swipe && this._swipe.update();
        break;
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
   * @param {Function} [options.callback]
   *   [en]Function that is called when the transition has ended.[/en]
   *   [ja]このメソッドによる画面遷移が終了した際に呼び出される関数オブジェクトを指定します。[/ja]
   * @param {Object} [options.data]
   *   [en]Custom data that will be stored in the new page element.[/en]
   *   [ja][/ja]
   * @param {Number} [options.times]
   *   [en]Number of pages to be popped. Only one animation will be shown.[/en]
   *   [ja][/ja]
   * @return {Promise}
   *   [en]Promise which resolves to the revealed page.[/en]
   *   [ja]明らかにしたページを解決するPromiseを返します。[/ja]
   * @description
   *   [en]Pops the current page from the page stack. The previous page will be displayed.[/en]
   *   [ja]現在表示中のページをページスタックから取り除きます。一つ前のページに戻ります。[/ja]
   */
  popPage(options = {}) {
    ({options} = this._preparePageAndOptions(null, options));

    if (util.isInteger(options.times) && options.times > 1) {
      this._removePages(options.times);
    }

    const popUpdate = () => new Promise((resolve) => {
      this._pageLoader.unload(this.pages[this.pages.length - 1]);
      resolve();
    });

    return this._popPage(options, popUpdate);
  }

  _popPage(options, update = () => Promise.resolve()) {
    if (this._isRunning) {
      return Promise.reject('popPage is already running.');
    }

    if (this.pages.length <= 1) {
      return Promise.reject('ons-navigator\'s page stack is empty.');
    }

    if (this._emitPrePopEvent()) {
      return Promise.reject('Canceled in prepop event.');
    }

    const length = this.pages.length;

    this._isRunning = true;

    this.pages[length - 2].updateBackButton((length - 2) > 0);

    return new Promise(resolve => {
      const leavePage = this.pages[length - 1];
      const enterPage = this.pages[length - 2];

      options = util.extend({}, this.options || {}, options);

      if (options.data) {
        enterPage.data = util.extend({}, enterPage.data || {}, options.data || {});
      }

      const done = () => {
        update().then(() => {
          this._isRunning = false;

          enterPage._show();
          util.triggerElementEvent(this, 'postpop', {
            leavePage,
            enterPage,
            navigator: this,
            swipeToPop: !!options.swipeToPop,        // whether the pop was triggered by the user swiping
            onsBackButton: !!options.onsBackButton   // whether the pop was triggered by clicking ons-back-button
          });

          options.callback && options.callback(enterPage);

          resolve(enterPage);
        });
      };

      leavePage._hide();
      enterPage.style.display = '';

      const animator = options.animator || this._animatorFactory.newAnimator(options);
      animator.pop(this.pages[length - 2], this.pages[length - 1], done);
    }).catch(() => this._isRunning = false);
  }


  /**
   * @method pushPage
   * @signature pushPage(page, [options])
   * @param {String} page
   *   [en]Page URL. Can be either a HTML document or a template defined with the `<template>` tag.[/en]
   *   [ja]pageのURLか、もしくは`<template>`で宣言したテンプレートのid属性の値を指定できます。[/ja]
   * @param {Object} [options]
   *   [en]Parameter object.[/en]
   *   [ja]オプションを指定するオブジェクト。[/ja]
   * @param {String} [options.page]
   *   [en]Page URL. Only necessary if `page` parameter is null or undefined.[/en]
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
   * @param {Object} [options.data]
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
    ({page, options} = this._preparePageAndOptions(page, options));

    const prepare = pageElement => {
      verifyPageElement(pageElement);
      this._pageMap.set(pageElement, page);
      pageElement = util.extend(pageElement, {
        data: options.data
      });
      pageElement.style.visibility = 'hidden';
    };

    if (options.pageHTML) {
      return this._pushPage(options, () => new Promise(resolve => {
        instantPageLoader.load({page: options.pageHTML, parent: this, params: options.data}, pageElement => {
          prepare(pageElement);
          resolve();
        });
      }));
    }

    return this._pushPage(options, () => new Promise((resolve, reject) => {
      this._pageLoader.load({page, parent: this, params: options.data}, pageElement => {
        prepare(pageElement);
        resolve();
      }, error => {
        this._isRunning = false;
        reject(error);
      });
    }));
  }

  _pushPage(options = {}, update = () => Promise.resolve()) {
    if (this._isRunning) {
      return Promise.reject('pushPage is already running.');
    }

    if (this._emitPrePushEvent()) {
      return Promise.reject('Canceled in prepush event.');
    }

    this._isRunning = true;

    const animationOptions = this.animationOptions;
    options = util.extend({}, this.options || {}, {animationOptions}, options);

    const animator = this._animatorFactory.newAnimator(options);

    return update().then(() => {
      const pageLength = this.pages.length;

      const enterPage  = this.pages[pageLength - 1];
      const leavePage = options.leavePage || this.pages[pageLength - 2];

      verifyPageElement(enterPage);

      enterPage.updateBackButton(pageLength > (options._replacePage ? 2 : 1));

      enterPage.pushedOptions = util.extend({}, enterPage.pushedOptions || {}, options || {});
      enterPage.data = util.extend({}, enterPage.data || {}, options.data || {});
      enterPage.unload = enterPage.unload || options.unload;

      return new Promise(resolve => {
        const done = () => {
          this._isRunning = false;

          options.show !== false && setImmediate(() => enterPage._show());
          util.triggerElementEvent(this, 'postpush', {leavePage, enterPage, navigator: this});

          if (leavePage) {
            leavePage.style.display = 'none';
          }

          options.callback && options.callback(enterPage);

          resolve(enterPage);
        };

        enterPage.style.visibility = '';
        if (leavePage) {
          leavePage._hide();
          animator.push(enterPage, leavePage, done);
        } else {
          done();
        }
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
    return this.pushPage(page, options)
      .then(resolvedValue => {
        if (this.pages.length > 1) {
          this._pageLoader.unload(this.pages[this.pages.length - 2]);
        }
        this._updateLastPageBackButton();

        return Promise.resolve(resolvedValue);
      });
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
    ({page, options} = this._preparePageAndOptions(page, options));
    index = this._normalizeIndex(index);

    if (index >= this.pages.length) {
      return this.pushPage(page, options);
    }

    page = typeof options.pageHTML === 'string' ? options.pageHTML : page;
    const loader = typeof options.pageHTML === 'string' ? instantPageLoader : this._pageLoader;

    return new Promise(resolve => {
      loader.load({page, parent: this}, pageElement => {
        verifyPageElement(pageElement);
        this._pageMap.set(pageElement, page);
        pageElement = util.extend(pageElement, {
          data: options.data,
          pushedOptions: options
        });

        options.animationOptions = util.extend(
          {},
          this.animationOptions,
          options.animationOptions || {}
        );

        pageElement.style.display = 'none';
        this.insertBefore(pageElement, this.pages[index]);
        this.topPage.updateBackButton(true);

        setTimeout(() => {
          pageElement = null;
          resolve(this.pages[index]);
        }, 1000 / 60);
      });
    });
  }

  /**
   * @method removePage
   * @signature removePage(index, [options])
   * @param {Number} index
   *   [en]The index where it should be removed.[/en]
   *   [ja]スタックから削除するページのインデックスを指定します。[/ja]
   * @return {Promise}
   *   [en]Promise which resolves to the revealed page.[/en]
   *   [ja]削除によって表示されたページを解決するPromiseを返します。[/ja]
   * @description
   *   [en]Remove the specified page at a position in the stack defined by the `index` argument. Extends `popPage()` parameters.[/en]
   *   [ja]指定したインデックスにあるページを削除します。[/ja]
   */
  removePage(index, options = {}) {
    index = this._normalizeIndex(index);

    if (index < this.pages.length - 1) {
      return new Promise(resolve => {
        const leavePage = this.pages[index];
        const enterPage = this.topPage;

        this._pageMap.delete(leavePage);
        this._pageLoader.unload(leavePage);
        if (this.pages.length === 1) { // edge case
          this.topPage.updateBackButton(false);
        }

        resolve(enterPage);
      });
    } else {
      return this.popPage(options);
    }
  }

  /**
   * @method resetToPage
   * @signature resetToPage(page, [options])
   * @return {Promise}
   *   [en]Promise which resolves to the new top page.[/en]
   *   [ja]新しいトップページを解決するPromiseを返します。[/ja]
   * @param {Boolean} [options.pop]
   *   [en]Performs 'pop' effect if `true` instead of 'push' or none. This also sets `options.animation` value to `default` instead of `none`.[/en]
   *   [ja][/ja]
   * @description
   *   [en]Clears page stack and adds the specified page to the stack. Extends `pushPage()` parameters.[/en]
   *   [ja]ページスタックをリセットし、指定したページを表示します。[/ja]
   */
  resetToPage(page, options = {}) {
    ({page, options} = this._preparePageAndOptions(page, options));

    if (!options.animator && !options.animation && !options.pop) {
      options.animation = 'none';
    }

    if (!options.page && !options.pageHTML && this._getPageTarget()) {
      page = options.page = this._getPageTarget();
    }

    if (options.pop) {
      this._removePages();
      return this.insertPage(0, page, { data: options.data })
        .then(() => this.popPage(options));
    }

    // Tip: callback runs before resolved promise
    const callback = options.callback;
    options.callback = newPage => {
      this._removePages();
      newPage.updateBackButton(false);
      callback && callback(newPage);
    };

    return this.pushPage(page, options);
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
      util.throw('First argument must be a page name or the index of an existing page. You supplied ' + item);
    }
    const index = typeof item === 'number' ? this._normalizeIndex(item) : this._lastIndexOfPage(item);
    const page = this.pages[index];

    if (index < 0) {
      return this.pushPage(item, options);
    }
    ({options} = this._preparePageAndOptions(page, options));

    if (index === this.pages.length - 1) {
      return Promise.resolve(page);
    }
    if (!page) {
      util.throw('Failed to find item ' + item);
    }
    if (this._isRunning) {
      return Promise.reject('pushPage is already running.');
    }
    if (this._emitPrePushEvent()) {
      return Promise.reject('Canceled in prepush event.');
    }

    page.style.display = '';
    page.style.visibility = 'hidden';
    page.parentNode.appendChild(page);
    return this._pushPage(options);
  }

  _preparePageAndOptions(page, options = {}) {
    if (typeof options != 'object') {
      util.throw('options must be an object. You supplied ' + options);
    }

    if ((page === null || page === undefined) && options.page) {
      page = options.page;
    }

    options = util.extend({}, this.options || {}, options, {page});

    return {page, options};
  }

  _removePages(times) {
    const pages = this.pages;
    let until = times === undefined ? 0 : pages.length - times;
    until = until < 0 ? 1 : until;

    for (let i = pages.length - 2; i >= until; i--) {
      this._pageMap.delete(pages[i]);
      this._pageLoader.unload(pages[i]);
    }
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
      if (pageName === this._pageMap.get(this.pages[index])) {
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

  // TODO: 書き直す
  _createPageElement(templateHTML) {
    const pageElement = util.createElement(internal.normalizePageHTML(templateHTML));
    verifyPageElement(pageElement);
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
    let last = this.lastElementChild;
    while (last && last.tagName !== 'ONS-PAGE') { last = last.previousElementSibling; }
    return last;
  }

  /**
   * @property pages
   * @readonly
   * @type {Array}
   * @description
   *   [en]Copy of the navigator's page stack.[/en]
   *   [ja][/ja]
   */
  get pages() {
    return util.arrayFrom(this.children)
      .filter(element => element.tagName === 'ONS-PAGE');
  }

  /**
   * @property onSwipe
   * @type {Function}
   * @description
   *   [en]Hook called whenever the user slides the navigator (swipe-to-pop). It gets a decimal ratio (0-1) and an animationOptions object as arguments.[/en]
   *   [ja][/ja]
   */
  get onSwipe() {
    return this._onSwipe;
  }

  set onSwipe(value) {
    if (value && !(value instanceof Function)) {
      util.throw('"onSwipe" must be a function');
    }
    this._onSwipe = value;
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

  get options() {
    return this._options;
  }
  set options(object) {
    this._options = object;
  }

  get animationOptions() {
    return this.hasAttribute('animation-options') ?
      AnimatorFactory.parseAnimationOptionsString(this.getAttribute('animation-options')) : {};
  }

  set animationOptions(value) {
    if (value === undefined || value === null) {
      this.removeAttribute('animation-options');
    } else {
      this.setAttribute('animation-options', JSON.stringify(value));
    }
  }

  set _isRunning(value) {
    this.setAttribute('_is-running', value ? 'true' : 'false');
  }
  get _isRunning() {
   return JSON.parse(this.getAttribute('_is-running'));
  }

  _show() {
    this.loaded.then(() => this.topPage && this.topPage._show());
  }

  _hide() {
    this.topPage && this.topPage._hide();
  }

  _destroy() {
    for (let i = this.pages.length - 1; i >= 0; i--) {
      this._pageLoader.unload(this.pages[i]);
    }

    this.remove();
  }

  /**
   * @param {String} name
   * @param {Function} Animator
   */
  static registerAnimator(name, Animator) {
    if (!(Animator.prototype instanceof NavigatorAnimator)) {
      util.throwAnimator('Navigator');
    }

    _animatorDict[name] = Animator;
  }

  static get animators() {
    return _animatorDict;
  }

  static get NavigatorAnimator() {
    return NavigatorAnimator;
  }

  static get events() {
    return ['prepush', 'postpush', 'prepop', 'postpop', 'swipe'];
  }

  static get rewritables() {
    return rewritables;
  }
}

onsElements.Navigator = NavigatorElement;
customElements.define('ons-navigator', NavigatorElement);
