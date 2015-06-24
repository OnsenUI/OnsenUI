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
  'use strict;';

  var module = angular.module('onsen');

  module.factory('CarouselView', function($onsen) {

    /**
     * @class CarouselView
     */
    var CarouselView = Class.extend({

      _element: undefined,
      _scope: undefined,
      _doorLock: undefined,

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

        this._clearDerivingEvents = $onsen.deriveEvents(this, element[0], ['refresh', 'postchange', 'overscroll'], function(detail) {
          if (detail.carousel) {
            detail.carousel = this;
          }
          return detail;
        }.bind(this));
      },

      setSwipeable: function(swipeable) {
        return this._element[0].setSwipeable(swipeable);
      },

      isSwipeable: function() {
        return this._element[0].isSwipeable();
      },

      setAutoScrollRatio: function(ratio) {
        return this._element[0].setAutoScrollRatio(ratio);
      },

      getAutoScrollRatio: function(ratio) {
        return this._element[0].getAutoScrollRatio();
      },

      setActiveCarouselItemIndex: function(index, options) {
        return this._element[0].setActiveCarouselItemIndex(index, options);
      },

      getActiveCarouselItemIndex: function() {
        return this._element[0].getActiveCarouselItemIndex();
      },

      next: function(options) {
        return this._element[0].next(options);
      },

      prev: function(options) {
        return this._element[0].prev(options);
      },

      setAutoScrollEnabled: function(enabled) {
        return this._element[0].setAutoScrollEnabled(enabled);
      },

      isAutoScrollEnabled: function(enabled) {
        return this._element[0].isAutoScrollEnabled(enabled);
      },

      setDisabled: function(disabled) {
        return this._element[0].setDisabled(disabled);
      },

      isDisabled: function() {
        return this._element[0].isDisabled();
      },

      setOverscrollable: function(scrollable) {
        return this._element[0].setOverscrollable(scrollable);
      },

      isOverscrollable: function() {
        return this._element[0].isOverscrollable();
      },

      refresh: function() {
        return this._element[0].refresh();
      },

      first: function() {
        return this._element[0].first();
      },

      last: function() {
        return this._element[0].last();
      },

      _destroy: function() {
        this.emit('destroy');

        this._element = this._scope = this._attrs = null;
      }
    });

    MicroEvent.mixin(CarouselView);

    return CarouselView;
  });
})();
