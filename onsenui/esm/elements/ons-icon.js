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
import util from '../ons/util.js';
import autoStyle from '../ons/autostyle.js';
import BaseElement from './base/base-element.js';
import contentReady from '../ons/content-ready.js';

let autoPrefix = 'fa'; // FIXME: To be removed in v3

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
 * @guide theming.html#cross-platform-styling-autostyling [en]Information about cross platform styling[/en][ja][/ja]
 * @guide appsize.html#removing-icon-packs [en]Removing icon packs.[/en][ja][/ja]
 * @guide faq.html#how-can-i-use-custom-icon-packs [en]Adding custom icon packs.[/en][ja][/ja]
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
   *     See all available icons on the element description (at the top).
   *
   *     Icons can also be styled based on modifier presence. Add comma-separated icons with `"modifierName:"` prefix.
   *
   *     The code `<ons-icon icon="ion-edit, material:md-edit"></ons-icon>` will display `"md-edit"` for Material Design and `"ion-edit"` as the default icon.
   *
   *     `fa-` prefix is added automatically if none is provided. Check [See also](#seealso) section for more information.
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
   * @property fixedWidth
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

  /**
   * @property spin
   * @type {Boolean}
   * @description
   *   [en]Specify whether the icon should be spinning.[/en]
   *   [ja]アイコンを回転するかどうかを指定します。[/ja]
   */

  constructor() {
    super();

    contentReady(this, () => {
      this._compile();
    });
  }

  static get observedAttributes() {
    return ['icon', 'size', 'modifier', 'class'];
  }

  attributeChangedCallback(name, last, current) {
    this._cleanClassAttribute(name === 'icon' ? last : this.getAttribute('icon'), name === 'modifier' ? last : undefined);
    this._update();
  }

  _compile() {
    autoStyle.prepare(this);
    this._update();
  }

  _update() {
    const {classList, style} = this._buildClassAndStyle(this._parseAttr('icon'), this._parseAttr('size'));
    util.extend(this.style, style);

    classList.forEach(className => this.classList.add(className));
  }

  _parseAttr(attrName, modifier = this.getAttribute('modifier') || '') {
    const attr = this.getAttribute(attrName) || attrName || '';
    const parts = attr.split(/\s*,\s*/);
    const def = parts[0];
    let md = parts[1];
    md = (md || '').split(/\s*:\s*/);

    return (modifier && (RegExp(`(^|\\s+)${md[0]}($|\\s+)`, 'i').test(modifier)) ? md[1] : def) || '';
  }

  /**
   * Remove unneeded class value.
   */
  _cleanClassAttribute(lastIcon, lastModifier) {
    const { className, prefix } = this._prefixIcon(this._parseAttr(lastIcon, lastModifier));
    const customPrefixRE = className !== prefix ? `|${prefix}$|${prefix}-` : `|${className}$` || '';
    const re = new RegExp(`^(fa$|fa-|ion-|zmdi$|zmdi-|ons-icon--${customPrefixRE})`);

    util.arrayFrom(this.classList)
      .filter(className => re.test(className))
      .forEach(className => this.classList.remove(className));
  }

  _prefixIcon(iconName) {
    const className = autoPrefix + (autoPrefix ? '-' : '') + iconName;
    return { className, prefix: className.split('-')[0] };
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
      // default icon style to Font Awesome Solid if icon style is not specified already
      if (!(this.classList.contains('far') || this.classList.contains('fab') || this.classList.contains('fal'))) {
        classList.push('fa');
      }
    } else if (iconName.indexOf('md-') === 0)  {
      classList.push('zmdi');
      classList.push('zmdi-' + iconName.split(/-(.+)?/)[1]);
    } else {
      const { className, prefix } = this._prefixIcon(iconName);
      prefix && classList.push(prefix);
      className && classList.push(className);
    }

    // Size
    if (size.match(/^[1-5]x|lg$/)) {
      classList.push('ons-icon--' + size);
      this.style.removeProperty('font-size');
    } else {
      style.fontSize = size;
    }

    return {
      classList: classList,
      style: style
    };
  }

  static setAutoPrefix(prefix) {
    autoPrefix = prefix ? (typeof prefix === 'string' && prefix || 'fa') : '';
  }
}

util.defineBooleanProperties(IconElement, ['fixed-width', 'spin']);

onsElements.Icon = IconElement;
customElements.define('ons-icon', IconElement);
