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

import util from '../ons/util';
import autoStyle from '../ons/autostyle';
import BaseElement from './base/base-element';

/**
 * @element ons-icon
 * @category visual
 * @description
 *   [en]
 *     Displays an icon. The following icon suites are available:
 *
 *     * [Font Awesome](https://fortawesome.github.io/Font-Awesome/)
 *     * [Ionicons](http://ionicons.com/)
 *     * [Material Design Iconic Font](http://zavoloklom.github.io/material-design-iconic-font/)
 *   [/en]
 *   [ja][/ja]
 * @codepen xAhvg
 * @tutorial vanilla/Reference/icon
 * @guide cross-platform-styling [en]Information about cross platform styling[/en][ja]Information about cross platform styling[/ja]
 * @example
 * <ons-icon
 *   icon="md-car"
 *   size="20px"
 *   style="color: red">
 * </ons-icon>
 *
 * <ons-button>
 *   <ons-icon icon="md-car"></ons-icon>
 *   Car
 * </ons-button>
 */
export default class IconElement extends BaseElement {

  /**
   * @attribute icon
   * @type {String}
   * @description
   *   [en]
   *     The icon name. `"md-"` prefix for Material Icons, `"fa-"` for Font Awesome and `"ion-"` prefix for Ionicons.
   *
   *     See all available icons on their respective sites:
   *
   *     * [Font Awesome](https://fortawesome.github.io/Font-Awesome/)
   *     * [Ionicons](http://ionicons.com)
   *     * [Material Design Iconic Font](http://zavoloklom.github.io/material-design-iconic-font/)
   *
   *     Icons can also be styled based on modifier presence. Add comma-separated icons with `"modifierName:"` prefix.
   *
   *     The code:
   *
   *     ```
   *     <ons-icon
   *       icon="ion-edit, material:md-edit">
   *     </ons-icon>
   *     ```
   *
   *     will display `"md-edit"` for Material Design and `"ion-edit"` as the default icon.
   *   [/en]
   *   [ja][/ja]
   */

  /**
   * @attribute size
   * @type {String}
   * @description
   *   [en]
   *     The sizes of the icon. Valid values are lg, 2x, 3x, 4x, 5x, or in the size in pixels.
   *     Icons can also be styled based on modifier presence. Add comma-separated icons with `"modifierName:"` prefix.
   *
   *     The code:
   *
   *     ```
   *     <ons-icon
   *       icon="ion-edit"
   *       size="32px, material:24px">
   *     </ons-icon>
   *     ```
   *
   *     will render as a `24px` icon if the `"material"` modifier is present and `32px` otherwise.
   *   [/en]
   *   [ja][/ja]
   */

  /**
   * @attribute rotate
   * @type {Number}
   * @description
   *   [en]Number of degrees to rotate the icon. Valid values are 90, 180 and 270.[/en]
   *   [ja]アイコンを回転して表示します。90, 180, 270から指定できます。[/ja]
   */

  /**
   * @attribute fixed-width
   * @type {Boolean}
   * @default false
   * @description
   *  [en]When used in a list, you want the icons to have the same width so that they align vertically by defining this attribute.[/en]
   *  [ja][/ja]
   */

  /**
   * @attribute spin
   * @description
   *   [en]Specify whether the icon should be spinning.[/en]
   *   [ja]アイコンを回転するかどうかを指定します。[/ja]
   */

  constructor() {
    super();

    this._compile();
  }

  static get observedAttributes() {
    return ['icon', 'size', 'modifier', 'class'];
  }

  attributeChangedCallback(name, last, current) {
    this._update();
  }

  _compile() {
    autoStyle.prepare(this);
    this._update();
  }

  _update() {
    this._cleanClassAttribute();
    const {classList, style} = this._buildClassAndStyle(this._getAttribute('icon'), this._getAttribute('size'));
    util.extend(this.style, style);

    classList.forEach(className => this.classList.add(className));
  }

  _getAttribute(attr) {
    const parts = (this.getAttribute(attr) || '').split(/\s*,\s*/);
    const def = parts[0];
    let md = parts[1];
    md = (md || '').split(/\s*:\s*/);
    return (util.hasModifier(this, md[0]) ? md[1] : def) || '';
  }

  /**
   * Remove unneeded class value.
   */
  _cleanClassAttribute() {
    util.arrayFrom(this.classList)
      .filter(className => /^(fa$|fa-|ion-|zmdi-)/.test(className))
      .forEach(className => this.classList.remove(className));

    this.classList.remove('zmdi');
    this.classList.remove('ons-icon--ion');
  }

  _buildClassAndStyle(iconName, size) {
    const classList = ['ons-icon'];
    const style = {};

    // Icon
    if (iconName.indexOf('ion-') === 0) {
      classList.push(iconName);
      classList.push('ons-icon--ion');
    } else if (iconName.indexOf('fa-') === 0) {
      classList.push(iconName);
      classList.push('fa');
    } else if(iconName.indexOf('md-') === 0)  {
      classList.push('zmdi');
      classList.push('zmdi-' + iconName.split(/\-(.+)?/)[1]);
    } else {
      classList.push('fa');
      classList.push('fa-' + iconName);
    }

    // Size
    if (size.match(/^[1-5]x|lg$/)) {
      classList.push('fa-' + size);
      this.style.removeProperty('font-size');
    } else {
      style.fontSize = size;
    }

    return {
      classList: classList,
      style: style
    };
  }
}

customElements.define('ons-icon', IconElement);
