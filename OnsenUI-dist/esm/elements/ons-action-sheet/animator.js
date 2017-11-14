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
import BaseAnimator from '../../ons/base-animator';

export var ActionSheetAnimator = function (_BaseAnimator) {
  _inherits(ActionSheetAnimator, _BaseAnimator);

  function ActionSheetAnimator() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$timing = _ref.timing,
        timing = _ref$timing === undefined ? 'linear' : _ref$timing,
        _ref$delay = _ref.delay,
        delay = _ref$delay === undefined ? 0 : _ref$delay,
        _ref$duration = _ref.duration,
        duration = _ref$duration === undefined ? 0.2 : _ref$duration;

    _classCallCheck(this, ActionSheetAnimator);

    return _possibleConstructorReturn(this, (ActionSheetAnimator.__proto__ || _Object$getPrototypeOf(ActionSheetAnimator)).call(this, { timing: timing, delay: delay, duration: duration }));
  }

  /**
   * @param {HTMLElement} dialog
   * @param {Function} done
   */


  _createClass(ActionSheetAnimator, [{
    key: 'show',
    value: function show(dialog, done) {
      done();
    }

    /**
     * @param {HTMLElement} dialog
     * @param {Function} done
     */

  }, {
    key: 'hide',
    value: function hide(dialog, done) {
      done();
    }
  }]);

  return ActionSheetAnimator;
}(BaseAnimator);

/**
 * Android style animator for Action Sheet.
 */
export var MDActionSheetAnimator = function (_ActionSheetAnimator) {
  _inherits(MDActionSheetAnimator, _ActionSheetAnimator);

  function MDActionSheetAnimator() {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref2$timing = _ref2.timing,
        timing = _ref2$timing === undefined ? 'ease' : _ref2$timing,
        _ref2$delay = _ref2.delay,
        delay = _ref2$delay === undefined ? 0 : _ref2$delay,
        _ref2$duration = _ref2.duration,
        duration = _ref2$duration === undefined ? 0.4 : _ref2$duration;

    _classCallCheck(this, MDActionSheetAnimator);

    var _this2 = _possibleConstructorReturn(this, (MDActionSheetAnimator.__proto__ || _Object$getPrototypeOf(MDActionSheetAnimator)).call(this, { timing: timing, delay: delay, duration: duration }));

    _this2.maskTiming = 'linear';
    _this2.maskDuration = 0.2;
    return _this2;
  }

  /**
   * @param {Object} dialog
   * @param {Function} callback
   */


  _createClass(MDActionSheetAnimator, [{
    key: 'show',
    value: function show(dialog, callback) {

      animit.runAll(animit(dialog._mask).queue({
        opacity: 0
      }).wait(this.delay).queue({
        opacity: 1.0
      }, {
        duration: this.maskDuration,
        timing: this.maskTiming
      }), animit(dialog._sheet).saveStyle().queue({
        css: {
          transform: 'translate3d(0, 80%, 0)',
          opacity: 0
        },
        duration: 0
      }).wait(this.delay).queue({
        css: {
          transform: 'translate3d(0, 0, 0)',
          opacity: 1.0
        },
        duration: this.duration,
        timing: this.timing
      }).restoreStyle().queue(function (done) {
        callback && callback();
        done();
      }));
    }

    /**
     * @param {Object} dialog
     * @param {Function} callback
     */

  }, {
    key: 'hide',
    value: function hide(dialog, callback) {
      animit.runAll(animit(dialog._mask).queue({
        opacity: 1.0
      }).wait(this.delay).queue({
        opacity: 0
      }, {
        duration: this.maskDuration,
        timing: this.maskTiming
      }), animit(dialog._sheet).saveStyle().queue({
        css: {
          transform: 'translate3d(0, 0, 0)',
          opacity: 1.0
        },
        duration: 0
      }).wait(this.delay).queue({
        css: {
          transform: 'translate3d(0, 80%, 0)',
          opacity: 0
        },
        duration: this.duration,
        timing: this.timing
      }).restoreStyle().queue(function (done) {
        callback && callback();
        done();
      }));
    }
  }]);

  return MDActionSheetAnimator;
}(ActionSheetAnimator);

/**
 * iOS style animator for dialog.
 */
export var IOSActionSheetAnimator = function (_ActionSheetAnimator2) {
  _inherits(IOSActionSheetAnimator, _ActionSheetAnimator2);

  function IOSActionSheetAnimator() {
    var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref3$timing = _ref3.timing,
        timing = _ref3$timing === undefined ? 'ease' : _ref3$timing,
        _ref3$delay = _ref3.delay,
        delay = _ref3$delay === undefined ? 0 : _ref3$delay,
        _ref3$duration = _ref3.duration,
        duration = _ref3$duration === undefined ? 0.3 : _ref3$duration;

    _classCallCheck(this, IOSActionSheetAnimator);

    var _this3 = _possibleConstructorReturn(this, (IOSActionSheetAnimator.__proto__ || _Object$getPrototypeOf(IOSActionSheetAnimator)).call(this, { timing: timing, delay: delay, duration: duration }));

    _this3.maskTiming = 'linear';
    _this3.maskDuration = 0.2;
    _this3.bodyHeight = document.body.clientHeight; // avoid Forced Synchronous Layout
    return _this3;
  }

  /**
   * @param {Object} dialog
   * @param {Function} callback
   */


  _createClass(IOSActionSheetAnimator, [{
    key: 'show',
    value: function show(dialog, callback) {
      animit.runAll(animit(dialog._mask).queue({
        opacity: 0
      }).wait(this.delay).queue({
        opacity: 1.0
      }, {
        duration: this.maskDuration,
        timing: this.maskTiming
      }), animit(dialog._sheet).saveStyle().queue({
        css: {
          transform: 'translate3d(0, ' + (this.bodyHeight / 2.0 - 1) + 'px, 0)'
        },
        duration: 0
      }).wait(this.delay).queue({
        css: {
          transform: 'translate3d(0, 0, 0)'
        },
        duration: this.duration,
        timing: this.timing
      }).restoreStyle().queue(function (done) {
        callback && callback();
        done();
      }));
    }

    /**
     * @param {Object} dialog
     * @param {Function} callback
     */

  }, {
    key: 'hide',
    value: function hide(dialog, callback) {
      animit.runAll(animit(dialog._mask).queue({
        opacity: 1.0
      }).wait(this.delay).queue({
        opacity: 0
      }, {
        duration: this.maskDuration,
        timing: this.maskTiming
      }), animit(dialog._sheet).saveStyle().queue({
        css: {
          transform: 'translate3d(0, 0, 0)'
        },
        duration: 0
      }).wait(this.delay).queue({
        css: {
          transform: 'translate3d(0, 100%, 0)'
        },
        duration: this.duration,
        timing: this.timing
      }).restoreStyle().queue(function (done) {
        callback && callback();
        done();
      }));
    }
  }]);

  return IOSActionSheetAnimator;
}(ActionSheetAnimator);