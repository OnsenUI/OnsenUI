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

import ModifierUtil from 'ons/internal/modifier-util';
import BaseElement from 'ons/base-element';
import util from 'ons/util';

const scheme = {
  '': 'fab--*',
};

/**
 * @element ons-fab
 * @category fab
 * @description
 *   [en][/en]
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
   * @attribute position
   * @type {String}
   * @description
   *  [en][/en]
   *  [ja]fabコンポーネントを表示する位置を指定します。 上下位置と左右位置を指定します。 上下位置に指定できるのは`top`か`bottom`です。左右位置で指定できるのは`left`か`right`か`center`です。`top left`と指定すると、左上に表示されます。`bottom center`と指定すると、下部中央に表示されます。[/ja]
   */

  /**
   * @attribute inline
   * @description
   *  [en][/en]
   *  [ja]この属性が設定されると、このコンポーネントはposition属性を無視してインラインに表示されます。[/ja]
   */

  /**
   * @attribute disabled
   * @description
   *   [en]Specify if button should be disabled.[/en]
   *   [ja]ボタンを無効化する場合は指定します。[/ja]
   */

  createdCallback() {
    if (!this.hasAttribute('_compiled')) {
      ons._prepareAutoStyling(this);
      this._compile();
      this._updatePosition();
      this.hide();

      this.setAttribute('_compiled', '');
    }
  }

  _compile() {
    this.classList.add('fab');

    let content = document.createElement('span');
    content.classList.add('fab__icon');

    util.arrayFrom(this.childNodes).forEach(element => content.appendChild(element));

    this.insertBefore(content, this.firstChild);

    if (this.getAttribute('effect') === 'ripple' && !util.findChild(content, 'ons-ripple')) {
      content.insertBefore(document.createElement('ons-ripple'), content.firstChild);
    }

    ModifierUtil.initModifier(this, scheme);
  }

  attributeChangedCallback(name, last, current) {
    if (name === 'modifier') {
      return ModifierUtil.onModifierChanged(last, current, this, scheme);
    }
    if (name === 'position') {
      this._updatePosition();
    }
  }

  _show() {
    if (!this.isInline()) {
      this.show();
    }
  }

  _hide() {
    if (!this.isInline()) {
      this.hide();
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
   *  [en][/en]
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
   *  [en][/en]
   *  [ja][/ja]
   */
  hide(options = {}) {
    this.style.transform = 'scale(0)';
    this.style.webkitTransform = 'scale(0)';
  }

  /**
   * @method setDisabled
   * @signature setDisabled(disabled)
   * @param {Boolean} disabled
   * @description
   *  [en]Disabled of enable fab.[/en]
   *  [ja][/ja]
   */
  setDisabled(disabled) {
    if (typeof disabled !== 'boolean') {
      throw new Error('Argument must be a boolean.');
    }

    if (disabled) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  /**
   * @method isDisabled
   * @signature isDisabled()
   * @description
   *   [en]True if fab is disabled.[/en]
   *   [ja]disabled状態であるかどうかを返します。[/ja]
   * @return {Boolean}
   */
  isDisabled() {
    return this.hasAttribute('disabled');
  }

  /**
   * True if fab is inline element.
   *
   * @return {Boolean}
   */
  /**
   * @method isInline
   * @signature isInline()
   * @description
   *   [en]True if fab is inline.[/en]
   *   [ja]inline属性があるかどうかを返します。[/ja]
   * @return {Boolean}
   */
  isInline() {
    return this.hasAttribute('inline');
  }

  /**
   * @method isShown
   * @signature isShown()
   * @description
   *   [en]True if fab is shown.[/en]
   *   [ja]このコンポーネントが表示されているかどうかを返します。[/ja]
   * @return {Boolean}
   */
  isShown() {
    return this.style.transform === 'scale(1)' && this.style.display !== 'none';
  }

  /**
   * @method toggle
   * @signature toggle()
   * @description
   *   [en][/en]
   *   [ja][/ja]
   */
  toggle() {
    if (this.isShown()) {
      this.hide();
    } else {
      this.show();
    }
  }
}

window.OnsFabElement = document.registerElement('ons-fab', {
  prototype: FabElement.prototype
});
