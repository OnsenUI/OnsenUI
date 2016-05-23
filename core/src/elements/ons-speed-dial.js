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
import styler from 'lib/styler';

const scheme = {
  '': 'speed-dial--*',
};

/**
 * @element ons-speed-dial
 * @category speed-dial
 * @description
 *   [en]
 *     Element that displays a Material Design Speed Dialog component. It is useful when there are more than one primary action that can be performed in a page.
 *
 *     The Speed dial looks like a `<ons-fab>` element but will expand a menu when tapped.
 *   [/en]
 *   [ja][/ja]
 * @codepen dYQYLg
 * @tutorial vanilla/Reference/speed-dial
 * @seealso ons-speed-dial-item
 *   [en]The `<ons-speed-dial-item>` represents a menu item.[/en]
 *   [ja]ons-speed-dial-itemコンポーネント[/ja]
 * @example
 * <ons-speed-dial position="left bottom">
 *   <ons-fab>
 *     <ons-icon icon="fa-twitter"></ons-icon>
 *   </ons-fab>
 *   <ons-speed-dial-item>A</ons-speed-dial-item>
 *   <ons-speed-dial-item>B</ons-speed-dial-item>
 *   <ons-speed-dial-item>C</ons-speed-dial-item>
 * </ons-speed-dial>
 */
class SpeedDialElement extends BaseElement {

  /**
   * @event open
   * @description
   *   [en]Fired when the menu items are shown.[/en]
   *   [ja][/ja]
   */

  /**
   * @event close
   * @description
   *   [en]Fired when the menu items are hidden.[/en]
   *   [ja][/ja]
   */

  /**
   * @attribute modifier
   * @type {String}
   * @description
   *   [en]The appearance of the component.[/en]
   *   [ja]このコンポーネントの表現を指定します。[/ja]
   */

  /**
   * @attribute position
   * @type {String}
   * @description
   *   [en]
   *     Specify the vertical and horizontal position of the component.
   *     I.e. to display it in the top right corner specify "right top".
   *     Choose from "right", "left", "top" and "bottom".
   *   [/en]
   *   [ja]
   *     この要素を表示する左右と上下の位置を指定します。
   *     例えば、右上に表示する場合には"right top"を指定します。
   *     左右と上下の位置の指定には、rightとleft、topとbottomがそれぞれ指定できます。
   *   [/ja]
   */

  /**
   * @attribute direction
   * @type {String}
   * @description
   *   [en]Specify the direction the items are displayed. Possible values are "up", "down", "left" and "right".[/en]
   *   [ja]
   *     要素が表示する方向を指定します。up, down, left, rightが指定できます。
   *   [/ja]
   */

  /**
   * @attribute disabled
   * @description
   *   [en]Specify if button should be disabled.[/en]
   *   [ja]無効化する場合に指定します。[/ja]
   */

  createdCallback() {
    contentReady(this, () => {
      this._compile();
    });

    this._shown = true;
    this._itemShown = false;
    this._boundOnClick = this._onClick.bind(this);
  }

  _compile() {
    if (!this.classList.contains('speed__dial')) {
      this.classList.add('speed__dial');
      autoStyle.prepare(this);
      this._updateRipple();
      ModifierUtil.initModifier(this, scheme);

      if (this.hasAttribute('direction')) {
        this._updateDirection(this.getAttribute('direction'));
      } else {
        this._updateDirection('up');
      }
    }

    this._updatePosition();
  }

  attributeChangedCallback(name, last, current) {
    switch (name) {
      case 'modifier':
        ModifierUtil.onModifierChanged(last, current, this, scheme);
        break;
      case 'ripple':
        contentReady(this, () => this._updateRipple());
        break;
      case 'direction':
        contentReady(this, () => this._updateDirection(current));
        break;
      case 'position':
        contentReady(this, () => this._updatePosition());
        break;
    }
  }

  attachedCallback() {
    this.addEventListener('click', this._boundOnClick, false);
  }

  detachedCallback() {
    this.removeEventListener('click', this._boundOnClick, false);
  }

  get items() {
    return util.arrayFrom(this.querySelectorAll('ons-speed-dial-item'));
  }

  _onClick(e) {
    if (!this.disabled && this._shown) {
      this.toggleItems();
    }
  }

  _show() {
    if (!this.inline) {
      this.show();
    }
  }

  _hide() {
    if (!this.inline) {
      this.hide();
    }
  }

