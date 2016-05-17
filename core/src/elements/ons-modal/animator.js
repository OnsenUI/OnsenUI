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
import {fade} from 'ons/animations';

export class ModalAnimator extends BaseAnimator {

  /**
   * @param {HTMLElement} modal
   * @param {Function} callback
   */
  show(modal, callback) {
    callback();
  }

  /**
   * @param {HTMLElement} modal
   * @param {Function} callback
   */
  hide(modal, callback) {
    callback();
  }
}

/**
 * iOS style animator for dialog.
 */
export class FadeModalAnimator extends ModalAnimator {

  constructor(options) {
    super(util.extend({duration: 0.3}, options));
  }

  /**
   * @param {HTMLElement} modal
   * @param {Function} callback
   */
  show(modal, callback) {
    this._animate(modal, {animation: fade.in, callback}).play();
  }

  /**
   * @param {HTMLElement} modal
   * @param {Function} callback
   */
  hide(modal, callback) {
    this._animate(modal, {animation: fade.out, callback}).play();
  }
}
