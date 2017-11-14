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

import util from './util';

/**
 * @object ons.modifier
 * @category visual
 * @description
 *   [en]
 *     Utility methods to change modifier attributes of Onsen UI elements..
 *   [/en]
 *   [ja][/ja]
 * @example
 * ons.modifier.add(myOnsInputElement, 'underbar');
 * ons.modifier.toggle(myOnsToastElement, 'custom-modifier');
 *
 */
export default {
  /**
   * @method add
   * @signature add(element, modifier [, modifier])
   * @description
   *   [en]Add the specified modifiers to the element if they are not already included.[/en]
   *   [ja][/ja]
   * @param {HTMLElement} element
   *   [en]Target element.[/en]
   *   [ja][/ja]
   * @param {String} modifier
   *   [en]Name of the modifier.[/en]
   *   [ja][/ja]
   */
  add: function add(element) {
    for (var _len = arguments.length, modifiers = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      modifiers[_key - 1] = arguments[_key];
    }

    return modifiers.forEach(function (modifier) {
      return util.addModifier(element, modifier);
    });
  },
  /**
   * @method remove
   * @signature remove(element, modifier [, modifier])
   * @description
   *   [en]Remove the specified modifiers from the element if they are included.[/en]
   *   [ja][/ja]
   * @param {HTMLElement} element
   *   [en]Target element.[/en]
   *   [ja][/ja]
   * @param {String} modifier
   *   [en]Name of the modifier.[/en]
   *   [ja][/ja]
   */
  remove: function remove(element) {
    for (var _len2 = arguments.length, modifiers = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      modifiers[_key2 - 1] = arguments[_key2];
    }

    return modifiers.forEach(function (modifier) {
      return util.removeModifier(element, modifier);
    });
  },
  /**
   * @method contains
   * @signature contains(element, modifier)
   * @description
   *   [en]Check whether the specified modifier is included in the element.[/en]
   *   [ja][/ja]
   * @param {HTMLElement} element
   *   [en]Target element.[/en]
   *   [ja][/ja]
   * @param {String} modifier
   *   [en]Name of the modifier.[/en]
   *   [ja][/ja]
   * @return {Boolean}
   *   [en]`true` when the specified modifier is found in the element's `modifier` attribute. `false` otherwise.[/en]
   *   [ja][/ja]
   */
  contains: util.hasModifier,
  /**
   * @method toggle
   * @signature toggle(element, modifier [, force])
   * @description
   *   [en]Toggle the specified modifier.[/en]
   *   [ja][/ja]
   * @param {HTMLElement} element
   *   [en]Target element.[/en]
   *   [ja][/ja]
   * @param {String} modifier
   *   [en]Name of the modifier.[/en]
   *   [ja][/ja]
   * @param {String} force
   *   [en]If it evaluates to true, add specified modifier value, and if it evaluates to false, remove it.[/en]
   *   [ja][/ja]
   */
  toggle: util.toggleModifier
};