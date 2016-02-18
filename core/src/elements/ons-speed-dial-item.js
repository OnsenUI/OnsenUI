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
  '': 'speed-dial__item--*',
};

/**
 * @element ons-speed-dial-item
 * @category speeddial
 * @description
 *   [en]This component displays the child elements of the Material Design Speed dial component.[/en]
 *   [ja]Material DesignのSpeed dialの子要素を表現する要素です。[/ja]
 * @codepen dYQYLg
 * @seealso ons-speed-dial
 *   [en]ons-speed-dial component[/en]
 *   [ja]ons-speed-dialコンポーネント[/ja]
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
class SpeedDialItemElement extends BaseElement {

  /**
   * @attribute modifier
   * @type {String}
   * @description
   *   [en]The appearance of the component.[/en]
   *   [ja]このコンポーネントの表現を指定します。[/ja]
   */

  createdCallback() {
    if (!this.hasAttribute('_compiled')) {
      this._compile();
    }

    this._boundOnClick = this._onClick.bind(this);
  }

  attributeChangedCallback(name, last, current) {
    if (name === 'modifier') {
      return ModifierUtil.onModifierChanged(last, current, this, scheme);
    }
  }

  attachedCallback() {
    this.addEventListener('click', this._boundOnClick, false);
  }

  detachedCallback() {
    this.removeEventListener('click', this._boundOnClick, false);
  }

  _onClick(e) {
    e.stopPropagation();
  }

  _compile() {
    ons._autoStyle.prepare(this);

    this.classList.add('fab');
    this.classList.add('fab--mini');
    this.classList.add('speed-dial__item');

    if (this.getAttribute('effect') === 'ripple' && !util.findChild(this, 'ons-ripple')) {
      this.insertBefore(document.createElement('ons-ripple'), this.firstChild);
    }

    ModifierUtil.initModifier(this, scheme);

    this.setAttribute('_compiled', '');
  }
}

window.OnsSpeedDialItemElement = document.registerElement('ons-speed-dial-item', {
  prototype: SpeedDialItemElement.prototype
});
