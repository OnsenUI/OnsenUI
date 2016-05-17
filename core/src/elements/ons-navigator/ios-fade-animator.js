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
import {union, fade, acceleration} from 'ons/animations';

const elements = page => [page._content, page._background, page._toolbar];

/**
 * Fade-in screen transition.
 */
export default class IOSFadeNavigatorTransitionAnimator extends NavigatorTransitionAnimator {

  /**
   * @param {Object} enterPage
   * @param {Object} leavePage
   * @param {Function} callback
   */
  push(enterPage, leavePage, callback) {
    this._animate(elements(enterPage), {animation: union(fade.in, acceleration), restore: true, callback}).play();
  }

  /**
   * @param {Object} enterPage
   * @param {Object} leavePage
   * @param {Function} done
   */
  pop(enterPage, leavePage, callback) {
    this._animate(elements(leavePage), {animation: union(fade.out, acceleration), callback}).play();
  }
}
