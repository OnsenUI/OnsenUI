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
 * @id sliding_menu
 * @name ons-sliding-menu
 * @description
 * Facebook/Path like sliding UI where one page is overlayed over another page. The above page can be slided aside to reveal the page behind.
 * @param behind-page The url of the page to be set to the behind layer.
 * @param above-page The url of the page to be set to the above layer
 * @param swipable Wether to enable swipe interaction
 * @param swipe-target-width The width of swipable area calculated from the left (in pixel). Eg. Use this to enable swipe only when the finger touch on the left edge.
 * @param max-slide-distance How far the above page will slide open. Can specify both in px and %
 * @property setAbovePage(pageUrl) Show the page specified in pageUrl in the above layer.
 * @property setBehindPage(pageUrl) Show the page specified in pageUrl in the behind layer.
 * @property openMenu() Slide the above layer to reveal the layer behind.
 * @property closeMenu() Slide the above layer to hide the layer behind.
 * @property toggleMenu() Slide the above layer to reveal the layer behind if it is currently hidden, otherwies, hide the layer behind.
 */
(function() {
  'use strict';
  var module = angular.module('onsen');

  module.directive('onsSlidingMenu', function($compile, SlidingMenuView, $onsen) {
    return {
      restrict: 'E',
      replace: false,

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclude.
      transclude: false,
      scope: true,

      templateUrl: $onsen.DIRECTIVE_TEMPLATE_URL + '/sliding_menu.tpl',

      link: function(scope, element, attrs) {

        if (attrs.ngController) {
          throw new Error('This element can\'t accept ng-controller directive.');
        }

        var slidingMenu = new SlidingMenuView(scope, element, attrs);

        $onsen.aliasStack.register('ons.slidingMenu', slidingMenu);
        $onsen.declareVarAttribute(attrs, slidingMenu);
        element.data('ons-sliding-menu', slidingMenu);

        scope.$on('$destroy', function(){
          element.data('ons-sliding-menu', undefined);
          $onsen.aliasStack.unregister('ons.slidingMenu', slidingMenu);
        });
      }
    };
  });
})();
