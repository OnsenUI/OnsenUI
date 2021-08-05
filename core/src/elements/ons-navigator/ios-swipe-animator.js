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

import NavigatorAnimator from './animator.js';
import util from '../../ons/util.js';
import animit from '../../ons/animit.js';

/**
 * Abstract swipe animator for iOS navigator transition.
 */
export default class IOSSwipeNavigatorAnimator extends NavigatorAnimator {

  static get swipeable() {
    return true;
  }

  constructor({ durationRestore = 0.1, durationSwipe = 0.15, timingSwipe = 'linear', ...rest } = {}) {
    super({...rest});

    if (this.constructor === IOSSwipeNavigatorAnimator) {
      util.throwAbstract();
    }

    this.durationRestore = durationRestore;
    this.durationSwipe = durationSwipe;
    this.timingSwipe = timingSwipe;

    this.optSwipe = { timing: timingSwipe, duration: durationSwipe };
    this.optRestore = { timing: timingSwipe, duration: durationRestore };

    this.swipeShadow = util.createElement(
      `<div style="position: absolute; height: 100%; width: 12px; right: 100%; top: 0; bottom: 0; z-index: -1;` +
        `background: linear-gradient(to right, transparent 0, rgba(0,0,0,.04) 40%, rgba(0,0,0,.12) 80%, rgba(0,0,0,.16) 100%);"></div>`
    );

    this.isDragStart = true;
  }

  _decompose() {
    util.throwMember();
  }

  _shouldAnimateToolbar() {
    util.throwMember();
  }

  _calculateDelta() {
    util.throwMember();
  }

  _dragStartSetup(enterPage, leavePage) {
    this.isDragStart = false;

    // Avoid content clicks
    this.unblock = super.block(leavePage);

    // Mask
    enterPage.parentElement.insertBefore(this.backgroundMask, enterPage);

    // Decomposition
    this.target = {
      enter: util.findToolbarPage(enterPage) || enterPage,
      leave: util.findToolbarPage(leavePage) || leavePage,
    };
    this.decomp = {
      enter: this._decompose(this.target.enter),
      leave: this._decompose(this.target.leave)
    };

    // Animation values
    this.delta = this._calculateDelta(leavePage, this.decomp.leave);
    this.shouldAnimateToolbar = this._shouldAnimateToolbar(this.target.enter, this.target.leave);

    // Shadow && styles
    if (this.shouldAnimateToolbar) {
      this.swipeShadow.style.top = this.decomp.leave.toolbar.offsetHeight + 'px';
      this.target.leave.appendChild(this.swipeShadow);
      this._saveStyle(this.target.enter, this.target.leave);
    } else {
      leavePage.appendChild(this.swipeShadow);
      this._saveStyle(enterPage, leavePage);
    }
    leavePage.classList.add('overflow-visible');
    this.overflowElement = leavePage;
    this.decomp.leave.content.classList.add('content-swiping');

  }

