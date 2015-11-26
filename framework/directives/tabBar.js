/**
 * @ngdoc directive
 * @id tabbar
 * @name ons-tabbar
 * @category navigation
 * @description
 *   [en]A component to display a tab bar on the bottom of a page. Used with ons-tab to manage pages using tabs.[/en]
 *   [ja]タブバーをページ下部に表示するためのコンポーネントです。ons-tabと組み合わせて使うことで、ページを管理できます。[/ja]
 * @codepen pGuDL
 * @guide UsingTabBar
 *   [en]Using tab bar[/en]
 *   [ja]タブバーを使う[/ja]
 * @guide EventHandling
 *   [en]Event handling descriptions[/en]
 *   [ja]イベント処理の使い方[/ja]
 * @guide CallingComponentAPIsfromJavaScript
 *   [en]Using navigator from JavaScript[/en]
 *   [ja]JavaScriptからコンポーネントを呼び出す[/ja]
 * @guide DefiningMultiplePagesinSingleHTML
 *   [en]Defining multiple pages in single html[/en]
 *   [ja]複数のページを1つのHTMLに記述する[/ja]
 * @seealso ons-tab
 *   [en]ons-tab component[/en]
 *   [ja]ons-tabコンポーネント[/ja]
 * @seealso ons-page
 *   [en]ons-page component[/en]
 *   [ja]ons-pageコンポーネント[/ja]
 * @example
 * <ons-tabbar>
 *   <ons-tab page="home.html" active="true">
 *     <ons-icon icon="ion-home"></ons-icon>
 *     <span style="font-size: 14px">Home</span>
 *   </ons-tab>
 *   <ons-tab page="fav.html" active="true">
 *     <ons-icon icon="ion-star"></ons-icon>
 *     <span style="font-size: 14px">Favorites</span>
 *   </ons-tab>
 *   <ons-tab page="settings.html" active="true">
 *     <ons-icon icon="ion-gear-a"></ons-icon>
 *     <span style="font-size: 14px">Settings</span>
 *   </ons-tab>
 * </ons-tabbar>
 *
 * <ons-template id="home.html">
 *   ...
 * </ons-template>
 *
 * <ons-template id="fav.html">
 *   ...
 * </ons-template>
 *
 * <ons-template id="settings.html">
 *   ...
 * </ons-template>
 */

/**
 * @ngdoc event
 * @name prechange
 * @description
 *   [en]Fires just before the tab is changed.[/en]
 *   [ja]アクティブなタブが変わる前に発火します。[/ja]
 * @param {Object} event
 *   [en]Event object.[/en]
 *   [ja]イベントオブジェクト。[/ja]
 * @param {Number} event.index
 *   [en]Current index.[/en]
 *   [ja]現在アクティブになっているons-tabのインデックスを返します。[/ja]
 * @param {Object} event.tabItem
 *   [en]Tab item object.[/en]
 *   [ja]tabItemオブジェクト。[/ja]
 * @param {Function} event.cancel
 *   [en]Call this function to cancel the change event.[/en]
 *   [ja]この関数を呼び出すと、アクティブなタブの変更がキャンセルされます。[/ja]
 */

/**
 * @ngdoc event
 * @name postchange
 * @description
 *   [en]Fires just after the tab is changed.[/en]
 *   [ja]アクティブなタブが変わった後に発火します。[/ja]
 * @param {Object} event
 *   [en]Event object.[/en]
 *   [ja]イベントオブジェクト。[/ja]
 * @param {Number} event.index
 *   [en]Current index.[/en]
 *   [ja]現在アクティブになっているons-tabのインデックスを返します。[/ja]
 * @param {Object} event.tabItem
 *   [en]Tab item object.[/en]
 *   [ja]tabItemオブジェクト。[/ja]
 */

/**
 * @ngdoc event
 * @name reactive
 * @description
 *   [en]Fires if the already open tab is tapped again.[/en]
 *   [ja]すでにアクティブになっているタブがもう一度タップやクリックされた場合に発火します。[/ja]
 * @param {Object} event
 *   [en]Event object.[/en]
 *   [ja]イベントオブジェクト。[/ja]
 * @param {Number} event.index
 *   [en]Current index.[/en]
 *   [ja]現在アクティブになっているons-tabのインデックスを返します。[/ja]
 * @param {Object} event.tabItem
 *   [en]Tab item object.[/en]
 *   [ja]tabItemオブジェクト。[/ja]
 */

