/**
 * @ngdoc directive
 * @id floating-menu
 * @name ons-floating-menu
 * @category floating-menu
 * @description
 *  [en]A component that displays a floating menu on top of an element.[/en]
 *  [ja]ある要素を対象とするメニューを表示するコンポーネントです。[/ja]
 * @codepen ZYYRKo
 * @example
 * <script>
 * ons.ready(function() {
 *   ons.createFloatingMenu('floatingMenu.html').then(function(floatingMenu) {
 *     floatingMenu.show('#mybutton');   
 *   });
 * });
 * </script>
 *
 * <script type="text/ons-template" id="floatingMenu.html">
 *   <ons-floating-menu cancelable>
 *     <ons-floating-menu-item>Item 1</ons-floating-menu-item>
 *     <ons-floating-menu-item>Item 2</ons-floating-menu-item>
 *   </ons-floating-menu>
 * </script>
 */

/**
 * @ngdoc event
 * @name preshow
 * @description
 *   [en]Fired just before the floating menu is displayed.[/en]
 *   [ja]メニューが表示される直前に発火します。[/ja]
 * @param {Object} event [en]Event object.[/en]
 * @param {Object} event.floatingMenu
 *   [en]Component object.[/en]
 *   [ja]コンポーネントのオブジェクト。[/ja]
 * @param {Function} event.cancel 
 *   [en]Call this function to stop the floating menu from being shown.[/en]
 *   [ja]この関数を呼び出すと、メニューの表示がキャンセルされます。[/ja]
 */

/**
 * @ngdoc event
 * @name postshow
 * @description
 *   [en]Fired just after the floating menu is displayed.[/en]
 *   [ja]メニューが表示された直後に発火します。[/ja]
 * @param {Object} event [en]Event object.[/en]
 * @param {Object} event.floatingMenu
 *   [en]Component object.[/en]
 *   [ja]コンポーネントのオブジェクト。[/ja]
 */

/**
 * @ngdoc event
 * @name prehide
 * @description
 *   [en]Fired just before the floating menu is hidden.[/en]
 *   [ja]メニューが隠れる直前に発火します。[/ja]
 * @param {Object} event [en]Event object.[/en]
 * @param {Object} event.floatingMenu
 *   [en]Component object.[/en]
 *   [ja]コンポーネントのオブジェクト。[/ja]
 * @param {Function} event.cancel 
 *   [en]Call this function to stop the floating menu from being hidden.[/en]
 *   [ja]この関数を呼び出すと、メニューが隠れる処理をキャンセルします。[/ja]
 */

/**
 * @ngdoc event
 * @name posthide
 * @description
 *   [en]Fired just after the floating menu is hidden.[/en]
 *   [ja]メニューが隠れた後に発火します。[/ja]
 * @param {Object} event [en]Event object.[/en]
 * @param {Object} event.floatingMenu
 *   [en]Component object.[/en]
 *   [ja]コンポーネントのオブジェクト。[/ja]
 */


/**
 * @ngdoc attribute
 * @name var
 * @type {String}
 * @description
 *  [en]Variable name to refer this floating menu.[/en]
 *  [ja]このメニューを参照するための名前を指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name direction
 * @type {String}
 * @description
 *  [en]
 *    A space separated list of directions. If more than one direction is specified,
 *    it will be chosen automatically. Valid directions are "up", "down", "left" and "right".
 *  [/en]
 *  [ja]
 *    メニューを表示する方向を空白区切りで複数指定できます。
 *    指定できる方向は、"up", "down", "left", "right"の4つです。空白区切りで複数指定することもできます。
 *    複数指定された場合、対象とする要素に合わせて指定した値から自動的に選択されます。
 *  [/ja]
 */

/**
 * @ngdoc attribute
 * @name cancelable
 * @description
 *   [en]If this attribute is set the floating menu can be closed by tapping the background or by pressing the back button.[/en]
 *   [ja]この属性があると、メニューが表示された時に、背景やバックボタンをタップした時にをメニュー閉じます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name disabled
 * @description
 *   [en]If this attribute is set the floating menu is disabled.[/en]
 *   [ja]この属性がある時、メニューはdisabled状態になります。[/ja]
 */

