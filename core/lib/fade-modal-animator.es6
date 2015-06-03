
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

  var ModalAnimator = ons._internal.ModalAnimator;

  /**
   * iOS style animator for dialog.
   */
  class FadeModalAnimator extends ModalAnimator {

    constructor(options) {
      options.timing = options.timing || 'linear';
      options.duration = options.duration || '0.3';
      options.delay = options.delay || 0;

      super(options);
    }

    /**
     * @param {HTMLElement} modal
     * @param {Function} callback
     */
    show(modal, callback) {
      callback = callback ? callback : function() {};

      animit(modal)
        .queue({
          opacity: 0
        })
        .wait(this.delay)
        .queue({
          opacity: 1.0
        }, {
          duration: this.duration,
          timing: this.timing
        })
        .queue(function(done) {
          callback();
          done();
        })
        .play();
    }

    /**
     * @param {HTMLElement} modal
     * @param {Function} callback
     */
    hide(modal, callback) {
      callback = callback ? callback : function() {};

      animit(modal)
        .queue({
          opacity: 1
        })
        .wait(this.delay)
        .queue({
          opacity: 0
        }, {
          duration: this.duration,
          timing: this.timing
        })
        .queue(function(done) {
          callback();
          done();
        })
        .play();
    }
  }

  ons._internal = ons._internal || {};
  ons._internal.FadeModalAnimator = FadeModalAnimator;

})(window.ons = window.ons || {});
