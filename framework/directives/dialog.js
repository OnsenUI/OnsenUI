/**
 * @ngdoc directive
 * @id dialog
 * @name ons-dialog
 * @category dialog
 * @description
 *  [en]Dialog that is displayed on top of current screen.[/en]
 *  [ja]現在のスクリーンにダイアログを表示します。[/ja]
 * @codepen zxxaGa
 * @guide UsingDialog
 *   [en]Learn how to use the dialog component.[/en]
 *   [ja]ダイアログコンポーネントの使い方[/ja]
 * @seealso ons-alert-dialog
 *   [en]ons-alert-dialog component[/en]
 *   [ja]ons-alert-dialogコンポーネント[/ja]
 * @seealso ons-popover
 *   [en]ons-popover component[/en]
 *   [ja]ons-popoverコンポーネント[/ja]
 * @example
 * <script>
 *   ons.ready(function() {
 *     ons.createDialog('dialog.html').then(function(dialog) {
 *       dialog.show();
 *     });
 *   });
 * </script>
 *
 * <script type="text/ons-template" id="dialog.html">
 *   <ons-dialog cancelable>
 *     ...
 *   </ons-dialog>
 * </script>
 */

/**
 * @ngdoc event
 * @name preshow
 * @description
 * [en]Fired just before the dialog is displayed.[/en]
 * [ja]ダイアログが表示される直前に発火します。[/ja]
 * @param {Object} event [en]Event object.[/en]
 * @param {Object} event.dialog
 *   [en]Component object.[/en]
 *   [ja]コンポーネントのオブジェクト。[/ja]
 * @param {Function} event.cancel 
 *   [en]Execute this function to stop the dialog from being shown.[/en]
 *   [ja]この関数を実行すると、ダイアログの表示がキャンセルされます。[/ja]
 */

/**
 * @ngdoc event
 * @name postshow
 * @description
 * [en]Fired just after the dialog is displayed.[/en]
 * [ja]ダイアログが表示された直後に発火します。[/ja]
 * @param {Object} event [en]Event object.[/en]
 * @param {Object} event.dialog
 *   [en]Component object.[/en]
 *   [ja]コンポーネントのオブジェクト。[/ja]
 */

/**
 * @ngdoc event
 * @name prehide
 * @description
 * [en]Fired just before the dialog is hidden.[/en]
 * [ja]ダイアログが隠れる直前に発火します。[/ja]
 * @param {Object} event [en]Event object.[/en]
 * @param {Object} event.dialog
 *   [en]Component object.[/en]
 *   [ja]コンポーネントのオブジェクト。[/ja]
 * @param {Function} event.cancel 
 *   [en]Execute this function to stop the dialog from being hidden.[/en]
 *   [ja]この関数を実行すると、ダイアログの非表示がキャンセルされます。[/ja]
 */

/**
 * @ngdoc event
 * @name posthide
 * @description
 * [en]Fired just after the dialog is hidden.[/en]
 * [ja]ダイアログが隠れた後に発火します。[/ja]
 * @param {Object} event [en]Event object.[/en]
 * @param {Object} event.dialog
 *   [en]Component object.[/en]
 *   [ja]コンポーネントのオブジェクト。[/ja]
 */

/**
 * @ngdoc attribute
 * @name var
 * @type {String}
 * @description
 *  [en]Variable name to refer this dialog.[/en]
 *  [ja]このダイアログを参照するための名前を指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name modifier
 * @type {String}
 * @description
 *  [en]The appearance of the dialog.[/en]
 *  [ja]ダイアログの表現を指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name cancelable
 * @description
 *  [en]If this attribute is set the dialog can be closed by tapping the background or by pressing the back button.[/en]
 *  [ja]この属性があると、ダイアログが表示された時に、背景やバックボタンをタップした時にダイアログを閉じます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name disabled
 * @description
 *  [en]If this attribute is set the dialog is disabled.[/en]
 *  [ja]この属性がある時、ダイアログはdisabled状態になります。[/ja]
 */

/**
 * @ngdoc attribute
 * @name animation
 * @type {String}
 * @default default
 * @description
 *  [en]The animation used when showing and hiding the dialog. Can be either "none" or "default".[/en]
 *  [ja]ダイアログを表示する際のアニメーション名を指定します。"none"もしくは"default"を指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name mask-color
 * @type {String}
 * @default rgba(0, 0, 0, 0.2)
 * @description
 *  [en]Color of the background mask. Default is "rgba(0, 0, 0, 0.2)".[/en]
 *  [ja]背景のマスクの色を指定します。"rgba(0, 0, 0, 0.2)"がデフォルト値です。[/ja]
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
 * @signature show([options])
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {String} [options.animation]
 *   [en]Animation name. Available animations are "none", "fade" and "slide".[/en]
 *   [ja]アニメーション名を指定します。"none", "fade", "slide"のいずれかを指定します。[/ja]
 * @param {Function} [options.callback]
 *   [en]This function is called after the dialog has been revealed.[/en]
 *   [ja]ダイアログが表示され終わった後に呼び出される関数オブジェクトを指定します。[/ja]
 * @description
 *  [en]Show the dialog.[/en]
 *  [ja]ダイアログを開きます。[/ja]
 */

