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
import autoStyle from '../ons/autostyle';
import ModifierUtil from '../ons/internal/modifier-util';
import BaseElement from './base/base-element';
import contentReady from '../ons/content-ready';

var defaultClassName = 'card';
var scheme = {
  '': 'card--*',
  '.card__title': 'card--*__title',
  '.card__content': 'card--*__content'
};

/**
 * @element ons-card
 * @category visual
 * @modifier material
 *   [en]A card with material design.[/en]
 *   [ja]リストの上下のボーダーが無いリストを表示します。[/ja]
 * @description
 *   [en]
 *    Component to create a card that displays some information.
 *
 *    The card may be composed by divs with specially prepared classes `title` and/or `content`. You can also add your own content as you please.[/en]
 *   [ja][/ja]
 * @tutorial vanilla/Reference/card
 * @example
 * <ons-card>
 *   <p>Some content</p>
 * </ons-card>
 */

var CardElement = function (_BaseElement) {
  _inherits(CardElement, _BaseElement);

  /**
   * @attribute modifier
   * @type {String}
   * @description
   *   [en]The appearance of the card.[/en]
   *   [ja]リストの表現を指定します。[/ja]
   */

  function CardElement() {
    _classCallCheck(this, CardElement);

    var _this = _possibleConstructorReturn(this, (CardElement.__proto__ || _Object$getPrototypeOf(CardElement)).call(this));

    contentReady(_this, function () {
      _this._compile();
    });
    return _this;
  }

  _createClass(CardElement, [{
    key: '_compile',
    value: function _compile() {
      var title = void 0,
          content = void 0;

      for (var i = 0; i < this.children.length; i++) {
        var el = this.children[i];

        if (el.classList.contains('title')) {
          el.classList.add('card__title');
          title = el;
        } else if (el.classList.contains('content')) {
          el.classList.add('card__content');
          content = el;
        }
      }

      autoStyle.prepare(this);
      this.classList.add(defaultClassName);
      ModifierUtil.initModifier(this, scheme);
    }
  }, {
    key: 'attributeChangedCallback',
    value: function attributeChangedCallback(name, last, current) {
      switch (name) {
        case 'class':
          util.restoreClass(this, defaultClassName, scheme);
          break;
        case 'modifier':
          ModifierUtil.onModifierChanged(last, current, this, scheme);
          break;
      }
    }
  }], [{
    key: 'observedAttributes',
    get: function get() {
      return ['modifier', 'class'];
    }
  }]);

  return CardElement;
}(BaseElement);

export default CardElement;


ons.elements.Card = CardElement;
customElements.define('ons-card', CardElement);