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

((ons) => {
  'use strict';

  class ModalAnimator {

    /**
     * @param {Object} options
     * @param {String} options.timing
     * @param {Number} options.duration
     * @param {Number} options.delay
     */
    constructor(options) {
      this.delay = 0;
      this.duration = 0.2;
      options = options || {};

      this.timing = options.timing || this.timing;
      this.duration = options.duration !== undefined ? options.duration : this.duration;
      this.delay = options.delay !== undefined ? options.delay : this.delay;
    }

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
  ons._internal = ons._internal || {};
  ons._internal.ModalAnimator = ModalAnimator;

})(window.ons = window.ons || {});
