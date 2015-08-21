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

  const scheme = {'': 'tooltip--*'};
  const ModifierUtil = ons._internal.ModifierUtil;

  class TooltipElement extends ons._BaseElement {

    createdCallback() {
      this.classList.add('tooltip');
      this.style.opacity = '0';
      this.style.visibility = 'hidden';
      this._shown = false;
      this._boundOnMouseOver = this._onMouseOver.bind(this);
      this._boundOnMouseLeave = this._onMouseLeave.bind(this);
      this._boundOnFocus = this._onFocus.bind(this);
      this._boundOnBlur = this._onBlur.bind(this);
      this._boundOnTouchStart = this._onTouchStart.bind(this);
      this._boundOnTouchEnd = this._onTouchEnd.bind(this);
      this._boundOnTouchMove = this._onTouchMove.bind(this);
      this._boundOnAnimation = this._onAnimationEnd.bind(this);

      ModifierUtil.initModifier(this, scheme);
    }

    attributeChangedCallback(name, last, current) {
      if (name === 'modifier') {
        return ModifierUtil.onModifierChanged(last, current, this, scheme);
      }
    }

    _onMouseOver(e) {
      if (this._hasEvent('hover')) {
        this.show();
      }
    }

    _onMouseLeave(e) {
      if (this._hasEvent('hover')) {
        this.hide();
      }
    }

    _onFocus(e) {
      if (this._hasEvent('focus')) {
        this.show();
      }
    }

    _onBlur(e) {
      if (this._hasEvent('focus')) {
        this.hide();
      }
    }

    show(options) {
      this._shown = true;
      this._setTooltipPosition();
      this.style.opacity = '0.9';
      this.style.visibility = 'visible';
    }

    hide(options) {
      this._shown = false;
      this.style.opacity = '0';
      this.addEventListener('webkitTransitionEnd', this._boundOnAnimation);
      this.addEventListener('transitionend', this._boundOnAnimation);
    }

    _setTooltipPosition() {
      const rect = this._target.getBoundingClientRect();
      this.style.top = this._target.offsetTop + this._target.offsetHeight + 'px';
      this.style.left = this._target.offsetLeft + (this._target.offsetWidth - this.offsetWidth) / 2 + 'px';
    }

    _onTouchStart(e) {
      if (this._hasEvent('touch')) {
        this._timer = setTimeout(this.show.bind(this), 500);
        this._pixelMoved = 0;
      }
    }

    _onTouchEnd(e) {
      if (this._hasEvent('touch') && this.isShown()) {
        this.hide();
      }
      if (this._timer) {
        clearTimeout(this._timer);
      }
    }

    _onTouchMove(e) {
      if (this._hasEvent('touch')) {
        this._pixelMoved++;
        if (this._pixelMoved > 30 && this.isShown()) {
          this.hide();
        }
      }
    }

    _onAnimationEnd(e) {
      this.style.visibility = 'hidden';
      this.removeEventListener('webkitTransitionEnd', this._boundOnAnimation);
      this.removeEventListener('transitionend', this._boundOnAnimation);
    }

    _createEventListeners() {
      this._target.addEventListener('mouseover', this._boundOnMouseOver);
      this._target.addEventListener('mouseleave', this._boundOnMouseLeave);

      this._target.addEventListener('focus', this._boundOnFocus);
      this._target.addEventListener('blur', this._boundOnBlur);

      this._target.addEventListener('touchstart', this._boundOnTouchStart);
      this._target.addEventListener('touchend', this._boundOnTouchEnd);
      this._target.addEventListener('touchmove', this._boundOnTouchMove);
    }

    _destroyEventListeners() {
      this._target.removeEventListener('mouseover', this._boundOnHover);
      this._target.removeEventListener('mouseleave', this._boundOnMouseLeave);

      this._target.removeEventListener('focus', this._boundOnFocus);
      this._target.removeEventListener('blur', this._boundOnBlur);

      this._target.removeEventListener('touchstart', this._boundOnTouchStart);
      this._target.removeEventListener('touchend', this._boundOnTouchEnd);
      this._target.removeEventListener('touchmove', this._boundOnTouchMove);
    }

    _setTarget() {
      if (this.hasAttribute('target')) {
        switch (this.getAttribute('target')) {
          case 'nextSibling':
            this._target = this.nextElementSibling;
            break;
          case 'prevSibling':
            this._target = this.previousElementSibling;
            break;
          default:
            this._target = this.parentNode;
            break;
        }
      } else {
        this._target = this.parentNode;
      }
    }

    isShown() {
      return this._shown;
    }

    getTargetElement() {
      return this._target;
    }

    _hasEvent(event) {
      const events = this.hasAttribute('on') ? this.getAttribute('on').split(/\s+/) : 'hover focus touch'.split(/\s+/);
      for (var i = 0; i < events.length; i++) {
        if (event === events[i]) {
          return true;
        }
      }
      return false;
    }

    attachedCallback() {
      this._shown = false;
      this._setTarget();
      this._setTooltipPosition();
      this._hasEvent('');
      this._createEventListeners();
    }

    detachedCallback() {
      this._destroyEventListeners();
    }
  }

  if (!window.OnsTooltipElement) {
    window.OnsTooltipElement = document.registerElement('ons-tooltip', {
      prototype: TooltipElement.prototype
    });
  }
})();
