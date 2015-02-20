
/**
 * @ngdoc directive
 * @id alert-dialog 
 * @name ons-alert-dialog
 * @modifier android
 *   [en]Display an Android style alert dialog.[/en]
 *   [ja][/ja]
 * @description 
 *   [en]Alert dialog that is displayed on top of the current screen.[/en]
 *   [ja]現在のスクリーンにアラートダイアログを表示します。[/ja]
 * @codepen Qwwxyp
 * @guide UsingAlert
 *   [en]Learn how to use the alert dialog.[/en]
 *   [ja][/ja]
 * @seealso ons-dialog
 *   [en]ons-dialog component[/en]
 *   [ja]ons-dialogコンポーネント[/ja]
 * @seealso ons-popover
 *   [en]ons-popover component[/en]
 *   [ja]ons-dialogコンポーネント[/ja]
 * @seealso ons.notification
 *   [en]Using ons.notification utility functions.[/en]
 *   [ja][/ja]
 * @example
 * <script>
 *   ons.ready(function() {
 *     ons.createAlertDialog('alert.html').then(function(alertDialog) {
 *       alertDialog.show();   
 *     });
 *   });
 * </script>
 *
 * <script type="text/ons-template" id="alert.html">
 *   <ons-alert-dialog animation="default" cancelable>
 *     <div class="alert-dialog-title">Warning!</div>
 *     <div class="alert-dialog-content">
 *       An error has occurred!
 *     </div>
 *     <div class="alert-dialog-footer">
 *       <button class="alert-dialog-button">OK</button>
 *     </div>
 *   </ons-alert-dialog>  
 * </script>
 */

/**
 * @ngdoc event
 * @name preshow
 * @description
 * [en]Fired just before the alert dialog is displayed.[/en]
 * [ja]アラートダイアログが表示される直前に発火します。[/ja]
 * @param {Object} event [en]Event object.[/en]
 * @param {Object} event.alertDialog
 * @param {Function} event.cancel 
 */

/**
 * @ngdoc event
 * @name postshow
 * @description
 * [en]Fired just after the alert dialog is displayed.[/en]
 * [ja]アラートダイアログが表示された直後に発火します。[/ja]
 * @param {Object} event [en]Event object.[/en]
 * @param {Object} event.alertDialog
 */

/**
 * @ngdoc event
 * @name prehide
 * @description
 * [en]Fired just before the alert dialog is hidden.[/en]
 * [ja]アラートダイアログが隠れる直前に発火します。[/ja]
 * @param {Object} event [en]Event object.[/en]
 * @param {Object} event.alertDialog
 * @param {Function} event.cancel 
 */

/**
 * @ngdoc event
 * @name posthide
 * @description
 * [en]Fired just after the alert dialog is hidden.[/en]
 * [ja]アラートダイアログが隠れた後に発火します。[/ja]
 * @param {Object} event [en]Event object.[/en]
 * @param {Object} event.alertDialog
 */

/**
 * @ngdoc attribute
 * @name var
 * @type {String}
 * @description
 *  [en]Variable name to refer this alert dialog.[/en]
 *  [ja]このアラートダイアログを参照するための名前を指定します。[/ja]
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
 *  [ja]この属性がある時、アラートダイアログはdisabled状態になります。[/ja]
 */

/**
 * @ngdoc attribute
 * @name animation
 * @type {String}
 * @default default
 * @description
 *  [en]The animation used when showing and hiding the dialog. Can be either "none" or "default".[/en]
 *  [ja]ダイアログを表示する際のアニメーション名を指定します。デフォルトでは"none"か"default"が指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name mask-color
 * @type {String}
 * @default rgba(0, 0, 0, 0.2)
 * @description
 *  [en]Color of the background mask. Default is "rgba(0, 0, 0, 0.2)".[/en]
 *  [ja]背景のマスクの色を指定します。デフォルトは"rgba(0, 0, 0, 0.2)"です。[/ja]
 */

/**
 * @ngdoc method
 * @signature show([options])
 * @param {Object} [options]
 * @param {String} [options.animation]
 * @param {Function} [options.callback]
 * @description
 *  [en]Show the alert dialog.[/en]
 *  [ja]ダイアログを開きます。[/ja]
 */

/**
 * @ngdoc method
 * @signature hide([options])
 * @param {Object} [options]
 * @param {String} [options.animation]
 * @param {Function} [options.callback]
 * @description
 *  [en]Hide the alert dialog.[/en]
 *  [ja]ダイアログを閉じます。[/ja]
 */

