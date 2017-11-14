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

export var DialogAnimator = function (_BaseAnimator) {
  _inherits(DialogAnimator, _BaseAnimator);

  function DialogAnimator() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$timing = _ref.timing,
        timing = _ref$timing === undefined ? 'linear' : _ref$timing,
        _ref$delay = _ref.delay,
        delay = _ref$delay === undefined ? 0 : _ref$delay,
        _ref$duration = _ref.duration,
        duration = _ref$duration === undefined ? 0.2 : _ref$duration;

    _classCallCheck(this, DialogAnimator);

    return _possibleConstructorReturn(this, (DialogAnimator.__proto__ || _Object$getPrototypeOf(DialogAnimator)).call(this, { timing: timing, delay: delay, duration: duration }));
  }

  /**
   * @param {HTMLElement} dialog
   * @param {Function} done
   */


  _createClass(DialogAnimator, [{
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

  return DialogAnimator;
}(BaseAnimator);

/**
 * Android style animator for dialog.
 */
export var AndroidDialogAnimator = function (_DialogAnimator) {
  _inherits(AndroidDialogAnimator, _DialogAnimator);

  function AndroidDialogAnimator() {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref2$timing = _ref2.timing,
        timing = _ref2$timing === undefined ? 'ease-in-out' : _ref2$timing,
        _ref2$delay = _ref2.delay,
        delay = _ref2$delay === undefined ? 0 : _ref2$delay,
        _ref2$duration = _ref2.duration,
        duration = _ref2$duration === undefined ? 0.3 : _ref2$duration;

    _classCallCheck(this, AndroidDialogAnimator);

    return _possibleConstructorReturn(this, (AndroidDialogAnimator.__proto__ || _Object$getPrototypeOf(AndroidDialogAnimator)).call(this, { timing: timing, delay: delay, duration: duration }));
  }

  /**
   * @param {Object} dialog
   * @param {Function} callback
   */


  _createClass(AndroidDialogAnimator, [{
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
          transform: 'translate3d(-50%, -60%, 0)',
          opacity: 0.0
        },
        duration: 0
      }).wait(this.delay).queue({
        css: {
          transform: 'translate3d(-50%, -50%, 0)',
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
          transform: 'translate3d(-50%, -50%, 0)',
          opacity: 1.0
        },
        duration: 0
      }).wait(this.delay).queue({
        css: {
          transform: 'translate3d(-50%, -60%, 0)',
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

  return AndroidDialogAnimator;
}(DialogAnimator);

/**
 * iOS style animator for dialog.
 */
export var IOSDialogAnimator = function (_DialogAnimator2) {
  _inherits(IOSDialogAnimator, _DialogAnimator2);

  function IOSDialogAnimator() {
    var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref3$timing = _ref3.timing,
        timing = _ref3$timing === undefined ? 'ease-in-out' : _ref3$timing,
        _ref3$delay = _ref3.delay,
        delay = _ref3$delay === undefined ? 0 : _ref3$delay,
        _ref3$duration = _ref3.duration,
        duration = _ref3$duration === undefined ? 0.2 : _ref3$duration;

    _classCallCheck(this, IOSDialogAnimator);

    var _this3 = _possibleConstructorReturn(this, (IOSDialogAnimator.__proto__ || _Object$getPrototypeOf(IOSDialogAnimator)).call(this, { timing: timing, delay: delay, duration: duration }));

    _this3.bodyHeight = document.body.clientHeight; // avoid Forced Synchronous Layout
    return _this3;
  }

  /**
   * @param {Object} dialog
   * @param {Function} callback
   */


  _createClass(IOSDialogAnimator, [{
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
          transform: 'translate3d(-50%, ' + (this.bodyHeight / 2.0 - 1) + 'px, 0)'
        },
        duration: 0
      }).wait(this.delay).queue({
        css: {
          transform: 'translate3d(-50%, -50%, 0)'
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
          transform: 'translate3d(-50%, -50%, 0)'
        },
        duration: 0
      }).wait(this.delay).queue({
        css: {
          transform: 'translate3d(-50%, ' + (this.bodyHeight / 2.0 - 1) + 'px, 0)'
        },
        duration: this.duration,
        timing: this.timing
      }).restoreStyle().queue(function (done) {
        callback();
        done();
      }));
    }
  }]);

  return IOSDialogAnimator;
}(DialogAnimator);

/**
 * Slide animator for dialog.
 */
export var SlideDialogAnimator = function (_DialogAnimator3) {
  _inherits(SlideDialogAnimator, _DialogAnimator3);

  function SlideDialogAnimator() {
    var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref4$timing = _ref4.timing,
        timing = _ref4$timing === undefined ? 'cubic-bezier(.1, .7, .4, 1)' : _ref4$timing,
        _ref4$delay = _ref4.delay,
        delay = _ref4$delay === undefined ? 0 : _ref4$delay,
        _ref4$duration = _ref4.duration,
        duration = _ref4$duration === undefined ? 0.2 : _ref4$duration;

    _classCallCheck(this, SlideDialogAnimator);

    var _this4 = _possibleConstructorReturn(this, (SlideDialogAnimator.__proto__ || _Object$getPrototypeOf(SlideDialogAnimator)).call(this, { timing: timing, delay: delay, duration: duration }));

    _this4.bodyHeight = document.body.clientHeight; // avoid Forced Synchronous Layout
    return _this4;
  }

  /**
   * @param {Object} dialog
   * @param {Function} callback
   */


  _createClass(SlideDialogAnimator, [{
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
          // FIXME: This should avoid Forced Synchronous Layout. Otherwise, fade animation of mask will be broken.
          transform: 'translate3d(-50%, ' + (-(this.bodyHeight / 2.0) + 1 - dialog._dialog.clientHeight) + 'px, 0)'
        },
        duration: 0
      }).wait(this.delay).queue({
        css: {
          transform: 'translate3D(-50%, -50%, 0)'
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
          transform: 'translate3D(-50%, -50%, 0)'
        },
        duration: 0
      }).wait(this.delay).queue({
        css: {
          // FIXME: This should avoid Forced Synchronous Layout. Otherwise, fade animation of mask will be broken.
          transform: 'translate3d(-50%, ' + (-(this.bodyHeight / 2.0) + 1 - dialog._dialog.clientHeight) + 'px, 0)'
        },
        duration: this.duration,
        timing: this.timing
      }).restoreStyle().queue(function (done) {
        callback();
        done();
      }));
    }
  }]);

  return SlideDialogAnimator;
}(DialogAnimator);