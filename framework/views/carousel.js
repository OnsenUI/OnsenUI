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

  module.factory('CarouselView', function($http, $parse, $templateCache, $compile, $onsen, $timeout) {

    /**
     * scroll
     * |----------|----------|
     * |          |          |
     * |----------|----------|
     * @class CarouselView
     */
    var CarouselView = Class.extend({

      /**
       * @member jqLite Object
       */
      _element: undefined,

      /**
       * @member {Object}
       */
      _scope: undefined,

      /**
       * @member {DoorLock}
       */
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

        this._doorLock = new DoorLock();
        this._scroll = 0;

        this._prepareEventListeners();
        this._layoutItems();

        this._scope.$on('$destroy', this._destroy.bind(this));
      },

      _layoutItems: function() {
        var children = this._element.children();
        
        for (var i = 0; i < children.length; i++) {
          angular.element(children[i]).css({
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: '0px',
            left: (i * 100) + '%'
          });
        }
      },

      _prepareEventListeners: function() {
        this._hammer = new Hammer(this._element[0]);

        var scrollTo = function() {
        }.bind(this);

        this._hammer.on('drag', function(event) {
          var scroll = this._scroll - event.gesture.deltaX;
          this._scrollTo(scroll);
        }.bind(this));

        this._hammer.on('dragend', function(event) {
          this._scroll = this._scroll - event.gesture.deltaX;
          if (this._isOverScroll(this._scroll)) {
            this._scrollToKillOverScroll();
          } else {
            this._startMomemtumScroll(event);
          }
        }.bind(this));
      },

      _startMomemtumScroll: function(event) {
        var velocity = event.gesture.velocityX;
        var duration = 0.3;
        var scrollDelta = duration * 1000 * velocity;
        console.log(scrollDelta);
        var scroll = this._scroll + (event.gesture.deltaX > 0 ? -scrollDelta : scrollDelta);
        scroll = this._normalizeScrollPosition(scroll);

        this._scroll = Math.min(Math.max(scroll, 0), this._calculateMaxScroll());

        animit(this._getItemElements())
          .queue({
            transform: 'translate3d(' + -this._scroll + 'px, 0px, 0px)'
          }, {
            duration: duration,
            timing: 'cubic-bezier(.1, .7, .1, 1)'
          })
          .play();
      },

      _normalizeScrollPosition: function(scroll) {
        var arr = [];
        var width = this._element[0].getBoundingClientRect().width;
        for (var i = 0; i < this._getItemCount(); i++) {
          arr.push(i * width);
        }
        arr.sort(function(left, right) {
          left = Math.abs(left - scroll);
          right = Math.abs(right - scroll);

          return left - right;
        });

        return arr[0];
      },

      _updateLayout: function() {
        //...
      },

      _getItemElements: function() {
        var items = [];
        var children = this._element.children();

        for (var i = 0; i < children.length; i++) {
          items.push(children[i]);
        }

        return items;
      },

      _scrollTo: function(scroll) {
        var items = [];
        var self = this;
        var children = this._element.children();

        for (var i = 0; i < children.length; i++) {
          items.push(children[i]);
        }

        animit(items)
          .queue({transform: 'translate3d(' + -normalizeScroll(scroll) + 'px, 0px, 0px)'})
          .play();

        function normalizeScroll(scroll) {
          var ratio = 0.2;

          if (scroll < 0) {
            return Math.round(scroll * ratio);
          }

          var maxScroll = self._calculateMaxScroll();
          if (maxScroll < scroll) {
            return maxScroll + Math.round((scroll - maxScroll) * ratio);
          }

          return scroll;
        }
      },

      _calculateMaxScroll: function() {
        return (this._getItemCount() - 1) * this._element[0].getBoundingClientRect().width;
      },

      _isOverScroll: function(scroll) {
        if (scroll < 0 || scroll > this._calculateMaxScroll()) {
          return true;
        }
        return false;
      },

      _scrollToKillOverScroll: function() {
        if (this._scroll < 0) {
          animit(this._getItemElements())
            .queue({
              transform: 'translate3d(0px, 0px, 0px)'
            }, {
              duration: 0.1,
              timing: 'cubic-bezier(.1, .7, .1, 1)'
            })
            .play();
          this._scroll = 0;
          return;
        }

        var maxScroll = (this._getItemCount() - 1) * this._element[0].getBoundingClientRect().width;
        if (maxScroll < this._scroll) {
          animit(this._getItemElements())
            .queue({
              transform: 'translate3d(' + -maxScroll + 'px, 0px, 0px)'
            }, {
              duration: 0.1,
              timing: 'cubic-bezier(.1, .7, .1, 1)'
            })
            .play();
          this._scroll = maxScroll;
          return;
        }

        return;
      },

      _getItemCount: function() {
        return this._element.children().length;
      },

      /**
       *
       */
      refresh: function() {

      },

      _destroy: function() {
        this.emit('destroy', {navigator: this});
      }

    });

    MicroEvent.mixin(CarouselView);

    return CarouselView;
  });
})();
