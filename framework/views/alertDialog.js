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

      /**
       * @param {Object} scope
       * @param {jqLite} element
       */
      init: function(scope, element, attrs) {
        this._scope = scope;
        this._element = element;

        this._scope.$on('$destroy', this._destroy.bind(this));

        this._overlayColor = 'rgba(0, 0, 0, 0.2)';

        this._cancelable = attrs.cancelable ? !!attrs.cancelable : false;
        this._disabled = false;
        this._visible = false;

        this._createOverlay();

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
        this._overlay.css("display", "block");
        
        this._visible = true;
      },

      /**
       * Hide alert dialog.
       */
      hide: function() {
        this._element.css("display", "none");
        this._overlay.css("display", "none");

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
          throw new Error('Argument must be a boolean.');
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

      /**
       * Make alert dialog cancelable or uncancelable. 
       *
       * @param {Boolean}
       */
      setCancelable: function(cancelable) {
        if (typeof cancelable !== 'boolean') {
          throw new Error('Argument must be a boolean.'); 
        }  

        this._cancelable = cancelable;
      },

      isCancelable: function() {
        return this._cancelable;
      },

      _cancel: function() {
        if(this.isCancelable()) {
          this.hide();
        }
      },

      _destroy: function() {
        this.emit('destroy');
        this._element = this._scope = null;
      },

      _createOverlay: function() {
        this._overlay = angular.element('<div>').css({
          position: 'absolute',
          top: 0,
          left: 0,
          backgroundColor: this._overlayColor,
          width: "100%",
          height: "100%",
          zIndex: 20000,
          display: "none"
        });

        this._overlay.on('click', this._cancel.bind(this));

        angular.element(document.body).append(this._overlay);
      }
    });
    MicroEvent.mixin(AlertDialogView);

    return AlertDialogView;
  });
})();

