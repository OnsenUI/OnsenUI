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
  'use strict;';

  var module = angular.module('onsen');

  module.factory('ModalView', function($onsen, $rootScope, $parse, AnimationChooser, ModalAnimator, FadeModalAnimator) {

    var ModalView = Class.extend({
      _element: undefined,
      _scope: undefined,

      /**
       * @param {Object} scope
       * @param {jqLite} element
       * @param {Object} attrs
       */
      init: function(scope, element, attrs) {
        this._scope = scope;
        this._element = element;

        var pageView = $rootScope.ons.findParentComponentUntil('ons-page', this._element);
        if (pageView) {
          this._pageContent = angular.element(pageView._element[0].querySelector('.page__content'));
        }

        this._scope.$on('$destroy', this._destroy.bind(this));
        this._deviceBackButtonHandler = $onsen.DeviceBackButtonHandler.create(this._element[0], this._onDeviceBackButton.bind(this));
        this._doorLock = new DoorLock();

        this._animationChooser = new AnimationChooser({
          animators: ModalView._animatorDict,
          baseClass: ModalAnimator,
          baseClassName: 'ModalAnimator',
          defaultAnimation: attrs.animation,
          defaultAnimationOptions: $parse(attrs.animationOptions)()
        });

        this.hide({animation: 'none'});
      },

      getDeviceBackButtonHandler: function() {
        return this._deviceBackButtonHandler;
      },

      /**
       * Show modal view.
       *
       * @param {Object} [options]
       * @param {String} [options.animation] animation type
       * @param {Objhect} [options.animationOptions] animation options
       * @param {Function} [options.callback] callback after modal is shown
       */
      show: function(options) {
        options = options || {};

        var callback = options.callback || function() {};

        this._doorLock.waitUnlock(function() {
          var unlock = this._doorLock.lock(),
            animator = this._animationChooser.newAnimator(options);

          this._element.css('display', 'table');
          animator.show(this, function() {
            unlock();
            callback();
          });
        }.bind(this));
      },

      _isVisible: function() {
        return this._element[0].clientWidth > 0;
      },

      _onDeviceBackButton: function() {
        // Do nothing and stop device-backbutton handler chain.
        return;
      },

      /**
       * Hide modal view.
       *
       * @param {Object} [options]
       * @param {String} [options.animation] animation type
       * @param {Objhect} [options.animationOptions] animation options
       * @param {Function} [options.callback] callback after modal is hidden
       */
      hide: function(options) {
        options = options || {};

        var callback = options.callback || function() {};

        this._doorLock.waitUnlock(function() {
          var unlock = this._doorLock.lock(),
            animator = this._animationChooser.newAnimator(options);

          animator.hide(this, function() {
            this._element.css('display', 'none');
            unlock();
            callback();
          }.bind(this));
        }.bind(this));
      },

      /**
       * Toggle modal view.
       *
       * @param {Object} [options]
       * @param {String} [options.animation] animation type
       * @param {Objhect} [options.animationOptions] animation options
       * @param {Function} [options.callback] callback after modal is toggled
       */
      toggle: function() {
        if (this._isVisible()) {
          return this.hide.apply(this, arguments);
        } else {
          return this.show.apply(this, arguments);
        }
      },

      _destroy: function() {
        this.emit('destroy', {page: this});

        this._deviceBackButtonHandler.destroy();

        this._element = this._scope = null;
      }
    });

    ModalView._animatorDict = {
      'default': ModalAnimator,
      'fade': FadeModalAnimator,
      'none': ModalAnimator
    };

    /**
     * @param {String} name
     * @param {Function} Animator
     */
    ModalView.registerAnimator = function(name, Animator) {
      if (!(Animator.prototype instanceof ModalAnimator)) {
        throw new Error('"Animator" param must inherit DialogAnimator');
      }
      this._animatorDict[name] = Animator;
    };

    MicroEvent.mixin(ModalView);

    return ModalView;
  });
})();

