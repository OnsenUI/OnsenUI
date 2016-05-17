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
import {union, fade, translate} from 'ons/animations';


/**
 * Fade-in + Lift screen transition.
 */
export default class MDFadeNavigatorTransitionAnimator extends NavigatorTransitionAnimator {

  constructor(options = {}) {
    super(util.extend({timing: 'ease-out', duration: 0.25, delay: 0.2}, options));
  }

  /**
   * @param {Object} enterPage
   * @param {Object} leavePage
   * @param {Function} callback
   */
  push(enterPage, leavePage, callback) {
    this._animateAll({enterPage}, {
      enterPage: {
        animation: union(translate({from: '0, 42px'}), fade.in),
        restore: true,
        callback
      }
    });
  }

  /**
   * @param {Object} enterPage
   * @param {Object} leavePage
   * @param {Function} done
   */
  pop(enterPage, leavePage, callback) {
    this._animateAll({move: leavePage, fade: leavePage}, {
      move: {delay: 0.15, animation: translate({to: '0, 38px'}), callback},
      fade: {delay: 0.04, animation: fade.out}
    });
  }
}