/**
 * @ngdoc method
 * @signature isShown()
 * @description
 *  [en]Returns whether the dialog is visible or not.[/en]
 *  [ja]ダイアログが表示されているかどうかを返します。[/ja]
 * @return {Boolean}
 */

/**
 * @ngdoc method
 * @signature destroy()
 * @description
 *  [en]Destroy the alert dialog and remove it from the DOM tree.[/en]
 *  [ja]ダイアログを破棄して、DOMツリーから取り除きます。[/ja]
 */

/**
 * @ngdoc method
 * @signature setCancelable(cancelable)
 * @description
 *  [en]Define whether the dialog can be canceled by the user or not.[/en]
 *  [ja]アラートダイアログを表示した際に、ユーザがそのダイアログをキャンセルできるかどうかを指定します。[/ja]
 * @param {Boolean} cancelable
 */

/**
 * @ngdoc method
 * @signature isCancelable()
 * @description
 *  [en]Returns whether the dialog is cancelable or not.[/en]
 *  [ja]このアラートダイアログがキャンセル可能かどうかを返します。[/ja]
 * @return {Boolean}
 */

/**
 * @ngdoc method
 * @signature setDisabled(disabled)
 * @description
 *  [en]Disable or enable the alert dialog.[/en]
 *  [ja]このアラートダイアログをdisabled状態にするかどうかを設定します。[/ja]
 * @param {Boolean} disabled
 */

/**
 * @ngdoc method
 * @signature isDisabled()
 * @description
 *  [en]Returns whether the dialog is disabled or enabled.[/en]
 *  [ja]このアラートダイアログがdisabled状態かどうかを返します。[/ja]
 * @return {Boolean}
 */

/**
 * @ngdoc method
 * @signature on(eventName, listener)
 * @description
 *  [en]Add an event listener.[/en]
 *  [ja]イベントリスナーを追加します。[/ja]
 * @param {String} eventName
 * @param {Function} listener
 */

/**
 * @ngdoc method
 * @signature once(eventName, listener)
 * @description
 *  [en]Add an event listener that's only triggered once.[/en]
 *  [ja][/ja]
 * @param {String} eventName
 * @param {Function} listener
 */

/**
 * @ngdoc method
 * @signature off(eventName, [listener])
 * @description
 *  [en]Remove an event listener. If the listener is not specified all listeners for the event type will be removed.[/en]
 *  [ja][/ja]
 * @param {String} eventName
 * @param {Function} [listener]
 */

(function() {
  'use strict';

  var module = angular.module('onsen');

  /**
   * Alert dialog directive.
   */
  module.directive('onsAlertDialog', function($onsen, AlertDialogView) {
    return {
      restrict: 'E',
      replace: false,
      scope: true,
      transclude: false,

      compile: function(element, attrs) {
        var modifierTemplater = $onsen.generateModifierTemplater(attrs);
 
        element.addClass('alert-dialog ' + modifierTemplater('alert-dialog--*'));
       
        var titleElement = angular.element(element[0].querySelector('.alert-dialog-title')),
          contentElement = angular.element(element[0].querySelector('.alert-dialog-content'));

        if (titleElement.length) {
          titleElement.addClass(modifierTemplater('alert-dialog-title--*'));
        }

        if (contentElement.length) {
          contentElement.addClass(modifierTemplater('alert-dialog-content--*'));
        }

        return {
          pre: function(scope, element, attrs) {
            var alertDialog = new AlertDialogView(scope, element, attrs);

            $onsen.declareVarAttribute(attrs, alertDialog);
            $onsen.addModifierMethods(alertDialog, 'alert-dialog--*', element);

            if (titleElement.length) {
              $onsen.addModifierMethods(alertDialog, 'alert-dialog-title--*', titleElement);
            }
            if (contentElement.length) {
              $onsen.addModifierMethods(alertDialog, 'alert-dialog-content--*', contentElement);
            }
            if ($onsen.isAndroid()) {
              alertDialog.addModifier('android');
            }

            element.data('ons-alert-dialog', alertDialog);
            scope.$on('$destroy', function() {
              alertDialog._events = undefined;
              $onsen.removeModifierMethods(alertDialog);
              element.data('ons-alert-dialog', undefined);
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
