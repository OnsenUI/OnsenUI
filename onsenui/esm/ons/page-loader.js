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
import util from './util.js';
import internal from './internal/index.js';

// Default implementation for global PageLoader.
function loadPage({page, parent, params = {}}, done, error) {
  internal.getPageHTMLAsync(page).then(html => {
    const pageElement = util.createElement(html);
    parent.appendChild(pageElement);

    done(pageElement);
  }).catch(e => error(e));
}

function unloadPage(element) {
  if (element._destroy instanceof Function) {
    element._destroy();
  } else {
    element.remove();
  }
}

export class PageLoader {
  /**
   * @param {Function} [fn] Returns an object that has "element" property and "unload" function.
   */
  constructor(loader, unloader) {
    this._loader = loader instanceof Function ? loader : loadPage;
    this._unloader = unloader instanceof Function ? unloader : unloadPage;
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
   * @param {any} options.page
   * @param {Element} options.parent A location to load page.
   * @param {Object} [options.params] Extra parameters for ons-page.
   * @param {Function} done Take an object that has "element" property and "unload" function.
   * @param {Function} error Function called when there is an error.
   */
  load({page, parent, params = {}}, done, error) {
    this._loader({page, parent, params}, pageElement => {
      if (!(pageElement instanceof Element)) {
        throw Error('pageElement must be an instance of Element.');
      }
      // store meta info
      if (ons) {
        if(!ons._meta) {
            ons._meta = {};
        }
        ons._meta.PageLoader = {
            page, parent, params
        };
      }
      done(pageElement);
    }, error);
  }

  unload(pageElement) {
    if (!(pageElement instanceof Element)) {
      throw Error('pageElement must be an instance of Element.');
    }

    this._unloader(pageElement);
  }
}

export const defaultPageLoader = new PageLoader();

export const instantPageLoader = new PageLoader(
  function({page, parent, params = {}}, done) {
    const element = util.createElement(page.trim());
    parent.appendChild(element);

    done(element);
  },
  unloadPage
);
