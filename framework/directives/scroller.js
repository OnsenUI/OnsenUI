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

/**
 * @ngdoc directive
 * @id scroller
 * @name ons-scroller
 * @description
 * Makes the content inside this tag scrollable.
 */
(function() {
  'use strict';
  var module = angular.module('onsen');

  module.directive('onsScroller', function($onsen, $timeout) {
    return {
      restrict: 'E',
      replace: false,
      transclude: true,

      scope: {
        onScrolled: '&',
        infinitScrollEnable: '='
      },

      templateUrl: $onsen.DIRECTIVE_TEMPLATE_URL + '/scroller.tpl',

      compile: function(element, attrs) {
        element.addClass('ons-scroller');

        return function(scope, element, attrs) {
          if (attrs.ngController) {
            throw new Error('"ons-scroller" can\'t accept "ng-controller" directive.');
          }

          // inifinte scroll
          var scrollWrapper;

          scrollWrapper = element[0];
          var offset = parseInt(attrs.threshold) || 10;

          if (scope.onScrolled) {
            scrollWrapper.addEventListener('scroll', function() {
              if (scope.infinitScrollEnable) {
                var scrollTopAndOffsetHeight = scrollWrapper.scrollTop + scrollWrapper.offsetHeight;
                var scrollHeightMinusOffset = scrollWrapper.scrollHeight - offset;

                if (scrollTopAndOffsetHeight >= scrollHeightMinusOffset) {
                  scope.onScrolled();
                }
              }
            });
          }

          // IScroll for Android
          if (!Modernizr.csstransforms3d) {
            $timeout(function() {
              var iScroll = new IScroll(scrollWrapper, {
                momentum: true,
                bounce: true,
                hScrollbar: false,
                vScrollbar: false,
                preventDefault: false
              });

              iScroll.on('scrollStart', function(e) {
                var scrolled = iScroll.y - offset;
                if (scrolled < (iScroll.maxScrollY + 40)) {
                  // TODO: find a better way to know when content is upated so we can refresh
                  iScroll.refresh();
                }
              });

              if (scope.onScrolled) {
                iScroll.on('scrollEnd', function(e) {
                  var scrolled = iScroll.y - offset;
                  if (scrolled < iScroll.maxScrollY) {
                    // console.log('we are there!');
                    scope.onScrolled();
                  }
                });
              }

            }, 500);
          }
        };
      }
    };
  });
})();
