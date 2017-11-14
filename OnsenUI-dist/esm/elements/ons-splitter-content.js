import _Promise from 'babel-runtime/core-js/promise';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import _setImmediate from 'babel-runtime/core-js/set-immediate';
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
import ModifierUtil from '../ons/internal/modifier-util';
import BaseElement from './base/base-element';
import { PageLoader, defaultPageLoader } from '../ons/page-loader';
import contentReady from '../ons/content-ready';

var rewritables = {
  /**
   * @param {Element} element
   * @param {Function} callback
   */
  ready: function ready(element, callback) {
    _setImmediate(callback);
  }
};

/**
 * @element ons-splitter-content
 * @category menu
 * @description
 *  [en]
 *    The `<ons-splitter-content>` element is used as a child element of `<ons-splitter>`.
 *
 *    It contains the main content of the page while `<ons-splitter-side>` contains the list.
 *  [/en]
 *  [ja]ons-splitter-content要素は、ons-splitter要素の子要素として利用します。[/ja]
 * @codepen rOQOML
 * @tutorial vanilla/Reference/splitter
 * @guide fundamentals.html#managing-pages
 *  [en]Managing multiple pages.[/en]
 *  [ja]複数のページを管理する[/ja]
 * @seealso ons-splitter
 *  [en]The `<ons-splitter>` component is the parent element.[/en]
 *  [ja]ons-splitterコンポーネント[/ja]
 * @seealso ons-splitter-side
 *  [en]The `<ons-splitter-side>` component contains the menu.[/en]
 *  [ja]ons-splitter-sideコンポーネント[/ja]
 * @example
 * <ons-splitter>
 *   <ons-splitter-content>
 *     ...
 *   </ons-splitter-content>
 *
 *   <ons-splitter-side side="left" width="80%" collapse>
 *     ...
 *   </ons-splitter-side>
 * </ons-splitter>
 */

var SplitterContentElement = function (_BaseElement) {
  _inherits(SplitterContentElement, _BaseElement);

  /**
   * @attribute page
   * @type {String}
   * @description
   *   [en]
   *     The url of the content page. If this attribute is used the content will be loaded from a `<ons-template>` tag or a remote file.
   *
   *     It is also possible to put `<ons-page>` element as a child of the element.
   *   [/en]
   *   [ja]ons-splitter-content要素に表示するページのURLを指定します。[/ja]
   */

  function SplitterContentElement() {
    _classCallCheck(this, SplitterContentElement);

    var _this = _possibleConstructorReturn(this, (SplitterContentElement.__proto__ || _Object$getPrototypeOf(SplitterContentElement)).call(this));

    _this._page = null;
    _this._pageLoader = defaultPageLoader;

    contentReady(_this, function () {
      rewritables.ready(_this, function () {
        var page = _this._getPageTarget();

        if (page) {
          _this.load(page);
        }
      });
    });
    return _this;
  }

  _createClass(SplitterContentElement, [{
    key: 'connectedCallback',
    value: function connectedCallback() {
      if (!util.match(this.parentNode, 'ons-splitter')) {
        throw new Error('"ons-splitter-content" must have "ons-splitter" as parentNode.');
      }
    }
  }, {
    key: '_getPageTarget',
    value: function _getPageTarget() {
      return this._page || this.getAttribute('page');
    }
  }, {
    key: 'disconnectedCallback',
    value: function disconnectedCallback() {}
  }, {
    key: 'attributeChangedCallback',
    value: function attributeChangedCallback(name, last, current) {}

    /**
     * @property page
     * @type {HTMLElement}
     * @description
     *   [en]The page to load in the splitter content.[/en]
     *   [ja]この要素内に表示するページを指定します。[/ja]
     */

  }, {
    key: 'load',


    /**
     * @method load
     * @signature load(page, [options])
     * @param {String} page, [options]
     *   [en]Page URL. Can be either an HTML document or an `<ons-template>` id.[/en]
     *   [ja]pageのURLか、ons-templateで宣言したテンプレートのid属性の値を指定します。[/ja]
     * @param {Object} [options]
     * @param {Function} [options.callback]
     * @description
     *   [en]Show the page specified in `page` in the content.[/en]
     *   [ja]指定したURLをメインページを読み込みます。[/ja]
     * @return {Promise}
     *   [en]Resolves to the new `<ons-page>` element[/en]
     *   [ja]`<ons-page>`要素を解決するPromiseオブジェクトを返します。[/ja]
     */
    value: function load(page) {
      var _this2 = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      this._page = page;
      var callback = options.callback || function () {};

      return new _Promise(function (resolve) {
        var oldContent = _this2._content || null;

        _this2._pageLoader.load({ page: page, parent: _this2 }, function (pageElement) {
          if (oldContent) {
            _this2._pageLoader.unload(oldContent);
            oldContent = null;
          }

          _setImmediate(function () {
            return _this2._show();
          });

          callback(pageElement);
          resolve(pageElement);
        });
      });
    }
  }, {
    key: '_show',
    value: function _show() {
      if (this._content) {
        this._content._show();
      }
    }
  }, {
    key: '_hide',
    value: function _hide() {
      if (this._content) {
        this._content._hide();
      }
    }
  }, {
    key: '_destroy',
    value: function _destroy() {
      if (this._content) {
        this._pageLoader.unload(this._content);
      }
      this.remove();
    }
  }, {
    key: 'page',
    get: function get() {
      return this._page;
    }

    /**
     * @param {*} page
     */
    ,
    set: function set(page) {
      this._page = page;
    }
  }, {
    key: '_content',
    get: function get() {
      return this.children[0];
    }

    /**
     * @property pageLoader
     * @type {Function}
     * @description
     *   [en]Page element loaded in the splitter content.[/en]
     *   [ja]この要素内に表示するページを指定します。[/ja]
     */

  }, {
    key: 'pageLoader',
    get: function get() {
      return this._pageLoader;
    },
    set: function set(loader) {
      if (!(loader instanceof PageLoader)) {
        throw Error('First parameter must be an instance of PageLoader');
      }
      this._pageLoader = loader;
    }
  }], [{
    key: 'observedAttributes',
    get: function get() {
      return [];
    }
  }, {
    key: 'rewritables',
    get: function get() {
      return rewritables;
    }
  }]);

  return SplitterContentElement;
}(BaseElement);

export default SplitterContentElement;


ons.elements.SplitterContent = SplitterContentElement;
customElements.define('ons-splitter-content', SplitterContentElement);