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

import util from 'ons/util';
import NavigatorTransitionAnimator from './animator';
import {union, translate, acceleration, animate} from 'ons/animations';

/**
 * Slide animator for navigator transition.
 */
export default class MDSlideNavigatorTransitionAnimator extends NavigatorTransitionAnimator {

  constructor(options = {}) {
    super(util.extend({timing: 'cubic-bezier(.1, .7, .1, 1)', duration: 0.3}, options));

    this.backgroundMask = util.createElement(`
      <div style="position: absolute; width: 100%; height: 100%; z-index: 2;
        background-color: black; opacity: 0;"></div>
    `);
  }

  /**
   * @param {Object} enterPage
   * @param {Object} leavePage
   * @param {Function} callback
   */
  push({enterPage, leavePage, callback}) {
    leavePage.parentElement.insertBefore(this.backgroundMask, leavePage.nextSibling);

    this._animateAll({enterPage, leavePage, mask: this.backgroundMask}, {
      mask: {
        restore: true,
        animation: union(acceleration, animate({opacity: [0, 0.4]})),
        callback: () => this.backgroundMask.remove()
      },
      enterPage: {
        restore: true,
        animation: translate({from: '100%, 0'}),
        callback
      },
      leavePage: {
        restore: true,
        animation: translate({to: '-45%, 0'})
      }
    });
  }

  /**
   * @param {Object} enterPage
   * @param {Object} leavePage
   * @param {Function} callback
   */
  pop({enterPage, leavePage, callback}) {
    enterPage.parentNode.insertBefore(this.backgroundMask, enterPage.nextSibling);

    this._animateAll({enterPage, leavePage, mask: this.backgroundMask}, {
      mask: {
        restore: true,
        animation: union(acceleration, animate({opacity: [0.4, 0]})),
        callback: () => this.backgroundMask.remove()
      },
      enterPage: {
        restore: true,
        animation: union(translate({from: '-45%, 0'}), animate({opacity: [0.9, 1]})),
        callback
      },
      leavePage: {
        animation: translate({to: '100%, 0'})
      }
    });
  }
}
