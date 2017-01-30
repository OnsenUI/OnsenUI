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

import NavigatorTransitionAnimator from './animator';
import util from '../../ons/util';
import animit from '../../ons/animit';

/**
 * Lift screen transition.
 */
export default class MDLiftNavigatorTransitionAnimator extends NavigatorTransitionAnimator {

  constructor({timing = 'cubic-bezier(.1, .7, .1, 1)', delay = 0.05, duration = 0.4} = {}) {
    super({ timing, delay, duration });

    this.backgroundMask = util.createElement(`
      <div style="position: absolute; width: 100%; height: 100%;
        background-color: black;"></div>
    `);
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

    const maskClear = animit(this.backgroundMask)
      .wait(this.delay + this.duration)
      .queue(done => {
        this.backgroundMask.remove();
        done();
      });

    animit.runAll(

      maskClear,

      animit(enterPage)
        .saveStyle()
        .queue({
          css: {
            transform: 'translate3D(0, 100%, 0)',
          },
          duration: 0
        })
        .wait(this.delay)
        .queue({
          css: {
            transform: 'translate3D(0, 0, 0)',
          },
          duration: this.duration,
          timing: this.timing
        })
        .restoreStyle()
        .queue(done => {
          unblock();
          callback();
          done();
        }),

      animit(leavePage)
        .queue({
          css: {
            opacity: 1.0
          },
          duration: 0
        })
        .queue({
          css: {
            opacity: 0.4
          },
          duration: this.duration,
          timing: this.timing
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

      animit(this.backgroundMask)
        .wait(this.delay + this.duration)
        .queue(done => {
          this.backgroundMask.remove();
          done();
        }),

      animit(enterPage)
        .queue({
          css: {
            transform: 'translate3D(0, 0, 0)',
            opacity: 0.4
          },
          duration: 0
        })
        .wait(this.delay)
        .queue({
          css: {
            transform: 'translate3D(0, 0, 0)',
            opacity: 1.0
          },
          duration: this.duration,
          timing: this.timing
        })
        .queue(done => {
          unblock();
          callback();
          done();
        }),

      animit(leavePage)
        .queue({
          css: {
            transform: 'translate3D(0, 0, 0)'
          },
          duration: 0
        })
        .wait(this.delay)
        .queue({
          css: {
            transform: 'translate3D(0, 100%, 0)'
          },
          duration: this.duration,
          timing: this.timing
        })
    );
  }
}
