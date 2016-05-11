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

const nullElement = document.createElement('div');
const find = (element, selectors) => {
  if (Array.isArray(selectors)) {
    return selectors.map(s => element.querySelector(s)).filter(e => e);
  }
  return element.querySelector(selectors) || nullElement;
}

/**
 * Slide animator for navigator transition like iOS's screen slide transition.
 */
export default class IOSSlideNavigatorTransitionAnimator extends NavigatorTransitionAnimator {

  constructor(options) {
    options = util.extend({
      duration: 0.4,
      timing: 'cubic-bezier(.1, .7, .1, 1)',
      delay: 0
    }, options || {});

    super(options);

    this.backgroundMask = util.createElement(`
      <div style="position: absolute; width: 100%; height: 100%;
        background-color: black; opacity: 0; z-index: 2"></div>
    `);
  }

  _decompose(page) {
    CustomElements.upgrade(page);
    const toolbar = page._toolbar;
    const result = {
      content: page._content,
      background: page._background,
      bottomToolbar: page._bottomToolbar
    };
    if (toolbar) {
      CustomElements.upgrade(toolbar);
      const pageLabels = find(toolbar, ['.center', '.back-button__label']);

      const sides = find(toolbar, ['.left', '.right']).map(e => e.children.length ? [].slice.call(e.children) : [e]);

      const other = [].concat.apply([], sides).map(e =>
        util.match(e, 'ons-back-button') ? find(e, '.back-button__icon') : e
      );

      util.extend(result, {toolbar, pageLabels, other});
    }

    return result;
  }

  _shouldAnimateToolbar(enterPage, leavePage) {
    return enterPage._canAnimateToolbar() && leavePage._canAnimateToolbar();
  }

