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

      /**
       * @param {Object} scope
       * @param {jqLite} element
       */
      init: function(scope, element) {
        this._scope = scope;
        this._element = element;

        this._scope.$on('$destroy', this._destroy.bind(this));
        this._backButtonHandler = $onsen.backButtonHandlerStack.push(this._onBackButton.bind(this));

        this.hide();
      },

      getBackButtonHandler: function() {
        return this._backButtonHandler;
      },

      /**
       * Show modal view.
       */
      show: function() {
        this._element.css('display', 'table');
        $onsen.backButtonHandlerStack.push(this._backButtonHandler);
      },

      _isVisible: function() {
        return this._element[0].clientWidth > 0;
      },

      _onBackButton: function() {
        if (this._isVisible()) {
          // Do nothing and stop backbutton handler chain.
          return true;
        }
      },

      /**
       * Hide modal view.
       */
      hide: function() {
        this._element.css('display', 'none');
      },

      /**
       * Toggle modal view visibility.
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
        this._element = null;
        this._scope = null;

        this._backButtonHandler.remove();
        this._backButtonHandler = null;
      }
    });
    MicroEvent.mixin(ModalView);

    return ModalView;
  });
})();

