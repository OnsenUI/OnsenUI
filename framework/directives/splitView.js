/**
 * @ngdoc directive
 * @id split-view
 * @name ons-split-view
 * @description
 *  [en]Divides the screen into left and right section. This component can also act as sliding menu which can be controlled by collapse attribute.[/en]
 *  [ja]画面を左右に分割します。collapse属性を用いることで、スライディングメニューとしての使い方もできます。[/ja]
 *
 * @param main-page
 *  [en]The url of the page on the right.[/en]
 *  [ja]右側に表示するページのURLを指定します。[/ja]
 * @param main-page-width
 *  [en]Main page's width percentage. The width of secondary page take the remaining percentage.[/en]
 *  [ja]右側のページの幅をパーセント単位で指定します。[/ja]
 * @param secondary-page
 *  [en]The url of the page on the left.[/en]
 *  [ja]左側に表示するページのURLを指定します。[/ja]
 * @param collapse
 *  [en]Specify the collapse behavior. Valid values are portrait, landscape, width ##px. "portrait" or "landscape" means the view will collapse when device is in landscape or portrait orientation. "width ##px" means the view will collapse when the window width is smaller than the specified ##px.[/en]
 *  [ja]左側のページを非表示にする条件を指定します。portrait, landscapeもしくはwidth ##pxの指定が可能です。portraitもしくはlandscapeを指定すると、デバイスの画面が縦向きもしくは横向きになった時に適用されます。width ##pxを指定すると、画面が指定した横幅よりも短い場合に適用されます。[/ja]
 * @param var 
 *  [en]Variable name to refer this split view.[/en]
 *  [ja]JavaScriptからスプリットビューコンポーネントにアクセスするための変数を定義します。[/ja]
 *
 * @property setMainPage(pageUrl) Show the page specified in pageUrl in the right section
 * @property setSecondaryPage(pageUrl) Show the page specified in pageUrl in the left section
 * @property open() [Deprecated] Reveal the secondary page if the view is in collapse mode
 * @property close() [Deprecated] hide the secondary page if the view is in collapse mode
 * @property toggle() [Deprecated] Reveal the secondary page if it is currently hidden, otherwies, reveal it
 * @codepen nKqfv {wide}
 * @guide Usingonssplitviewcomponent [en]Using ons-split-view.[/en][ja]ons-split-viewコンポーネントを使う[/ja]
 * @guide CallingComponentAPIsfromJavaScript [en]Using navigator from JavaScript[/en][ja]JavaScriptからコンポーネントを呼び出す[/ja]
 * @example
 * <ons-split-view 
 *   secondary-page="secondary.html" 
 *   main-page="main.html" 
 *   main-page-width="70%" 
 *   collapse="portrait">
 * </ons-split-view>
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

        $onsen.fireComponentEvent(element[0], "init");
      }
    };
  });
})();
