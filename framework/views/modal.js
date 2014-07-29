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

  module.factory('ModalView', function($onsen) {

    var ModalView = Class.extend({
      _element: undefined,
      _scope: undefined,

      init: function(scope, element) {
        this._scope = scope;
        this._element = element;
      },

      show: function() {
        this._element.css('display', null);
      },

      hide: function() {
        this._element.css('display', 'none');
      },

      toggle: function() {
        if (this._element[0].clientWidth > 0) {
          return this.show.apply(this, argument);
        } else {
          return this.hide.apply(this, argument);
        }
      },

      _destroy: function() {
        this.emit('destroy', {page: this});
        this._toolbarElement = null;
        this._nullElement = null;
        this._bottomToolbarElement = null;
      }
    });
    MicroEvent.mixin(ModalView);

    return ModalView;
  });
})();