  _updateRipple() {
    const fab = util.findChild(this, 'ons-fab');

    if (fab) {
      this.hasAttribute('ripple') ? fab.setAttribute('ripple', '') : fab.removeAttribute('ripple');
    }
  }

  _updateDirection(direction) {
    const children = this.items;
    for (let i = 0; i < children.length; i++) {
      styler(children[i], {
        transitionDelay: 25 * i + 'ms',
        bottom: 'auto',
        right: 'auto',
        top: 'auto',
        left: 'auto'
      });
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

  /**
   * @method show
   * @signature show()
   * @description
   *   [en]Show the speed dial.[/en]
   *   [ja]Speed dialを表示します。[/ja]
   */
  show(options = {}) {
    this.querySelector('ons-fab').show();
    this._shown = true;
  }

  /**
   * @method hide
   * @signature hide()
   * @description
   *   [en]Hide the speed dial.[/en]
   *   [ja]Speed dialを非表示にします。[/ja]
   */
  hide(options = {}) {
    this.hideItems();
    setTimeout(()=>{
      this.querySelector('ons-fab').hide();
    }, 200);
    this._shown = false;
  }

  /**
   * @method showItems
   * @signature showItems()
   * @description
   *   [en]Show the speed dial items.[/en]
   *   [ja]Speed dialの子要素を表示します。[/ja]
   */
  showItems() {

    if (this.hasAttribute('direction')) {
      this._updateDirection(this.getAttribute('direction'));
    } else {
      this._updateDirection('up');
    }

    if (!this._itemShown) {
      const children = this.items;
      for (let i = 0; i < children.length; i++) {
        styler(children[i], {
          transform: 'scale(1)',
          transitionDelay: 25 * i + 'ms'
        });
      }
    }
    this._itemShown = true;

    util.triggerElementEvent(this, 'open');
  }

  /**
   * @method hideItems
   * @signature hideItems()
   * @description
   *   [en]Hide the speed dial items.[/en]
   *   [ja]Speed dialの子要素を非表示にします。[/ja]
   */
  hideItems() {
    if (this._itemShown) {
      const children = this.items;
      for (let i = 0; i < children.length; i++) {
        styler(children[i], {
          transform: 'scale(0)',
          transitionDelay: 25 * (children.length - i) + 'ms'
        });
      }
    }
    this._itemShown = false;
    util.triggerElementEvent(this, 'close');
  }

  /**
   * @property disabled
   * @type {Boolean}
   * @description
   *   [en]Whether the element is disabled or not.[/en]
   *   [ja]無効化されている場合に`true`。[/ja]
   */
  set disabled(value) {
    if (value) {
      this.hideItems();
    }
    util.arrayFrom(this.children).forEach(e => {
      util.match(e, '.fab') && util.toggleAttribute(e, 'disabled', value);
    });

    return util.toggleAttribute(this, 'disabled', value);
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  /**
   * @property inline
   * @readonly
   * @type {Boolean}
   * @description
   *   [en]Whether the element is inline or not.[/en]
   *   [ja]インライン要素の場合に`true`。[/ja]
   */
  get inline() {
    return this.hasAttribute('inline');
  }

  /**
   * @property visible
   * @readonly
   * @type {Boolean}
   * @description
   *   [en]Whether the element is visible or not.[/en]
   *   [ja]要素が見える場合に`true`。[/ja]
   */
  get visible() {
    return this._shown && this.style.display !== 'none';
  }

  /**
   * @method isOpen
   * @signature isOpen()
   * @description
   *   [en]Returns whether the menu is open or not.[/en]
   *   [ja][/ja]
   */
  isOpen() {
    return this._itemShown;
  }

  /**
   * @method toggle
   * @signature toggle()
   * @description
   *   [en]Toggle visibility.[/en]
   *   [ja]Speed dialの表示非表示を切り替えます。[/ja]
   */
  toggle() {
    this.visible ? this.hide() : this.show();
  }

  /**
   * @method toggleItems
   * @signature toggleItems()
   * @description
   *   [en]Toggle item visibility.[/en]
   *   [ja]Speed dialの子要素の表示非表示を切り替えます。[/ja]
   */
  toggleItems() {
    if (this.isOpen()) {
      this.hideItems();
    } else {
      this.showItems();
    }
  }
}

window.OnsSpeedDialElement = document.registerElement('ons-speed-dial', {
  prototype: SpeedDialElement.prototype
});
