/**
 * @ngdoc directive
 * @id sliding_menu
 * @name ons-sliding-menu
 * @description
 *  [en]Component for sliding UI where one page is overlayed over another page. The above page can be slided aside to reveal the page behind.[/en]
 *  [ja]スライディングメニューを表現するためのコンポーネントで、片方のページが別のページの上にオーバーレイで表示されます。above-pageで指定されたページは、横からスライドして表示します。[/ja]
 * @param menu-page
 *  [en]The url of the page to be set to the left side.[/en]
 *  [ja]左に位置するメニューページのURLを指定します。[/ja]
 * @param main-page
 *  [en]The url of the page to be set to the right side.[/en]
 *  [ja]右に位置するメインページのURLを指定します。[/ja]
 * @param swipeable
 *  [en]Whether to enable swipe interaction.[/en]
 *  [ja]スワイプ操作を有効にする場合に指定します。[/ja]
 * @param swipe-target-width
 *  [en]The width of swipeable area calculated from the left (in pixel). Use this to enable swipe only when the finger touch on the screen edge.[/en]
 *  [ja]スワイプの判定領域をピクセル単位で指定します。画面の端から指定した距離に達するとページが表示されます。[/ja]
 * @param max-slide-distance
 *  [en]How far the menu page will slide open. Can specify both in px and %. eg. 90%, 200px[/en]
 *  [ja]menu-pageで指定されたページの表示幅を指定します。ピクセルもしくは%の両方で指定できます（例: 90%, 200px）[/ja]
 * @param var
 *  [en]Variable name to refer this sliding menu.[/en]
 *  [ja]JavaScriptから操作するための変数名を指定します。[/ja]
 * @param side
 *  [en]Specify which side of the screen the menu page is located on. Possible values are left and right.[/en]
 *  [ja]menu-pageで指定されたページが画面のどちら側から表示されるかを指定します。leftもしくはrightのいずれかを指定できます。[/ja]
 *
 * @property setMainPage(pageUrl,[options])
 *  [en]Show the page specified in pageUrl in the main contents pane.[/en]
 *  [ja]中央部分に表示されるページをpageUrlに指定します。[/ja]
 * @property setMenuPage(pageUrl,[options])
 *  [en]Show the page specified in pageUrl in the side menu pane.[/en]
 *  [ja]メニュー部分に表示されるページをpageUrlに指定します。[/ja]
 * @property openMenu([options])
 *  [en]Slide the above layer to reveal the layer behind.[/en]
 *  [ja]メニューページを表示します。[/ja]
 * @property closeMenu([options])
 *  [en]Slide the above layer to hide the layer behind.[/en]
 *  [ja]メニューページを非表示にします。[/ja]
 * @property toggleMenu([options])
 *  [en]Slide the above layer to reveal the layer behind if it is currently hidden, otherwise, hide the layer behind.[/en]
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
 * @property setSwipeable(swipeable)
 *  [en]Set swipeable or not.[/en]
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

      compile: function(element, attrs) {
        var main = element[0].querySelector('.main'),
            menu = element[0].querySelector('.menu');

        if (main) {
          var mainHtml = angular.element(main).remove().html().trim();
        }

        if (menu) {
          var menuHtml = angular.element(menu).remove().html().trim();
        }

        return function(scope, element, attrs) {
          if (attrs.ngController) {
            throw new Error('This element can\'t accept ng-controller directive.');
          }
          
          element.append(angular.element('<div></div>').addClass('onsen-sliding-menu__menu ons-sliding-menu-inner'));
          element.append(angular.element('<div></div>').addClass('onsen-sliding-menu__main ons-sliding-menu-inner'));

          var slidingMenu = new SlidingMenuView(scope, element, attrs);

          if (mainHtml && !attrs.mainPage) {
            slidingMenu._appendMainPage(null, mainHtml);
          }

          if (menuHtml && !attrs.menuPage) {
            slidingMenu._appendMenuPage(menuHtml);
          }

          $onsen.aliasStack.register('ons.slidingMenu', slidingMenu);
          $onsen.declareVarAttribute(attrs, slidingMenu);
          element.data('ons-sliding-menu', slidingMenu);

          scope.$on('$destroy', function(){
            slidingMenu._events = undefined;
            element.data('ons-sliding-menu', undefined);
            $onsen.aliasStack.unregister('ons.slidingMenu', slidingMenu);
          });

          $onsen.fireComponentEvent(element[0], 'init');
        };
      }
    };
  });
})();