  translate(distance, maxWidth, enterPage, leavePage) {
    this.isSwiping = true;

    if (enterPage.style.display === 'none') {
      enterPage.style.display = '';
    }

    if (this.isDragStart) {
      this.maxWidth = maxWidth;
      this._dragStartSetup(enterPage, leavePage);
    }

    const swipeRatio = (distance - maxWidth) / maxWidth;

    if (this.shouldAnimateToolbar) {

      animit.runAll(

        /* Enter page */

        animit([this.decomp.enter.content, this.decomp.enter.bottomToolbar, this.decomp.enter.background])
          .queue({
            transform: `translate3d(${swipeRatio * 25}%, 0, 0)`,
            opacity: 1 + swipeRatio * 10 / 100 // 0.9 -> 1
          }),

        animit(this.decomp.enter.toolbarCenter)
          .queue({
            transform: `translate3d(${this.delta.title * swipeRatio}px, 0, 0)`,
            opacity: 1 + swipeRatio // 0 -> 1
          }),

        animit(this.decomp.enter.backButtonLabel)
          .queue({
            opacity: 1 + swipeRatio * 10 / 100, // 0.9 -> 1
            transform: `translate3d(${this.delta.label * swipeRatio}px, 0, 0)`
          }),

        animit(this.decomp.enter.other)
          .queue({
            opacity: 1 + swipeRatio // 0 -> 1
          }),

        /* Leave page */

        animit([this.decomp.leave.content, this.decomp.leave.bottomToolbar, this.decomp.leave.background, this.swipeShadow])
          .queue({
            transform: `translate3d(${distance}px, 0, 0)`
          }),

        animit(this.decomp.leave.toolbar)
          .queue({
            opacity: -1 * swipeRatio // 1 -> 0
          }),

        animit(this.decomp.leave.toolbarCenter)
          .queue({
            transform: `translate3d(${(1 + swipeRatio) * 125}%, 0, 0)`
          }),

        animit(this.decomp.leave.backButtonLabel)
          .queue({
            opacity: -1 * swipeRatio, // 1 -> 0
            transform: `translate3d(${this.delta.title * (1 + swipeRatio)}px, 0, 0)`
          }),


        /* Other */

        animit(this.swipeShadow)
          .queue({
            opacity: -1 * swipeRatio // 1 -> 0
          })
      );


    } else {
      animit.runAll(
        animit(leavePage)
          .queue({
            transform: `translate3d(${distance}px, 0, 0)`
          }),

        animit(enterPage)
          .queue({
            transform: `translate3d(${swipeRatio * 25}%, 0, 0)`,
            opacity: 1 + swipeRatio * 10 / 100 // 0.9 -> 1
          }),

        animit(this.swipeShadow)
          .queue({
            opacity: -1 * swipeRatio // 1 -> 0
          })
      );
    }
  }

  restore(enterPage, leavePage, callback) {
    if (this.isDragStart) {
      return;
    }

    if (this.shouldAnimateToolbar) {

      animit.runAll(

        /* Enter page */

        animit([this.decomp.enter.content, this.decomp.enter.bottomToolbar, this.decomp.enter.background])
          .queue({
            transform: 'translate3d(-25%, 0, 0)',
            opacity: 0.9
          }, this.optRestore),

        animit(this.decomp.enter.toolbarCenter)
          .queue({
            transform: `translate3d(-${this.delta.title}px, 0, 0)`,
            transition: `opacity ${this.durationRestore}s linear, transform ${this.durationRestore}s ${this.timingSwipe}`,
            opacity: 0
          }),

        animit(this.decomp.enter.backButtonLabel)
          .queue({
            transform: `translate3d(-${this.delta.label}px, 0, 0)`
          }, this.optRestore),

        animit(this.decomp.enter.other)
          .queue({
            opacity: 0
          }, this.optRestore),

        /* Leave page */

        animit([this.decomp.leave.content, this.decomp.leave.bottomToolbar, this.decomp.leave.background, this.swipeShadow])
          .queue({
            transform: `translate3d(0, 0, 0)`
          }, this.optRestore),

        animit(this.decomp.leave.toolbar)
          .queue({
            opacity: 1
          }, this.optRestore),

        animit(this.decomp.leave.toolbarCenter)
          .queue({
            transform: `translate3d(0, 0, 0)`
          }, this.optRestore),

        animit(this.decomp.leave.backButtonLabel)
          .queue({
            opacity: 1,
            transform: `translate3d(0, 0, 0)`,
            transition: `opacity ${this.durationRestore}s linear, transform ${this.durationRestore}s ${this.timingSwipe}`
          }),


        /* Other */

        animit(this.swipeShadow)
          .queue({
            opacity: 0
          }, this.optRestore)
          .queue(done => {
            this._reset(this.target.enter, this.target.leave);
            enterPage.style.display = 'none';
            callback && callback();
            done();
          })
      );


    } else {
      animit.runAll(

        animit(enterPage)
        .queue({
          transform: 'translate3D(-25%, 0, 0)',
          opacity: 0.9
        }, this.optRestore),

        animit(leavePage)
        .queue({
          transform: 'translate3D(0, 0, 0)'
        }, this.optRestore)
        .queue(done => {
          this._reset(enterPage, leavePage);
          enterPage.style.display = 'none';
          callback && callback();
          done();
        })
      );
    }
  }

