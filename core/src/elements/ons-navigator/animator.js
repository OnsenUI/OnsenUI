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

import util from '../../ons/util.js';
import BaseAnimator from '../../ons/base-animator.js';

export default class NavigatorAnimator extends BaseAnimator {

  /**
   * @param {Object} options
   * @param {String} options.timing
   * @param {Number} options.duration
   * @param {Number} options.delay
   */
  constructor(options) {
    options = util.extend({
      timing: 'linear',
      duration: '0.4',
      delay: '0'
    }, options || {});

    super(options);
  }

  push(enterPage, leavePage, callback) {
    callback();
  }

  pop(enterPage, leavePage, callback) {
    callback();
  }

  block(page) {
    const blocker = util.createElement(`
      <div style="position: absolute; background-color: transparent; width: 100%; height: 100%; z-index: 100000"></div>
    `);
    page.parentNode.appendChild(blocker);
    return () => blocker.remove();
  }
}

