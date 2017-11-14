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
import styler from '../../ons/styler';
import contentReady from '../../ons/content-ready';
import animit from '../../ons/animit';
import BaseAnimator from '../../ons/base-animator';

var SplitterAnimator = function (_BaseAnimator) {
  _inherits(SplitterAnimator, _BaseAnimator);

  function SplitterAnimator() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$timing = _ref.timing,
        timing = _ref$timing === undefined ? 'cubic-bezier(.1, .7, .1, 1)' : _ref$timing,
        _ref$duration = _ref.duration,
        duration = _ref$duration === undefined ? 0.3 : _ref$duration,
        _ref$delay = _ref.delay,
        delay = _ref$delay === undefined ? 0 : _ref$delay;

    _classCallCheck(this, SplitterAnimator);

    return _possibleConstructorReturn(this, (SplitterAnimator.__proto__ || _Object$getPrototypeOf(SplitterAnimator)).call(this, { timing: timing, duration: duration, delay: delay }));
  }

  _createClass(SplitterAnimator, [{
    key: 'updateOptions',
    value: function updateOptions() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      util.extend(this, {
        timing: this.timing, duration: this.duration, delay: this.delay
      }, options);
    }

    /**
     * @param {Element} sideElement
     */

  }, {
    key: 'activate',
    value: function activate(sideElement) {
      var _this2 = this;

      var splitter = sideElement.parentNode;

      contentReady(splitter, function () {
        _this2._side = sideElement;
        _this2._oppositeSide = splitter.right !== sideElement && splitter.right || splitter.left !== sideElement && splitter.left;
        _this2._content = splitter.content;
        _this2._mask = splitter.mask;
      });
    }
  }, {
    key: 'deactivate',
    value: function deactivate() {
      this.clearTransition();
      this._mask && this.clearMask();
      this._content = this._side = this._oppositeSide = this._mask = null;
    }
  }, {
    key: 'clearTransition',
    value: function clearTransition() {
      var _this3 = this;

      'side mask content'.split(/\s+/).forEach(function (e) {
        return _this3['_' + e] && styler.clear(_this3['_' + e], 'transform transition');
      });
    }
  }, {
    key: 'clearMask',
    value: function clearMask() {
      // Check if the other side needs the mask before clearing
      if (!this._oppositeSide || this._oppositeSide.mode === 'split' || !this._oppositeSide.isOpen) {
        this._mask.style.opacity = '';
        this._mask.style.display = 'none';
      }
    }

    /**
     * @param {Number} distance
     */

  }, {
    key: 'translate',
    value: function translate(distance) {}

    /**
     * @param {Function} done
     */

  }, {
    key: 'open',
    value: function open(done) {
      done();
    }

    /**
     * @param {Function} done
     */

  }, {
    key: 'close',
    value: function close(done) {
      done();
    }
  }, {
    key: 'minus',
    get: function get() {
      return this._side.side === 'right' ? '-' : '';
    }
  }]);

  return SplitterAnimator;
}(BaseAnimator);

export default SplitterAnimator;