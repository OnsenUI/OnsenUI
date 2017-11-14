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

import animit from '../../ons/animit';
import SplitterAnimator from './animator.js';

var PushSplitterAnimator = function (_SplitterAnimator) {
  _inherits(PushSplitterAnimator, _SplitterAnimator);

  function PushSplitterAnimator() {
    _classCallCheck(this, PushSplitterAnimator);

    return _possibleConstructorReturn(this, (PushSplitterAnimator.__proto__ || _Object$getPrototypeOf(PushSplitterAnimator)).apply(this, arguments));
  }

  _createClass(PushSplitterAnimator, [{
    key: '_getSlidingElements',
    value: function _getSlidingElements() {
      var slidingElements = [this._side, this._content];
      if (this._oppositeSide && this._oppositeSide.mode === 'split') {
        slidingElements.push(this._oppositeSide);
      }

      return slidingElements;
    }
  }, {
    key: 'translate',
    value: function translate(distance) {
      if (!this._slidingElements) {
        this._slidingElements = this._getSlidingElements();
      }

      this._mask.style.display = 'block'; // Avoid content clicks

      animit(this._slidingElements).queue({
        transform: 'translate3d(' + (this.minus + distance) + 'px, 0px, 0px)'
      }).play();
    }

    /**
     * @param {Function} done
     */

  }, {
    key: 'open',
    value: function open(done) {
      var _this2 = this;

      var max = this._side.offsetWidth;
      this._slidingElements = this._getSlidingElements();

      animit.runAll(animit(this._slidingElements).wait(this.delay).queue({
        transform: 'translate3d(' + (this.minus + max) + 'px, 0px, 0px)'
      }, {
        duration: this.duration,
        timing: this.timing
      }).queue(function (callback) {
        _this2._slidingElements = null;
        callback();
        done && done();
      }), animit(this._mask).wait(this.delay).queue({
        display: 'block'
      }));
    }

    /**
     * @param {Function} done
     */

  }, {
    key: 'close',
    value: function close(done) {
      var _this3 = this;

      this._slidingElements = this._getSlidingElements();

      animit.runAll(animit(this._slidingElements).wait(this.delay).queue({
        transform: 'translate3d(0px, 0px, 0px)'
      }, {
        duration: this.duration,
        timing: this.timing
      }).queue(function (callback) {
        _this3._slidingElements = null;
        _get(PushSplitterAnimator.prototype.__proto__ || _Object$getPrototypeOf(PushSplitterAnimator.prototype), 'clearTransition', _this3).call(_this3);
        done && done();
        callback();
      }), animit(this._mask).wait(this.delay).queue({
        display: 'none'
      }));
    }
  }]);

  return PushSplitterAnimator;
}(SplitterAnimator);

export default PushSplitterAnimator;