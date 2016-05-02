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

        this._clearDerivingEvents = $onsen.deriveEvents(this, this._element[0], [
          'changestate',
        ], detail => {
          if (detail.pullHook) {
            detail.pullHook = this;
          }
          return detail;
        });

        this.on('changestate', () => this._scope.$evalAsync());

        this._element[0].onAction = done => {
          if (this._attrs.ngAction) {
            this._scope.$eval(this._attrs.ngAction, {$done: done});
          } else {
            this.onAction ? this.onAction(done) : done();
          }
        };

        this._scope.$on('$destroy', this._destroy.bind(this));
      },

      _destroy: function() {
        this.emit('destroy');

        this._clearDerivingEvents();

        this._element = this._scope = this._attrs = null;
      }
    });

    MicroEvent.mixin(PullHookView);
    $onsen.derivePropertiesFromElement(PullHookView, ['state', 'pullDistance', 'height', 'thresholdHeight', 'disabled']);

    return PullHookView;
  });
})();
