/**
 * @ngdoc directive
 * @id navigator
 * @name ons-navigator
 * @category navigation
 * @description
 *   [en]A component that provides page stack management and navigation. This component does not have a visible content.[/en]
 *   [ja]ページスタックの管理とナビゲーション機能を提供するコンポーネント。画面上への出力はありません。[/ja]
 * @codepen yrhtv
 * @guide PageNavigation
 *   [en]Guide for page navigation[/en]
 *   [ja]ページナビゲーションの概要[/ja]
 * @guide CallingComponentAPIsfromJavaScript
 *   [en]Using navigator from JavaScript[/en]
 *   [ja]JavaScriptからコンポーネントを呼び出す[/ja]
 * @guide EventHandling
 *   [en]Event handling descriptions[/en]
 *   [ja]イベント処理の使い方[/ja]
 * @guide DefiningMultiplePagesinSingleHTML
 *   [en]Defining multiple pages in single html[/en]
 *   [ja]複数のページを1つのHTMLに記述する[/ja]
 * @seealso ons-toolbar
 *   [en]ons-toolbar component[/en]
 *   [ja]ons-toolbarコンポーネント[/ja]
 * @seealso ons-back-button
 *   [en]ons-back-button component[/en]
 *   [ja]ons-back-buttonコンポーネント[/ja]
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
 *       <ons-button modifier="light" ng-click="app.navi.popPage();">Pop</ons-button>
 *     </p>
 *   </ons-page>
 * </ons-template>
 */

/**
 * @ngdoc event
 * @name prepush
 * @description
 *   [en]Fired just before a page is pushed.[/en]
 *   [ja]pageがpushされる直前に発火されます。[/ja]
 * @param {Object} event [en]Event object.[/en]
 * @param {Object} event.navigator
 *   [en]Component object.[/en]
 *   [ja]コンポーネントのオブジェクト。[/ja]
 * @param {Object} event.currentPage
 *   [en]Current page object.[/en]
 *   [ja]現在のpageオブジェクト。[/ja]
 * @param {Function} event.cancel
 *   [en]Call this function to cancel the push.[/en]
 *   [ja]この関数を呼び出すと、push処理がキャンセルされます。[/ja]
 */

/**
 * @ngdoc event
 * @name prepop
 * @description
 *   [en]Fired just before a page is popped.[/en]
 *   [ja]pageがpopされる直前に発火されます。[/ja]
 * @param {Object} event [en]Event object.[/en]
 * @param {Object} event.navigator
 *   [en]Component object.[/en]
 *   [ja]コンポーネントのオブジェクト。[/ja]
 * @param {Object} event.currentPage
 *   [en]Current page object.[/en]
 *   [ja]現在のpageオブジェクト。[/ja]
 * @param {Function} event.cancel
 *   [en]Call this function to cancel the pop.[/en]
 *   [ja]この関数を呼び出すと、pageのpopがキャンセルされます。[/ja]
 */

/**
 * @ngdoc event
 * @name postpush
 * @description
 *   [en]Fired just after a page is pushed.[/en]
 *   [ja]pageがpushされてアニメーションが終了してから発火されます。[/ja]
 * @param {Object} event [en]Event object.[/en]
 * @param {Object} event.navigator
 *   [en]Component object.[/en]
 *   [ja]コンポーネントのオブジェクト。[/ja]
 * @param {Object} event.enterPage
 *   [en]Object of the next page.[/en]
 *   [ja]pushされたpageオブジェクト。[/ja]
 * @param {Object} event.leavePage
 *   [en]Object of the previous page.[/en]
 *   [ja]以前のpageオブジェクト。[/ja]
 */

/**
 * @ngdoc event
 * @name postpop
 * @description
 *   [en]Fired just after a page is popped.[/en]
 *   [ja]pageがpopされてアニメーションが終わった後に発火されます。[/ja]
 * @param {Object} event [en]Event object.[/en]
 * @param {Object} event.navigator
 *   [en]Component object.[/en]
 *   [ja]コンポーネントのオブジェクト。[/ja]
 * @param {Object} event.enterPage
 *   [en]Object of the next page.[/en]
 *   [ja]popされて表示されるページのオブジェクト。[/ja]
 * @param {Object} event.leavePage
 *   [en]Object of the previous page.[/en]
 *   [ja]popされて消えるページのオブジェクト。[/ja]
 */

