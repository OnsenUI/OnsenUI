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


  var util = {
    _ready: false,

    _domContentLoaded: false,

    _onDOMContentLoaded: () => {
      util._domContentLoaded = true;

      if (ons.isWebView()) {
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

  var HandlerRepository = {
    _store: {},

    _genId: function() {
      var i = 0;
      return function() {
        return i++;
      };
    },

    set: function(element, handler) {
      if (element.dataset.deviceBackButtonHandlerId) {
        this.remove(element);
      }
      var id = element.dataset.deviceBackButtonHandlerId = HandlerRepository._genId();
      this._store[id] = handler;
    },

    remove: function(element) {
      if (element.dataset.deviceBackButtonHandlerId) {
        delete this._store[element.dataset.deviceBackButtonHandlerId];
        delete element.dataset.deviceBackButtonHandlerId;
      }
    },

    get: function(element) {
      var id = element.dataset.deviceBackButtonHandlerId;

      if (!this._store[id]) {
        throw new Error();
      }

      return this._store[id];
    },

    has: function(element) {
      var id = element.dataset.deviceBackButtonHandlerId;

      return !!this._store[id];
    }
  };

  class DevicebackButtonDispatcher {
    constructor() {
      this._isEnabled = false;
      this._bindedCallback = this._callback.bind(this);
    }


    /**
     * Enable to handle 'backbutton' events.
     */
    enable() {
      if (!this._isEnabled) {
        util.addBackButtonListener(this._bindedCallback);
        this._isEnabled = true;
      }
    }

    /**
     * Disable to handle 'backbutton' events.
     */
    disable() {
      if (this._isEnabled) {
        util.removeBackButtonListener(this._bindedCallback);
        this._isEnabled = false;
      }
    }

    /**
     * Fire a 'backbutton' event manually.
     */
    fireDeviceBackButtonEvent() {
      var event = document.createEvent('Event');
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

      var handler = {
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

    /**
     * @param {Object} event
     */
    _dispatchDeviceBackButtonEvent(event) {
      var tree = this._captureTree();
      //this._dumpTree(tree);

      var element = this._findHandlerLeafElement(tree);
      //this._dumpParents(element);

      var handler = HandlerRepository.get(element);
      handler._callback(createEvent(element));

      function createEvent(element) {
        return {
          _element: element,
          callParentHandler: function() {
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

    _dumpParents(element) {
      while (element) {
        console.log(element.nodeName.toLowerCase() + '.' + element.getAttribute('class'));
        element = element.parentNode;
      }
    }

    /**
     * @return {Object}
     */
    _captureTree() {
      return createTree(document.body);

      function createTree(element) {
        return {
          element: element,
          children: Array.prototype.concat.apply([], arrayOf(element.children).map(function(childElement) {

            if (childElement.style.display === 'none') {
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
      }

      function arrayOf(target) {
        var result = [];
        for (var i = 0; i < target.length; i++) {
          result.push(target[i]);
        }
        return result;
      }
    }

    _dumpTree(node) {
      _dump(node, 0);

      function _dump(node, level) {
        var pad = new Array(level + 1).join('  ');
        console.log(pad + node.element.nodeName.toLowerCase());
        node.children.forEach(function(node) {
          _dump(node, level + 1);
        });
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

          var leftZ = parseInt(window.getComputedStyle(left, '').zIndex, 10);
          var rightZ = parseInt(window.getComputedStyle(right, '').zIndex, 10);

          if (!isNaN(leftZ) && !isNaN(rightZ)) {
            return leftZ > rightZ ? left : right;
          }

          throw new Error('Capturing backbutton-handler is failure.');
        }, null);
      }
    }
  }

  ons._deviceBackButtonDispatcher = new DevicebackButtonDispatcher();

  window.addEventListener('DOMContentLoaded', function() {
    ons._deviceBackButtonDispatcher.enable();
  });

})(window.ons = window.ons || {});