/**
 * @ngdoc attribute
 * @name var
 * @initonly
 * @extensionOf angular
 * @type {String}
 * @description
 *   [en]Variable name to refer this tab bar.[/en]
 *   [ja]このタブバーを参照するための名前を指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name hide-tabs
 * @initonly
 * @extensionOf angular
 * @type {Boolean}
 * @default false
 * @description
 *   [en]Whether to hide the tabs. Valid values are true/false.[/en]
 *   [ja]タブを非表示にする場合に指定します。trueもしくはfalseを指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name animation
 * @type {String}
 * @default none
 * @description
 *   [en]Animation name. Preset values are "none", "slide" and "fade". Default is "none".[/en]
 *   [ja]ページ読み込み時のアニメーションを指定します。"none"、"fade"、"slide"のいずれかを選択できます。デフォルトは"none"です。[/ja]
 */

/**
 * @ngdoc attribute
 * @name animation-options
 * @type {Expression}
 * @description
 *  [en]Specify the animation's duration, timing and delay with an object literal. E.g. <code>{duration: 0.2, delay: 1, timing: 'ease-in'}</code>[/en]
 *  [ja]アニメーション時のduration, timing, delayをオブジェクトリテラルで指定します。e.g. <code>{duration: 0.2, delay: 1, timing: 'ease-in'}</code>[/ja]
 */

/**
 * @ngdoc attribute
 * @name position
 * @initonly
 * @type {String}
 * @default bottom
 * @description
 *   [en]Tabbar's position. Preset values are "bottom" and "top". Default is "bottom".[/en]
 *   [ja]タブバーの位置を指定します。"bottom"もしくは"top"を選択できます。デフォルトは"bottom"です。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-reactive
 * @initonly
 * @extensionOf angular
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "reactive" event is fired.[/en]
 *  [ja]"reactive"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-prechange
 * @initonly
 * @extensionOf angular
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "prechange" event is fired.[/en]
 *  [ja]"prechange"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-postchange
 * @initonly
 * @extensionOf angular
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "postchange" event is fired.[/en]
 *  [ja]"postchange"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-init
 * @initonly
 * @extensionOf angular
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when a page's "init" event is fired.[/en]
 *  [ja]ページの"init"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-show
 * @initonly
 * @extensionOf angular
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when a page's "show" event is fired.[/en]
 *  [ja]ページの"show"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-hide
 * @initonly
 * @extensionOf angular
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when a page's "hide" event is fired.[/en]
 *  [ja]ページの"hide"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-destroy
 * @initonly
 * @extensionOf angular
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when a page's "destroy" event is fired.[/en]
 *  [ja]ページの"destroy"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc method
 * @signature setActiveTab(index, [options])
 * @param {Number} index
 *   [en]Tab index.[/en]
 *   [ja]タブのインデックスを指定します。[/ja]
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {Boolean} [options.keepPage]
 *   [en]If true the page will not be changed.[/en]
 *   [ja]タブバーが現在表示しているpageを変えない場合にはtrueを指定します。[/ja]
 * @param {String} [options.animation]
 *   [en]Animation name. Available animations are "fade", "slide" and "none".[/en]
 *   [ja]アニメーション名を指定します。"fade"、"slide"、"none"のいずれかを指定できます。[/ja]
 * @param {String} [options.animationOptions]
 *   [en]Specify the animation's duration, delay and timing. E.g.  <code>{duration: 0.2, delay: 0.4, timing: 'ease-in'}</code>[/en]
 *   [ja]アニメーション時のduration, delay, timingを指定します。e.g. <code>{duration: 0.2, delay: 0.4, timing: 'ease-in'}</code> [/ja]
 * @return {Boolean}
 *   [en]true if the change was successful.[/en]
 *   [ja]変更が成功した場合にtrueを返します。[/ja]
 * @description
 *   [en]Show specified tab page. Animations and other options can be specified by the second parameter.[/en]
 *   [ja]指定したインデックスのタブを表示します。アニメーションなどのオプションを指定できます。[/ja]
 */

