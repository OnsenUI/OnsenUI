
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
import ModalAnimator from './animator.js';

/**
 * iOS style animator for dialog.
 */
export default class FadeModalAnimator extends ModalAnimator {

  constructor({timing = 'linear', delay = 0, duration = 0.3} = {}) {
    super({ timing, delay, duration });
  }

  /**
   * @param {HTMLElement} modal
   * @param {Function} callback
   */
  show(modal, callback) {
    callback = callback ? callback : function() {};

    animit(modal, this.def)
      .default({ opacity: 0 }, { opacity: 1 })
      .queue(done => {
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

    animit(modal, this.def)
      .default({ opacity: 1 }, { opacity: 0 })
      .queue(done => {
        callback();
        done();
      })
      .play();
  }
}
