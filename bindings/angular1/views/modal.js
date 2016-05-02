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

  module.value('ModalAnimator', ons._internal.ModalAnimator);
  module.value('FadeModalAnimator', ons._internal.FadeModalAnimator);

  module.factory('ModalView', function($onsen, $parse) {

    var ModalView = Class.extend({
      _element: undefined,
      _scope: undefined,

      init: function(scope, element, attrs) {
        this._scope = scope;
        this._element = element;
        this._scope.$on('$destroy', this._destroy.bind(this));

        element[0]._animatorFactory.setAnimationOptions($parse(attrs.animationOptions)());
      },

      show: function(options) {
        return this._element[0].show(options);
      },

      hide: function(options) {
        return this._element[0].hide(options);
      },

      toggle: function(options) {
        return this._element[0].toggle(options);
      },

      _destroy: function() {
        this.emit('destroy', {page: this});

        this._events = this._element = this._scope = null;
      }
    });

    ModalView.registerAnimator = function(name, Animator) {
      return window.OnsModalElement.registerAnimator(name, Animator);
    };

    MicroEvent.mixin(ModalView);
    $onsen.derivePropertiesFromElement(ModalView, ['onDeviceBackButton']);


    return ModalView;
  });

})();
