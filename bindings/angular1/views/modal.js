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

  module.factory('ModalView', function($onsen, $parse) {

    var ModalView = Class.extend({
      _element: undefined,
      _scope: undefined,

      init: function(scope, element, attrs) {
        this._scope = scope;
        this._element = element;
        this._attrs = attrs;
        this._scope.$on('$destroy', this._destroy.bind(this));

        this._clearDerivingMethods = $onsen.deriveMethods(this, this._element[0], [ 'show', 'hide', 'toggle' ]);

        this._clearDerivingEvents = $onsen.deriveEvents(this, this._element[0], [
          'preshow', 'postshow', 'prehide', 'posthide',
        ], function(detail) {
          if (detail.modal) {
            detail.modal = this;
          }
          return detail;
        }.bind(this));
      },

      _destroy: function() {
        this.emit('destroy', {page: this});

        this._element.remove();
        this._clearDerivingMethods();
        this._clearDerivingEvents();
        this._events = this._element = this._scope = this._attrs = null;
      }
    });

    MicroEvent.mixin(ModalView);
    $onsen.derivePropertiesFromElement(ModalView, ['onDeviceBackButton']);


    return ModalView;
  });

})();
