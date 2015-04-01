
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

(function() {
  'use strict';

  var module = angular.module('onsen');

  module.factory('FadePopoverAnimator', function(PopoverAnimator) {

    /**
    * Fade animator for popover.
    */
    var FadePopoverAnimator = PopoverAnimator.extend({

      /**
      * @param {Object} popover
      * @param {Function} callback
      */
      show: function(popover, callback) {
        var pop = popover._element[0].querySelector('.popover'),
        mask = popover._element[0].querySelector('.popover-mask');

        animit.runAll(
          animit(mask)
          .queue({
            opacity: 0
          })
          .wait(this.delay)
          .queue({
            opacity: 1.0
          }, {
            duration: this.duration,
            timing: this.timing
          }),

          animit(pop)
          .queue({
            transform: 'scale3d(1.3, 1.3, 1.0)',
            opacity: 0
          })
          .wait(this.delay)
          .queue({
            transform: 'scale3d(1.0, 1.0,  1.0)',
            opacity: 1.0
          }, {
            duration: this.duration,
            timing: this.timing
          })
          .resetStyle()
          .queue(function(done) {
            callback();
            done();
          })
        );
      },

      /**
      * @param {Object} popover
      * @param {Function} callback
      */
      hide: function(popover, callback) {
        var pop = popover._element[0].querySelector('.popover'),
          mask = popover._element[0].querySelector('.popover-mask');

        animit.runAll(
          animit(mask)
          .queue({
            opacity: 1.0
          })
          .wait(this.delay)
          .queue({
            opacity: 0
          }, {
            duration: this.duration,
            timing: this.timing
          }),

          animit(pop)
          .queue({
            opacity: 1.0
          })
          .wait(this.delay)
          .queue({
            opacity: 0
          }, {
            duration: this.duration,
            timing: this.timing
          })
          .resetStyle()
          .queue(function(done) {
            callback();
            done();
          })
        );
      }
    });

    return FadePopoverAnimator;
  });

})();