/**
 * @ngdoc attribute
 * @name animation
 * @type {String}
 * @description
 *   [en]The animation used when showing an hiding the floating menu. Can be either "none" or "fade".[/en]
 *   [ja]メニューを表示する際のアニメーション名を指定します。[/ja]
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
 * @name ons-preshow
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "preshow" event is fired.[/en]
 *  [ja]"preshow"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-prehide
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "prehide" event is fired.[/en]
 *  [ja]"prehide"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-postshow
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "postshow" event is fired.[/en]
 *  [ja]"postshow"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-posthide
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "posthide" event is fired.[/en]
 *  [ja]"posthide"イベントが発火された時の挙動を独自に指定できます。[/ja]
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
 * @signature show(target, [options])
 * @param {String|Event|HTMLElement} target
 *   [en]Target element. Can be either a CSS selector, an event object or a DOM element.[/en]
 *   [ja]メニューのターゲットとなる要素を指定します。CSSセレクタかeventオブジェクトかDOM要素のいずれかを渡せます。[/ja]
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {String} [options.animationOptions]
 *   [en]Specify the animation's duration, delay and timing. E.g.  <code>{duration: 0.2, delay: 0.4, timing: 'ease-in'}</code>[/en]
 *   [ja]アニメーション時のduration, delay, timingを指定します。e.g. <code>{duration: 0.2, delay: 0.4, timing: 'ease-in'}</code> [/ja]
 * @description
 *   [en]Open the floating menu and point it at a target. The target can be either an event, a css selector or a DOM element..[/en]
 *   [ja]対象とする要素にメニューを表示します。target引数には、$eventオブジェクトやDOMエレメントやCSSセレクタを渡すことが出来ます。[/ja]
 */

/**
 * @ngdoc method
 * @signature hide([options])
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @description
 *   [en]Close the floating menu.[/en]
 *   [ja]メニューを閉じます。[/ja]
 */

/**
 * @ngdoc method
 * @signature isShown()
 * @return {Boolean}
 *   [en]true if the floating menu is visible.[/en]
 *   [ja]メニューが表示されている場合にtrueとなります。[/ja]
 * @description
 *   [en]Returns whether the floating menu is visible or not.[/en]
 *   [ja]メニューが表示されているかどうかを返します。[/ja]
 */

/**
 * @ngdoc method
 * @signature destroy()
 * @description
 *   [en]Destroy the floating menu and remove it from the DOM tree.[/en]
 *   [ja]メニューを破棄して、DOMツリーから取り除きます。[/ja]
 */

/**
 * @ngdoc method
 * @signature setCancelable(cancelable)
 * @param {Boolean} cancelable
 *   [en]If true the floating menu will be cancelable.[/en]
 *   [ja]メニューがキャンセル可能にしたい場合にtrueを指定します。[/ja]
 * @description
 *   [en]Set whether the floating menu can be canceled by the user when it is shown.[/en]
 *   [ja]メニューを表示した際に、ユーザがそのメニューをキャンセルできるかどうかを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature isCancelable()
 * @return {Boolean}
 *   [en]true if the floating menu is cancelable.[/en]
 *   [ja]メニューがキャンセル可能であればtrueとなります。[/ja]
 * @description
 *   [en]Returns whether the floating menu is cancelable or not.[/en]
 *   [ja]このメニューがキャンセル可能かどうかを返します。[/ja]
 */

/**
 * @ngdoc method
 * @signature setDisabled(disabled)
 * @param {Boolean} disabled
 *   [en]If true the floating menu will be disabled.[/en]
 *   [ja]メニューをdisabled状態にしたい場合にはtrueを指定します。[/ja]
 * @description
 *   [en]Disable or enable the floating menu.[/en]
 *   [ja]このメニューをdisabled状態にするかどうかを設定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature isDisabled()
 * @return {Boolean}
 *   [en]true if the floating menu is disabled.[/en]
 *   [ja]メニューがdisabled状態であればtrueとなります。[/ja]
 * @description
 *   [en]Returns whether the floating menu is disabled or enabled.[/en]
 *   [ja]このメニューがdisabled状態かどうかを返します。[/ja]
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

(function(){
  'use strict';

  var module = angular.module('onsen');

  module.directive('onsFloatingMenu', function($onsen, FloatingMenuView) {
    return {
      restrict: 'E',
      replace: false,
      scope: true,
      compile: function(element, attrs) {
        CustomElements.upgrade(element[0]);
        return {
          pre: function(scope, element, attrs) {
            CustomElements.upgrade(element[0]);

            var floatingMenu = new FloatingMenuView(scope, element, attrs);

            $onsen.declareVarAttribute(attrs, floatingMenu);
            $onsen.registerEventHandlers(floatingMenu, 'preshow prehide postshow posthide destroy');
            $onsen.addModifierMethodsForCustomElements(floatingMenu, element);

            element.data('ons-floating-menu', floatingMenu);

            scope.$on('$destroy', function() {
              floatingMenu._events = undefined;
              $onsen.removeModifierMethods(floatingMenu);
              element.data('ons-floating-menu', undefined);
              element = null;
            });
          },
          post: function(scope, element) {
            $onsen.fireComponentEvent(element[0], 'init');
          }
        };
      }
    };
  });
})();

