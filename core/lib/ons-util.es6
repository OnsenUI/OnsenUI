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

  /*
   * @param {Object} dst Destination object.
   * @param {...Object} src Source object(s).
   * @returns {Object} Reference to `dst`.
   */
  util.extend = (dst, ...args) => {
    for (var i = 0; i < args.length; i++) {
      if (args[i]) {
        var keys = Object.keys(args[i]);
        for (var j = 0; j < keys.length; j++) {
          var key = keys[j];
          dst[key] = args[i][key];
        }
      }
    }

    return dst;
  };

  /*
   * @param {HTMLElement} element.
   * @param {String} event name.
   */
  util.fireEvent = (element, eventName) => {
    var event = document.createEvent('Event');
    event.initEvent(eventName, true, true);
    element.dispatchEvent(event);
  };

})(window.ons = window.ons || {});
