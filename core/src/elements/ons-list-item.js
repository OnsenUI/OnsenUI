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
import autoStyle from 'ons/autostyle';
import ModifierUtil from 'ons/internal/modifier-util';
import BaseElement from 'ons/base-element';
import contentReady from 'ons/content-ready';

const scheme = {
  '.list__item': 'list__item--*',
  '.list__item__left': 'list__item--*__left',
  '.list__item__center': 'list__item--*__center',
  '.list__item__right': 'list__item--*__right',
  '.list__item__label': 'list__item--*__label',
  '.list__item__title': 'list__item--*__title',
  '.list__item__subtitle': 'list__item--*__subtitle',
  '.list__item__thumbnail': 'list__item--*__thumbnail',
  '.list__item__icon': 'list__item--*__icon'
};

/**
 * @element ons-list-item
 * @category list
 * @modifier tappable
 *   [en]Make the list item change appearance when it's tapped. On iOS it is better to use the "tappable" and "tap-background-color" attribute for better behavior when scrolling.[/en]
 *   [ja]タップやクリックした時に効果が表示されるようになります。[/ja]
 * @modifier chevron
 *   [en]Display a chevron at the right end of the list item and make it change appearance when tapped. The chevron is not displayed in Material Design.[/en]
 *   [ja][/ja]
 * @modifier longdivider
 *   [en]Displays a long horizontal divider between items.[/en]
 *   [ja][/ja]
 * @modifier nodivider
 *   [en]Removes the divider between list items.[/en]
 *   [ja][/ja]
 * @modifier material
 *   [en]Display a Material Design list item.[/en]
 *   [ja][/ja]
 * @description
 *   [en]
 *     Component that represents each item in the list. Must be put inside the `<ons-list>` component.
 *
 *     The list item is composed of three parts that are represented with the `left`, `center` and `right` classes. These classes can be used to ensure that the content of the list items is properly aligned.
 *
 *     ```
 *     <ons-list-item>
 *       <div class="left">Left</div>
 *       <div class="center">Center</div>
 *       <div class="right">Right</div>
 *     </ons-list-item>
 *     ```
 *
 *     There is also a number of classes (prefixed with `list__item__*`) that help when putting things like icons and thumbnails into the list items.
 *   [/en]
 *   [ja][/ja]
 * @seealso ons-list
 *   [en]ons-list component[/en]
 *   [ja]ons-listコンポーネント[/ja]
 * @seealso ons-list-header
 *   [en]ons-list-header component[/en]
 *   [ja]ons-list-headerコンポーネント[/ja]
 * @guide UsingList
 *   [en]Using lists[/en]
 *   [ja]リストを使う[/ja]
 * @codepen yxcCt
 * @tutorial vanilla/Reference/list
 * @example
 * <ons-list-item>
 *   <div class="left">
 *     <ons-icon icon="md-face" class="list__item__icon"></ons-icon>
 *   </div>
 *   <div class="center">
 *     <div class="list__item__title">Title</div>
 *     <div class="list__item__subtitle">Subtitle</div>
 *   </div>
 *   <div class="right">
 *     <ons-switch></ons-switch>
 *   </div>
 * </ons-list-item>
 */
class ListItemElement extends BaseElement {

  /**
   * @attribute modifier
   * @type {String}
   * @description
   *   [en]The appearance of the list item.[/en]
   *   [ja]各要素の表現を指定します。[/ja]
   */

  /**
   * @attribute lock-on-drag
   * @type {String}
   * @description
   *   [en]Prevent vertical scrolling when the user drags horizontally.[/en]
   *   [ja]この属性があると、ユーザーがこの要素を横方向にドラッグしている時に、縦方向のスクロールが起きないようになります。[/ja]
   */

  /**
   * @attribute tappable
   * @type {Boolean}
   * @description
   *   [en]Makes the element react to taps.[/en]
   *   [ja][/ja]
   */

  /**
   * @attribute tap-background-color
   * @type {Color}
   * @description
   *   [en] Changes the background color when tapped. For this to work, the attribute "tappable" needs to be set. The default color is "#d9d9d9". It will display as a ripple effect on Android.[/en]
   *   [ja][/ja]
   */

