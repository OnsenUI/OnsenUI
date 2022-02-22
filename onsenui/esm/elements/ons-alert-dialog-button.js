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
import BaseButtonElement from './base/base-button.js';

/**
 * @element ons-alert-dialog-button
 * @modifier material
 *   [en]Material Design alert-dialog button.[/en]
 *   [ja]マテリアルデザインのボタンを表示します。[/ja]
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
export default class AlertDialogButtonElement extends BaseButtonElement {

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

  /**
   * @property disabled
   * @type {Boolean}
   * @description
   *   [en]Whether the element is disabled or not.[/en]
   *   [ja]無効化されている場合に`true`。[/ja]
   */

  get _scheme() {
    return { '': 'alert-dialog-button--*' };
  }

  get _defaultClassName() {
    return 'alert-dialog-button';
  }

  get _rippleOpt() {
    return [this, undefined, { 'modifier': 'light-gray' }];
  }
}

onsElements.AlertDialogButton = AlertDialogButtonElement;
customElements.define('ons-alert-dialog-button', AlertDialogButtonElement);
