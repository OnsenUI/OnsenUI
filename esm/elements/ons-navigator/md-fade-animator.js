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

import NavigatorAnimator from './animator.js';
import util from '../../ons/util.js';
import animit from '../../ons/animit.js';

/**
 * Fade-in + Lift screen transition.
 */
export default class MDFadeNavigatorAnimator extends NavigatorAnimator {

  constructor({timing = 'cubic-bezier(0.4, 0, 0.2, 1)', timingPop = 'cubic-bezier(0.4, 0, 1, 1)', delay = 0, duration = 0.2} = {}) {
    super({timing, delay, duration});
    this.timingPop = timingPop;
  }

  /**
   * @param {Object} enterPage
   * @param {Object} leavePage
   * @param {Function} callback
   */
  push(enterPage, leavePage, callback) {
    const unblock = super.block(enterPage);

    animit.runAll(

      animit(enterPage, this.def)
        .default(
          { transform: 'translate3D(0, 42px, 0)', opacity: 0 },
          { transform: 'translate3D(0, 0, 0)', opacity: 1 }
        )
        .queue(done => {
          unblock();
          callback();
          done();
        })
    );

  }

  /**
   * @param {Object} enterPage
   * @param {Object} leavePage
   * @param {Function} done
   */
  pop(enterPage, leavePage, callback) {
    const unblock = super.block(enterPage);

    animit.runAll(

      animit(leavePage, this.def)
        .default(
          { transform: 'translate3D(0, 0, 0)', opacity: 1 },
          { css: { transform: 'translate3D(0, 38px, 0)', opacity: 0 }, timing: this.timingPop }
        )
        .queue(done => {
          unblock();
          callback();
          done();
        })
    );
  }
}
