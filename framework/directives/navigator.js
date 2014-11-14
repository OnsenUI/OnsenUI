/**
 * @ngdoc directive
 * @id navigator
 * @name ons-navigator
 * @description
 *  [en]A component that provides page stack management and navigation. This component does not have a visible content.[/en]
 *  [ja]ページスタックの管理とナビゲーション機能を提供するコンポーネント。画面上への出力はありません。[/ja]
 * @param page
 *  [en]First page to show when navigator is initialized.[/en]
 *  [ja]ナビゲーターが初期化された時に表示するページを指定します。[/ja]
 * @param var
 *  [en]Variable name to refer this navigator.[/en]
 *  [ja]ナビゲーターを参照するための変数を指定します。[/ja]
 * @property pushPage(pageUrl,options)
 *  [en]Pushes the specified pageUrl into the page stack.[/en]
 *  [ja]指定したpageUrlを新しいページスタックに追加します。新しいページが表示されます。[/ja]
 * @property insertPage(index,pageUrl,options)
 *  [en]Insert the specified pageUrl into the page stack with specified index.[/en]
 *  [ja]指定したpageUrlをページスタックのindexで指定した位置に追加します。[/ja]
 * @property popPage()
 *  [en]Pops the current page from the page stack. The previous page will be displayed.[/en]
 *  [ja]現在表示中のページをページスタックから取り除きます。一つ前のページに戻ります。[/ja]
 * @property resetToPage(pageUrl,options)
 *  [en]Clears page stack and adds the specified pageUrl to the page stack.[/en]
 *  [ja]ページスタックをリセットし、指定したページを表示します。[/ja]
 * @property getCurrentPage()
 *  [en]Get current page's navigator item. Use this method to access options passed by pushPage() or resetToPage() method.[/en]
 *  [ja]現在のページを取得します。pushPage()やresetToPage()メソッドの引数を取得できます。[/ja]
 * @property getPages()
 *  [en]Retrieve the entire page stack of the navigator.[/en]
 *  [ja]ナビゲーターの持つページスタックの一覧を取得します。[/ja]
 * @property getDeviceBackButtonHandler()
 *  [en]Retrieve the back button handler for overriding the default behavior.[/en]
 *  [ja]バックボタンハンドラを取得します。デフォルトの挙動を変更することができます。[/ja]
 * @property on(eventName,listener)
 *  [en]Add an event listener. Preset events are prepop, prepush, postpop and postpush.[/en]
 *  [ja]イベントリスナーを追加します。prepop, prepush, postpop, postpushを指定できます。[/ja]
 * @codepen yrhtv
 * @guide PageNavigation [en]Guide for page navigation[/en][ja]ページナビゲーションの概要[/ja]
 * @guide CallingComponentAPIsfromJavaScript [en]Using navigator from JavaScript[/en][ja]JavaScriptからコンポーネントを呼び出す[/ja]
 * @guide EventHandling [en]Event handling descriptions[/en][ja]イベント処理の使い方[/ja]
 * @guide DefiningMultiplePagesinSingleHTML [en]Defining multiple pages in single html[/en][ja]複数のページを1つのHTMLに記述する[/ja]
 * @seealso ons-toolbar [en]ons-toolbar component[/en][ja]ons-toolbarコンポーネント[/ja]
 * @example
 * <ons-navigator animation="slide" var="app.navi">
 *   <ons-page>
 *     <ons-toolbar>
 *       <div class="center">Title</div>
 *     </ons-toolbar>
 *
 *     <p style="text-align: center">
 *       <ons-button modifier="light" ng-click="app.navi.pushPage('page.html');">Push</ons-button>
 *     </p>
 *   </ons-page>
 * </ons-navigator>
 *
 * <ons-template id="page.html">
 *   <ons-page>
 *     <ons-toolbar>
 *       <div class="center">Title</div>
 *     </ons-toolbar>
 *
 *     <p style="text-align: center">
 *       <ons-button modifier="light" ng-click="app.navi.popPage('page.html');">Pop</ons-button>
 *     </p>
 *   </ons-page>
 * </ons-template>
 */

(function() {
  'use strict';
  var module = angular.module('onsen');

  module.directive('onsNavigator', function($compile, NavigatorView, $onsen) {
    return {
      restrict: 'E',

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclude.
      transclude: false,
      scope: true,

      compile: function(element) {

        var html = $onsen.normalizePageHTML(element.html());
        element.contents().remove();

        return {
          pre: function(scope, element, attrs, controller) {
            var navigator = new NavigatorView({
              scope: scope, 
              element: element
            });

            $onsen.declareVarAttribute(attrs, navigator);

            if (attrs.page) {
              navigator.pushPage(attrs.page, {});
            } else {
              var pageScope = navigator._createPageScope();
              var pageElement = angular.element(html);
              var linkScope = $compile(pageElement);
              var link = function() {
                linkScope(pageScope);
              };

              navigator._pushPageDOM('', pageElement, link, pageScope, {});
              pageElement = null;
            }

            $onsen.aliasStack.register('ons.navigator', navigator);
            element.data('ons-navigator', navigator);

            scope.$on('$destroy', function() {
              navigator._events = undefined;
              element.data('ons-navigator', undefined);
              $onsen.aliasStack.unregister('ons.navigator', navigator);
              element = null;
            });

          },
          post: function(scope, element, attrs) {
            $onsen.fireComponentEvent(element[0], 'init');
          }
        };
      }
    };
  });
})();
