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

import onsElements from '../ons/elements';
import util from '../ons/util';
import styler from '../ons/styler';
import autoStyle from '../ons/autostyle';
import ModifierUtil from '../ons/internal/modifier-util';
import BaseElement from './base/base-element';
import contentReady from '../ons/content-ready';

const defaultClassName = 'list-item';
const scheme = {
  '.list-item': 'list-item--*',
  '.list-item__left': 'list-item--*__left',
  '.list-item__center': 'list-item--*__center',
  '.list-item__right': 'list-item--*__right',
  '.list-item__label': 'list-item--*__label',
  '.list-item__title': 'list-item--*__title',
  '.list-item__subtitle': 'list-item--*__subtitle',
  '.list-item__thumbnail': 'list-item--*__thumbnail',
  '.list-item__icon': 'list-item--*__icon'
};

/**
 * @element ons-list-item
 * @category list
 * @modifier tappable
 *   [en]Make the list item change appearance when it's tapped. On iOS it is better to use the "tappable" and "tap-background-color" attribute for better behavior when scrolling.[/en]
 *   [ja]タップやクリックした時に効果が表示されるようになります。[/ja]
 * @modifier chevron
 *   [en]Display a chevron at the right end of the list item and make it change appearance when tapped.[/en]
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
 *     Component that represents each item in a list. The list item is composed of three parts that are represented with the `left`, `center` and `right` classes. These classes can be used to ensure that the content of the list items is properly aligned.
 *
 *     ```
 *     <ons-list-item>
 *       <div class="left">Left</div>
 *       <div class="center">Center</div>
 *       <div class="right">Right</div>
 *     </ons-list-item>
 *     ```
 *
 *     There is also a number of classes (prefixed with `list-item__*`) that help when putting things like icons and thumbnails into the list items.
 *   [/en]
 *   [ja][/ja]
 * @seealso ons-list
 *   [en]ons-list component[/en]
 *   [ja]ons-listコンポーネント[/ja]
 * @seealso ons-list-header
 *   [en]ons-list-header component[/en]
 *   [ja]ons-list-headerコンポーネント[/ja]
 * @codepen yxcCt
 * @tutorial vanilla/Reference/list
 * @example
 * <ons-list-item>
 *   <div class="left">
 *     <ons-icon icon="md-face" class="list-item__icon"></ons-icon>
 *   </div>
 *   <div class="center">
 *     <div class="list-item__title">Title</div>
 *     <div class="list-item__subtitle">Subtitle</div>
 *   </div>
 *   <div class="right">
 *     <ons-switch></ons-switch>
 *   </div>
 * </ons-list-item>
 */
export default class ListItemElement extends BaseElement {

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
   *   [en]Makes the element react to taps. `prevent-tap` attribute can be added to child elements like buttons or inputs to prevent this effect. `ons-*` elements are ignored by default.[/en]
   *   [ja][/ja]
   */

  /**
   * @attribute tap-background-color
   * @type {Color}
   * @description
   *   [en] Changes the background color when tapped. For this to work, the attribute "tappable" needs to be set. The default color is "#d9d9d9". It will display as a ripple effect on Android.[/en]
   *   [ja][/ja]
   */

  constructor() {
    super();

    // Elements ignored when tapping
    const re = /^ons-(?!col$|row$|if$)/i;
    this._shouldIgnoreTap = e => e.hasAttribute('prevent-tap') || re.test(e.tagName);

    this._expanded = false;

    contentReady(this, () => {
      this._compile();
    });
  }

