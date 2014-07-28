/**
 * @ngdoc directive
 * @id split-view
 * @name ons-split-view
 * @description
 * Divides the screen into left and right section. This component can also act as sliding menu which can be controlled by 'collapse' attribute
 *
 * @param secondary-page The url of the page on the left
 * @param main-page The url of the page on the right
 * @param main-page-width Main page's width percentage. The width of secondary page take the remaining percentage
 * @param collapse [Deprecated] Specify the collapse behavior. Valid values are [portrait/landscape/width ##px]. "portrait" means the view will collapse when device is in portrait orien0ation. "landscape" means the view will collapse when device is in landscape orientation. "width ##px" means the view will collapse when the window width is smaller than the specified ##px
 * @param var Variable name to refer this split view.
 *
 * @property setMainPage(pageUrl) Show the page specified in pageUrl in the right section
 * @property setSecondaryPage(pageUrl) Show the page specified in pageUrl in the left section
 * @property open() [Deprecated] Reveal the secondary page if the view is in collapse mode
 * @property close() [Deprecated] hide the secondary page if the view is in collapse mode
 * @property toggle() [Deprecated] Reveal the secondary page if it is currently hidden, otherwies, reveal it
 * @codepen nKqfv {wide}
 * @guide multi-screen-support Multi screen support
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
