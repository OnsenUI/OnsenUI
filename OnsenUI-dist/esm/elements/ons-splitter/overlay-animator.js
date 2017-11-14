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
import SplitterAnimator from './animator.js';

var OverlaySplitterAnimator = function (_SplitterAnimator) {
  _inherits(OverlaySplitterAnimator, _SplitterAnimator);

  function OverlaySplitterAnimator() {
    _classCallCheck(this, OverlaySplitterAnimator);

    return _possibleConstructorReturn(this, (OverlaySplitterAnimator.__proto__ || _Object$getPrototypeOf(OverlaySplitterAnimator)).apply(this, arguments));
  }

  _createClass(OverlaySplitterAnimator, [{
    key: 'translate',
    value: function translate(distance) {
      this._mask.style.display = 'block'; // Avoid content clicks

      animit(this._side).queue({
        transform: 'translate3d(' + (this.minus + distance) + 'px, 0px, 0px)'
      }).play();
    }

    /**
     * @param {Function} done
     */

  }, {
    key: 'open',
    value: function open(done) {
      animit.runAll(animit(this._side).wait(this.delay).queue({
        transform: 'translate3d(' + this.minus + '100%, 0px, 0px)'
      }, {
        duration: this.duration,
        timing: this.timing
      }).queue(function (callback) {
        callback();
        done && done();
      }), animit(this._mask).wait(this.delay).queue({
        display: 'block'
      }).queue({
        opacity: '1'
      }, {
        duration: this.duration,
        timing: 'linear'
      }));
    }

    /**
     * @param {Function} done
     */

  }, {
    key: 'close',
    value: function close(done) {

      animit.runAll(animit(this._side).wait(this.delay).queue({
        transform: 'translate3d(0px, 0px, 0px)'
      }, {
        duration: this.duration,
        timing: this.timing
      }).queue(function (callback) {
        done && done();
        callback();
      }), animit(this._mask).wait(this.delay).queue({
        opacity: '0'
      }, {
        duration: this.duration,
        timing: 'linear'
      }).queue({
        display: 'none'
      }));
    }
  }]);

  return OverlaySplitterAnimator;
}(SplitterAnimator);

export default OverlaySplitterAnimator;