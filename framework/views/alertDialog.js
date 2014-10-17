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

(function() {
  'use strict;';

  var module = angular.module('onsen');

  module.factory('AlertDialogView', function($onsen) {

    var AlertDialogView = Class.extend({
      _element: undefined,
      _scope: undefined,

      /**
       * @param {Object} scope
       * @param {jqLite} element
       */
      init: function(scope, element) {
        this._scope = scope;
        this._element = element;

        this._scope.$on('$destroy', this._destroy.bind(this));

        this._disabled = false;
        this._visible = false;

        this.hide();
      },

      getDeviceBackButtonHandler: function() {
        return this._deviceBackButtonHandler;
      },

      /**
       * Show alert dialog.
       */
      show: function() {
        this._element.css("display", "block");
        this._visible = true;
      },

      /**
       * Hide alert dialog.
       */
      hide: function() {
        this._element.css("display", "none");
        this._visible = false;
      },

      /**
       * True if alert dialog is visible.
       *
       * @return {Boolean}
       */
      isShown: function() {
        return this._visible;
      },

      /**
       * Destroy alert dialog.
       */
      destroy: function() {
        // Destroy everything!!!
      },

      /**
       * Disable or enable alert dialog.
       *
       * @param {Boolean} 
       */
      setDisabled: function(disabled) {
        if (typeof disabled !== 'boolean') {
          throw Error('Argument must be a boolean.');
        }

        this._disabled = disabled;
      },

      /**
       * True if alert dialog is disabled.
       *
       * @return {Boolean}
       */
      isDisabled: function() {
        return this._disabled;
      },

      _destroy: function() {
        this.emit('destroy');
        this._element = this._scope = null;
      }
    });
    MicroEvent.mixin(AlertDialogView);

    return AlertDialogView;
  });
})();

