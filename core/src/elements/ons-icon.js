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
import BaseElement from 'ons/base-element';

/**
 * @element ons-icon
 * @category icon
 * @description
 *   [en]Displays an icon. Font Awesome(https://fortawesome.github.io/Font-Awesome/) and Ionicon icons(http://ionicons.com) and Material Design Iconic Font(http://zavoloklom.github.io/material-design-iconic-font/) are supported.[/en]
 *   [ja]アイコンを表示するコンポーネントです。Font Awesome(https://fortawesome.github.io/Font-Awesome/)もしくはIonicons(http://ionicons.com)もしくはMaterial Design Iconic Font(http://zavoloklom.github.io/material-design-iconic-font/)から選択できます。[/ja]
 * @codepen xAhvg
 * @guide UsingIcons [en]Using icons[/en][ja]アイコンを使う[/ja]
 * @example
 * <ons-icon
 *   icon="md-car"
 *   size="20px"
 *   fixed-width="false"
 *   style="color: red">
 * </ons-icon>
 */
class IconElement extends BaseElement {

  /**
   * @attribute icon
   * @type {String}
   * @description
   *   [en]
   *     The icon name. "md-" prefix for Material Icons, "fa-" for Font Awesome and "ion-" prefix for Ionicons icons. See all icons at http://zavoloklom.github.io/material-design-iconic-font/icons.html, http://fontawesome.io/icons/ and http://ionicons.com.
   *     Icons can also be styled based on modifier presence. Add comma-separated icons with "modifierName:" prefix. E.g. `<ons-icon icon="ion-edit, material:md-edit" size="32px, material:24px">` will display "md-edit" for Material Design and "ion-edit" as default icon.
   *   [/en]
   *   [ja]アイコン名を指定します。<code>md-</code>で始まるものはMaterial Iconsとして、<code>fa-</code>で始まるものはFont Awesomeとして、<code>ion-</code>で始まるものはIoniconsとして扱われます。使用できるアイコンはこちら: http://zavoloklom.github.io/material-design-iconic-font/icons.html http://fontawesome.io/icons/ http://ionicons.com[/ja]
   */

  /**
   * @attribute size
   * @type {String}
   * @description
   *   [en]
   *     The sizes of the icon. Valid values are lg, 2x, 3x, 4x, 5x, or in pixels.
   *     Icons can also be styled based on modifier presence. Add comma-separated icons with "modifierName:" prefix. E.g. `<ons-icon icon="ion-edit, material:md-edit" size="32px, material:24px">` will display "md-edit" for Material Design and "ion-edit" as default icon.
   *   [/en]
   *   [ja]アイコンのサイズを指定します。値は、lg, 2x, 3x, 4x, 5xもしくはピクセル単位で指定できます。[/ja]
   */

  /**
   * @attribute rotate
   * @type {Number}
   * @description
   *   [en]Number of degrees to rotate the icon. Valid values are 90, 180, or 270.[/en]
   *   [ja]アイコンを回転して表示します。90, 180, 270から指定できます。[/ja]
   */

  /**
   * @attribute flip
   * @type {String}
   * @description
   *   [en]Flip the icon. Valid values are "horizontal" and "vertical".[/en]
   *   [ja]アイコンを反転します。horizontalもしくはverticalを指定できます。[/ja]
   */

  /**
   * @attribute fixed-width
   * @type {Boolean}
   * @default false
   * @description
   *  [en]When used in the list, you want the icons to have the same width so that they align vertically by setting the value to true. Valid values are true, false. Default is false.[/en]
   *  [ja]等幅にするかどうかを指定します。trueもしくはfalseを指定できます。デフォルトはfalseです。[/ja]
   */

  /**
   * @attribute spin
   * @description
   *   [en]Specify whether the icon should be spinning.[/en]
   *   [ja]アイコンを回転するかどうかを指定します。[/ja]
   */

  createdCallback() {
    if (!this.hasAttribute('_compiled')) {
      this._compile();
    }
  }

  attributeChangedCallback(name, last, current) {
    if (['icon', 'size', 'modifier'].indexOf(name) !== -1) {
      this._update();
    }
  }

  _compile() {
    autoStyle.prepare(this);
    this._update();
    this.setAttribute('_compiled', '');
  }

  _update() {
    this._cleanClassAttribute();
    const {classList, style} = this._buildClassAndStyle(this._getAttribute('icon'), this._getAttribute('size'));
    util.extend(this.style, style);

    classList.forEach(className => this.classList.add(className));
  }

  _getAttribute(attr) {
    let [def, md] = (this.getAttribute(attr) || '').split(/\s*,\s*/);
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

window.OnsIconElement = document.registerElement('ons-icon', {
  prototype: IconElement.prototype
});
