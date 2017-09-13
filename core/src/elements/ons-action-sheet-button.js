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
import contentReady from '../ons/content-ready';
import ModifierUtil from '../ons/internal/modifier-util';
import BaseElement from './base/base-element';

const defaultClassName = 'action-sheet-button';
const scheme = {
  '': 'action-sheet-button--*',
  '.action-sheet-icon': 'action-sheet-icon--*'
};

/**
 * @element ons-action-sheet-button
 * @category dialog
 * @modifier destructive
 *   [en]Shows a "destructive" button (only for iOS).[/en]
 *   [ja][/ja]
 * @description
 *   [en]Component that represent each button of the action sheet.[/en]
 *   [ja][/ja]
 * @seealso ons-action-sheet
 *   [en]The `<ons-action-sheet>` component[/en]
 *   [ja]ons-action-sheetコンポーネント[/ja]
 * @seealso ons-list-item
 *   [en]The `<ons-list-item>` component[/en]
 *   [ja]ons-list-itemコンポーネント[/ja]
 * @seealso ons-icon
 *   [en]The `<ons-icon>` component[/en]
 *   [ja]ons-iconコンポーネント[/ja]
 * @guide lists [en]Using lists[/en][ja]リストを使う[/ja]
 * @tutorial vanilla/Reference/action-sheet
 * @modifier material
 *   [en]Display a Material Design action sheet button.[/en]
 *   [ja][/ja]
 * @example
 * <ons-action-sheet id="sheet">
 *   <ons-action-sheet-button>Label</ons-action-sheet-button>
 *   <ons-action-sheet-button>Label</ons-action-sheet-button>
 * </ons-action-sheet>
 *
 * <script>
 *   document.getElementById('sheet').show();
 * </script>
 */
export default class ActionSheetButtonElement extends BaseElement {

  /**
   * @attribute icon
   * @type {String}
   * @description
   *  [en]Creates an `ons-icon` component with this string. Only visible on Android.[/en]
   *  [ja][/ja]
   */

  /**
   * @attribute modifier
   * @type {String}
   * @description
   *   [en]The appearance of the action sheet button.[/en]
   *   [ja][/ja]
   */

  constructor() {
    super();

    contentReady(this, () => this._compile());
  }

  get _icon() {
    return util.findChild(this, '.action-sheet-icon');
  }

  _compile() {
    autoStyle.prepare(this);
    this.classList.add(defaultClassName);

    if (!this._icon && this.hasAttribute('icon')) {
      const icon = util.createElement(`<ons-icon icon="${this.getAttribute('icon')}"></ons-icon>`);
      icon.classList.add('action-sheet-icon');
      this.insertBefore(icon, this.firstChild);
    }

    ModifierUtil.initModifier(this, scheme);
  }

  _updateIcon() {
    if (this._icon) {
      this._icon.setAttribute('icon', this.getAttribute('icon'));
    }
  }

  static get observedAttributes() {
    return ['modifier', 'class', 'icon'];
  }

  attributeChangedCallback(name, last, current) {
    switch (name) {
      case 'class':
        util.restoreClass(this, defaultClassName, scheme);
        break;
      case 'modifier':
        ModifierUtil.onModifierChanged(last, current, this, scheme);
        break;
      case 'icon':
        this._updateIcon();
        break;
    }
  }
}

customElements.define('ons-action-sheet-button', ActionSheetButtonElement);
