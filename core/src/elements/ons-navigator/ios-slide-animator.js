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
import {union, fade, translate, animate, acceleration} from 'ons/animations';

// const find = (el, selectors) => {
//   if (Array.isArray(selectors)) {
//     return selectors.map(e => find(el, e)).filter(e => e);
//   }
//   return el.querySelector(selectors);
// };

/**
 * Slide animator for navigator transition like iOS's screen slide transition.
 */
export default class IOSSlideNavigatorTransitionAnimator extends NavigatorTransitionAnimator {

  constructor(options = {}) {
    super(util.extend({timing: 'cubic-bezier(.1, .7, .1, 1)'}, options));

    this.backgroundMask = util.createElement(`
      <div style="position: absolute; width: 100%; height: 100%;
        background-color: black; opacity: 0; z-index: 2"></div>
    `);
  }

  _decompose(page) {
    CustomElements.upgrade(page);
    const toolbar = page._toolbar;
    // const sides = find(toolbar, ['.left', '.right']).map(e => e.children.length ? [].slice.call(e.children) : [e]);
    // const other = [].concat.apply([], sides).map(e =>
    //   util.match(e, 'ons-back-button') ? find(e, '.back-button__icon') : e
    // );
    return {
      main: [page._content, page._background, page._bottomToolbar],
      toolbar: toolbar,
      labels: util.arrayFrom(toolbar.querySelectorAll('.center, .back-button__label')),
      // other: other
    };
  }

  _elements(enterPage, leavePage) {
    const elements = {enter: this._decompose(enterPage), leave: this._decompose(leavePage)};

    util.each(elements, (name, page) => {
      util.each(page, (key, value) => elements[name + '.' + key] = value);
    });

    return util.extend(elements, {mask: this.backgroundMask});
  }

  /**
   * @param {Object} enterPage
   * @param {Object} leavePage
   * @param {Function} callback
   */
  push(enterPage, leavePage, callback) {
    enterPage.parentNode.insertBefore(this.backgroundMask, enterPage);
    // const callback = () => { this.backgroundMask.remove(); cb && cb(); };

    const mask = {
      restore: true,
      animation: union(acceleration, animate({opacity: [0, 0.1]})),
      callback: () => {
        this.backgroundMask.remove();
        callback && callback();
      }
    };

    if ([enterPage, leavePage].every(page => page && page._canAnimateToolbar())) {
      const delta = Math.round(leavePage.getBoundingClientRect().width * 0.3);

      this._animateAll(this._elements(enterPage, leavePage), {
        mask: mask,
        'enter.main': {
          restore: 1, animation: translate({from: '100%, 0'})
        },
        'enter.labels': {
          restore: 1, animation: translate({from: delta + 'px, 0'})
        },
        'enter.toolbar': {
          restore: 1, animation: fade.in
        },
        // 'enter.labels': {
        //   restore: 1, animation: union(fade.in, translate({from: delta + 'px, 0'}))
        // },
        // 'enter.other': {
        //   restore: 1, animation: fade.in
        // },
        'leave.main': {
          restore: 1, animation: translate({to: '-25%, 0'})
        },
        // 'leave.labels': {
        //   restore: 1, animation: union(fade.out, translate({to: (-delta) + 'px, 0'}))
        // },
        // 'leave.other': {
        //   restore: 1, animation: fade.out
        // }
        'leave.labels': {
          restore: 1, animation: translate({to: (-delta) + 'px, 0'})
        },
        'leave.toolbar': {
          restore: 1, animation: fade.out
        }
      });

    } else {
      this._animateAll({mask, enterPage, leavePage}, {
        mask: mask,
        enterPage: {restore: 1, animation: translate({from: '100%, 0'})},
        leavePage: {restore: 1, animation: translate({to: '-25%, 0'})}
      });
    }
  }

  /**
   * @param {Object} enterPage
   * @param {Object} leavePage
   * @param {Function} done
   */
  pop(enterPage, leavePage, done) {
    leavePage.parentNode.insertBefore(this.backgroundMask, leavePage);
    // const done = () => { this.backgroundMask.remove(); cb && cb(); };

    const mask = {
      restore: true,
      animation: union(acceleration, animate({opacity: [0.1, 0]})),
      callback: () => {
        this.backgroundMask.remove();
        done && done();
      }
    };

    if ([enterPage, leavePage].every(page => page._canAnimateToolbar())) {
      const delta = Math.round(leavePage.getBoundingClientRect().width * 0.3);

      this._animateAll(this._elements(enterPage, leavePage), {
        mask: mask,
        'enter.main': {
          restore: 1, animation: union(translate({from: '-25%, 0'}), animate({opacity: [0.5, 1]}))
        },
        'enter.labels': {
          restore: 1, animation: translate({from: (-delta) + 'px, 0'})
        },
        // 'enter.toolbar': fade.in,
        // 'enter.labels': {
        //   restore: 1, animation: union(fade.in, translate({from: (-delta) + 'px, 0'}))
        // },
        // 'enter.other': {
        //   restore: 1, animation: fade.in
        // },
        // 'enter.toolbar': {
        //   restore: 1, animation: union(acceleration, animate({opacity: [1, 1]}))
        // },
        'leave.main': {
          animation: translate({to: '100%, 0'})
        },
        'leave.labels': {
          animation: translate({to: delta + 'px, 0'})
        },
        'leave.toolbar': fade.out
        // 'leave.labels': {
        //   animation: union(fade.out, translate({to: delta + 'px, 0'}))
        // },
        // 'leave.other': {
        //   animation: union(acceleration, fade.out)
        // },
        // 'leave.toolbar': {
        //   from: {
        //     background: 'none',
        //     backgroundColor: 'rgba(0, 0, 0, 0)',
        //     borderColor: 'rgba(0, 0, 0, 0)'
        //   }
        // }
      });
    } else {
      this._animateAll({mask, enterPage, leavePage}, {
        mask: mask,
        enterPage: {restore: 1, animation: union(translate({from: '-25%, 0'}),  animate({opacity: [0.9, 1]}))},
        leavePage: {animation: translate({to: '100%, 0'})}
      });
    }
  }
}
