import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import _Object$keys from 'babel-runtime/core-js/object/keys';
import _setImmediate from 'babel-runtime/core-js/set-immediate';
import _typeof from 'babel-runtime/helpers/typeof';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
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

import util from '../util';
import platform from '../platform';

export var LazyRepeatDelegate = function () {
  function LazyRepeatDelegate(userDelegate) {
    var templateElement = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    _classCallCheck(this, LazyRepeatDelegate);

    if ((typeof userDelegate === 'undefined' ? 'undefined' : _typeof(userDelegate)) !== 'object' || userDelegate === null) {
      throw Error('"delegate" parameter must be an object.');
    }
    this._userDelegate = userDelegate;

    if (!(templateElement instanceof Element) && templateElement !== null) {
      throw Error('"templateElement" parameter must be an instance of Element or null.');
    }
    this._templateElement = templateElement;
  }

  _createClass(LazyRepeatDelegate, [{
    key: 'hasRenderFunction',


    /**
     * @return {Boolean}
     */
    value: function hasRenderFunction() {
      return this._userDelegate._render instanceof Function;
    }

    /**
     * @return {void}
     */

  }, {
    key: '_render',
    value: function _render() {
      this._userDelegate._render.apply(this._userDelegate, arguments);
    }

    /**
     * @param {Number} index
     * @param {Function} done A function that take item object as parameter.
     */

  }, {
    key: 'loadItemElement',
    value: function loadItemElement(index, done) {
      if (this._userDelegate.loadItemElement instanceof Function) {
        this._userDelegate.loadItemElement(index, done);
      } else {
        var element = this._userDelegate.createItemContent(index, this._templateElement);
        if (!(element instanceof Element)) {
          throw Error('createItemContent() must return an instance of Element.');
        }

        done({ element: element });
      }
    }

    /**
     * @return {Number}
     */

  }, {
    key: 'countItems',
    value: function countItems() {
      var count = this._userDelegate.countItems();
      if (typeof count !== 'number') {
        throw Error('countItems() must return a number.');
      }
      return count;
    }

    /**
     * @param {Number} index
     * @param {Object} item
     * @param {Element} item.element
     */

  }, {
    key: 'updateItem',
    value: function updateItem(index, item) {
      if (this._userDelegate.updateItemContent instanceof Function) {
        this._userDelegate.updateItemContent(index, item);
      }
    }

    /**
     * @return {Number}
     */

  }, {
    key: 'calculateItemHeight',
    value: function calculateItemHeight(index) {
      if (this._userDelegate.calculateItemHeight instanceof Function) {
        var height = this._userDelegate.calculateItemHeight(index);

        if (typeof height !== 'number') {
          throw Error('calculateItemHeight() must return a number.');
        }

        return height;
      }

      return 0;
    }

    /**
     * @param {Number} index
     * @param {Object} item
     */

  }, {
    key: 'destroyItem',
    value: function destroyItem(index, item) {
      if (this._userDelegate.destroyItem instanceof Function) {
        this._userDelegate.destroyItem(index, item);
      }
    }

    /**
     * @return {void}
     */

  }, {
    key: 'destroy',
    value: function destroy() {
      if (this._userDelegate.destroy instanceof Function) {
        this._userDelegate.destroy();
      }

      this._userDelegate = this._templateElement = null;
    }
  }, {
    key: 'itemHeight',
    get: function get() {
      return this._userDelegate.itemHeight;
    }
  }]);

  return LazyRepeatDelegate;
}();

/**
 * This class provide core functions for ons-lazy-repeat.
 */
