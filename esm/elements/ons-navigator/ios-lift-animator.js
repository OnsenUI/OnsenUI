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
 * Lift screen transition.
 */
export default class IOSLiftNavigatorAnimator extends NavigatorAnimator {

  constructor({timing = 'cubic-bezier(.1, .7, .1, 1)', delay = 0, duration = 0.4} = {}) {
    super({ timing, delay, duration });

    this.backgroundMask = util.createElement(
      '<div style="position: absolute; width: 100%; height: 100%;' +
        'background: linear-gradient(black, white);"></div>'
    );
  }

  /**
   * @param {Object} enterPage
   * @param {Object} leavePage
   * @param {Function} callback
   */
  push(enterPage, leavePage, callback) {
    this.backgroundMask.remove();
    leavePage.parentNode.insertBefore(this.backgroundMask, leavePage);

    const unblock = super.block(enterPage);

    animit.runAll(

      animit(enterPage, this.def)
        .default(
          { transform: 'translate3D(0, 100%, 0)' },
          { transform: 'translate3D(0, 0, 0)' }
        ),

      animit(leavePage, this.def)
        .default(
          { transform: 'translate3D(0, 0, 0)', opacity: 1 },
          { transform: 'translate3D(0, -10%, 0)', opacity: .9 }
        )
        .queue(done => {
          this.backgroundMask.remove();
          unblock();
          callback();
          done();
        })
    );
  }

  /**
   * @param {Object} enterPage
   * @param {Object} leavePage
   * @param {Function} callback
   */
  pop(enterPage, leavePage, callback) {
    this.backgroundMask.remove();
    enterPage.parentNode.insertBefore(this.backgroundMask, enterPage);

    const unblock = super.block(enterPage);

    animit.runAll(

      animit(enterPage, this.def)
        .default(
          { transform: 'translate3D(0, -43px, 0)', opacity: .9 },
          { transform: 'translate3D(0, 0, 0)', opacity: 1 }
        )
        .queue(done => {
          this.backgroundMask.remove();
          unblock();
          callback();
          done();
        }),

      animit(leavePage, this.def)
        .default(
          { transform: 'translate3D(0, 0, 0)' },
          { transform: 'translate3D(0, 100%, 0)' }
        )
    );
  }
}
