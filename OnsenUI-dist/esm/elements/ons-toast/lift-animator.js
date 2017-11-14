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

import util from '../../ons/util';
import animit from '../../ons/animit';
import iPhoneXPatch from '../../ons/iphonex-patch';
import ToastAnimator from './animator';

/**
 * Lift-fade Toast Animator
 */

var LiftToastAnimator = function (_ToastAnimator) {
  _inherits(LiftToastAnimator, _ToastAnimator);

  function LiftToastAnimator() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$timing = _ref.timing,
        timing = _ref$timing === undefined ? 'ease' : _ref$timing,
        _ref$delay = _ref.delay,
        delay = _ref$delay === undefined ? 0 : _ref$delay,
        _ref$duration = _ref.duration,
        duration = _ref$duration === undefined ? 0.35 : _ref$duration;

    _classCallCheck(this, LiftToastAnimator);

    var _this = _possibleConstructorReturn(this, (LiftToastAnimator.__proto__ || _Object$getPrototypeOf(LiftToastAnimator)).call(this, { timing: timing, delay: delay, duration: duration }));

    _this.bodyHeight = document.body.clientHeight; // avoid Forced Synchronous Layout
    if (iPhoneXPatch.isIPhoneXPortraitPatchActive()) {
      _this.liftAmount = 'calc(100% + 34px)';
    } else if (iPhoneXPatch.isIPhoneXLandscapePatchActive()) {
      _this.liftAmount = 'calc(100% + 21px)';
    } else {
      _this.liftAmount = '100%';
    }
    return _this;
  }

  /**
   * @param {HTMLElement} toast
   * @param {Function} callback
   */


  _createClass(LiftToastAnimator, [{
    key: 'show',
    value: function show(toast, callback) {
      toast = toast._toast;

      animit.runAll(animit(toast).saveStyle().queue({
        transform: 'translate3d(0, ' + this.liftAmount + ', 0)',
        opacity: 0
      }).wait(this.delay).queue({
        transform: 'translate3d(0, 0, 0)',
        opacity: 1.0
      }, {
        duration: this.duration,
        timing: this.timing
      }).restoreStyle().queue(function (done) {
        callback && callback();
        done();
      }));
    }

    /**
     * @param {HTMLElement} toast
     * @param {Function} callback
     */

  }, {
    key: 'hide',
    value: function hide(toast, callback) {
      toast = toast._toast;

      animit.runAll(animit(toast).saveStyle().queue({
        transform: 'translate3d(0, 0, 0)',
        opacity: 1.0
      }).wait(this.delay).queue({
        transform: 'translate3d(0, ' + this.liftAmount + ', 0)',
        opacity: 0
      }, {
        duration: this.duration,
        timing: this.timing
      }).restoreStyle().queue(function (done) {
        callback && callback();
        done();
      }));
    }
  }, {
    key: '_updatePosition',
    value: function _updatePosition(toast) {
      if (parseInt(toast.style.top, 10) === 0) {
        toast.style.top = toast.style.bottom = '';
      }
    }
  }]);

  return LiftToastAnimator;
}(ToastAnimator);

export default LiftToastAnimator;