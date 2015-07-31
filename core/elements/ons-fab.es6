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

  const scheme = {'': 'fab--*'};
  const ModifierUtil = ons._internal.ModifierUtil;

  class FabElement extends ons._BaseElement {

    createdCallback() {
      var shown = false;
      this.classList.add('fab');
      this._boundOnClick = this._onClick.bind(this);
      ModifierUtil.initModifier(this, scheme);

      this._updatePosition();
    }

    attributeChangedCallback(name, last, current) {
      if (name === 'modifier') {
        return ModifierUtil.onModifierChanged(last, current, this, scheme);
      }
      if (name === 'position') {
        this._updatePosition();
      }
    }

    _updatePosition() {
      let position = this.getAttribute('position');
      this.classList.remove(
        'fab--top__left', 
        'fab--bottom__right', 
        'fab--bottom__left', 
        'fab--top__right', 
        'fab--top__center', 
        'fab--bottom__center');
      switch(position) {
        case 'top right':
        case 'right top':
          this.classList.add('fab--top__right');
          break;
        case 'top left':
        case 'left top':
          this.classList.add('fab--top__left');
          break;
        case 'bottom right':
        case 'right bottom':
          this.classList.add('fab--bottom__right');
          break;
        case 'bottom left':
        case 'left bottom':
          this.classList.add('fab--bottom__left');
          break;
        case 'center top':
        case 'top center':
          this.classList.add('fab--top__center');
          break;
        case 'center bottom':
        case 'bottom center':
          this.classList.add('fab--bottom__center');
          break;
        default:
          break;
      }
    }

    attachedCallback() {
      this.addEventListener('click', this._boundOnClick, false);
    }

    show() {
      this.style.transform = 'scale(1)';
    }

    hide() {
      if (this.shown) {
        this.hideItems();
        setTimeout(() => {
          this.style.transform = 'scale(0)';
        }, 300);
      } else {
        this.style.transform = 'scale(0)';
      }
    }

    showItems() {
      if (!this.shown) {
        for (var i = 1; i < this.children.length; i++) {
          this.children[i].style.transform = 'scale(1)';
          this.children[i].style.transitionDelay = 25 * i + 'ms';
        }
        this.shown = true;
      }
    }

    hideItems() {
      if (this.shown) {
        for (var i = 1; i < this.children.length; i++) {
          this.children[i].style.transform = 'scale(0)';
          this.children[i].style.transitionDelay = 25 * (this.children.length - i) + 'ms';
        }
        this.shown = false;
      }
    }

    _onClick(e) {
      if (e.target.classList.contains('fab__icon') || e.target.parentNode.classList.contains('fab__icon')) {
        if (ons._util.findChild(this, '.fab__item')) {
          if (!this.shown) {
            this.showItems();
          } else {
            this.hideItems();
          }
        }
      }
    }

    isShown() {
    }

    isItemShown() {
      return this.shown;
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

  if (!window.OnsFabElement) {
    window.OnsFabElement = document.registerElement('ons-fab', {
      prototype: FabElement.prototype
    });
  }
})();
