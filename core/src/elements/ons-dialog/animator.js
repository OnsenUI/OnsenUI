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

export class DialogAnimator extends BaseAnimator {

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
 * Android style animator for dialog.
 */
export class AndroidDialogAnimator extends DialogAnimator {

  constructor({timing = 'ease-in-out', delay = 0, duration = 0.3} = {}) {
    super({timing, delay, duration});
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
          { transform: 'translate3d(-50%, -60%, 0)', opacity: 0 },
          { transform: 'translate3d(-50%, -50%, 0)', opacity: 1 }
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
          { transform: 'translate3d(-50%, -50%, 0)', opacity: 1 },
          { transform: 'translate3d(-50%, -60%, 0)', opacity: 0 }
        )
        .queue(done => {
          callback();
          done();
        })
    );
  }
}

/**
 * iOS style animator for dialog.
 */
export class IOSDialogAnimator extends DialogAnimator {

  constructor({timing = 'ease-in-out', delay = 0, duration = 0.2} = {}) {
    super({timing, delay, duration});

    this.bodyHeight = document.body.clientHeight; // avoid Forced Synchronous Layout
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
          { transform: `translate3d(-50%, ${this.bodyHeight / 2.0 - 1}px, 0)` },
          { transform: 'translate3d(-50%, -50%, 0)' }
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
          { transform: 'translate3d(-50%, -50%, 0)' },
          { transform: `translate3d(-50%, ${this.bodyHeight / 2.0 - 1}px, 0)` }
        )
        .queue(done => {
          callback();
          done();
        })
    );
  }
}

/**
 * Slide animator for dialog.
 */
export class SlideDialogAnimator extends DialogAnimator {

  constructor({timing = 'cubic-bezier(.1, .7, .4, 1)', delay = 0, duration = 0.2} = {}) {
    super({timing, delay, duration});

    this.bodyHeight = document.body.clientHeight; // avoid Forced Synchronous Layout
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
          // FIXME: This should avoid Forced Synchronous Layout. Otherwise, fade animation of mask will be broken.
          { transform: `translate3d(-50%, ${- (this.bodyHeight / 2.0) + 1 - dialog._dialog.clientHeight}px, 0)` },
          { transform: 'translate3d(-50%, -50%, 0)' }
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
          { transform: 'translate3d(-50%, -50%, 0)' },
          // FIXME: This should avoid Forced Synchronous Layout. Otherwise, fade animation of mask will be broken.
          { transform: `translate3d(-50%, ${- (this.bodyHeight / 2.0) + 1 - dialog._dialog.clientHeight}px, 0)` }
        )
        .queue(done => {
          callback();
          done();
        })
    );
  }
}
