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

  var util = ons._util = ons._util || {};

  /**
   * @param {HTMLElement} element 
   * @param {String} query dot class name or node name.
   * @return {HTMLElement}
   */
  util.findChild = (element, query) => {
    var match = query.substr(0, 1) === '.' ?
      (node) => node.classList.contains(query.substr(1)) :
      (node) => node.nodeName.toLowerCase() === query;

    var node;
    for (var i = 0; i < element.children.length; i++) {
      node = element.children[i];
      if (match(node)) {
        return node;
      }
    }
    return null;
  };

})(window.ons = window.ons || {});
