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

import platform from './platform';


const util = {
  _ready: false,

  _domContentLoaded: false,

  _onDOMContentLoaded: () => {
    util._domContentLoaded = true;

    if (platform.isWebView()) {
      window.document.addEventListener('deviceready', () => {
        util._ready = true;
      }, false);
    } else {
      util._ready = true;
    }
  },

  addBackButtonListener: function(fn) {
    if (!this._domContentLoaded) {
      throw new Error('This method is available after DOMContentLoaded');
    }

    if (this._ready) {
      window.document.addEventListener('backbutton', fn, false);
    } else {
      window.document.addEventListener('deviceready', function() {
        window.document.addEventListener('backbutton', fn, false);
      });
    }
  },

  removeBackButtonListener: function(fn) {
    if (!this._domContentLoaded) {
      throw new Error('This method is available after DOMContentLoaded');
    }

    if (this._ready) {
      window.document.removeEventListener('backbutton', fn, false);
    } else {
      window.document.addEventListener('deviceready', function() {
        window.document.removeEventListener('backbutton', fn, false);
      });
    }
  }
};
window.addEventListener('DOMContentLoaded', () => util._onDOMContentLoaded(), false);

const HandlerRepository = {
  _store: {},

  _genId: (() => {
    let i = 0;
    return () => i++;
  })(),

  set: function(element, handler) {
    if (element.dataset.deviceBackButtonHandlerId) {
      this.remove(element);
    }
    const id = element.dataset.deviceBackButtonHandlerId = HandlerRepository._genId();
    this._store[id] = handler;
  },

  remove: function(element) {
    if (element.dataset.deviceBackButtonHandlerId) {
      delete this._store[element.dataset.deviceBackButtonHandlerId];
      delete element.dataset.deviceBackButtonHandlerId;
    }
  },

  get: function(element) {
    if (!element.dataset.deviceBackButtonHandlerId) {
      return undefined;
    }

    const id = element.dataset.deviceBackButtonHandlerId;

    if (!this._store[id]) {
      throw new Error();
    }

    return this._store[id];
  },

  has: function(element) {
    if (!element.dataset) {
      return false;
    }

    const id = element.dataset.deviceBackButtonHandlerId;

    return !!this._store[id];
  }
};

class DeviceBackButtonDispatcher {
  constructor() {
    this._isEnabled = false;
    this._boundCallback = this._callback.bind(this);
  }


  /**
   * Enable to handle 'backbutton' events.
   */
  enable() {
    if (!this._isEnabled) {
      util.addBackButtonListener(this._boundCallback);
      this._isEnabled = true;
    }
  }

  /**
   * Disable to handle 'backbutton' events.
   */
  disable() {
    if (this._isEnabled) {
      util.removeBackButtonListener(this._boundCallback);
      this._isEnabled = false;
    }
  }

  /**
   * Fire a 'backbutton' event manually.
   */
  fireDeviceBackButtonEvent() {
    const event = document.createEvent('Event');
    event.initEvent('backbutton', true, true);
    document.dispatchEvent(event);
  }

  _callback() {
    this._dispatchDeviceBackButtonEvent();
  }

  /**
   * @param {HTMLElement} element
   * @param {Function} callback
   */
  createHandler(element, callback) {
    if (!(element instanceof HTMLElement)) {
      throw new Error('element must be an instance of HTMLElement');
    }

    if (!(callback instanceof Function)) {
      throw new Error('callback must be an instance of Function');
    }

    const handler = {
      _callback: callback,
      _element: element,

      disable: function() {
        HandlerRepository.remove(element);
      },

      setListener: function(callback) {
        this._callback = callback;
      },

      enable: function() {
        HandlerRepository.set(element, this);
      },

      isEnabled: function() {
        return HandlerRepository.get(element) === this;
      },

      destroy: function() {
        HandlerRepository.remove(element);
        this._callback = this._element = null;
      }
    };

    handler.enable();

    return handler;
  }

  _dispatchDeviceBackButtonEvent() {
    const tree = this._captureTree();

    const element = this._findHandlerLeafElement(tree);

    let handler = HandlerRepository.get(element);
    handler._callback(createEvent(element));

    function createEvent(element) {
      return {
        _element: element,
        callParentHandler: function() {
          let parent = this._element.parentNode;

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
  _captureTree() {
    return createTree(document.body);

    function createTree(element) {
      const tree = {
        element: element,
        children: Array.prototype.concat.apply([], arrayOf(element.children).map(function(childElement) {

          if (childElement.style.display === 'none') {
            return [];
          }

          if (childElement.children.length === 0 && !HandlerRepository.has(childElement)) {
            return [];
          }

          const result = createTree(childElement);

          if (result.children.length === 0 && !HandlerRepository.has(result.element)) {
            return [];
          }

          return [result];
        }))
      };

      if (!HandlerRepository.has(tree.element)) {
        for (let i = 0; i < tree.children.length; i++){
          const subTree = tree.children[i];
          if (HandlerRepository.has(subTree.element)) {
            return subTree;
          }
        }
      }

      return tree;
    }

    function arrayOf(target) {
      const result = [];
      for (let i = 0; i < target.length; i++) {
        result.push(target[i]);
      }
      return result;
    }
  }

  /**
   * @param {Object} tree
   * @return {HTMLElement}
   */
  _findHandlerLeafElement(tree) {
    return find(tree);

    function find(node) {
      if (node.children.length === 0) {
        return node.element;
      }

      if (node.children.length === 1) {
        return find(node.children[0]);
      }

      return node.children.map(function(childNode) {
        return childNode.element;
      }).reduce(function(left, right) {
        if (!left) {
          return right;
        }

        const leftZ = parseInt(window.getComputedStyle(left, '').zIndex, 10);
        const rightZ = parseInt(window.getComputedStyle(right, '').zIndex, 10);

        if (!isNaN(leftZ) && !isNaN(rightZ)) {
          return leftZ > rightZ ? left : right;
        }

        throw new Error('Capturing backbutton-handler is failure.');
      }, null);
    }
  }
}

export default new DeviceBackButtonDispatcher();
