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

  var module = angular.module('onsen');

  var registerer = {
    init: function() {
      var self = this;
    },

    addListener: function(fn) {
      if (this._deviceready) {
        window.document.addEventListener('backbutton', fn, false);
      } else {
        window.document.addEventListener('deviceready', function() {
          window.document.addEventListener('backbutton', fn, false);
        });
      }
    },

    removeListener: function(fn) {
      if (this._deviceready) {
        window.document.removeEventListener('backbutton', fn, false);
      } else {
        window.document.addEventListener('deviceready', function() {
          window.document.removeEventListener('backbutton', fn, false);
        });
      }
    }
  };

  window.document.addEventListener('deviceready', function() {
    registerer._deviceready = true;
  }, false);

  /**
   * 'backbutton' event handler manager.
   */
  module.factory('BackButtonHandlerStack', function() {

    var BackButtonHandlerStack = Class.extend({

      _stack: undefined,

      _enabled: true,

      init: function() {
        this._stack = [];

        this._listener = function() {
          return this._getTopAvailableListener().apply(null, arguments);
        }.bind(this);

        this.enable();
      },

      _refreshListener: function() {
        if (this._enabled && this._getTopAvailableListener()) {
          registerer.addListener(this._listener);
        } else {
          registerer.removeListener(this._listener);
        }
      },

      /**
       * @return {Object}
       */
      _createStackObject: function(listener) {
        var self = this;

        return {
          _enabled: true,
          listener: listener,
          setEnabled: function(enabled) {
            this._enabled = enabled;
            self._refreshListener();
          },
          remove: function() {
            self.remove(this.listener);
          }
        };
      },

      /**
       * @return {Function}
       */
      _getTopAvailableListener: function() {
        var object = this._stack.filter(function(stackObject) {
          return stackObject._enabled;
        }).reverse()[0];

        return object ? object.listener : undefined;
      },

      /**
       * Enabled "backbutton" event listeners on this stack.
       */
      enable: function() {
        if (!this._enabled) {
          this._enabled = true;
          this._refreshListener();
        }
      },

      /**
       * Disabled "backbutton" event listeners on this stack.
       */
      disable: function() {
        if (this._enabled) {
          this._enabled = false;
          this._refreshListener();
        }
      },

      /**
       * @param {Function} listener
       * @reutrn {Object} handler object
       */
      push: function(listener) {
        var handler = this._createStackObject(listener);

        this._stack.push(handler);
        this._refreshListener();

        return handler;
      },

      /**
       * @param {Function/Object} listener Event listener function or handler object
       */
      remove: function(listener) {
        if (!(listener instanceof Function)) {
          throw new Error('"listener" argument must be an instance of Function.');
        }

        var index = this._stack.map(function(handler) {
          return handler.listener;
        }).indexOf(listener);

        if (index !== -1) {
          this._stack.splice(index, 1);
        }
        this._refreshListener();
      }
    });

    return new BackButtonHandlerStack();
  });
})();
