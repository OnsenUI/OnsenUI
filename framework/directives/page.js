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
 * @id page
 * @name ons-page
 * @description
 * Should be used as root component of each page. The content inside page component is not scrollable. If you need scroll behavior, you can put inside this component.
 * @demoURL
 * OnsenUI/demo/page/
 */
(function() {
  'use strict';

  var module = angular.module('onsen');

  module.directive('onsPage', function($onsen, $timeout, PageView) {

    function firePageInitEvent(pageContainer) {
      function findPageDOM() {
        if (angular.element(pageContainer).hasClass('page')) {
          return pageContainer;
        }

        var result = pageContainer.querySelector('.page');

        if (!result) {
          throw new Error('An element of "page" class is not found.');
        }

        return result;
      }
      
      var event = document.createEvent('HTMLEvents');    
      event.initEvent('pageinit', true, true);
      findPageDOM().dispatchEvent(event);    
    }

    return {
      restrict: 'E',

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclde.
      transclude: true,
      scope: true,

      compile: function(element) {
        if ($onsen.isWebView() && $onsen.isIOS7Above()) {
          // Adjustments for IOS7
          var fill = angular.element(document.createElement('div'));
          fill.addClass('page__status-bar-fill');
          fill.css({width: '0px', height: '0px'});
          element.prepend(fill);
        }

        return {
          pre: function(scope, element, attrs, controller, transclude) {
            var page = new PageView(scope, element);

            $onsen.declareVarAttribute(attrs, page);

            $onsen.aliasStack.register('ons.page', page);
            element.data('ons-page', page);

            scope.$on('$destroy', function() {
              element.data('ons-page', undefined);
              $onsen.aliasStack.unregister('ons.page', page);
            });

            var modifierTemplater = $onsen.generateModifierTemplater(attrs);
            element.addClass('page ' + modifierTemplater('page--*'));

            transclude(scope, function(clonedElement) {
              var content = angular.element('<div class="page__content ons-page-inner"></div>');
              content.addClass(modifierTemplater('page--*__content'));
              if (element.attr('style')) {
                content.attr('style', element.attr('style'));
              }
              element.append(content);

              if (Modernizr.csstransforms3d) {
                content.append(clonedElement);
              }  else {
                content.css('overflow', 'visible');

                var wrapper = angular.element('<div></div>');
                content.append(wrapper);
                wrapper.append(clonedElement);

                // IScroll for Android2
                var scroller = new IScroll(content[0], {
                  momentum: true,
                  bounce: true,
                  hScrollbar: false,
                  vScrollbar: false,
                  preventDefault: false
                });

                var offset = 10;
                scroller.on('scrollStart', function(e) {
                  var scrolled = scroller.y - offset;
                  if (scrolled < (scroller.maxScrollY + 40)) {
                    // TODO: find a better way to know when content is upated so we can refresh
                    scroller.refresh();
                  }
                });
              }
            });


          },

          post: function(scope, element, attrs) {
            firePageInitEvent(element[0]);
          }
        };
      }
    };
  });
})();
