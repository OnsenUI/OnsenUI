import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _setImmediate from 'babel-runtime/core-js/set-immediate';
import _Set from 'babel-runtime/core-js/set';
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

import ons from '../ons';
import util from '../ons/util';
import internal from '../ons/internal';
import autoStyle from '../ons/autostyle';
import ModifierUtil from '../ons/internal/modifier-util';
import BaseElement from './base/base-element';
import deviceBackButtonDispatcher from '../ons/internal/device-back-button-dispatcher';
import contentReady from '../ons/content-ready';

import './ons-toolbar'; // ensures that 'ons-toolbar' element is registered

var defaultClassName = 'page';
var scheme = {
  '': 'page--*',
  '.page__content': 'page--*__content',
  '.page__background': 'page--*__background'
};

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
 * @guide lifecycle.html#events
 *   [en]Overview of page events[/en]
 *   [ja]Overview of page events[/ja]
 * @guide fundamentals.html#managing-pages
 *   [en]Managing multiple pages[/en]
 *   [ja]複数のページを管理する[/ja]
 * @guide theming.html#modifiers [en]More details about the `modifier` attribute[/en][ja]modifier属性の使い方[/ja]
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

var PageElement = function (_BaseElement) {
  _inherits(PageElement, _BaseElement);

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

  function PageElement() {
    _classCallCheck(this, PageElement);

    var _this = _possibleConstructorReturn(this, (PageElement.__proto__ || _Object$getPrototypeOf(PageElement)).call(this));

    _this._deriveHooks();

    _this.classList.add(defaultClassName);
    _this._initialized = false;

    _this._contentObserver = new MutationObserver(function () {
      _this._tryToSuppressLayerCreation();
    });

    contentReady(_this, function () {
      _this._compile();

      _this._isShown = false;
      _this._contentElement = _this._getContentElement();
      _this._backgroundElement = _this._getBackgroundElement();

      _this._contentObserver.observe(_this._contentElement, { childList: true });
      _this._tryToSuppressLayerCreation();
    });
    return _this;
  }

  _createClass(PageElement, [{
    key: '_tryToSuppressLayerCreation',
    value: function _tryToSuppressLayerCreation() {
      if (!this._contentElement) {
        return;
      }

      var content = this._contentElement;
      var scrollerSet = new _Set(['ons-navigator', 'ons-page', 'ons-tabbar', 'ons-splitter']);

      var shouldSuppress = content.children.length === 1 && scrollerSet.has(content.children[0].nodeName.toLowerCase());

      // If content element has only one element and the element has scroll content, there is no need for layer creation in this content element.
      if (shouldSuppress) {
        content.classList.add('page__content--suppress-layer-creation');
      } else {
        content.classList.remove('page__content--suppress-layer-creation');
      }
    }
  }, {
    key: '_compile',
    value: function _compile() {
      var _this2 = this;

      autoStyle.prepare(this);

      var toolbar = util.findChild(this, 'ons-toolbar');

      var background = util.findChild(this, '.page__background') || util.findChild(this, '.background') || document.createElement('div');
      background.classList.add('page__background');
      this.insertBefore(background, !toolbar && this.firstChild || toolbar && toolbar.nextSibling);

      var content = util.findChild(this, '.page__content') || util.findChild(this, '.content') || document.createElement('div');
      content.classList.add('page__content');
      if (!content.parentElement) {
        util.arrayFrom(this.childNodes).forEach(function (node) {
          if (node.nodeType !== 1 || _this2._elementShouldBeMoved(node)) {
            content.appendChild(node); // Can trigger detached connectedCallbacks
          }
        });
      }

      this._tryToFillStatusBar(content); // Must run before child pages try to fill status bar.
      this.insertBefore(content, background.nextSibling); // Can trigger attached connectedCallbacks

      // Make wrapper pages transparent for animations
      if (!background.style.backgroundColor && (!toolbar || !util.hasModifier(toolbar, 'transparent')) && content.children.length === 1 && util.isPageControl(content.children[0])) {
        background.style.backgroundColor = 'transparent';
      }

      ModifierUtil.initModifier(this, scheme);
    }
  }, {
    key: '_elementShouldBeMoved',
    value: function _elementShouldBeMoved(el) {
      if (el.classList.contains('page__background')) {
        return false;
      }
      var tagName = el.tagName.toLowerCase();
      if (tagName === 'ons-fab') {
        return !el.hasAttribute('position');
      }
      var fixedElements = ['script', 'ons-toolbar', 'ons-bottom-toolbar', 'ons-modal', 'ons-speed-dial', 'ons-dialog', 'ons-alert-dialog', 'ons-popover', 'ons-action-sheet'];
      return el.hasAttribute('inline') || fixedElements.indexOf(tagName) === -1;
    }
  }, {
    key: '_tryToFillStatusBar',
    value: function _tryToFillStatusBar() {
      var _this3 = this;

      var content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._contentElement;

      internal.autoStatusBarFill(function () {
        util.toggleAttribute(_this3, 'status-bar-fill', !util.findParent(_this3, function (e) {
          return e.hasAttribute('status-bar-fill');
        }) // Not already filled
        && (_this3._canAnimateToolbar(content) || !util.findChild(content, util.isPageControl)) // Has toolbar or cannot delegate
        );
      });
    }
  }, {
    key: '_canAnimateToolbar',
    value: function _canAnimateToolbar() {
      var content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._contentElement;

      if (util.findChild(this, 'ons-toolbar')) {
        return true;
      }
      return !!util.findChild(content, function (el) {
        return util.match(el, 'ons-toolbar') && !el.hasAttribute('inline');
      });
    }
  }, {
    key: 'connectedCallback',
    value: function connectedCallback() {
      var _this4 = this;

      if (!util.isAttached(this)) {
        // Avoid detached calls
        return;
      }

      contentReady(this, function () {
        _this4._tryToFillStatusBar(); // Ensure status bar when the element was compiled before connected

        if (_this4.hasAttribute('on-infinite-scroll')) {
          _this4.attributeChangedCallback('on-infinite-scroll', null, _this4.getAttribute('on-infinite-scroll'));
        }

        if (!_this4._initialized) {
          _this4._initialized = true;

          _setImmediate(function () {
            _this4.onInit && _this4.onInit();
            util.triggerElementEvent(_this4, 'init');
          });

          if (!util.hasAnyComponentAsParent(_this4)) {
            _setImmediate(function () {
              return _this4._show();
            });
          }
        }
      });
    }
  }, {
    key: 'updateBackButton',
    value: function updateBackButton(show) {
      if (this.backButton) {
        show ? this.backButton.show() : this.backButton.hide();
      }
    }
  }, {
    key: '_onScroll',
    value: function _onScroll() {
      var _this5 = this;

      var c = this._contentElement,
          overLimit = (c.scrollTop + c.clientHeight) / c.scrollHeight >= this._infiniteScrollLimit;

      if (this._onInfiniteScroll && !this._loadingContent && overLimit) {
        this._loadingContent = true;
        this._onInfiniteScroll(function () {
          return _this5._loadingContent = false;
        });
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
    key: '_getContentElement',
    value: function _getContentElement() {
      var result = util.findChild(this, '.page__content');
      if (result) {
        return result;
      }
      throw Error('fail to get ".page__content" element.');
    }
  }, {
    key: '_getBackgroundElement',
    value: function _getBackgroundElement() {
      var result = util.findChild(this, '.page__background');
      if (result) {
        return result;
      }
      throw Error('fail to get ".page__background" element.');
    }
  }, {
    key: '_getBottomToolbarElement',
    value: function _getBottomToolbarElement() {
      return util.findChild(this, 'ons-bottom-toolbar') || internal.nullElement;
    }
  }, {
    key: '_getToolbarElement',
    value: function _getToolbarElement() {
      return util.findChild(this, 'ons-toolbar') || document.createElement('ons-toolbar');
    }
  }, {
    key: 'attributeChangedCallback',
    value: function attributeChangedCallback(name, last, current) {
      var _this6 = this;

      switch (name) {
        case 'class':
          util.restoreClass(this, defaultClassName, scheme);
          break;
        case 'modifier':
          ModifierUtil.onModifierChanged(last, current, this, scheme);
          break;
        case 'on-infinite-scroll':
          if (current === null) {
            this.onInfiniteScroll = null;
          } else {
            this.onInfiniteScroll = function (done) {
              var f = util.findFromPath(current);
              _this6.onInfiniteScroll = f;
              f(done);
            };
          }
          break;
      }
    }
  }, {
    key: '_show',
    value: function _show() {
      if (!this._isShown && util.isAttached(this)) {
        this._isShown = true;
        this.onShow && this.onShow();
        util.triggerElementEvent(this, 'show');
        util.propagateAction(this, '_show');
      }
    }
  }, {
    key: '_hide',
    value: function _hide() {
      if (this._isShown) {
        this._isShown = false;
        this.onHide && this.onHide();
        util.triggerElementEvent(this, 'hide');
        util.propagateAction(this, '_hide');
      }
    }
  }, {
    key: '_destroy',
    value: function _destroy() {
      this._hide();

      this.onDestroy && this.onDestroy();
      util.triggerElementEvent(this, 'destroy');

      if (this.onDeviceBackButton) {
        this.onDeviceBackButton.destroy();
      }

      util.propagateAction(this, '_destroy');

      this.remove();
    }
  }, {
    key: '_deriveHooks',
    value: function _deriveHooks() {
      var _this7 = this;

      this.constructor.events.forEach(function (event) {
        var key = 'on' + event.charAt(0).toUpperCase() + event.slice(1);
        _Object$defineProperty(_this7, key, {
          enumerable: true,
          get: function get() {
            return _this7['_' + key];
          },
          set: function set(value) {
            if (!(value instanceof Function)) {
              throw new Error(key + ' hook must be a function');
            }
            _this7['_' + key] = value.bind(_this7);
          }
        });
      });
    }
  }, {
    key: 'name',
    set: function set(str) {
      this.setAttribute('name', str);
    },
    get: function get() {
      return this.getAttribute('name');
    }
  }, {
    key: 'backButton',
    get: function get() {
      return this.querySelector('ons-back-button');
    }

    /**
     * @property onInfiniteScroll
     * @description
     *  [en]Function to be executed when scrolling to the bottom of the page. The function receives a done callback as an argument that must be called when it's finished.[/en]
     *  [ja][/ja]
     */

  }, {
    key: 'onInfiniteScroll',
    set: function set(value) {
      var _this8 = this;

      if (value && !(value instanceof Function)) {
        throw new Error('onInfiniteScroll must be a function or null');
      }

      contentReady(this, function () {
        if (!value) {
          _this8._contentElement.removeEventListener('scroll', _this8._boundOnScroll);
        } else if (!_this8._onInfiniteScroll) {
          _this8._infiniteScrollLimit = 0.9;
          _this8._boundOnScroll = _this8._onScroll.bind(_this8);
          _setImmediate(function () {
            return _this8._contentElement.addEventListener('scroll', _this8._boundOnScroll);
          });
        }
        _this8._onInfiniteScroll = value;
      });
    },
    get: function get() {
      return this._onInfiniteScroll;
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
  }, {
    key: 'scrollTop',
    get: function get() {
      return this._contentElement.scrollTop;
    },
    set: function set(newValue) {
      this._contentElement.scrollTop = newValue;
    }
  }], [{
    key: 'observedAttributes',
    get: function get() {
      return ['modifier', 'on-infinite-scroll', 'class'];
    }
  }, {
    key: 'events',
    get: function get() {
      return ['init', 'show', 'hide', 'destroy'];
    }

    /**
     * @property data
     * @type {*}
     * @description
     *   [en]User's custom data passed to `pushPage()`-like methods.[/en]
     *   [ja][/ja]
     */

  }]);

  return PageElement;
}(BaseElement);

export default PageElement;


ons.elements.Page = PageElement;
customElements.define('ons-page', PageElement);