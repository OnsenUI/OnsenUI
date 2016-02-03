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
import ModifierUtil from 'ons/internal/modifier-util';
import BaseElement from 'ons/base-element';

const scheme = {
  '': 'speed-dial--*',
};

/**
 * @element ons-speed-dial
 * @category speeddial
 * @description
 *   [en]Element that displays a Material Design Speed Dialog component.[/en]
 *   [ja]Material DesignのSpeed dialコンポーネントを表現する要素です。[/ja]
 * @codepen dYQYLg
 * @seealso ons-speed-dial-item
 *   [en]ons-speed-dial-item component[/en]
 *   [ja]ons-speed-dial-itemコンポーネント[/ja]
 * @example
 * <ons-speed-dial position="left bottom">
 *   <ons-icon
 *     icon="fa-twitter"
 *     size="26px"
 *     fixed-width="false"
 *     style="vertical-align:middle;">
 *   </ons-icon>
 *   <ons-speed-dial-item><ons-ripple></ons-ripple>C</ons-speed-dial-item>
 *   <ons-speed-dial-item><ons-ripple></ons-ripple>B</ons-speed-dial-item>
 *   <ons-speed-dial-item><ons-ripple></ons-ripple>A</ons-speed-dial-item>
 * </ons-speed-dial>
 */
class SpeedDialElement extends BaseElement {

  /**
   * @attribute modifier
   * @type {String}
   * @description
   *   [en]The appearance of the component.[/en]
   *   [ja]このコンポーネントの表現を指定します。[/ja]
   */

  /**
   * @attribute position
   * @type {String}
   * @description
   *   [en]
   *     Specify the vertical and horizontal position of the component.
   *     I.e. to display it in the top right corner specify "right top".
   *     Choose from "right", "left", "top" and "bottom".
   *   [/en]
   *   [ja]
   *     この要素を表示する左右と上下の位置を指定します。
   *     例えば、右上に表示する場合には"right top"を指定します。
   *     左右と上下の位置の指定には、rightとleft、topとbottomがそれぞれ指定できます。
   *   [/ja]
   */

  /**
   * @attribute direction
   * @type {String}
   * @description
   *   [en]Specify the direction the items are displayed. Possible values are "up", "down", "left" and "right".[/en]
   *   [ja]
   *     要素が表示する方向を指定します。up, down, left, rightが指定できます。
   *   [/ja]
   */

  /**
   * @attribute disabled
   * @description
   *   [en]Specify if button should be disabled.[/en]
   *   [ja]無効化する場合に指定します。[/ja]
   */

  createdCallback() {
    if (!this.hasAttribute('_compiled')) {
      this._compile();
      ModifierUtil.initModifier(this, scheme);

      this.classList.add('speed__dial');

      if (this.hasAttribute('direction')) {
        this._updateDirection(this.getAttribute('direction'));
      } else {
        this._updateDirection('up');
      }
      this._updatePosition();

      if (this.hasAttribute('disabled')) {
        this.setDisabled(true);
      }
      this.setAttribute('_compiled', '');
    }

    this._shown = true;
    this._itemShown = false;
    this._boundOnClick = this._onClick.bind(this);
  }

  _compile() {
    let content = document.createElement('ons-fab');

    util.arrayFrom(this.childNodes).forEach(node => {
      if (node.nodeType == 8  || (node.nodeType === 3 && !/\S/.test(node.nodeValue))) {
        node.remove();
      } else if (node.nodeName.toLowerCase() !== 'ons-speed-dial-item') {
        content.firstChild.appendChild(node);
      }
    });

    this.insertBefore(content, this.firstChild);
  }

  attributeChangedCallback(name, last, current) {
    if (name === 'modifier') {
      return ModifierUtil.onModifierChanged(last, current, this, scheme);
    }
    else if (name === 'direction') {
      this._updateDirection(current);
    }
    else if (name === 'position') {
      this._updatePosition();
    }
    else if (name === 'disabled') {
      if (current !== null) {
        this.setDisabled(true);
      } else {
        this.setDisabled(false);
      }
    }
  }

  attachedCallback() {
    this.addEventListener('click', this._boundOnClick, false);
  }

  detachedCallback() {
    this.removeEventListener('click', this._boundOnClick, false);
  }

  get items() {
    return util.arrayFrom(this.querySelectorAll('ons-speed-dial-item'));
  }

