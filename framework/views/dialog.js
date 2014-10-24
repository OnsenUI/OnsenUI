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
  'use strict';

  var module = angular.module('onsen');

  module.factory('DialogView', function($onsen, DialogAnimator, IOSDialogAnimator, AndroidDialogAnimator, SlideDialogAnimator
  ) {

    var DialogView = Class.extend({

      /**
       * @param {Object} scope
       * @param {jqLite} element
       * @param {Object} attrs
       */
      init: function(scope, element, attrs) {
        this._scope = scope;
        this._element = element;

        this._element.css('display', 'none');

        this._dialog = angular.element(element[0].querySelector('.dialog'));
        this._mask = angular.element(element[0].querySelector('.dialog-mask'));

        this._dialog.css('z-index', 20001);
        this._mask.css('z-index', 20000);

        this._mask.on('click', this._cancel.bind(this));

        this._visible = false;
        this._doorLock = new DoorLock();

        this._animation = DialogView._animatorDict[typeof attrs.animation !== 'undefined' ? 
          attrs.animation : 'default'];

        if (!this._animation) {
          throw new Error('No such animation: ' + attrs.animation);
        }

        this._deviceBackButtonHandler = $onsen.DeviceBackButtonHandler.create(this._element, this._onDeviceBackButton.bind(this));
      },

      /**
       * Show dialog.
       *
       * @param {Object} [options]
       * @param {String} [options.animation] animation type
       * @param {Function} [options.callback] callback after dialog is shown
       */
      show: function(options) {
        options = options || {};
        var cancel = false,
          callback = options.callback || function() {};

        this.emit('preshow', {
          dialog: this,
          cancel: function() { cancel = true; }
        });
        
        if (!cancel) {
          this._doorLock.waitUnlock(function() {
            var unlock = this._doorLock.lock(),
              animation = this._animation;

            this._element.css('display', 'block');
            this._mask.css('opacity', 1);

            if (options.animation) {
              animation = DialogView._animatorDict[options.animation];
            }
            
            animation.show(this, function() {
              this._visible = true;
              unlock();
              this.emit('postshow', {dialog: this});
              callback();
            }.bind(this));
          }.bind(this));
        }
      },

      /**
       * Hide dialog.
       *
       * @param {Object} [options]
       * @param {String} [options.animation] animation type
       * @param {Function} [options.callback] callback after dialog is hidden
       */
      hide: function(options) {
        options = options || {};
        var cancel = false,
          callback = options.callback || function() {};
        
        this.emit('prehide', {
          dialog: this,
          cancel: function() { cancel = true; }
        });

        if (!cancel) {
          this._doorLock.waitUnlock(function() {
            var unlock = this._doorLock.lock(),
              animation = this._animation;

            if (options.animation) {
              animation = DialogView._animatorDict[options.animation];
            }

            animation.hide(this, function() {
              this._element.css('display', 'none');
              this._visible = false;
              unlock();
              this.emit('posthide', {dialog: this});
              callback();
            }.bind(this));
          }.bind(this));
        }
      },

      /**
       * True if dialog is visible.
       *
       * @return {Boolean}
       */
      isShown: function() {
        return this._visible;
      },

      /**
       * Destroy dialog.
       */
      destroy: function() {
        this._element.remove();
        this._deviceBackButtonHandler.destroy();

        this._scope.$destroy();

        this._deviceBackButtonHandler = this._element = this._dialog = this._mask = null;
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

        if (disabled) {
          this._element.attr('disabled', true);
        } else {
          this._element.removeAttr('disabled');
        }
      },

      /**
       * True if alert dialog is disabled.
       *
       * @return {Boolean}
       */
      isDisabled: function() {
        return this._element[0].hasAttribute('disabled');
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

        if (cancelable) {
          this._element.attr('cancelable', true);
        } else {
          this._element.removeAttr('cancelable');
        }
      },

      /**
       * True if the dialog is cancelable.
       *
       * @return {Boolean}
       */
      isCancelable: function() {
        return this._element[0].hasAttribute('cancelable');
      },

      _cancel: function() {
        if (this.isCancelable()) {
          this.hide({
            callback: function () {
              this.emit('cancel');
            }.bind(this)
          });
        }
      },

      _onDeviceBackButton: function(event) {
        if (this.isCancelable()) {
          this._cancel.bind(this)();
        } else {
          event.callParentHandler();
        }
      }
    });

    DialogView._animatorDict = {
      'default': $onsen.isAndroid() ? new AndroidDialogAnimator() : new IOSDialogAnimator(),
      'fade': $onsen.isAndroid() ? new AndroidDialogAnimator() : new IOSDialogAnimator(),
      'slide': new SlideDialogAnimator(),
      'none': new DialogAnimator()
    };

    /**
     * @param {String} name
     * @param {DialogAnimator} animator
     */
    DialogView.registerAnimator = function(name, animator) {
      if (!(animator instanceof DialogAnimator)) {
        throw new Error('"animator" param must be an instance of DialogAnimator');
      }
      this._animatorDict[name] = animator;
    };

    MicroEvent.mixin(DialogView);

    return DialogView;
  });
})();

