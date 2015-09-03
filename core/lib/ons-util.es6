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

  const util = ons._util = ons._util || {};

  /**
   * @param {Element} element
   * @param {String} query dot class name or node name.
   * @return {HTMLElement/null}
   */
  util.findChild = (element, query) => {
    const match = query.substr(0, 1) === '.' ?
      (node) => node.classList.contains(query.substr(1)) :
      (node) => node.nodeName.toLowerCase() === query;

    for (let i = 0; i < element.children.length; i++) {
      const node = element.children[i];
      if (match(node)) {
        return node;
      }
    }
    return null;
  };

  /**
   * @param {Element} element
   * @param {String} query dot class name or node name.
   * @return {HTMLElement/null}
   */
  util.findParent = (element, query) => {
    const match = query.substr(0, 1) === '.' ?
      (node) => node.classList.contains(query.substr(1)) :
      (node) => node.nodeName.toLowerCase() === query;

    let parent = element.parentNode;
    for (;;) {
      if (!parent) {
        return null;
      }
      if (match(parent)) {
        return parent;
      }
      parent = parent.parentNode;
    }
  };

  /**
   * @param {Element} element
   * @return {boolean}
   */
  util.isAttached = (element) => {
    while (document.documentElement !== element) {
      if (!element) {
        return false;
      }
      element = element.parentNode;
    }
    return true;
  };

  /**
   * @param {Element} element
   * @return {boolean}
   */
  util.hasAnyComponentAsParent = (element) => {
    while (element && document.documentElement !== element) {
      element = element.parentNode;
      if (element && element.nodeName.toLowerCase().match(/(ons-navigator|ons-tabbar|ons-sliding-menu|ons-split-view)/)) {
        return true;
      }
    }
    return false;
  };

  /**
   * @param {Element} element
   * @param {String} action to propagate
   */
  util.propagateAction = (element, action) => {
    for (let i = 0; i < element.childNodes.length; i++) {
      let child = element.childNodes[i];
      if (child[action]) {
        child[action]();
      } else {
        ons._util.propagateAction(child, action);
      }
    }
  };

  /**
   * @param {String} html
   * @return {Element}
   */
  util.createElement = (html) => {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = html;

    if (wrapper.children.length > 1) {
      throw new Error('"html" must be one wrapper element.');
    }

    return wrapper.children[0];
  };

  /**
   * @param {Element} element
   * @return {Element}
   */
  util.removeElement = (element) => {
    if (element.parentNode) {
      element.parentNode.removeChild(element);
    }
    return element;
  };

  /*
   * @param {Object} dst Destination object.
   * @param {...Object} src Source object(s).
   * @returns {Object} Reference to `dst`.
   */
  util.extend = (dst, ...args) => {
    for (let i = 0; i < args.length; i++) {
      if (args[i]) {
        const keys = Object.keys(args[i]);
        for (let j = 0; j < keys.length; j++) {
          const key = keys[j];
          dst[key] = args[i][key];
        }
      }
    }

    return dst;
  };

  /**
   * @param {Object} arrayLike
   * @return {Array}
   */
  util.arrayFrom = (arrayLike) => {
    const result = [];
    for (let i = 0; i < arrayLike.length; i++) {
      result.push(arrayLike[i]);
    }
    return result;
  };

})(window.ons = window.ons || {});
