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

const scheme = {
  '': 'speed-dial__item--*',
};

/**
 * @element ons-speed-dial-item
 * @category speed-dial
 * @description
 *   [en]
 *     This component displays the child elements of the Material Design Speed dial component.
 *   [/en]
 *   [ja]
 *     Material DesignのSpeed dialの子要素を表現する要素です。
 *   [/ja]
 * @codepen dYQYLg
 * @tutorial vanilla/Reference/speed-dial
 * @seealso ons-speed-dial
 *   [en]The `<ons-speed-dial>` component.[/en]
 *   [ja]ons-speed-dialコンポーネント[/ja]
 * @example
 * <ons-speed-dial position="left bottom">
 *   <ons-fab>
 *     <ons-icon icon="fa-twitter"></ons-icon>
 *   </ons-fab>
 *   <ons-speed-dial-item>A</ons-speed-dial-item>
 *   <ons-speed-dial-item>B</ons-speed-dial-item>
 *   <ons-speed-dial-item>C</ons-speed-dial-item>
 * </ons-speed-dial>
 */
class SpeedDialItemElement extends BaseElement {

  /**
   * @attribute modifier
   * @type {String}
   * @description
   *   [en]The appearance of the component.[/en]
   *   [ja]このコンポーネントの表現を指定します。[/ja]
   */

  createdCallback() {
    this._compile();

    this._boundOnClick = this._onClick.bind(this);
  }

  attributeChangedCallback(name, last, current) {
    switch (name) {
      case 'modifier':
        ModifierUtil.onModifierChanged(last, current, this, scheme);
        break;
      case 'ripple':
        this._updateRipple();
    }
  }

  attachedCallback() {
    this.addEventListener('click', this._boundOnClick, false);
  }

  detachedCallback() {
    this.removeEventListener('click', this._boundOnClick, false);
  }

  _updateRipple() {
    util.updateRipple(this);
  }

  _onClick(e) {
    e.stopPropagation();
  }

  _compile() {
    autoStyle.prepare(this);

    this.classList.add('fab');
    this.classList.add('fab--mini');
    this.classList.add('speed-dial__item');

    this._updateRipple();

    ModifierUtil.initModifier(this, scheme);
  }
}

window.OnsSpeedDialItemElement = document.registerElement('ons-speed-dial-item', {
  prototype: SpeedDialItemElement.prototype
});
