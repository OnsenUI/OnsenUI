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

  const scheme = {
    '': 'fab--*',
    '.fab__icon': 'fab__icon--*'
  };
  const ModifierUtil = ons._internal.ModifierUtil;
  const RippleEffect = ons._internal.RippleEffect;

  class FabElement extends ons._BaseElement {

    createdCallback() {
      this._compile();
      this._shown = false;
      this._boundOnClick = this._onClick.bind(this);
      ModifierUtil.initModifier(this, scheme);
      this.classList.add('fab');

      this._updatePosition();
      if (this.hasAttribute('material')) {
        this._addRippleEffect();
      }

    }

    _compile() {
      var content = document.createElement('span');
      content.classList.add('fab__icon');

      const children = ons._util.arrayFrom(this.childNodes);

      for (let i = 0; i < children.length; i++) {
        let child = children[i];
        if (child.nodeName.toLowerCase() !== 'ons-fab-item') {
          content.appendChild(child);
        }
      }

      this.insertBefore(content, this.firstChild);
    }

    attributeChangedCallback(name, last, current) {
      if (name === 'modifier') {
        return ModifierUtil.onModifierChanged(last, current, this, scheme);
      } else if (name === 'position') {
        this._updatePosition();
      } else if (name === 'material') {
        if (current !== null) {
          this._addRippleEffect();
        } else {
          this._removeRippleEffect();
        }
      }
    }

    _addRippleEffect() {
      this.firstElementChild.classList.add('fab__icon');
      RippleEffect.addRippleEffect(this.firstElementChild);
      ons._util.arrayFrom(this.querySelectorAll('ons-fab-item')).forEach(element => element.setAttribute('material', ''));
    }

    _removeRippleEffect() {
      RippleEffect.removeRippleEffect(this.firstElementChild);
      ons._util.arrayFrom(this.querySelectorAll('ons-fab-item')).forEach(element => element.removeAttribute('material'));
    }

    _updatePosition() {
      const position = this.getAttribute('position');
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
      this.querySelector('.fab__icon').addEventListener('click', this._boundOnClick, false);
    }

    detachedCallback() {
      this.querySelector('.fab__icon').removeEventListener('click', this._boundOnClick, false);
    }


    show(options = {}) {
      this.style.transform = 'scale(1)';
    }

    hide(options = {}) {
      if (this._shown) {
        this.hideItems();
        setTimeout(() => {
          this.style.transform = 'scale(0)';
        }, 300);
      } else {
        this.style.transform = 'scale(0)';
      }
    }

    showItems() {
      if (!this._shown) {
        const children = ons._util.arrayFrom(this.querySelectorAll('ons-fab-item'));
        for (var i = 0; i < children.length; i++) {
          children[i].style.transform = 'scale(1)';
          children[i].style.webkitTransform = 'scale(1)';
          children[i].style.transitionDelay = 25 * i + 'ms';
          children[i].style.webkitTransitionDelay = 25 * i + 'ms';
        }
        this._shown = true;
      }
    }

    hideItems() {
      if (this._shown) {
        const children = ons._util.arrayFrom(this.querySelectorAll('ons-fab-item'));
        for (var i = 0; i < children.length; i++) {
          children[i].style.transform = 'scale(0)';
          children[i].style.webkitTransform = 'scale(0)';
          children[i].style.transitionDelay = 25 * (children.length - i) + 'ms';
          children[i].style.webkitTransitionDelay = 25 * (children.length - i) + 'ms';
        }
        this._shown = false;
      }
    }

    _onClick(e) {
      if (e.target.classList.contains('fab__icon') || e.target.parentNode.classList.contains('fab__icon')) {
        if (ons._util.findChild(this, '.fab__item')) {
          if (!this._shown) {
            this.showItems();
          } else {
            this.hideItems();
          }
        }
      }
    }

    isItemShown() {
      return this._shown;
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
