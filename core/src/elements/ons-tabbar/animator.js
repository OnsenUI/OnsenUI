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
import BaseAnimator from 'ons/base-animator';
import {union, fade, acceleration, translate} from 'ons/animations';

export class TabbarAnimator extends BaseAnimator {

  constructor(options = {}) {
    super(util.extend({duration: 0.4}, options));
  }

  /**
   * @param {Element} enterPage ons-page element
   * @param {Element} leavePage ons-page element
   * @param {Number} enterPageIndex
   * @param {Number} leavePageIndex
   * @param {Function} done
   */
  apply(enterPage, leavePage, enterPageIndex, leavePageIndex, done) {
    done && done();
  }
}


export class TabbarFadeAnimator extends TabbarAnimator {

  apply(enterPage, leavePage, enterPageIndex, leavePageIndex, done) {
    const pages = {enter: enterPage, leave: leavePage};
    this._animateAll(pages, {
      leave: {animation: union(fade.out, acceleration)},
      enter: {animation: union(fade.in, acceleration), restore: true, callback: done}
    });
  }
}

export class TabbarSlideAnimator extends TabbarAnimator {

  constructor(options = {}) {
    super(util.extend({timing: 'ease-in', duration: 0.15}, options));
  }

  apply(enterPage, leavePage, enterIndex, leaveIndex, done) {
    const signs = enterIndex > leaveIndex ? '- ' : ' -';
    const pages = {enter: enterPage, leave: leavePage};

    this._animateAll(pages, {
      leave: {animation: translate({to: signs[0] + '100%, 0'})},
      enter: {animation: translate({from: signs[1] + '100%, 0'}), restore: true, callback: done}
    });
  }
}
