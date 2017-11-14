import _typeof from 'babel-runtime/helpers/typeof';
import _setImmediate from 'babel-runtime/core-js/set-immediate';
import _Promise from 'babel-runtime/core-js/promise';
import _WeakMap from 'babel-runtime/core-js/weak-map';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _createClass from 'babel-runtime/helpers/createClass';
import _inherits from 'babel-runtime/helpers/inherits';
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

import ons from '../../ons';
import util from '../../ons/util';
import internal from '../../ons/internal';
import SwipeReveal from '../../ons/internal/swipe-reveal';
import AnimatorFactory from '../../ons/internal/animator-factory';
import NavigatorAnimator from './animator';
import IOSSlideNavigatorAnimator from './ios-slide-animator';
import IOSSwipeNavigatorAnimator from './ios-swipe-animator';
import IOSLiftNavigatorAnimator from './ios-lift-animator';
import IOSFadeNavigatorAnimator from './ios-fade-animator';
import MDSlideNavigatorAnimator from './md-slide-animator';
import MDLiftNavigatorAnimator from './md-lift-animator';
import MDFadeNavigatorAnimator from './md-fade-animator';
import NoneNavigatorAnimator from './none-animator';
import platform from '../../ons/platform';
import contentReady from '../../ons/content-ready';
import BaseElement from '../base/base-element';
import deviceBackButtonDispatcher from '../../ons/internal/device-back-button-dispatcher';
import { PageLoader, defaultPageLoader, instantPageLoader } from '../../ons/page-loader';

var _animatorDict = {
  'default': function _default() {
    return platform.isAndroid() ? MDFadeNavigatorAnimator : IOSSlideNavigatorAnimator;
  },
  'slide': function slide() {
    return platform.isAndroid() ? MDSlideNavigatorAnimator : IOSSlideNavigatorAnimator;
  },
  'lift': function lift() {
    return platform.isAndroid() ? MDLiftNavigatorAnimator : IOSLiftNavigatorAnimator;
  },
  'fade': function fade() {
    return platform.isAndroid() ? MDFadeNavigatorAnimator : IOSFadeNavigatorAnimator;
  },
  'slide-ios': IOSSlideNavigatorAnimator,
  'slide-md': MDSlideNavigatorAnimator,
  'lift-ios': IOSLiftNavigatorAnimator,
  'lift-md': MDLiftNavigatorAnimator,
  'fade-ios': IOSFadeNavigatorAnimator,
  'fade-md': MDFadeNavigatorAnimator,
  'none': NoneNavigatorAnimator
};

