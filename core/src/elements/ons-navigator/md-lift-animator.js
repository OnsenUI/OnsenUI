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

import {union, translate, partialFade, acceleration} from 'ons/animations';

const fade = partialFade(0.4);

/**
 * Lift screen transition.
 */
export default class MDLiftNavigatorTransitionAnimator extends NavigatorTransitionAnimator {

  constructor(options = {}) {
    super(util.extend({timing: 'cubic-bezier(.1, .7, .1, 1)', delay: 0.05}, options));

    this.backgroundMask = util.createElement(`
      <div style="position: absolute; width: 100%; height: 100%;
        background-color: black;"></div>
    `);
  }

  /**
   * @param {Object} enterPage
   * @param {Object} leavePage
   * @param {Function} callback
   */
  push({enterPage, leavePage, callback}) {
    leavePage.parentNode.insertBefore(this.backgroundMask, leavePage);

    this._animateAll({enterPage, leavePage}, {
      enterPage: {
        animation: translate({from: '0, 100%'}),
        restore: true,
        callback: () => {this.backgroundMask.remove(); callback && callback();}
      },
      leavePage: {animation: fade.out, delay: 0}
    });
  }

  /**
   * @param {Object} enterPage
   * @param {Object} leavePage
   * @param {Function} callback
   */
  pop({enterPage, leavePage, callback}) {
    enterPage.parentNode.insertBefore(this.backgroundMask, enterPage);

    this._animateAll({enterPage, leavePage}, {
      enterPage: {
        animation: union(fade.in, acceleration),
        callback: () => {this.backgroundMask.remove(); callback && callback();}
      },
      leavePage: translate({to: '0, 100%'})
    });
  }
}
