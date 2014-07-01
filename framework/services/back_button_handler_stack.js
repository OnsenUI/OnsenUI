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

  /**
   * 'backbutton' event handler manager.
   */
  module.factory('BackButtonHandlerStack', function() {

    var BackButtonHandlerStack = Class.extend({

      _stack: undefined,

      _enabled: true,

      init: function() {
        this._stack = [];
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
            self._refreshHandler();
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
        this._enabled = true;
        this._refreshHandler();
      },

      /**
       * Disabled "backbutton" event listeners on this stack.
       */
      disable: function() {
        this._enabled = false;
        this._refreshHandler();
      },

      /**
       * @param {Function} listener
       * @reutrn {Object} handler object
       */
      push: function(listener) {
        var handler = this._createStackObject(listener);

        this._stack.push(handler);
        this._refreshHandler();

        return handler;
      },

      /**
       * @param {Function} listener
       */
      _registerBackButtonEventListener: function(listener) {
        var doc = window.document;
        doc.addEventListener('backbutton', listener, false); 

        // register again because registering "backbutton" event handler is available only after 'deviceready' fire.
        doc.addEventListener('deviceready', function() {
          doc.removeEventListener('backbutton', listener, false);
          doc.addEventListener('backbutton', listener, false);
        }, false);
      },

      _clearAllHandlers: function() {
        this._stack.forEach(function(handler) {
          window.document.removeEventListener('backbutton', handler.listener, false);
        });
      },

      _refreshHandler: function() {
        this._clearAllHandlers();

        if (this._enabled) {
          var listener = this._getTopAvailableListener();

          if (listener) {
            this._registerBackButtonEventListener(listener);
          }
        }
      },

      /**
       * @param {Function/Object} listener Event listener function or handler object
       */
      remove: function(listener) {
        if (!(listener instanceof Function)) {
          throw new Error('"handler" argument must be an instance of Function.');
        }

        var index = this._stack.map(function(handler) {
          return handler.listener;
        }).indexOf(listener);

        window.document.removeEventListener('backbutton', listener, false);

        if (index !== -1) {
          this._stack.splice(index, 1);
        }

        this._refreshHandler();
      }
    });

    return new BackButtonHandlerStack();
  });
})();
