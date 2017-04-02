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

import internal from './internal';
import autoStyle from './autostyle';
import animationOptionsParse from './animation-options-parser';

const util = {};

/**
 * @param {String/Function} query dot class name or node name or matcher function.
 * @return {Function}
 */
util.prepareQuery = (query) => {
  return query instanceof Function ? query : (element) => util.match(element, query);
};

/**
 * @param {Element} e
 * @param {String/Function} s CSS Selector.
 * @return {Boolean}
 */
util.match = (e, s) => (e.matches || e.webkitMatchesSelector || e.mozMatchesSelector || e.msMatchesSelector).call(e, s);

/**
 * @param {Element} element
 * @param {String/Function} query dot class name or node name or matcher function.
 * @return {HTMLElement/null}
 */
util.findChild = (element, query) => {
  const match = util.prepareQuery(query);

  // Caution: `element.children` is `undefined` in some environments if `element` is `svg`
  for (let i = 0; i < element.childNodes.length; i++) {
    const node = element.childNodes[i];
    if (node.nodeType !== Node.ELEMENT_NODE) { // process only element nodes
      continue;
    }
    if (match(node)) {
      return node;
    }
  }
  return null;
};

/**
 * @param {Element} element
 * @param {String/Function} query dot class name or node name or matcher function.
 * @return {HTMLElement/null}
 */
