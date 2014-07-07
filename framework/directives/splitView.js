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
 * @id split-view
 * @name ons-split-view
 * @description
 * Divides the screen into left and right section. This component can also act as sliding menu which can be controlled by 'collapse' attribute
 * @param secondary-page The url of the page on the left
 * @param main-page The url of the page on the right
 * @param main-page-width Main page's width percentage. The width of secondary page take the remaining percentage
 * @param collapse Specify the collapse behavior. Valid values are [portrait/landscape/width ##px]. "portrait" means the view will collapse when device is in portrait orien0ation. "landscape" means the view will collapse when device is in landscape orientation. "width ##px" means the view will collapse when the window width is smaller than the specified ##px
 * @property setMainPage(pageUrl) Show the page specified in pageUrl in the right section
 * @property setSecondaryPage(pageUrl) Show the page specified in pageUrl in the left section
 * @property open() Reveal the secondary page if the view is in collapse mode
 * @property close() hide the secondary page if the view is in collapse mode
 * @property toggle() Reveal the secondary page if it is currently hidden, otherwies, reveal it
 * @example
 * index.html
 * <pre>
 * <ons-screen>
 *     <ons-split-view
 *       secondary-page="secondary.html"
 *       main-page="page1.html"
 *       main-page-width="40%"
 *       collapse="width 650px">
 *     </ons-split-view>
 * </ons-screen>
 * </pre>
 *
 * secondary.html
 * <pre>
 * <ons-page>
 *
 *   <ul class="topcoat-list">
 *
 *     <ons-list-item
 *       class="topcoat-list__item--tappable topcoat-list__item__line-height"
 *       ng-click="
 *         ons.splitView.toggle();
 *         ons.splitView.setMainPage('page1.html');">
 *       <i class="fa fa-home fa-lg" style="color: #666"></i>
 *       &nbsp; Page 1
 *     </ons-list-item>
 *
 *     <ons-list-item
 *       class="topcoat-list__item--tappable topcoat-list__item__line-height"
 *       ng-click="
 *         ons.splitView.toggle();
 *         ons.splitView.setMainPage('page2.html');">
 *       <i class="fa fa-gear fa-lg" style="color: #666"></i>
 *       &nbsp; Page 2
 *     </ons-list-item>
 *
 *   </ul>
 * </ons-page>
 * </pre>
 *
 * page1.html
 * <pre>
 * <ons-navigator title="Page 1">
 *   <ons-page class="center" style="padding: 10px">
 *     <h1>Page 1</h1>
 *     <p>This spitview collapses when the width is less than 650px.</p>
 *     <p>When in collapse mode, you can swipe left and right to close and open the secondary page.</p>
 *   </ons-page>
 * </ons-navigator>
 * </pre>
 *
 * page2.html
 *
 * <pre>
 * <ons-navigator title="Page 2">
 *   <ons-page class="center">
 *     <h1>Page 2</h1>
 *   </ons-page>
 * </ons-navigator>
 * </pre>
 */
(function() {
  'use strict';
  var module = angular.module('onsen');

  module.directive('onsSplitView', function($compile, SplitView, $onsen) {

    return {
      restrict: 'E',
      replace: false,

      transclude: false,
      scope: {
        secondaryPage: '@',
        mainPage: '@',
        collapse: '@',
        swipable: '@',
        mainPageWidth: '@'
      },

      templateUrl: $onsen.DIRECTIVE_TEMPLATE_URL + '/split_view.tpl',
      link: function(scope, element, attrs) {

        if (attrs.ngController) {
          throw new Error('This element can\'t accept ng-controller directive.');
        }

        var splitView = new SplitView(scope, element, attrs);
        $onsen.declareVarAttribute(attrs, splitView);

        element.data('ons-split-view', splitView);
        $onsen.aliasStack.register('ons.splitView', splitView);

        scope.$on('$destroy', function() {
          element.data('ons-split-view', undefined);
          $onsen.aliasStack.unregister('ons.splitView', splitView);
        });
      }
    };
  });
})();