/**
 * @ngdoc attribute
 * @name page
 * @initonly
 * @type {String}
 * @description
 *   [en]First page to show when navigator is initialized.[/en]
 *   [ja]ナビゲーターが初期化された時に表示するページを指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name var
 * @initonly
 * @extensionOf angular
 * @type {String}
 * @description
 *  [en]Variable name to refer this navigator.[/en]
 *  [ja]このナビゲーターを参照するための名前を指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-prepush
 * @initonly
 * @extensionOf angular
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "prepush" event is fired.[/en]
 *  [ja]"prepush"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-prepop
 * @initonly
 * @extensionOf angular
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "prepop" event is fired.[/en]
 *  [ja]"prepop"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-postpush
 * @initonly
 * @extensionOf angular
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "postpush" event is fired.[/en]
 *  [ja]"postpush"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-postpop
 * @initonly
 * @extensionOf angular
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "postpop" event is fired.[/en]
 *  [ja]"postpop"イベントが発火された時の挙動を独自に指定できます。[/ja]
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
 * @ngdoc attribute
 * @name animation
 * @type {String}
 * @default default
 * @description
 *  [en]Specify the transition animation. Use one of "slide", "simpleslide", "fade", "lift", "none" and "default".[/en]
 *  [ja]画面遷移する際のアニメーションを指定します。"slide", "simpleslide", "fade", "lift", "none", "default"のいずれかを指定できます。[/ja]
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
 * @ngdoc method
 * @signature pushPage(pageUrl, [options])
 * @param {String} pageUrl
 *   [en]Page URL. Can be either a HTML document or a <code>&lt;ons-template&gt;</code>.[/en]
 *   [ja]pageのURLか、もしくはons-templateで宣言したテンプレートのid属性の値を指定できます。[/ja]
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {String} [options.animation]
 *   [en]Animation name. Available animations are "slide", "simpleslide", "lift", "fade" and "none".[/en]
 *   [ja]アニメーション名を指定します。"slide", "simpleslide", "lift", "fade", "none"のいずれかを指定できます。[/ja]
 * @param {String} [options.animationOptions]
 *   [en]Specify the animation's duration, delay and timing. E.g.  <code>{duration: 0.2, delay: 0.4, timing: 'ease-in'}</code>[/en]
 *   [ja]アニメーション時のduration, delay, timingを指定します。e.g. <code>{duration: 0.2, delay: 0.4, timing: 'ease-in'}</code> [/ja]
 * @param {Function} [options.onTransitionEnd]
 *   [en]Function that is called when the transition has ended.[/en]
 *   [ja]pushPage()による画面遷移が終了した時に呼び出される関数オブジェクトを指定します。[/ja]
 * @description
 *   [en]Pushes the specified pageUrl into the page stack.[/en]
 *   [ja]指定したpageUrlを新しいページスタックに追加します。新しいページが表示されます。[/ja]
 */

/**
 * @ngdoc method
 * @signature bringPageTop(item, [options])
 * @param {String|Number} item
 *   [en]Page URL or index of an existing page in navigator's stack.[/en]
 *   [ja]ページのURLかもしくはons-navigatorのページスタックのインデックス値を指定します。[/ja]
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {String} [options.animation]
 *   [en]Animation name. Available animations are "slide", "simpleslide", "lift", "fade" and "none".[/en]
 *   [ja]アニメーション名を指定します。"slide", "simpleslide", "lift", "fade", "none"のいずれかを指定できます。[/ja]
 * @param {String} [options.animationOptions]
 *   [en]Specify the animation's duration, delay and timing. E.g.  <code>{duration: 0.2, delay: 0.4, timing: 'ease-in'}</code>[/en]
 *   [ja]アニメーション時のduration, delay, timingを指定します。e.g. <code>{duration: 0.2, delay: 0.4, timing: 'ease-in'}</code> [/ja]
 * @param {Function} [options.onTransitionEnd]
 *   [en]Function that is called when the transition has ended.[/en]
 *   [ja]pushPage()による画面遷移が終了した時に呼び出される関数オブジェクトを指定します。[/ja]
 * @description
 *   [en]Brings the given page to the top of the page-stack if already exists or pushes it into the stack if doesn't.[/en]
 *   [ja]指定したページをページスタックの一番上に移動します。もし指定したページが無かった場合新しくpushされます。[/ja]
 */

