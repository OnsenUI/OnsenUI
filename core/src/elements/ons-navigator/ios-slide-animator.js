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
import util from '../../ons/util';
import animit from '../../ons/animit';
import contentReady from '../../ons/content-ready';

/**
 * Slide animator for navigator transition like iOS's screen slide transition.
 */
export default class IOSSlideNavigatorTransitionAnimator extends NavigatorTransitionAnimator {

  constructor({timing = 'ease', delay = 0, duration = 0.4} = {}) {
    super({ timing, delay, duration });

    this.backgroundMask = util.createElement(`
      <div style="position: absolute; width: 100%; height: 100%;
        background-color: black; opacity: 0; z-index: 2"></div>
    `);

  }

  _decompose(page) {
    const toolbar = page._getToolbarElement();
    const left = toolbar._getToolbarLeftItemsElement();
    const right = toolbar._getToolbarRightItemsElement();

    const excludeBackButton = function(elements) {
      const result = [];

      for (let i = 0; i < elements.length; i++) {
        if (elements[i].nodeName.toLowerCase() !== 'ons-back-button') {
          result.push(elements[i]);
        }
      }

      return result;
    };

    const other = []
      .concat(left.children.length === 0 ? left : excludeBackButton(left.children))
      .concat(right.children.length === 0 ? right : excludeBackButton(right.children));

    return {
      toolbarCenter: toolbar._getToolbarCenterItemsElement(),
      backButtonIcon: toolbar._getToolbarBackButtonIconElement(),
      backButtonLabel: toolbar._getToolbarBackButtonLabelElement(),
      other: other,
      content: page._getContentElement(),
      background: page._getBackgroundElement(),
      toolbar: toolbar,
      bottomToolbar: page._getBottomToolbarElement()
    };
  }

  _shouldAnimateToolbar(enterPage, leavePage) {
    const bothPageHasToolbar =
      enterPage._canAnimateToolbar() && leavePage._canAnimateToolbar();

    var noMaterialToolbar =
      !enterPage._getToolbarElement().classList.contains('toolbar--material') &&
      !leavePage._getToolbarElement().classList.contains('toolbar--material');

    return bothPageHasToolbar && noMaterialToolbar;
  }

  _calculateDelta(element, decomposition) {
    let title, label;

    const pageRect = element.getBoundingClientRect();
    if (decomposition.backButtonLabel.classList.contains('back-button__label')) {
      const labelRect = decomposition.backButtonLabel.getBoundingClientRect();
      title = Math.round((pageRect.width / 2) - (labelRect.width / 2) - labelRect.left);
    } else {
      title = Math.round((pageRect.width / 2) * 0.6);
    }

    if (decomposition.backButtonIcon.classList.contains('back-button__icon')) {
      label = decomposition.backButtonIcon.getBoundingClientRect().right - 2;
    }

    return {title, label}
  }

