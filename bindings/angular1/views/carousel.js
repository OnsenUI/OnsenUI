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

  module.factory('CarouselView', function($onsen) {

    /**
     * @class CarouselView
     */
    var CarouselView = Class.extend({

      /**
       * @param {Object} scope
       * @param {jqLite} element
       * @param {Object} attrs
       */
      init: function(scope, element, attrs) {
        this._element = element;
        this._scope = scope;
        this._attrs = attrs;

        this._scope.$on('$destroy', this._destroy.bind(this));

        this._clearDerivingMethods = $onsen.deriveMethods(this, element[0], [
          'setActiveIndex', 'getActiveIndex', 'next', 'prev', 'refresh', 'first', 'last'
        ]);

        this._clearDerivingEvents = $onsen.deriveEvents(this, element[0], ['refresh', 'postchange', 'overscroll'], function(detail) {
          if (detail.carousel) {
            detail.carousel = this;
          }
          return detail;
        }.bind(this));
      },

      _destroy: function() {
        this.emit('destroy');

        this._clearDerivingEvents();
        this._clearDerivingMethods();

        this._element = this._scope = this._attrs = null;
      }
    });

    MicroEvent.mixin(CarouselView);

    $onsen.derivePropertiesFromElement(CarouselView, [
      'centered', 'overscrollable', 'disabled', 'autoScroll', 'swipeable', 'autoScrollRatio', 'itemCount'
    ]);

    return CarouselView;
  });
})();