  createdCallback() {
    contentReady(this, () => {
      this._compile();
    });
  }

  _compile() {
    autoStyle.prepare(this);
    this.classList.add('list__item');

    let left, center, right;

    for (let i = 0; i < this.children.length; i++) {
      const el = this.children[i];

      if (el.classList.contains('left')) {
        el.classList.add('list__item__left');
        left = el;
      }
      else if (el.classList.contains('center')) {
        center = el;
      }
      else if (el.classList.contains('right')) {
        el.classList.add('list__item__right');
        right = el;
      }
    }

    if (!center) {
      center = document.createElement('div');

      if (!left && !right) {
        while (this.childNodes[0]) {
          center.appendChild(this.childNodes[0]);
        }
      } else {
        for (let i = this.childNodes.length - 1; i >= 0; i--) {
          const el = this.childNodes[i];
          if (el !== left && el !== right) {
            center.insertBefore(el, center.firstChild);
          }
        }
      }

      this.insertBefore(center, right || null);
    }

    center.classList.add('center');
    center.classList.add('list__item__center');

    this._updateRipple();

    ModifierUtil.initModifier(this, scheme);
  }

  attributeChangedCallback(name, last, current) {
    switch (name) {
      case 'modifier':
        ModifierUtil.onModifierChanged(last, current, this, scheme);
        break;
      case 'ripple':
        this._updateRipple();
    }
  }

  attachedCallback() {
    this.addEventListener('drag', this._onDrag);
    this.addEventListener('touchstart', this._onTouch);
    this.addEventListener('mousedown', this._onTouch);
    this.addEventListener('touchend', this._onRelease);
    this.addEventListener('touchmove', this._onRelease);
    this.addEventListener('touchcancel', this._onRelease);
    this.addEventListener('mouseup', this._onRelease);
    this.addEventListener('mouseout', this._onRelease);
    this.addEventListener('touchleave', this._onRelease);

    this._originalBackgroundColor = this.style.backgroundColor;

    this.tapped = false;
  }

  detachedCallback() {
    this.removeEventListener('drag', this._onDrag);
    this.removeEventListener('touchstart', this._onTouch);
    this.removeEventListener('mousedown', this._onTouch);
    this.removeEventListener('touchend', this._onRelease);
    this.removeEventListener('touchmove', this._onRelease);
    this.removeEventListener('touchcancel', this._onRelease);
    this.removeEventListener('mouseup', this._onRelease);
    this.removeEventListener('mouseout', this._onRelease);
    this.removeEventListener('touchleave', this._onRelease);
  }

  get _transition() {
    return 'background-color 0.0s linear 0.02s, box-shadow 0.0s linear 0.02s';
  }

  get _tappable() {
    return this.hasAttribute('tappable');
  }

  get _tapBackgroundColor() {
    return this.getAttribute('tap-background-color') || '#d9d9d9';
  }

  _updateRipple() {
    util.updateRipple(this);
  }

  _onDrag(event) {
    const gesture = event.gesture;
    // Prevent vertical scrolling if the users pans left or right.
    if (this._shouldLockOnDrag() && ['left', 'right'].indexOf(gesture.direction) > -1) {
      gesture.preventDefault();
    }
  }

  _onTouch() {
    if (this.tapped) {
      return;
    }

    this.tapped = true;

    this.style.transition = this._transition;
    this.style.webkitTransition = this._transition;
    this.style.MozTransition = this._transition;

    if (this._tappable) {
      if (this.style.backgroundColor) {
        this._originalBackgroundColor = this.style.backgroundColor;
      }

      this.style.backgroundColor = this._tapBackgroundColor;
      this.style.boxShadow = `0px -1px 0px 0px ${this._tapBackgroundColor}`;
    }
  }

  _onRelease() {
    this.tapped = false;

    this.style.transition = '';
    this.style.webkitTransition = '';
    this.style.MozTransition = '';

    this.style.backgroundColor = this._originalBackgroundColor || '';
    this.style.boxShadow = '';
  }

  _shouldLockOnDrag() {
    return this.hasAttribute('lock-on-drag');
  }
}

window.OnsListItemElement = document.registerElement('ons-list-item', {
  prototype: ListItemElement.prototype
});
