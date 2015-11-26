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

((ons) => {
  'use strict';

  const NavigatorTransitionAnimator = ons._internal.NavigatorTransitionAnimator;
  const util = ons._util;

  /**
   * Slide animator for navigator transition like iOS's screen slide transition.
   */
  class IOSSlideNavigatorTransitionAnimator extends NavigatorTransitionAnimator {

    constructor(options) {
      options = ons._util.extend({
        duration: 0.4,
        timing: 'cubic-bezier(.1, .7, .1, 1)',
        delay: 0
      }, options || {});

      super(options);

      this.backgroundMask = ons._util.createElement(`
        <div style="position: absolute; width: 100%; height: 100%;
          background-color: black; opacity: 0;"></div>
      `);
    }

    _decompose(page) {
      CustomElements.upgrade(page.element);
      const toolbar = page.element._getToolbarElement();
      CustomElements.upgrade(toolbar);
      const left = toolbar._getToolbarLeftItemsElement();
      const right = toolbar._getToolbarRightItemsElement();

      const excludeBackButtonLabel = function(elements) {
        const result = [];

        for (let i = 0; i < elements.length; i++) {
          if (elements[i].nodeName.toLowerCase() === 'ons-back-button') {
            const iconElement = elements[i].querySelector('.ons-back-button__icon');
            if (iconElement) {
              result.push(iconElement);
            }
          } else {
            result.push(elements[i]);
          }
        }

        return result;
      };

      const other = []
        .concat(left.children.length === 0 ? left : excludeBackButtonLabel(left.children))
        .concat(right.children.length === 0 ? right : excludeBackButtonLabel(right.children));

      const pageLabels = [
        toolbar._getToolbarCenterItemsElement(),
        toolbar._getToolbarBackButtonLabelElement()
      ];

      return {
        pageLabels: pageLabels,
        other: other,
        content: page.element._getContentElement(),
        background: page.element._getBackgroundElement(),
        toolbar: toolbar,
        bottomToolbar: page.element._getBottomToolbarElement()
      };
    }

    _shouldAnimateToolbar(enterPage, leavePage) {
      const bothPageHasToolbar =
        enterPage.element._canAnimateToolbar() && leavePage.element._canAnimateToolbar();

      var noMaterialToolbar =
        !enterPage.element._getToolbarElement().classList.contains('navigation-bar--material') &&
        !leavePage.element._getToolbarElement().classList.contains('navigation-bar--material');

      return bothPageHasToolbar && noMaterialToolbar;
    }

    /**
     * @param {Object} enterPage
     * @param {Object} leavePage
     * @param {Function} callback
     */
    push(enterPage, leavePage, callback) {
      this.backgroundMask.remove();
      leavePage.element.parentNode.insertBefore(this.backgroundMask, leavePage.element.nextSibling);

      const enterPageDecomposition = this._decompose(enterPage);
      const leavePageDecomposition = this._decompose(leavePage);

      const delta = (() => {
        const rect = leavePage.element.getBoundingClientRect();
        return Math.round(((rect.right - rect.left) / 2) * 0.6);
      })();

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
        enterPage.element.style.zIndex = 'auto';
        leavePage.element.style.zIndex = 'auto';

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
                background: 'none',
                backgroundColor: 'rgba(0, 0, 0, 0)',
                borderColor: 'rgba(0, 0, 0, 0)'
              },
              duration: 0
            })
            .wait(this.delay + 0.3)
            .restoreStyle({
              duration: 0.1,
              transition:
                'background-color 0.1s linear, ' +
                'border-color 0.1s linear'
            }),

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
              enterPage.element.style.zIndex = '';
              leavePage.element.style.zIndex = '';
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

        enterPage.element.style.zIndex = 'auto';
        leavePage.element.style.zIndex = 'auto';

        animit.runAll(

          maskClear,

          animit(enterPage.element)
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

          animit(leavePage.element)
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
              enterPage.element.style.zIndex = '';
              leavePage.element.style.zIndex = '';
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
      enterPage.element.parentNode.insertBefore(this.backgroundMask, enterPage.element.nextSibling);

      const enterPageDecomposition = this._decompose(enterPage);
      const leavePageDecomposition = this._decompose(leavePage);

      const delta = (function() {
        const rect = leavePage.element.getBoundingClientRect();
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
          this.backgroundMask.remove();
          done();
        });

      const shouldAnimateToolbar = this._shouldAnimateToolbar(enterPage, leavePage);

      if (shouldAnimateToolbar) {

        enterPage.element.style.zIndex = 'auto';
        leavePage.element.style.zIndex = 'auto';

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
              enterPage.element.style.zIndex = '';
              leavePage.element.style.zIndex = '';
              done();
              finish();
            }),

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

        enterPage.element.style.zIndex = 'auto';
        leavePage.element.style.zIndex = 'auto';

        animit.runAll(

          maskClear,

          animit(enterPage.element)
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

          animit(leavePage.element)
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
              enterPage.element.style.zIndex = '';
              leavePage.element.style.zIndex = '';
              done();
              finish();
            })
        );
      }
    }
  }

  ons._internal = ons._internal || {};
  ons._internal.IOSSlideNavigatorTransitionAnimator = IOSSlideNavigatorTransitionAnimator;

})(window.ons = window.ons || {});
