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

const transform = 'translate3d(0, 0, 0)';

/**
 * Fade-in screen transition.
 */
export default class IOSFadeNavigatorAnimator extends NavigatorAnimator {

  constructor({timing = 'linear', delay = 0, duration = 0.4} = {}) {
    super({ timing, delay, duration });
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
          { transform, opacity: 0 },
          { transform, opacity: 1 }
        )
        .queue(done => {
          unblock();
          callback();
          done();
        }),
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
          { transform, opacity: 1 },
          { transform, opacity: 0 }
        )
        .queue(done => {
          unblock();
          callback();
          done();
        })
    );
  }
}
