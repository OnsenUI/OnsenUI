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

  module.factory('PopoverView', function($onsen) {

    var PopoverView = Class.extend({

      /**
       * @param {Object} scope
       * @param {jqLite} element
       * @param {Object} attrs
       */
      init: function(scope, element, attrs) {
        this._element = element;
        this._scope = scope;

        this._setDirection(attrs.direction || "up");
      },

      _setDirection: function(direction) {
        if (direction === 'up') {
          this._scope.direction = direction;
          this._scope.arrowPosition = 'bottom';
        } else if (direction === 'left') {
          this._scope.direction = direction;
          this._scope.arrowPosition = 'right';
        } else if (direction === 'down') {
          this._scope.direction = direction;
          this._scope.arrowPosition = 'top';
        } else if (direction == 'right') {
          this._scope.direction = direction;
          this._scope.arrowPosition = 'left';
        } else {
          throw new Error('Invalid direction.');
        }
        this._scope.$apply();
      }
    });
    MicroEvent.mixin(PopoverView);

    return PopoverView;
  });
})();
