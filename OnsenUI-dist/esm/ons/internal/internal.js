import _Promise from 'babel-runtime/core-js/promise';
import _typeof from 'babel-runtime/helpers/typeof';
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

import util from '../util';
import platform from '../platform';
import pageAttributeExpression from '../page-attribute-expression';

var internal = {};

internal.config = {
  autoStatusBarFill: true,
  animationsDisabled: false,
  warningsDisabled: false
};

internal.nullElement = window.document.createElement('div');

/**
 * @return {Boolean}
 */
internal.isEnabledAutoStatusBarFill = function () {
  return !!internal.config.autoStatusBarFill;
};

/**
 * @param {String} html
 * @return {String}
 */
internal.normalizePageHTML = function (html) {
  return ('' + html).trim();
};

internal.waitDOMContentLoaded = function (callback) {
  if (window.document.readyState === 'loading' || window.document.readyState == 'uninitialized') {
    var wrappedCallback = function wrappedCallback() {
      callback();
      window.document.removeEventListener('DOMContentLoaded', wrappedCallback);
    };
    window.document.addEventListener('DOMContentLoaded', wrappedCallback);
  } else {
    _setImmediate(callback);
  }
};

internal.autoStatusBarFill = function (action) {
  var onReady = function onReady() {
    if (internal.shouldFillStatusBar()) {
      action();
    }
    document.removeEventListener('deviceready', onReady);
  };

  if ((typeof device === 'undefined' ? 'undefined' : _typeof(device)) === 'object') {
    document.addEventListener('deviceready', onReady);
  } else if (['complete', 'interactive'].indexOf(document.readyState) === -1) {
    internal.waitDOMContentLoaded(onReady);
  } else {
    onReady();
  }
};

internal.shouldFillStatusBar = function () {
  return internal.isEnabledAutoStatusBarFill() && (platform.isWebView() && platform.isIOS7above() && !platform.isIPhoneX() || document.body.querySelector('.ons-status-bar-mock.ios'));
};

internal.templateStore = {
  _storage: {},

  /**
   * @param {String} key
   * @return {String/null} template
   */
  get: function get(key) {
    return internal.templateStore._storage[key] || null;
  },


  /**
   * @param {String} key
   * @param {String} template
   */
  set: function set(key, template) {
    internal.templateStore._storage[key] = template;
  }
};

window.document.addEventListener('_templateloaded', function (e) {
  if (e.target.nodeName.toLowerCase() === 'ons-template') {
    internal.templateStore.set(e.templateId, e.template);
  }
}, false);

internal.waitDOMContentLoaded(function () {
  register('script[type="text/ons-template"]');
  register('script[type="text/template"]');
  register('script[type="text/ng-template"]');
  register('template');

  function register(query) {
    var templates = window.document.querySelectorAll(query);
    for (var i = 0; i < templates.length; i++) {
      internal.templateStore.set(templates[i].getAttribute('id'), templates[i].textContent || templates[i].content);
    }
  }
});

/**
 * @param {String} page
 * @return {Promise}
 */
internal.getTemplateHTMLAsync = function (page) {
  return new _Promise(function (resolve, reject) {
    internal.waitDOMContentLoaded(function () {
      var cache = internal.templateStore.get(page);
      if (cache) {
        if (cache instanceof DocumentFragment) {
          return resolve(cache);
        }

        var html = typeof cache === 'string' ? cache : cache[1];
        return resolve(internal.normalizePageHTML(html));
      }

      var local = window.document.getElementById(page);
      if (local) {
        var _html = local.textContent || local.content;
        return resolve(_html);
      }

      var xhr = new XMLHttpRequest();
      xhr.open('GET', page, true);
      xhr.onload = function () {
        var html = xhr.responseText;
        if (xhr.status >= 400 && xhr.status < 600) {
          reject(html);
        } else {
          // Refresh script tags
          var fragment = util.createFragment(html);
          util.arrayFrom(fragment.querySelectorAll('script')).forEach(function (el) {
            var script = document.createElement('script');
            script.type = el.type || 'text/javascript';
            script.appendChild(document.createTextNode(el.text || el.textContent || el.innerHTML));
            el.parentNode.replaceChild(script, el);
          });

          internal.templateStore.set(page, fragment);
          resolve(fragment);
        }
      };
      xhr.onerror = function () {
        throw new Error('The page is not found: ' + page);
      };
      xhr.send(null);
    });
  });
};

/**
 * @param {String} page
 * @return {Promise}
 */
internal.getPageHTMLAsync = function (page) {
  var pages = pageAttributeExpression.evaluate(page);

  var getPage = function getPage(page) {
    if (typeof page !== 'string') {
      return _Promise.reject('Must specify a page.');
    }

    return internal.getTemplateHTMLAsync(page).catch(function (error) {
      if (pages.length === 0) {
        return _Promise.reject(error);
      }

      return getPage(pages.shift());
    });
  };

  return getPage(pages.shift());
};

export default internal;