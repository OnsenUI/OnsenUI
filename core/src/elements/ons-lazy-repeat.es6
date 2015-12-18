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

import ModifierUtil from 'ons/internal/modifier-util';
import BaseElement from 'ons/base-element';
import util from 'ons/util';
import {LazyRepeatDelegate, LazyRepeatProvider} from 'ons/internal/lazy-repeat';

class InternalDelegate extends LazyRepeatDelegate {

  /**
   * @param {Object} userDelegate
   * @param {Element/null} [templateElement]
   */
  constructor(userDelegate, templateElement = null) {
    super();
    this._userDelegate = userDelegate;

    if (templateElement instanceof Element || templateElement === null) {
      this._templateElement = templateElement;
    } else {
      throw new Error('templateElemenet parameter must be an instance of Element or null.');
    }
  }

  prepareItem(index, done) {
    const content = this._userDelegate.createItemContent(index, this._templateElement);
    
    if (!(content instanceof Element)) {
      throw new Error('createItemContent() must return an instance of Element.');
    }

    done({
      element: content
    });
  }

  countItems() {
    const count = this._userDelegate.countItems();
    
    if (typeof count !== 'number') {
      throw new Error('countItems() must return number.');
    }

    return count;
  }

  updateItem(index, item) {
    if (this._userDelegate.updateItemContent instanceof Function) {
      this._userDelegate.updateItemContent(index, item);
    }
  }

  calculateItemHeight(index) {
    const height = this._userDelegate.calculateItemHeight(index);

    if (typeof height !== 'number') {
      throw new Error('calculateItemHeight() must return number.');
    }

    return height;
  }

  destroyItem(index, item) {
    if (this._userDelegate.destroyItem instanceof Function) {
      this._userDelegate.destroyItem(index, item);
    }
  }

  destroy() {
    if (this._userDelegate.destroy instanceof Function) {
      this._userDelegate.destroy();
    }
  }
}

class LazyRepeatElement extends BaseElement {

  createdCallback() {
    this.style.display = 'none';
  }

  attributeChangedCallback(name, last, current) {
  }

  attachedCallback() {
    if (this.hasAttribute('delegate')) {
      const delegate = new InternalDelegate(this._getUserDelegate(), this._getTemplateElement());
      this._lazyRepeatProvider = new LazyRepeatProvider(this.parentElement, delegate);
    }
  }

  _getTemplateElement() {
    if (this.children[0] && !this._templateElement) {
      this._templateElement = this.removeChild(this.children[0]);
    } 

    return this._templateElement || null;
  }

  _getUserDelegate() {
    const name = this.getAttribute('delegate') || this.getAttribute('ons-lazy-repeat');;

    if (window[name]) {
      return window[name];
    } else {
      return null;
    }
  }

  detachedCallback() {
    this._lazyRepeatProvider = null;
  }

  refresh() {
    if (this._lazyRepeatProvider) {
      this._lazyRepeatProvider.refresh();
    }
  }

  /**
   * @param {Object} delegate
   */
  setDelegate(userDelegate) {
    if (this._lazyRepeatProvider) {
      this._lazyRepeatProvider.destroy();
    }

    const delegate = new InternalDelegate(userDelegate, this._getTemplateElement());
    this._lazyRepeatProvider = new LazyRepeatProvider(this.parentElement, delegate);
  }

  set delegate(userDelegate) {
    this.setDelegate(userDelegate);
  }
}

window.OnsLazyRepeatElement = document.registerElement('ons-lazy-repeat', {
  prototype: LazyRepeatElement.prototype
});

