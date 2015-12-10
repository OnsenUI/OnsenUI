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

  const scheme = {'': 'list__item--*'};
  const ModifierUtil = ons._internal.ModifierUtil;

  class ListItemElement extends ons._BaseElement {
    createdCallback() {
      this.classList.add('list__item');
      ModifierUtil.initModifier(this, scheme);

      this._gestureDetector = new ons.GestureDetector(this);
      this._boundOnDrag = this._onDrag.bind(this);
    }

    attributeChangedCallback(name, last, current) {
      if (name === 'modifier') {
        return ModifierUtil.onModifierChanged(last, current, this, scheme);
      }
    }

    attachedCallback() {
      this.addEventListener('drag', this._boundOnDrag);
      this.addEventListener('touchstart', this._onTouch);
      this.addEventListener('touchend', this._onRelease);
      this.addEventListener('touchmove', this._onRelease);
    }

    detachedCallback() {
      this.removeEventListener('drag', this._boundOnDrag);
      this.removeEventListener('touchstart', this._onTouch);
      this.addEventListener('touchend', this._onRelease);
      this.addEventListener('touchmove', this._onRelease);
    }

    _onDrag(event) {
      let g = event.gesture;
      // Prevent vertical scrolling if the users pans left or right.
      if (this._shouldLockOnDrag() && ['left', 'right'].indexOf(g.direction) > -1) {
        g.preventDefault();
      }
    }

    _shouldLockOnDrag() {
      return this.hasAttribute('lock-on-drag');
    }

    _onTouch() {
      if (this.classList.contains('list__item--tappable')) {
        this.classList.add('list__item--tappable--active');
      }
    }

    _onRelease() {
      if (this.classList.contains('list__item--tappable--active')) {
        this.classList.remove('list__item--tappable--active');
      }
    }
  }

  if (!window.OnsListItemElement) {
    window.OnsListItemElement = document.registerElement('ons-list-item', {
      prototype: ListItemElement.prototype
    });
  }
})();
