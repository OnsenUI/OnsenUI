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

/**
 * Minimal utility library for manipulating element's style.
 */
const styler = function(element, style) {
  return styler.css.apply(styler, arguments);
};

/**
 * Set element's style.
 *
 * @param {Element} element
 * @param {Object} styles
 * @return {Element}
 */
styler.css = function(element, styles) {
  var keys = Object.keys(styles);
  keys.forEach(function(key) {
    if (key in element.style) {
      element.style[key] = styles[key];
    } else if (styler._prefix(key) in element.style) {
      element.style[styler._prefix(key)] = styles[key];
    } else {
      util.warn('No such style property: ' + key);
    }
  });
  return element;
};

/**
 * Add vendor prefix.
 *
 * @param {String} name
 * @return {String}
 */
styler._prefix = (function() {
  var styles = window.getComputedStyle(document.documentElement, '');
  var prefix = (Array.prototype.slice
    .call(styles)
    .join('')
    .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
  )[1];

  return function(name) {
    return prefix + name.substr(0, 1).toUpperCase() + name.substr(1);
  };
})();

/**
 * @param {Element} element
 */
styler.clear = function(element) {
  styler._clear(element);
};

/**
 * @param {Element} element
 */
styler._clear = function(element) {
  var len = element.style.length;
  var style = element.style;
  var keys = [];
  for (var i = 0; i < len; i++) {
    keys.push(style[i]);
  }

  keys.forEach(function(key) {
    style[key] = '';
  });
};

export default styler;
