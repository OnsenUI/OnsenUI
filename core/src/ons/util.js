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
 * @param {Element} element
 * @param {String/Function} query dot class name or node name.
 * @return {Boolean}
 */
util.match = (element, query) => {
  if (query[0] === '.') {
    return element.classList.contains(query.slice(1));
  }
  return element.nodeName.toLowerCase() === query;
};

/**
 * @param {Element} element
 * @param {String/Function} query dot class name or node name or matcher function.
 * @return {HTMLElement/null}
 */
util.findChild = (element, query) => {
  const match = util.prepareQuery(query);

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
 * @param {String/Function} query dot class name or node name or matcher function.
 * @return {HTMLElement/null}
 */
util.findChildRecursively = (element, query) => {
  const match = util.prepareQuery(query);

  for (let i = 0; i < element.children.length; i++) {
    const node = element.children[i];
    if (match(node)) {
      return node;
    } else {
      let nodeMatch = util.findChildRecursively(node, match);
      if (nodeMatch) {
        return nodeMatch;
      }
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
  let classList = selector.split('.'),
    element = document.createElement(classList.shift() || 'div');

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
  wrapper.innerHTML = html;

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
  wrapper.innerHTML = html;
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
 * @return {Boolean} Whether it was added or not.
 */
util.addModifier = (target, modifierName) => {
  if (util.hasModifier(target, modifierName)) {
    return false;
  }

  modifierName = modifierName.trim();
  let modifierAttribute = target.getAttribute('modifier') || '';
  target.setAttribute('modifier', (modifierAttribute + ' ' + modifierName).trim());
  return true;
};

/**
 * @param {Element} target
 * @param {String} modifierName
 * @return {Boolean} Whether it was found or not.
 */
util.removeModifier = (target, modifierName) => {
  if (!target.getAttribute('modifier')) {
    return false;
  }

  const modifiers = target.getAttribute('modifier').split(/\s+/);

  const newModifiers = modifiers.filter(item => item && item !== modifierName);
  target.setAttribute('modifier', newModifiers.join(' '));

  return modifiers.length !== newModifiers.length;
};

util.updateParentPosition = (el) => {
  if (!el._parentUpdated && el.parentElement) {
    if (window.getComputedStyle(el.parentElement).getPropertyValue('position') === 'static') {
      el.parentElement.style.position = 'relative';
    }
    el._parentUpdated = true;
  }
};

util.toggleAttribute = (element, name, enable) => {
  if (enable) {
    element.setAttribute(name, '');
  } else {
    element.removeAttribute(name);
  }
};

util.bindListeners = (element, listenerNames) => {
  listenerNames.forEach(name => {
    let boundName = name.replace(/^_[a-z]/, '_bound' + name[1].toUpperCase());
    element[boundName] = element[boundName] || element[name].bind(element);
  });
};

util.each = (obj, f) => Object.keys(obj).forEach(key => f(key, obj[key]));

let safe = f => function(){
  if (f instanceof Function) {
    return f.apply(this, arguments);
  }
};
util.safeCall = (object, prop, ...rest) => safe(object[prop]).apply(object, rest);
util.safeApply = (object, prop,   rest) => safe(object[prop]).apply(object, rest);

let isOfType = (object, type) => {
  if (Array.isArray(type)) {
    return type.some(type => isOfType(object, type));
  }
  if (object === null) {
    return type === 'null';
  }
  return (type instanceof Function && object instanceof type) ||
         (typeof type === 'string' && typeof object === type);
};

let _printType = type => {
  if (Array.isArray(type)) {
    return type.map(_printType).join(' or ');
  }
  return (type instanceof Function && 'an instance of ' + type) ||
    (type === 'null' && 'null') || (typeof type === 'string' && 'a ' + type) || JSON.stringify(type);
};


/**
 * @param {String} name - name which will be used in the error if the validation fails
 * @param {Function|String|Number|Boolean} object - object to be validated
 * @param {Object} options - validation options or type
 * @param {Array|String|Function} options.type - expected type or array of valid types
 * @param {Array|String|Function} options.returns - expected type of return value of the function
 * @param {Boolean} options.safeCall - if this is true then return a function which calls the `object` argument if it's a function. It will not throw an error it it's not.
 * @param {Object} options.dynamicCall - if this is set then all checks will be completed when trying to execute the resulting function. Furthermore instead of using the `object` argument it will use options.dynamicCall's `object[key]`.
 * @param {Object} options.dynamicCall.object - required if dynamicCall is exists
 * @param {String} options.dynamicCall.key - required if dynamicCall is exists
 * @param {Object} options.context - this is still an experimental setting. Context of the function. Used only with dynamicCall and returns. Defaults to dynamicCall.object.
 * @return validated object
 * @throws Error if the validation fails
 * @example
 *    doge = validated('doge', doge, [Doge, 'string']);
 *    foo = validated('foo', foo, {type: ['number', Array, 'null']});
 *    bar = validated('bar', bar, {type: 'function', safeCall: true});
 *    baz = validated('baz', null, {type: 'function', returns: 'string', dynamicCall: {object: obj, key: 'foo'}});
 *
 *    hoge = validated('hoge', obj, {
 *      type: [Doge, Duck],
 *      object: {
 *        name: 'string',
 *        wow: 'boolean',
 *        walk: {type: 'function', returns: 'boolean'},
 *        talk: {type: 'function', dynamicCall: {object: obj, key: 'quack'}, safeCall: true}
 *      }
 *    });
 *
 * @todo Support for functions with options.object - {type: Function, object: obj}
 */

let validated = util.validated = (name, object, options) => {
  let type = options && options.type || (!options.object && options);
  if (type && !isOfType(object, type) && !(options.dynamicCall || options.safeCall)) {
    throw new Error(name + ' must be ' + _printType(type) + '. You provided ' + object);
  }
  if (options && options.object) {
    name = name ? name + '.' : '';
    let result = {};
    Object.keys(options.object).forEach(key => {
      let dynamicCall = options.object[key].dynamicCall;
      if (dynamicCall) {
        dynamicCall.object = dynamicCall.object || object;
        dynamicCall.key = dynamicCall.key || key;
      }
      result[key] = validated(name + key, object[key], options.object[key]);
    });
    return result;
  }
  if (type === Function || type === 'function') {
    let {object: obj, key} = options.dynamicCall || {};
    let context = options.context || obj;
    let test = options.safeCall ? safe : options.dynamicCall ? f => validated(name, f, Function) : f => f;

    object = options.dynamicCall ? (...rest) => test(obj[key]).apply(context, rest) : test(object);

    if (options.returns) {
      return (...rest) =>  validated(name + '\'s result', object.apply(context, rest), options.returns);
    }
  }
  return object;
};

/**
 * @param {Element} target
 */
util.updateRipple = (target) => {
  let rippleElement = util.findChild(target, 'ons-ripple');

  if (target.hasAttribute('ripple')) {
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

export default util;
