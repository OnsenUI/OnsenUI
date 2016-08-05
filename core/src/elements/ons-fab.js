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

import autoStyle from 'ons/autostyle';
import ModifierUtil from 'ons/internal/modifier-util';
import BaseElement from 'ons/base-element';
import util from 'ons/util';
import contentReady from 'ons/content-ready';

const scheme = {
  '': 'fab--*'
};

/**
 * @element ons-fab
 * @category fab
 * @description
 *   [en]
 *     The Floating action button is a circular button defined in the [Material Design specification](https://www.google.com/design/spec/components/buttons-floating-action-button.html). They are often used to promote the primary action of the app.
 *
 *     It can be displayed either as an inline element or in one of the corners. Normally it will be positioned in the lower right corner of the screen.
 *   [/en]
 *   [ja][/ja]
 * @tutorial vanilla/Reference/fab
 * @seealso ons-speed-dial
 *   [en]The `<ons-speed-dial>` component is a Floating action button that displays a menu when tapped.[/en]
 *   [ja][/ja]
 */
class FabElement extends BaseElement {

  /**
   * @attribute modifier
   * @type {String}
   * @description
   *  [en]The appearance of the button.[/en]
   *  [ja]ボタンの表現を指定します。[/ja]
   */

  /**
   * @attribute ripple
   * @description
   *  [en]If this attribute is defined, the button will have a ripple effect when tapped.[/en]
   *  [ja][/ja]
   */

  /**
   * @attribute position
   * @type {String}
   * @description
   *  [en]The position of the button. Should be a string like `"bottom right"` or `"top left"`. If this attribute is not defined it will be displayed as an inline element.[/en]
   *  [ja][/ja]
   */

  /**
   * @attribute disabled
   * @description
   *   [en]Specify if button should be disabled.[/en]
   *   [ja]ボタンを無効化する場合は指定します。[/ja]
   */

  createdCallback() {
    contentReady(this, () => {
      this._compile();
    });
  }

  _compile() {
    autoStyle.prepare(this);

    this.classList.add('fab');

    if (!util.findChild(this, '.fab__icon')) {
      const content = document.createElement('span');
      content.classList.add('fab__icon');

      util.arrayFrom(this.childNodes).forEach(element => {
        if (!element.tagName || element.tagName.toLowerCase() !== 'ons-ripple') {
          content.appendChild(element);
        }
      });
      this.appendChild(content);
    }

    this._updateRipple();

    ModifierUtil.initModifier(this, scheme);

    this._updatePosition();

    this.show();
  }

  attributeChangedCallback(name, last, current) {
    switch (name) {
      case 'modifier':
        ModifierUtil.onModifierChanged(last, current, this, scheme);
        break;
      case 'ripple':
        this._updateRipple();
        break;
      case 'position':
        this._updatePosition();
    }
  }

  _show() {
    this.show();
  }

  _hide() {
    this.hide();
  }

  _updateRipple() {
    util.updateRipple(this);
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
    switch (position) {
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
   *  [en]Show the floating action button.[/en]
   *  [ja][/ja]
   */
  show(options = {}) {
    this.style.transform = 'scale(1)';
    this.style.webkitTransform = 'scale(1)';
  }

  /**
   * @method hide
   * @signature hide()
   * @description
   *  [en]Hide the floating action button.[/en]
   *  [ja][/ja]
   */
  hide(options = {}) {
    this.style.transform = 'scale(0)';
    this.style.webkitTransform = 'scale(0)';
  }

  /**
   * @property disabled
   * @type {Boolean}
   * @description
   *   [en]Whether the element is disabled or not.[/en]
   *   [ja]無効化されている場合に`true`。[/ja]
   */
  set disabled(value) {
    return util.toggleAttribute(this, 'disabled', value);
  }

  get disabled() {
    return this.hasAttribute('disabled');
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
    return this.style.transform === 'scale(1)' && this.style.display !== 'none';
  }

  /**
   * @method toggle
   * @signature toggle()
   * @description
   *   [en]Toggle the visibility of the button.[/en]
   *   [ja][/ja]
   */
  toggle() {
    this.visible ? this.hide() : this.show();
  }
}

window.OnsFabElement = document.registerElement('ons-fab', {
  prototype: FabElement.prototype
});
