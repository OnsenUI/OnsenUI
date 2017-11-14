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

import util from '../../ons/util';
import NavigatorAnimator from './animator';
import animit from '../../ons/animit';

/**
 * Slide animator for navigator transition.
 */

var MDSlideNavigatorAnimator = function (_NavigatorAnimator) {
  _inherits(MDSlideNavigatorAnimator, _NavigatorAnimator);

  function MDSlideNavigatorAnimator() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$timing = _ref.timing,
        timing = _ref$timing === undefined ? 'cubic-bezier(.1, .7, .4, 1)' : _ref$timing,
        _ref$delay = _ref.delay,
        delay = _ref$delay === undefined ? 0 : _ref$delay,
        _ref$duration = _ref.duration,
        duration = _ref$duration === undefined ? 0.3 : _ref$duration;

    _classCallCheck(this, MDSlideNavigatorAnimator);

    var _this = _possibleConstructorReturn(this, (MDSlideNavigatorAnimator.__proto__ || _Object$getPrototypeOf(MDSlideNavigatorAnimator)).call(this, { timing: timing, delay: delay, duration: duration }));

    _this.backgroundMask = util.createElement('\n      <div style="position: absolute; width: 100%; height: 100%; z-index: 2;\n        background-color: black; opacity: 0;"></div>\n    ');
    _this.blackMaskOpacity = 0.4;
    return _this;
  }

  /**
   * @param {Object} enterPage
   * @param {Object} leavePage
   * @param {Function} callback
   */


  _createClass(MDSlideNavigatorAnimator, [{
    key: 'push',
    value: function push(enterPage, leavePage, callback) {
      var _this2 = this;

      this.backgroundMask.remove();
      leavePage.parentElement.insertBefore(this.backgroundMask, leavePage.nextSibling);

      var unblock = _get(MDSlideNavigatorAnimator.prototype.__proto__ || _Object$getPrototypeOf(MDSlideNavigatorAnimator.prototype), 'block', this).call(this, enterPage);

      animit.runAll(animit(this.backgroundMask).saveStyle().queue({
        opacity: 0,
        transform: 'translate3d(0, 0, 0)'
      }).wait(this.delay).queue({
        opacity: this.blackMaskOpacity
      }, {
        duration: this.duration,
        timing: this.timing
      }).restoreStyle().queue(function (done) {
        _this2.backgroundMask.remove();
        done();
      }), animit(enterPage).saveStyle().queue({
        css: {
          transform: 'translate3D(100%, 0, 0)'
        },
        duration: 0
      }).wait(this.delay).queue({
        css: {
          transform: 'translate3D(0, 0, 0)'
        },
        duration: this.duration,
        timing: this.timing
      }).restoreStyle(), animit(leavePage).saveStyle().queue({
        css: {
          transform: 'translate3D(0, 0, 0)'
        },
        duration: 0
      }).wait(this.delay).queue({
        css: {
          transform: 'translate3D(-45%, 0px, 0px)'
        },
        duration: this.duration,
        timing: this.timing
      }).restoreStyle().wait(0.2).queue(function (done) {
        unblock();
        callback();
        done();
      }));
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
      enterPage.parentNode.insertBefore(this.backgroundMask, enterPage.nextSibling);

      var unblock = _get(MDSlideNavigatorAnimator.prototype.__proto__ || _Object$getPrototypeOf(MDSlideNavigatorAnimator.prototype), 'block', this).call(this, enterPage);

      animit.runAll(animit(this.backgroundMask).saveStyle().queue({
        opacity: this.blackMaskOpacity,
        transform: 'translate3d(0, 0, 0)'
      }).wait(this.delay).queue({
        opacity: 0
      }, {
        duration: this.duration,
        timing: this.timing
      }).restoreStyle().queue(function (done) {
        _this3.backgroundMask.remove();
        done();
      }), animit(enterPage).saveStyle().queue({
        css: {
          transform: 'translate3D(-45%, 0px, 0px)',
          opacity: 0.9
        },
        duration: 0
      }).wait(this.delay).queue({
        css: {
          transform: 'translate3D(0px, 0px, 0px)',
          opacity: 1.0
        },
        duration: this.duration,
        timing: this.timing
      }).restoreStyle(), animit(leavePage).queue({
        css: {
          transform: 'translate3D(0px, 0px, 0px)'
        },
        duration: 0
      }).wait(this.delay).queue({
        css: {
          transform: 'translate3D(100%, 0px, 0px)'
        },
        duration: this.duration,
        timing: this.timing
      }).wait(0.2).queue(function (done) {
        unblock();
        callback();
        done();
      }));
    }
  }]);

  return MDSlideNavigatorAnimator;
}(NavigatorAnimator);

export default MDSlideNavigatorAnimator;