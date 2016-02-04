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
import GestureDetector from 'ons/gesture-detector';
import AnimatorJS from './animator-js';
import AnimatorCSS from './animator-css';

var Animator = [AnimatorJS, AnimatorCSS][1];

class RippleElement extends BaseElement {

  createdCallback() {
    this.classList.add('ripple');
    if (this.hasAttribute('_compiled')) {
      ['_wave', '_background'].forEach(e => {
        this[e] = this.getElementsByClassName('ripple_' + e)[0];
      });
    } else {
      this._compile();
    }

    this._animator = new Animator();
    this._gestureDetector = new GestureDetector(this, {holdTimeout: 300});

    ['color', 'target', 'center', 'start-radius', 'background'].forEach(e => {
      this.attributeChangedCallback(e, null, this.getAttribute(e));
    });
  }


  _compile() {
    ['_wave', '_background'].forEach(e => {
      this[e] = document.createElement('div');
      this[e].classList.add('ripple_' + e);
      this.appendChild(this[e]);
    });
    this.setAttribute('_compiled', '');
  }

  _calculateCoords(e) {
    var x, y, h, w, r;
    var b = this.getBoundingClientRect();
    if (this._center) {
      x = b.width / 2;
      y = b.height / 2;
      r = Math.sqrt(x * x + y * y);
    } else {
      x = (e.clientX || e.changedTouches[0].clientX) - b.left;
      y = (e.clientY || e.changedTouches[0].clientY) - b.top;
      h = Math.max(y, b.height - y);
      w = Math.max(x, b.width - x);
      r = Math.sqrt(h * h + w * w);
    }
    return {x, y, r};
  }


  _rippleAnimation(e, duration = 300) {
    var
      {_animator, _wave, _background, _minR} = this,
      {x, y, r} = this._calculateCoords(e);

    _animator.stopAll({stopNext: 1});
    _animator.animate(_background, {opacity: 1}, duration);

    util.extend(_wave.style, {
      opacity: 1,
      top: y - _minR + 'px',
      left: x - _minR + 'px',
      width: 2 * _minR + 'px',
      height: 2 * _minR + 'px'
    });

    return _animator.animate(_wave, {
      // opacity: 1,
      top: y - r,
      left: x - r,
      height: 2 * r,
      width: 2 * r
    }, duration);
  }


  _onTap(e){
    if (!this.isDisabled()) {
      this._rippleAnimation(e.gesture.srcEvent).then(() => {
        this._animator.fade(this._wave);
        this._animator.fade(this._background);
      });
    }
  }


  _onHold(e){
    if (!this.isDisabled()) {
      this._holding = this._rippleAnimation(e.gesture.srcEvent, 2000);

      this._gestureDetector.on('release', this._onRelease);
    }
  }


  _onRelease(e){
    this._holding.speed(300).then(() => {
      this._animator.stopAll({stopNext: true});
      this._animator.fade(this._wave);
      this._animator.fade(this._background);
    });

    this._holding = false;
    this._gestureDetector.off('release', this._onRelease);
  }


  _onDragStart(e) {
    if (this._holding) {
      return this._onRelease(e);
    }
    if (['left', 'right'].indexOf(e.gesture.direction) != -1) {
      this._onTap(e);
    }
  }


  attachedCallback() {
    if (window.getComputedStyle(this.parentNode).getPropertyValue('position') == 'static') {
      this.parentNode.style.position = 'relative';
    }

    if (ons._config.animationsDisabled) {
      this.setDisabled(true);
    } else {
      this._gestureDetector.on('tap', this._onTap);
      this._gestureDetector.on('hold', this._onHold);
      this._gestureDetector.on('dragstart', this._onDragStart);
    }
  }


  detachedCallback() {
    this._gestureDetector.off('tap', this._onTap);
    this._gestureDetector.off('hold', this._onHold);
    this._gestureDetector.off('dragstart', this._onDragStart);
  }


  attributeChangedCallback(name, last, current) {
    if (name == 'start-radius') {
      this._minR = Math.max(0, parseFloat(current) || 0);
    }
    if (name == 'color' && current) {
      this._wave.style.background = current;
      if (!this.hasAttribute('background')) {
        this._background.style.background = current;
      }
    }
    if (name == 'background' && (current || last)) {
      if (current == 'none') {
        this._background.setAttribute('disabled', 'disabled');
        this._background.style.background = 'transparent';
      } else {
        if (this._background.hasAttribute('disabled')) {
          this._background.removeAttribute('disabled');
        }
        this._background.style.background = current;
      }
    }
    if (name == 'center') {
      this._center = current != null && current != 'false';
    }
  }


  /**
  * Disable or enable ripple-effect.
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
   * True if either ripple-effect is disabled.
   *
   * @return {Boolean}
   */
  isDisabled() {
    return this.hasAttribute('disabled');// || this.parentNode.hasAttribute('disabled');
  }

}

window.OnsRippleElement = document.registerElement('ons-ripple', {
  prototype: RippleElement.prototype
});
