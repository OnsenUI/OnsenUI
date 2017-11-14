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
import BaseElement from './base/base-element';
import util from '../ons/util';
import contentReady from '../ons/content-ready';

var SplitterMaskElement = function (_BaseElement) {
  _inherits(SplitterMaskElement, _BaseElement);

  function SplitterMaskElement() {
    _classCallCheck(this, SplitterMaskElement);

    var _this = _possibleConstructorReturn(this, (SplitterMaskElement.__proto__ || _Object$getPrototypeOf(SplitterMaskElement)).call(this));

    _this._boundOnClick = _this._onClick.bind(_this);
    contentReady(_this, function () {
      if (_this.parentNode._sides.every(function (side) {
        return side.mode === 'split';
      })) {
        _this.setAttribute('style', 'display: none !important');
      }
    });
    return _this;
  }

  _createClass(SplitterMaskElement, [{
    key: '_onClick',
    value: function _onClick(event) {
      if (this.onClick instanceof Function) {
        this.onClick();
      } else if (util.match(this.parentNode, 'ons-splitter')) {
        this.parentNode._sides.forEach(function (side) {
          return side.close('left').catch(function () {});
        });
      }
      event.stopPropagation();
    }
  }, {
    key: '_preventScroll',
    value: function _preventScroll(e) {
      e.cancelable && e.preventDefault(); // Fix for iOS. Prevents scrolling content behind mask.
    }
  }, {
    key: 'attributeChangedCallback',
    value: function attributeChangedCallback(name, last, current) {}
  }, {
    key: 'connectedCallback',
    value: function connectedCallback() {
      this.addEventListener('click', this._boundOnClick);
      this.addEventListener('touchmove', this._preventScroll);
    }
  }, {
    key: 'disconnectedCallback',
    value: function disconnectedCallback() {
      this.removeEventListener('click', this._boundOnClick);
      this.removeEventListener('touchmove', this._preventScroll);
    }
  }], [{
    key: 'observedAttributes',
    get: function get() {
      return [];
    }
  }]);

  return SplitterMaskElement;
}(BaseElement);

export default SplitterMaskElement;


ons.elements.SplitterMask = SplitterMaskElement;
customElements.define('ons-splitter-mask', SplitterMaskElement);