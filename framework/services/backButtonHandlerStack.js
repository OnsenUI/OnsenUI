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

  var util = {
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
    util._deviceready = true;
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
          return this.dispatchHandler.apply(this, arguments);
        }.bind(this);

        util.addListener(this._listener);
      },

      /**
       * Call handler's listener on backbutton event.
       */
      dispatchHandler: function(event) {
        var availableListeners = this._stack.filter(function(handler) {
          return handler._enabled;
        }).map(function(handler) {
          return handler.listener;
        });

        event.preventDefault();

        availableListeners.reverse();

        for (var i = 0; i < availableListeners.length; i++) {
          try {
            if (availableListeners[i].apply(null, arguments)) {
              return;
            }
          } catch (e) {
            console.log(e);
          }
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
          },
          enable: function() {
            this.setEnabled(true);
          },
          disable: function() {
            this.setEnabled(false);
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
          util.addListener(this._listener);
        }
      },

      /**
       * Disabled "backbutton" event listeners on this stack.
       */
      disable: function() {
        if (this._enabled) {
          this._enabled = false;
          util.removeListener(this._listener);
        }
      },

      /**
       * @return {Boolean}
       */
      getEnabled: function() {
        return this._enabled;
      },

      /**
       * @param {Boolean} enabled
       */
      setEnabled: function(enabled) {
        if (enabled) {
          this.enable();
        } else {
          this.disable();
        }
      },

      /**
       * @param {Function/Object} listener Callback on back button. If this callback returns true, dispatching is stopped.
       * @reutrn {Object} handler object
       */
      push: function(listener) {
        var handler = listener instanceof Function ? this._createStackObject(listener) : listener;

        this.remove(handler.listener);
        this._stack.push(handler);

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
      }
    });

    return BackButtonHandlerStack;
  });
})();
