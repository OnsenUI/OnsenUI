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

import util from '../ons/util';
import internal from '../ons/internal/internal';
import ModifierUtil from '../ons/internal/modifier-util';
import BaseElement from '../ons/base-element';

const rewritables = {
  /**
   * @param {Element} splitterSideElement
   * @param {Function} callback
   */
  ready(splitterSideElement, callback) {
    setImmediate(callback);
  },

  /**
   * @param {Element} splitterSideElement
   * @param {HTMLFragment} target
   * @param {Function} callback
   */
  link(splitterSideElement, target, callback) {
    callback(target);
  }
};

class SplitterContentElement extends BaseElement {

  get page() {
    return this._page;
  }

  createdCallback() {
    this._page = null;
  }

  /**
   * @param {String} page
   * @param {Object} [options]
   * @param {Function} [options.callback]
   */
  load(page, options = {}) {
    this._page = page;

    options.callback = options.callback instanceof Function ? options.callback : () => {};
    internal.getPageHTMLAsync(page).then((html) => {
      rewritables.link(this, util.createFragment(html), (fragment) => {
        while (this.childNodes[0]) {
          if (this.childNodes[0]._hide instanceof Function) {
            this.childNodes[0]._hide();
          }
          this.removeChild(this.childNodes[0]);
        }

        this.appendChild(fragment);
        util.arrayFrom(fragment.children).forEach(child => {
          if (child._show instanceof Function) {
            child._show();
          }
        });

        options.callback();
      });
    });
  }

  attachedCallback() {
    this._assertParent();

    if (this.hasAttribute('page')) {
      setImmediate(() => rewritables.ready(this, () => this.load(this.getAttribute('page'))));
    }
  }

  detachedCallback() {
  }

  _show() {
    util.arrayFrom(this.children).forEach(child => {
      if (child._show instanceof Function) {
        child._show();
      }
    });
  }

  _hide() {
    util.arrayFrom(this.children).forEach(child => {
      if (child._hide instanceof Function) {
        child._hide();
      }
    });
  }

  _destroy() {
    util.arrayFrom(this.children).forEach(child => {
      if (child._destroy instanceof Function) {
        child._destroy();
      }
    });
    this.remove();
  }

  _assertParent() {
    const parentElementName = this.parentElement.nodeName.toLowerCase();
    if (parentElementName !== 'ons-splitter') {
      throw new Error(`"${parentElementName}" element is not allowed as parent element.`);
    }
  }
}

window.OnsSplitterContentElement = document.registerElement('ons-splitter-content', {
  prototype: SplitterContentElement.prototype
});

window.OnsSplitterContentElement.rewritables = rewritables;
