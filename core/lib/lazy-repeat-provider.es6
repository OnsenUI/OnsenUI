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

((ons) => {
  'use strict';

  const util = ons._util;

  class LazyRepeatDelegate {
    /**
     * @param {Number}
     * @param {Function} done A function that take item object as parameter.
     */
    prepareItem(index, done) {
      throw new Error('This is an abstract method.');
    }

    /**
     * @return {Number}
     */
    countItems() {
      throw new Error('This is an abstract method.');
    }

    /**
     * @param {Number} index
     * @param {Object} item
     * @param {Element} item.element
     */
    updateItem(index, item) {
      throw new Error('This is an abstract method.');
    }

    /**
     * @return {Number}
     */
    calculateItemHeight(index) {
      throw new Error('This is an abstract method.');
    }

    /**
     * @param {Number} index
     * @param {Object} item
     */
    destroyItem(index, item) {
      throw new Error('This is an abstract method.');
    }

    /**
     * @return {void}
     */
    destroy() {
      throw new Error('This is an abstract method.');
    }
  }

  /**
   * This class provide core functions for ons-lazy-repeat.
   */
  class LazyRepeatProvider {

    /**
     * @param {Element} wrapperElement
     * @param {Element} templateElement
     * @param {LazyRepeatDelegate} delegate
     */
    constructor(wrapperElement, templateElement, delegate) {
      if (!(delegate instanceof LazyRepeatDelegate)) {
        throw new Error('"delegate" parameter must be an instance of ons._internal.LazyRepeatDelegate.');
      }

      if (!(templateElement instanceof Element)) {
        throw new Error('"templateElement" parameter must be an instance of Element.');
      }

      if (!(wrapperElement instanceof Element)) {
        throw new Error('"wrapperElement" parameter must be an instance of Element.');
      }

      this._templateElement = templateElement;
      this._wrapperElement = wrapperElement;
      this._delegate = delegate;

      this._pageContent = util.findParent(wrapperElement, '.page__content');

      if (!this._pageContent) {
        throw new Error('ons-lazy-repeat must be a descendant of an <ons-page> element.');
      }

      this._itemHeightSum = [];
      this._maxIndex = 0;
      this._renderedItems = {};

      this._addEventListeners();

      this._onChange();
    }

    _countItems() {
      return this._delegate.countItems();
    }

    _getItemHeight(i) {
      return this._delegate.calculateItemHeight(i);
    }

    _getTopOffset() {
      if (typeof this._wrapperElement !== 'undefined' && this._wrapperElement !== null) {
        return this._wrapperElement.getBoundingClientRect().top;
      } else {
        return 0;
      }
    }

    _onChange() {
      this._render();
    }

    _render() {
      const items = this._getItemsInView();
      const keep = {};

      for (let i = 0, l = items.length; i < l; i++) {
        let _item = items[i];
        this._renderElement(_item);
        keep[_item.index] = true;
      }

      for (let key in this._renderedItems) {
        if (this._renderedItems.hasOwnProperty(key) && !keep.hasOwnProperty(key)) {
          this._removeElement(key);
        }
      }

      this._wrapperElement.style.height = this._calculateListHeight() + 'px';
    }

    _calculateListHeight() {
      let indices = Object.keys(this._renderedItems).map((n) => parseInt(n));
      return this._itemHeightSum[indices.pop()] || 0;
    }

    /**
     * @param {Number} index
     * @return {Boolean}
     */
    _isRendered(index) {
      return this._renderedItems.hasOwnProperty(index);
    }

    /**
     * @param {Object} item
     * @param {Number} item.index
     * @param {Number} item.top
     */
    _renderElement({index: index, top: top}) {
      if (this._isRendered(index)) {
        // Update content even if it's already added to DOM
        // to account for changes within the list.
        const currentItem = this._renderedItems[index];
        this._delegate.updateItem(index, currentItem);

        // Fix position.
        let element = this._renderedItems[index].element;
        element.style.top = top + 'px';

        return;
      }

      this._delegate.prepareItem(index, (item) => {

        const element = item.element;

        element.style.position = 'absolute';
        element.style.top = top + 'px';
        element.style.left = '0px';
        element.style.right = '0px';

        this._wrapperElement.appendChild(element);

        this._renderedItems[index] = item;
      });
    }

    /**
     * @param {Number} index
     */
    _removeElement(index) {
      if (!this._isRendered(index)) {
        return;
      }

      let item = this._renderedItems[index];

      this._delegate.destroyItem(index, item);

      if (item.element.parentElement) {
        item.element.parentElement.removeChild(item.element);
      }
      item = null;

      delete this._renderedItems[index];
    }

    _removeAllElements() {
      for (let key in this._renderedItems) {
        if (this._renderedItems.hasOwnProperty(key)) {
          this._removeElement(key);
        }
      }
    }

    _calculateStartIndex(current) {
      let start = 0;
      let end = this._maxIndex;

      // Binary search for index at top of screen so
      // we can speed up rendering.
      for (;;) {
        const middle = Math.floor((start + end) / 2);
        const value = current + this._itemHeightSum[middle];

        if (end < start) {
          return 0;
        } else if (value >= 0 && value - this._getItemHeight(middle) < 0) {
          return middle;
        } else if (isNaN(value) || value >= 0) {
          end = middle - 1;
        } else {
          start = middle + 1;
        }
      }
    }

    _recalculateItemHeightSum() {
      let sums = this._itemHeightSum;
      for (let i = 0, sum = 0; i < Math.min(sums.length, this._countItems()); i++) {
        sum += this._getItemHeight(i);
        sums[i] = sum;
      }
    }

    _getItemsInView() {
      const topOffset = this._getTopOffset();
      let topPosition = topOffset;
      const cnt = this._countItems();

      if (cnt !== this._itemCount){
        this._recalculateItemHeightSum();
        this._maxIndex = cnt - 1;
      }
      this._itemCount = cnt;

      let startIndex = this._calculateStartIndex(topPosition);
      startIndex = Math.max(startIndex - 30, 0);

      if (startIndex > 0) {
        topPosition += this._itemHeightSum[startIndex - 1];
      }

      const items = [];
      for (let i = startIndex; i < cnt && topPosition < 4 * window.innerHeight; i++) {
        const h = this._getItemHeight(i);

        if (i >= this._itemHeightSum.length) {
          this._itemHeightSum = this._itemHeightSum.concat(new Array(100));
        }

        if (i > 0) {
          this._itemHeightSum[i] = this._itemHeightSum[i - 1] + h;
        } else {
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
    }

    _debounce(func, wait, immediate) {
      var timeout;
      return function() {
        var context = this, args = arguments;
        var later = function() {
          timeout = null;
          if (!immediate) {
            func.apply(context, args);
          }
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) {
          func.apply(context, args);
        }
      };
    }

    _doubleFireOnTouchend() {
      this._render();
      this._debounce(this._render.bind(this), 100);
    }

    _addEventListeners() {
      if (ons.platform.isIOS()) {
        this._boundOnChange = this._debounce(this._onChange.bind(this), 30);
      }
      else {
        this._boundOnChange = this._onChange.bind(this);
      }

      this._pageContent.addEventListener('scroll', this._boundOnChange, true);

      if (ons.platform.isIOS()) {
        this._pageContent.addEventListener('touchmove', this._boundOnChange, true);
        this._pageContent.addEventListener('touchend', this._doubleFireOnTouchend, true);
      }

      window.document.addEventListener('resize', this._boundOnChange, true);
    }

    _removeEventListeners() {
      this._pageContent.removeEventListener('scroll', this._boundOnChange, true);

      if (ons.platform.isIOS()) {
        this._pageContent.removeEventListener('touchmove', this._boundOnChange, true);
        this._pageContent.removeEventListener('touchend', this._doubleFireOnTouchend, true);
      }

      window.document.removeEventListener('resize', this._boundOnChange, true);
    }

    destroy() {
      this._delegate.destroy();
      this._parentElement = this._templateElement = this._delegate = this._renderedItems = null;
      this._removeEventListeners();
    }
  }

  ons._internal = ons._internal || {};
  ons._internal.LazyRepeatProvider = LazyRepeatProvider;
  ons._internal.LazyRepeatDelegate = LazyRepeatDelegate;

})(window.ons = window.ons || {});
