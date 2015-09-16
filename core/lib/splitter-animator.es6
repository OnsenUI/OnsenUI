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

((ons) => {
  'use strict';

  const util = ons._util;

  class SplitterAnimator {
    constructor(options = {}) {
      options = ons._util.extend({
        timing: 'linear',
        duration: '0.3',
        delay: '0'
      }, options || {});

      this._timing = options.timing;
      this._duration = options.duration;
      this._delay = options.delay;
    }
    layoutOnOpen() {}
    layoutOnClose() {}
    translate(distance) {}
    open(done) {
      done();
    }
    close(done) {
      done();
    }
    activate(contentElement, sideElement, maskElement) {}
    inactivate() {}
    isActivated() {
      throw new Error();
    }
  }

  class OverlaySplitterAnimator extends SplitterAnimator {

    constructor(options = {}) {
      console.log(options);

      options = ons._util.extend({
        timing: 'cubic-bezier(.1, .7, .1, 1)',
        duration: '0.3',
        delay: '0'
      }, options || {});

      super(options);
    }

    isActivated() {
      return this._isActivated;
    }

    layoutOnClose() {
      animit(this._side)
        .queue({
          transform: 'translateX(0%)',
          width: this._side._getWidth()
        })
        .play();

      this._mask.style.display = 'none';
    }

    layoutOnOpen() {
      animit(this._side)
        .queue({
          transform: 'translate3d(' + (this._side._isLeftSide() ? '' : '-') + '100%, 0px, 0px)',
          width: this._side._getWidth()
        })
        .play();

      this._mask.style.display = 'block';
    }

    /**
     * @param {Element} contentElement
     * @param {Element} sideElement
     * @param {Element} maskElement
     */
    activate(contentElement, sideElement, maskElement) {
      this._isActivated = true;
      this._content = contentElement;
      this._side = sideElement;
      this._mask = maskElement;

      this._setupLayout();
    }

    inactivate() {
      this._isActivated = false;
      this._clearLayout();
      this._content = this._side = this._mask = null;
    }

    /**
     * @param {Number} distance
     */
    translate(distance) {
      animit(this._side)
        .queue({
          transform: 'translate3d(' + (this._side._isLeftSide() ? '' : '-') + distance + 'px, 0px, 0px)'
        })
        .play();
    }

    _clearLayout() {
      const side = this._side;
      const mask = this._mask;

      side.style.zIndex = '';
      side.style.right = '';
      side.style.left = '';
      side.style.transform = side.style.webkitTransform = '';
      side.style.transition = side.style.webkitTransition = '';
      side.style.width = '';
      side.style.display = '';

      mask.style.display = 'none';
    }

    _setupLayout() {
      const side = this._side;

      side.style.zIndex = 3;
      side.style.display = 'block';

      if (side._isLeftSide()) {
        side.style.left = 'auto';
        side.style.right = '100%';
      } else {
        side.style.left = '100%';
        side.style.right = 'auto';
      }
    }

    /**
     * @param {Function} done
     */
    open(done) {
      const transform = this._side._isLeftSide() ? 'translate3d(100%, 0px, 0px)' : 'translate3d(-100%, 0px, 0px)';

      animit.runAll(
        animit(this._side)
          .wait(this._delay)
          .queue({
            transform: transform
          }, {
            duration: this._duration,
            timing: this._timing
          })
          .queue(callback => {
            callback();
            done();
          }),

        animit(this._mask)
          .wait(this._delay)
          .queue({
            display: 'block'
          })
          .queue({
            opacity: '1'
          }, {
            duration: this._duration,
            timing: 'linear',
          })
      );
    }

    /**
     * @param {Function} done
     */
    close(done) {

      animit.runAll(
        animit(this._side)
          .wait(this._delay)
          .queue({
            transform: 'translate3d(0px, 0px, 0px)'
          }, {
            duration: this._duration,
            timing: this._timing
          })
          .queue(callback => {
            this._side.style.webkitTransition = '';
            done();
            callback();
          }),

        animit(this._mask)
          .wait(this._delay)
          .queue({
            opacity: '0'
          }, {
            duration: this._duration,
            timing: 'linear',
          })
          .queue({
            display: 'none'
          })
      );
    }
  }

  ons._internal = ons._internal || {};

  ons._internal.SplitterAnimator = SplitterAnimator;
  ons._internal.OverlaySplitterAnimator = OverlaySplitterAnimator;

})(window.ons = window.ons || {});