  popSwipe(enterPage, leavePage, callback) {
    if (this.isDragStart) {
      return;
    }

    if (this.shouldAnimateToolbar) {

      animit.runAll(

        /* Enter page */

        animit([this.decomp.enter.content, this.decomp.enter.bottomToolbar, this.decomp.enter.background])
          .queue({
            transform: 'translate3d(0, 0, 0)',
            opacity: 1
          }, this.optSwipe),

        animit(this.decomp.enter.toolbarCenter)
          .queue({
            transform: `translate3d(0, 0, 0)`,
            transition: `opacity ${this.durationSwipe}s linear, transform ${this.durationSwipe}s ${this.timingSwipe}`,
            opacity: 1
          }),

        animit(this.decomp.enter.backButtonLabel)
          .queue({
            transform: `translate3d(0, 0, 0)`
          }, this.optSwipe),

        animit(this.decomp.enter.other)
          .queue({
            opacity: 1
          }, this.optSwipe),

        /* Leave page */

        animit([this.decomp.leave.content, this.decomp.leave.bottomToolbar, this.decomp.leave.background])
          .queue({
            transform: `translate3d(100%, 0, 0)`
          }, this.optSwipe),

        animit(this.decomp.leave.toolbar)
          .queue({
            opacity: 0
          }, this.optSwipe),

        animit(this.decomp.leave.toolbarCenter)
          .queue({
            transform: `translate3d(125%, 0, 0)`
          }, this.optSwipe),

        animit(this.decomp.leave.backButtonLabel)
          .queue({
            opacity: 0,
            transform: `translate3d(${this.delta.title}px, 0, 0)`,
            transition: `opacity ${this.durationSwipe}s linear, transform ${this.durationSwipe}s ${this.timingSwipe}`
          }),


        /* Other */

        animit(this.swipeShadow)
          .queue({
            opacity: 0,
            transform: `translate3d(${this.maxWidth}px, 0, 0)`
          }, this.optSwipe)
          .queue(done => {
            this._reset(this.target.enter, this.target.leave);
            callback && callback();
            done();
          })
      );

    } else {
      animit.runAll(

        animit(enterPage)
        .queue({
          transform: 'translate3D(0, 0, 0)',
          opacity: 1.0
        }, this.optSwipe),

        animit(leavePage)
        .queue({
          transform: 'translate3D(100%, 0, 0)'
        }, this.optSwipe)
        .queue(done => {
          this._reset(enterPage, leavePage);
          callback && callback();
          done();
        })
      );
    }
  }

  _saveStyle(...args) {
    this._savedStyle = new WeakMap();
    const save = el => this._savedStyle.set(el, el.getAttribute('style'));
    args.forEach(save);

    Object.keys(this.decomp).forEach(p => {
      Object.keys(this.decomp[p]).forEach(k => {
        (this.decomp[p][k] instanceof Array ? this.decomp[p][k] : [this.decomp[p][k]]).forEach(save);
      });
    });
  }

  _restoreStyle(...args) {
    const restore = el => {
      this._savedStyle.get(el) === null ? el.removeAttribute('style') : el.setAttribute('style', this._savedStyle.get(el));
      this._savedStyle.delete(el);
    };
    args.forEach(restore);

    Object.keys(this.decomp).forEach(p => {
      Object.keys(this.decomp[p]).forEach(k => {
        (this.decomp[p][k] instanceof Array ? this.decomp[p][k] : [this.decomp[p][k]]).forEach(restore);
      });
    });
  }

  _reset(...args) {
    this.isSwiping = false;
    this._savedStyle && this._restoreStyle(...args);
    this.unblock && this.unblock();
    this.swipeShadow.remove();
    this.backgroundMask.remove();
    this.overflowElement.classList.remove('overflow-visible');
    this.decomp.leave.content.classList.remove('content-swiping');
    this.decomp = this.target = this.overflowElement = this._savedStyle = null;
    this.isDragStart = true;
  }
}
