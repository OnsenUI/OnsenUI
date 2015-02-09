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

(function(){
  'use strict';
  var module = angular.module('onsen');

  module.factory('LazyRepeatView', function($onsen, $document, $compile) {

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

        this._parentElement = element.parent();
        this._itemHeightSum = [];
        this._maxIndex = 0;

        this._delegate = this._getDelegate();

        this._renderedElements = {};
        this._addEventListeners();

        this._scope.$watch(
          function() {
            return this._countItems();
          }.bind(this),
          function() {
            this._render();
          }.bind(this)
        );

        this._scope.$on('$destroy', this._destroy.bind(this));
        this._render();
      },

      _getDelegate: function() {
        var delegate = this._scope.$eval(this._attrs.onsLazyRepeat);

        if (typeof delegate === 'undefined') {
          /*jshint evil:true */
          delegate = eval(this._attrs.onsLazyRepeat);
        }

        return delegate;
      },

      _countItems: function() {
        return this._delegate.countItems();
      },

      _getItemHeight: function(i) {
        return this._delegate.calculateItemHeight(i);
      },
      
      _getTopOffset: function() {
        return this._parentElement[0].getBoundingClientRect().top;
      },

      _render: function() {
        var items = this._getItemsInView(),
          keep = {};

        this._parentElement.css('height', this._itemHeightSum[this._maxIndex] + 'px');

        for (var i = 0, l = items.length; i < l; i ++) {
          var _item = items[i];
          this._renderElement(_item);
          keep[_item.index] = true;
        }

        for (var key in this._renderedElements) {
          if (this._renderedElements.hasOwnProperty(key) && !keep.hasOwnProperty(key)) {
            this._removeElement(key);
          }
        }
      },

      _isRendered: function(i) {
        return this._renderedElements.hasOwnProperty(i);
      },
      
      _renderElement: function(item) {
        if (this._isRendered(item.index)) {
          // Update content even if it's already added to DOM
          // to account for changes within the list.
          var currentItem = this._renderedElements[item.index];

          if (this._delegate.configureItemScope) {
            this._delegate.configureItemScope(item.index, currentItem.scope);
          }
          else if (this._delegate.createItemContent) {
            var newContent = angular.element(this._delegate.createItemContent(item.index)),
              oldContent = currentItem.element.children();

            if (newContent.html() !== oldContent.html()) {
              currentItem.element
                .append(newContent);
              oldContent.remove();
            }
          }

          return;
        }

        var childScope = this._scope.$new();
        this._addSpecialProperties(item.index, childScope);

        this._linker(childScope, function(clone) {
          if (this._delegate.configureItemScope) {
            this._delegate.configureItemScope(item.index, childScope);
          }
          else if (this._delegate.createItemContent) {
            clone.append(this._delegate.createItemContent(item.index));
          }

          this._parentElement.append(clone);
          clone.removeAttr('ons-lazy-repeat');

          clone.css({
            position: 'absolute',
            top: item.top + 'px',
            left: '0px',
            right: '0px',
            display: 'none'
          });

          var element = {
            element: clone,
            scope: childScope
          };

          $compile(clone)(childScope);
 
          // Don't show elements before they are finished rendering.
          this._scope.$evalAsync(function() {
            clone.css('display', 'block');
          });

          this._renderedElements[item.index] = element;
        }.bind(this));
      },

      _removeElement: function(i) {
        if (!this._isRendered(i)) {
          return;
        }

        var element = this._renderedElements[i];

        if (this._delegate.destroyItemScope) {
          this._delegate.destroyItemScope(i, element.scope);
        }
        else if (this._delegate.destroyItemContent) {
          this._delegate.destroyItemContent(i, element.element.children()[0]);
        }

        element.element.remove();
        element.scope.$destroy();

        delete this._renderedElements[i];
      },

      _calculateStartIndex: function(current) {
        var start = 0,
          end = this._maxIndex;

        // Binary search for index at top of screen so
        // we can speed up rendering.
        while (true) {
          var middle = Math.floor((start + end) / 2),
            value = current + this._itemHeightSum[middle];

          if (end < start) {
            return 0;
          }
          else if (value >= 0 && value - this._getItemHeight(middle) < 0) {
            return middle;
          }
          else if (isNaN(value) || value >= 0) {
            end = middle - 1;
          }
          else {
            start = middle + 1;
          }

        }
      },

      _getItemsInView: function() {
        var topOffset = this._getTopOffset(),
          topPosition = topOffset,
          cnt = this._countItems();

        var startIndex = this._calculateStartIndex(topPosition);
        startIndex = Math.max(startIndex - 30, 0);

        if (startIndex > 0) {
          topPosition += this._itemHeightSum[startIndex - 1];
        }

        var items = [];
        for (var i = startIndex; i < cnt && topPosition < 4 * window.innerHeight; i++) {
          var h = this._getItemHeight();

          if (i >= this._itemHeightSum.length) {
            this._itemHeightSum = this._itemHeightSum.concat(new Array(100));
          }

          if (i > 0) {
            this._itemHeightSum[i] = this._itemHeightSum[i - 1] + h;
          }
          else {
            this._itemHeightSum[i] = h;
          }

          this._maxIndex = Math.max(i, this._maxIndex);

          items.push({
            index: i,
            top: topPosition - topOffset
          });

          topPosition += h;
        }

        return items;
      },

      _addSpecialProperties: function(i, scope) {
        scope.$index = i;
        scope.$first = i === 0;
        scope.$last = i === this._countItems() - 1;
        scope.$middle = !scope.$first && !scope.$last;
        scope.$even = i % 2 === 0;
        scope.$odd = !scope.$even;
      },

      _onScroll: function() {
        this._render();
      },

      _addEventListeners: function() {
        this._bindedOnScroll = this._onScroll.bind(this); 
        $document[0].addEventListener('scroll', this._bindedOnScroll, true);
      },

      _removeEventListeners: function() {
        $document[0].removeEventListener('scroll', this._bindedOnScroll, true);
      },
      
      _destroy: function() {
        this._removeEventListeners(); 
        this._element = this._scope = this._attrs = null;
      }
    });

    return LazyRepeatView;
  });
})();