  /**
   * @param {Object} enterPage
   * @param {Object} leavePage
   * @param {Function} callback
   */
  push(enterPage, leavePage, callback) {
    this.backgroundMask.remove();
    leavePage.parentNode.insertBefore(this.backgroundMask, leavePage.nextSibling);

    const unblock = super.block(enterPage);

    contentReady(enterPage, () => {
      const enterPageTarget = util.findToolbarPage(enterPage) || enterPage;
      const leavePageTarget = util.findToolbarPage(leavePage) || leavePage;
      const enterPageDecomposition = this._decompose(enterPageTarget);
      const leavePageDecomposition = this._decompose(leavePageTarget);

      const delta = this._calculateDelta(leavePage, enterPageDecomposition);

      const maskClear = animit(this.backgroundMask)
        .saveStyle()
        .queue({
          opacity: 0,
          transform: 'translate3d(0, 0, 0)'
        })
        .wait(this.delay)
        .queue({
          opacity: 0.05
        }, {
          duration: this.duration,
          timing: this.timing
        })
        .restoreStyle()
        .queue((done) => {
          this.backgroundMask.remove();
          done();
        });

      const shouldAnimateToolbar = this._shouldAnimateToolbar(enterPageTarget, leavePageTarget);

      if (shouldAnimateToolbar) {
        // TODO: Remove this fix
        const enterPageToolbarHeight = enterPageDecomposition.toolbar.getBoundingClientRect().height + 'px';
        this.backgroundMask.style.top = enterPageToolbarHeight;

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

          animit(enterPageDecomposition.toolbar)
            .saveStyle()
            .queue({
              css: {
                opacity: 0
              },
              duration: 0
            })
            .queue({
              css: {
                opacity: 1
              },
              duration: this.duration,
              timing: this.timing
            })
            .restoreStyle(),

          animit(enterPageDecomposition.background)
            .queue({
              css: {
                top: enterPageToolbarHeight
              },
              duration: 0
            }),

          animit(enterPageDecomposition.toolbarCenter)
            .saveStyle()
            .queue({
              css: {
                transform: 'translate3d(125%, 0, 0)',
                opacity: 1
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

          animit(enterPageDecomposition.backButtonLabel)
            .saveStyle()
            .queue({
              css: {
                transform: 'translate3d(' + delta.title + 'px, 0, 0)',
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
            .queue(done => {
              unblock();
              callback();
              done();
            }),

          animit(leavePageDecomposition.toolbarCenter)
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
                transform: 'translate3d(-' + delta.title + 'px, 0, 0)',
                opacity: 0,
              },
              duration: this.duration,
              timing: this.timing
            })
            .restoreStyle(),

          animit(leavePageDecomposition.backButtonLabel)
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
                transform: 'translate3d(-' + delta.label + 'px, 0, 0)',
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
            .queue(done => {
              unblock();
              callback();
              done();
            })
        );

      }
    });
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

    const enterPageTarget = util.findToolbarPage(enterPage) || enterPage;
    const leavePageTarget = util.findToolbarPage(leavePage) || leavePage;
    const enterPageDecomposition = this._decompose(enterPageTarget);
    const leavePageDecomposition = this._decompose(leavePageTarget);

    const delta = this._calculateDelta(leavePage, leavePageDecomposition);

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

    const shouldAnimateToolbar = this._shouldAnimateToolbar(enterPageTarget, leavePageTarget);

    if (shouldAnimateToolbar) {
      const enterPageToolbarHeight = enterPageDecomposition.toolbar.getBoundingClientRect().height + 'px';
      this.backgroundMask.style.top = enterPageToolbarHeight;

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

        animit(enterPageDecomposition.toolbarCenter)
          .saveStyle()
          .queue({
            css: {
              transform: 'translate3d(-' + delta.title + 'px, 0, 0)',
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

        animit(enterPageDecomposition.backButtonLabel)
          .saveStyle()
          .queue({
            css: {
              transform: 'translate3d(-' + delta.label + 'px, 0, 0)'
            },
            duration: 0
          })
          .wait(this.delay)
          .queue({
            css: {
              transform: 'translate3d(0, 0, 0)'
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

        animit(leavePageDecomposition.background)
          .queue({
            css: {
              top: enterPageToolbarHeight
            },
            duration: 0
          }),

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
          .queue(done => {
            this.backgroundMask.remove();
            unblock();
            callback();
            done();
          }),

        animit(leavePageDecomposition.toolbar)
          .queue({
            css: {
              opacity: 1
            },
            duration: 0
          })
          .queue({
            css: {
              opacity: 0
            },
            duration: this.duration,
            timing: this.timing
          }),

        animit(leavePageDecomposition.toolbarCenter)
          .queue({
            css: {
              transform: 'translate3d(0, 0, 0)'
            },
            duration: 0
          })
          .wait(this.delay)
          .queue({
            css: {
              transform: 'translate3d(125%, 0, 0)'
            },
            duration: this.duration,
            timing: this.timing
          }),

        animit(leavePageDecomposition.backButtonLabel)
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
              transform: 'translate3d(' + delta.title + 'px, 0, 0)',
              opacity: 0
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
          .queue(done => {
            this.backgroundMask.remove();
            unblock();
            callback();
            done();
          })
      );
    }
  }
}
