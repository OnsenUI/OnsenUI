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
import ModifierUtil from '../ons/internal/modifier-util';
import BaseElement from './base/base-element';

const defaultClassName = 'alert-dialog-button';

const scheme = {'': 'alert-dialog-button--*'};

/**
 * @element ons-alert-dialog-button
 * @modifier material
 *   [en]Material Design alert-dialog button.[/en]
 *   [ja][/ja]
 * @description
 *   [en][/en]
 *   [ja][/ja]
 * @seealso ons-alert-dialog
 *   [en]The `<ons-alert-dialog>` component displays a alert dialog.[/en]
 *   [ja]ons-alert-dialogコンポーネント[/ja]
 * @example
 *  <ons-alert-dialog>
 *    <div class="alert-dialog-title">Warning!</div>
 *    <div class="alert-dialog-content">
 *      An error has occurred!
 *    </div>
 *    <div class="alert-dialog-footer">
 *      <alert-dialog-button onclick="app.close()">Cancel</alert-dialog-button>
 *      <alert-dialog-button class="alert-dialog-button" onclick="app.close()">OK</alert-dialog-button>
 *    </div>
 *  </ons-alert-dialog>
 */
export default class AlertDialogButtonElement extends BaseElement {

  /**
   * @attribute modifier
   * @type {String}
   * @description
   *   [en]The appearance of the button.[/en]
   *   [ja]ボタンの表現を指定します。[/ja]
   */

  /**
   * @attribute disabled
   * @description
   *   [en]Specify if button should be disabled.[/en]
   *   [ja]ボタンを無効化する場合は指定してください。[/ja]
   */

  constructor() {
    super();

    this._compile();
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

  _compile() {
    autoStyle.prepare(this);

    this.classList.add(defaultClassName);

    util.updateRipple(this, undefined, {'modifier': 'light-gray'});

    ModifierUtil.initModifier(this, scheme);
  }

  static get observedAttributes() {
    return ['modifier', 'class'];
  }

  attributeChangedCallback(name, last, current) {
    switch (name) {
      case 'class':
        if (!this.classList.contains(defaultClassName)) {
          this.className = defaultClassName + ' ' + current;
        }
        break;
      case 'modifier':
        ModifierUtil.onModifierChanged(last, current, this, scheme);
        break;
    }
  }
}

customElements.define('ons-alert-dialog-button', AlertDialogButtonElement);
