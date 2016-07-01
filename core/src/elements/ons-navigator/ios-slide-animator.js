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
 * Slide animator for navigator transition like iOS's screen slide transition.
 */
export default class IOSSlideNavigatorTransitionAnimator extends NavigatorTransitionAnimator {

  constructor(options) {
    options = util.extend({
      duration: 0.4,
      timing: 'ease',
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
    const toolbar = page._getToolbarElement();
    CustomElements.upgrade(toolbar);
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
      !enterPage._getToolbarElement().classList.contains('navigation-bar--material') &&
      !leavePage._getToolbarElement().classList.contains('navigation-bar--material');

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

    const enterPageDecomposition = this._decompose(enterPage);
    const leavePageDecomposition = this._decompose(leavePage);

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

    const shouldAnimateToolbar = this._shouldAnimateToolbar(enterPage, leavePage);

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
          .queue(function(done) {
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

    const shouldAnimateToolbar = this._shouldAnimateToolbar(enterPage, leavePage);

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
              transform: 'translate3d(-' + delta.label + 'px, 0, 0)',
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
          .queue(function(finish) {
            this.backgroundMask.remove();
            done();
            finish();
          }.bind(this)),

        animit(leavePageDecomposition.other.concat(leavePageDecomposition.backButtonIcon))
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

        animit(leavePageDecomposition.toolbarCenter)
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
              transform: 'translate3d(125%, 0, 0)',
              opacity: 0,
            },
            duration: this.duration,
            timing: this.timing
          }),

        animit(leavePageDecomposition.backButtonLabel)
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
              transform: 'translate3d(' + delta.title + 'px, 0, 0)',
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
