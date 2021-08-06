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

import animit from '../../ons/animit.js';
import SplitterAnimator from './animator.js';

export default class PushSplitterAnimator extends SplitterAnimator {

  _getSlidingElements() {
    const slidingElements = [this._side, this._content];
    if (this._oppositeSide && this._oppositeSide.mode === 'split') {
      slidingElements.push(this._oppositeSide);
    }

    return slidingElements;
  }

  translate(distance) {
    if (!this._slidingElements) {
      this._slidingElements = this._getSlidingElements();
    }

    this._mask.style.display = 'block'; // Avoid content clicks

    animit(this._slidingElements)
      .queue({
        transform: `translate3d(${this.minus + distance}px, 0, 0)`
      })
      .play();
  }

  /**
   * @param {Function} done
   */
  open(done) {
    const max = this._side.offsetWidth;
    this._slidingElements = this._getSlidingElements();

    animit.runAll(
      animit(this._slidingElements)
        .wait(this.delay)
        .queue({
          transform: `translate3d(${this.minus + max}px, 0, 0)`
        }, this.def)
        .queue(callback => {
          this._slidingElements = null;
          callback();
          done && done();
        }),

      animit(this._mask)
        .wait(this.delay)
        .queue({
          display: 'block'
        })
    );
  }

  /**
   * @param {Function} done
   */
  close(done) {
    this._slidingElements = this._getSlidingElements();

    animit.runAll(
      animit(this._slidingElements)
        .wait(this.delay)
        .queue({
          transform: 'translate3d(0, 0, 0)'
        }, this.def)
        .queue(callback => {
          this._slidingElements = null;
          super.clearTransition();
          done && done();
          callback();
        }),

      animit(this._mask)
        .wait(this.delay)
        .queue({
          display: 'none'
        })
    );
  }
}