var rewritables = {
  /**
   * @param {Element} navigatorSideElement
   * @param {Function} callback
   */
  ready: function ready(navigatorElement, callback) {
    callback();
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

var NavigatorElement = function (_BaseElement) {
  _inherits(NavigatorElement, _BaseElement);

  _createClass(NavigatorElement, [{
    key: 'animatorFactory',


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

    get: function get() {
      return this._animatorFactory;
    }
  }]);

  function NavigatorElement() {
    _classCallCheck(this, NavigatorElement);

    var _this = _possibleConstructorReturn(this, (NavigatorElement.__proto__ || _Object$getPrototypeOf(NavigatorElement)).call(this));

    _this._isRunning = false;
    _this._initialized = false;
    _this._pageLoader = defaultPageLoader;
    _this._pageMap = new _WeakMap();

    _this._updateAnimatorFactory();
    return _this;
  }

  /**
   * @property pageLoader
   * @type {PageLoader}
   * @description
   *   [en]PageLoader instance. It can be overriden to change the way pages are loaded by this element. Useful for lib developers.[/en]
   *   [ja]PageLoaderインスタンスを格納しています。[/ja]
   */


  _createClass(NavigatorElement, [{
    key: '_getPageTarget',
    value: function _getPageTarget() {
      return this._page || this.getAttribute('page');
    }

    /**
     * @property page
     * @type {*}
     * @description
     *   [en]Specify the page to be loaded during initialization. This value takes precedence over the `page` attribute. Useful for lib developers.[/en]
     *   [ja]初期化時に読み込むページを指定します。`page`属性で指定した値よりも`page`プロパティに指定した値を優先します。[/ja]
     */

  }, {
    key: 'connectedCallback',
    value: function connectedCallback() {
      var _this2 = this;

      this.onDeviceBackButton = this._onDeviceBackButton.bind(this);

      if (!platform.isAndroid() || this.getAttribute('swipeable') === 'force') {
        this._swipeAnimator = new IOSSwipeNavigatorAnimator();

        this._swipe = new SwipeReveal({
          element: this,
          swipeMax: function swipeMax() {
            return _this2[_this2.swipeMax ? 'swipeMax' : 'popPage']({ animator: _this2._swipeAnimator });
          },
          swipeMid: function swipeMid(distance, width) {
            return _this2._swipeAnimator.translate(distance, width, _this2.topPage.previousElementSibling, _this2.topPage);
          },
          swipeMin: function swipeMin() {
            return _this2._swipeAnimator.restore(_this2.topPage.previousElementSibling, _this2.topPage);
          },
          getThreshold: function getThreshold() {
            return Math.max(0.2, parseFloat(_this2.getAttribute('swipe-threshold')) || 0);
          },
          ignoreSwipe: function ignoreSwipe(event, distance) {
            if (/ons-back-button/i.test(event.target.tagName) || util.findParent(event.target, 'ons-back-button', function (p) {
              return (/ons-page/i.test(p.tagName)
              );
            })) {
              return true;
            }
            var area = parseInt(_this2.getAttribute('swipe-target-width') || 25, 10);
            return event.gesture.direction !== 'right' || area <= distance || _this2._isRunning || _this2.children.length <= 1;
          }
        });

        this.attributeChangedCallback('swipeable');
      }

      if (this._initialized) {
        return;
      }

      this._initialized = true;

      var deferred = util.defer();
      this.loaded = deferred.promise;

      rewritables.ready(this, function () {
        var show = !util.hasAnyComponentAsParent(_this2);
        var options = { animation: 'none', show: show };

        if (_this2.pages.length === 0 && _this2._getPageTarget()) {
          _this2.pushPage(_this2._getPageTarget(), options).then(function () {
            return deferred.resolve();
          });
        } else if (_this2.pages.length > 0) {
          for (var i = 0; i < _this2.pages.length; i++) {
            if (_this2.pages[i].nodeName !== 'ONS-PAGE') {
              throw new Error('The children of <ons-navigator> need to be of type <ons-page>');
            }
          }

          if (_this2.topPage) {
            contentReady(_this2.topPage, function () {
              return setTimeout(function () {
                deferred.resolve();
                show && _this2.topPage._show();
                _this2._updateLastPageBackButton();
              }, 0);
            });
          }
        } else {
          contentReady(_this2, function () {
            if (_this2.pages.length === 0 && _this2._getPageTarget()) {
              _this2.pushPage(_this2._getPageTarget(), options).then(function () {
                return deferred.resolve();
              });
            } else {
              deferred.resolve();
            }
          });
        }
      });
    }
  }, {
    key: '_updateAnimatorFactory',
    value: function _updateAnimatorFactory() {
      this._animatorFactory = new AnimatorFactory({
        animators: _animatorDict,
        baseClass: NavigatorAnimator,
        baseClassName: 'NavigatorAnimator',
        defaultAnimation: this.getAttribute('animation')
      });
    }
  }, {
    key: 'disconnectedCallback',
    value: function disconnectedCallback() {
      this._backButtonHandler.destroy();
      this._backButtonHandler = null;

      this._swipe && this._swipe.dispose();
      this._swipe = this._swipeAnimator = null;
    }
  }, {
    key: 'attributeChangedCallback',
    value: function attributeChangedCallback(name, last, current) {
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
     * @return {Promise}
     *   [en]Promise which resolves to the revealed page.[/en]
     *   [ja]明らかにしたページを解決するPromiseを返します。[/ja]
     * @description
     *   [en]Pops the current page from the page stack. The previous page will be displayed.[/en]
     *   [ja]現在表示中のページをページスタックから取り除きます。一つ前のページに戻ります。[/ja]
     */

  }, {
    key: 'popPage',
    value: function popPage() {
      var _this3 = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var _preparePageAndOption = this._preparePageAndOptions(null, options);

      options = _preparePageAndOption.options;


      var popUpdate = function popUpdate() {
        return new _Promise(function (resolve) {
          _this3._pageLoader.unload(_this3.pages[_this3.pages.length - 1]);
          resolve();
        });
      };

      return this._popPage(options, popUpdate);
    }
  }, {
    key: '_popPage',
    value: function _popPage(options) {
      var _this4 = this;

      var update = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
        return _Promise.resolve();
      };

      if (this._isRunning) {
        return _Promise.reject('popPage is already running.');
      }

      if (this.pages.length <= 1) {
        return _Promise.reject('ons-navigator\'s page stack is empty.');
      }

      if (this._emitPrePopEvent()) {
        return _Promise.reject('Canceled in prepop event.');
      }

      var length = this.pages.length;

      this._isRunning = true;

      this.pages[length - 2].updateBackButton(length - 2 > 0);

      return new _Promise(function (resolve) {
        var leavePage = _this4.pages[length - 1];
        var enterPage = _this4.pages[length - 2];

        options.animation = options.animation || (leavePage.pushedOptions ? leavePage.pushedOptions.animation : undefined);
        options.animationOptions = util.extend({}, leavePage.pushedOptions ? leavePage.pushedOptions.animationOptions : {}, options.animationOptions || {});

        if (options.data) {
          enterPage.data = util.extend({}, enterPage.data || {}, options.data || {});
        }

        var callback = function callback() {
          update().then(function () {
            _this4._isRunning = false;

            enterPage._show();
            util.triggerElementEvent(_this4, 'postpop', { leavePage: leavePage, enterPage: enterPage, navigator: _this4 });

            if (typeof options.callback === 'function') {
              options.callback();
            }

            resolve(enterPage);
          });
        };

        leavePage._hide();
        var animator = options.animator || _this4._animatorFactory.newAnimator(options);
        animator.pop(_this4.pages[length - 2], _this4.pages[length - 1], callback);
      }).catch(function () {
        return _this4._isRunning = false;
      });
    }

    /**
     * @method pushPage
     * @signature pushPage(page, [options])
     * @param {String} page
     *   [en]Page URL. Can be either a HTML document or a template defined with the `<ons-template>` tag.[/en]
     *   [ja]pageのURLか、もしくはons-templateで宣言したテンプレートのid属性の値を指定できます。[/ja]
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

  }, {
    key: 'pushPage',
    value: function pushPage(page) {
      var _this5 = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var _preparePageAndOption2 = this._preparePageAndOptions(page, options);

      page = _preparePageAndOption2.page;
      options = _preparePageAndOption2.options;


      var prepare = function prepare(pageElement) {
        _this5._verifyPageElement(pageElement);
        _this5._pageMap.set(pageElement, page);
        pageElement = util.extend(pageElement, {
          data: options.data
        });
        pageElement.style.visibility = 'hidden';
      };

      if (options.pageHTML) {
        return this._pushPage(options, function () {
          return new _Promise(function (resolve) {
            instantPageLoader.load({ page: options.pageHTML, parent: _this5, params: options.data }, function (pageElement) {
              prepare(pageElement);
              resolve();
            });
          });
        });
      }

      return this._pushPage(options, function () {
        return new _Promise(function (resolve) {
          _this5._pageLoader.load({ page: page, parent: _this5, params: options.data }, function (pageElement) {
            prepare(pageElement);
            resolve();
          });
        });
      });
    }
  }, {
    key: '_pushPage',
    value: function _pushPage() {
      var _this6 = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var update = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
        return _Promise.resolve();
      };

      if (this._isRunning) {
        return _Promise.reject('pushPage is already running.');
      }

      if (this._emitPrePushEvent()) {
        return _Promise.reject('Canceled in prepush event.');
      }

      this._isRunning = true;

      var animationOptions = AnimatorFactory.parseAnimationOptionsString(this.getAttribute('animation-options'));
      options = util.extend({}, this.options || {}, { animationOptions: animationOptions }, options);

      var animator = this._animatorFactory.newAnimator(options);

      return update().then(function () {
        var pageLength = _this6.pages.length;

        var enterPage = _this6.pages[pageLength - 1];
        var leavePage = options.leavePage || _this6.pages[pageLength - 2];

        if (enterPage.nodeName !== 'ONS-PAGE') {
          throw new Error('Only elements of type <ons-page> can be pushed to the navigator');
        }

        enterPage.updateBackButton(pageLength > (options._replacePage ? 2 : 1));

        enterPage.pushedOptions = util.extend({}, enterPage.pushedOptions || {}, options || {});
        enterPage.data = util.extend({}, enterPage.data || {}, options.data || {});
        enterPage.unload = enterPage.unload || options.unload;

        return new _Promise(function (resolve) {
          var done = function done() {
            _this6._isRunning = false;

            options.show !== false && _setImmediate(function () {
              return enterPage._show();
            });
            util.triggerElementEvent(_this6, 'postpush', { leavePage: leavePage, enterPage: enterPage, navigator: _this6 });

            if (typeof options.callback === 'function') {
              options.callback();
            }

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
      }).catch(function (error) {
        _this6._isRunning = false;
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

  }, {
    key: 'replacePage',
    value: function replacePage(page) {
      var _this7 = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      return this.pushPage(page, options).then(function (resolvedValue) {
        if (_this7.pages.length > 1) {
          _this7._pageLoader.unload(_this7.pages[_this7.pages.length - 2]);
        }
        _this7._updateLastPageBackButton();

        return _Promise.resolve(resolvedValue);
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

  }, {
    key: 'insertPage',
    value: function insertPage(index, page) {
      var _this8 = this;

      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var _preparePageAndOption3 = this._preparePageAndOptions(page, options);

      page = _preparePageAndOption3.page;
      options = _preparePageAndOption3.options;

      index = this._normalizeIndex(index);

      if (index >= this.pages.length) {
        return this.pushPage(page, options);
      }

      page = typeof options.pageHTML === 'string' ? options.pageHTML : page;
      var loader = typeof options.pageHTML === 'string' ? instantPageLoader : this._pageLoader;

      return new _Promise(function (resolve) {
        loader.load({ page: page, parent: _this8 }, function (pageElement) {
          _this8._verifyPageElement(pageElement);
          _this8._pageMap.set(pageElement, page);
          pageElement = util.extend(pageElement, {
            data: options.data,
            pushedOptions: options
          });

          options.animationOptions = util.extend({}, AnimatorFactory.parseAnimationOptionsString(_this8.getAttribute('animation-options')), options.animationOptions || {});

          _this8.insertBefore(pageElement, _this8.pages[index]);
          _this8.topPage.updateBackButton(true);

          setTimeout(function () {
            pageElement = null;
            resolve(_this8.pages[index]);
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

  }, {
    key: 'removePage',
    value: function removePage(index) {
      var _this9 = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      index = this._normalizeIndex(index);

      if (index < this.pages.length - 1) {
        return new _Promise(function (resolve) {
          var leavePage = _this9.pages[index];
          var enterPage = _this9.topPage;

          _this9._pageMap.delete(leavePage);
          _this9._pageLoader.unload(leavePage);
          if (_this9.pages.length === 1) {
            // edge case
            _this9.topPage.updateBackButton(false);
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
     * @description
     *   [en]Clears page stack and adds the specified page to the stack. Extends `pushPage()` parameters.[/en]
     *   [ja]ページスタックをリセットし、指定したページを表示します。[/ja]
     */

  }, {
    key: 'resetToPage',
    value: function resetToPage(page) {
      var _this10 = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var _preparePageAndOption4 = this._preparePageAndOptions(page, options);

      page = _preparePageAndOption4.page;
      options = _preparePageAndOption4.options;


      if (!options.animator && !options.animation) {
        options.animation = 'none';
      }

      var callback = options.callback;

      options.callback = function () {
        while (_this10.pages.length > 1) {
          _this10._pageLoader.unload(_this10.pages[0]);
        }

        _this10.pages[0].updateBackButton(false);
        callback && callback();
      };

      if (!options.page && !options.pageHTML && this._getPageTarget()) {
        page = options.page = this._getPageTarget();
      }

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

  }, {
    key: 'bringPageTop',
    value: function bringPageTop(item) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (['number', 'string'].indexOf(typeof item === 'undefined' ? 'undefined' : _typeof(item)) === -1) {
        throw new Error('First argument must be a page name or the index of an existing page. You supplied ' + item);
      }
      var index = typeof item === 'number' ? this._normalizeIndex(item) : this._lastIndexOfPage(item);
      var page = this.pages[index];

      if (index < 0) {
        return this.pushPage(item, options);
      }

      var _preparePageAndOption5 = this._preparePageAndOptions(page, options);

      options = _preparePageAndOption5.options;


      if (index === this.pages.length - 1) {
        return _Promise.resolve(page);
      }
      if (!page) {
        throw new Error('Failed to find item ' + item);
      }
      if (this._isRunning) {
        return _Promise.reject('pushPage is already running.');
      }
      if (this._emitPrePushEvent()) {
        return _Promise.reject('Canceled in prepush event.');
      }

      page.style.visibility = 'hidden';
      page.parentNode.appendChild(page);
      return this._pushPage(options);
    }
  }, {
    key: '_preparePageAndOptions',
    value: function _preparePageAndOptions(page) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) != 'object') {
        throw new Error('options must be an object. You supplied ' + options);
      }

      if ((page === null || page === undefined) && options.page) {
        page = options.page;
      }

      options = util.extend({}, this.options || {}, options, { page: page });

      return { page: page, options: options };
    }
  }, {
    key: '_updateLastPageBackButton',
    value: function _updateLastPageBackButton() {
      var index = this.pages.length - 1;
      if (index >= 0) {
        this.pages[index].updateBackButton(index > 0);
      }
    }
  }, {
    key: '_normalizeIndex',
    value: function _normalizeIndex(index) {
      return index >= 0 ? index : Math.abs(this.pages.length + index) % this.pages.length;
    }
  }, {
    key: '_onDeviceBackButton',
    value: function _onDeviceBackButton(event) {
      if (this.pages.length > 1) {
        this.popPage();
      } else {
        event.callParentHandler();
      }
    }
  }, {
    key: '_lastIndexOfPage',
    value: function _lastIndexOfPage(pageName) {
      var index = void 0;
      for (index = this.pages.length - 1; index >= 0; index--) {
        if (!this._pageMap.has(this.pages[index])) {
          throw Error('This is bug.');
        }

        if (pageName === this._pageMap.get(this.pages[index])) {
          break;
        }
      }
      return index;
    }
  }, {
    key: '_emitPreEvent',
    value: function _emitPreEvent(name) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var isCanceled = false;

      util.triggerElementEvent(this, 'pre' + name, util.extend({
        navigator: this,
        currentPage: this.pages[this.pages.length - 1],
        cancel: function cancel() {
          return isCanceled = true;
        }
      }, data));

      return isCanceled;
    }
  }, {
    key: '_emitPrePushEvent',
    value: function _emitPrePushEvent() {
      return this._emitPreEvent('push');
    }
  }, {
    key: '_emitPrePopEvent',
    value: function _emitPrePopEvent() {
      var l = this.pages.length;
      return this._emitPreEvent('pop', {
        leavePage: this.pages[l - 1],
        enterPage: this.pages[l - 2]
      });
    }

    // TODO: 書き直す

  }, {
    key: '_createPageElement',
    value: function _createPageElement(templateHTML) {
      var pageElement = util.createElement(internal.normalizePageHTML(templateHTML));
      this._verifyPageElement(pageElement);
      return pageElement;
    }

    /**
     * @param {Element} element
     */

  }, {
    key: '_verifyPageElement',
    value: function _verifyPageElement(element) {
      if (element.nodeName.toLowerCase() !== 'ons-page') {
        throw new Error('You must supply an "ons-page" element to "ons-navigator".');
      }
    }

    /**
     * @property onDeviceBackButton
     * @type {Object}
     * @description
     *   [en]Back-button handler.[/en]
     *   [ja]バックボタンハンドラ。[/ja]
     */

  }, {
    key: '_show',
    value: function _show() {
      var _this11 = this;

      this.loaded.then(function () {
        return _this11.topPage && _this11.topPage._show();
      });
    }
  }, {
    key: '_hide',
    value: function _hide() {
      this.topPage && this.topPage._hide();
    }
  }, {
    key: '_destroy',
    value: function _destroy() {
      for (var i = this.pages.length - 1; i >= 0; i--) {
        this._pageLoader.unload(this.pages[i]);
      }

      this.remove();
    }

    /**
     * @param {String} name
     * @param {Function} Animator
     */

  }, {
    key: 'pageLoader',
    get: function get() {
      return this._pageLoader;
    },
    set: function set(pageLoader) {
      if (!(pageLoader instanceof PageLoader)) {
        throw Error('First parameter must be an instance of PageLoader.');
      }
      this._pageLoader = pageLoader;
    }
  }, {
    key: 'page',
    get: function get() {
      return this._page;
    },
    set: function set(page) {
      this._page = page;
    }
  }, {
    key: 'onDeviceBackButton',
    get: function get() {
      return this._backButtonHandler;
    },
    set: function set(callback) {
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

  }, {
    key: 'topPage',
    get: function get() {
      var last = this.lastElementChild;
      while (last && last.tagName !== 'ONS-PAGE') {
        last = last.previousElementSibling;
      }
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

  }, {
    key: 'pages',
    get: function get() {
      return util.arrayFrom(this.children).filter(function (element) {
        return element.tagName === 'ONS-PAGE';
      });
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

  }, {
    key: 'options',
    get: function get() {
      return this._options;
    },
    set: function set(object) {
      this._options = object;
    }
  }, {
    key: '_isRunning',
    set: function set(value) {
      this.setAttribute('_is-running', value ? 'true' : 'false');
    },
    get: function get() {
      return JSON.parse(this.getAttribute('_is-running'));
    }
  }], [{
    key: 'registerAnimator',
    value: function registerAnimator(name, Animator) {
      if (!(Animator.prototype instanceof NavigatorAnimator)) {
        throw new Error('"Animator" param must inherit NavigatorElement.NavigatorAnimator');
      }

      _animatorDict[name] = Animator;
    }
  }, {
    key: 'observedAttributes',
    get: function get() {
      return ['animation', 'swipeable'];
    }
  }, {
    key: 'animators',
    get: function get() {
      return _animatorDict;
    }
  }, {
    key: 'NavigatorAnimator',
    get: function get() {
      return NavigatorAnimator;
    }
  }, {
    key: 'events',
    get: function get() {
      return ['prepush', 'postpush', 'prepop', 'postpop'];
    }
  }, {
    key: 'rewritables',
    get: function get() {
      return rewritables;
    }
  }]);

  return NavigatorElement;
}(BaseElement);

export default NavigatorElement;


ons.elements.Navigator = NavigatorElement;
customElements.define('ons-navigator', NavigatorElement);