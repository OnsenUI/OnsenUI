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

import IOSSlideNavigatorTransitionAnimator from './ios-slide-animator';
import util from '../../ons/util';
import animit from '../../ons/animit';
import contentReady from '../../ons/content-ready';

/**
 * Swipe animator for iOS navigator transition.
 */
export default class IOSSwipeNavigatorTransitionAnimator extends IOSSlideNavigatorTransitionAnimator {

  constructor({ duration = 0.1, timing = 'linear', delay = 0 } = {}) {
    super({duration, timing, delay});
    this.durationRestore = 0.1;
    this.durationPop = 0.15;

    this.swipeShadow = util.createElement(`
      <div style="position: absolute; height: 100%; width: 12px; right: 100%; top: 0; bottom: 0; z-index: -1;
        background: linear-gradient(to right, transparent 0, rgba(0,0,0,.04) 40%, rgba(0,0,0,.12) 80%, rgba(0,0,0,.16) 100%);"></div>
    `);
  }

  translate(distance, maxWidth, enterPage, leavePage) {
    if (!this.backgroundMask.parentElement) {
      enterPage.parentElement.insertBefore(this.backgroundMask, enterPage);
    }

    leavePage._contentElement.appendChild(this.swipeShadow);
    leavePage._contentElement.style.overflow = leavePage.style.overflow = 'visible';

    const behindOffset = (distance - maxWidth) / maxWidth;

    animit.runAll(
      animit(leavePage)
        .queue({
          transform: `translate3d(${distance}px, 0px, 0px)`
        }),

      animit(enterPage)
        .queue({
          transform: `translate3d(${behindOffset * 25}%, 0, 0)`
        }),
      animit([enterPage._contentElement, enterPage._getBackgroundElement()])
        .queue({
          opacity: 1 + behindOffset * 10 / 100
        }),
      animit(this.swipeShadow)
        .queue({
          opacity: -1 * behindOffset
        })
    )
  }

  restore(enterPage, leavePage, callback) {

    animit.runAll(

      animit(enterPage)
      .queue({
        css: {
          transform: 'translate3D(-25%, 0px, 0px)',
          opacity: 0.9
        },
        timing: this.timing,
        duration: this.durationRestore
      }),

      animit([enterPage._contentElement, enterPage._getBackgroundElement()])
        .queue({
          opacity: 0.9
        }, {
          timing: this.timing,
          duration: this.durationRestore
        }
      ),

      animit(leavePage)
      .queue({
        css: {
          transform: 'translate3D(0px, 0px, 0px)'
        },
        timing: this.timing,
        duration: this.durationRestore
      })
      .queue(done => {
        this._reset(enterPage, leavePage);
        callback && callback();
        done();
      })
    );
  }

  pop(enterPage, leavePage, callback) {

    animit.runAll(

      animit(enterPage)
      .queue({
        css: {
          transform: 'translate3D(0px, 0px, 0px)',
          opacity: 1.0
        },
        duration: this.durationPop,
        timing: this.timing
      }),

      animit([enterPage._contentElement, enterPage._getBackgroundElement()])
        .queue({
          opacity: 1
        }, {
          duration: this.durationPop,
          timing: this.timing
        }
      ),

      animit(leavePage)
      .queue({
        css: {
          transform: 'translate3D(100%, 0px, 0px)'
        },
        duration: this.durationPop,
        timing: this.timing
      })
      .queue(done => {
        this._reset(enterPage, leavePage);
        callback && callback();
        done();
      })
    );
  }

  _reset(...elements) {
    this.swipeShadow.remove();
    this.backgroundMask.remove();

    elements
      .reduce((result, el) => result.concat([el, el._contentElement, el._getBackgroundElement()]), [])
      .forEach(el => el.style.transform = el.style.opacity = el.style.transition = el.style.overflow = null);
  }
}