util.findParent = (element, query) => {
  const match = util.prepareQuery(query);

  let parent = element.parentNode;
  for (;;) {
    if (!parent || parent === document) {
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
    if (element && element.nodeName.toLowerCase().match(/(ons-navigator|ons-tabbar|ons-modal|ons-sliding-menu|ons-split-view)/)) {
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
    const child = element.childNodes[i];
    if (child[action] instanceof Function) {
      child[action]();
    } else {
      util.propagateAction(child, action);
    }
  }
};


/**
 * @param {String} selector - tag and class only
 * @param {Object} style
 * @param {Element}
 */
util.create = (selector = '', style = {}) => {
  const classList = selector.split('.');
  const element = document.createElement(classList.shift() || 'div');

  if (classList.length) {
    element.className = classList.join(' ');
  }

  util.extend(element.style, style);

  return element;
};

/**
 * @param {String} html
 * @return {Element}
 */
util.createElement = (html) => {
  const wrapper = document.createElement('div');
  innerHTML(wrapper, html);

  if (wrapper.children.length > 1) {
    throw new Error('"html" must be one wrapper element.');
  }

  return wrapper.children[0];
};

/**
 * @param {String} html
 * @return {HTMLFragment}
 */
util.createFragment = (html) => {
  const wrapper = document.createElement('div');
  innerHTML(wrapper, html);
  const fragment = document.createDocumentFragment();

  while (wrapper.firstChild) {
    fragment.appendChild(wrapper.firstChild);
  }

  return fragment;
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
  return Array.prototype.slice.apply(arrayLike);
};

/**
 * @param {String} jsonString
 * @param {Object} [failSafe]
 * @return {Object}
 */
util.parseJSONObjectSafely = (jsonString, failSafe = {}) => {
  try {
    const result = JSON.parse('' + jsonString);
    if (typeof result === 'object' && result !== null) {
      return result;
    }
  } catch(e) {
    return failSafe;
  }
  return failSafe;
};

/**
 * @param {String} path - path such as 'myApp.controllers.data.loadData'
 * @return {Any} - whatever is located at that path
 */
util.findFromPath = (path) => {
  path = path.split('.');
  var el = window, key;
  while (key = path.shift()) { // eslint-disable-line no-cond-assign
    el = el[key];
  }
  return el;
};

/**
 * @param {HTMLElement} container - Page or page-container that implements 'topPage'
 * @return {HTMLElement|null} - Visible page element or null if not found.
 */
util.getTopPage = container => container && (container.tagName.toLowerCase() === 'ons-page' ? container : container.topPage) || null;

/**
 * @param {HTMLElement} container - Element where the search begins
 * @return {HTMLElement|null} - Page element that contains the visible toolbar or null.
 */
util.findToolbarPage = container => {
  const page = util.getTopPage(container);

  if (page) {
    if (util.findChild(page, 'ons-toolbar')) {
      return page;
    }

    for (let i = 0; i < page._contentElement.children.length; i++) {
      const nextPage = util.getTopPage(page._contentElement.children[i]);
      if (nextPage) {
        return util.findToolbarPage(nextPage);
      }
    }
  }

  return null;
};

/**
 * @param {Element} element
 * @param {String} eventName
 * @param {Object} [detail]
 * @return {CustomEvent}
 */
util.triggerElementEvent = (target, eventName, detail = {}) => {

  const event = new CustomEvent(eventName, {
    bubbles: true,
    cancelable: true,
    detail: detail
  });

  Object.keys(detail).forEach(key => {
    event[key] = detail[key];
  });

  target.dispatchEvent(event);

  return event;
};

/**
 * @param {Element} target
 * @param {String} modifierName
 * @return {Boolean}
 */
util.hasModifier = (target, modifierName) => {
  if (!target.hasAttribute('modifier')) {
    return false;
  }
  return target.getAttribute('modifier').split(/\s+/).some(e => e === modifierName);
};

/**
 * @param {Element} target
 * @param {String} modifierName
 * @param {Object} options.autoStyle Maps the modifierName to the corresponding styled modifier.
 * @param {Object} options.forceAutoStyle Ignores platform limitation.
 * @return {Boolean} Whether it was added or not.
 */
util.addModifier = (target, modifierName, options = {}) => {
  if (options.autoStyle) {
    modifierName = autoStyle.mapModifier(modifierName, target, options.forceAutoStyle);
  }

  if (util.hasModifier(target, modifierName)) {
    return false;
  }

  modifierName = modifierName.trim();
  const modifierAttribute = target.getAttribute('modifier') || '';
  target.setAttribute('modifier', (modifierAttribute + ' ' + modifierName).trim());
  return true;
};

/**
 * @param {Element} target
 * @param {String} modifierName
 * @param {Object} options.autoStyle Maps the modifierName to the corresponding styled modifier.
 * @param {Object} options.forceAutoStyle Ignores platform limitation.
 * @return {Boolean} Whether it was found or not.
 */
util.removeModifier = (target, modifierName, options = {}) => {
  if (!target.getAttribute('modifier')) {
    return false;
  }

  if (options.autoStyle) {
    modifierName = autoStyle.mapModifier(modifierName, target, options.forceAutoStyle);
  }

  const modifiers = target.getAttribute('modifier').split(/\s+/);

  const newModifiers = modifiers.filter(item => item && item !== modifierName);
  target.setAttribute('modifier', newModifiers.join(' '));

  return modifiers.length !== newModifiers.length;
};

// TODO: FIX
util.updateParentPosition = (el) => {
  if (!el._parentUpdated && el.parentElement) {
    if (window.getComputedStyle(el.parentElement).getPropertyValue('position') === 'static') {
      el.parentElement.style.position = 'relative';
    }
    el._parentUpdated = true;
  }
};

util.toggleAttribute = (element, name, value) => {
  if (value) {
    element.setAttribute(name, value);
  } else {
    element.removeAttribute(name);
  }
};

util.bindListeners = (element, listenerNames) => {
  listenerNames.forEach(name => {
    const boundName = name.replace(/^_[a-z]/, '_bound' + name[1].toUpperCase());
    element[boundName] = element[boundName] || element[name].bind(element);
  });
};

util.each = (obj, f) => Object.keys(obj).forEach(key => f(key, obj[key]));


/**
 * @param {Element} target
 * @param {Element} hasRipple
 */
util.updateRipple = (target, hasRipple) => {
  if (hasRipple === undefined) {
    hasRipple = target.hasAttribute('ripple');
  }

  const rippleElement = util.findChild(target, 'ons-ripple');

  if (hasRipple) {
    if (!rippleElement) {
      target.insertBefore(document.createElement('ons-ripple'), target.firstChild);
    }
  } else if (rippleElement) {
    rippleElement.remove();
  }
};

/**
 * @param {String}
 * @return {Object}
 */
util.animationOptionsParse = animationOptionsParse;

/**
 * @param {*} value
 */
util.isInteger = (value) => {
  return typeof value === 'number' &&
    isFinite(value) &&
    Math.floor(value) === value;
};

/**
 * @return {Obejct} Deferred promise.
 */
util.defer = () => {
  const deferred = {};
  deferred.promise = new Promise((resolve, reject) => {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });
  return deferred;
};

/**
 * Show warnings when they are enabled.
 *
 * @param {*} arguments to console.warn
 */
util.warn = (...args) => {
  if (!internal.config.warningsDisabled) {
    console.warn(...args);
  }
};

export default util;
