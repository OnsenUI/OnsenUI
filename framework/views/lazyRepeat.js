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
        this._element = element;
        this._scope = scope;
        this._attrs = attrs;
        this._linker = linker;

        var userDelegate = this._getDelegate();
        var internalDelegate = new AngularLazyRepeatDelegate(element[0], userDelegate, element.scope());

        this._provider = new ons._internal.LazyRepeatProvider(element[0].parentNode, element[0], internalDelegate);
        element.remove();

        this._injectReloadMethod(userDelegate, this._provider);

        // Render when number of items change.
        this._scope.$watch(internalDelegate.countItems.bind(internalDelegate), this._provider._onChange.bind(this._provider));

        this._scope.$on('$destroy', this._destroy.bind(this));
      },

      _injectReloadMethod: function(userDelegate, provider) {
        var oldReload = userDelegate.reload;

        if (typeof oldReload === 'function') {
          userDelegate.reload = function() {
            console.log("HI");
            oldReload();
            provider._onChange();
          }.bind(this);
        }
        else {
          userDelegate.reload = function() {
            provider._onChange();
          }.bind(this);
        }
      }.bind(this),

      _getDelegate: function() {
        var delegate = this._scope.$eval(this._attrs.onsLazyRepeat);

        if (typeof delegate === 'undefined') {
          /*jshint evil:true */
          delegate = eval(this._attrs.onsLazyRepeat);
        }

        return delegate;
      },

      _destroy: function() {
        this._element = this._scope = this._attrs = this._linker = null;
      }
    });

    return LazyRepeatView;
  });
})();
