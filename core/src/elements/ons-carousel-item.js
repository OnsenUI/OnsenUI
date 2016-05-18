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
import BaseElement from 'ons/base-element';
import ModifierUtil from 'ons/internal/modifier-util';
const scheme = {'': 'carousel-item--*'};

/**
 * @element ons-carousel-item
 * @category carousel
 * @description
 *   [en]
 *     Carousel item component. Used as a child of the `<ons-carousel>` element.
 *   [/en]
 *   [ja][/ja]
 * @codepen xbbzOQ
 * @tutorial vanilla/Reference/carousel
 * @seealso ons-carousel
 *   [en]`<ons-carousel>` components[/en]
 *   [ja]<ons-carousel>コンポーネント[/ja]
 * @example
 * <ons-carousel style="width: 100%; height: 200px">
 *   <ons-carousel-item>
 *    ...
 *   </ons-carousel-item>
 *   <ons-carousel-item>
 *    ...
 *   </ons-carousel-item>
 * </ons-carousel>
 */
class CarouselItemElement extends BaseElement {

  createdCallback() {
    this.style.width = '100%';
    ModifierUtil.initModifier(this, scheme);
  }

  attributeChangedCallback(name, last, current) {
    if (name === 'modifier') {
      return ModifierUtil.onModifierChanged(last, current, this, scheme);
    }
  }
}

window.OnsCarouselItemElement = document.registerElement('ons-carousel-item', {
  prototype: CarouselItemElement.prototype
});
