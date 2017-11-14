import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import _setImmediate from 'babel-runtime/core-js/set-immediate';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _get from 'babel-runtime/helpers/get';
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
import BaseInputElement from './base/base-input';

var scheme = {
  '': 'range--*',
  '.range__input': 'range--*__input',
  '.range__focus-ring': 'range--*__focus-ring'
};

var activeClassToken = 'range__input--active';

/**
 * @element ons-range
 * @category form
 * @modifier material
 *   [en]Material Design slider[/en]
 *   [ja][/ja]
 * @description
 *   [en]
 *     Range input component. Used to display a draggable slider.
 *
 *     Works very similar to the `<input type="range">` element.
 *   [/en]
 *   [ja][/ja]
 * @codepen xZQomM
 * @tutorial vanilla/Reference/range
 * @guide theming.html#modifiers [en]More details about the `modifier` attribute[/en][ja]modifier属性の使い方[/ja]
 * @seealso ons-input
 *   [en]The `<ons-input>` component is used to display text inputs, radio buttons and checkboxes.[/en]
 *   [ja][/ja]
 * @example
 * <ons-range value="20"></ons-range>
 * <ons-range modifier="material" value="10"></range>
 */

var RangeElement = function (_BaseInputElement) {
  _inherits(RangeElement, _BaseInputElement);

  function RangeElement() {
    _classCallCheck(this, RangeElement);

    var _this = _possibleConstructorReturn(this, (RangeElement.__proto__ || _Object$getPrototypeOf(RangeElement)).call(this));

    _this._boundOnMouseDown = _this._onMouseDown.bind(_this);
    _this._boundOnMouseUp = _this._onMouseUp.bind(_this);
    _this._boundOnTouchStart = _this._onTouchStart.bind(_this);
    _this._boundOnTouchEnd = _this._onTouchEnd.bind(_this);
    _this._boundOnInput = _this._update.bind(_this);
    _this._boundOnDragstart = _this._onDragstart.bind(_this);
    _this._boundOnDragend = _this._onDragend.bind(_this);
    return _this;
  }

  _createClass(RangeElement, [{
    key: '_compile',
    value: function _compile() {
      _get(RangeElement.prototype.__proto__ || _Object$getPrototypeOf(RangeElement.prototype), '_compile', this).call(this);
      this._updateDisabled(this.hasAttribute('disabled'));
    }

    /* Inherited props */

  }, {
    key: '_update',
    value: function _update() {
      var input = this._input;
      var focusRing = this._focusRing;

      input.style.backgroundSize = 100 * this._ratio + '% 2px';
      focusRing.value = this.value;

      // NOTE: "_zero" attribute is used for CSS styling.
      if (input.min === '' && input.value === '0' || input.min === input.value) {
        input.setAttribute('_zero', '');
      } else {
        input.removeAttribute('_zero');
      }

      ['min', 'max'].forEach(function (attr) {
        return focusRing[attr] = input[attr];
      });
    }
  }, {
    key: '_onMouseDown',


    /* Own props */

    value: function _onMouseDown(e) {
      var _this2 = this;

      this._input.classList.add(activeClassToken);
      _setImmediate(function () {
        return _this2._input.focus();
      });
    }
  }, {
    key: '_onTouchStart',
    value: function _onTouchStart(e) {
      this._onMouseDown();
    }
  }, {
    key: '_onMouseUp',
    value: function _onMouseUp(e) {
      this._input.classList.remove(activeClassToken);
    }
  }, {
    key: '_onTouchEnd',
    value: function _onTouchEnd(e) {
      this._onMouseUp(e);
    }
  }, {
    key: '_onDragstart',
    value: function _onDragstart(e) {
      e.consumed = true;
      e.gesture.stopPropagation();
      this._input.classList.add(activeClassToken);
      this.addEventListener('drag', this._onDrag);
    }
  }, {
    key: '_onDrag',
    value: function _onDrag(e) {
      e.stopPropagation();
    }
  }, {
    key: '_onDragend',
    value: function _onDragend(e) {
      this._input.classList.remove(activeClassToken);
      this.removeEventListener('drag', this._onDrag);
    }
  }, {
    key: 'attributeChangedCallback',
    value: function attributeChangedCallback(name, last, current) {
      if (name === 'disabled') {
        this._updateDisabled(current);
      }
      _get(RangeElement.prototype.__proto__ || _Object$getPrototypeOf(RangeElement.prototype), 'attributeChangedCallback', this).call(this, name, last, current);
    }

    /**
     * @param {boolean} disabled
     */

  }, {
    key: '_updateDisabled',
    value: function _updateDisabled(disabled) {
      if (disabled) {
        this.classList.add('range--disabled');
      } else {
        this.classList.remove('range--disabled');
      }
    }
  }, {
    key: 'connectedCallback',
    value: function connectedCallback() {
      this.addEventListener('mousedown', this._boundOnMouseDown);
      this.addEventListener('mouseup', this._boundOnMouseUp);
      this.addEventListener('touchstart', this._boundOnTouchStart);
      this.addEventListener('touchend', this._boundOnTouchEnd);
      this.addEventListener('dragstart', this._boundOnDragstart);
      this.addEventListener('dragend', this._boundOnDragend);
      this.addEventListener('input', this._boundOnInput);
    }
  }, {
    key: 'disconnectedCallback',
    value: function disconnectedCallback() {
      this.removeEventListener('mousedown', this._boundOnMouseDown);
      this.removeEventListener('mouseup', this._boundOnMouseUp);
      this.removeEventListener('touchstart', this._boundOnTouchStart);
      this.removeEventListener('touchend', this._boundOnTouchEnd);
      this.removeEventListener('dragstart', this._boundOnDragstart);
      this.removeEventListener('dragend', this._boundOnDragend);
      this.removeEventListener('input', this._boundOnInput);
    }

    /**
     * @attribute disabled
     * @description
     *   [en]Whether the element is disabled or not.[/en]
     *   [ja]無効化されている場合に`true`。[/ja]
     */

    /**
     * @property disabled
     * @type {Boolean}
     * @description
     *   [en]Whether the element is disabled or not.[/en]
     *   [ja]無効化されている場合に`true`。[/ja]
     */

    /**
     * @property value
     * @type {Number}
     * @description
     *   [en]Current value.[/en]
     *   [ja][/ja]
     */

  }, {
    key: '_scheme',
    get: function get() {
      return scheme;
    }
  }, {
    key: '_template',
    get: function get() {
      return '\n      <input type="' + this.type + '" class="' + this._defaultClassName + '__input">\n      <input type="range" class="range__focus-ring" tabIndex="-1">\n    ';
    }
  }, {
    key: '_defaultClassName',
    get: function get() {
      return 'range';
    }
  }, {
    key: 'type',
    get: function get() {
      return 'range';
    }
  }, {
    key: '_focusRing',
    get: function get() {
      return this.children[1];
    }
  }, {
    key: '_ratio',
    get: function get() {
      // Returns the current ratio.
      var min = this._input.min === '' ? 0 : parseInt(this._input.min);
      var max = this._input.max === '' ? 100 : parseInt(this._input.max);

      return (this.value - min) / (max - min);
    }
  }], [{
    key: 'observedAttributes',
    get: function get() {
      return ['disabled'].concat(_toConsumableArray(BaseInputElement.observedAttributes));
    }
  }]);

  return RangeElement;
}(BaseInputElement);

export default RangeElement;


ons.elements.Range = RangeElement;
customElements.define('ons-range', RangeElement);