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
class SplitterContentElement extends BaseElement {

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
  createdCallback() {
    this._page = null;
  }

  attachedCallback() {
    if (!util.match(this.parentNode, 'ons-splitter')) {
      throw new Error(`"ons-splitter-content" must have "ons-splitter" as parentNode.`);
    }
    this.attributeChangedCallback('page', null, this.getAttribute('page'));
  }

  detachedCallback() {}

  attributeChangedCallback(name, last, current) {
    if (name === 'page' && current !== null) {
      rewritables.ready(this, () => this.load(current));
    }
  }

  /**
   * @property page
   * @readonly
   * @type {HTMLElement}
   * @description
   *   [en]Page element loaded in the splitter content.[/en]
   *   [ja][/ja]
   */
  get page() {
    return this._page;
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
   *   [ja][/ja]
   */
  load(page, options = {}) {
    this._page = page;
    const callback = options.callback;

    return internal.getPageHTMLAsync(page).then(html => new Promise(resolve => {
      rewritables.link(this, util.createFragment(html), options, fragment => {
        this._hide();
        this.innerHTML = '';

        this.appendChild(fragment);

        this._show();
        callback && callback();
        resolve(this.firstChild);
      });
    }));
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
}

window.OnsSplitterContentElement = document.registerElement('ons-splitter-content', {
  prototype: SplitterContentElement.prototype
});

window.OnsSplitterContentElement.rewritables = rewritables;
