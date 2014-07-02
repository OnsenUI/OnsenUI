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
