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

export var AlertDialogAnimator = function (_BaseAnimator) {
  _inherits(AlertDialogAnimator, _BaseAnimator);

  function AlertDialogAnimator() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$timing = _ref.timing,
        timing = _ref$timing === undefined ? 'linear' : _ref$timing,
        _ref$delay = _ref.delay,
        delay = _ref$delay === undefined ? 0 : _ref$delay,
        _ref$duration = _ref.duration,
        duration = _ref$duration === undefined ? 0.2 : _ref$duration;

    _classCallCheck(this, AlertDialogAnimator);

    return _possibleConstructorReturn(this, (AlertDialogAnimator.__proto__ || _Object$getPrototypeOf(AlertDialogAnimator)).call(this, { timing: timing, delay: delay, duration: duration }));
  }

  /**
   * @param {HTMLElement} dialog
   * @param {Function} done
   */


  _createClass(AlertDialogAnimator, [{
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

  return AlertDialogAnimator;
}(BaseAnimator);

/**
 * Android style animator for alert dialog.
 */
export var AndroidAlertDialogAnimator = function (_AlertDialogAnimator) {
  _inherits(AndroidAlertDialogAnimator, _AlertDialogAnimator);

  function AndroidAlertDialogAnimator() {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref2$timing = _ref2.timing,
        timing = _ref2$timing === undefined ? 'cubic-bezier(.1, .7, .4, 1)' : _ref2$timing,
        _ref2$duration = _ref2.duration,
        duration = _ref2$duration === undefined ? 0.2 : _ref2$duration,
        _ref2$delay = _ref2.delay,
        delay = _ref2$delay === undefined ? 0 : _ref2$delay;

    _classCallCheck(this, AndroidAlertDialogAnimator);

    return _possibleConstructorReturn(this, (AndroidAlertDialogAnimator.__proto__ || _Object$getPrototypeOf(AndroidAlertDialogAnimator)).call(this, { duration: duration, timing: timing, delay: delay }));
  }

  /**
   * @param {Object} dialog
   * @param {Function} callback
   */


  _createClass(AndroidAlertDialogAnimator, [{
    key: 'show',
    value: function show(dialog, callback) {
      callback = callback ? callback : function () {};

      animit.runAll(animit(dialog._mask).queue({
        opacity: 0
      }).wait(this.delay).queue({
        opacity: 1.0
      }, {
        duration: this.duration,
        timing: this.timing
      }), animit(dialog._dialog).saveStyle().queue({
        css: {
          transform: 'translate3d(-50%, -50%, 0) scale3d(0.9, 0.9, 1.0)',
          opacity: 0.0
        },
        duration: 0
      }).wait(this.delay).queue({
        css: {
          transform: 'translate3d(-50%, -50%, 0) scale3d(1.0, 1.0, 1.0)',
          opacity: 1.0
        },
        duration: this.duration,
        timing: this.timing
      }).restoreStyle().queue(function (done) {
        callback();
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
      callback = callback ? callback : function () {};

      animit.runAll(animit(dialog._mask).queue({
        opacity: 1.0
      }).wait(this.delay).queue({
        opacity: 0
      }, {
        duration: this.duration,
        timing: this.timing
      }), animit(dialog._dialog).saveStyle().queue({
        css: {
          transform: 'translate3d(-50%, -50%, 0) scale3d(1.0, 1.0, 1.0)',
          opacity: 1.0
        },
        duration: 0
      }).wait(this.delay).queue({
        css: {
          transform: 'translate3d(-50%, -50%, 0) scale3d(0.9, 0.9, 1.0)',
          opacity: 0.0
        },
        duration: this.duration,
        timing: this.timing
      }).restoreStyle().queue(function (done) {
        callback();
        done();
      }));
    }
  }]);

  return AndroidAlertDialogAnimator;
}(AlertDialogAnimator);

/**
 * iOS style animator for alert dialog.
 */
export var IOSAlertDialogAnimator = function (_AlertDialogAnimator2) {
  _inherits(IOSAlertDialogAnimator, _AlertDialogAnimator2);

  function IOSAlertDialogAnimator() {
    var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref3$timing = _ref3.timing,
        timing = _ref3$timing === undefined ? 'cubic-bezier(.1, .7, .4, 1)' : _ref3$timing,
        _ref3$duration = _ref3.duration,
        duration = _ref3$duration === undefined ? 0.2 : _ref3$duration,
        _ref3$delay = _ref3.delay,
        delay = _ref3$delay === undefined ? 0 : _ref3$delay;

    _classCallCheck(this, IOSAlertDialogAnimator);

    return _possibleConstructorReturn(this, (IOSAlertDialogAnimator.__proto__ || _Object$getPrototypeOf(IOSAlertDialogAnimator)).call(this, { duration: duration, timing: timing, delay: delay }));
  }

  /*
   * @param {Object} dialog
   * @param {Function} callback
   */


  _createClass(IOSAlertDialogAnimator, [{
    key: 'show',
    value: function show(dialog, callback) {
      callback = callback ? callback : function () {};

      animit.runAll(animit(dialog._mask).queue({
        opacity: 0
      }).wait(this.delay).queue({
        opacity: 1.0
      }, {
        duration: this.duration,
        timing: this.timing
      }), animit(dialog._dialog).saveStyle().queue({
        css: {
          transform: 'translate3d(-50%, -50%, 0) scale3d(1.3, 1.3, 1.0)',
          opacity: 0.0
        },
        duration: 0
      }).wait(this.delay).queue({
        css: {
          transform: 'translate3d(-50%, -50%, 0) scale3d(1.0, 1.0, 1.0)',
          opacity: 1.0
        },
        duration: this.duration,
        timing: this.timing
      }).restoreStyle().queue(function (done) {
        callback();
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
      callback = callback ? callback : function () {};

      animit.runAll(animit(dialog._mask).queue({
        opacity: 1.0
      }).wait(this.delay).queue({
        opacity: 0
      }, {
        duration: this.duration,
        timing: this.timing
      }), animit(dialog._dialog).saveStyle().queue({
        css: {
          opacity: 1.0
        },
        duration: 0
      }).wait(this.delay).queue({
        css: {
          opacity: 0.0
        },
        duration: this.duration,
        timing: this.timing
      }).restoreStyle().queue(function (done) {
        callback();
        done();
      }));
    }
  }]);

  return IOSAlertDialogAnimator;
}(AlertDialogAnimator);