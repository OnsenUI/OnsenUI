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

import IOSSwipeNavigatorAnimator from './ios-swipe-animator.js';
import util from '../../ons/util.js';
import animit from '../../ons/animit.js';
import contentReady from '../../ons/content-ready.js';

const translate3d = (x = 0, y = 0, z = 0) => `translate3d(${x}, ${y}, ${z})`;

/**
 * Slide animator for navigator transition like iOS's screen slide transition.
 */
export default class IOSSlideNavigatorAnimator extends IOSSwipeNavigatorAnimator {

  constructor({ timing = 'cubic-bezier(0.3, .4, 0, .9)', delay = 0, duration = 0.4, ...rest } = {}) {
    super({ timing, delay, duration, ...rest });

    this.backgroundMask = util.createElement(
      `<div style="position: absolute; width: 100%; height: 100%;` +
        `background-color: black; z-index: 2"></div>`
    );
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
    const toolbars = enterPage._canAnimateToolbar() && leavePage._canAnimateToolbar();

    const enterToolbar = enterPage._getToolbarElement();
    const leaveToolbar = leavePage._getToolbarElement();

    const isStatic = enterToolbar.hasAttribute('static') || leaveToolbar.hasAttribute('static');
    const isMaterial = util.hasModifier(enterToolbar, 'material') || util.hasModifier(leaveToolbar, 'material');
    const isTransparent = util.hasModifier(enterToolbar, 'transparent') || util.hasModifier(leaveToolbar, 'transparent');

    return toolbars && !isStatic && !isMaterial && !isTransparent;
  }

  _calculateDelta(element, decomposition) {
    let title, label;

    const pageRect = element.getBoundingClientRect();
    if (decomposition.backButtonLabel.classList.contains('back-button__label')) {
      const labelRect = decomposition.backButtonLabel.getBoundingClientRect();
      title = Math.round(pageRect.width / 2 - labelRect.width / 2 - labelRect.left);
    } else {
      title = Math.round((pageRect.width / 2) * 0.6);
    }

    if (decomposition.backButtonIcon.classList.contains('back-button__icon')) {
      label = decomposition.backButtonIcon.getBoundingClientRect().right - 2;
    }

    return {title, label};
  }

