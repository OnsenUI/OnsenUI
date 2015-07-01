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

(function() {
  'use strict';

  var module = angular.module('onsen');

  module.factory('AlertDialogView', function($parse, $onsen, AnimationChooser, DialogAnimator, SlideDialogAnimator, AndroidAlertDialogAnimator, IOSAlertDialogAnimator) {

    var AlertDialogView = Class.extend({

      /**
       * @param {Object} scope
       * @param {jqLite} element
       * @param {Object} attrs
       */
      init: function(scope, element, attrs) {
        this._scope = scope;
        this._element = element;
        this._attrs = attrs;

        this._element.css({
          display: 'none',
          zIndex: 20001
        });

        this._dialog = element;
        this._visible = false;
        this._doorLock = new DoorLock();

        this._animationChooser = new AnimationChooser({
          animators: AlertDialogView._animatorDict,
          baseClass: DialogAnimator,
          baseClassName: 'DialogAnimator',
          defaultAnimation: attrs.animation,
          defaultAnimationOptions: $parse(attrs.animationOptions)()
        });

        this._deviceBackButtonHandler = ons._deviceBackButtonDispatcher.createHandler(this._element[0], this._onDeviceBackButton.bind(this));
        this._createMask(attrs.maskColor);

        this._scope.$on('$destroy', this._destroy.bind(this));
      },

      /**
       * Show alert dialog.
       *
       * @param {Object} [options]
       * @param {String} [options.animation] animation type
       * @param {Object} [options.animationOptions] animation options
       * @param {Function} [options.callback] callback after dialog is shown
       */
      show: function(options) {
        options = options || {};
        var cancel = false,
          callback = options.callback || function() {};

        this.emit('preshow', {
          alertDialog: this,
          cancel: function() { cancel = true; }
        });

        if (!cancel) {
          this._doorLock.waitUnlock(function() {
            var unlock = this._doorLock.lock();

            this._mask.css('display', 'block');
            this._mask.css('opacity', 1);
            this._element.css('display', 'block');

            var animator = this._animationChooser.newAnimator(options);
            animator.show(this, function() {
              this._visible = true;
              unlock();
              this.emit('postshow', {alertDialog: this});
              callback();
            }.bind(this));
          }.bind(this));
        }
      },

      /**
       * Hide alert dialog.
       *
       * @param {Object} [options]
       * @param {String} [options.animation] animation type
       * @param {Object} [options.animationOptions] animation options
       * @param {Function} [options.callback] callback after dialog is hidden
       */
      hide: function(options) {
        options = options || {};
        var cancel = false,
          callback = options.callback || function() {};

        this.emit('prehide', {
          alertDialog: this,
          cancel: function() { cancel = true; }
        });

        if (!cancel) {
          this._doorLock.waitUnlock(function() {
            var unlock = this._doorLock.lock();

            var animator = this._animationChooser.newAnimator(options);
            animator.hide(this, function() {
              this._element.css('display', 'none');
              this._mask.css('display', 'none');
              this._visible = false;
              unlock();
              this.emit('posthide', {alertDialog: this});
              callback();
            }.bind(this));
          }.bind(this));
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
        if (this._parentScope) {
          this._parentScope.$destroy();
          this._parentScope = null;
        } else {
          this._scope.$destroy();
        }
      },

      _destroy: function() {
        this.emit('destroy');

        this._mask.off();

        this._element.remove();
        this._mask.remove();
        this._deviceBackButtonHandler.destroy();

        this._deviceBackButtonHandler = this._scope = this._attrs = this._element = this._mask = null;
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
      },

      _createMask: function(color) {
        this._mask = angular.element('<div>').addClass('alert-dialog-mask').css({
          zIndex: 20000,
          display: 'none'
        });

        this._mask.on('click', this._cancel.bind(this));

        if (color) {
          this._mask.css('background-color', color);
        }

        angular.element(document.body).append(this._mask);
      }
    });

    AlertDialogView._animatorDict = {
      'default': $onsen.isAndroid() ? AndroidAlertDialogAnimator : IOSAlertDialogAnimator,
      'fade': $onsen.isAndroid() ? AndroidAlertDialogAnimator : IOSAlertDialogAnimator,
      'slide': SlideDialogAnimator,
      'none': DialogAnimator
    };

    /**
     * @param {String} name
     * @param {Function} Animator
     */
    AlertDialogView.registerAnimator = function(name, Animator) {
      if (!(Animator.prototype instanceof DialogAnimator)) {
        throw new Error('"Animator" param must inherit DialogAnimator');
      }
      this._animatorDict[name] = Animator;
    };

    MicroEvent.mixin(AlertDialogView);

    return AlertDialogView;
  });
})();
