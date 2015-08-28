/**
 * @ngdoc directive
 * @id splitter
 * @name ons-splitter
 * @category control
 * @description
 *  [en][/en]
 *  [ja]sliding-menuとsplit-view両方の機能を持つレイアウトです。[/ja]
 * @guide CallingComponentAPIsfromJavaScript
 *   [en]Using navigator from JavaScript[/en]
 *   [ja]JavaScriptからコンポーネントを呼び出す[/ja]
 * @example
 * <ons-splitter>
 *   <ons-splitter-content>
 *     ...
 *   </ons-splitter-content>
 *
 *   <ons-splitter-side side="left" width="80%" collapse>
 *     ...
 *   </ons-splitter-side>
 * </ons-splitter>
 */

/**
 * @ngdoc attribute
 * @name var
 * @type {String}
 * @description
 *   [en]Variable name to refer this split view.[/en]
 *   [ja]このスプリットビューコンポーネントを参照するための名前を指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-destroy
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "destroy" event is fired.[/en]
 *  [ja]"destroy"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc method
 * @signature openRight([options])
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {Function} [options.callback]
 *   [en]This function will be called after the menu has been opened.[/en]
 *   [ja]メニューが開いた後に呼び出される関数オブジェクトを指定します。[/ja]
 * @description
 *   [en]Open right ons-splitter-side menu on collapse mode.[/en]
 *   [ja]右のcollapseモードになっているons-splitter-side要素を開きます。[/ja]
 */

/**
 * @ngdoc method
 * @signature openLeft([options])
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {Function} [options.callback]
 *   [en]This function will be called after the menu has been opened.[/en]
 *   [ja]メニューが開いた後に呼び出される関数オブジェクトを指定します。[/ja]
 * @description
 *   [en]Open left ons-splitter-side menu on collapse mode.[/en]
 *   [ja]左のcollapseモードになっているons-splitter-side要素を開きます。[/ja]
 */
 
/**
 * @ngdoc method
 * @signature closeRight([options])
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {Function} [options.callback]
 *   [en]This function will be called after the menu has been closed.[/en]
 *   [ja]メニューが閉じた後に呼び出される関数オブジェクトを指定します。[/ja]
 * @description
 *   [en]Close right ons-splitter-side menu on collapse mode.[/en]
 *   [ja]右のcollapseモードになっているons-splitter-side要素を閉じます。[/ja]
 */

/**
 * @ngdoc method
 * @signature closeLeft([options])
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {Function} [options.callback]
 *   [en]This function will be called after the menu has been closed.[/en]
 *   [ja]メニューが閉じた後に呼び出される関数オブジェクトを指定します。[/ja]
 * @description
 *   [en]Close left ons-splitter-side menu on collapse mode.[/en]
 *   [ja]左のcollapseモードになっているons-splitter-side要素を閉じます。[/ja]
 */

/**
 * @ngdoc method
 * @signature loadContentPage(pageUrl)
 * @param {String} pageUrl
 *   [en]Page URL. Can be either an HTML document or an <code>&lt;ons-template&gt;</code>.[/en]
 *   [ja]pageのURLか、ons-templateで宣言したテンプレートのid属性の値を指定します。[/ja]
 * @description
 *   [en]Show the page specified in pageUrl in the ons-splitter-content pane.[/en]
 *   [ja]ons-splitter-content用紙に表示されるページをpageUrlに指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature loadContentPage(pageUrl)
 * @param {String} pageUrl
 *   [en]Page URL. Can be either an HTML document or an <code>&lt;ons-template&gt;</code>.[/en]
 *   [ja]pageのURLか、ons-templateで宣言したテンプレートのid属性の値を指定します。[/ja]
 * @description
 *   [en]Show the page specified in pageUrl in the ons-splitter-content pane.[/en]
 *   [ja]ons-splitter-content用紙に表示されるページをpageUrlに指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature isLeftOpened()
 * @return {Boolean}
 *   [en]Whether the left ons-splitter-side on collapse mode is opened.[/en]
 *   [ja]左のons-splitter-sideが開いているかどうかを返します。[/ja]
 * @description
 *   [en]Determines whether the left ons-splitter-side on collapse mode is opened.[/en]
 *   [ja]左のons-splitter-side要素が開いているかどうかを返します。[/ja]
 */

/**
 * @ngdoc method
 * @signature isRightOpened()
 * @return {Boolean}
 *   [en]Whether the right ons-splitter-side on collapse mode is opened.[/en]
 *   [ja]右のons-splitter-sideが開いているかどうかを返します。[/ja]
 * @description
 *   [en]Determines whether the right ons-splitter-side on collapse mode is opened.[/en]
 *   [ja]右のons-splitter-side要素が開いているかどうかを返します。[/ja]
 */

/**
 * @ngdoc method
 * @signature getDeviceBackButtonHandler()
 * @return {Object}
 *   [en]Device back-button handler.[/en]
 *   [ja]デバイスのバックボタンハンドラを返します。[/ja]
 * @description
 *   [en]Retrieve the back-button handler.[/en]
 *   [ja]ons-splitter要素に紐付いているバックボタンハンドラを取得します。[/ja]
 */

/**
 * @ngdoc method
 * @signature on(eventName, listener)
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

  angular.module('onsen').directive('onsSplitter', function($compile, Splitter, $onsen) {
    return {
      restrict: 'E',
      scope: true,

      compile: function(element, attrs) {
        CustomElements.upgrade(element[0]);

        return function(scope, element, attrs) {
          CustomElements.upgrade(element[0]);

          var splitter = new Splitter(scope, element, attrs);

          $onsen.declareVarAttribute(attrs, splitter);
          $onsen.registerEventHandlers(splitter, 'destroy');

          element.data('ons-splitter', splitter);

          scope.$on('$destroy', function() {
            splitter._events = undefined;
            element.data('ons-splitter', undefined);
          });

          $onsen.fireComponentEvent(element[0], 'init');
        };
      }
    };
  });
})();