/**
 * @ngdoc method
 * @signature insertPage(index, pageUrl, [options])
 * @param {Number} index
 *   [en]The index where it should be inserted.[/en]
 *   [ja]スタックに挿入する位置のインデックスを指定します。[/ja]
 * @param {String} pageUrl
 *   [en]Page URL. Can be either a HTML document or a <code>&lt;ons-template&gt;</code>.[/en]
 *   [ja]pageのURLか、もしくはons-templateで宣言したテンプレートのid属性の値を指定できます。[/ja]
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {String} [options.animation]
 *   [en]Animation name. Available animations are "slide", "simpleslide", "lift", "fade" and "none".[/en]
 *   [ja]アニメーション名を指定します。"slide", "simpleslide", "lift", "fade", "none"のいずれかを指定できます。[/ja]
 * @description
 *   [en]Insert the specified pageUrl into the page stack with specified index.[/en]
 *   [ja]指定したpageUrlをページスタックのindexで指定した位置に追加します。[/ja]
 */

/**
 * @ngdoc method
 * @signature popPage([options])
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {String} [options.animation]
 *   [en]Animation name. Available animations are "slide", "simpleslide", "lift", "fade" and "none".[/en]
 *   [ja]アニメーション名を指定します。"slide", "simpleslide", "lift", "fade", "none"のいずれかを指定できます。[/ja]
 * @param {String} [options.animationOptions]
 *   [en]Specify the animation's duration, delay and timing. E.g.  <code>{duration: 0.2, delay: 0.4, timing: 'ease-in'}</code>[/en]
 *   [ja]アニメーション時のduration, delay, timingを指定します。e.g. <code>{duration: 0.2, delay: 0.4, timing: 'ease-in'}</code> [/ja]
 * @param {Boolean} [options.refresh]
 *   [en]The previous page will be refreshed (destroyed and created again) before popPage action.[/en]
 *   [ja]popPageする前に、前にあるページを生成しなおして更新する場合にtrueを指定します。[/ja]
 * @param {Function} [options.onTransitionEnd]
 *   [en]Function that is called when the transition has ended.[/en]
 *   [ja]このメソッドによる画面遷移が終了した際に呼び出される関数オブジェクトを指定します。[/ja]
 * @description
 *   [en]Pops the current page from the page stack. The previous page will be displayed.[/en]
 *   [ja]現在表示中のページをページスタックから取り除きます。一つ前のページに戻ります。[/ja]
 */

/**
 * @ngdoc method
 * @signature replacePage(pageUrl, [options])
 * @param {String} pageUrl
 *   [en]Page URL. Can be either a HTML document or an <code>&lt;ons-template&gt;</code>.[/en]
 *   [ja]pageのURLか、もしくはons-templateで宣言したテンプレートのid属性の値を指定できます。[/ja]
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {String} [options.animation]
 *   [en]Animation name. Available animations are "slide", "simpleslide", "lift", "fade" and "none".[/en]
 *   [ja]アニメーション名を指定できます。"slide", "simpleslide", "lift", "fade", "none"のいずれかを指定できます。[/ja]
 * @param {String} [options.animationOptions]
 *   [en]Specify the animation's duration, delay and timing. E.g.  <code>{duration: 0.2, delay: 0.4, timing: 'ease-in'}</code>[/en]
 *   [ja]アニメーション時のduration, delay, timingを指定します。e.g. <code>{duration: 0.2, delay: 0.4, timing: 'ease-in'}</code> [/ja]
 * @param {Function} [options.onTransitionEnd]
 *   [en]Function that is called when the transition has ended.[/en]
 *   [ja]このメソッドによる画面遷移が終了した際に呼び出される関数オブジェクトを指定します。[/ja]
 * @description
 *   [en]Replaces the current page with the specified one.[/en]
 *   [ja]現在表示中のページをを指定したページに置き換えます。[/ja]
 */

