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

export class LazyRepeatDelegate {

  constructor(userDelegate, templateElement = null) {
    if (typeof userDelegate !== 'object' || userDelegate === null) {
      throw Error('"delegate" parameter must be an object.');
    }
    this._userDelegate = userDelegate;

    if (!(templateElement instanceof Element) && templateElement !== null) {
      throw Error('"templateElement" parameter must be an instance of Element or null.');
    }
    this._templateElement = templateElement;
  }

  get itemHeight() {
    return this._userDelegate.itemHeight;
  }

  /**
   * @return {Boolean}
   */
  hasRenderFunction() {
    return this._userDelegate._render instanceof Function;
  }

  /**
   * @return {void}
   */
  _render() {
    this._userDelegate._render.apply(this._userDelegate, arguments);
  }

  /**
   * @param {Number} index
   * @param {Function} done A function that take item object as parameter.
   */
  loadItemElement(index, done) {
    if (this._userDelegate.loadItemElement instanceof Function) {
      this._userDelegate.loadItemElement(index, done);
    } else {
      const element = this._userDelegate.createItemContent(index, this._templateElement);
      if (!(element instanceof Element)) {
        throw Error('createItemContent() must return an instance of Element.');
      }

      done({element});
    }
  }

  /**
   * @return {Number}
   */
  countItems() {
    const count = this._userDelegate.countItems();
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
  updateItem(index, item) {
    if (this._userDelegate.updateItemContent instanceof Function) {
      this._userDelegate.updateItemContent(index, item);
    }
  }

  /**
   * @return {Number}
   */
  calculateItemHeight(index) {
    if (this._userDelegate.calculateItemHeight instanceof Function) {
      const height = this._userDelegate.calculateItemHeight(index);

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
  destroyItem(index, item) {
    if (this._userDelegate.destroyItem instanceof Function) {
      this._userDelegate.destroyItem(index, item);
    }
  }

  /**
   * @return {void}
   */
  destroy() {
    if (this._userDelegate.destroy instanceof Function) {
      this._userDelegate.destroy();
    }

    this._userDelegate = this._templateElement = null;
  }
}

/**
 * This class provide core functions for ons-lazy-repeat.
 */
export class LazyRepeatProvider {

  /**
   * @param {Element} wrapperElement
   * @param {LazyRepeatDelegate} delegate
   */
  constructor(wrapperElement, delegate) {
    if (!(delegate instanceof LazyRepeatDelegate)) {
      throw Error('"delegate" parameter must be an instance of LazyRepeatDelegate.');
    }

    this._wrapperElement = wrapperElement;
    this._delegate = delegate;
    this._insertIndex = (this._wrapperElement.children[0] && this._wrapperElement.children[0].tagName === 'ONS-LAZY-REPEAT') ? 1 : 0;

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

  get padding() {
    return parseInt(this._wrapperElement.style.paddingTop, 10);
  }

  set padding(newValue) {
    this._wrapperElement.style.paddingTop = newValue + 'px';
  }

  _findPageContentElement(wrapperElement) {
    const pageContent = util.findParent(wrapperElement, '.page__content');

    if (pageContent) {
      return pageContent;
    }

    const page = util.findParent(wrapperElement, 'ons-page');
    if (page) {
      const content = util.findChild(page, '.content');
      if (content) {
        return content;
      }
    }

    return null;
  }

  _checkItemHeight(callback) {
    this._delegate.loadItemElement(0, item => {
      if (!this._unknownItemHeight) {
        throw Error('Invalid state');
      }

      this._wrapperElement.appendChild(item.element);

      const done = () => {
        this._delegate.destroyItem(0, item);
        this._wrapperElement.removeChild(item.element);
        delete this._unknownItemHeight;
        callback();
      };

      this._itemHeight = item.element.offsetHeight;

      if (this._itemHeight > 0) {
        done();
        return;
      }

      // retry to measure offset height
      // dirty fix for angular2 directive
      const lastVisibility = this._wrapperElement.style.visibility;
      this._wrapperElement.style.visibility = 'hidden';
      item.element.style.visibility = 'hidden';

      setImmediate(() => {
        this._itemHeight = item.element.offsetHeight;
        if (this._itemHeight == 0) {
          throw Error('Invalid state: this._itemHeight must be greater than zero.');
        }
        this._wrapperElement.style.visibility = lastVisibility;
        done();
      });
    });
  }

  get staticItemHeight() {
    return this._delegate.itemHeight || this._itemHeight;
  }
  _countItems() {
    return this._delegate.countItems();
  }

  _getItemHeight(i) {
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

  _calculateRenderedHeight() {
    return Object.keys(this._renderedItems).reduce((a, b) => a + this._getItemHeight(+(b)), 0)
  }

  _onChange() {
    this._render();
  }

  _lastItemRendered() {
    return Math.max(...Object.keys(this._renderedItems))
  }

  _firstItemRendered() {
    return Math.min(...Object.keys(this._renderedItems))
  }

  refresh() {
    const lastItemIndex = Math.min(this._lastItemRendered(), this._countItems() - 1);
    const firstItemIndex = this._firstItemRendered();
    this._wrapperElement.style.height = this._topPositions[firstItemIndex] + this._calculateRenderedHeight() + 'px';
    this.padding = this._topPositions[firstItemIndex];
    this._removeAllElements();
    this._render({forceScrollDown: true, forceFirstIndex: firstItemIndex, forceLastIndex: lastItemIndex});
    this._wrapperElement.style.height = 'inherit';
  }

  _render({forceScrollDown = false, forceFirstIndex, forceLastIndex} = {}) {
    if (this._unknownItemHeight) {
      return this._checkItemHeight(this._render.bind(this, arguments[0]));
    }

    const isScrollUp = !forceScrollDown && this.lastScrollTop > this._pageContent.scrollTop;
    this.lastScrollTop = this._pageContent.scrollTop;
    const keep = {};

    const offset = this._wrapperElement.getBoundingClientRect().top;
    const limit = 4 * window.innerHeight - offset;
    const count = this._countItems();

    const items = [];
    const start = forceFirstIndex || Math.max(0, this._calculateStartIndex(offset) - 30);
    let i = start;

    for(let top = this._topPositions[i]; i < count && top < limit; i++) {
      if (i >= this._topPositions.length) { // perf optimization
        this._topPositions.length += 100;
      }

      this._topPositions[i] = top;
      top += this._getItemHeight(i);
    }

    if (this._delegate.hasRenderFunction && this._delegate.hasRenderFunction()) {
      return this._delegate._render(start, i, () => {
        this.padding = this._topPositions[start];
      });
    }

    if (isScrollUp) {
      for (let j = i - 1; j >= start; j--) {
        keep[j] = true;
        this._renderElement(j, isScrollUp);
      }
    } else {
      const lastIndex = forceLastIndex || Math.max(i - 1, ...Object.keys(this._renderedItems));
      for (let j = start; j <= lastIndex; j++) {
        keep[j] = true;
        this._renderElement(j, isScrollUp);
      }
    }

    Object.keys(this._renderedItems).forEach(key => keep[key] || this._removeElement(key, isScrollUp));
  }

  /**
   * @param {Number} index
   * @param {Boolean} isScrollUp
   */
  _renderElement(index, isScrollUp) {
    const item = this._renderedItems[index];
    if (item) {
      this._delegate.updateItem(index, item); // update if it exists
      return;
    }

    this._delegate.loadItemElement(index, item => {
      if (isScrollUp) {
        this._wrapperElement.insertBefore(item.element, this._wrapperElement.children[this._insertIndex])
        this.padding = this._topPositions[index];
        item.height = this._topPositions[index + 1] - this._topPositions[index];
      } else {
        this._wrapperElement.appendChild(item.element);
      }

      this._renderedItems[index] = item;
    });
  }

  /**
   * @param {Number} index
   * @param {Boolean} isScrollUp
   */
  _removeElement(index, isScrollUp = true) {
    index = +(index);
    const item = this._renderedItems[index];
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

  _removeAllElements() {
    Object.keys(this._renderedItems).forEach(key => this._removeElement(key));
  }

  _recalculateTopPositions(start, end) {
    for (let i = start; i <= end; i++) {
      this._topPositions[i + 1] = this._topPositions[i] + this._getItemHeight(i);
    }
  }

  _calculateStartIndex(current) {
    const firstItemIndex = this._firstItemRendered();
    const lastItemIndex = this._lastItemRendered();

    // Fix for Safari scroll and Angular 2
    this._recalculateTopPositions(firstItemIndex, lastItemIndex);

    let start = 0;
    let end = this._countItems() - 1;

    // Binary search for index at top of screen so we can speed up rendering.
    for (;;) {
      const middle = Math.floor((start + end) / 2);
      const value = current + this._topPositions[middle];

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

  _debounce(func, wait, immediate) {
    let timeout;
    return function() {
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      if (callNow) {
        func.apply(this, arguments);
      } else {
        timeout = setTimeout(() => {
          timeout = null;
          func.apply(this, arguments);
        }, wait);
      }
    };
  }

  _doubleFireOnTouchend() {
    this._render();
    this._debounce(this._render.bind(this), 100);
  }

  _addEventListeners() {
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

  _removeEventListeners() {
    this._pageContent.removeEventListener('scroll', this._boundOnChange, true);

    if (platform.isIOS()) {
      this._pageContent.removeEventListener('touchmove', this._boundOnChange, true);
      this._pageContent.removeEventListener('touchend', this._boundDoubleFireOnTouchend, true);
    }

    window.document.removeEventListener('resize', this._boundOnChange, true);
  }

  destroy() {
    this._removeAllElements();
    this._delegate.destroy();
    this._parentElement = this._delegate = this._renderedItems = null;
    this._removeEventListeners();
  }
}