/**
 * @ngdoc method
 * @signature getActiveTabIndex()
 * @return {Number}
 *   [en]The index of the currently active tab.[/en]
 *   [ja]現在アクティブになっているタブのインデックスを返します。[/ja]
 * @description
 *   [en]Returns tab index on current active tab. If active tab is not found, returns -1.[/en]
 *   [ja]現在アクティブになっているタブのインデックスを返します。現在アクティブなタブがない場合には-1を返します。[/ja]
 */

/**
 * @ngdoc method
 * @signature loadPage(url)
 * @param {String} url
 *   [en]Page URL. Can be either an HTML document or an <code>&lt;ons-template&gt;</code>.[/en]
 *   [ja]pageのURLか、もしくは<code>&lt;ons-template&gt;</code>で宣言したid属性の値を利用できます。[/ja]
 * @description
 *   [en]Displays a new page without changing the active index.[/en]
 *   [ja]現在のアクティブなインデックスを変更せずに、新しいページを表示します。[/ja]
 */

/**
 * @ngdoc method
 * @signature on(eventName, listener)
 * @extensionOf angular
 * @description
 *   [en]Add an event listener.[/en]
 *   [ja]イベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]このイベントが発火された際に呼び出される関数オブジェクトを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature once(eventName, listener)
 * @extensionOf angular
 * @description
 *  [en]Add an event listener that's only triggered once.[/en]
 *  [ja]一度だけ呼び出されるイベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]イベントが発火した際に呼び出される関数オブジェクトを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature off(eventName, [listener])
 * @extensionOf angular
 * @description
 *  [en]Remove an event listener. If the listener is not specified all listeners for the event type will be removed.[/en]
 *  [ja]イベントリスナーを削除します。もしイベントリスナーを指定しなかった場合には、そのイベントに紐づく全てのイベントリスナーが削除されます。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]削除するイベントリスナーを指定します。[/ja]
 */

(function() {
  'use strict';

  var lastReady = window.OnsTabbarElement.rewritables.ready;
  window.OnsTabbarElement.rewritables.ready = ons._waitDiretiveInit('ons-tabbar', lastReady);

  var lastLink = window.OnsTabbarElement.rewritables.link;
  window.OnsTabbarElement.rewritables.link = function(tabbarElement, target, callback) {
    var view = angular.element(tabbarElement).data('ons-tabbar');
    view._compileAndLink(target, function(target) {
      lastLink(tabbarElement, target, callback);
    });
  };

  var lastUnlink = window.OnsTabbarElement.rewritables.unlink;
  window.OnsTabbarElement.rewritables.unlink = function(tabbarElement, target, callback) {
    angular.element(target).data('_scope').$destroy();
    lastUnlink(tabbarElement, target, callback);
  };

  angular.module('onsen').directive('onsTabbar', function($onsen, $compile, $parse, TabbarView) {

    return {
      restrict: 'E',

      replace: false,
      scope: true,

      link: function(scope, element, attrs, controller) {

        CustomElements.upgrade(element[0]);

        scope.$watch(attrs.hideTabs, function(hide) {
          if (typeof hide === 'string') {
            hide = hide === 'true';
          }
          element[0].setTabbarVisibility(!hide);
        });

        var tabbarView = new TabbarView(scope, element, attrs);
        $onsen.addModifierMethodsForCustomElements(tabbarView, element);

        $onsen.registerEventHandlers(tabbarView, 'reactive prechange postchange init show hide destroy');

        element.data('ons-tabbar', tabbarView);
        $onsen.declareVarAttribute(attrs, tabbarView);

        scope.$on('$destroy', function() {
          tabbarView._events = undefined;
          $onsen.removeModifierMethods(tabbarView);
          element.data('ons-tabbar', undefined);
        });

        $onsen.fireComponentEvent(element[0], 'init');
      }
    };
  });
})();
