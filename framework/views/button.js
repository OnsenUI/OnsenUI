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

(function(){
  'use strict';
  var module = angular.module('onsen');

  module.factory('ButtonView', function() {

    var ButtonView = Class.extend({

      /**
       * @param {jqLite} element
       */
      init: function(element) {
        this._element = element;
      },

      /**
       * Returns whether the button is disabled or not.
       */
      isDisabled: function() {
        return this._element[0].hasAttribute('disabled');
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
