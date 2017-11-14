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

import contentReady from '../../ons/content-ready';
import styler from '../../ons/styler';
import animit from '../../ons/animit';
import SplitterAnimator from './animator.js';

var RevealSplitterAnimator = function (_SplitterAnimator) {
  _inherits(RevealSplitterAnimator, _SplitterAnimator);

  function RevealSplitterAnimator() {
    _classCallCheck(this, RevealSplitterAnimator);

    return _possibleConstructorReturn(this, (RevealSplitterAnimator.__proto__ || _Object$getPrototypeOf(RevealSplitterAnimator)).apply(this, arguments));
  }

  _createClass(RevealSplitterAnimator, [{
    key: '_getSlidingElements',
    value: function _getSlidingElements() {
      var slidingElements = [this._content, this._mask];
      if (this._oppositeSide && this._oppositeSide.mode === 'split') {
        slidingElements.push(this._oppositeSide);
      }

      return slidingElements;
    }
  }, {
    key: 'activate',
    value: function activate(sideElement) {
      _get(RevealSplitterAnimator.prototype.__proto__ || _Object$getPrototypeOf(RevealSplitterAnimator.prototype), 'activate', this).call(this, sideElement);
      this.maxWidth = this._getMaxWidth();
      if (sideElement.mode === 'collapse') {
        this._setStyles(sideElement);
      }
    }
  }, {
    key: 'deactivate',
    value: function deactivate() {
      this._side && this._unsetStyles(this._side);
      _get(RevealSplitterAnimator.prototype.__proto__ || _Object$getPrototypeOf(RevealSplitterAnimator.prototype), 'deactivate', this).call(this);
    }
  }, {
    key: '_setStyles',
    value: function _setStyles(sideElement) {
      styler(sideElement, {
        left: sideElement.side === 'right' ? 'auto' : 0,
        right: sideElement.side === 'right' ? 0 : 'auto',
        zIndex: 0,
        backgroundColor: 'black',
        transform: this._generateBehindPageStyle(0).container.transform,
        display: 'none'
      });

      var splitter = sideElement.parentElement;
      contentReady(splitter, function () {
        return splitter.content && styler(splitter.content, { boxShadow: '0 0 12px 0 rgba(0, 0, 0, 0.2)' });
      });
    }
  }, {
    key: '_unsetStyles',
    value: function _unsetStyles(sideElement) {
      styler.clear(sideElement, 'left right zIndex backgroundColor display');
      if (sideElement._content) {
        sideElement._content.style.opacity = '';
      }

      // Check if the other side needs the common styles
      if (!this._oppositeSide || this._oppositeSide.mode === 'split') {
        sideElement.parentElement.content && styler.clear(sideElement.parentElement.content, 'boxShadow');
      }
    }
  }, {
    key: '_generateBehindPageStyle',
    value: function _generateBehindPageStyle(distance) {
      var max = this.maxWidth;

      var behindDistance = (distance - max) / max * 10;
      behindDistance = isNaN(behindDistance) ? 0 : Math.max(Math.min(behindDistance, 0), -10);

      var behindTransform = 'translate3d(' + (this.minus ? -1 : 1) * behindDistance + '%, 0, 0)';
      var opacity = 1 + behindDistance / 100;

      return {
        content: {
          opacity: opacity
        },
        container: {
          transform: behindTransform
        }
      };
    }
  }, {
    key: 'translate',
    value: function translate(distance) {
      this._side.style.display = '';
      this._side.style.zIndex = 1;
      this.maxWidth = this.maxWidth || this._getMaxWidth();
      var menuStyle = this._generateBehindPageStyle(Math.min(distance, this.maxWidth));

      if (!this._slidingElements) {
        this._slidingElements = this._getSlidingElements();
      }

      this._mask.style.display = 'block'; // Avoid content clicks

      animit.runAll(animit(this._slidingElements).queue({
        transform: 'translate3d(' + (this.minus + distance) + 'px, 0px, 0px)'
      }), animit(this._side._content).queue(menuStyle.content), animit(this._side).queue(menuStyle.container));
    }

    /**
     * @param {Function} done
     */

  }, {
    key: 'open',
    value: function open(done) {
      var _this2 = this;

      this._side.style.display = '';
      this._side.style.zIndex = 1;
      this.maxWidth = this.maxWidth || this._getMaxWidth();
      var menuStyle = this._generateBehindPageStyle(this.maxWidth);
      this._slidingElements = this._getSlidingElements();

      setTimeout(function () {
        // Fix: Time to update previous translate3d after changing style.display
        animit.runAll(animit(_this2._slidingElements).wait(_this2.delay).queue({
          transform: 'translate3d(' + (_this2.minus + _this2.maxWidth) + 'px, 0px, 0px)'
        }, {
          duration: _this2.duration,
          timing: _this2.timing
        }), animit(_this2._mask).wait(_this2.delay).queue({
          display: 'block'
        }), animit(_this2._side._content).wait(_this2.delay).queue(menuStyle.content, {
          duration: _this2.duration,
          timing: _this2.timing
        }), animit(_this2._side).wait(_this2.delay).queue(menuStyle.container, {
          duration: _this2.duration,
          timing: _this2.timing
        }).queue(function (callback) {
          _this2._slidingElements = null;
          callback();
          done && done();
        }));
      }, 0);
    }

    /**
     * @param {Function} done
     */

  }, {
    key: 'close',
    value: function close(done) {
      var _this3 = this;

      var menuStyle = this._generateBehindPageStyle(0);
      this._slidingElements = this._getSlidingElements();

      animit.runAll(animit(this._slidingElements).wait(this.delay).queue({
        transform: 'translate3d(0px, 0px, 0px)'
      }, {
        duration: this.duration,
        timing: this.timing
      }), animit(this._mask).wait(this.delay).queue({
        display: 'none'
      }), animit(this._side._content).wait(this.delay).queue(menuStyle.content, {
        duration: this.duration,
        timing: this.timing
      }), animit(this._side).wait(this.delay).queue(menuStyle.container, {
        duration: this.duration,
        timing: this.timing
      }).queue(function (callback) {
        _this3._slidingElements = null;
        _this3._side.style.zIndex = 0;
        _this3._side.style.display = 'none';
        _this3._side._content.style.opacity = '';
        done && done();
        callback();
      }));
    }
  }, {
    key: '_getMaxWidth',
    value: function _getMaxWidth() {
      return this._side.offsetWidth;
    }
  }]);

  return RevealSplitterAnimator;
}(SplitterAnimator);

export default RevealSplitterAnimator;