  /**
   * @param {Object} enterPage
   * @param {Object} leavePage
   * @param {Function} callback
   */
  push(enterPage, leavePage, callback) {
    this.backgroundMask.remove();
    leavePage.parentNode.insertBefore(this.backgroundMask, leavePage.nextSibling);

    const enterPageDecomposition = this._decompose(enterPage);
    const leavePageDecomposition = this._decompose(leavePage);

    const delta = Math.round(leavePage.getBoundingClientRect().width * 0.3);

    const maskClear = animit(this.backgroundMask)
      .saveStyle()
      .queue({
        opacity: 0,
        transform: 'translate3d(0, 0, 0)'
      })
      .wait(this.delay)
      .queue({
        opacity: 0.1
      }, {
        duration: this.duration,
        timing: this.timing
      })
      .restoreStyle()
      .queue((done) => {
        this.backgroundMask.remove();
        done();
      });

    const shouldAnimateToolbar = this._shouldAnimateToolbar(enterPage, leavePage);

    if (shouldAnimateToolbar) {
      animit.runAll(

        maskClear,

        animit([enterPageDecomposition.content, enterPageDecomposition.bottomToolbar, enterPageDecomposition.background])
          .saveStyle()
          .queue({
            css: {
              transform: 'translate3D(100%, 0px, 0px)',
            },
            duration: 0
          })
          .wait(this.delay)
          .queue({
            css: {
              transform: 'translate3D(0px, 0px, 0px)',
            },
            duration: this.duration,
            timing: this.timing
          })
          .restoreStyle(),

        animit(enterPageDecomposition.pageLabels)
          .saveStyle()
          .queue({
            css: {
              transform: 'translate3d(' + delta + 'px, 0, 0)',
              opacity: 0
            },
            duration: 0
          })
          .wait(this.delay)
          .queue({
            css: {
              transform: 'translate3d(0, 0, 0)',
              opacity: 1.0
            },
            duration: this.duration,
            timing: this.timing
          })
          .restoreStyle(),

        animit(enterPageDecomposition.other)
          .saveStyle()
          .queue({
            css: {opacity: 0},
            duration: 0
          })
          .wait(this.delay)
          .queue({
            css: {opacity: 1},
            duration: this.duration,
            timing: this.timing
          })
          .restoreStyle(),

        animit([leavePageDecomposition.content, leavePageDecomposition.bottomToolbar, leavePageDecomposition.background])
          .saveStyle()
          .queue({
            css: {
              transform: 'translate3D(0, 0, 0)',
            },
            duration: 0
          })
          .wait(this.delay)
          .queue({
            css: {
              transform: 'translate3D(-25%, 0px, 0px)',
            },
            duration: this.duration,
            timing: this.timing
          })
          .restoreStyle()
          .queue(function(done) {
            callback();
            done();
          }),

        animit(leavePageDecomposition.pageLabels)
          .saveStyle()
          .queue({
            css: {
              transform: 'translate3d(0, 0, 0)',
              opacity: 1.0
            },
            duration: 0
          })
          .wait(this.delay)
          .queue({
            css: {
              transform: 'translate3d(-' + delta + 'px, 0, 0)',
              opacity: 0,
            },
            duration: this.duration,
            timing: this.timing
          })
          .restoreStyle(),

        animit(leavePageDecomposition.other)
          .saveStyle()
          .queue({
            css: {opacity: 1},
            duration: 0
          })
          .wait(this.delay)
          .queue({
            css: {opacity: 0},
            duration: this.duration,
            timing: this.timing
          })
          .restoreStyle()

      );

    } else {

      animit.runAll(

        maskClear,

        animit(enterPage)
          .saveStyle()
          .queue({
            css: {
              transform: 'translate3D(100%, 0px, 0px)',
            },
            duration: 0
          })
          .wait(this.delay)
          .queue({
            css: {
              transform: 'translate3D(0px, 0px, 0px)',
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
              transform: 'translate3D(-25%, 0px, 0px)'
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
   * @param {Object} enterPage
   * @param {Object} leavePage
   * @param {Function} done
   */
  pop(enterPage, leavePage, done) {
    this.backgroundMask.remove();
    enterPage.parentNode.insertBefore(this.backgroundMask, enterPage.nextSibling);

    const enterPageDecomposition = this._decompose(enterPage);
    const leavePageDecomposition = this._decompose(leavePage);

    const delta = (function() {
      const rect = leavePage.getBoundingClientRect();
      return Math.round(((rect.right - rect.left) / 2) * 0.6);
    })();

    const maskClear = animit(this.backgroundMask)
      .saveStyle()
      .queue({
        opacity: 0.1,
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
      .queue((done) => {
        done();
      });

    const shouldAnimateToolbar = this._shouldAnimateToolbar(enterPage, leavePage);

    if (shouldAnimateToolbar) {
      animit.runAll(

        maskClear,

        animit([enterPageDecomposition.content, enterPageDecomposition.bottomToolbar, enterPageDecomposition.background])
          .saveStyle()
          .queue({
            css: {
              transform: 'translate3D(-25%, 0px, 0px)',
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

        animit(enterPageDecomposition.pageLabels)
          .saveStyle()
          .queue({
            css: {
              transform: 'translate3d(-' + delta + 'px, 0, 0)',
              opacity: 0
            },
            duration: 0
          })
          .wait(this.delay)
          .queue({
            css: {
              transform: 'translate3d(0, 0, 0)',
              opacity: 1.0
            },
            duration: this.duration,
            timing: this.timing
          })
          .restoreStyle(),

        animit(enterPageDecomposition.toolbar)
          .saveStyle()
          .queue({
            css: {
              transform: 'translate3d(0, 0, 0)',
              opacity: 1.0
            },
            duration: 0
          })
          .wait(this.delay)
          .queue({
            css: {
              transform: 'translate3d(0, 0, 0)',
              opacity: 1.0
            },
            duration: this.duration,
            timing: this.timing
          })
          .restoreStyle(),

        animit(enterPageDecomposition.other)
          .saveStyle()
          .queue({
            css: {opacity: 0},
            duration: 0
          })
          .wait(this.delay)
          .queue({
            css: {opacity: 1},
            duration: this.duration,
            timing: this.timing
          })
          .restoreStyle(),

        animit([leavePageDecomposition.content, leavePageDecomposition.bottomToolbar, leavePageDecomposition.background])
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
          .wait(0)
          .queue(function(finish) {
            this.backgroundMask.remove();
            done();
            finish();
          }.bind(this)),

        animit(leavePageDecomposition.other)
          .queue({
            css: {
              transform: 'translate3d(0, 0, 0)',
              opacity: 1
            },
            duration: 0
          })
          .wait(this.delay)
          .queue({
            css: {
              transform: 'translate3d(0, 0, 0)',
              opacity: 0,
            },
            duration: this.duration,
            timing: this.timing
          }),

        animit(leavePageDecomposition.toolbar)
          .queue({
            css: {
              background: 'none',
              backgroundColor: 'rgba(0, 0, 0, 0)',
              borderColor: 'rgba(0, 0, 0, 0)'
            },
            duration: 0
          }),

        animit(leavePageDecomposition.pageLabels)
          .queue({
            css: {
              transform: 'translate3d(0, 0, 0)',
              opacity: 1.0
            },
            duration: 0
          })
          .wait(this.delay)
          .queue({
            css: {
              transform: 'translate3d(' + delta + 'px, 0, 0)',
              opacity: 0,
            },
            duration: this.duration,
            timing: this.timing
          })
      );
    } else {
      animit.runAll(

        maskClear,

        animit(enterPage)
          .saveStyle()
          .queue({
            css: {
              transform: 'translate3D(-25%, 0px, 0px)',
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
          .queue(function(finish) {
            this.backgroundMask.remove();
            done();
            finish();
          }.bind(this))
      );
    }
  }
}
