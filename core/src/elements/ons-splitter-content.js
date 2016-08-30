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
import BaseElement from 'ons/base-element';
import {PageLoader, defaultPageLoader} from 'ons/page-loader';
import contentReady from 'ons/content-ready';

const rewritables = {
  /**
   * @param {Element} element
   * @param {Function} callback
   */
  ready(element, callback) {
    setImmediate(callback);
  },

  /**
   * @param {Element} element
   * @param {HTMLFragment} target
   * @param {Object} options
   * @param {Function} callback
   */
  link(element, target, options, callback) {
    callback(target);
  }
};

/**
 * @element ons-splitter-content
 * @category splitter
 * @description
 *  [en]
 *    The `<ons-splitter-content>` element is used as a child element of `<ons-splitter>`.
 *
 *    It contains the main content of the page while `<ons-splitter-side>` contains the list.
 *  [/en]
 *  [ja]ons-splitter-content要素は、ons-splitter要素の子要素として利用します。[/ja]
 * @codepen rOQOML
 * @tutorial vanilla/Reference/splitter
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
export default class SplitterContentElement extends BaseElement {

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

  init() {
    this._page = null;
    this._pageLoader = defaultPageLoader;

    contentReady(this, () => {
      const page = this._getPageTarget();

      if (page) {
        this.load(page);
      }
    });
  }

  connectedCallback() {
    if (!util.match(this.parentNode, 'ons-splitter')) {
      throw new Error(`"ons-splitter-content" must have "ons-splitter" as parentNode.`);
    }
  }

  _getPageTarget() {
    return this._page || this.getAttribute('page');
  }

  disconnectedCallback() {}

  static get observedAttributes() {
    return [];
  }

  attributeChangedCallback(name, last, current) {
  }

  /**
   * @property page
   * @type {HTMLElement}
   * @description
   *   [en]The page to load in the splitter content.[/en]
   *   [ja]この要素内に表示するページを指定します。[/ja]
   */
  get page() {
    return this._page;
  }

  /**
   * @param {*} page
   */
  set page(page) {
    this._page = page;
  }

  /**
   * @property pageLoader
   * @type {Function}
   * @description
   *   [en]Page element loaded in the splitter content.[/en]
   *   [ja]この要素内に表示するページを指定します。[/ja]
   */
  get pageLoader() {
    return this._pageLoader;
  }

  set pageLoader(loader) {
    if (!(loader instanceof PageLoader)) {
      throw Error('First parameter must be an instance of PageLoader');
    }
    this._pageLoader = loader;
  }

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
  load(page, options = {}) {
    this._page = page;
    const callback = options.callback || function() {};

    return new Promise(resolve => {
      this._pageLoader.load({page, parent: this, replace: true}, ({element, unload}) => {
        rewritables.link(this, element, options, fragment => {
          setImmediate(() => this._show());
          callback();

          resolve(this.firstChild);
        });
      });
    });
  }

  _show() {
    util.propagateAction(this, '_show');
  }

  _hide() {
    util.propagateAction(this, '_hide');
  }

  _destroy() {
    util.propagateAction(this, '_destroy');
    this.remove();
  }

  static get rewritables() {
    return rewritables;
  }
}

customElements.define('ons-splitter-content', SplitterContentElement);
