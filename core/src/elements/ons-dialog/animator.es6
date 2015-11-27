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

export class DialogAnimator {

  constructor({timing = 'linear', delay = 0, duration = 0.2} = {}) {
    this.timing = timing;
    this.delay = delay;
    this.duration = duration;
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

      animit(dialog._mask)
        .queue({
          opacity: 0
        })
        .wait(this.delay)
        .queue({
          opacity: 1.0
        }, {
          duration: this.duration,
          timing: this.timing
        }),

      animit(dialog._dialog)
        .saveStyle()
        .queue({
          css: {
            transform: 'translate3d(-50%, -60%, 0)',
            opacity: 0.0
          },
          duration: 0
        })
        .wait(this.delay)
        .queue({
          css: {
            transform: 'translate3d(-50%, -50%, 0)',
            opacity: 1.0
          },
          duration: this.duration,
          timing: this.timing
        })
        .restoreStyle()
        .queue(function(done) {
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

      animit(dialog._mask)
        .queue({
          opacity: 1.0
        })
        .wait(this.delay)
        .queue({
          opacity: 0
        }, {
          duration: this.duration,
          timing: this.timing
        }),

      animit(dialog._dialog)
        .saveStyle()
        .queue({
          css: {
            transform: 'translate3d(-50%, -50%, 0)',
            opacity: 1.0
          },
          duration: 0
        })
        .wait(this.delay)
        .queue({
          css: {
            transform: 'translate3d(-50%, -60%, 0)',
            opacity: 0.0
          },
          duration: this.duration,
          timing: this.timing
        })
        .restoreStyle()
        .queue(function(done) {
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

      animit(dialog._mask)
        .queue({
          opacity: 0
        })
        .wait(this.delay)
        .queue({
          opacity: 1.0
        }, {
          duration: this.duration,
          timing: this.timing
        }),

      animit(dialog._dialog)
        .saveStyle()
        .queue({
          css: {
            transform: 'translate3d(-50%, 300%, 0)'
          },
          duration: 0
        })
        .wait(this.delay)
        .queue({
          css: {
            transform: 'translate3d(-50%, -50%, 0)'
          },
          duration: this.duration,
          timing: this.timing
        })
        .restoreStyle()
        .queue(function(done) {
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

      animit(dialog._mask)
        .queue({
          opacity: 1.0
        })
        .wait(this.delay)
        .queue({
          opacity: 0
        }, {
          duration: this.duration,
          timing: this.timing
        }),

      animit(dialog._dialog)
        .saveStyle()
        .queue({
          css: {
            transform: 'translate3d(-50%, -50%, 0)'
          },
          duration: 0
        })
        .wait(this.delay)
        .queue({
          css: {
            transform: 'translate3d(-50%, 300%, 0)'
          },
          duration: this.duration,
          timing: this.timing
        })
        .restoreStyle()
        .queue(function(done) {
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
  }

  /**
   * @param {Object} dialog
   * @param {Function} callback
   */
  show(dialog, callback) {
    callback = callback ? callback : function() {};

    animit.runAll(

      animit(dialog._mask)
        .queue({
          opacity: 0
        })
        .wait(this.delay)
        .queue({
          opacity: 1.0
        }, {
          duration: this.duration,
          timing: this.timing
        }),

      animit(dialog._dialog)
        .saveStyle()
        .queue({
          css: {
            transform: 'translate3D(-50%, -350%, 0)',
          },
          duration: 0
        })
        .wait(this.delay)
        .queue({
          css: {
            transform: 'translate3D(-50%, -50%, 0)',
          },
          duration: this.duration,
          timing: this.timing
        })
        .restoreStyle()
        .queue(function(done) {
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

      animit(dialog._mask)
        .queue({
          opacity: 1.0
        })
        .wait(this.delay)
        .queue({
          opacity: 0
        }, {
          duration: this.duration,
          timing: this.timing
        }),

      animit(dialog._dialog)
        .saveStyle()
        .queue({
          css: {
            transform: 'translate3D(-50%, -50%, 0)'
          },
          duration: 0
        })
        .wait(this.delay)
        .queue({
          css: {
            transform: 'translate3D(-50%, -350%, 0)'
          },
          duration: this.duration,
          timing: this.timing
        })
        .restoreStyle()
        .queue(function(done) {
          callback();
          done();
        })
    );
  }
}
