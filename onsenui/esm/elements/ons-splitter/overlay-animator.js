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

export default class OverlaySplitterAnimator extends SplitterAnimator {

  translate(distance) {
    this._mask.style.display = 'block'; // Avoid content clicks

    animit(this._side)
      .queue({
        transform: `translate3d(${this.minus + distance}px, 0, 0)`
      })
      .play();
  }

  /**
   * @param {Function} done
   */
  open(done) {
    animit.runAll(
      animit(this._side)
        .wait(this.delay)
        .queue({
          transform: `translate3d(${this.minus}100%, 0, 0)`
        }, this.def)
        .queue(callback => {
          callback();
          done && done();
        }),

      animit(this._mask)
        .wait(this.delay)
        .queue({
          display: 'block'
        })
        .queue({
          opacity: '1'
        }, {
          duration: this.duration,
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
        .wait(this.delay)
        .queue({
          transform: 'translate3d(0, 0, 0)'
        }, this.def)
        .queue(callback => {
          done && done();
          callback();
        }),

      animit(this._mask)
        .wait(this.delay)
        .queue({
          opacity: '0'
        }, {
          duration: this.duration,
          timing: 'linear',
        })
        .queue({
          display: 'none'
        })
    );
  }
}
