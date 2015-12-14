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
import ModifierUtil from 'ons/internal/modifier-util';
import BaseElement from 'ons/base-element';
import GestureDetector from 'ons/gesture-detector';

const scheme = {
  '': 'list__item--*',
  '.list__item__left': 'list__item--*__left',
  '.list__item__center': 'list__item--*__center',
  '.list__item__right': 'list__item--*__right',
  '.list__item__label': 'list__item--*__label',
  '.list__item__title': 'list__item--*__title',
  '.list__item__subtitle': 'list__item--*__subtitle',
  '.list__item__thumbnail': 'list__item--*__thumbnail',
  '.list__item__icon': 'list__item--*__icon'
};

class ListItemElement extends BaseElement {
  createdCallback() {
    this.classList.add('list__item');
    ModifierUtil.initModifier(this, scheme);

    this._gestureDetector = new GestureDetector(this);
    this._boundOnDrag = this._onDrag.bind(this);
  }

  attributeChangedCallback(name, last, current) {
    if (name === 'modifier') {
      return ModifierUtil.onModifierChanged(last, current, this, scheme);
    }
  }

  attachedCallback() {
    this.addEventListener('drag', this._boundOnDrag);
  }

  detachedCallback() {
    this.removeEventListener('drag', this._boundOnDrag);
  }

  _onDrag(event) {
    const gesture = event.gesture;
    // Prevent vertical scrolling if the users pans left or right.
    if (this._shouldLockOnDrag() && ['left', 'right'].indexOf(gesture.direction) > -1) {
      gesture.preventDefault();
    }
  }

  _shouldLockOnDrag() {
    return this.hasAttribute('lock-on-drag');
  }
}

window.OnsListItemElement = document.registerElement('ons-list-item', {
  prototype: ListItemElement.prototype
});
