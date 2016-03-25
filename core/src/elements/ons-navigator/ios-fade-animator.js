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
import util from 'ons/util';

/**
 * Fade-in screen transition.
 */
export default class IOSFadeNavigatorTransitionAnimator extends NavigatorTransitionAnimator {

  constructor(options) {
    options = util.extend({
      timing: 'linear',
      duration: '0.4',
      delay: '0'
    }, options || {});

    super(options);
  }


  /**
   * @param {Object} enterPage
   * @param {Object} leavePage
   * @param {Function} callback
   */
  push(enterPage, leavePage, callback) {

    animit.runAll(

      animit([enterPage._getContentElement(), enterPage._getBackgroundElement()])
        .saveStyle()
        .queue({
          css: {
            transform: 'translate3D(0, 0, 0)',
            opacity: 0
          },
          duration: 0
        })
        .wait(this.delay)
        .queue({
          css: {
            transform: 'translate3D(0, 0, 0)',
            opacity: 1
          },
          duration: this.duration,
          timing: this.timing
        })
        .restoreStyle()
        .queue(function(done) {
          callback();
          done();
        }),

      animit(enterPage._getToolbarElement())
        .saveStyle()
        .queue({
          css: {
            transform: 'translate3D(0, 0, 0)',
            opacity: 0
          },
          duration: 0
        })
        .wait(this.delay)
        .queue({
          css: {
            transform: 'translate3D(0, 0, 0)',
            opacity: 1
          },
          duration: this.duration,
          timing: this.timing
        })
        .restoreStyle()
    );

  }

  /**
   * @param {Object} enterPage
   * @param {Object} leavePage
   * @param {Function} done
   */
  pop(enterPage, leavePage, callback) {
    animit.runAll(

      animit([leavePage._getContentElement(), leavePage._getBackgroundElement()])
        .queue({
          css: {
            transform: 'translate3D(0, 0, 0)',
            opacity: 1
          },
          duration: 0
        })
        .wait(this.delay)
        .queue({
          css: {
            transform: 'translate3D(0, 0, 0)',
            opacity: 0
          },
          duration: this.duration,
          timing: this.timing
        })
        .queue(function(done) {
          callback();
          done();
        }),

      animit(leavePage._getToolbarElement())
        .queue({
          css: {
            transform: 'translate3D(0, 0, 0)',
            opacity: 1
          },
          duration: 0
        })
        .wait(this.delay)
        .queue({
          css: {
            transform: 'translate3D(0, 0, 0)',
            opacity: 0
          },
          duration: this.duration,
          timing: this.timing
        })

    );
  }
}