  _onClick(e) {
    if (!this.isDisabled()) {
      this.toggleItems();
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

  _updateDirection(direction) {
    const children = this.items;
    for (let i = 0; i < children.length; i++) {
      children[i].style.transitionDelay = 25 * i + 'ms';
      children[i].style.webkitTransitionDelay = 25 * i + 'ms';
      children[i].style.bottom = 'auto';
      children[i].style.right = 'auto';
      children[i].style.top = 'auto';
      children[i].style.left = 'auto';
    }
    switch (direction) {
      case 'up':
        for (let i = 0; i < children.length; i++) {
          children[i].style.bottom = 72 + 56 * i + 'px';
          children[i].style.right = '8px';
        }
        break;
      case 'down':
        for (let i = 0; i < children.length; i++) {
          children[i].style.top = 72 + 56 * i + 'px';
          children[i].style.left = '8px';
        }
        break;
      case 'left':
        for (let i = 0; i < children.length; i++) {
          children[i].style.top = '8px';
          children[i].style.right = 72 + 56 * i + 'px';
        }
        break;
      case 'right':
        for (let i = 0; i < children.length; i++) {
          children[i].style.top = '8px';
          children[i].style.left = 72 + 56 * i + 'px';
        }
        break;
      default:
        throw new Error('Argument must be one of up, down, left or right.');
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
    switch(position) {
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
   *   [en]Show the speed dial.[/en]
   *   [ja]Speed dialを表示します。[/ja]
   */
  show(options = {}) {
    this.querySelector('ons-fab').show();
    this._shown = true;
  }

  /**
   * @method hide
   * @signature hide()
   * @description
   *   [en]Hide the speed dial.[/en]
   *   [ja]Speed dialを非表示にします。[/ja]
   */
  hide(options = {}) {
    this.hideItems();
    setTimeout(()=>{
      this.querySelector('ons-fab').hide();
    }, 200);
    this._shown = false;
  }

  /**
   * @method showItems
   * @signature showItems()
   * @description
   *   [en]Show the speed dial items.[/en]
   *   [ja]Speed dialの子要素を表示します。[/ja]
   */
  showItems() {
    if (!this._itemShown) {
      const children = this.items;
      for (let i = 0; i < children.length; i++) {
        children[i].style.transform = 'scale(1)';
        children[i].style.webkitTransform = 'scale(1)';
        children[i].style.transitionDelay = 25 * i + 'ms';
        children[i].style.webkitTransitionDelay = 25 * i + 'ms';
      }
    }
    this._itemShown = true;
  }

  /**
   * @method hideItems
   * @signature hideItems()
   * @description
   *   [en]Hide the speed dial items.[/en]
   *   [ja]Speed dialの子要素を非表示にします。[/ja]
   */
  hideItems() {
    if (this._itemShown) {
      const children = this.items;
      for (let i = 0; i < children.length; i++) {
        children[i].style.transform = 'scale(0)';
        children[i].style.webkitTransform = 'scale(0)';
        children[i].style.transitionDelay = 25 * (children.length - i) + 'ms';
        children[i].style.webkitTransitionDelay = 25 * (children.length - i) + 'ms';
      }
    }
    this._itemShown = false;
  }

  /**
   * @method setDisabled
   * @signature setDisabled(disabled)
   * @param {Boolean}
   * @description
   *   [en]Disable or enable the element.[/en]
   *   [ja]disabled状態にするかどうかを設定します。[/ja]
   */
  setDisabled(disabled) {
    if (typeof disabled !== 'boolean') {
      throw new Error('Argument must be a boolean.');
    }

    if (disabled) {
      this.hideItems();
      this.setAttribute('disabled', '');
      util.arrayFrom(this.childNodes).forEach(element => (element.classList.contains('fab')) ? element.setAttribute('disabled', '') : true);
    } else {
      this.removeAttribute('disabled');
      util.arrayFrom(this.childNodes).forEach(element => (element.classList.contains('fab')) ? element.removeAttribute('disabled') : true);
    }
  }

  /**
   * @method isDisabled
   * @signature isDisabled()
   * @return {Boolean}
   *   [en]true if the element is disabled.[/en]
   *   [ja]disabled状態になっているかどうかを返します。[/ja]
   * @description
   *   [en]Returns whether the component is enabled or not.[/en]
   *   [ja]この要素を無効化するかどうかを指定します。[/ja]
   */
  isDisabled() {
    return this.hasAttribute('disabled');
  }

  /**
   * @method isInline
   * @signature isInline()
   * @return {Boolean}
   * @description
   *   [en]Returns whether the component is inline or not.[/en]
   *   [ja]この要素がインライン要素かどうかを返します。[/ja]
   */
  isInline() {
    return this.hasAttribute('inline');
  }

  /**
   * @method isShown
   * @signature isShown()
   * @return {Boolean}
   *   [en]True if the component is visible.[/en]
   *   [ja]表示されているかどうかを返します。[/ja]
   * @description
   *   [en]Return whether the component is visible or not.[/en]
   *   [ja]表示されているかどうかを返します。[/ja]
   */
  isShown() {
    return this._shown && this.style.display !== 'none';
  }

  isItemShown() {
    return this._itemShown;
  }

  /**
   * @method toggle
   * @signature toggle()
   * @description
   *   [en]Toggle visibility.[/en]
   *   [ja]Speed dialの表示非表示を切り替えます。[/ja]
   */
  toggle() {
    if (this.isShown()) {
      this.hide();
    } else {
      this.show();
    }
  }

  /**
   * @method toggleItems
   * @signature toggleItems()
   * @description
   *   [en]Toggle item visibility.[/en]
   *   [ja]Speed dialの子要素の表示非表示を切り替えます。[/ja]
   */
  toggleItems() {
    if (this.isItemShown()) {
      this.hideItems();
    } else {
      this.showItems();
    }
  }
}

window.OnsSpeedDialElement = document.registerElement('ons-speed-dial', {
  prototype: SpeedDialElement.prototype
});
