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

  module.factory('AlertDialogView', function($onsen, DialogAnimator, SlideDialogAnimator) {

    var AlertDialogView = Class.extend({

      /**
       * @param {Object} scope
       * @param {jqLite} element
       */
      init: function(scope, element) {
        this._scope = scope;
        this._element = element;

        this._scope.$on('$destroy', this._destroy.bind(this));

        console.log("dis", scope.disabled);

        this._cancelable = typeof scope.cancelable !== 'undefined' ? true : false;
        this._animation = this._animations[typeof scope.animation !== 'undefined' ? 
          scope.animation : 'default'];
        this.setDisabled(typeof scope.disabled !== "undefined");

        if (!this._animation) {
          throw new Error('No such animation: ' + scope.animation);
        }

        this._disabled = false;
        this._visible = false;

        this._createMask(scope.maskColor);
      },

      getDeviceBackButtonHandler: function() {
        return this._deviceBackButtonHandler;
      },

      /**
       * Show alert dialog.
       */
      show: function() {
        this._mask.css('display', 'block');
        this._element.css('display', 'block');

        var that = this;
        this._animation.show(this, function() {
          that._visible = true;
        });
      },

      /**
       * Hide alert dialog.
       */
      hide: function() {
        var that = this;

        this._animation.hide(this, function() {
          that._element.css('display', 'none');
          that._mask.css('display', 'none');
          that._visible = false;
        });
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

        if(disabled) {
          this._element.css("opacity", 0.75);
        } else {
          this._element.css("opacity", 1);
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

      _createMask: function(color) {
        this._mask = angular.element('<div>').addClass('mask').css("z-index", 20000);

        this._mask.on('click', this._cancel.bind(this));
 
        if(color) {
          this._mask.css("background-color", color);
        }

        angular.element(document.body).append(this._mask);
      },

      _animations: {
        "default": new SlideDialogAnimator(),
        "none": new DialogAnimator()
      }
    });
    MicroEvent.mixin(AlertDialogView);

    return AlertDialogView;
  });
})();

