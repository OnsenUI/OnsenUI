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
  'use strict';
  var module = angular.module('onsen');


  module.factory('DefaultSlidingMenuAnimator', function() {

    var MAIN_PAGE_RATIO = 0.9;

    var DefaultSlidingMenuAnimator = Class.extend({

      _blackMask: undefined,

      /**
       * @param {jqLite} element "ons-sliding-menu" or "ons-split-view" element
       */
      activate: function(element) {
        this._blackMask = angular.element('<div></div>');
        this._blackMask.css({
          backgroundColor: 'black',
          top: '0px',
          left: '0px',
          right: '0px',
          bottom: '0px',
          position: 'absolute'
        });

        element.prepend(this._blackMask);
      },

      /**
       * @param {jqLite} element "ons-sliding-menu" or "ons-split-view" element
       */
      deactivate: function(element) {
        if (this._blackMask) {
          this._blackMask.remove();
        }
      },

      /**
       * @param {jqLite} abovePage
       * @param {jqLite} behindPage
       * @param {Object} options
       * @param {Number} options.x
       * @param {Function} callback
       */
      open: function(abovePage, behindPage, options, callback) {
        behindPage.css('display', 'block');

        var max = abovePage[0].clientWidth * MAIN_PAGE_RATIO;

        var aboveTransform = this._generateAbovePageTransform(max);
        var behindStyle = this._generateBehindPageStyle(abovePage, max);

        setTimeout(function() {

          animit(abovePage[0])
            .queue({
              transform: aboveTransform
            }, {
              duration: 0.4,
              timing: 'cubic-bezier(.1, .7, .1, 1)'
            })
            .queue(function(done) {
              callback();
              done();
            })
            .play();

          animit(behindPage[0])
            .queue(behindStyle, {
              duration: 0.4,
              timing: 'cubic-bezier(.1, .7, .1, 1)'
            })
            .play();

        }, 1000 / 60);
      },

      /**
       * @param {jqLite} abovePage
       * @param {jqLite} behindPage
       * @param {Object} options
       * @param {Number} options.x
       * @param {Function} callback
       */
      close: function(abovePage, behindPage, options, callback) {

        var aboveTransform = this._generateAbovePageTransform(0);
        var behindStyle = this._generateBehindPageStyle(abovePage, 0);

        setTimeout(function() {

          animit(abovePage[0])
            .queue({
              transform: aboveTransform
            }, {
              duration: 0.4,
              timing: 'cubic-bezier(.1, .7, .1, 1)'
            })
            .queue({
              transform: 'translate2d(0, 0)'
            })
            .queue(function(done) {
              behindPage.css('display', 'none');
              callback();
              done();
            })
            .play();

          animit(behindPage[0])
            .queue(behindStyle, {
              duration: 0.4,
              timing: 'cubic-bezier(.1, .7, .1, 1)'
            })
            .queue(function(done) {
              done();
            })
            .play();
        }, 1000 / 60);
      },

      /**
       * @param {jqLite} abovePage
       * @param {jqLite} behindPage
       * @param {Object} options
       * @param {Number} options.x
       */
      translate: function(abovePage, behindPage, options) {
        behindPage.css('display', 'block');

        var aboveTransform = this._generateAbovePageTransform(options.x);
        var behindStyle = this._generateBehindPageStyle(abovePage, options.x);

        setTimeout(function() {

          animit(abovePage[0])
            .queue({transform: aboveTransform})
            .play();

          animit(behindPage[0])
            .queue(behindStyle)
            .play();

        }, 1000 / 60);
      },

      _generateAbovePageTransform: function(x) {
        var aboveTransform = 'translate3d(' + x + 'px, 0, 0)';

        return aboveTransform;
      },

      _generateBehindPageStyle: function(abovePage, x) {
        var max = abovePage[0].clientWidth * MAIN_PAGE_RATIO;
        var behindX = Math.min((x - max) / max * 10, 0);
        var behindTransform = 'translate3d(' + behindX + '%, 0, 0)';
        var opacity = 1 + behindX / 100;

        return {
          transform: behindTransform,
          opacity: opacity
        };
      }
    });

    return DefaultSlidingMenuAnimator;
  });

})();
