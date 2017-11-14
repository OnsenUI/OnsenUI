import _setImmediate from 'babel-runtime/core-js/set-immediate';
import _Promise from 'babel-runtime/core-js/promise';
import _extends from 'babel-runtime/helpers/extends';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
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
import platform from '../../ons/platform';
import internal from '../../ons/internal';
import autoStyle from '../../ons/autostyle';
import Swiper from '../../ons/internal/swiper';
import ModifierUtil from '../../ons/internal/modifier-util';
import BaseElement from '../base/base-element';
import contentReady from '../../ons/content-ready';

var scheme = {
  '.tabbar__content': 'tabbar--*__content',
  '.tabbar__border': 'tabbar--*__border',
  '.tabbar': 'tabbar--*'
};

var rewritables = {
  /**
   * @param {Element} tabbarElement
   * @param {Function} callback
   */
  ready: function ready(tabbarElement, callback) {
    callback();
  }
};

var nullPage = internal.nullElement;
var lerp = function lerp(x0, x1, t) {
  return (1 - t) * x0 + t * x1;
};

/**
 * @element ons-tabbar
 * @category tabbar
 * @description
 *   [en]A component to display a tab bar on the bottom of a page. Used with `<ons-tab>` to manage pages using tabs.[/en]
 *   [ja]タブバーをページ下部に表示するためのコンポーネントです。ons-tabと組み合わせて使うことで、ページを管理できます。[/ja]
 * @codepen pGuDL
 * @tutorial vanilla/Reference/tabbar
 * @modifier material
 *   [en]A tabbar in Material Design.[/en]
 *   [ja][/ja]
 * @modifier autogrow
 *   [en]Tabs automatically grow depending on their content instead of having a fixed width.[/en]
 *   [ja][/ja]
 * @modifier top-border
 *   [en]Shows a static border-bottom in tabs for iOS top tabbars.[/en]
 *   [ja][/ja]
 * @guide fundamentals.html#managing-pages
 *  [en]Managing multiple pages.[/en]
 *  [ja]複数のページを管理する[/ja]
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

var TabbarElement = function (_BaseElement) {
  _inherits(TabbarElement, _BaseElement);

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
   *   [en]If this attribute is set to `"none"` the transitions will not be animated.[/en]
   *   [ja][/ja]
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

  /**
   * @attribute swipeable
   * @description
   *   [en]If this attribute is set the tab bar can be scrolled by drag or swipe.[/en]
   *   [ja]この属性がある時、タブバーをスワイプやドラッグで移動できるようになります。[/ja]
   */

  /**
   * @attribute ignore-edge-width
   * @type {Number}
   * @default 20
   * @description
   *   [en]Distance in pixels from both edges. Swiping on these areas will prioritize parent components such as `ons-splitter` or `ons-navigator`.[/en]
   *   [ja][/ja]
   */

  /**
   * @attribute hide-tabs
   * @description
   *   [en]Whether to hide the tabs.[/en]
   *   [ja]タブを非表示にする場合に指定します。[/ja]
   */

  /**
   * @attribute tab-border
   * @description
   *   [en]If this attribute is set the tabs show a dynamic bottom border. Only works for iOS since the border is always visible in Material Design.[/en]
   *   [ja][/ja]
   */

  /**
   * @attribute modifier
   * @type {String}
   * @description
   *   [en]The appearance of the tabbar.[/en]
   *   [ja]タブバーの表現を指定します。[/ja]
   */

  function TabbarElement() {
    _classCallCheck(this, TabbarElement);

    var _this = _possibleConstructorReturn(this, (TabbarElement.__proto__ || _Object$getPrototypeOf(TabbarElement)).call(this));

    contentReady(_this, function () {
      return _this._compile();
    });
    return _this;
  }

  _createClass(TabbarElement, [{
    key: 'connectedCallback',
    value: function connectedCallback() {
      var _this2 = this;

      if (!this._swiper) {
        this._swiper = new Swiper({
          getElement: function getElement() {
            return _this2._contentElement;
          },
          getInitialIndex: function getInitialIndex() {
            return _this2.getAttribute('activeIndex') || _this2.getAttribute('active-index');
          },
          getAutoScrollRatio: this._getAutoScrollRatio.bind(this),
          getBubbleWidth: function getBubbleWidth() {
            return parseInt(_this2.getAttribute('ignore-edge-width') || 25, 10);
          },
          isAutoScrollable: function isAutoScrollable() {
            return true;
          },
          preChangeHook: this._onPreChange.bind(this),
          postChangeHook: this._onPostChange.bind(this),
          refreshHook: this._onRefresh.bind(this),
          scrollHook: this._onScroll.bind(this)
        });

        contentReady(this, function () {
          _this2._tabbarBorder = util.findChild(_this2._tabbarElement, '.tabbar__border');
          _this2._swiper.init({ swipeable: _this2.hasAttribute('swipeable') });
        });
      }

      contentReady(this, function () {
        return _this2._updatePosition();
      });
    }
  }, {
    key: 'disconnectedCallback',
    value: function disconnectedCallback() {
      if (this._swiper && this._swiper.initialized) {
        this._swiper.dispose();
        this._swiper = null;
        this._tabbarBorder = null;
        this._tabsRect = null;
      }
    }
  }, {
    key: '_normalizeEvent',
    value: function _normalizeEvent(event) {
      return _extends({}, event, { index: event.activeIndex, tabItem: this.tabs[event.activeIndex] });
    }
  }, {
    key: '_onPostChange',
    value: function _onPostChange(event) {
      event = this._normalizeEvent(event);
      util.triggerElementEvent(this, 'postchange', event);
      var page = event.tabItem.pageElement;
      page && page._show();
    }
  }, {
    key: '_onPreChange',
    value: function _onPreChange(event) {
      event = this._normalizeEvent(event);
      event.cancel = function () {
        return event.canceled = true;
      };

      util.triggerElementEvent(this, 'prechange', event);

      if (!event.canceled) {
        var _event = event,
            activeIndex = _event.activeIndex,
            lastActiveIndex = _event.lastActiveIndex;

        var tabs = this.tabs;

        tabs[activeIndex].setActive(true);
        if (lastActiveIndex >= 0) {
          var prevTab = tabs[lastActiveIndex];
          prevTab.setActive(false);
          prevTab.pageElement && prevTab.pageElement._hide();
        }
      }

      return event.canceled;
    }
  }, {
    key: '_onScroll',
    value: function _onScroll(index) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (this._tabbarBorder) {
        this._tabbarBorder.style.transition = 'all ' + (options.duration || 0) + 's ' + (options.timing || '');

        if (this._autogrow && this._tabsRect.length > 0) {
          var a = Math.floor(index),
              b = Math.ceil(index),
              r = index % 1;
          this._tabbarBorder.style.width = lerp(this._tabsRect[a].width, this._tabsRect[b].width, r) + 'px';
          this._tabbarBorder.style.transform = 'translate3d(' + lerp(this._tabsRect[a].left, this._tabsRect[b].left, r) + 'px, 0, 0)';
        } else {
          this._tabbarBorder.style.transform = 'translate3d(' + index * 100 + '%, 0, 0)';
        }
      }

      this._onSwipe && this._onSwipe(index, options);
    }
  }, {
    key: '_onRefresh',
    value: function _onRefresh() {
      this._autogrow = util.hasModifier(this, 'autogrow');
      this._tabsRect = this.tabs.map(function (tab) {
        return tab.getBoundingClientRect();
      });
      if (this._tabbarBorder) {
        this._tabbarBorder.style.display = this.hasAttribute('tab-border') || platform.isAndroid() ? 'block' : 'none';
        var index = this.getActiveTabIndex();
        if (this._tabsRect.length > 0 && index >= 0) {
          this._tabbarBorder.style.width = this._tabsRect[index].width + 'px';
        }
      }
    }
  }, {
    key: '_getAutoScrollRatio',
    value: function _getAutoScrollRatio(matches, velocity, size) {
      var ratio = .6; // Base ratio
      var modifier = size / 300 * (matches ? -1 : 1); // Based on screen size
      return Math.min(1, Math.max(0, ratio + velocity * modifier));
    }
  }, {
    key: '_compile',
    value: function _compile() {
      autoStyle.prepare(this);

      var content = this._contentElement || util.create('.tabbar__content');
      content.classList.add('ons-tabbar__content');
      var tabbar = this._tabbarElement || util.create('.tabbar');
      tabbar.classList.add('ons-tabbar__footer');

      if (!tabbar.parentNode) {
        while (this.firstChild) {
          tabbar.appendChild(this.firstChild);
        }
      }

      var activeIndex = Number(this.getAttribute('activeIndex')); // 0 by default
      if (tabbar.children.length > activeIndex && !util.findChild(tabbar, '[active]')) {
        tabbar.children[activeIndex].setAttribute('active', '');
      }

      this._tabbarBorder = util.findChild(tabbar, '.tabbar__border') || util.create('.tabbar__border');
      tabbar.appendChild(this._tabbarBorder);
      tabbar.classList.add('ons-swiper-tabbar'); // Hides material border

      !content.children[0] && content.appendChild(document.createElement('div'));
      !content.children[1] && content.appendChild(document.createElement('div'));
      content.appendChild = content.appendChild.bind(content.children[0]);
      content.insertBefore = content.insertBefore.bind(content.children[0]);

      this.appendChild(content);
      this.appendChild(tabbar); // Triggers ons-tab connectedCallback

      ModifierUtil.initModifier(this, scheme);
    }
  }, {
    key: '_updatePosition',
    value: function _updatePosition() {
      var _this3 = this;

      var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.getAttribute('position');

      var top = this._top = position === 'top' || position === 'auto' && platform.isAndroid();
      var action = top ? util.addModifier : util.removeModifier;

      action(this, 'top');

      var page = util.findParent(this, 'ons-page');
      if (page) {
        contentReady(page, function () {
          var p = 0;
          if (page.children[0] && util.match(page.children[0], 'ons-toolbar')) {
            action(page.children[0], 'noshadow');
            p = 1; // Visual fix for some devices
          }

          var content = page._getContentElement();
          var cs = window.getComputedStyle(page._getContentElement(), null);

          _this3.style.top = top ? parseInt(cs.getPropertyValue('padding-top'), 10) - p + 'px' : '';

          // Refresh content top - Fix for iOS 8
          content.style.top = cs.top;
          content.style.top = '';
        });
      }

      internal.autoStatusBarFill(function () {
        var filled = util.findParent(_this3, function (e) {
          return e.hasAttribute('status-bar-fill');
        });
        util.toggleAttribute(_this3, 'status-bar-fill', top && !filled);
      });
    }
  }, {
    key: 'setActiveTab',


    /**
     * @method setActiveTab
     * @signature setActiveTab(index, [options])
     * @param {Number} index
     *   [en]Tab index.[/en]
     *   [ja]タブのインデックスを指定します。[/ja]
     * @param {Object} [options]
     *   [en]Parameter object.[/en]
     *   [ja]オプションを指定するオブジェクト。[/ja]
     * @param {Function} [options.callback]
     *   [en]Function that runs when the new page has loaded.[/en]
     *   [ja][/ja]
     * @param {String} [options.animation]
     *   [en]If this option is "none", the transition won't slide.[/en]
     *   [ja][/ja]
     * @param {String} [options.animationOptions]
     *   [en]Specify the animation's duration, delay and timing. E.g. `{duration: 0.2, delay: 0.4, timing: 'ease-in'}`.[/en]
     *   [ja]アニメーション時のduration, delay, timingを指定します。e.g. {duration: 0.2, delay: 0.4, timing: 'ease-in'}[/ja]
     * @description
     *   [en]Show specified tab page. Animations and their options can be specified by the second parameter.[/en]
     *   [ja]指定したインデックスのタブを表示します。アニメーションなどのオプションを指定できます。[/ja]
     * @return {Promise}
     *   [en]A promise that resolves to the new page element.[/en]
     *   [ja][/ja]
     */
    value: function setActiveTab(nextIndex) {
      var _this4 = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var prevIndex = this.getActiveTabIndex();
      var prevTab = this.tabs[prevIndex],
          nextTab = this.tabs[nextIndex];

      if (!nextTab) {
        return _Promise.reject('Specified index does not match any tab.');
      }

      if (nextIndex === prevIndex) {
        util.triggerElementEvent(this, 'reactive', { index: nextIndex, activeIndex: nextIndex, tabItem: nextTab });
        return _Promise.resolve(nextTab.pageElement);
      }

      // FIXME: nextTab.loaded is broken in Zone.js promises (Angular2)
      var nextPage = nextTab.pageElement;
      return (nextPage ? _Promise.resolve(nextPage) : nextTab.loaded).then(function (nextPage) {
        return _this4._swiper.setActiveIndex(nextIndex, _extends({
          reject: true
        }, options, {
          animation: prevTab && nextPage ? options.animation || _this4.getAttribute('animation') : 'none',
          animationOptions: util.extend({ duration: .3, timing: 'cubic-bezier(.4, .7, .5, 1)' }, _this4.hasAttribute('animation-options') ? util.animationOptionsParse(_this4.getAttribute('animation-options')) : {}, options.animationOptions || {})
        })).then(function () {
          options.callback instanceof Function && options.callback(nextPage);
          return nextPage;
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

  }, {
    key: 'setTabbarVisibility',
    value: function setTabbarVisibility(visible) {
      var _this5 = this;

      contentReady(this, function () {
        _this5._contentElement.style[_this5._top ? 'top' : 'bottom'] = visible ? '' : '0px';
        _this5._tabbarElement.style.display = visible ? '' : 'none';
      });
    }
  }, {
    key: 'show',
    value: function show() {
      this.setTabbarVisibility(true);
    }
  }, {
    key: 'hide',
    value: function hide() {
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

  }, {
    key: 'getActiveTabIndex',


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
    value: function getActiveTabIndex() {
      for (var tabs = this.tabs, i = 0; i < tabs.length; i++) {
        if (tabs[i] && tabs[i].tagName === 'ONS-TAB' && tabs[i].isActive()) {
          return i;
        }
      }
      return -1;
    }
  }, {
    key: '_show',
    value: function _show() {
      var _this6 = this;

      this._swiper.show();
      _setImmediate(function () {
        return _this6.tabs.length > 0 && _this6.tabs[_this6.getActiveTabIndex()].loaded.then(function (el) {
          return el && _setImmediate(function () {
            return el._show();
          });
        });
      });
    }
  }, {
    key: '_hide',
    value: function _hide() {
      this._swiper.hide();
      var topPage = this.topPage;
      topPage && topPage._hide();
    }
  }, {
    key: '_destroy',
    value: function _destroy() {
      this.tabs.forEach(function (tab) {
        return tab.remove();
      });
      this.remove();
    }
  }, {
    key: 'attributeChangedCallback',
    value: function attributeChangedCallback(name, last, current) {
      if (name === 'modifier') {
        ModifierUtil.onModifierChanged(last, current, this, scheme);
        var isTop = function isTop(m) {
          return (/(^|\s+)top($|\s+)/i.test(m)
          );
        };
        isTop(last) !== isTop(current) && this._updatePosition();
      } else if (name === 'position') {
        util.isAttached(this) && this._updatePosition();
      } else if (name === 'swipeable') {
        this._swiper && this._swiper.updateSwipeable(this.hasAttribute('swipeable'));
      } else if (name === 'hide-tabs') {
        this.setTabbarVisibility(!this.hasAttribute('hide-tabs') || current === 'false');
      }
    }
  }, {
    key: '_tabbarElement',
    get: function get() {
      return util.findChild(this, '.tabbar');
    }
  }, {
    key: '_contentElement',
    get: function get() {
      return util.findChild(this, '.tabbar__content');
    }
  }, {
    key: '_targetElement',
    get: function get() {
      var content = this._contentElement;
      return content && content.children[0] || null;
    }
  }, {
    key: 'topPage',
    get: function get() {
      var tabs = this.tabs,
          index = this.getActiveTabIndex();
      return tabs[index] ? tabs[index].pageElement || this.pages[0] || null : null;
    }
  }, {
    key: 'pages',
    get: function get() {
      return util.arrayFrom(this._targetElement.children);
    }
  }, {
    key: 'tabs',
    get: function get() {
      return Array.prototype.filter.call(this._tabbarElement.children, function (e) {
        return e.tagName === 'ONS-TAB';
      });
    }
  }, {
    key: 'visible',
    get: function get() {
      return this._tabbarElement.style.display !== 'none';
    }

    /**
     * @property swipeable
     * @type {Boolean}
     * @description
     *   [en]Enable swipe interaction.[/en]
     *   [ja]swipeableであればtrueを返します。[/ja]
     */

  }, {
    key: 'swipeable',
    get: function get() {
      return this.hasAttribute('swipeable');
    },
    set: function set(value) {
      return util.toggleAttribute(this, 'swipeable', value);
    }

    /**
     * @property onSwipe
     * @type {Function}
     * @description
     *   [en]Hook called whenever the user slides the tabbar. It gets a decimal index and an animationOptions object as arguments.[/en]
     *   [ja][/ja]
     */

  }, {
    key: 'onSwipe',
    get: function get() {
      return this._onSwipe;
    },
    set: function set(value) {
      if (value && !(value instanceof Function)) {
        throw new Error('\'onSwipe\' must be a function.');
      }
      this._onSwipe = value;
    }
  }], [{
    key: 'observedAttributes',
    get: function get() {
      return ['modifier', 'position', 'swipeable', 'tab-border', 'hide-tabs'];
    }
  }, {
    key: 'rewritables',
    get: function get() {
      return rewritables;
    }
  }, {
    key: 'events',
    get: function get() {
      return ['prechange', 'postchange', 'reactive'];
    }
  }]);

  return TabbarElement;
}(BaseElement);

export default TabbarElement;


ons.elements.Tabbar = TabbarElement;
customElements.define('ons-tabbar', TabbarElement);