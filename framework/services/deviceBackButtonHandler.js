/*
Copyright 2013-2014 ASIAL CORPORATION

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

(function(){
  'use strict';

  var util = {
    init: function() {
      this.ready = false;
    },

    addBackButtonListener: function(fn) {
      if (this._ready) {
        window.document.addEventListener('backbutton', fn, false);
      } else {
        window.document.addEventListener('deviceready', function() {
          window.document.addEventListener('backbutton', fn, false);
        });
      }
    },

    removeBackButtonListener: function(fn) {
      if (this._ready) {
        window.document.removeEventListener('backbutton', fn, false);
      } else {
        window.document.addEventListener('deviceready', function() {
          window.document.removeEventListener('backbutton', fn, false);
        });
      }
    }
  };
  util.init();

  /**
   * Internal service class for framework implementation.
   */
  angular.module('onsen').service('DeviceBackButtonHandler', function() {

    this._init = function() {
      if (window.ons.isWebView()) {
        window.document.addEventListener('deviceready', function() {
          util._ready = true;
        }, false);
      } else {
        util._ready = true;
      }

      this._bindedCallback = this._callback.bind(this);

      this.enable();
    };

    this._isEnabled = false;

    /**
     * Enable to handle 'backbutton' events.
     */
    this.enable = function() {
      if (!this._isEnabled) {
        util.addBackButtonListener(this._bindedCallback);
        this._isEnabled = true;
      }
    };

    /**
     * Disable to handle 'backbutton' events.
     */
    this.disable = function() {
      if (this._isEnabled) {
        util.removeBackButtonListener(this._bindedCallback);
        this._isEnabled = false;
      }
    };

    /**
     * Fire a 'backbutton' event manually.
     */
    this.fireDeviceBackButtonEvent = function() {
      var event = document.createEvent('Event');
      event.initEvent('backbutton', true, true);
      document.dispatchEvent(event);
    };

    this._callback = function() {
      this._dispatchDeviceBackButtonEvent();
    };

    /**
     * @param {jqLite} element
     * @param {Function} callback
     */
    this.create = function(element, callback) {
      if (!(element instanceof angular.element().constructor)) {
        throw new Error('element must be an instance of jqLite');
      }

      if (!(callback instanceof Function)) {
        throw new Error('callback must be an instance of Function');
      }

      var handler = {
        _callback: callback,
        _element: element,

        disable: function() {
          this._element.data('device-backbutton-handler', null);
        },

        setListener: function(callback) {
          this._callback = callback;
        },

        enable: function() {
          this._element.data('device-backbutton-handler', this);
        },

        isEnabled: function() {
          return this._element.data('device-backbutton-handler') === this;
        },

        destroy: function() {
          this._element.data('device-backbutton-handler', null);
          this._callback = this._element = null;
        }
      };

      handler.enable();

      return handler;
    };

    /**
     * @param {Object} event
     */
    this._dispatchDeviceBackButtonEvent = function(event) {
      var tree = this._captureTree();
      var element = this._findHandlerLeafElement(tree);

      //this._dumpTree(tree);
      //this._dumpParents(element);

      var handler = element.data('device-backbutton-handler');
      handler._callback(createEvent(element));

      function createEvent(element) {
        return {
          _element: element,
          callParentHandler: function() {
            var parent = this._element.parent();
            var hander = null;

            while (parent[0]) {
              handler = parent.data('device-backbutton-handler');
              if (handler) {
                return handler._callback(createEvent(parent));
              }
              parent = parent.parent();
            }
          }
        };
      }
    };

    this._dumpParents = function(element) {
      while(element[0]) {
        console.log(element[0].nodeName.toLowerCase() + '.' + element.attr('class'));
        element = element.parent();
      }
    };

    /**
     * @return {Object}
     */
    this._captureTree = function() {
      return createTree(angular.element(document.body));

      function createTree(element) {
        return {
          element: element,
          children: Array.prototype.concat.apply([], Array.prototype.map.call(element.children(), function(child) {
            child = angular.element(child);

            if (child[0].style.display === 'none') {
              return [];
            }

            if (child.children().length === 0 && !child.data('device-backbutton-handler')) {
              return [];
            }

            var result = createTree(child);

            if (result.children.length === 0 && !child.data('device-backbutton-handler')) {
              return [];
            }

            return [result];
          }))
        };
      }
    };

    this._dumpTree = function(node) {
      _dump(node, 0);

      function _dump(node, level) {
        var pad = new Array(level + 1).join('  ');
        console.log(pad + node.element[0].nodeName.toLowerCase());
        node.children.forEach(function(node) {
          _dump(node, level + 1);
        });
      }
    };

    /**
     * @param {Object} tree
     * @return {jqLite}
     */
    this._findHandlerLeafElement = function(tree) {
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
          if (left === null) {
            return right;
          }

          var leftZ = parseInt(window.getComputedStyle(left[0], '').zIndex, 10);
          var rightZ = parseInt(window.getComputedStyle(right[0], '').zIndex, 10);

          if (!isNaN(leftZ) && !isNaN(rightZ)) {
            return leftZ > rightZ ? left : right;
          }

          throw new Error('Capturing backbutton-handler is failure.');
        }, null);
      }
    };

    this._init();
  });

})();
