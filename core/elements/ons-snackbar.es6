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

  const scheme = {'': 'snackbar--*'};
  const ModifierUtil = ons._internal.ModifierUtil;

  class SnackbarElement extends ons._BaseElement {

    createdCallback() {
      this._shown = false;
      this.classList.add('snackbar');

      ModifierUtil.initModifier(this, scheme);
      this._boundOnResize = this._onResize.bind(this);
      this._boundOnDrag = this._onDrag.bind(this);
      this._boundOnDragStart = this._onDragStart.bind(this);
      this._boundOnDragEnd = this._onDragEnd.bind(this);
      this._boundOnClick = this._onButtonClick;
      this._boundOnAnimation = this._onAnimationEnd.bind(this);

      const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function( callback ){ window.setTimeout(callback, 1000 / 60);
          };
      window.requestAnimationFrame = requestAnimationFrame;

      this._compile();
    }

    _onDrag(event) {
      if (!this.isSwipeable() || !this.isShown()) {
        return;
      }

      if (event.gesture.direction === 'up' || event.gesture.direction === 'down') {
        return;
      }

      this._transitionDragLength = event.gesture.deltaX;
      this.style.left = this._newLeft + this._transitionDragLength + 'px';
    }

    _onDragStart(event) {
      if (!this.isSwipeable() || !this.isShown()) {
        return;
      }
      this.show();
      this.pauseTimer();
    }

    _onDragEnd(event) {
      if (!this.isSwipeable() || !this.isShown()) {
        return;
      }

      if (Math.abs(this._transitionDragLength) > Math.abs(this.offsetWidth / 2)) {
        this._hideSwipe();
      } else {
        this._animate();
        this.resumeTimer();
      }
    }

    _animate() {
      const left = parseInt(this.style.left, 10);
      if (Math.abs(left - this._newLeft) > 10) {
        // animate
        if (this._transitionDragLength >= 0) {
          this.style.left = left - 10 + 'px';
        } else {
          this.style.left = left + 10 + 'px';
        }
        window.requestAnimationFrame(this._animate.bind(this));
      } else {
        this._updateWidth();
      }
    }

    _onButtonClick(event) {
      event.stopPropagation();
    }

    _createEventListeners() {
      this._gestureDetector = new ons.GestureDetector(this, {
        dragMinDistance: 1,
        dragDistanceCorrection: false
      });

      this._gestureDetector.on('drag', this._boundOnDrag);
      this._gestureDetector.on('dragstart', this._boundOnDragStart);
      this._gestureDetector.on('dragend', this._boundOnDragEnd);

      window.addEventListener('resize', this._boundOnResize);

      ons._util.arrayFrom(this._getSnackbarItem('snackbar__right')).forEach(element => {
        element._gestureDetector = new ons.GestureDetector(element);
        element._gestureDetector.on('drag', this._boundOnClick);
      });
    }

    _destroyEventListeners() {
      this._gestureDetector.off('drag', this._boundOnDrag);
      this._gestureDetector.off('dragstart', this._boundOnDragStart);
      this._gestureDetector.off('dragend', this._boundOnDragEnd);

      this._gestureDetector.dispose();
      this._gestureDetector = null;

      window.removeEventListener('resize', this._boundOnResize);

      ons._util.arrayFrom(this._getSnackbarItem('snackbar__right')).forEach(element => {
        element._gestureDetector = new ons.GestureDetector(element);
        element._gestureDetector.off('drag', this._boundOnClick);
      });
    }

    setSwipeable(swipeable) {
      if (swipeable) {
        this.setAttribute('swipeable', '');
      } else {
        this.removeAttribute('swipeable');
      }
    }

    isSwipeable() {
      return this.hasAttribute('swipeable');
    }

    attributeChangedCallback(name, last, current) {
      if (name === 'modifier') {
        return ModifierUtil.onModifierChanged(last, current, this, scheme);
      } else if (name === 'max-width') {
        this._updateWidth(current);
      } else if (name === 'duration') {
        if (current) {
          this._duration = current;
        } else {
          this._duration = 0;
        }
      }
    }

    attachedCallback() {
      this.style.bottom = '-' + this.offsetHeight + 'px';
      this._createEventListeners();
    }

    detachedCallback() {
      this._destroyEventListeners();
    }

    show() {
      this._updateWidth();
      this.style.visibility = 'visible';
      this._remaining = this._duration || 3000;
      this.style.transition = 'transform 0.4s ease-out';
      this.style.webkitTransition = '-webkit-transform 0.4s ease-out';
      this.style.transform = 'translate3d(0, -100%, 0)';
      this.style.webkitTransform = 'translate3d(0, -100%, 0)';
      this._shown = true;
      this.resumeTimer();
    }

    hide() {
      this.style.transform = 'translate3d(0, 0, 0)';
      this.style.webkitTransform = 'translate3d(0, 0, 0)';
      this._shown = false;
    }

    _onAnimationEnd(e) {
      this.style.visibility = 'hidden';
      this.style.transition = 'none';
      this.style.webkitTransition = 'none';
      this.hide();
      this.removeEventListener('webkitTransitionEnd', this._boundOnAnimation);
      this.removeEventListener('transitionend', this._boundOnAnimation);
    }

    _hideSwipe() {
      this.addEventListener('webkitTransitionEnd', this._boundOnAnimation);
      this.addEventListener('transitionend', this._boundOnAnimation);

      if (this._transitionDragLength >= 0) {
        this.style.transform = 'translate3d(' + window.innerWidth + 'px, -100%, 0)';
        this.style.webkitTransform = 'translate3d(' + window.innerWidth + 'px, -100%, 0)';
      } else {
        this.style.transform = 'translate3d(-' + window.innerWidth + 'px, -100%, 0)';
        this.style.webkitTransform = 'translate3d(-' + window.innerWidth + 'px, -100%, 0)';
      }
      this._shown = false;
    }

    isShown() {
      return this._shown;
    }

    pauseTimer() {
      clearTimeout(this._timerId);
      this._remaining -= new Date() - this._start;
    }

    resumeTimer() {
      this._start = new Date();
      clearTimeout(this._timerId);
      this._timerId = setTimeout(this.hide.bind(this), this._remaining);
    }

    _onResize() {
      this._updateWidth();
    }

    _updateWidth() {
      if (this.hasAttribute('max-width') && window.innerWidth > parseInt(this.getAttribute('max-width'))) {
        let width = this.getAttribute('max-width');
        let newWidth = parseInt(this.getAttribute('max-width'));
        this._newLeft;
        if (width.indexOf('px')) {
          this._newLeft = (window.innerWidth - newWidth) / 2;
          this.style.maxWidth = newWidth + 'px';
          this.style.left = this._newLeft + 'px';
        } else if (width.indexOf('%')) {
          this._newLeft = (100 - newWidth) / 2;
          this.style.maxWidth = newWidth + '%';
          this.style.left = this._newLeft + '%';
        } else {
          throw new Error('Width attribute must be a percentage or pixel.');
        }
      } else {
        this._newLeft = 0;
        this.style.width = '100%';
        this.style.maxWidth = '100%';
        this.style.left = '0px';
      }
    }

    _compile() {
      this._setSnackbarItem('right');
      this._updateWidth();
      const wrapper = document.createElement('div');
      wrapper.classList.add('snackbar__content');

      let node = this.childNodes[0];
      this.removeChild(node);
      wrapper.insertBefore(node, null);
      this.insertBefore(wrapper, this.firstChild);
      if (this.hasAttribute('duration')) {
        this._duration = this.getAttribute('duration');
      } else {
        this._duration = 0;
      }
    }

    _setSnackbarItem(name) {
      ons._util.arrayFrom(this.querySelectorAll('.' + name)).forEach(element => {
        element.classList.remove(name);
        element.classList.add('snackbar__' + name);
      });
    }

    _getSnackbarItem(name) {
      let children = this.querySelectorAll('.' + name);
      return children;
    }
  }

  if (!window.OnsSnackbarElement) {
    window.OnsSnackbarElement = document.registerElement('ons-snackbar', {
      prototype: SnackbarElement.prototype
    });
  }
})();
