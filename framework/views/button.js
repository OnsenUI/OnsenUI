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

  module.factory('ButtonView', function($onsen) {

    var ButtonView = Class.extend({

      /**
       * @param {Object} scope
       * @param {jqLite} element
       * @param {Object} attrs
       */
      init: function(scope, element, attrs) {
        this._element = element;
        this._scope = scope;
        this._attrs = attrs;
      },

      /**
       * Start spinning.
       */
      startSpin: function() {
        this._attrs.$set('shouldSpin', 'true');
      },

      /**
       * Stop spinning.
       */
      stopSpin: function() {
        this._attrs.$set('shouldSpin', 'false');
      },

      /**
       * Returns whether button is spinning or not.
       */
      isSpinning: function() {
        return this._attrs.shouldSpin === 'true';
      },

      /**
       * Set spin animation.
       *
       * @param {String} animation type
       */
      setSpinAnimation: function(animation) {
        this._scope.$apply(function() {
          var animations = ['slide-left', 'slide-right', 'slide-up',
            'slide-down', 'expand-left', 'expand-right', 'expand-up',
            'expand-down', 'zoom-out', 'zoom-in'];

          if (animations.indexOf(animation) < 0) {
            console.warn('Animation ' + animation + 'doesn\'t exist.');
            animation = 'slide-left';
          }

          this._scope.animation = animation;
        }.bind(this));
      },
  
      /**
       * Returns whether the button is disabled or not.
       */
      isDisabled: function() {
        return this._attrs.disabled;
      },

      /**
       * Disabled or enable button.
       */
      setDisabled: function(disabled) {
        if (typeof disabled !== 'boolean') {
          throw new Error('Argument must be a boolean.');
        }

        if (disabled) {
          this._element[0].setAttribute('disabled', '');
        } else {
          this._element[0].removeAttribute('disabled');
        }
      }

    });
    MicroEvent.mixin(ButtonView);

    return ButtonView;
  });
})();
