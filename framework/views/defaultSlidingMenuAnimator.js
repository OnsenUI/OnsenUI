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

    var DefaultSlidingMenuAnimator = Class.extend({

      _blackMask: undefined,

      _isRight: false,

      /**
       * @param {jqLite} element "ons-sliding-menu" or "ons-split-view" element
       * @param {jqLite} mainPage
       * @param {jqLite} menuPage
       * @param {Object} options
       * @param {String} options.width "width" style value
       * @param {Boolean} options.isRight
       */
      onAttached: function(element, mainPage, menuPage, options) {
        options = options || {};
        options.width = options.width || '90%';

        this._isRight = !!options.isRight;

        mainPage.css('box-shadow', '0px 0 10px 0px rgba(0, 0, 0, 0.2)');
        menuPage.css('width', options.width);

        if (this._isRight) {
          menuPage.css({
            right: '0px',
            left: 'auto'
          });
        } else {
          menuPage.css({
            right: 'auto',
            left: '0px'
          });
        }

        this._blackMask = angular.element('<div></div>').css({
          backgroundColor: 'black',
          top: '0px',
          left: '0px',
          right: '0px',
          bottom: '0px',
          position: 'absolute',
          opacity: 0
        });

        element.prepend(this._blackMask);

        // Dirty fix for broken rendering bug on android 4.x.
        animit(mainPage[0]).queue({transform: 'translate3d(0, 0, 0)'}).play();
      },

      /**
       * @param {jqLite} element "ons-sliding-menu" or "ons-split-view" element
       * @param {jqLite} mainPage
       * @param {jqLite} menuPage
       */
      onDetached: function(element, mainPage, menuPage) {
        if (this._blackMask) {
          this._blackMask.remove();
        }

        mainPage.removeAttr('style');
        menuPage.removeAttr('style');
      },

      /**
       * @param {jqLite} mainPage
       * @param {jqLite} menuPage
       * @param {Function} callback
       */
      open: function(mainPage, menuPage, callback) {

        menuPage.css('display', 'block');
        this._blackMask.css('opacity', 1);

        var max = menuPage[0].clientWidth;

        var aboveTransform = this._generateAbovePageTransform(max);
        var behindStyle = this._generateBehindPageStyle(mainPage, menuPage, max);

        setTimeout(function() {

          animit(mainPage[0])
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

          animit(menuPage[0])
            .queue(behindStyle, {
              duration: 0.4,
              timing: 'cubic-bezier(.1, .7, .1, 1)'
            })
            .play();

        }, 1000 / 60);
      },

      /**
       * @param {jqLite} mainPage
       * @param {jqLite} menuPage
       * @param {Function} callback
       */
      close: function(mainPage, menuPage, callback) {
        this._blackMask.css({opacity: 1});

        var aboveTransform = this._generateAbovePageTransform(0);
        var behindStyle = this._generateBehindPageStyle(mainPage, menuPage, 0);

        setTimeout(function() {

          animit(mainPage[0])
            .queue({
              transform: aboveTransform
            }, {
              duration: 0.4,
              timing: 'cubic-bezier(.1, .7, .1, 1)'
            })
            .queue({
              transform: 'translate3d(0, 0, 0)'
            })
            .queue(function(done) {
              menuPage.css('display', 'none');
              callback();
              done();
            })
            .play();

          animit(menuPage[0])
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
       * @param {jqLite} mainPage
       * @param {jqLite} menuPage
       * @param {Object} options
       * @param {Number} options.distance
       * @param {Number} options.maxDistance
       */
      translate: function(mainPage, menuPage, options) {

        menuPage.css('display', 'block');
        this._blackMask.css({opacity: 1});

        var aboveTransform = this._generateAbovePageTransform(Math.min(options.maxDistance, options.distance));
        var behindStyle = this._generateBehindPageStyle(mainPage, menuPage, Math.min(options.maxDistance, options.distance));

        animit(mainPage[0])
          .queue({transform: aboveTransform})
          .play();

        animit(menuPage[0])
          .queue(behindStyle)
          .play();
      },

      _generateAbovePageTransform: function(distance) {
        var x = this._isRight ? -distance : distance;
        var aboveTransform = 'translate3d(' + x + 'px, 0, 0)';

        return aboveTransform;
      },

      _generateBehindPageStyle: function(mainPage, behindPage, distance) {
        var max = behindPage[0].clientWidth;

        var behindDistance = Math.min((distance - max) / max * 10, 0);
        var behindX = this._isRight ? -behindDistance : behindDistance;
        var behindTransform = 'translate3d(' + behindX + '%, 0, 0)';
        var opacity = 1 + behindDistance / 100;

        return {
          transform: behindTransform,
          opacity: opacity
        };
      }
    });

    return DefaultSlidingMenuAnimator;
  });

})();
