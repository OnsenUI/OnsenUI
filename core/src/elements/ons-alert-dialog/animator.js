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
import BaseAnimator from '../../ons/base-animator.js';

export class AlertDialogAnimator extends BaseAnimator {

  constructor({timing = 'linear', delay = 0, duration = 0.2} = {}) {
    super({ timing, delay, duration });
  }

  /**
   * @param {HTMLElement} dialog
   * @param {Function} done
   */
  show(dialog, done) {
    done();
  }

  /**
   * @param {HTMLElement} dialog
   * @param {Function} done
   */
  hide(dialog, done) {
    done();
  }
}

/**
 * Android style animator for alert dialog.
 */
export class AndroidAlertDialogAnimator extends AlertDialogAnimator {

  constructor({timing = 'cubic-bezier(.1, .7, .4, 1)', duration = 0.2, delay = 0} = {}) {
    super({duration, timing, delay});
  }

  /**
   * @param {Object} dialog
   * @param {Function} callback
   */
  show(dialog, callback) {
    callback = callback ? callback : function() {};

    animit.runAll(

      animit(dialog._mask, this.def)
        .default({ opacity: 0 }, { opacity: 1 }),

      animit(dialog._dialog, this.def)
        .default(
          { transform: 'translate3d(-50%, -50%, 0) scale3d(.9, .9, 1)', opacity: 0 },
          { transform: 'translate3d(-50%, -50%, 0) scale3d(1, 1, 1)', opacity: 1 }
        )
        .queue(done => {
          callback();
          done();
        })
    );
  }

  /**
   * @param {Object} dialog
   * @param {Function} callback
   */
  hide(dialog, callback) {
    callback = callback ? callback : function() {};

    animit.runAll(

      animit(dialog._mask, this.def)
        .default({ opacity: 1 }, { opacity: 0 }),

      animit(dialog._dialog, this.def)
        .default(
          { transform: 'translate3d(-50%, -50%, 0) scale3d(1, 1, 1)', opacity: 1 },
          { transform: 'translate3d(-50%, -50%, 0) scale3d(.9, .9, 1)', opacity: 0 }
        )
        .queue(done => {
          callback();
          done();
        })
    );
  }
}

/**
 * iOS style animator for alert dialog.
 */
export class IOSAlertDialogAnimator extends AlertDialogAnimator {

  constructor({timing = 'cubic-bezier(.1, .7, .4, 1)', duration = 0.2, delay = 0} = {}) {
    super({duration, timing, delay});
  }

  /*
   * @param {Object} dialog
   * @param {Function} callback
   */
  show(dialog, callback) {
    callback = callback ? callback : function() {};

    animit.runAll(

      animit(dialog._mask, this.def)
        .default({ opacity: 0 }, { opacity: 1 }),

      animit(dialog._dialog, this.def)
        .default(
          { transform: 'translate3d(-50%, -50%, 0) scale3d(1.3, 1.3, 1)', opacity: 0 },
          { transform: 'translate3d(-50%, -50%, 0) scale3d(1, 1, 1)', opacity: 1 }
        )
        .queue(done => {
          callback();
          done();
        })
    );
  }

  /**
   * @param {Object} dialog
   * @param {Function} callback
   */
  hide(dialog, callback) {
    callback = callback ? callback : function() {};

    animit.runAll(

      animit(dialog._mask, this.def)
        .default({ opacity: 1 }, { opacity: 0 }),

      animit(dialog._dialog, this.def)
        .default({ opacity: 1 }, { opacity: 0 })
        .queue(done => {
          callback();
          done();
        })
    );
  }
}
