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

import util from '../../ons/util';
import NavigatorTransitionAnimator from './animator';
import animit from '../../ons/animit';

/**
 * Slide animator for navigator transition.
 */
export default class MDSlideNavigatorTransitionAnimator extends NavigatorTransitionAnimator {

  constructor({timing = 'cubic-bezier(.1, .7, .4, 1)', delay = 0, duration = 0.3} = {}) {
    super({timing, delay, duration});

    this.backgroundMask = util.createElement(`
      <div style="position: absolute; width: 100%; height: 100%; z-index: 2;
        background-color: black; opacity: 0;"></div>
    `);
    this.blackMaskOpacity = 0.4;
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

      animit(this.backgroundMask)
        .saveStyle()
        .queue({
          opacity: 0,
          transform: 'translate3d(0, 0, 0)'
        })
        .wait(this.delay)
        .queue({
          opacity: this.blackMaskOpacity
        }, {
          duration: this.duration,
          timing: this.timing
        })
        .restoreStyle()
        .queue(done => {
          this.backgroundMask.remove();
          done();
        }),

      animit(enterPage)
        .saveStyle()
        .queue({
          css: {
            transform: 'translate3D(100%, 0, 0)',
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
        .restoreStyle(),

      animit(leavePage)
        .saveStyle()
        .queue({
          css: {
            transform: 'translate3D(0, 0, 0)'
          },
          duration: 0
        })
        .wait(this.delay)
        .queue({
          css: {
            transform: 'translate3D(-45%, 0px, 0px)'
          },
          duration: this.duration,
          timing: this.timing
        })
        .restoreStyle()
        .wait(0.2)
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

      animit(this.backgroundMask)
        .saveStyle()
        .queue({
          opacity: this.blackMaskOpacity,
          transform: 'translate3d(0, 0, 0)'
        })
        .wait(this.delay)
        .queue({
          opacity: 0
        }, {
          duration: this.duration,
          timing: this.timing
        })
        .restoreStyle()
        .queue(done => {
          this.backgroundMask.remove();
          done();
        }),

      animit(enterPage)
        .saveStyle()
        .queue({
          css: {
            transform: 'translate3D(-45%, 0px, 0px)',
            opacity: 0.9
          },
          duration: 0
        })
        .wait(this.delay)
        .queue({
          css: {
            transform: 'translate3D(0px, 0px, 0px)',
            opacity: 1.0
          },
          duration: this.duration,
          timing: this.timing
        })
        .restoreStyle(),

      animit(leavePage)
        .queue({
          css: {
            transform: 'translate3D(0px, 0px, 0px)'
          },
          duration: 0
        })
        .wait(this.delay)
        .queue({
          css: {
            transform: 'translate3D(100%, 0px, 0px)'
          },
          duration: this.duration,
          timing: this.timing
        })
        .wait(0.2)
        .queue(done => {
          unblock();
          callback();
          done();
        })
    );
  }
}
