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

  module.factory('PullHookView', function($onsen, $parse) {

    var PullHookView = Class.extend({

      init: function(scope, element, attrs) {
        this._element = element;
        this._scope = scope;
        this._attrs = attrs;

        this._clearDerivingMethods = $onsen.deriveMethods(this, this._element[0], [
          'getHeight',
          'setHeight',
          'setThresholdHeight',
          'getThresholdHeight',
          'getCurrentState',
          'getPullDistance',
          'isDisabled',
          'setDisabled'
        ]);

        this._clearDerivingEvents = $onsen.deriveEvents(this, this._element[0], [
          'changestate',
        ], function(detail) {
          if (detail.pullHook) {
            detail.pullHook = this;
          }
          return detail;
        }.bind(this));

        this.on('changestate', function(event) {
          this._scope.$evalAsync();
        }.bind(this));

        this._boundOnAction = this._onAction.bind(this);
        this._element[0].setActionCallback(this._boundOnAction);

        this._scope.$on('$destroy', this._destroy.bind(this));
      },

      _onAction: function(done) {
        if (this._attrs.ngAction) {
          this._scope.$eval(this._attrs.ngAction, {$done: done});
        } else if (this._attrs.onAction) {
          /*jshint evil:true */
          eval(this._attrs.onAction);
        }
      },

      _destroy: function() {
        this.emit('destroy');

        this._clearDerivingMethods();
        this._clearDerivingEvents();

        this._element = this._scope = this._attrs = null;
      }
    });

    MicroEvent.mixin(PullHookView);
    return PullHookView;
  });
})();
