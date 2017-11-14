import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
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

import BaseInputElement from './base-input';
import contentReady from '../../ons/content-ready';

var BaseCheckboxElement = function (_BaseInputElement) {
  _inherits(BaseCheckboxElement, _BaseInputElement);

  function BaseCheckboxElement() {
    _classCallCheck(this, BaseCheckboxElement);

    var _this = _possibleConstructorReturn(this, (BaseCheckboxElement.__proto__ || _Object$getPrototypeOf(BaseCheckboxElement)).call(this));

    contentReady(_this, function () {
      _this.attributeChangedCallback('checked', null, _this.getAttribute('checked'));
    });
    return _this;
  }

  /* Inherited props */

  _createClass(BaseCheckboxElement, [{
    key: 'attributeChangedCallback',
    value: function attributeChangedCallback(name, last, current) {
      switch (name) {
        case 'checked':
          this.checked = current !== null;
          break;
        default:
          _get(BaseCheckboxElement.prototype.__proto__ || _Object$getPrototypeOf(BaseCheckboxElement.prototype), 'attributeChangedCallback', this).call(this, name, last, current);
      }
    }
  }, {
    key: '_template',
    get: function get() {
      return '\n      <input type="' + this.type + '" class="' + this._defaultClassName + '__input">\n      <span class="' + this._defaultClassName + '__checkmark"></span>\n    ';
    }

    /* Own props */

  }, {
    key: '_helper',
    get: function get() {
      return this.querySelector('span');
    }
  }, {
    key: 'checked',
    get: function get() {
      return this._input.checked;
    },
    set: function set(val) {
      var _this2 = this;

      contentReady(this, function () {
        _this2._input.checked = val;
      });
    }
  }], [{
    key: 'observedAttributes',
    get: function get() {
      return [].concat(_toConsumableArray(_get(BaseCheckboxElement.__proto__ || _Object$getPrototypeOf(BaseCheckboxElement), 'observedAttributes', this)), ['checked']);
    }
  }]);

  return BaseCheckboxElement;
}(BaseInputElement);

export default BaseCheckboxElement;