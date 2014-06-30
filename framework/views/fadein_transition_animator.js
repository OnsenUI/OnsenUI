/*
Copyright 2013-2014 ASIAL CORPORATION

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
  'use strict;';

  var module = angular.module('onsen');

  module.factory('FadeInTransitionAnimator', function(NavigatorTransitionAnimator) {

    /**
     * Fade-in screen transition.
     */
    var FadeInTransitionAnimator = NavigatorTransitionAnimator.extend({

      /**
       * @param {Object} enterPage
       * @param {Object} leavePage
       * @param {Function} callback
       */
      push: function(enterPage, leavePage, callback) {

        animit.runAll(

          animit(enterPage.controller.getContentElement())
            .queue({
              css: {
                transform: 'translate3D(0, 0, 0)',
                opacity: 0
              },
              duration: 0
            })
            .queue({
              css: {
                transform: 'translate3D(0, 0, 0)',
                opacity: 1
              },
              duration: 0.4,
              timing: 'linear'
            })
            .resetStyle()
            .queue(function(done) {
              callback();
              done();
            }),

          animit(enterPage.controller.getToolbarElement())
            .queue({
              css: {
                transform: 'translate3D(0, 0, 0)',
                opacity: 0
              },
              duration: 0
            })
            .queue({
              css: {
                transform: 'translate3D(0, 0, 0)',
                opacity: 1
              },
              duration: 0.4,
              timing: 'linear'
            })
            .resetStyle()
        );

      },

      /**
       * @param {Object} enterPage
       * @param {Object} leavePage
       * @param {Function} done
       */
      pop: function(enterPage, leavePage, callback) {
        animit.runAll(

          animit(leavePage.controller.getContentElement())
            .queue({
              css: {
                transform: 'translate3D(0, 0, 0)',
                opacity: 1
              },
              duration: 0
            })
            .queue({
              css: {
                transform: 'translate3D(0, 0, 0)',
                opacity: 0
              },
              duration: 0.4,
              timing: 'linear'
            })
            .queue(function(done) {
              callback();
              done();
            }),

          animit(leavePage.controller.getToolbarElement())
            .queue({
              css: {
                transform: 'translate3D(0, 0, 0)',
                opacity: 1
              },
              duration: 0
            })
            .queue({
              css: {
                transform: 'translate3D(0, 0, 0)',
                opacity: 0
              },
              duration: 0.4,
              timing: 'linear'
            })

        );
      }
    });

    return FadeInTransitionAnimator;
  });

})();