  /**
   * @param {Object} enterPage
   * @param {Object} leavePage
   * @param {Function} callback
   */
  push(enterPage, leavePage, callback) {
    this.backgroundMask.remove();
    leavePage.parentNode.insertBefore(this.backgroundMask, leavePage);

    const unblock = super.block(enterPage);

    contentReady(enterPage, () => {
      const enterPageTarget = util.findToolbarPage(enterPage) || enterPage;
      const leavePageTarget = util.findToolbarPage(leavePage) || leavePage;
      const enterPageDecomposition = this._decompose(enterPageTarget);
      const leavePageDecomposition = this._decompose(leavePageTarget);

      const delta = this._calculateDelta(leavePage, enterPageDecomposition);

      const shouldAnimateToolbar = this._shouldAnimateToolbar(enterPageTarget, leavePageTarget);

      if (shouldAnimateToolbar) {

        animit.runAll(

          animit([enterPageDecomposition.content, enterPageDecomposition.bottomToolbar, enterPageDecomposition.background], this.def)
            .default(
              { transform: translate3d('100%') },
              { transform: translate3d() }
            ),

          animit(enterPageDecomposition.toolbar, this.def)
            .default({ opacity: 0 }, { opacity: 1 }),

          animit(enterPageDecomposition.toolbarCenter, this.def)
            .default(
              { transform: translate3d('125%'), opacity: 1 },
              { transform: translate3d(), opacity: 1 }
            ),

          animit(enterPageDecomposition.backButtonLabel, this.def)
            .default(
              { transform: translate3d(`${delta.title}px`), opacity: 0 },
              {
                transform: translate3d(),
                opacity: 1,
                transition: `opacity ${this.duration}s linear, transform ${this.duration}s ${this.timing}`
              }
            ),

          animit(enterPageDecomposition.other, this.def)
            .default(
              { opacity: 0 },
              { css: { opacity: 1 }, timing: 'linear' }
            ),

          animit([leavePageDecomposition.content, leavePageDecomposition.bottomToolbar, leavePageDecomposition.background], this.def)
            .default(
              { transform: translate3d(), opacity: 1 },
              { transform: translate3d('-25%'), opacity: 0.9 }
            )
            .queue(done => {
              this.backgroundMask.remove();
              unblock();
              callback();
              done();
            }),

          animit(leavePageDecomposition.toolbarCenter, this.def)
            .default(
              { transform: translate3d(), opacity: 1 },
              {
                transform: translate3d(`-${delta.title}px`),
                opacity: 0,
                transition: `opacity ${this.duration}s linear, transform ${this.duration}s ${this.timing}`
              }
            ),

          animit(leavePageDecomposition.backButtonLabel, this.def)
            .default(
              { transform: translate3d(), opacity: 1 },
              { transform: translate3d(`-${delta.label}px`), opacity: 0 }
            ),

          animit(leavePageDecomposition.other, this.def)
            .default( { opacity: 1 }, { css: { opacity: 0 }, timing: 'linear' })

        );

      } else {

        animit.runAll(

          animit(enterPage, this.def)
            .default( { transform: translate3d('100%'), }, { transform: translate3d() }),

          animit(leavePage, this.def)
            .default( { transform: translate3d(), opacity: 1 }, { transform: translate3d('-25%'), opacity: .9 })
            .queue(done => {
              this.backgroundMask.remove();
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
    if (this.isSwiping) {
      return this.popSwipe(enterPage, leavePage, callback);
    }

    this.backgroundMask.remove();
    enterPage.parentNode.insertBefore(this.backgroundMask, enterPage);

    const unblock = super.block(enterPage);

    const enterPageTarget = util.findToolbarPage(enterPage) || enterPage;
    const leavePageTarget = util.findToolbarPage(leavePage) || leavePage;
    const enterPageDecomposition = this._decompose(enterPageTarget);
    const leavePageDecomposition = this._decompose(leavePageTarget);

    const delta = this._calculateDelta(leavePage, leavePageDecomposition);

    const shouldAnimateToolbar = this._shouldAnimateToolbar(enterPageTarget, leavePageTarget);

    if (shouldAnimateToolbar) {
      animit.runAll(

        animit([enterPageDecomposition.content, enterPageDecomposition.bottomToolbar, enterPageDecomposition.background], this.def)
          .default(
            { transform: translate3d('-25%'), opacity: .9 },
            { transform: translate3d(), opacity: 1 }
          ),

        animit(enterPageDecomposition.toolbarCenter, this.def)
          .default(
            { transform: translate3d(`-${delta.title}px`), opacity: 0 },
            {
              transform: translate3d(),
              opacity: 1,
              transition: `opacity ${this.duration}s linear, transform ${this.duration}s ${this.timing}`
            }
          ),

        animit(enterPageDecomposition.backButtonLabel, this.def)
          .default(
            { transform: translate3d(`-${delta.label}px`) },
            { transform: translate3d() }
          ),

        animit(enterPageDecomposition.other, this.def)
          .default(
            { opacity: 0 },
            { css: { opacity: 1 }, timing: 'linear' }
          ),

        animit([leavePageDecomposition.content, leavePageDecomposition.bottomToolbar, leavePageDecomposition.background], this.def)
          .default(
            { transform: translate3d() },
            { transform: translate3d('100%') }
          )
          .wait(0)
          .queue(done => {
            this.backgroundMask.remove();
            unblock();
            callback();
            done();
          }),

        animit(leavePageDecomposition.toolbar, this.def)
          .default(
            { opacity: 1 },
            { opacity: 0 }
          ),

        animit(leavePageDecomposition.toolbarCenter, this.def)
          .default(
            { transform: translate3d() },
            { transform: translate3d('125%') }
          ),

        animit(leavePageDecomposition.backButtonLabel, this.def)
          .default(
            { transform: translate3d(), opacity: 1 },
            {
              transform: translate3d(`${delta.title}px`),
              opacity: 0,
              transition: `opacity ${this.duration}s linear, transform ${this.duration}s ${this.timing}`
            }
          )
      );
    } else {
      animit.runAll(

        animit(enterPage, this.def)
          .default(
            { transform: translate3d('-25%'), opacity: .9 },
            { transform: translate3d(), opacity: 1 }
          ),

        animit(leavePage, this.def)
          .default(
            { transform: translate3d() },
            { transform: translate3d('100%') }
          )
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
