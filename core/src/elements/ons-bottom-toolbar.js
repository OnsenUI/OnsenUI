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

const scheme = {'': 'bottom-bar--*'};

/**
 * @element ons-bottom-toolbar
 * @category toolbar
 * @description
 *   [en]Toolbar component that is positioned at the bottom of the page.[/en]
 *   [ja]ページ下部に配置されるツールバー用コンポーネントです。[/ja]
 * @modifier transparent
 *   [en]Make the toolbar transparent.[/en]
 *   [ja]ツールバーの背景を透明にして表示します。[/ja]
 * @seealso ons-toolbar [en]ons-toolbar component[/en][ja]ons-toolbarコンポーネント[/ja]
 * @guide Addingatoolbar
 *   [en]Adding a toolbar[/en]
 *   [ja]ツールバーの追加[/ja]
 * @example
 * <ons-bottom-toolbar>
 *   Content
 * </ons-bottom-toolbar>
 */
class BottomToolbarElement extends BaseElement {
  /**
   * @attribute modifier
   * @type {String}
   * @description
   *   [en]The appearance of the toolbar.[/en]
   *   [ja]ツールバーの見た目の表現を指定します。[/ja]
   */

  createdCallback() {
    this.classList.add('bottom-bar');

    ModifierUtil.initModifier(this, scheme);

    this._tryToEnsureNodePosition();
    setImmediate(() => this._tryToEnsureNodePosition());
  }

  attachedCallback() {
    this._tryToEnsureNodePosition();
    setImmediate(() => this._tryToEnsureNodePosition());
  }

  _tryToEnsureNodePosition() {
    const page = util.findParent(this, 'ons-page');

    if (page && page !== this.parentNode) {
      page._registerBottomToolbar(this);
    }
  }

  attributeChangedCallback(name, last, current) {
    if (name === 'modifier') {
      ModifierUtil.onModifierChanged(last, current, this, scheme);
    }
  }

}

window.OnsBottomToolbarElement = document.registerElement('ons-bottom-toolbar', {
  prototype: BottomToolbarElement.prototype
});
