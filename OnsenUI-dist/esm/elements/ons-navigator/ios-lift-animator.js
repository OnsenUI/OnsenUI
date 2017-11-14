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
 * Lift screen transition.
 */

var IOSLiftNavigatorAnimator = function (_NavigatorAnimator) {
  _inherits(IOSLiftNavigatorAnimator, _NavigatorAnimator);

  function IOSLiftNavigatorAnimator() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$timing = _ref.timing,
        timing = _ref$timing === undefined ? 'cubic-bezier(.1, .7, .1, 1)' : _ref$timing,
        _ref$delay = _ref.delay,
        delay = _ref$delay === undefined ? 0 : _ref$delay,
        _ref$duration = _ref.duration,
        duration = _ref$duration === undefined ? 0.4 : _ref$duration;

    _classCallCheck(this, IOSLiftNavigatorAnimator);

    var _this = _possibleConstructorReturn(this, (IOSLiftNavigatorAnimator.__proto__ || _Object$getPrototypeOf(IOSLiftNavigatorAnimator)).call(this, { timing: timing, delay: delay, duration: duration }));

    _this.backgroundMask = util.createElement('\n      <div style="position: absolute; width: 100%; height: 100%;\n        background: linear-gradient(black, white);"></div>\n    ');
    return _this;
  }

  /**
   * @param {Object} enterPage
   * @param {Object} leavePage
   * @param {Function} callback
   */


  _createClass(IOSLiftNavigatorAnimator, [{
    key: 'push',
    value: function push(enterPage, leavePage, callback) {
      var _this2 = this;

      this.backgroundMask.remove();
      leavePage.parentNode.insertBefore(this.backgroundMask, leavePage);

      var unblock = _get(IOSLiftNavigatorAnimator.prototype.__proto__ || _Object$getPrototypeOf(IOSLiftNavigatorAnimator.prototype), 'block', this).call(this, enterPage);

      animit.runAll(animit(enterPage).saveStyle().queue({
        css: {
          transform: 'translate3D(0, 100%, 0)'
        },
        duration: 0
      }).wait(this.delay).queue({
        css: {
          transform: 'translate3D(0, 0, 0)'
        },
        duration: this.duration,
        timing: this.timing
      }).restoreStyle().queue(function (done) {
        _this2.backgroundMask.remove();
        unblock();
        callback();
        done();
      }), animit(leavePage).saveStyle().queue({
        css: {
          transform: 'translate3D(0, 0, 0)',
          opacity: 1.0
        },
        duration: 0
      }).wait(this.delay).queue({
        css: {
          transform: 'translate3D(0, -10%, 0)',
          opacity: 0.9
        },
        duration: this.duration,
        timing: this.timing
      }).restoreStyle());
    }

    /**
     * @param {Object} enterPage
     * @param {Object} leavePage
     * @param {Function} callback
     */

  }, {
    key: 'pop',
    value: function pop(enterPage, leavePage, callback) {
      var _this3 = this;

      this.backgroundMask.remove();
      enterPage.parentNode.insertBefore(this.backgroundMask, enterPage);

      var unblock = _get(IOSLiftNavigatorAnimator.prototype.__proto__ || _Object$getPrototypeOf(IOSLiftNavigatorAnimator.prototype), 'block', this).call(this, enterPage);

      animit.runAll(animit(enterPage).saveStyle().queue({
        css: {
          transform: 'translate3D(0, -43px, 0)', // Smaller than iOS toolbar - fixes glitch
          opacity: 0.9
        },
        duration: 0
      }).wait(this.delay).queue({
        css: {
          transform: 'translate3D(0, 0, 0)',
          opacity: 1.0
        },
        duration: this.duration,
        timing: this.timing
      }).restoreStyle().queue(function (done) {
        _this3.backgroundMask.remove();
        unblock();
        callback();
        done();
      }), animit(leavePage).saveStyle().queue({
        css: {
          transform: 'translate3D(0, 0, 0)'
        },
        duration: 0
      }).wait(this.delay).queue({
        css: {
          transform: 'translate3D(0, 100%, 0)'
        },
        duration: this.duration,
        timing: this.timing
      }).restoreStyle());
    }
  }]);

  return IOSLiftNavigatorAnimator;
}(NavigatorAnimator);

export default IOSLiftNavigatorAnimator;