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

const scheme = {'': 'list__item--*'};

class ListItemElement extends BaseElement {
  createdCallback() {
    this.classList.add('list__item');
    ModifierUtil.initModifier(this, scheme);

    this._gestureDetector = new GestureDetector(this);
  }

  attributeChangedCallback(name, last, current) {
    if (name === 'modifier') {
      return ModifierUtil.onModifierChanged(last, current, this, scheme);
    }
  }

  attachedCallback() {
    this.addEventListener('drag', this._onDrag);
    this.addEventListener('touchstart', this._onTouch);
    this.addEventListener('mousedown', this._onTouch);
    this.addEventListener('touchend', this._onRelease);
    this.addEventListener('touchmove', this._onRelease);
    this.addEventListener('touchcancel', this._onRelease);
    this.addEventListener('mouseup', this._onRelease);

    this._originalBackgroundColor = this.style.backgroundColor;

    this.style.transition = this.transition;
    this.style.webkitTransition = this.transition;
    this.style.MozTransition = this.transition;
  }

  detachedCallback() {
    this.removeEventListener('drag', this._onDrag);
    this.removeEventListener('touchstart', this._onTouch);
    this.removeEventListener('touchstart', this._onRelease);
    this.removeEventListener('touchstart', this._onRelease);
  }

  get transition() {
    return 'background-color 0.0s linear 0.15s';
  }

  get tappable() {
    return this.hasAttribute('tappable');
  }

  get tapColor() {
    return this.getAttribute('tappable') || '#d9d9d9';
  }

  _onDrag(event) {
    const gesture = event.gesture;
    // Prevent vertical scrolling if the users pans left or right.
    if (this._shouldLockOnDrag() && ['left', 'right'].indexOf(gesture.direction) > -1) {
      gesture.preventDefault();
    }
  }

  _onTouch() {
    if (this.tappable) {
      if (this.style.backgroundColor) {
        this._originalBackgroundColor = this.style.backgroundColor;
      }

      this.style.backgroundColor = this.tapColor;
    }
  }

  _onRelease() {
    this.style.backgroundColor = this._originalBackgroundColor || '';
  }

  _shouldLockOnDrag() {
    return this.hasAttribute('lock-on-drag');
  }
}

window.OnsListItemElement = document.registerElement('ons-list-item', {
  prototype: ListItemElement.prototype
});
