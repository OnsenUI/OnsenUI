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
    '': 'speed-dial--*',
  };
  const ModifierUtil = ons._internal.ModifierUtil;

  class SpeedDialElement extends ons._BaseElement {

    createdCallback() {
      this._compile();
      this._shown = false;
      this._itemShown = false;
      ModifierUtil.initModifier(this, scheme);
      this._boundOnClick = this._onClick.bind(this);
      this.classList.add('speed__dial');

      if (this.hasAttribute('direction')) {
        this._updateDirection(this.getAttribute('direction'));
      } else {
        this._updateDirection('up');
      }
      this._updatePosition();
    }

    _compile() {
      let content = document.createElement('ons-fab');

      const children = ons._util.arrayFrom(this.childNodes).forEach(element => (element.nodeName.toLowerCase() !== 'ons-speed-dial-item') ? content.firstChild.appendChild(element) : true);

      this.insertBefore(content, this.firstChild);
    }

    attributeChangedCallback(name, last, current) {
      if (name === 'modifier') {
        return ModifierUtil.onModifierChanged(last, current, this, scheme);
      }
      else if (name === 'direction') {
        this._updateDirection(current);
      }
      else if (name === 'position') {
        this._updatePosition();
      }
      else if (name === 'disabled') {
        if (current !== null) {
          this.setDisabled(true);
        } else {
          this.setDisabled(false);
        }
      }
    }

    attachedCallback() {
      this.addEventListener('click', this._boundOnClick, false);
    }

    detachedCallback() {
      this.removeEventListener('click', this._boundOnClick, false);
    }

    get items() {
      return ons._util.arrayFrom(this.querySelectorAll('ons-speed-dial-item'));
    }

    _onClick(e) {
      this.toggleItems();
    }

    _show() {
      if (!this.isInline()) {
        this.show();
      }
    }

    _hide() {
      if (!this.isInline()) {
        this.hide();
      }
    }

    _updateDirection(direction) {
      const children = this.items;
      for (let i = 0; i < children.length; i++) {
        children[i].style.transitionDelay = 25 * i + 'ms';
        children[i].style.webkitTransitionDelay = 25 * i + 'ms';
        children[i].style.bottom = 'auto';
        children[i].style.right = 'auto';
        children[i].style.top = 'auto';
        children[i].style.left = 'auto';
      }
      switch (direction) {
        case 'up':
          for (let i = 0; i < children.length; i++) {
            children[i].style.bottom = 72 + 56 * i + 'px';
            children[i].style.right = '8px';
          }
          break;
        case 'down':
          for (let i = 0; i < children.length; i++) {
            children[i].style.top = 72 + 56 * i + 'px';
            children[i].style.left = '8px';
          }
          break;
        case 'left':
          for (let i = 0; i < children.length; i++) {
            children[i].style.top = '8px';
            children[i].style.right = 72 + 56 * i + 'px';
          }
          break;
        case 'right':
          for (let i = 0; i < children.length; i++) {
            children[i].style.top = '8px';
            children[i].style.left = 72 + 56 * i + 'px';
          }
          break;
        default:
          throw new Error('Argument must be one of up, down, left or right.');
      }
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

    show(options = {}) {
      this.querySelector('ons-fab').show();
      this._shown = true;
    }

    hide(options = {}) {
      this.hideItems();
      setTimeout(()=>{
        this.querySelector('ons-fab').hide();
      }, 200)
      this._shown = false;
    }

    showItems() {
      if (!this._itemShown) {
        const children = this.items;
        for (let i = 0; i < children.length; i++) {
          children[i].style.transform = 'scale(1)';
          children[i].style.webkitTransform = 'scale(1)';
          children[i].style.transitionDelay = 25 * i + 'ms';
          children[i].style.webkitTransitionDelay = 25 * i + 'ms';
        }
      }
      this._itemShown = true;
    }

    hideItems() {
      if (this._itemShown) {
        const children = this.items;
        for (let i = 0; i < children.length; i++) {
          children[i].style.transform = 'scale(0)';
          children[i].style.webkitTransform = 'scale(0)';
          children[i].style.transitionDelay = 25 * (children.length - i) + 'ms';
          children[i].style.webkitTransitionDelay = 25 * (children.length - i) + 'ms';
        }
      }
      this._itemShown = false;
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
        ons._util.arrayFrom(this.childNodes).forEach(element => (element.classList.contains('fab')) ? element.setAttribute('disabled', '') : true);
      } else {
        ons._util.arrayFrom(this.childNodes).forEach(element => (element.classList.contains('fab')) ? element.removeAttribute('disabled') : true);
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

    /**
     * True if fab is inline element.
     *
     * @return {Boolean}
     */
    isInline() {
      return this.hasAttribute('inline');
    }

    /**
     * True if fab is shown
     *
     * @return {Boolean}
     */
    isShown() {
      return this._shown;
    }

    isItemShown() {
      return this._itemShown;
    }

    toggle() {
      if (this.isShown()) {
        this.hide();
      } else {
        this.show();
      }
    }

    toggleItems() {
      if (this.isItemShown()) {
        this.hideItems();
      } else {
        this.showItems();
      }
    }


  }

  if (!window.OnsSpeedDialElement) {
    window.OnsSpeedDialElement = document.registerElement('ons-speed-dial', {
      prototype: SpeedDialElement.prototype
    });
  }
})();
