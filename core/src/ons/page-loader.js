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

// Default implementation for global PageLoader.
function loadPage(page, parent, params, done) {
  internal.getPageHTMLAsync(page).then(html => {
    const element = util.createElement(html.trim());
    parent.appendChild(element);

    done({
      element: element,
      unload: () => element.remove()
    });
  });
}

export class PageLoader {
  /**
   * @param {Function} [fn] Returns an object that has "element" property and "unload" function.
   */
  constructor(fn) {
    this._loader = fn instanceof Function ? fn : loadPage;
  }

  /**
   * Set internal loader implementation.
   */
  set internalLoader(fn) {
    if (!(fn instanceof Function)) {
      throw Error('First parameter must be an instance of Function');
    }
    this._loader = fn;
  }

  get internalLoader() {
    return this._loader;
  }

  /**
   * @param {any} page
   * @param {Element} parent A location to load page.
   * @param {Object} params Extra parameters for ons-page.
   * @param {Function} done Take an object that has "element" property and "unload" function.
   */
  load(page, parent, params, done) {
    this._loader(page, parent, params, result => {
      if (!(result.element instanceof Element)) {
        throw Error('target.element must be an instance of Element.');
      }

      if (!(result.unload instanceof Function)) {
        throw Error('target.unload must be an instance of Function.');
      }

      done(result);
    }, params);
  }
}

export const defaultPageLoader = new PageLoader();

export const instantPageLoader = new PageLoader(function(page, parent, params, done) {
  const element = util.createElement(page.trim());
  parent.appendChild(element);

  done({
    element: element,
    unload: () => element.remove()
  });
});
