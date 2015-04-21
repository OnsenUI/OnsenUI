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


window.ModifierUtil = (() => {
  'use strict';

  class ModifierUtil {
    /**
     * @param {String} last
     * @param {String} current
     */
    static diff(last, current) {
      last = makeDict(('' + last).trim());
      current = makeDict(('' + current).trim());

      var removed = Object.keys(last).reduce((result, token) => {
        if (!current[token]) {
          result.push(token);
        }
        return result;
      }, []);

      var added = Object.keys(current).reduce((result, token) => {
        if (!last[token]) {
          result.push(token);
        }
        return result;
      }, []);

      return {added, removed};

      function makeDict(modifier) {
        var dict = {};
        ModifierUtil.split(modifier).forEach(token => dict[token] = token);
        return dict;
      }
    }

    /**
     * @param {Object} diff
     * @param {Object} classList
     * @param {String} template
     */
    static applyDiffToClassList(diff, classList, template) {
      diff.added
        .map(modifier => template.replace(/\*/g, modifier))
        .forEach(klass => classList.add(klass));

      diff.removed
        .map(modifier => template.replace(/\*/g, modifier))
        .forEach(klass => classList.remove(klass));
    }

    /**
     * @param {Object} diff
     * @param {HTMLElement} element
     * @param {Object} scheme
     */
    static applyDiffToElement(diff, element, scheme) {
      for (let selector in scheme) {
        if (scheme.hasOwnProperty(selector)) {
          let targetElements = selector === '' ? [element] : element.querySelectorAll(selector);
          targetElements.forEach(targetElement => {
            ModifierUtil.applyDiffToClassList(diff, targetElement.classList, scheme[selector]);
          });
        }
      }
    }

    /**
     * @param {String} last
     * @param {String} current
     * @param {HTMLElement} element
     * @param {Object} scheme
     */
    static onModifierChanged(last, current, element, scheme) {
      return ModifierUtil.applyDiffToElement(ModifierUtil.diff(last, current), element, scheme);
    }

    /**
     * @param {HTMLElement} element
     * @param {Object} scheme
     */
    static initModifier(element, scheme) {
      var modifier = element.getAttribute('modifier');
      if (typeof modifier !== 'string') {
        return;
      }

      return ModifierUtil.applyDiffToElement({
        removed: [],
        added: ModifierUtil.split(modifier)
      }, element, scheme);
    }

    static split(modifier) {
      if (typeof modifier !== 'string') {
        return [];
      }

      return modifier.trim().split(/ +/).filter(token => token !== '');
    }
  }

  return ModifierUtil;
})();
