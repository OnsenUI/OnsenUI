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

import util from '../../ons/util.js';
import NavigatorAnimator from './animator.js';
import animit from '../../ons/animit.js';

/**
 * Slide animator for navigator transition.
 */
export default class MDSlideNavigatorAnimator extends NavigatorAnimator {

  constructor({timing = 'cubic-bezier(.1, .7, .4, 1)', delay = 0, duration = 0.3} = {}) {
    super({timing, delay, duration});

    this.blackMaskOpacity = 0.4;
    this.backgroundMask = util.createElement(
      '<div style="position: absolute; width: 100%; height: 100%; z-index: 2;' +
        'background-color: black; opacity: 0;"></div>'
    );
  }

  /**
   * @param {Object} enterPage
   * @param {Object} leavePage
   * @param {Function} callback
   */
  push(enterPage, leavePage, callback) {
    this.backgroundMask.remove();
    leavePage.parentElement.insertBefore(this.backgroundMask, leavePage.nextSibling);

    const unblock = super.block(enterPage);

    animit.runAll(

      animit(this.backgroundMask, this.def)
        .default(
          { transform: 'translate3d(0, 0, 0)', opacity: 0 },
          { opacity: this.blackMaskOpacity }
        )
        .queue(done => {
          this.backgroundMask.remove();
          done();
        }),

      animit(enterPage, this.def)
        .default(
          { transform: 'translate3d(100%, 0, 0)' },
          { transform: 'translate3d(0, 0, 0)' }
        ),

      animit(leavePage, this.def)
        .default(
          { transform: 'translate3d(0, 0, 0)' },
          { transform: 'translate3d(-45%, 0, 0)' }
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
   * @param {Function} callback
   */
  pop(enterPage, leavePage, callback) {
    this.backgroundMask.remove();
    enterPage.parentNode.insertBefore(this.backgroundMask, enterPage.nextSibling);

    const unblock = super.block(enterPage);

    animit.runAll(

      animit(this.backgroundMask, this.def)
        .default(
          { transform: 'translate3d(0, 0, 0)', opacity: this.blackMaskOpacity },
          { opacity: 0 }
        )
        .queue(done => {
          this.backgroundMask.remove();
          done();
        }),

      animit(enterPage, this.def)
        .default(
          { transform: 'translate3d(-45%, 0, 0)', opacity: .9 },
          { transform: 'translate3d(0, 0, 0)', opacity: 1 }
        ),

      animit(leavePage, this.def)
        .default(
          { transform: 'translate3d(0, 0, 0)' },
          { transform: 'translate3d(100%, 0, 0)' }
        )
        .queue(done => {
          unblock();
          callback();
          done();
        })
    );
  }
}