/**
 * @ngdoc method
 * @signature resetToPage(pageUrl, [options])
 * @param {String} pageUrl
 *   [en]Page URL. Can be either a HTML document or an <code>&lt;ons-template&gt;</code>.[/en]
 *   [ja]pageのURLか、もしくはons-templateで宣言したテンプレートのid属性の値を指定できます。[/ja]
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {String} [options.animation]
 *   [en]Animation name. Available animations are "slide", "simpleslide", "lift", "fade" and "none".[/en]
 *   [ja]アニメーション名を指定できます。"slide", "simpleslide", "lift", "fade", "none"のいずれかを指定できます。[/ja]
 * @param {Function} [options.onTransitionEnd]
 *   [en]Function that is called when the transition has ended.[/en]
 *   [ja]このメソッドによる画面遷移が終了した際に呼び出される関数オブジェクトを指定します。[/ja]
 * @description
 *   [en]Clears page stack and adds the specified pageUrl to the page stack.[/en]
 *   [ja]ページスタックをリセットし、指定したページを表示します。[/ja]
 */

/**
 * @ngdoc method
 * @signature getCurrentPage()
 * @return {Object}
 *   [en]Current page object.[/en]
 *   [ja]現在のpageオブジェクト。[/ja]
 * @description
 *   [en]Get current page's navigator item. Use this method to access options passed by pushPage() or resetToPage() method.[/en]
 *   [ja]現在のページを取得します。pushPage()やresetToPage()メソッドの引数を取得できます。[/ja]
 */

/**
 * @ngdoc method
 * @signature getPages()
 * @return {List}
 *   [en]List of page objects.[/en]
 *   [ja]pageオブジェクトの配列。[/ja]
 * @description
 *   [en]Retrieve the entire page stack of the navigator.[/en]
 *   [ja]ナビゲーターの持つページスタックの一覧を取得します。[/ja]
 */

/**
 * @ngdoc method
 * @signature getDeviceBackButtonHandler()
 * @return {Object}
 *   [en]Device back button handler.[/en]
 *   [ja]デバイスのバックボタンハンドラを返します。[/ja]
 * @description
 *   [en]Retrieve the back button handler for overriding the default behavior.[/en]
 *   [ja]バックボタンハンドラを取得します。デフォルトの挙動を変更することができます。[/ja]
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

  var lastReady = window.OnsNavigatorElement.ready;
  // wait for AngularJS binding initilization.
  window.OnsNavigatorElement.ready = function(element, callback) {
    if (angular.element(element).data('ons-navigator')) {
      lastReady(element, callback);
    } else {
      var listen = function() {
        lastReady(element, callback);
        element.removeEventListener('ons-navigator:init', listen, false);
      };
      element.addEventListener('ons-navigator:init', listen, false);
    }
  };

  angular.module('onsen').directive('onsNavigator', function(NavigatorView, $onsen) {
    return {
      restrict: 'E',

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclude.
      transclude: false,
      scope: true,

      compile: function(element) {
        CustomElements.upgrade(element[0]);

        return {
          pre: function(scope, element, attrs, controller) {
            CustomElements.upgrade(element[0]);
            var navigator = new NavigatorView(scope, element, attrs);

            $onsen.declareVarAttribute(attrs, navigator);
            $onsen.registerEventHandlers(navigator, 'prepush prepop postpush postpop init show hide destroy');

            element.data('ons-navigator', navigator);

            scope.$on('$destroy', function() {
              navigator._events = undefined;
              element.data('ons-navigator', undefined);
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
