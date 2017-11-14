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

import NavigatorAnimator from './animator';
import util from '../../ons/util';
import animit from '../../ons/animit';

/**
 * Fade-in + Lift screen transition.
 */

var MDFadeNavigatorAnimator = function (_NavigatorAnimator) {
  _inherits(MDFadeNavigatorAnimator, _NavigatorAnimator);

  function MDFadeNavigatorAnimator() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$timing = _ref.timing,
        timing = _ref$timing === undefined ? 'cubic-bezier(0.4, 0.0, 0.2, 1)' : _ref$timing,
        _ref$timingOnPop = _ref.timingOnPop,
        timingOnPop = _ref$timingOnPop === undefined ? 'cubic-bezier(0.4, 0.0, 1, 1)' : _ref$timingOnPop,
        _ref$delay = _ref.delay,
        delay = _ref$delay === undefined ? 0 : _ref$delay,
        _ref$duration = _ref.duration,
        duration = _ref$duration === undefined ? 0.2 : _ref$duration;

    _classCallCheck(this, MDFadeNavigatorAnimator);

    var _this = _possibleConstructorReturn(this, (MDFadeNavigatorAnimator.__proto__ || _Object$getPrototypeOf(MDFadeNavigatorAnimator)).call(this, { timing: timing, delay: delay, duration: duration }));

    _this.timingOnPop = timingOnPop;
    return _this;
  }

  /**
   * @param {Object} enterPage
   * @param {Object} leavePage
   * @param {Function} callback
   */


  _createClass(MDFadeNavigatorAnimator, [{
    key: 'push',
    value: function push(enterPage, leavePage, callback) {
      var unblock = _get(MDFadeNavigatorAnimator.prototype.__proto__ || _Object$getPrototypeOf(MDFadeNavigatorAnimator.prototype), 'block', this).call(this, enterPage);

      animit.runAll(animit(enterPage).saveStyle().queue({
        css: {
          transform: 'translate3D(0, 42px, 0)',
          opacity: 0
        },
        duration: 0
      }).wait(this.delay).queue({
        css: {
          transform: 'translate3D(0, 0, 0)',
          opacity: 1
        },
        duration: this.duration,
        timing: this.timing
      }).restoreStyle().queue(function (done) {
        unblock();
        callback();
        done();
      }));
    }

    /**
     * @param {Object} enterPage
     * @param {Object} leavePage
     * @param {Function} done
     */

  }, {
    key: 'pop',
    value: function pop(enterPage, leavePage, callback) {
      var unblock = _get(MDFadeNavigatorAnimator.prototype.__proto__ || _Object$getPrototypeOf(MDFadeNavigatorAnimator.prototype), 'block', this).call(this, enterPage);

      animit.runAll(animit(leavePage).queue({
        css: {
          transform: 'translate3D(0, 0, 0)',
          opacity: 1
        },
        duration: 0
      }).wait(0.15).queue({
        css: {
          transform: 'translate3D(0, 38px, 0)',
          opacity: 0
        },
        duration: this.duration,
        timing: this.timingOnPop
      }).queue(function (done) {
        unblock();
        callback();
        done();
      }));
    }
  }]);

  return MDFadeNavigatorAnimator;
}(NavigatorAnimator);

export default MDFadeNavigatorAnimator;