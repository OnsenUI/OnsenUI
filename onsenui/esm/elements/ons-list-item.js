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

import onsElements from '../ons/elements.js';
import animit from '../ons/animit.js';
import util from '../ons/util.js';
import styler from '../ons/styler.js';
import autoStyle from '../ons/autostyle.js';
import ModifierUtil from '../ons/internal/modifier-util.js';
import AnimatorFactory from '../ons/internal/animator-factory.js';
import { ListItemAnimator, SlideListItemAnimator } from './ons-list-item/animator.js';
import BaseElement from './base/base-element.js';
import contentReady from '../ons/content-ready.js';

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

const _animatorDict = {
  'default': SlideListItemAnimator,
  'none': ListItemAnimator
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
 *     Component that represents each item in a list. The list item is composed of four parts that are represented with the `left`, `center`, `right` and `expandable-content` classes. These classes can be used to ensure that the content of the list items is properly aligned.
 *
 *     ```
 *     <ons-list-item>
 *       <div class="left">Left</div>
 *       <div class="center">Center</div>
 *       <div class="right">Right</div>
 *       <div class="expandable-content">Expandable content</div>
 *     </ons-list-item>
 *     ```
 *
 *     There are also a number of classes (prefixed with `list-item__*`) that help when putting things like icons and thumbnails into the list items.
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
   * @type {Boolean}
   * @description
   *   [en]Prevent vertical scrolling when the user drags horizontally.[/en]
   *   [ja]この属性があると、ユーザーがこの要素を横方向にドラッグしている時に、縦方向のスクロールが起きないようになります。[/ja]
   */

  /**
   * @property lockOnDrag
   * @type {Boolean}
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
   * @property tappable
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

  /**
   * @property tapBackgroundColor
   * @type {Color}
   * @description
   *   [en] Changes the background color when tapped. For this to work, the attribute "tappable" needs to be set. The default color is "#d9d9d9". It will display as a ripple effect on Android.[/en]
   *   [ja][/ja]
   */

  /**
   * @attribute keep-tap-background-color
   * @type {Boolean}
   * @description
   *  [en] Prevent from clearing the background color on `"touchmove"`, `"touchcancel"`, `"touchend"`, `"touchleave"`, `"mouseup"`, and `"mouseout"`. For this to work, the attribute "tappable" needs to be set.[/en]
   *  [ja] この属性があると、`"touchmove"`, `"touchcancel"`, `"touchend"`, `"touchleave"`, `"mouseup"`, and `"mouseout"` イベント時に背景色がクリアされないようになります。[/ja]
   */

  /**
   * @property keepTapBackgroundColor
   * @type {Boolean}
   * @description
   *   [en] Prevent from clearing the background color on `"touchmove"`, `"touchcancel"`, `"touchend"`, `"touchleave"`, `"mouseup"`, and `"mouseout"`. For this to work, the attribute "tappable" needs to be set.[/en]
   *   [ja] この属性があると、`"touchmove"`, `"touchcancel"`, `"touchend"`, `"touchleave"`, `"mouseup"`, and `"mouseout"` イベント時に背景色がクリアされないようになります。[/ja]
   */

  /**
   * @attribute expandable
   * @type {Boolean}
   * @description
   *   [en]Makes the element able to be expanded to reveal extra content. For this to work, the expandable content must be defined in `div.expandable-content`.[/en]
   *   [ja][/ja]
   */

  /**
   * @property expandable
   * @initonly
   * @type {Boolean}
   * @description
   *   [en]Makes the element able to be expanded to reveal extra content. For this to work, the expandable content must be defined in `div.expandable-content`.[/en]
   *   [ja][/ja]
   */

  /**
   * @attribute expanded
   * @type {Boolean}
   * @description
   *   [en]For expandable list items, specifies whether the expandable content is expanded or not.[/en]
   *   [ja][/ja]
   */

  /**
   * @property expanded
   * @type {Boolean}
   * @description
   *   [en]For expandable list items, specifies whether the expandable content is expanded or not.[/en]
   *   [ja][/ja]
   */

  /**
   * @event expand
   * @description
   *   [en]For expandable list items, fires when the list item is expanded or contracted.[/en]
   *   [ja][/ja]
   */

  /**
   * @attribute animation
   * @type {String}
   * @default default
   * @description
   *  [en]The animation used when showing and hiding the expandable content. Can be either `"default"` or `"none"`.[/en]
   *  [ja][/ja]
   */

  /**
   * @property animation
   * @type {String}
   * @default default
   * @description
   *  [en]The animation used when showing and hiding the expandable content. Can be either `"default"` or `"none"`.[/en]
   *  [ja][/ja]
   */

  constructor() {
    super();

    this._animatorFactory = this._updateAnimatorFactory();

    // Elements ignored when tapping
    const re = /^ons-(?!col$|row$|if$)/i;
    this._shouldIgnoreTap = e => e.hasAttribute('prevent-tap') || re.test(e.tagName);

    // show and hide functions for Vue hidable mixin
    this.show = this.showExpansion;
    this.hide = this.hideExpansion;

    contentReady(this, () => {
      this._compile();
    });
  }

  /**
   * Compiles the list item.
   *
   * Various elements are allowed in the body of a list item:
   *
   *  - div.left, div.right, and div.center are allowed as direct children
   *  - if div.center is not defined, anything that isn't div.left, div.right or div.expandable-content will be put in a div.center
   *  - if div.center is defined, anything that isn't div.left, div.right or div.expandable-content will be ignored
   *  - if list item has expandable attribute:
   *      - div.expandable-content is allowed as a direct child
   *      - div.top is allowed as direct child
   *      - if div.top is defined, anything that isn't div.expandable-content should be inside div.top - anything else will be ignored
   *      - if div.right is not defined, a div.right will be created with a drop-down chevron
   *
   * See the tests for examples.
   */
  _compile() {
    autoStyle.prepare(this);
    this.classList.add(defaultClassName);

    let top, expandableContent;
    let topContent = [];
    Array.from(this.childNodes).forEach(node => {
      if (node.nodeType !== Node.ELEMENT_NODE) {
        topContent.push(node);
      } else if (node.classList.contains('top')) {
        top = node;
      } else if (node.classList.contains('expandable-content')) {
        expandableContent = node;
      } else {
        topContent.push(node);
      }

      if (node.nodeName !== 'ONS-RIPPLE') {
        node.remove();
      }
    });
    topContent = top ? Array.from(top.childNodes) : topContent;

    let left, right, center;
    const centerContent = [];
    topContent.forEach(node => {
      if (node.nodeType !== Node.ELEMENT_NODE) {
        centerContent.push(node);
      } else if (node.classList.contains('left')) {
        left = node;
      } else if (node.classList.contains('right')) {
        right = node;
      } else if (node.classList.contains('center')) {
        center = node;
      } else {
        centerContent.push(node);
      }
    });

    if (this.hasAttribute('expandable')) {
      this.classList.add('list-item--expandable');

      if (!top) {
        top = document.createElement('div');
        top.classList.add('top');
      }
      top.classList.add('list-item__top');
      this.appendChild(top);
      this._top = top;

      if (expandableContent) {
        expandableContent.classList.add('list-item__expandable-content');
        this.appendChild(expandableContent);
      }

      if (!right) {
        right = document.createElement('div');
        right.classList.add('list-item__right', 'right');

        // We cannot use a pseudo-element for this chevron, as we cannot animate it using
        // JS. So, we make a chevron span instead.
        const chevron = document.createElement('span');
        chevron.classList.add('list-item__expand-chevron');
        right.appendChild(chevron);
      }

      // The case where the list item should already start expanded.
      // Adding the class early stops the animation from running at startup.
      if (this.expanded) {
        this.classList.add('list-item--expanded');
      }
    } else {
      top = this;
    }

    if (!center) {
      center = document.createElement('div');
      center.classList.add('center');
      centerContent.forEach(node => center.appendChild(node));
    }
    center.classList.add('list-item__center');
    top.appendChild(center);

    if (left) {
      left.classList.add('list-item__left');
      top.appendChild(left);
    }
    if (right) {
      right.classList.add('list-item__right');
      top.appendChild(right);
    }

    util.updateRipple(this);
    ModifierUtil.initModifier(this, scheme);
  }

  /**
   * @method showExpansion
   * @signature showExpansion()
   * @description
   *   [en]Show the expandable content if the element is expandable.[/en]
   *   [ja][/ja]
   */
  showExpansion() {
    this.expanded = true;
  }

  /**
   * @method hideExpansion
   * @signature hideExpansion()
   * @description
   *   [en]Hide the expandable content if the element expandable.[/en]
   *   [ja][/ja]
   */
  hideExpansion() {
    this.expanded = false;
  }

  toggleExpansion() {
    this.expanded = !this.expanded;
  }

  /**
   * @method clearTapBackgroundColor
   * @signature clearTapBackgroundColor()
   * @description
   *   [en]Clear backgroundColor changed on tap or click. This method is helpful when `keep-tap-background-color` is `true`. [/en]
   *   [ja]タップやクリックした時に効果が表示されるようになります。このメソッドは `keep-tap-background-color` が `true` のときに使用します。[/ja]
   */
  clearTapBackgroundColor() {
    this._clearTapBackgroundColor();
  }

  _animateExpansion() {
    // Stops the animation from running in the case where the list item should start already expanded
    const expandedAtStartup = this.expanded && this.classList.contains('list-item--expanded');

    if (!this.hasAttribute('expandable') || this._expanding || expandedAtStartup) {
      return;
    }

    this._expanding = true;

    const expandedCallback = () => {
      this._expanding = false;

      if (this.expanded) {
        this.classList.add('list-item--expanded');
      } else {
        this.classList.remove('list-item--expanded');
      }
    };

    const animator = this._animatorFactory.newAnimator();

    if (animator._animateExpansion) {
      animator._animateExpansion(this, this.expanded, expandedCallback);
    } else {
      expandedCallback();
    }
  }

  _updateAnimatorFactory() {
    return new AnimatorFactory({
      animators: _animatorDict,
      baseClass: ListItemAnimator,
      baseClassName: 'ListItemAnimator',
      defaultAnimation: this.getAttribute('animation') || 'default'
    });
  }

  static get observedAttributes() {
    return ['modifier', 'class', 'ripple', 'animation', 'expanded'];
  }

  get expandableContent() {
    return this.querySelector('.list-item__expandable-content');
  }

  get expandChevron() {
    return this.querySelector('.list-item__expand-chevron');
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
      case 'animation':
        this._animatorFactory = this._updateAnimatorFactory();
        break;
      case 'expanded':
        contentReady(this, () => this._animateExpansion());
        break;
    }
  }

  connectedCallback() {
    contentReady(this, () => {
      this._setupListeners(true);
      this._originalBackgroundColor = this.style.backgroundColor;
      this.tapped = false;
    });
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

    if (this._top) {
      this._top[action]('click', this._onClickTop.bind(this));
    }
  }

  _onClickTop() {
    if (!this._expanding) {
      this.toggleExpansion();
      this.dispatchEvent(new Event('expand'));
      this.dispatchEvent(new Event('expansion')); // expansion is deprecated but emit to avoid breaking user code
    }
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
    if (!this.keepTapBackgroundColor) {
      this._clearTapBackgroundColor();
    }
    styler.clear(this, 'transition boxShadow');
  }

  _clearTapBackgroundColor() {
    this.style.backgroundColor = this._originalBackgroundColor || '';
  }
}

util.defineBooleanProperties(ListItemElement, ['expanded', 'expandable', 'tappable', 'lock-on-drag', 'keep-tap-background-color']);
util.defineStringProperties(ListItemElement, ['animation', 'tap-background-color']);

onsElements.ListItem = ListItemElement;
customElements.define('ons-list-item', ListItemElement);
