/**
 * @ngdoc directive
 * @id split-view
 * @name ons-split-view
 * @description
 *  [en]Divides the screen into left and right section.[/en]
 *  [ja]画面を左右に分割します。[/ja]
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
 *  [en]Specify the collapse behavior. Valid values are portrait, landscape, width ##px or a media query. "portrait" or "landscape" means the view will collapse when device is in landscape or portrait orientation. "width ##px" means the view will collapse when the window width is smaller than the specified ##px. If the value is a media query, the view will collapse when the media query is true.[/en]
 *  [ja]左側のページを非表示にする条件を指定します。portrait, landscape、width ##pxもしくはメディアクエリの指定が可能です。portraitもしくはlandscapeを指定すると、デバイスの画面が縦向きもしくは横向きになった時に適用されます。width ##pxを指定すると、画面が指定した横幅よりも短い場合に適用されます。メディアクエリを指定すると、指定したクエリに適合している場合に適用されます。[/ja]
 * @param var 
 *  [en]Variable name to refer this split view.[/en]
 *  [ja]JavaScriptからスプリットビューコンポーネントにアクセスするための変数を定義します。[/ja]
 *
 * @property setMainPage(pageUrl) Show the page specified in pageUrl in the right section
 * @property setSecondaryPage(pageUrl) Show the page specified in pageUrl in the left section
 * @property update() Trigger an 'update' event and try to determine if the split behaviour should be changed.
 * @property on(eventName,listener)
 *  [en]Add an event listener. Preset events are presplit, postsplit, precollapse and postcollapse.[/en]
 *  [ja]イベントリスナーを追加します。presplit, postsplit, precollapse, postcollapse, updateを指定できます。[/ja]
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
        mainPageWidth: '@'
      },

      compile: function(element, attrs) {
        var mainPage = element[0].querySelector('.main-page'),
            secondaryPage = element[0].querySelector('.secondary-page');

        if (mainPage) {
          var mainHtml = angular.element(mainPage).remove().html().trim();
        }

        if (secondaryPage) {
          var secondaryHtml = angular.element(secondaryPage).remove().html().trim();
        }

        return function(scope, element, attrs) {
          if (attrs.ngController) {
            throw new Error('This element can\'t accept ng-controller directive.');
          }

          element.append(angular.element('<div></div>').addClass('onsen-split-view__secondary full-screen ons-split-view-inner'));
          element.append(angular.element('<div></div>').addClass('onsen-split-view__main full-screen ons-split-view-inner'));

          var splitView = new SplitView(scope, element, attrs);

          if (mainHtml && !attrs.mainPage) {
            splitView._appendMainPage(mainHtml);
          }

          if (secondaryHtml && !attrs.secondaryPage) {
            splitView._appendSecondPage(secondaryHtml);
          }

          $onsen.declareVarAttribute(attrs, splitView);

          element.data('ons-split-view', splitView);
          $onsen.aliasStack.register('ons.splitView', splitView);

          scope.$on('$destroy', function() {
            splitView._events = undefined;
            element.data('ons-split-view', undefined);
            $onsen.aliasStack.unregister('ons.splitView', splitView);
          });

          $onsen.fireComponentEvent(element[0], 'init');
        };
      }
    };
  });
})();
