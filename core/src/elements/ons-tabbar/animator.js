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

export class TabbarAnimator {

  /**
   * @param {Object} options
   * @param {String} options.timing
   * @param {Number} options.duration
   * @param {Number} options.delay
   */
  constructor(options = {}) {
    this.timing = options.timing || 'linear';
    this.duration = options.duration !== undefined ? options.duration : '0.4';
    this.delay = options.delay !== undefined ? options.delay : '0';
  }

  /**
   * @param {Element} enterPage ons-page element
   * @param {Element} leavePage ons-page element
   * @param {Number} enterPageIndex
   * @param {Number} leavePageIndex
   * @param {Function} done
   */
  apply(enterPage, leavePage, enterPageIndex, leavePageIndex, done) {
    throw new Error('This method must be implemented.');
  }
}


export class TabbarNoneAnimator extends TabbarAnimator {
  apply(enterPage, leavePage, enterIndex, leaveIndex, done) {
    setTimeout(done, 1000 / 60);
  }
}

export class TabbarFadeAnimator extends TabbarAnimator {

  constructor(options) {
    options.timing = options.timing !== undefined ? options.timing : 'linear';
    options.duration = options.duration !== undefined ? options.duration : '0.4';
    options.delay = options.delay !== undefined ? options.delay : '0';

    super(options);
  }

  apply(enterPage, leavePage, enterPageIndex, leavePageIndex, done) {
    animit.runAll(
      animit(enterPage)
        .saveStyle()
        .queue({
          transform: 'translate3D(0, 0, 0)',
          opacity: 0
        })
        .wait(this.delay)
        .queue({
          transform: 'translate3D(0, 0, 0)',
          opacity: 1
        }, {
          duration: this.duration,
          timing: this.timing
        })
        .restoreStyle()
        .queue(function(callback) {
          done();
          callback();
        }),

      animit(leavePage)
        .queue({
          transform: 'translate3D(0, 0, 0)',
          opacity: 1
        })
        .wait(this.delay)
        .queue({
          transform: 'translate3D(0, 0, 0)',
          opacity: 0
        }, {
          duration: this.duration,
          timing: this.timing
        })
    );
  }
}

export class TabbarSlideAnimator extends TabbarAnimator {

  constructor(options) {
    options.timing = options.timing !== undefined ? options.timing : 'ease-in';
    options.duration = options.duration !== undefined ? options.duration : '0.15';
    options.delay = options.delay !== undefined ? options.delay : '0';

    super(options);
  }

  /**
   * @param {jqLite} enterPage
   * @param {jqLite} leavePage
   */
  apply(enterPage, leavePage, enterIndex, leaveIndex, done) {
    const sgn = enterIndex > leaveIndex;

    animit.runAll(
      animit(enterPage)
        .saveStyle()
        .queue({
          transform: 'translate3D(' + (sgn ? '' : '-') + '100%, 0, 0)',
        })
        .wait(this.delay)
        .queue({
          transform: 'translate3D(0, 0, 0)',
        }, {
          duration: this.duration,
          timing: this.timing
        })
        .restoreStyle()
        .queue(function(callback) {
          done();
          callback();
        }),
      animit(leavePage)
        .queue({
          transform: 'translate3D(0, 0, 0)',
        })
        .wait(this.delay)
        .queue({
          transform: 'translate3D(' + (sgn ? '-' : '') + '100%, 0, 0)',
        }, {
          duration: this.duration,
          timing: this.timing
        })
    );
  }
}
