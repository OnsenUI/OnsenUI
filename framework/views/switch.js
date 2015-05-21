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

  module.factory('SwitchView', function() {

    var SwitchView = Class.extend({

      /**
       * @param {jqLite} element
       * @param {Object} scope
       * @param {Object} attrs
       */
      init: function(element, scope, attrs) {
        this._element = element;
        this._checkbox = angular.element(element[0].querySelector('input[type=checkbox]'));
        this._scope = scope;

        this._checkbox.on('change', function() {
          this.emit('change', {'switch': this, value: this._checkbox[0].checked, isInteractive: true});
        }.bind(this));
      },

      /**
       * @return {Boolean}
       */
      isChecked: function() {
        return this._element[0].isChecked();
      },

      /**
       * @param {Boolean}
       */
      setChecked: function(isChecked) {
        return this._element[0].setChecked(isChecked);

        if (this._checkbox[0].checked != isChecked) {
          this._scope.model = isChecked;
          this._checkbox[0].checked = isChecked;
          this._scope.$evalAsync();

          this.emit('change', {'switch': this, value: isChecked, isInteractive: false});
        }
      },

      /**
       * @return {HTMLElement}
       */
      getCheckboxElement: function() {
        return this._checkbox[0];
      }
    });
    MicroEvent.mixin(SwitchView);

    return SwitchView;
  });
})();
