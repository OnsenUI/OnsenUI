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

import util from 'ons/util';
import BaseElement from 'ons/base-element';

// TODO: Add codepen example.

/**
 * @element ons-ripple
 * @category control
 * @description
 *   [en]Adds scrollbar to the parent element. NOTE: the parent should have a fixed size.[/en]
 *   [ja][/ja]
 * @example
 * <div>
 *   Lorem ipsum dolor sit amet...
 *   <ons-scrollbar draggable></ons-scrollbar>
 * </div>
 *
 * <div>
 *   Lorem ipsum dolor sit amet...
 *   <ons-scrollbar autohide></ons-scrollbar>
 * </div>
 */
class ScrollbarElement extends BaseElement {

  /**
   * @attribute height
   * @type {Number}
   * @description
   *   [en]If set then the height of the scrollbar will be fixed to this value. Otherwise it will be a dynamic value based on the visible proportion of the content. The value can only be in px and is ignored if it's zero.[/en]
   *   [ja][/ja]
   */

  /**
   * @attribute draggable
   * @description
   *   [en]If this attribute is set then the scrollbar will be draggable.[/en]
   *   [ja][/ja]
   */

  /**
   * @attribute autohide
   * @type {String}
   * @description
   *   [en]If this attribute is set then the scrollbar will disappear shortly after scrolling.[/en]
   *   [ja][/ja]
   */

  /**
   * @attribute hidden
   * @type {String}
   * @description
   *   [en]If this attribute is set then the scrollbar will be hidden with `display: none`.[/en]
   *   [ja][/ja]
   */

  /**
   * @attribute update-on-scroll
   * @description
   *   [en]If this attribute is set then the scrollbar will update it's size and container on every scroll event. Useful if the size of the content changes frequently. Otherwise `updateScrollbar` method should be called manually when the content size changes. [/en]
   *   [ja][/ja]
   */

  createdCallback() {
    if (!this.hasAttribute('_compiled')) {
      this._compile();
    } else {
      this._scroll = this.getElementsByClassName('scrollbar')[0];
    }
    this._timeout = false;
    this._limitReached = 0;
    this._autohideDelay = 500;
    this.onInfiniteScrollLimit = 0.75;

    this._boundOnDragStart = this._onDragStart.bind(this);
    this._boundOnScroll = this._onScroll.bind(this);

    ['height', 'draggable', 'autohide', 'hidden', 'update-on-scroll'].forEach(e => {
      this.attributeChangedCallback(e, null, this.getAttribute(e));
    });
  }

  _compile() {
    this.classList.add('scrollbar-container');
    this._scroll = util.createElement(`<div class="scrollbar"><div class="scrollbar-touch"></div></div>`);
    this.appendChild(this._scroll);
    this.setAttribute('_compiled', '');
  }

  _attach() {
    var styles = window.getComputedStyle(this.parentNode);
    if (styles.getPropertyValue('position') === 'static') {
      this.parentNode.style.position = 'relative';
    }

    this._content = util.createElement(`<div class="content"></div>`);
    Array.prototype.slice.call(this.parentNode.childNodes).forEach(e => {
      if (e != this) {
        this._content.appendChild(e);
      }
    });
    this.parentNode.insertBefore(this._content, this);
    this.setAttribute('_attached', '');
  }

  _onScroll(e) {
    if (this._updateOnScroll) {
      this.updateScrollbar();
    } else {
      this._updateScrollbarLocation();
    }

    if (this._autohide) {
      this._updateAutohide();
    }
    if (!this._limitReached && this._overLimit()) {
      this._limitReached = 1;
      this.onInfiniteScroll && this.onInfiniteScroll(() => {
        this.updateScrollbar();
        this._limitReached = 0;
      });
    }
  }

  _updateAutohide(){
    if (!this._scrolling) {
      this._scrolling = true;
      this.classList.add('scrollbar-autohide-visible');
    }
    clearTimeout(this._timeout);
    this._timeout = setTimeout(() => {
      this._scrolling = false;
      this.classList.remove('scrollbar-autohide-visible');
    }, this._autohideDelay);
  }

  _overLimit(e){
    var c = this._content;
    return (c.scrollTop + c.clientHeight) / c.scrollHeight >= this.onInfiniteScrollLimit;
  }

  /**
   * @method updateScrollbar
   * @signature updateScrollbar()
   * @description
   *   [en]Updates teh scrollbar size and location. Should be called if the size of the content changes. Automatically called when onInfiniteScroll handler is finished.[/en]
   *   [ja][/ja]
   */
  updateScrollbar() {
    var [content, scroll, container] = [this._content, this._scroll, this];
    if (!this._hidden) {
      scroll.style.display = (content.clientHeight >= content.scrollHeight) ? 'none' : 'block';
      scroll.style.height = Math.round(this._height || (container.clientHeight * content.clientHeight / content.scrollHeight)) + 'px';
      this._contentMax = content.scrollHeight - content.clientHeight;
      this._scrollMax = container.clientHeight - scroll.clientHeight;
      this._updateScrollbarLocation();
    }
  }

  _updateScrollbarLocation() {
    this._scroll.style.top = Math.round(this._scrollMax * this._content.scrollTop / this._contentMax) + 'px';
  }

  _onDragStart(e) {
    var startY = this._scroll.offsetTop;
    var onMove = (e) => {
      this.classList.add('scrollbar-dragging');
      var progress = Math.min(1, Math.max(0, (startY + e.gesture.deltaY) / this._scrollMax));
      this._content.scrollTop = this._contentMax * progress;
    };
    document.addEventListener('drag', onMove);
    document.addEventListener('release', () => {
      this.classList.remove('scrollbar-dragging');
      document.removeEventListener('drag', onMove);
    });
  }

  _onTouchStart(e) {
    e.preventDefault();
  }

  attachedCallback() {
    if (!this.hasAttribute('_attached')) {
      this._attach();
    } else {
      this._content = this.parentNode.querySelector('.content');
    }

    this._content.addEventListener('scroll', this._boundOnScroll);
    this.updateScrollbar();

    if (this._draggable) {
      this._scroll.addEventListener('dragstart', this._boundOnDragStart);
      this._scroll.addEventListener('touchstart', this._onTouchStart);
    }
  }

  detachedCallback() {
    this._content.removeEventListener('scroll', this._boundOnScroll);
    this._scroll.removeEventListener('dragstart', this._boundOnDragStart);
    this._scroll.removeEventListener('touchstart', this._onTouchStart);
    this._timeout && clearTimeout(this._timeout);
  }

  attributeChangedCallback(name, last, current) {
    if (name === 'update-on-scroll') {
      this._updateOnScroll = current !== null;
    }
    if (name === 'height') {
      this._height = parseInt(current) || 0;
    }
    if (['draggable', 'autohide', 'hidden'].indexOf(name) !== -1) {
      this['_' + name] = current !== null;
    }
    this._content && this.updateScrollbar();
  }

}

window.OnsScrollbarElement = document.registerElement('ons-scrollbar', {
  prototype: ScrollbarElement.prototype
});
