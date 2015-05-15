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

(function() {
  'use strict;';

  var module = angular.module('onsen');

  module.factory('IOSSlideTransitionAnimator', function(NavigatorTransitionAnimator, PageView) {

    /**
     * Slide animator for navigator transition like iOS's screen slide transition.
     */
    var IOSSlideTransitionAnimator = NavigatorTransitionAnimator.extend({

      duration: 0.4,
      timing: 'cubic-bezier(.1, .7, .1, 1)',
      delay: 0,

      /** Black mask */
      backgroundMask : angular.element(
        '<div style="position: absolute; width: 100%;' +
        'height: 100%; background-color: black; opacity: 0;"></div>'
      ),

      _decompose: function(page) {
        var left = page.getPageView().getToolbarLeftItemsElement();
        var right = page.getPageView().getToolbarRightItemsElement();

        var excludeBackButtonLabel = function(elements) {
          var result = [];

          for (var i = 0; i < elements.length; i++) {
            if (elements[i].nodeName.toLowerCase() === 'ons-back-button') {
              result.push(elements[i].querySelector('.ons-back-button__icon'));
            } else {
              result.push(elements[i]);
            }
          }

          return result;
        };

        var other = []
          .concat(left.children.length === 0 ? left : excludeBackButtonLabel(left.children))
          .concat(right.children.length === 0 ? right : excludeBackButtonLabel(right.children));

        var pageLabels = [
          page.getPageView().getToolbarCenterItemsElement(),
          page.getPageView().getToolbarBackButtonLabelElement()
        ];

        return {
          pageLabels: pageLabels,
          other: other,
          content: page.element[0]._getContentElement(),
          background: page.element[0]._getBackgroundElement(),
          toolbar: page.element[0]._getToolbarElement(),
          bottomToolbar: page.element[0]._getBottomToolbarElement()
        };
      },

      _shouldAnimateToolbar: function(enterPage, leavePage) {
        var bothPageHasToolbar =
          enterPage.element[0]._hasToolbarElement() &&
          leavePage.element[0]._hasToolbarElement();

        var noAndroidLikeToolbar =
          !angular.element(enterPage.element[0]._getToolbarElement()).hasClass('navigation-bar--android') &&
          !angular.element(leavePage.element[0]._getToolbarElement()).hasClass('navigation-bar--android');

        return bothPageHasToolbar && noAndroidLikeToolbar;
      },

      /**
       * @param {Object} enterPage
       * @param {Object} leavePage
       * @param {Function} callback
       */
      push: function(enterPage, leavePage, callback) {
        var mask = this.backgroundMask.remove();
        leavePage.element[0].parentNode.insertBefore(mask[0], leavePage.element[0].nextSibling);

        var enterPageDecomposition = this._decompose(enterPage);
        var leavePageDecomposition = this._decompose(leavePage);

        var delta = (function() {
          var rect = leavePage.element[0].getBoundingClientRect();
          return Math.round(((rect.right - rect.left) / 2) * 0.6);
        })();

        var maskClear = animit(mask[0])
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
          .resetStyle()
          .queue(function(done) {
            mask.remove();
            done();
          });

        var shouldAnimateToolbar = this._shouldAnimateToolbar(enterPage, leavePage);

        if (shouldAnimateToolbar) {
          enterPage.element.css({zIndex: 'auto'});
          leavePage.element.css({zIndex: 'auto'});

          animit.runAll(

            maskClear,

            animit([enterPageDecomposition.content, enterPageDecomposition.bottomToolbar, enterPageDecomposition.background])
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
              .resetStyle(),

            animit(enterPageDecomposition.toolbar)
              .queue({
                css: {
                  background: 'none',
                  backgroundColor: 'rgba(0, 0, 0, 0)',
                  borderColor: 'rgba(0, 0, 0, 0)'
                },
                duration: 0
              })
              .wait(this.delay + 0.3)
              .resetStyle({
                duration: 0.1,
                transition:
                  'background-color 0.1s linear, ' +
                  'border-color 0.1s linear'
              }),

            animit(enterPageDecomposition.pageLabels)
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
              .resetStyle(),

            animit(enterPageDecomposition.other)
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
              .resetStyle(),

            animit([leavePageDecomposition.content, leavePageDecomposition.bottomToolbar, leavePageDecomposition.background])
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
              .resetStyle()
              .queue(function(done) {
                enterPage.element.css({zIndex: ''});
                leavePage.element.css({zIndex: ''});
                callback();
                done();
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
                  transform: 'translate3d(-' + delta + 'px, 0, 0)',
                  opacity: 0,
                },
                duration: this.duration,
                timing: this.timing
              })
              .resetStyle(),

            animit(leavePageDecomposition.other)
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
              .resetStyle()

          );

        } else {

          animit.runAll(

            maskClear,

            animit(enterPage.element[0])
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
              .resetStyle(),

            animit(leavePage.element[0])
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
              .resetStyle()
              .queue(function(done) {
                callback();
                done();
              })
          );

        }
      },

      /**
       * @param {Object} enterPage
       * @param {Object} leavePage
       * @param {Function} done
       */
      pop: function(enterPage, leavePage, done) {
        var mask = this.backgroundMask.remove();
        enterPage.element[0].parentNode.insertBefore(mask[0], enterPage.element[0].nextSibling);

        var enterPageDecomposition = this._decompose(enterPage);
        var leavePageDecomposition = this._decompose(leavePage);

        var delta = (function() {
          var rect = leavePage.element[0].getBoundingClientRect();
          return Math.round(((rect.right - rect.left) / 2) * 0.6);
        })();

        var maskClear = animit(mask[0])
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
          .resetStyle()
          .queue(function(done) {
            mask.remove();
            done();
          });

        var shouldAnimateToolbar = this._shouldAnimateToolbar(enterPage, leavePage);

        if (shouldAnimateToolbar) {

          enterPage.element.css({zIndex: 'auto'});
          leavePage.element.css({zIndex: 'auto'});

          animit.runAll(

            maskClear,

            animit([enterPageDecomposition.content, enterPageDecomposition.bottomToolbar, enterPageDecomposition.background])
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
              .resetStyle(),

            animit(enterPageDecomposition.pageLabels)
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
              .resetStyle(),

            animit(enterPageDecomposition.toolbar)
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
              .resetStyle(),

            animit(enterPageDecomposition.other)
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
              .resetStyle(),

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
                enterPage.element.css({zIndex: ''});
                leavePage.element.css({zIndex: ''});
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

          animit.runAll(

            maskClear,

            animit(enterPage.element[0])
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
              .resetStyle(),

            animit(leavePage.element[0])
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
                done();
                finish();
              })
          );
        }
      }
    });

    return IOSSlideTransitionAnimator;
  });

})();
