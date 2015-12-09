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

class RippleElement extends BaseElement {

  createdCallback() {
    this.classList.add('ripple');
    this._compile();

    this._boundOnClick = this._onMouseDown.bind(this);
  }

  _compile() {
    this._wave = document.createElement('span');
    this._wave.classList.add('ripple__wave');
    this.insertBefore(this._wave, this.children[0]);

    if (this.hasAttribute('color')) {
      this._wave.style.background = this.getAttribute('color');
    }
  }

  _updateTarget() {
    if (this.hasAttribute('target') && this.getAttribute('target') === 'children') {
      this._target = this;
      this.style.display = 'inline-block';
      this.style.position = 'relative';
    } else {
      this._target = this.parentNode;
      if (window.getComputedStyle(this._target).getPropertyValue('position') === 'static') {
        this._target.style.position = 'relative';
      }
      this.style.display = 'block';
      this.style.position = 'absolute';
    }
  }

  _updateCenter() {
    if (this.hasAttribute('center')) {
      this._center = true;
    } else {
      this._center = false;
    }
    this._wave.classList.remove('ripple__wave--done-center');
    this._wave.classList.remove('ripple__wave--animate-center');
    this._wave.classList.remove('ripple__wave--done');
    this._wave.classList.remove('ripple__wave--animate');
  }

  attributeChangedCallback(name, last, current) {
    if (name === 'target') {
      this._updateTarget();
    }
    if (name === 'color') {
      this._wave.style.background = current;
    }
    if (name === 'center') {
      this._updateCenter();
    }
  }

  _isTouchDevice() {
    return 'ontouchstart' in window || 'onmsgesturechange' in window;
  }

  _addListener() {
    if (this._isTouchDevice()) {
      this.addEventListener('touchstart', this._boundOnClick);
    }
    else {
      this.addEventListener('mousedown', this._boundOnClick);
    }
  }

  _removeListener() {
    if (this._isTouchDevice()) {
      this.removeEventListener('touchstart', this._boundOnClick);
    }
    else {
      this.removeEventListener('mousedown', this._boundOnClick);
    }
  }

  attachedCallback() {
    this._updateCenter();
    this._updateTarget();
    this._addListener();
  }

  detachedCallback() {
    this._removeListener();
  }

  _onMouseDown(e) {
    const eventType = e.type;
    const wave = this._wave;
    const el = this._target;
    const pos = el.getBoundingClientRect();

    if (this.isDisabled()) {
      return;
    }

    if (this._center) {
      wave.classList.remove('ripple__wave--done-center');
      wave.classList.remove('ripple__wave--animate-center');
    } else {
      wave.classList.remove('ripple__wave--done');
      wave.classList.remove('ripple__wave--animate');
    }

    let animationEnded = new Promise((resolve) => {
      let onAnimationEnd = () => {
        this.removeEventListener('webkitAnimationEnd', onAnimationEnd);
        this.removeEventListener('animationend', onAnimationEnd);
        resolve();
      };

      this.addEventListener('webkitAnimationEnd', onAnimationEnd);
      this.addEventListener('animationend', onAnimationEnd);
    });

    let mouseReleased = new Promise((resolve) => {
      let onMouseUp = () => {
        document.removeEventListener('webkitAnimationEnd', onMouseUp);
        document.removeEventListener('animationend', onMouseUp);
        resolve();
      };

      document.addEventListener('mouseup', onMouseUp);
      document.addEventListener('touchend', onMouseUp);
    });

    Promise.all([animationEnded, mouseReleased])
      .then(
        () => {
          if (this._center) {
            wave.classList.remove('ripple__wave--animate-center');
            wave.classList.add('ripple__wave--done-center');
          } else {
            wave.classList.remove('ripple__wave--animate');
            wave.classList.add('ripple__wave--done');
          }
        }
      );

    let x = e.clientX;
    let y = e.clientY;
    if (eventType === 'touchstart') {
      x = e.changedTouches[0].clientX;
      y = e.changedTouches[0].clientY;
    }

    let sizeX, sizeY = 0;

    if (!this._center) {
      sizeX = sizeY = Math.max(el.offsetWidth, el.offsetHeight);
    } else {
      sizeX = el.offsetWidth;
      sizeY = el.offsetHeight;
      sizeX = sizeX - parseFloat(window.getComputedStyle(el, null).getPropertyValue('border-left-width')) - parseFloat(window.getComputedStyle(el, null).getPropertyValue('border-right-width'));
      sizeY = sizeY - parseFloat(window.getComputedStyle(el, null).getPropertyValue('border-top-width')) - parseFloat(window.getComputedStyle(el, null).getPropertyValue('border-bottom-width'));
    }

    wave.style.width = sizeX + 'px';
    wave.style.height = sizeY + 'px';

    x = x - pos.left - sizeX / 2;
    y = y - pos.top - sizeY / 2;

    wave.style.left = x + 'px';
    wave.style.top = y + 'px';

    if (this._center) {
      wave.classList.add('ripple__wave--animate-center');
    } else {
      wave.classList.add('ripple__wave--animate');
    }
  }

  /**
  * Disable of enable ripple-effect.
  *
  * @param {Boolean}
  */
  setDisabled(disabled) {
    if (typeof disabled !== 'boolean') {
      throw new Error('Argument must be a boolean.');
    }
    if (disabled) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  /**
   * True if ripple-effect is disabled.
   *
   * @return {Boolean}
   */
  isDisabled() {
    return this.hasAttribute('disabled');
  }

}

window.OnsRippleElement = document.registerElement('ons-ripple', {
  prototype: RippleElement.prototype
});