/**
 * @ngdoc method
 * @signature hide([options])
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {String} [options.animation]
 *   [en]Animation name. Available animations are "none", "fade" and "slide".[/en]
 *   [ja]アニメーション名を指定します。"none", "fade", "slide"のいずれかを指定できます。[/ja]
 * @param {Function} [options.callback]
 *   [en]This functions is called after the dialog has been hidden.[/en]
 *   [ja]ダイアログが隠れた後に呼び出される関数オブジェクトを指定します。[/ja]
 * @description
 *   [en]Hide the dialog.[/en]
 *   [ja]ダイアログを閉じます。[/ja]
 */

/**
 * @ngdoc method
 * @signature isShown()
 * @description
 *   [en]Returns whether the dialog is visible or not.[/en]
 *   [ja]ダイアログが表示されているかどうかを返します。[/ja]
 * @return {Boolean}
 *   [en]true if the dialog is visible.[/en]
 *   [ja]ダイアログが表示されている場合にtrueを返します。[/ja]
 */

/**
 * @ngdoc method
 * @signature destroy()
 * @description
 *  [en]Destroy the dialog and remove it from the DOM tree.[/en]
 *  [ja]ダイアログを破棄して、DOMツリーから取り除きます。[/ja]
 */

/**
 * @ngdoc method
 * @signature getDeviceBackButtonHandler()
 * @return {Object}
 *   [en]Device back button handler.[/en]
 *   [ja][/ja]
 * @description
 *   [en]Retrieve the back button handler for overriding the default behavior.[/en]
 *   [ja]バックボタンハンドラを取得します。デフォルトの挙動を変更することができます。[/ja]
 */

/**
 * @ngdoc method
 * @signature setCancelable(cancelable)
 * @param {Boolean} cancelable
 *   [en]If true the dialog will be cancelable.[/en]
 *   [ja]ダイアログをキャンセル可能にする場合trueを指定します。[/ja]
 * @description
 *   [en]Define whether the dialog can be canceled by the user or not.[/en]
 *   [ja]ダイアログを表示した際に、ユーザがそのダイアログをキャンセルできるかどうかを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature isCancelable()
 * @description
 *   [en]Returns whether the dialog is cancelable or not.[/en]
 *   [ja]このダイアログがキャンセル可能かどうかを返します。[/ja]
 * @return {Boolean}
 *   [en]true if the dialog is cancelable.[/en]
 *   [ja][/ja]
 */

/**
 * @ngdoc method
 * @signature setDisabled(disabled)
 * @description
 *   [en]Disable or enable the dialog.[/en]
 *   [ja]このダイアログをdisabled状態にするかどうかを設定します。[/ja]
 * @param {Boolean} disabled
 *   [en]If true the dialog will be disabled.[/en]
 *   [ja][/ja]
 */

/**
 * @ngdoc method
 * @signature isDisabled()
 * @description
 *   [en]Returns whether the dialog is disabled or enabled.[/en]
 *   [ja]このダイアログがdisabled状態かどうかを返します。[/ja]
 * @return {Boolean}
 *   [en]true if the dialog is disabled.[/en]
 *   [ja][/ja]
 */

/**
 * @ngdoc method
 * @signature on(eventName, listener)
 * @description
 *   [en]Add an event listener.[/en]
 *   [ja]イベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja][/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja][/ja]
 */

/**
 * @ngdoc method
 * @signature once(eventName, listener)
 * @description
 *  [en]Add an event listener that's only triggered once.[/en]
 *  [ja]一度だけ呼び出されるイベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja][/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja][/ja]
 */

/**
 * @ngdoc method
 * @signature off(eventName, [listener])
 * @description
 *  [en]Remove an event listener. If the listener is not specified all listeners for the event type will be removed.[/en]
 *  [ja]イベントリスナーを削除します。もしイベントリスナーを指定しなかった場合、そのイベントに紐付けられている全てのイベントリスナーが削除されます。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja][/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja][/ja]
 */

(function() {
  'use strict';

  var module = angular.module('onsen');

  /**
   * Dialog directive.
   */
  module.directive('onsDialog', function($onsen, DialogView) {
    return {
      restrict: 'E',
      replace: false,
      scope: true,
      transclude: true,
      templateUrl: $onsen.DIRECTIVE_TEMPLATE_URL + '/dialog.tpl',
      compile: function(element, attrs, transclude) {
        element[0].setAttribute('no-status-bar-fill', '');
        return {
          pre: function(scope, element, attrs) {
            transclude(scope, function(clone) {
              angular.element(element[0].querySelector('.dialog')).append(clone);
            });

            var dialog = new DialogView(scope, element, attrs);
            scope.modifierTemplater = $onsen.generateModifierTemplater(attrs);

            $onsen.addModifierMethods(dialog, 'dialog--*', angular.element(element[0].querySelector('.dialog')));
            $onsen.declareVarAttribute(attrs, dialog);
            $onsen.registerEventHandlers(dialog, 'preshow prehide postshow posthide destroy');

            element.data('ons-dialog', dialog);
            scope.$on('$destroy', function() {
              dialog._events = undefined;
              $onsen.removeModifierMethods(dialog);
              element.data('ons-dialog', undefined);
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
