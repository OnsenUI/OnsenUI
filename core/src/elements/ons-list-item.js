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
    if (!this.hasAttribute('_compiled')) {
      ons._prepareAutoStyling(this);
      this._compile();

      this.setAttribute('_compiled', '');
    }

    this._gestureDetector = new GestureDetector(this);
  }

  _compile() {
    this.classList.add('list__item');

    if (this.getAttribute('effect') === 'ripple' && !util.findChild(this, 'ons-ripple')) {
        let ripple = document.createElement('ons-ripple');
        this.insertBefore(ripple, this.firstChild);

      if (this.querySelector('ons-input')) {
        ripple.setAttribute('target', 'autofind');
        let content = document.createElement('label');
        content.style.display = 'inherit';
        util.arrayFrom(this.childNodes).forEach(element => content.appendChild(element));
        this.appendChild(content);
      }
    }

    ModifierUtil.initModifier(this, scheme);
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

    this.tapped = false;
  }

  detachedCallback() {
    this.removeEventListener('drag', this._onDrag);

    this.removeEventListener('touchstart', this._onTouch);
    this.removeEventListener('mousedown', this._onTouch);
    this.removeEventListener('touchend', this._onRelease);
    this.removeEventListener('touchmove', this._onRelease);
    this.removeEventListener('touchcancel', this._onRelease);
    this.removeEventListener('mouseup', this._onRelease);
  }

  get _transition() {
    return 'background-color 0.0s linear 0.15s';
  }

  get _tappable() {
    return this.hasAttribute('tappable');
  }

  get _tapColor() {
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
    if (this.tapped) {
      return;
    }

    this.tapped = true;

    this.style.transition = this._transition;
    this.style.webkitTransition = this._transition;
    this.style.MozTransition = this._transition;

    if (this._tappable) {
      if (this.style.backgroundColor) {
        this._originalBackgroundColor = this.style.backgroundColor;
      }

      this.style.backgroundColor = this._tapColor;
    }
  }

  _onRelease() {
    this.tapped = false;

    this.style.transition = '';
    this.style.webkitTransition = '';
    this.style.MozTransition = '';

    this.style.backgroundColor = this._originalBackgroundColor || '';
  }

  _shouldLockOnDrag() {
    return this.hasAttribute('lock-on-drag');
  }
}

window.OnsListItemElement = document.registerElement('ons-list-item', {
  prototype: ListItemElement.prototype
});
