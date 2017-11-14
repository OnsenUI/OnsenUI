import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
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

function getElementClass() {
  if (typeof HTMLElement !== 'function') {
    // case of Safari
    var _BaseElement = function _BaseElement() {};
    _BaseElement.prototype = document.createElement('div');
    return _BaseElement;
  } else {
    return HTMLElement;
  }
}

var BaseElement = function (_getElementClass) {
  _inherits(BaseElement, _getElementClass);

  function BaseElement() {
    _classCallCheck(this, BaseElement);

    return _possibleConstructorReturn(this, (BaseElement.__proto__ || _Object$getPrototypeOf(BaseElement)).call(this));
  }

  return BaseElement;
}(getElementClass());

export default BaseElement;