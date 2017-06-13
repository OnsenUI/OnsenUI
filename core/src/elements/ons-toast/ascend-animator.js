
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
import animit from '../../ons/animit';
import platform from '../../ons/platform';
import ToastAnimator from './animator';

/**
 * Ascend Toast Animator.
 */
export default class AscendToastAnimator extends ToastAnimator {

  constructor({ timing = 'ease', delay = 0, duration = 0.25 } = {}) {
    super({ timing, delay, duration });

    this.messageDelay = this.duration * 0.4 + this.delay; // Delay message opacity change
    this.ascension = platform.isAndroid() ? 48 : 64; // Toasts are always 1 line
  }

  /**
   * @param {HTMLElement} toast
   * @param {Function} callback
   */
  show(toast, callback) {
    toast = toast._toast;
    util.globals.fabOffset = this.ascension;

    animit.runAll(
      animit(toast)
        .saveStyle()
        .queue({
          transform: `translate3d(0, ${this.ascension}px, 0)`
        })
        .wait(this.delay)
        .queue({
          transform: 'translate3d(0, 0, 0)'
        }, {
          duration: this.duration,
          timing: this.timing
        })
        .restoreStyle()
        .queue(done => {
          callback && callback();
          done();
        }),

      animit(this._getFabs())
        .wait(this.delay)
        .queue({
          transform: `translate3d(0, -${this.ascension}px, 0) scale(1)`
        }, {
          duration: this.duration,
          timing: this.timing
        }),

      animit(util.arrayFrom(toast.children))
        .saveStyle()
        .queue({
          opacity: 0
        })
        .wait(this.messageDelay)
        .queue({
          opacity: 1.0
        }, {
          duration: this.duration,
          timing: this.timing
        })
        .restoreStyle()
      );
  }

  /**
   * @param {HTMLElement} toast
   * @param {Function} callback
   */
  hide(toast, callback) {
    toast = toast._toast;
    util.globals.fabOffset = 0;

    animit.runAll(
      animit(toast)
        .saveStyle()
        .queue({
          transform: 'translate3d(0, 0, 0)'
        })
        .wait(this.delay)
        .queue({
          transform: `translate3d(0, ${this.ascension}px, 0)`
        }, {
          duration: this.duration,
          timing: this.timing
        })
        .restoreStyle()
        .queue(done => {
          callback && callback();
          done();
        }),

      animit(this._getFabs())
        .wait(this.delay)
        .queue({
          transform: 'translate3d(0, 0, 0) scale(1)'
        }, {
          duration: this.duration,
          timing: this.timing
        }),

      animit(util.arrayFrom(toast.children))
        .saveStyle()
        .queue({
          opacity: 1.0
        })
        .wait(this.delay)
        .queue({
          opacity: 0
        }, {
          duration: this.duration,
          timing: this.timing
        })
        .restoreStyle()
    );
  }

  _getFabs() {
    return util.arrayFrom(document.querySelectorAll('ons-fab[position~=bottom], ons-speed-dial[position~=bottom]')).filter(fab => fab.visible);
  }
}