export var LazyRepeatProvider = function () {

  /**
   * @param {Element} wrapperElement
   * @param {LazyRepeatDelegate} delegate
   */
  function LazyRepeatProvider(wrapperElement, delegate) {
    _classCallCheck(this, LazyRepeatProvider);

    if (!(delegate instanceof LazyRepeatDelegate)) {
      throw Error('"delegate" parameter must be an instance of LazyRepeatDelegate.');
    }

    this._wrapperElement = wrapperElement;
    this._delegate = delegate;
    this._insertIndex = this._wrapperElement.children[0] && this._wrapperElement.children[0].tagName === 'ONS-LAZY-REPEAT' ? 1 : 0;

    if (wrapperElement.tagName.toLowerCase() === 'ons-list') {
      wrapperElement.classList.add('lazy-list');
    }

    this._pageContent = this._findPageContentElement(wrapperElement);

    if (!this._pageContent) {
      throw new Error('ons-lazy-repeat must be a descendant of an <ons-page> or an element.');
    }

    this.lastScrollTop = this._pageContent.scrollTop;
    this.padding = 0;
    this._topPositions = [0];
    this._renderedItems = {};

    if (!this._delegate.itemHeight && !this._delegate.calculateItemHeight(0)) {
      this._unknownItemHeight = true;
    }

    this._addEventListeners();
    this._onChange();
  }

  _createClass(LazyRepeatProvider, [{
    key: '_findPageContentElement',
    value: function _findPageContentElement(wrapperElement) {
      var pageContent = util.findParent(wrapperElement, '.page__content');

      if (pageContent) {
        return pageContent;
      }

      var page = util.findParent(wrapperElement, 'ons-page');
      if (page) {
        var content = util.findChild(page, '.content');
        if (content) {
          return content;
        }
      }

      return null;
    }
  }, {
    key: '_checkItemHeight',
    value: function _checkItemHeight(callback) {
      var _this = this;

      this._delegate.loadItemElement(0, function (item) {
        if (!_this._unknownItemHeight) {
          throw Error('Invalid state');
        }

        _this._wrapperElement.appendChild(item.element);

        var done = function done() {
          _this._delegate.destroyItem(0, item);
          item.element && item.element.remove();
          delete _this._unknownItemHeight;
          callback();
        };

        _this._itemHeight = item.element.offsetHeight;

        if (_this._itemHeight > 0) {
          done();
          return;
        }

        // retry to measure offset height
        // dirty fix for angular2 directive
        _this._wrapperElement.style.visibility = 'hidden';
        item.element.style.visibility = 'hidden';

        _setImmediate(function () {
          _this._itemHeight = item.element.offsetHeight;
          if (_this._itemHeight == 0) {
            throw Error('Invalid state: this._itemHeight must be greater than zero.');
          }
          _this._wrapperElement.style.visibility = '';
          done();
        });
      });
    }
  }, {
    key: '_countItems',
    value: function _countItems() {
      return this._delegate.countItems();
    }
  }, {
    key: '_getItemHeight',
    value: function _getItemHeight(i) {
      // Item is rendered
      if (this._renderedItems.hasOwnProperty(i)) {
        if (!this._renderedItems[i].hasOwnProperty('height')) {
          this._renderedItems[i].height = this._renderedItems[i].element.offsetHeight;
        }
        return this._renderedItems[i].height;
      }

      // Item is not rendered, scroll up
      if (this._topPositions[i + 1] && this._topPositions[i]) {
        return this._topPositions[i + 1] - this._topPositions[i];
      }
      // Item is not rendered, scroll down
      return this.staticItemHeight || this._delegate.calculateItemHeight(i);
    }
  }, {
    key: '_calculateRenderedHeight',
    value: function _calculateRenderedHeight() {
      var _this2 = this;

      return _Object$keys(this._renderedItems).reduce(function (a, b) {
        return a + _this2._getItemHeight(+b);
      }, 0);
    }
  }, {
    key: '_onChange',
    value: function _onChange() {
      this._render();
    }
  }, {
    key: '_lastItemRendered',
    value: function _lastItemRendered() {
      return Math.max.apply(Math, _toConsumableArray(_Object$keys(this._renderedItems)));
    }
  }, {
    key: '_firstItemRendered',
    value: function _firstItemRendered() {
      return Math.min.apply(Math, _toConsumableArray(_Object$keys(this._renderedItems)));
    }
  }, {
    key: 'refresh',
    value: function refresh() {
      var forceRender = { forceScrollDown: true };
      var lastItemIndex = Math.min(this._lastItemRendered(), this._countItems() - 1);
      var firstItemIndex = this._firstItemRendered();

      if (util.isInteger(lastItemIndex)) {
        forceRender.forceLastIndex = lastItemIndex;
      }

      if (util.isInteger(firstItemIndex)) {
        this._wrapperElement.style.height = this._topPositions[firstItemIndex] + this._calculateRenderedHeight() + 'px';
        this.padding = this._topPositions[firstItemIndex];
        forceRender.forceFirstIndex = firstItemIndex;
      }

      this._removeAllElements();
      this._render(forceRender);
      this._wrapperElement.style.height = 'inherit';
    }
  }, {
    key: '_render',
    value: function _render() {
      var _this3 = this;

      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$forceScrollDown = _ref.forceScrollDown,
          forceScrollDown = _ref$forceScrollDown === undefined ? false : _ref$forceScrollDown,
          forceFirstIndex = _ref.forceFirstIndex,
          forceLastIndex = _ref.forceLastIndex;

      if (this._unknownItemHeight) {
        return this._checkItemHeight(this._render.bind(this, arguments[0]));
      }

      var isScrollUp = !forceScrollDown && this.lastScrollTop > this._pageContent.scrollTop;
      this.lastScrollTop = this._pageContent.scrollTop;
      var keep = {};

      var offset = this._wrapperElement.getBoundingClientRect().top;
      var limit = 4 * window.innerHeight - offset;
      var count = this._countItems();

      var items = [];
      var start = forceFirstIndex || Math.max(0, this._calculateStartIndex(offset) - 30); // Recalculate for 0 or undefined
      var i = start;

      for (var top = this._topPositions[i]; i < count && top < limit; i++) {
        if (i >= this._topPositions.length) {
          // perf optimization
          this._topPositions.length += 100;
        }

        this._topPositions[i] = top;
        top += this._getItemHeight(i);
      }

      if (this._delegate.hasRenderFunction && this._delegate.hasRenderFunction()) {
        return this._delegate._render(start, i, function () {
          _this3.padding = _this3._topPositions[start];
        });
      }

      if (isScrollUp) {
        for (var j = i - 1; j >= start; j--) {
          keep[j] = true;
          this._renderElement(j, isScrollUp);
        }
      } else {
        var lastIndex = forceLastIndex || Math.max.apply(Math, [i - 1].concat(_toConsumableArray(_Object$keys(this._renderedItems)))); // Recalculate for 0 or undefined
        for (var _j = start; _j <= lastIndex; _j++) {
          keep[_j] = true;
          this._renderElement(_j, isScrollUp);
        }
      }

      _Object$keys(this._renderedItems).forEach(function (key) {
        return keep[key] || _this3._removeElement(key, isScrollUp);
      });
    }

    /**
     * @param {Number} index
     * @param {Boolean} isScrollUp
     */

  }, {
    key: '_renderElement',
    value: function _renderElement(index, isScrollUp) {
      var _this4 = this;

      var item = this._renderedItems[index];
      if (item) {
        this._delegate.updateItem(index, item); // update if it exists
        return;
      }

      this._delegate.loadItemElement(index, function (item) {
        if (isScrollUp) {
          _this4._wrapperElement.insertBefore(item.element, _this4._wrapperElement.children[_this4._insertIndex]);
          _this4.padding = _this4._topPositions[index];
          item.height = _this4._topPositions[index + 1] - _this4._topPositions[index];
        } else {
          _this4._wrapperElement.appendChild(item.element);
        }

        _this4._renderedItems[index] = item;
      });
    }

    /**
     * @param {Number} index
     * @param {Boolean} isScrollUp
     */

  }, {
    key: '_removeElement',
    value: function _removeElement(index) {
      var isScrollUp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      index = +index;
      var item = this._renderedItems[index];
      this._delegate.destroyItem(index, item);

      if (isScrollUp) {
        this._topPositions[index + 1] = undefined;
      } else {
        this.padding = this.padding + this._getItemHeight(index);
      }

      if (item.element.parentElement) {
        item.element.parentElement.removeChild(item.element);
      }

      delete this._renderedItems[index];
    }
  }, {
    key: '_removeAllElements',
    value: function _removeAllElements() {
      var _this5 = this;

      _Object$keys(this._renderedItems).forEach(function (key) {
        return _this5._removeElement(key);
      });
    }
  }, {
    key: '_recalculateTopPositions',
    value: function _recalculateTopPositions(start, end) {
      for (var i = start; i <= end; i++) {
        this._topPositions[i + 1] = this._topPositions[i] + this._getItemHeight(i);
      }
    }
  }, {
    key: '_calculateStartIndex',
    value: function _calculateStartIndex(current) {
      var firstItemIndex = this._firstItemRendered();
      var lastItemIndex = this._lastItemRendered();

      // Fix for Safari scroll and Angular 2
      this._recalculateTopPositions(firstItemIndex, lastItemIndex);

      var start = 0;
      var end = this._countItems() - 1;

      // Binary search for index at top of screen so we can speed up rendering.
      for (;;) {
        var middle = Math.floor((start + end) / 2);
        var value = current + this._topPositions[middle];

        if (end < start) {
          return 0;
        } else if (value <= 0 && value + this._getItemHeight(middle) > 0) {
          return middle;
        } else if (isNaN(value) || value >= 0) {
          end = middle - 1;
        } else {
          start = middle + 1;
        }
      }
    }
  }, {
    key: '_debounce',
    value: function _debounce(func, wait, immediate) {
      var timeout = void 0;
      return function () {
        var _this6 = this,
            _arguments = arguments;

        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        if (callNow) {
          func.apply(this, arguments);
        } else {
          timeout = setTimeout(function () {
            timeout = null;
            func.apply(_this6, _arguments);
          }, wait);
        }
      };
    }
  }, {
    key: '_doubleFireOnTouchend',
    value: function _doubleFireOnTouchend() {
      this._render();
      this._debounce(this._render.bind(this), 100);
    }
  }, {
    key: '_addEventListeners',
    value: function _addEventListeners() {
      util.bindListeners(this, ['_onChange', '_doubleFireOnTouchend']);

      if (platform.isIOS()) {
        this._boundOnChange = this._debounce(this._boundOnChange, 30);
      }

      this._pageContent.addEventListener('scroll', this._boundOnChange, true);

      if (platform.isIOS()) {
        this._pageContent.addEventListener('touchmove', this._boundOnChange, true);
        this._pageContent.addEventListener('touchend', this._boundDoubleFireOnTouchend, true);
      }

      window.document.addEventListener('resize', this._boundOnChange, true);
    }
  }, {
    key: '_removeEventListeners',
    value: function _removeEventListeners() {
      this._pageContent.removeEventListener('scroll', this._boundOnChange, true);

      if (platform.isIOS()) {
        this._pageContent.removeEventListener('touchmove', this._boundOnChange, true);
        this._pageContent.removeEventListener('touchend', this._boundDoubleFireOnTouchend, true);
      }

      window.document.removeEventListener('resize', this._boundOnChange, true);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this._removeAllElements();
      this._delegate.destroy();
      this._parentElement = this._delegate = this._renderedItems = null;
      this._removeEventListeners();
    }
  }, {
    key: 'padding',
    get: function get() {
      return parseInt(this._wrapperElement.style.paddingTop, 10);
    },
    set: function set(newValue) {
      this._wrapperElement.style.paddingTop = newValue + 'px';
    }
  }, {
    key: 'staticItemHeight',
    get: function get() {
      return this._delegate.itemHeight || this._itemHeight;
    }
  }]);

  return LazyRepeatProvider;
}();