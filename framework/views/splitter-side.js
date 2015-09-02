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

  angular.module('onsen').factory('SplitterSide', function($onsen, $compile) {

    var SplitterSide = Class.extend({

      init: function(scope, element, attrs) {
        this._element = element;
        this._scope = scope;
        this._attrs = attrs;

        this._clearDerivingMethods = $onsen.deriveMethods(this, this._element[0], [
          'isSwipeable',
          'getCurrentMode',
          'isOpened',
          'open',
          'close',
          'toggle',
          'load',
        ]);

        this._clearDerivingEvents = $onsen.deriveEvents(this, element[0], [
          'modechange', 'preopen', 'preclose', 'postopen', 'postclose'
        ], function(detail) {
          if (detail.side) {
            detail.side = this;
          }
          return detail;
        }.bind(this));

        scope.$on('$destroy', this._destroy.bind(this));
      },

      _link: function(fragment, done) {
        
        var link = $compile(fragment);
        var pageScope = this._createPageScope();
        link(pageScope);

        pageScope.$evalAsync(function() {
          done(fragment);
        });
      },

      _createPageScope: function() {
         return this._scope.$new();
      },

      _destroy: function() {
        this.emit('destroy');

        this._clearDerivingMethods();
        this._clearDerivingEvents();

        this._element = this._scope = this._attrs = null;
      }
    });

    MicroEvent.mixin(SplitterSide);

    return SplitterSide;
  });
})();
