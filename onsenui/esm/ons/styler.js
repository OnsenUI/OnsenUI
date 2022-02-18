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

import util from '../ons/util.js';

/**
 * Add vendor prefix.
 *
 * @param {String} name
 * @return {String}
 */
const prefix = (function() {
  const styles = window.getComputedStyle(document.documentElement, '');
  const prefix = (Array.prototype.slice
    .call(styles)
    .join('')
    .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
  )[1];

  return function(name) {
    return '-' + prefix + '-' + util.hyphenate(name);
  };
})();


/**
 * Minimal utility library for manipulating element's style.
 * Set element's style.
 *
 * @param {Element} element
 * @param {Object} styles
 * @return {Element}
 */
const styler = function(element, style) {
  Object.keys(style).forEach(function(key) {
    if (key in element.style) {
      element.style[key] = style[key];
    } else if (prefix(key) in element.style) {
      element.style[prefix(key)] = style[key];
    } else {
      util.warn('No such style property: ' + key);
    }
  });
  return element;
};

/**
 * @param {Element} element
 * @param {String} styles Space-separated CSS properties to remove
 */
styler.clear = function(element, styles = '') {
  const clearlist = styles.split(/\s+/).reduce((r, s) => r.concat([util.hyphenate(s), prefix(s)]), []),
    keys = [];

  for (let i = element.style.length - 1; i >= 0; i--) {
    const key = element.style[i];
    if (clearlist.length === 0 || clearlist.some(s => key.indexOf(s) === 0)) {
      keys.push(key); // Store the key to fix Safari style indexes
    }
  }

  keys.forEach(key => element.style[key] = '');
  element.getAttribute('style') === '' && element.removeAttribute('style');
};

export default styler;
