import _Object$keys from 'babel-runtime/core-js/object/keys';
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
import BaseAnimator from '../../ons/base-animator';

export var PopoverAnimator = function (_BaseAnimator) {
  _inherits(PopoverAnimator, _BaseAnimator);

  /**
   * @param {Object} options
   * @param {String} options.timing
   * @param {Number} options.duration
   * @param {Number} options.delay
   */
  function PopoverAnimator() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$timing = _ref.timing,
        timing = _ref$timing === undefined ? 'cubic-bezier(.1, .7, .4, 1)' : _ref$timing,
        _ref$delay = _ref.delay,
        delay = _ref$delay === undefined ? 0 : _ref$delay,
        _ref$duration = _ref.duration,
        duration = _ref$duration === undefined ? 0.2 : _ref$duration;

    _classCallCheck(this, PopoverAnimator);

    return _possibleConstructorReturn(this, (PopoverAnimator.__proto__ || _Object$getPrototypeOf(PopoverAnimator)).call(this, { timing: timing, delay: delay, duration: duration }));
  }

  _createClass(PopoverAnimator, [{
    key: 'show',
    value: function show(popover, callback) {
      callback();
    }
  }, {
    key: 'hide',
    value: function hide(popover, callback) {
      callback();
    }
  }, {
    key: '_animate',
    value: function _animate(element, _ref2) {
      var from = _ref2.from,
          to = _ref2.to,
          options = _ref2.options,
          callback = _ref2.callback,
          _ref2$restore = _ref2.restore,
          restore = _ref2$restore === undefined ? false : _ref2$restore,
          animation = _ref2.animation;

      options = util.extend({}, this.options, options);

      if (animation) {
        from = animation.from;
        to = animation.to;
      }

      animation = animit(element);
      if (restore) {
        animation = animation.saveStyle();
      }
      animation = animation.queue(from).wait(this.delay).queue({
        css: to,
        duration: this.duration,
        timing: this.timing
      });
      if (restore) {
        animation = animation.restoreStyle();
      }
      if (callback) {
        animation = animation.queue(function (done) {
          callback();
          done();
        });
      }
      return animation;
    }
  }, {
    key: '_animateAll',
    value: function _animateAll(element, animations) {
      var _this2 = this;

      _Object$keys(animations).forEach(function (key) {
        return _this2._animate(element[key], animations[key]).play();
      });
    }
  }]);

  return PopoverAnimator;
}(BaseAnimator);

var fade = {
  out: {
    from: { opacity: 1.0 },
    to: { opacity: 0 }
  },
  in: {
    from: { opacity: 0 },
    to: { opacity: 1.0 }
  }
};

export var MDFadePopoverAnimator = function (_PopoverAnimator) {
  _inherits(MDFadePopoverAnimator, _PopoverAnimator);

  function MDFadePopoverAnimator() {
    _classCallCheck(this, MDFadePopoverAnimator);

    return _possibleConstructorReturn(this, (MDFadePopoverAnimator.__proto__ || _Object$getPrototypeOf(MDFadePopoverAnimator)).apply(this, arguments));
  }

  _createClass(MDFadePopoverAnimator, [{
    key: 'show',
    value: function show(popover, callback) {
      this._animateAll(popover, {
        _mask: fade.in,
        _popover: { animation: fade.in, restore: true, callback: callback }
      });
    }
  }, {
    key: 'hide',
    value: function hide(popover, callback) {
      this._animateAll(popover, {
        _mask: fade.out,
        _popover: { animation: fade.out, restore: true, callback: callback }
      });
    }
  }]);

  return MDFadePopoverAnimator;
}(PopoverAnimator);

export var IOSFadePopoverAnimator = function (_MDFadePopoverAnimato) {
  _inherits(IOSFadePopoverAnimator, _MDFadePopoverAnimato);

  function IOSFadePopoverAnimator() {
    _classCallCheck(this, IOSFadePopoverAnimator);

    return _possibleConstructorReturn(this, (IOSFadePopoverAnimator.__proto__ || _Object$getPrototypeOf(IOSFadePopoverAnimator)).apply(this, arguments));
  }

  _createClass(IOSFadePopoverAnimator, [{
    key: 'show',
    value: function show(popover, callback) {
      this._animateAll(popover, {
        _mask: fade.in,
        _popover: {
          from: {
            transform: 'scale3d(1.3, 1.3, 1.0)',
            opacity: 0
          },
          to: {
            transform: 'scale3d(1.0, 1.0,  1.0)',
            opacity: 1.0
          },
          restore: true,
          callback: callback
        }
      });
    }
  }]);

  return IOSFadePopoverAnimator;
}(MDFadePopoverAnimator);