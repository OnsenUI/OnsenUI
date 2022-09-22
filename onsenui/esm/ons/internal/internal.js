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

import util from '../util.js';
import platform from '../platform.js';
import pageAttributeExpression from '../page-attribute-expression.js';

const internal = {};

internal.config = {
  autoStatusBarFill: true,
  animationsDisabled: false,
  warningsDisabled: false
};

internal.nullElement = window.document.createElement('div');

/**
 * @return {Boolean}
 */
internal.isEnabledAutoStatusBarFill = () => {
  return !!internal.config.autoStatusBarFill;
};

/**
 * @param {String} html
 * @return {String}
 */
internal.normalizePageHTML = html => ('' + html).trim();

internal.waitDOMContentLoaded = callback => {
  if (window.document.readyState === 'loading' || window.document.readyState == 'uninitialized') {
    const wrappedCallback = () => {
      callback();
      window.document.removeEventListener('DOMContentLoaded', wrappedCallback);
    };
    window.document.addEventListener('DOMContentLoaded', wrappedCallback);
  } else {
    setImmediate(callback);
  }
};

internal.autoStatusBarFill = action => {
  const onReady = () => {
    if (internal.shouldFillStatusBar()) {
      action();
    }
    document.removeEventListener('deviceready', onReady);
  };

  if (typeof device === 'object') {
    document.addEventListener('deviceready', onReady);
  } else if (['complete', 'interactive'].indexOf(document.readyState) === -1) {
    internal.waitDOMContentLoaded(onReady);
  } else {
    onReady();
  }
};

internal.shouldFillStatusBar = () =>
  internal.isEnabledAutoStatusBarFill() && (platform.isWebView() && (platform.isIOS7above() || platform.isIPadOS())
    && !platform.isIPhoneX() || document.body.querySelector('.ons-status-bar-mock.ios'));

internal.templateStore = {
  _storage: {},

  /**
   * @param {String} key
   * @return {String/null} template
   */
  get(key) {
    return internal.templateStore._storage[key] || null;
  },

  /**
   * @param {String} key
   * @param {String} template
   */
  set(key, template) {
    internal.templateStore._storage[key] = template;
  }
};

/**
 * @param {String} page
 * @return {Promise}
 */
internal.getTemplateHTMLAsync = function(page) {
  return new Promise((resolve, reject) => {
    internal.waitDOMContentLoaded(() => {
      const cache = internal.templateStore.get(page);
      if (cache) {
        if (cache instanceof DocumentFragment) {
          return resolve(cache);
        }

        const html = typeof cache === 'string' ? cache : cache[1];
        return resolve(internal.normalizePageHTML(html));
      }

      const local = window.document.getElementById(page);
      if (local) {
        const html = local.textContent || local.content;
        return resolve(html);
      }

      const xhr = new XMLHttpRequest();
      xhr.open('GET', page, true);
      xhr.onload = function() {
        const html = xhr.responseText;
        if (xhr.status >= 400 && xhr.status < 600) {
          if (xhr.status === 404) {
            reject(404);
          } else {
            reject(html);
          }
        } else {
          // Refresh script tags
          const fragment = util.createFragment(html);
          util.arrayFrom(fragment.querySelectorAll('script')).forEach(el => {
            const script = document.createElement('script');
            script.type = el.type || 'text/javascript';
            script.appendChild(document.createTextNode(el.text || el.textContent || el.innerHTML));
            el.parentNode.replaceChild(script, el);
          });

          internal.templateStore.set(page, fragment);
          resolve(fragment);
        }
      };
      xhr.onerror = function() {
        util.throw(`Page template not found: ${page}`);
      };
      xhr.send(null);
    });
  });
};

/**
 * @param {String} page
 * @return {Promise}
 */
internal.getPageHTMLAsync = function(page) {
  const pages = pageAttributeExpression.evaluate(page);

  const getPage = (page) => {
    if (typeof page !== 'string') {
      return Promise.reject('Must specify a page.');
    }

    return internal.getTemplateHTMLAsync(page)
      .catch(function(error) {
        if (pages.length === 0) {
          return Promise.reject(error);
        }

        return getPage(pages.shift());
      });
  };

  return getPage(pages.shift());
};

export default internal;
