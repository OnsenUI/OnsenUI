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

import animit from '../../ons/animit';
import ModalAnimator from './animator';

/**
 * iOS style animator for modal.
 */

export default class LiftModalAnimator extends ModalAnimator
{
  constructor({timing = 'cubic-bezier( .1, .7, .1, 1)', delay = 0, duration = 0.4} = {}) {
    super({ timing, delay, duration });
  }

  /**
   * @param {HTMLElement} modal
   * @param {Function} callback
   */
  show(modal, callback) {
    callback = callback ? callback : function() {};

    animit(modal)
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
      .queue(function(done) {
        callback();
        done();
      })
      .play();
  }

  /**
   * @param {HTMLElement} modal
   * @param {Function} callback
   */
  hide(modal, callback) {
    callback = callback ? callback : function() {};

   animit(modal)
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
          transform: 'translate3D(0, 100%, 0)'
        },
        duration: this.duration,
        timing: this.timing
      })
      .restoreStyle()
      .queue(function(done) {
        callback();
        done();
      })
      .play();
  }
}
