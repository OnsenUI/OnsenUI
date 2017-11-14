import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
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

import ons from '../ons';
import util from '../ons/util';
import BaseElement from './base/base-element';
import ModifierUtil from '../ons/internal/modifier-util';
var scheme = { '': 'carousel-item--*' };

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

var CarouselItemElement = function (_BaseElement) {
  _inherits(CarouselItemElement, _BaseElement);

  function CarouselItemElement() {
    _classCallCheck(this, CarouselItemElement);

    var _this = _possibleConstructorReturn(this, (CarouselItemElement.__proto__ || _Object$getPrototypeOf(CarouselItemElement)).call(this));

    _this.style.width = '100%';
    ModifierUtil.initModifier(_this, scheme);
    return _this;
  }

  _createClass(CarouselItemElement, [{
    key: 'attributeChangedCallback',
    value: function attributeChangedCallback(name, last, current) {
      if (name === 'modifier') {
        return ModifierUtil.onModifierChanged(last, current, this, scheme);
      }
    }
  }], [{
    key: 'observedAttributes',
    get: function get() {
      return ['modifier'];
    }
  }]);

  return CarouselItemElement;
}(BaseElement);

export default CarouselItemElement;


ons.elements.CarouselItem = CarouselItemElement;
customElements.define('ons-carousel-item', CarouselItemElement);