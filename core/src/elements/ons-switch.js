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
// import GestureDetector from 'ons/gesture-detector';

const scheme = {
  '': 'switch--*',
  '.switch__input': 'switch--*__input',
  '.switch__handle': 'switch--*__handle',
  '.switch__toggle': 'switch--*__toggle'
};

const templateSource = util.createFragment(`
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
    this._checkbox.checked = value;
    if (this.checked) {
      this.setAttribute('checked', '');
    } else {
      this.removeAttribute('checked');
    }
    this._updateForCheckedAttribute();
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
      ModifierUtil.initModifier(this, scheme);

      this.setAttribute('_compiled', '');
    } else {
      this._checkbox = this.querySelector('input[type=checkbox]');
    }
    this._isMaterial = (this.getAttribute('modifier') || '').indexOf('material') != -1;

    this._updateForCheckedAttribute();
    this._updateForDisabledAttribute();
  }

  _updateForCheckedAttribute() {
    if (this.hasAttribute('checked')) {
      this._checkbox.checked = true;
    } else {
      this._checkbox.checked = false;
    }
  }

  _updateForDisabledAttribute() {
    if (this.hasAttribute('disabled')) {
      this._checkbox.setAttribute('disabled', '');
    } else {
      this._checkbox.removeAttribute('disabled');
    }
  }

  _compile() {
    this.classList.add('switch');
    this.appendChild(templateSource.cloneNode(true));

    this._checkbox = this.querySelector('input[type=checkbox]');
    this._checkbox.setAttribute('name', generateId());
    this._handle = this.querySelector('.switch__handle');
  }

  detachedCallback() {
    this._checkbox.removeEventListener('change', this._onChangeListener);
  }

  attachedCallback() {
    this._checkbox.addEventListener('change', this._onChangeListener);
    this.addEventListener('dragstart', this._onDragStartListener);
    this.addEventListener('tap', this._onTapListener);
  }

  _onChangeListener() {
    if (this.checked !== true) {
      this.removeAttribute('checked');
    } else {
      this.setAttribute('checked', '');
    }
  }

  _onTapListener(e) {
    if (!this.disabled) {
      this.checked = !this.checked;
    }
  }

  _onDragStartListener(e) {
    if (this.disabled || ['up', 'down'].indexOf(e.gesture.direction) != -1) {
      return;
    }
    this.classList.add('switch--active');
    var handle = this._handle;
    var startX = getX(e);
    var l = locations[this._isMaterial ? 'material' : 'ios'];
    var checked = this.checked >> 0;

    var onDrag = (e) => {
      e.gesture.srcEvent.preventDefault();
      var delta = getX(e) - startX;
      handle.style.left = Math.min(l[1], Math.max(l[0], l[checked] + delta * 1.2)) + 'px';
    };

    var onDragEnd = (e) => {
      var left = parseInt(handle.style.left);

      this.removeEventListener('drag', onDrag);
      document.removeEventListener('release', onDragEnd);

      handle.style.left = '';
      handle.style.transitionDuration = '0.35s';
      this.checked = left - l[0] > l[1] - left;
      this.classList.remove('switch--active');
    };

    handle.style.transitionDuration = '0s';
    this.addEventListener('drag', onDrag);
    document.addEventListener('release', onDragEnd);
  }


  attributeChangedCallback(name, last, current) {
    if (name === 'modifier') {
      return ModifierUtil.onModifierChanged(last, current, this, scheme);
    } else if (name === 'checked') {
      this._updateForCheckedAttribute();
    } else if (name === 'disabled') {
      this._updateForDisabledAttribute();
    }
  }
}

window.OnsSwitchElement = document.registerElement('ons-switch', {
  prototype: SwitchElement.prototype
});
