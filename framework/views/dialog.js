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

  module.factory('DialogView', function($parse, $onsen, AnimationChooser, DialogAnimator, IOSDialogAnimator, AndroidDialogAnimator, SlideDialogAnimator) {

    var DialogView = Class.extend({

      /**
       * @param {Object} scope
       * @param {jqLite} element
       * @param {Object} attrs
       */
      init: function(scope, element, attrs) {
        this._scope = scope;
        this._element = element;
        this._attrs = attrs;

        this._element.css('display', 'none');

        this._dialog = angular.element(element[0].querySelector('.dialog'));
        this._mask = angular.element(element[0].querySelector('.dialog-mask'));

        this._dialog.css('z-index', 20001);
        this._mask.css('z-index', 20000);

        this._mask.on('click', this._cancel.bind(this));

        this._visible = false;
        this._doorLock = new DoorLock();

        this._animationChooser = new AnimationChooser({
          animators: DialogView._animatorDict,
          baseClass: DialogAnimator,
          baseClassName: 'DialogAnimator',
          defaultAnimation: attrs.animation,
          defaultAnimationOptions: $parse(attrs.animationOptions)()
        });

        this._deviceBackButtonHandler = $onsen.DeviceBackButtonHandler.create(this._element, this._onDeviceBackButton.bind(this));

        this._scope.$on('$destroy', this._destroy.bind(this));
      },

      /**
       *  @return {Object}
       */
      getDeviceBackButtonHandler: function() {
        return this._deviceBackButtonHandler;
      },

      /**
       * Show dialog.
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
          dialog: this,
          cancel: function() { cancel = true; }
        });

        if (!cancel) {
          this._doorLock.waitUnlock(function() {
            var unlock = this._doorLock.lock();

            this._element.css('display', 'block');
            this._mask.css('opacity', 1);

            var animator = this._animationChooser.newAnimator(options);

            animator.show(this, function() {
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
       * @param {Object} [options.animationOptions] animation options
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
            var unlock = this._doorLock.lock();

            var animator = this._animationChooser.newAnimator(options);

            animator.hide(this, function() {
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
        this._scope.$destroy();
      },

      _destroy: function() {
        this.emit('destroy');

        this._element.remove();
        this._deviceBackButtonHandler.destroy();
        this._mask.off();

        this._deviceBackButtonHandler = this._scope = this._attrs = this._element = this._dialog = this._mask = null;
      },

      /**
       * Disable or enable dialog.
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
       * True if dialog is disabled.
       *
       * @return {Boolean}
       */
      isDisabled: function() {
        return this._element[0].hasAttribute('disabled');
      },

      /**
       * Make dialog cancelable or uncancelable.
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
      'default': $onsen.isAndroid() ? AndroidDialogAnimator : IOSDialogAnimator,
      'fade': $onsen.isAndroid() ? AndroidDialogAnimator : IOSDialogAnimator,
      'slide': SlideDialogAnimator,
      'none': DialogAnimator
    };

    /**
     * @param {String} name
     * @param {Function} Animator
     */
    DialogView.registerAnimator = function(name, Animator) {
      if (!(Animator.prototype instanceof DialogAnimator)) {
        throw new Error('"Animator" param must inherit DialogAnimator');
      }
      this._animatorDict[name] = Animator;
    };

    MicroEvent.mixin(DialogView);

    return DialogView;
  });
})();
