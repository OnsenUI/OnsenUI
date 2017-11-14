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

import platform from '../platform';

var util = {
  _ready: false,

  _domContentLoaded: false,

  _onDOMContentLoaded: function _onDOMContentLoaded() {
    util._domContentLoaded = true;

    if (platform.isWebView()) {
      window.document.addEventListener('deviceready', function () {
        util._ready = true;
      }, false);
    } else {
      util._ready = true;
    }
  },

  addBackButtonListener: function addBackButtonListener(fn) {
    if (!this._domContentLoaded) {
      throw new Error('This method is available after DOMContentLoaded');
    }

    if (this._ready) {
      window.document.addEventListener('backbutton', fn, false);
    } else {
      window.document.addEventListener('deviceready', function () {
        window.document.addEventListener('backbutton', fn, false);
      });
    }
  },

  removeBackButtonListener: function removeBackButtonListener(fn) {
    if (!this._domContentLoaded) {
      throw new Error('This method is available after DOMContentLoaded');
    }

    if (this._ready) {
      window.document.removeEventListener('backbutton', fn, false);
    } else {
      window.document.addEventListener('deviceready', function () {
        window.document.removeEventListener('backbutton', fn, false);
      });
    }
  }
};
window.addEventListener('DOMContentLoaded', function () {
  return util._onDOMContentLoaded();
}, false);

var HandlerRepository = {
  _store: {},

  _genId: function () {
    var i = 0;
    return function () {
      return i++;
    };
  }(),

  set: function set(element, handler) {
    if (element.dataset.deviceBackButtonHandlerId) {
      this.remove(element);
    }
    var id = element.dataset.deviceBackButtonHandlerId = HandlerRepository._genId();
    this._store[id] = handler;
  },

  remove: function remove(element) {
    if (element.dataset.deviceBackButtonHandlerId) {
      delete this._store[element.dataset.deviceBackButtonHandlerId];
      delete element.dataset.deviceBackButtonHandlerId;
    }
  },

  get: function get(element) {
    if (!element.dataset.deviceBackButtonHandlerId) {
      return undefined;
    }

    var id = element.dataset.deviceBackButtonHandlerId;

    if (!this._store[id]) {
      throw new Error();
    }

    return this._store[id];
  },

  has: function has(element) {
    if (!element.dataset) {
      return false;
    }

    var id = element.dataset.deviceBackButtonHandlerId;

    return !!this._store[id];
  }
};

var DeviceBackButtonDispatcher = function () {
  function DeviceBackButtonDispatcher() {
    _classCallCheck(this, DeviceBackButtonDispatcher);

    this._isEnabled = false;
    this._boundCallback = this._callback.bind(this);
  }

  /**
   * Enable to handle 'backbutton' events.
   */


  _createClass(DeviceBackButtonDispatcher, [{
    key: 'enable',
    value: function enable() {
      if (!this._isEnabled) {
        util.addBackButtonListener(this._boundCallback);
        this._isEnabled = true;
      }
    }

    /**
     * Disable to handle 'backbutton' events.
     */

  }, {
    key: 'disable',
    value: function disable() {
      if (this._isEnabled) {
        util.removeBackButtonListener(this._boundCallback);
        this._isEnabled = false;
      }
    }

    /**
     * Fire a 'backbutton' event manually.
     */

  }, {
    key: 'fireDeviceBackButtonEvent',
    value: function fireDeviceBackButtonEvent() {
      var event = document.createEvent('Event');
      event.initEvent('backbutton', true, true);
      document.dispatchEvent(event);
    }
  }, {
    key: '_callback',
    value: function _callback() {
      this._dispatchDeviceBackButtonEvent();
    }

    /**
     * @param {HTMLElement} element
     * @param {Function} callback
     */

  }, {
    key: 'createHandler',
    value: function createHandler(element, callback) {
      if (!(element instanceof HTMLElement)) {
        throw new Error('element must be an instance of HTMLElement');
      }

      if (!(callback instanceof Function)) {
        throw new Error('callback must be an instance of Function');
      }

      var handler = {
        _callback: callback,
        _element: element,

        disable: function disable() {
          HandlerRepository.remove(element);
        },

        setListener: function setListener(callback) {
          this._callback = callback;
        },

        enable: function enable() {
          HandlerRepository.set(element, this);
        },

        isEnabled: function isEnabled() {
          return HandlerRepository.get(element) === this;
        },

        destroy: function destroy() {
          HandlerRepository.remove(element);
          this._callback = this._element = null;
        }
      };

      handler.enable();

      return handler;
    }
  }, {
    key: '_dispatchDeviceBackButtonEvent',
    value: function _dispatchDeviceBackButtonEvent() {
      var tree = this._captureTree();

      var element = this._findHandlerLeafElement(tree);

      var handler = HandlerRepository.get(element);
      handler._callback(createEvent(element));

      function createEvent(element) {
        return {
          _element: element,
          callParentHandler: function callParentHandler() {
            var parent = this._element.parentNode;

            while (parent) {
              handler = HandlerRepository.get(parent);
              if (handler) {
                return handler._callback(createEvent(parent));
              }
              parent = parent.parentNode;
            }
          }
        };
      }
    }

    /**
     * @return {Object}
     */

  }, {
    key: '_captureTree',
    value: function _captureTree() {
      return createTree(document.body);

      function createTree(element) {
        var tree = {
          element: element,
          children: Array.prototype.concat.apply([], arrayOf(element.children).map(function (childElement) {

            if (childElement.style.display === 'none' || childElement._isShown === false) {
              return [];
            }

            if (childElement.children.length === 0 && !HandlerRepository.has(childElement)) {
              return [];
            }

            var result = createTree(childElement);

            if (result.children.length === 0 && !HandlerRepository.has(result.element)) {
              return [];
            }

            return [result];
          }))
        };

        if (!HandlerRepository.has(tree.element)) {
          for (var i = 0; i < tree.children.length; i++) {
            var subTree = tree.children[i];
            if (HandlerRepository.has(subTree.element)) {
              return subTree;
            }
          }
        }

        return tree;
      }

      function arrayOf(target) {
        var result = [];
        for (var i = 0; i < target.length; i++) {
          result.push(target[i]);
        }
        return result;
      }
    }

    /**
     * @param {Object} tree
     * @return {HTMLElement}
     */

  }, {
    key: '_findHandlerLeafElement',
    value: function _findHandlerLeafElement(tree) {
      return find(tree);

      function find(node) {
        if (node.children.length === 0) {
          return node.element;
        }

        if (node.children.length === 1) {
          return find(node.children[0]);
        }

        return node.children.map(function (childNode) {
          return childNode.element;
        }).reduce(function (left, right) {
          if (!left) {
            return right;
          }

          var leftZ = parseInt(window.getComputedStyle(left, '').zIndex, 10);
          var rightZ = parseInt(window.getComputedStyle(right, '').zIndex, 10);

          if (!isNaN(leftZ) && !isNaN(rightZ)) {
            return leftZ > rightZ ? left : right;
          }

          throw new Error('Capturing backbutton-handler is failure.');
        }, null);
      }
    }
  }]);

  return DeviceBackButtonDispatcher;
}();

export default new DeviceBackButtonDispatcher();