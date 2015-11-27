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

((ons) => {
  'use strict';

  ons._internal = ons._internal || {};

  ons._internal.nullElement = document.createElement('div');

  /**
   * @return {Boolean}
   */
  ons._internal.isEnabledAutoStatusBarFill = () => {
    return !!ons._config.autoStatusBarFill;
  };

  /**
   * @param {String} html
   * @return {String}
   */
  ons._internal.normalizePageHTML = (html) => {
    html = ('' + html).trim();

    if (!html.match(/^<ons-page/)) {
      html = '<ons-page _muted>' + html + '</ons-page>';
    }

    return html;
  };

  ons._internal.waitDOMContentLoaded = (callback) => {
    if (document.readyState === 'loading' || document.readyState == 'uninitialized') {
      window.document.addEventListener('DOMContentLoaded', callback);
    } else {
      setImmediate(callback);
    }
  };

  /**
   * @param {HTMLElement} element
   * @return {Boolean}
   */
  ons._internal.shouldFillStatusBar = function (element) {
    var checkStatusBar = function(){
      if (ons._internal.isEnabledAutoStatusBarFill() && ons.platform.isWebView() && ons.platform.isIOS7above()) {
        if (!(element instanceof HTMLElement)) {
          throw new Error('element must be an instance of HTMLElement');
        }

        for (;;) {
          if (element.hasAttribute('no-status-bar-fill')) {
            return false;
          }

          element = element.parentNode;
          if (!element || !element.hasAttribute) {
            return true;
          }
        }
      }
      return false;
    }

    return new Promise(function(resolve, reject){
      if(typeof device === 'object'){
        document.addEventListener('deviceready', function(){
          if(checkStatusBar()){
            resolve();
          }
        });
      }
      else if(checkStatusBar()){
        resolve();
      }
      reject();
    });
  };

  ons._internal.templateStore = {
    _storage: {},

    /**
     * @param {String} key
     * @return {String/null} template
     */
    get(key) {
      return ons._internal.templateStore._storage[key] || null;
    },

    /**
     * @param {String} key
     * @param {String} template
     */
    set(key, template) {
      ons._internal.templateStore._storage[key] = template;
    }
  };

  document.addEventListener('_templateloaded', function(e) {
    if (e.target.nodeName.toLowerCase() === 'ons-template') {
      ons._internal.templateStore.set(e.templateId, e.template);
    }
  }, false);

  document.addEventListener('DOMContentLoaded', function() {
    register('script[type="text/ons-template"]');
    register('script[type="text/template"]');
    register('script[type="text/ng-template"]');

    function register(query) {
      const templates = document.querySelectorAll(query);
      for (let i = 0; i < templates.length; i++) {
        ons._internal.templateStore.set(templates[i].getAttribute('id'), templates[i].textContent);
      }
    }
  }, false);

  /**
   * @param {String} page
   * @return {Promise}
   */
  ons._internal.getTemplateHTMLAsync = function(page) {
    return new Promise((resolve, reject) => {
      setImmediate(() => {
        const cache = ons._internal.templateStore.get(page);

        if (cache) {
          const html = typeof cache === 'string' ? cache : cache[1];
          resolve(html);
        } else {
          const xhr = new XMLHttpRequest();
          xhr.open('GET', page, true);
          xhr.onload = function(response) {
            const html = xhr.responseText;
            if (xhr.status >= 400 && xhr.status < 600) {
              reject(html);
            }
            else {
              resolve(html);
            }
          };
          xhr.onerror = function() {
            throw new Error(`The page is not found: ${page}`);
          };
          xhr.send(null);
        }
      });
    });
  };

  /**
   * @param {String} page
   * @return {Promise}
   */
  ons._internal.getPageHTMLAsync = function(page) {
    let pages = ons.pageAttributeExpression.evaluate(page);

    let getPage = (page) => {
      if (typeof page !== 'string') {
        return Promise.reject('Must specify a page.');
      }

      return ons._internal.getTemplateHTMLAsync(page)
        .then(
          function(html) {
            return ons._internal.normalizePageHTML(html);
          },
          function(error) {
            if (pages.length === 0) {
              return Promise.reject(error);
            }

            return getPage(pages.shift());
          }
        )
        .then(html => ons._internal.normalizePageHTML(html));
    };

    return getPage(pages.shift());
  };

})(window.ons = window.ons || {});
