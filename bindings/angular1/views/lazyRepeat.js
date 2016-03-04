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

  module.factory('LazyRepeatView', function(AngularLazyRepeatDelegate) {

    var LazyRepeatView = Class.extend({

      /**
       * @param {Object} scope
       * @param {jqLite} element
       * @param {Object} attrs
       */
      init: function(scope, element, attrs, linker) {
        angular.extend(this, {
          _element: element,
          _scope: scope,
          _attrs: attrs,
          _linker: linker
        });

        ons._util.updateParentPosition(element[0]);

        var userDelegate = scope.$eval(attrs.onsLazyRepeat);
        var internalDelegate = new AngularLazyRepeatDelegate(userDelegate, element[0], element.scope());

        this._provider = new ons._internal.LazyRepeatProvider(element[0].parentNode, internalDelegate);
        element.remove();

        this._scope.$watch(internalDelegate.countItems.bind(internalDelegate), this._provider._onChange.bind(this._provider));
        this._scope.$on('$destroy', () => this._element = this._scope = this._attrs = this._linker = null);
      }
    });

    return LazyRepeatView;
  });
})();
