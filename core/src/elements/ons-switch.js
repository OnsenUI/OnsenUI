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
  '': 'switch--*',
  '.switch__input': 'switch--*__input',
  '.switch__handle': 'switch--*__handle',
  '.switch__toggle': 'switch--*__toggle'
};

const template = util.createFragment(`
  <input type="checkbox" class="switch__input">
  <div class="switch__toggle">
    <div class="switch__handle"></div>
  </div>
`);

const generateId = (() => {
  let i = 0;
  return () => 'ons-switch-id-' + (i++);
})();

const locations = {
  ios: [1, 21],
  material: [0, 16]
};

const getX = (e) => {
  if (e.gesture) {
    e = e.gesture.srcEvent;
  }
  return e.clientX || e.changedTouches[0].clientX;
};

class SwitchElement extends BaseElement {

  get checked() {
    return this._checkbox.checked;
  }

  set checked(value) {
    if (!!value != this._checkbox.checked) {
      this._checkbox.click();
      this._checkbox.checked = !!value;
      if (this.checked) {
        this.setAttribute('checked', '');
      } else {
        this.removeAttribute('checked');
      }
    }
  }

  get disabled() {
    return this._checkbox.disabled;
  }

  set disabled(value) {
    this._checkbox.disabled = value;
    if (this.disabled) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  /**
   * @return {Boolean}
   */
  isChecked() {
    return this.checked;
  }

  /**
   * @param {Boolean}
   */
  setChecked(isChecked) {
    this.checked = !!isChecked;
  }

  /**
   * @return {HTMLElement}
   */
  getCheckboxElement() {
    return this._checkbox;
  }

  createdCallback() {
    if (!this.hasAttribute('_compiled')) {
      this._compile();
    }
    this._checkbox = this.querySelector('input[type=checkbox]');
    this._handle = this.querySelector('.switch__handle');

    ['checked', 'disabled', 'modifier', 'name'].forEach(e => {
      this.attributeChangedCallback(e, null, this.getAttribute(e));
    });
  }

  _compile() {
    this.classList.add('switch');
    this.appendChild(template.cloneNode(true));
    this.setAttribute('name', generateId());
    this.setAttribute('_compiled', '');
  }

  detachedCallback() {
    this._checkbox.removeEventListener('change', this._onChange);
    this.removeEventListener('dragstart', this._onDragStart);
    this.removeEventListener('tap', this.click);
  }

  attachedCallback() {
    this._checkbox.addEventListener('change', this._onChange);
    this._gestureDetector = new GestureDetector(this);
    this.addEventListener('dragstart', this._onDragStart);
    this.addEventListener('tap', this.click);
  }

  _onChange() {
    if (this.checked) {
      this.parentNode.setAttribute('checked', '');
    } else {
      this.parentNode.removeAttribute('checked');
    }
  }

  click() {
    if (!this.disabled) {
      this.checked = !this.checked;
    }
  }

  _onDragStart(e) {
    this.classList.add('switch--active');
    var startX = getX(e);
    var l = locations[this._isMaterial ? 'material' : 'ios'];

    var onDrag = (e) => {
      e.gesture.srcEvent.preventDefault();
      var position = l[this.checked] + getX(e) - startX;
      this._handle.style.left = Math.min(l[1], Math.max(l[0], position)) + 'px';
    };

    var onDragEnd = (e) => {
      this.removeEventListener('drag', onDrag);
      document.removeEventListener('release', onDragEnd);

      this.checked = parseInt(this._handle.style.left) > (l[0] + l[1]) / 2;
      this._handle.style.left = '';
      this.classList.remove('switch--active');
    };

    this.addEventListener('drag', onDrag);
    document.addEventListener('release', onDragEnd);
  }


  attributeChangedCallback(name, last, current) {
    switch(name) {
    case 'modifier':
      this._isMaterial = (current || '').indexOf('material') !== -1;
      ModifierUtil.onModifierChanged(last, current, this, scheme);
      break;
    case 'name':
      this._checkbox.setAttribute(name, current || generateId());
      break;
    case 'checked':
      this._checkbox.checked = current !== null;
    case 'disabled':
      if (current !== null) {
        this._checkbox.setAttribute(name, '');
      } else {
        this._checkbox.removeAttribute(name);
      }
    }
  }
}

window.OnsSwitchElement = document.registerElement('ons-switch', {
  prototype: SwitchElement.prototype
});
