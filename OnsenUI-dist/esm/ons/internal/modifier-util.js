import _Object$keys from 'babel-runtime/core-js/object/keys';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
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
import autoStyle from '../autostyle.js';

var ModifierUtil = function () {
  function ModifierUtil() {
    _classCallCheck(this, ModifierUtil);
  }

  _createClass(ModifierUtil, null, [{
    key: 'diff',

    /**
     * @param {String} last
     * @param {String} current
     */
    value: function diff(last, current) {
      last = makeDict(('' + last).trim());
      current = makeDict(('' + current).trim());

      var removed = _Object$keys(last).reduce(function (result, token) {
        if (!current[token]) {
          result.push(token);
        }
        return result;
      }, []);

      var added = _Object$keys(current).reduce(function (result, token) {
        if (!last[token]) {
          result.push(token);
        }
        return result;
      }, []);

      return { added: added, removed: removed };

      function makeDict(modifier) {
        var dict = {};
        ModifierUtil.split(modifier).forEach(function (token) {
          return dict[token] = token;
        });
        return dict;
      }
    }

    /**
     * @param {Object} diff
     * @param {Array} diff.removed
     * @param {Array} diff.added
     * @param {Object} classList
     * @param {String} template
     */

  }, {
    key: 'applyDiffToClassList',
    value: function applyDiffToClassList(diff, classList, template) {
      diff.added.map(function (modifier) {
        return template.replace(/\*/g, modifier);
      }).forEach(function (klass) {
        return klass.split(/\s+/).forEach(function (k) {
          return classList.add(k);
        });
      });

      diff.removed.map(function (modifier) {
        return template.replace(/\*/g, modifier);
      }).forEach(function (klass) {
        return klass.split(/\s+/).forEach(function (k) {
          return classList.remove(k);
        });
      });
    }

    /**
     * @param {Object} diff
     * @param {Array} diff.removed
     * @param {Array} diff.added
     * @param {HTMLElement} element
     * @param {Object} scheme
     */

  }, {
    key: 'applyDiffToElement',
    value: function applyDiffToElement(diff, element, scheme) {
      _Object$keys(scheme).forEach(function (selector) {
        var targetElements = !selector || util.match(element, selector) ? [element] : Array.prototype.filter.call(element.querySelectorAll(selector), function (targetElement) {
          return !util.findParent(targetElement, element.tagName, function (parent) {
            return parent === element;
          });
        });

        for (var i = 0; i < targetElements.length; i++) {
          ModifierUtil.applyDiffToClassList(diff, targetElements[i].classList, scheme[selector]);
        }
      });
    }

    /**
     * @param {String} last
     * @param {String} current
     * @param {HTMLElement} element
     * @param {Object} scheme
     */

  }, {
    key: 'onModifierChanged',
    value: function onModifierChanged(last, current, element, scheme) {
      ModifierUtil.applyDiffToElement(ModifierUtil.diff(last, current), element, scheme);
      autoStyle.restoreModifier(element);
    }
  }, {
    key: 'refresh',
    value: function refresh(element, scheme) {
      ModifierUtil.applyDiffToElement(ModifierUtil.diff('', element.getAttribute('modifier') || ''), element, scheme);
    }

    /**
     * @param {HTMLElement} element
     * @param {Object} scheme
     */

  }, {
    key: 'initModifier',
    value: function initModifier(element, scheme) {
      var modifier = element.getAttribute('modifier');
      if (typeof modifier !== 'string') {
        return;
      }

      ModifierUtil.applyDiffToElement({
        removed: [],
        added: ModifierUtil.split(modifier)
      }, element, scheme);
    }
  }, {
    key: 'split',
    value: function split(modifier) {
      if (typeof modifier !== 'string') {
        return [];
      }

      return modifier.trim().split(/ +/).filter(function (token) {
        return token !== '';
      });
    }

    /**
     * Add modifier token to an element.
     */

  }, {
    key: 'addModifier',
    value: function addModifier(element, modifierToken) {
      if (!element.hasAttribute('modifier')) {
        element.setAttribute('modifier', modifierToken);
      } else {
        var tokens = ModifierUtil.split(element.getAttribute('modifier'));
        if (tokens.indexOf(modifierToken) == -1) {
          tokens.push(modifierToken);
          element.setAttribute('modifier', tokens.join(' '));
        }
      }
    }

    /**
     * Remove modifier token from an element.
     */

  }, {
    key: 'removeModifier',
    value: function removeModifier(element, modifierToken) {
      if (element.hasAttribute('modifier')) {
        var tokens = ModifierUtil.split(element.getAttribute('modifier'));
        var index = tokens.indexOf(modifierToken);
        if (index !== -1) {
          tokens.splice(index, 1);
          element.setAttribute('modifier', tokens.join(' '));
        }
      }
    }
  }]);

  return ModifierUtil;
}();

export default ModifierUtil;