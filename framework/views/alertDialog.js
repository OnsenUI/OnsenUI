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
      init: function(scope, element, attrs) {
        this._scope = scope;
        this._element = element;
        this._element.css('display', 'none');
        this._visible = false;
        this._locked = false;

        this.setCancelable(typeof attrs.cancelable !== 'undefined');
        this.setDisabled(typeof attrs.disable !== 'undefined');
        
        this._animation = this._animations[typeof attrs.animation !== 'undefined' ? 
          attrs.animation : 'default'];

        if (!this._animation) {
          throw new Error('No such animation: ' + attrs.animation);
        }

        this._createMask(attrs.maskColor);
      },

      getDeviceBackButtonHandler: function() {
        return this._deviceBackButtonHandler;
      },

      /**
       * Show alert dialog.
       *
       * @param {Object} options
       */
      show: function(options) {
        options = options || {};
        var cancel = false,
          callback = options.callback || function() {};

        this.emit('preshow', {
          alertDialog: this,
          cancel: function() { cancel = true; }
        });
        
        if(!this._locked && !cancel) {
          this._locked = true;
          this._mask.css('display', 'block');
          this._element.css('display', 'block');

          var that = this,
            animation = this._animation;
          
          if (options.animation) {
            animation = this._animations[options.animation];
          }
          
          animation.show(this, function() {
            that._visible = true;
            that._locked = false;
            that.emit('postshow', {alertDialog: that});
            callback();
          });
        }
      },

      /**
       * Hide alert dialog.
       *
       * @param {Object} options
       */
      hide: function(options) {
        options = options || {};
        var cancel = false,
          callback = options.callback || function() {};
        
        this.emit('prehide', {
          alertDialog: this,
          cancel: function() { cancel = true; }
        });

        if(!this._locked && !cancel) {
          this._locked = true;
          var that = this,
            animation = this._animation;

          if (options.animation) {
            animation = this._animations[options.animation];
          }

          animation.hide(this, function() {
            that._element.css('display', 'none');
            that._mask.css('display', 'none');
            that._visible = false;
            that._locked = false;
            that.emit('posthide', {alertDialog: that});
            callback();
          });
        }
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
        this._element.remove();
        this._mask.remove()

        this._scope.$destroy();

        this._animations = this._element = this._mask = null;
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

        var elements = this._element[0].querySelectorAll('input, button, textarea, select') || [];

        if(disabled) {
          this._element.css('opacity', 0.75);
         
          for (var i=0; i<elements.length; i++) {
            angular.element(elements[i]).prop('disabled', true);
          }
        } else {
          this._element.css('opacity', 1);
        
          for (var i=0; i<elements.length; i++) {
            angular.element(elements[i]).removeAttr('disabled');
          }
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
          var that = this;
          this.hide({
            callback: function () {
              that.emit('cancel');
            }
          });
        }
      },

      _createMask: function(color) {
        this._mask = angular.element('<div>').addClass('mask').css({
          zIndex: 20000,
          display: 'none'
        });

        this._mask.on('click', this._cancel.bind(this));
 
        if(color) {
          this._mask.css('background-color', color);
        }

        angular.element(document.body).append(this._mask);
      },

      _animations: {
        'default': new SlideDialogAnimator(),
        'none': new DialogAnimator()
      }
    });
    MicroEvent.mixin(AlertDialogView);

    return AlertDialogView;
  });
})();