  _compile() {
    autoStyle.prepare(this);

    this.classList.add(defaultClassName);
    if (this.hasAttribute('expandable')) {
      this.classList.add('not-expanded');
    }

    let left, center, right, expandableContent;

    this._top = document.createElement('div');

    for (let i = 0; i < this.children.length; i++) {
      const el = this.children[i];

      if (el.classList.contains('left')) {
        el.classList.add('list-item__left');
        left = el;
      }
      else if (el.classList.contains('center')) {
        center = el;
      }
      else if (el.classList.contains('right')) {
        el.classList.add('list-item__right');
        right = el;
      }
      else if (el.classList.contains('expandable-content')) {
        el.classList.add('list-item__expandable-content');
        expandableContent = el;
      }
    }

    if (!center) {
      center = document.createElement('div');

      if (!right && this.hasAttribute('expandable')) {
        right = document.createElement('div');
        right.classList.add('list-item__right');
        right.classList.add('right');

        this._expandIcon = document.createElement('ons-icon');
        this._expandIcon.setAttribute('icon', 'ion-chevron-down');
        right.appendChild(this._expandIcon);
      }

      if (!left && !right && !expandableContent) {
        while (this.childNodes[0]) {
          center.appendChild(this.childNodes[0]);
        }
      } else {
        for (let i = this.childNodes.length - 1; i >= 0; i--) {
          const el = this.childNodes[i];
          if (el !== left && el !== right && el !== expandableContent) {
            center.insertBefore(el, center.firstChild);
          }
        }
      }
    }

    center.classList.add('center');
    center.classList.add('list-item__center');

    this._top.classList.add('top');
    this._top.classList.add('list-item__top');
    this.appendChild(this._top);

    this._top.appendChild(center);
    if (left) {
      this._top.appendChild(left);
    }
    if (right) {
      this._top.appendChild(right);
    }

    util.updateRipple(this);

    ModifierUtil.initModifier(this, scheme);
  }

  show() {
    if (this.hasAttribute('expandable')) {
      this.classList.remove('not-expanded');
      this._expanded = true;
      if (this._expandIcon) {
        this._expandIcon.setAttribute('icon', 'ion-chevron-up');
      }
    }
  }

  hide() {
    if (this.hasAttribute('expandable')) {
      this.classList.add('not-expanded');
      this._expanded = false;
      if (this._expandIcon) {
        this._expandIcon.setAttribute('icon', 'ion-chevron-down');
      }
    }
  }

  static get observedAttributes() {
    return ['modifier', 'class', 'ripple'];
  }

  attributeChangedCallback(name, last, current) {
    switch (name) {
      case 'class':
        util.restoreClass(this, defaultClassName, scheme);
        break;
      case 'modifier':
        ModifierUtil.onModifierChanged(last, current, this, scheme);
        break;
      case 'ripple':
        util.updateRipple(this);
        break;
    }
  }

  connectedCallback() {
    this._setupListeners(true);
    this._originalBackgroundColor = this.style.backgroundColor;
    this.tapped = false;
  }

  disconnectedCallback() {
    this._setupListeners(false);
  }

  _setupListeners(add) {
    const action = (add ? 'add' : 'remove') + 'EventListener';
    util[action](this, 'touchstart', this._onTouch, { passive: true });
    util[action](this, 'touchmove', this._onRelease, { passive: true });
    this[action]('touchcancel', this._onRelease);
    this[action]('touchend', this._onRelease);
    this[action]('touchleave', this._onRelease);
    this[action]('drag', this._onDrag);
    this[action]('mousedown', this._onTouch);
    this[action]('mouseup', this._onRelease);
    this[action]('mouseout', this._onRelease);
    this._top[action]('touchstart', this._toggle.bind(this));
    this._top[action]('mousedown', this._toggle.bind(this));
  }

  // toggle expanded content
  _toggle() {
    this._expanded ? this.hide() : this.show();
  }

  _onDrag(event) {
    const gesture = event.gesture;
    // Prevent vertical scrolling if the users pans left or right.
    if (this.hasAttribute('lock-on-drag') && ['left', 'right'].indexOf(gesture.direction) > -1) {
      gesture.preventDefault();
    }
  }

  _onTouch(e) {
    if (this.tapped ||
      (this !== e.target && (this._shouldIgnoreTap(e.target) || util.findParent(e.target, this._shouldIgnoreTap, p => p === this)))
    ) {
      return; // Ignore tap
    }

    this.tapped = true;
    const touchStyle = { transition: 'background-color 0.0s linear 0.02s, box-shadow 0.0s linear 0.02s' };

    if (this.hasAttribute('tappable')) {
      if (this.style.backgroundColor) {
        this._originalBackgroundColor = this.style.backgroundColor;
      }

      touchStyle.backgroundColor = this.getAttribute('tap-background-color') || '#d9d9d9';
      touchStyle.boxShadow = `0px -1px 0px 0px ${touchStyle.backgroundColor}`;
    }

    styler(this, touchStyle);
  }

  _onRelease() {
    this.tapped = false;
    this.style.backgroundColor = this._originalBackgroundColor || '';
    styler.clear(this, 'transition boxShadow');
  }
}

onsElements.ListItem = ListItemElement;
customElements.define('ons-list-item', ListItemElement);
