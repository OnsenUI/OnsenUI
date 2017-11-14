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

import BaseAnimator from '../../ons/base-animator';

var ModalAnimator = function (_BaseAnimator) {
  _inherits(ModalAnimator, _BaseAnimator);

  /**
   * @param {Object} options
   * @param {String} options.timing
   * @param {Number} options.duration
   * @param {Number} options.delay
   */
  function ModalAnimator() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$timing = _ref.timing,
        timing = _ref$timing === undefined ? 'linear' : _ref$timing,
        _ref$delay = _ref.delay,
        delay = _ref$delay === undefined ? 0 : _ref$delay,
        _ref$duration = _ref.duration,
        duration = _ref$duration === undefined ? 0.2 : _ref$duration;

    _classCallCheck(this, ModalAnimator);

    return _possibleConstructorReturn(this, (ModalAnimator.__proto__ || _Object$getPrototypeOf(ModalAnimator)).call(this, { timing: timing, delay: delay, duration: duration }));
  }

  /**
   * @param {HTMLElement} modal
   * @param {Function} callback
   */


  _createClass(ModalAnimator, [{
    key: 'show',
    value: function show(modal, callback) {
      callback();
    }

    /**
     * @param {HTMLElement} modal
     * @param {Function} callback
     */

  }, {
    key: 'hide',
    value: function hide(modal, callback) {
      callback();
    }
  }]);

  return ModalAnimator;
}(BaseAnimator);

export default ModalAnimator;