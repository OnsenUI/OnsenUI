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
import platform from '../../ons/platform';
import iPhoneXPatch from '../../ons/iphonex-patch';
import ToastAnimator from './animator';

/**
 * Ascend Toast Animator.
 */

var AscendToastAnimator = function (_ToastAnimator) {
  _inherits(AscendToastAnimator, _ToastAnimator);

  function AscendToastAnimator() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$timing = _ref.timing,
        timing = _ref$timing === undefined ? 'ease' : _ref$timing,
        _ref$delay = _ref.delay,
        delay = _ref$delay === undefined ? 0 : _ref$delay,
        _ref$duration = _ref.duration,
        duration = _ref$duration === undefined ? 0.25 : _ref$duration;

    _classCallCheck(this, AscendToastAnimator);

    var _this = _possibleConstructorReturn(this, (AscendToastAnimator.__proto__ || _Object$getPrototypeOf(AscendToastAnimator)).call(this, { timing: timing, delay: delay, duration: duration }));

    _this.messageDelay = _this.duration * 0.4 + _this.delay; // Delay message opacity change
    if (platform.isAndroid()) {
      _this.ascension = 48; // Toasts are always 1 line
    } else {
      if (iPhoneXPatch.isIPhoneXPortraitPatchActive()) {
        _this.ascension = 98; // 64 + 34
      } else if (iPhoneXPatch.isIPhoneXLandscapePatchActive()) {
        _this.ascension = 85; // 64 + 21
      } else {
        _this.ascension = 64;
      }
    }
    return _this;
  }

  /**
   * @param {HTMLElement} toast
   * @param {Function} callback
   */


  _createClass(AscendToastAnimator, [{
    key: 'show',
    value: function show(toast, callback) {
      toast = toast._toast;
      util.globals.fabOffset = this.ascension;

      animit.runAll(animit(toast).saveStyle().queue({
        transform: 'translate3d(0, ' + this.ascension + 'px, 0)'
      }).wait(this.delay).queue({
        transform: 'translate3d(0, 0, 0)'
      }, {
        duration: this.duration,
        timing: this.timing
      }).restoreStyle().queue(function (done) {
        callback && callback();
        done();
      }), animit(this._getFabs()).wait(this.delay).queue({
        transform: 'translate3d(0, -' + this.ascension + 'px, 0) scale(1)'
      }, {
        duration: this.duration,
        timing: this.timing
      }), animit(util.arrayFrom(toast.children)).saveStyle().queue({
        opacity: 0
      }).wait(this.messageDelay).queue({
        opacity: 1.0
      }, {
        duration: this.duration,
        timing: this.timing
      }).restoreStyle());
    }

    /**
     * @param {HTMLElement} toast
     * @param {Function} callback
     */

  }, {
    key: 'hide',
    value: function hide(toast, callback) {
      toast = toast._toast;
      util.globals.fabOffset = 0;

      animit.runAll(animit(toast).saveStyle().queue({
        transform: 'translate3d(0, 0, 0)'
      }).wait(this.delay).queue({
        transform: 'translate3d(0, ' + this.ascension + 'px, 0)'
      }, {
        duration: this.duration,
        timing: this.timing
      }).restoreStyle().queue(function (done) {
        callback && callback();
        done();
      }), animit(this._getFabs()).wait(this.delay).queue({
        transform: 'translate3d(0, 0, 0) scale(1)'
      }, {
        duration: this.duration,
        timing: this.timing
      }), animit(util.arrayFrom(toast.children)).saveStyle().queue({
        opacity: 1.0
      }).wait(this.delay).queue({
        opacity: 0
      }, {
        duration: this.duration,
        timing: this.timing
      }).restoreStyle());
    }
  }, {
    key: '_getFabs',
    value: function _getFabs() {
      return util.arrayFrom(document.querySelectorAll('ons-fab[position~=bottom], ons-speed-dial[position~=bottom]')).filter(function (fab) {
        return fab.visible;
      });
    }
  }]);

  return AscendToastAnimator;
}(ToastAnimator);

export default AscendToastAnimator;