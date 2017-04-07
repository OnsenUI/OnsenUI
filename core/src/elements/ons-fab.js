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

import autoStyle from '../ons/autostyle';
import ModifierUtil from '../ons/internal/modifier-util';
import BaseElementV2 from '../ons/base-element-v2';
import util from '../ons/util';

const defaultClassName = 'fab';

const scheme = {
  '': 'fab--*',
  '.fab__icon': 'fab--*__icon'
};

/**
 * @element ons-fab
 * @category form
 * @description
 *   [en]
 *     The Floating action button is a circular button defined in the [Material Design specification](https://www.google.com/design/spec/components/buttons-floating-action-button.html). They are often used to promote the primary action of the app.
 *
 *     It can be displayed either as an inline element or in one of the corners. Normally it will be positioned in the lower right corner of the screen.
 *   [/en]
 *   [ja][/ja]
 * @tutorial vanilla/Reference/fab
 * @guide cross-platform-styling [en]Information about cross platform styling[/en][ja]Information about cross platform styling[/ja]
 * @seealso ons-speed-dial
 *   [en]The `<ons-speed-dial>` component is a Floating action button that displays a menu when tapped.[/en]
 *   [ja][/ja]
 */
export default class FabElement extends BaseElementV2 {

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

  constructor() {
    super();
  }

  _prepareBaseContent() {
    if (!this._initialized && !this._initializing) { super._initialize(); }

    // Prepare base child nodes
    const content = document.createElement('span');
    content.classList.add('fab__icon');
    this.appendChild(content);

    // Prepare base attributes
    this.classList.add(defaultClassName);
    this.style.transform = 'scale(0)';
    this.style.webkitTransform = 'scale(0)';

    autoStyle.prepare(this); // depends on nothing
    ModifierUtil.initModifier(this, scheme); // depends on autoStyle.prepare (since it changes `modifier` attribute)
    this._updateRipple(); // depends on autoStyle.prepare (since it changes `ripple` attribute)
    this._updatePosition(); // depends on nothing
  }

  _incrementalCompile(node) {
    if (!this._initialized && !this._initializing) { super._initialize(); }

    if (node.nodeType !== Node.ELEMENT_NODE) {
      util.findChild(this, 'span.fab__icon').appendChild(node); // append given node into the slot
    } else {
      // If the given node is not <span class="fab__icon">
      if (!(node.tagName.match(/^span$/i) && node.classList.contains('fab__icon'))) {
        util.findChild(this, 'span.fab__icon').appendChild(node); // append given node into the slot
      } else {
        // If the given node is <span class="fab__icon">
        for (const element of Array.prototype.slice.call(node.childNodes)) { // append children of the given node into the slot
          if (element.tagName.match(/^ons-ripple$/i)) { continue; } // ons-ripple is always ignored

          util.findChild(this, 'span.fab__icon').appendChild(element);
        }
      }
    }

    autoStyle.prepare(this); // depends on nothing
    ModifierUtil.initModifier(this, scheme); // depends on autoStyle.prepare (since it changes `modifier` attribute)
    this._updateRipple(); // depends on autoStyle.prepare (since it changes `ripple` attribute)
  }

  connectedCallback() {
    if (!this._initialized && !this._initializing) { super._initialize(); }

    setImmediate(() => this.show());
  }

  static get observedAttributes() {
    return ['modifier', 'ripple', 'position', 'class'];
  }

  attributeChangedCallback(name, last, current) {
    if (!this._initialized && !this._initializing) { super._initialize(); }

    switch (name) {
      case 'class':
        if (!this.classList.contains(defaultClassName)) {
          this.className = defaultClassName + ' ' + current;
        }
        break;
      case 'modifier':
        ModifierUtil.onModifierChanged(last, current, this, scheme);
        break;
      case 'ripple':
        this._updateRipple();
        break;
      case 'position':
        this._updatePosition();
        break;
    }
  }

  _show() {
    if (!this._initialized && !this._initializing) { super._initialize(); }

    this.show();
  }

  _hide() {
    if (!this._initialized && !this._initializing) { super._initialize(); }

    setImmediate(() => this.hide());
  }

  _updateRipple() {
    if (!this._initialized && !this._initializing) { super._initialize(); }

    util.updateRipple(this);
  }

  _updatePosition() {
    if (!this._initialized && !this._initializing) { super._initialize(); }

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
    if (!this._initialized && !this._initializing) { super._initialize(); }

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
    if (!this._initialized && !this._initializing) { super._initialize(); }

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
    if (!this._initialized && !this._initializing) { super._initialize(); }

    return util.toggleAttribute(this, 'disabled', value);
  }

  get disabled() {
    if (!this._initialized && !this._initializing) { super._initialize(); }

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
    if (!this._initialized && !this._initializing) { super._initialize(); }

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
    if (!this._initialized && !this._initializing) { super._initialize(); }

    this.visible ? this.hide() : this.show();
  }
}

customElements.define('ons-fab', FabElement);
