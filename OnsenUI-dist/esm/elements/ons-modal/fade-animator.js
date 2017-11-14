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

import animit from '../../ons/animit';
import ModalAnimator from './animator';

/**
 * iOS style animator for dialog.
 */

var FadeModalAnimator = function (_ModalAnimator) {
  _inherits(FadeModalAnimator, _ModalAnimator);

  function FadeModalAnimator() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$timing = _ref.timing,
        timing = _ref$timing === undefined ? 'linear' : _ref$timing,
        _ref$delay = _ref.delay,
        delay = _ref$delay === undefined ? 0 : _ref$delay,
        _ref$duration = _ref.duration,
        duration = _ref$duration === undefined ? 0.3 : _ref$duration;

    _classCallCheck(this, FadeModalAnimator);

    return _possibleConstructorReturn(this, (FadeModalAnimator.__proto__ || _Object$getPrototypeOf(FadeModalAnimator)).call(this, { timing: timing, delay: delay, duration: duration }));
  }

  /**
   * @param {HTMLElement} modal
   * @param {Function} callback
   */


  _createClass(FadeModalAnimator, [{
    key: 'show',
    value: function show(modal, callback) {
      callback = callback ? callback : function () {};

      animit(modal).queue({
        opacity: 0
      }).wait(this.delay).queue({
        opacity: 1.0
      }, {
        duration: this.duration,
        timing: this.timing
      }).queue(function (done) {
        callback();
        done();
      }).play();
    }

    /**
     * @param {HTMLElement} modal
     * @param {Function} callback
     */

  }, {
    key: 'hide',
    value: function hide(modal, callback) {
      callback = callback ? callback : function () {};

      animit(modal).queue({
        opacity: 1
      }).wait(this.delay).queue({
        opacity: 0
      }, {
        duration: this.duration,
        timing: this.timing
      }).queue(function (done) {
        callback();
        done();
      }).play();
    }
  }]);

  return FadeModalAnimator;
}(ModalAnimator);

export default FadeModalAnimator;