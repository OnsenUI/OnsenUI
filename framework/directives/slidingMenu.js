/**
 * @ngdoc directive
 * @id sliding_menu
 * @name ons-sliding-menu
 * @description
 *  [en]Component for sliding UI where one page is overlayed over another page. The above page can be slided aside to reveal the page behind.[/en]
 *  [ja]スライディングメニューを表現するためのコンポーネントで、片方のページが別のページの上にオーバーレイで表示されます。above-pageで指定されたページは、横からスライドして表示します。[/ja]
 * @param behind-page
 *  [en]The url of the page to be set to the behind layer.[/en]
 *  [ja]後方のレイヤーにセットされたページのURLを指定します。[/ja]
 * @param above-page
 *  [en]The url of the page to be set to the above layer.[/en]
 *  [ja]前方のレイヤーにセットされたページのURLを指定します。[/ja]
 * @param swipable
 *  [en]Whether to enable swipe interaction.[/en]
 *  [ja]スワイプ操作を有効にする場合に指定します。[/ja]
 * @param swipe-target-width
 *  [en]The width of swipable area calculated from the left (in pixel). Use this to enable swipe only when the finger touch on the screen edge.[/en]
 *  [ja]スワイプの判定領域をピクセル単位で指定します。画面の端から指定した距離に達するとページが表示されます。[/ja]
 * @param max-slide-distance
 *  [en]How far the behind page will slide open. Can specify both in px and %. eg. 90%, 200px[/en]
 *  [ja]behind-pageで指定されたページの表示幅を指定します。ピクセルもしくは%の両方で指定できます（例: 90%, 200px）[/ja]
 * @param var
 *  [en]Variable name to refer this sliding menu.[/en]
 *  [ja]JavaScriptから操作するための変数名を指定します。[/ja]
 * @param side
 *  [en]Specify which side of the screen the behind page is located on. Possible values are left and right.[/en]
 *  [ja]behind-pageで指定されたページが画面のどちら側から表示されるかを指定します。leftもしくはrightのいずれかを指定できます。[/ja]
 *
 * @property setMainPage(pageUrl,[options])
 *  [en]Show the page specified in pageUrl in the main contents pane.[/en]
 *  [ja]中央部分に表示されるページをpageUrlに指定します。[/ja]
 * @property setMenuPage(pageUrl,[options])
 *  [en]Show the page specified in pageUrl in the side menu pane.[/en]
 *  [ja]メニュー部分に表示されるページをpageUrlに指定します。[/ja]
 * @property setAbovePage(pageUrl)
 *  [en][Deprecated]Show the page specified in pageUrl in the above layer.[/en]
 *  [ja][非推奨]上部に表示されるページをpageUrlに指定します。[/ja]
 * @property setBehindPage(pageUrl)
 *  [en][Deprecated]Show the page specified in pageUrl in the behind layer.[/en]
 *  [ja][非推奨]下部に表示されるページをpageUrlに指定します。[/ja]
 * @property openMenu()
 *  [en]Slide the above layer to reveal the layer behind.[/en]
 *  [ja]メニューページを表示します。[/ja]
 * @property closeMenu()
 *  [en]Slide the above layer to hide the layer behind.[/en]
 *  [ja]メニューページを非表示にします。[/ja]
 * @property toggleMenu()
 *  [en]Slide the above layer to reveal the layer behind if it is currently hidden, otherwies, hide the layer behind.[/en]
 *  [ja]現在の状況に合わせて、メニューページを表示もしくは非表示にします。[/ja]
 * @property on(eventName,listener)
 *  [en]Add an event listener. Preset events are preopen, preclose, postopen and postclose.[/en]
 *  [ja]イベントリスナーを追加します。preopen, preclose, postopen, postcloseのイベントに対応しています。[/ja]
 * @property isMenuOpened()
 *  [en]Returns true if the menu page is open, otherwise false.[/en]
 *  [ja]メニューページが開いている場合はtrue、そうでない場合はfalseを返します。[/ja]
 * @property getDeviceBackButtonHandler()
 *  [en]Retrieve the back-button handler.[/en]
 *  [ja]ons-sliding-menuに紐付いているバックボタンハンドラを取得します。[/ja]
 * @property setSwipable(swipable)
 *  [en]Set swipable or not.[/en]
 *  [ja]スワイプで開閉するかどうかを設定する。[/ja]
 * @codepen IDvFJ
 * @seealso ons-page [en]ons-page component[/en][ja]ons-pageコンポーネント[/ja]
 * @guide UsingSlidingMenu [en]Using sliding menu[/en][ja]スライディングメニューを使う[/ja]
 * @guide EventHandling [en]Using events[/en][ja]イベントの利用[/ja]
 * @guide CallingComponentAPIsfromJavaScript [en]Using navigator from JavaScript[/en][ja]JavaScriptからコンポーネントを呼び出す[/ja]
 * @guide DefiningMultiplePagesinSingleHTML [en]Defining multiple pages in single html[/en][ja]複数のページを1つのHTMLに記述する[/ja]
 * @example
 * <ons-sliding-menu var="app.menu" main-page="page.html" menu-page="menu.html" max-slide-distance="200px" type="reveal" side="left">
 * </ons-sliding-menu>
 *
 * <ons-template id="page.html">
 *   <ons-page>
 *    <p style="text-align: center">
 *      <ons-button ng-click="app.menu.toggleMenu()">Toggle</ons-button>
 *    </p>
 *   </ons-page>
 * </ons-template>
 *
 * <ons-template id="menu.html">
 *   <ons-page>
 *     <!-- menu page's contents -->
 *   </ons-page>
 * </ons-template>
 *
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
