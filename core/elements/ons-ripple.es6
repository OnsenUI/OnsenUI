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

(() => {
  'use strict';

  const scheme = {'': 'ripple--*'};
  const ModifierUtil = ons._internal.ModifierUtil;

  class RippleElement extends ons._BaseElement {

    createdCallback() {
      this.classList.add('ripple');
      this._updateTarget();
      this._updateCenter();
      this._compile();

      ModifierUtil.initModifier(this, scheme);
    }

    _compile() {
      this._wave = document.createElement('span');
      this._wave.classList.add('wave');
      this.insertBefore(this._wave, this.children[0]);

      if (this.hasAttribute('color')) {
        this._wave.style.background = this.getAttribute('color');
      }
    }

    _updateTarget() {
      if (this.hasAttribute('target') && this.getAttribute('target') === 'child') {
          this._target = this.children[0];
          this.style.display = 'inline-block';
          this.style.position = 'relative';
      } else {
        this._target = this.parentNode;
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
    }

    attributeChangedCallback(name, last, current) {
      if (name === 'modifier') {
        return ModifierUtil.onModifierChanged(last, current, this, scheme);
      }
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

    attachedCallback() {
      this._target.addEventListener('mousedown', this._onMouseDown.bind(this));
      this._target.addEventListener('touchstart', this._onMouseDown.bind(this));
    }

    detachedCallback() {
      this._target.removeEventListener('mousedown', this._onMouseDown.bind(this));
      this._target.removeEventListener('touchstart', this._onMouseDown.bind(this));
    }

    _onMouseDown(e) {
      const eventType = e.type;
      const wave = this._wave;
      let el = this._target;
      const pos = el.getBoundingClientRect();

      if (this._center) {
        wave.classList.remove('wave--done__center');
        wave.classList.remove('wave--animate__center');
      } else {
        wave.classList.remove('wave--done');
        wave.classList.remove('wave--animate');
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
              wave.classList.remove('wave--animate__center');
              wave.classList.add('wave--done__center');
            } else {
              wave.classList.remove('wave--animate');
              wave.classList.add('wave--done');
            }
          }
        );

      let x = e.clientX;
      let y = e.clientY;
      if (eventType === 'touchstart') {
        x = e.changedTouches[0].clientX;
        y = e.changedTouches[0].clientY;
      }

      const size = Math.max(el.offsetWidth, el.offsetHeight);

      if (wave !== null) {
        wave.style.width = size + 'px';
        wave.style.height = size + 'px';
      } else {
        throw new Error('Ripple effect error');
      }

      x = x - pos.left - size / 2;
      y = y - pos.top - size / 2;

      wave.style.left = x + 'px';
      wave.style.top = y + 'px';

      if (this._center) {
        wave.classList.add('wave--animate__center');
      } else {
        wave.classList.add('wave--animate');
      }
    }

    /**
    * Disable of enable fab.
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
     * True if fab is disabled.
     *
     * @return {Boolean}
     */
    isDisabled() {
      return this.hasAttribute('disabled');
    }

  }

  if (!window.OnsRippleElement) {
    window.OnsRippleElement = document.registerElement('ons-ripple', {
      prototype: RippleElement.prototype
    });
  }
})();
