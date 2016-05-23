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

  angular.module('onsen').factory('SplitterContent', function($onsen, $compile) {

    var SplitterContent = Class.extend({

      init: function(scope, element, attrs) {
        this._element = element;
        this._scope = scope;
        this._attrs = attrs;

        this.load = (...args) => {
          this._pageScope && this._pageScope.$destroy();
          return this._element[0].load(...args);
        };
        scope.$on('$destroy', this._destroy.bind(this));
      },

      _link: function(fragment, done) {
        this._pageScope = this._scope.$new();
        $compile(fragment)(this._pageScope);

        this._pageScope.$evalAsync(() => done(fragment));
      },

      _destroy: function() {
        this.emit('destroy');
        this._element = this._scope = this._attrs = this.load = this._pageScope = null;
      }
    });

    MicroEvent.mixin(SplitterContent);
    $onsen.derivePropertiesFromElement(SplitterContent, ['page']);

    return SplitterContent;
  });
})();
