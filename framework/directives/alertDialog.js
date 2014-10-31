/**
 * @ngdoc directive
 * @id alert-dialog 
 * @name ons-alert-dialog
 * @description 
 *  [en]Alert dialog that is displayed on top of the current screen.[/en]
 *  [ja]現在のスクリーンにアラートダイアログを表示します。[/ja]
 * @param var 
 *  [en]Variable name to refer this alert dialog.[/en]
 *  [ja]このアラートダイアログを参照するための名前を指定します。[/ja]
 * @param modifier
 *  [en]The appearance of the dialog.[/en]
 *  [ja]ダイアログの表現を指定します。[/ja]
 * @param cancelable
 *  [en]If this attribute is set the dialog can be closed by tapping the background or pressing the back button.[/en] 
 *  [ja]この属性があると、ダイアログが表示された時に、背景やバックボタンをタップした時にダイアログを閉じます。[/ja]
 * @param disabled
 *  [en]If this attribute is set the dialog is disabled.[/en]
 *  [ja]この属性がある時、アラートダイアログはdisabled状態になります。[/ja]
 * @param animation
 *  [en]The animation used when showing an hiding the dialog. Can be either "none" or "default".[/en]
 *  [ja]ダイアログを表示する際のアニメーション名を指定します。[/ja]
 * @param mask-color
 *  [en]Color of the background mask. Default is "rgba(0, 0, 0, 0.2)".[/en]
 *  [ja]背景のマスクの色を指定します。デフォルトは"rgba(0, 0, 0, 0.2)"です。[/ja]
 * @property show(options)
 *  [en]Show the alert dialog.[/en]
 *  [ja]ダイアログを開きます。[/ja]
 * @property hide(options)
 *  [en]Hide the alert dialog.[/en]
 *  [ja]ダイアログを閉じます。[/ja]
 * @property isShown()
 *  [en]Returns whether the dialog is visible or not.[/en]
 *  [ja]ダイアログが表示されているかどうかを返します。[/ja]
 * @property destroy()
 *  [en]Destroy the alert dialog and remove it from the DOM tree.[/en]
 *  [ja]ダイアログを破棄して、DOMツリーから取り除きます。[/ja]
 * @property setCancelable(cancelable)
 *  [en]Define whether the dialog can be canceled by the user when it is shown.[/en]
 *  [ja]アラートダイアログを表示した際に、ユーザがそのダイアログをキャンセルできるかどうかを指定します。[/ja]
 * @property isCancelable()
 *  [en]Returns whether the dialog is cancelable or not.[/en]
 *  [ja]このアラートダイアログがキャンセル可能かどうかを返します。[/ja]
 * @property setDisabled(disabled)
 *  [en]Disable or enable the alert dialog.[/en]
 *  [ja]このアラートダイアログをdisabled状態にするかどうかを設定します。[/ja]
 * @property isDisabled()
 *  [en]Returns whether the dialog is disabled or enabled.[/en]
 *  [ja]このアラートダイアログがdisabled状態かどうかを返します。[/ja]
 * @property on(eventName,listener)
 *  [en]Add an event listener. Preset events are preshow, postshow, prehide and posthide.[/en]
 *  [ja]イベントリスナーを追加します。preshow, postshow, prehide, posthideを指定できます。[/ja]
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
 *      An error has occurred!
 *     </div>
 *     <div class="alert-dialog-footer">
 *       <button class="alert-dialog-button">OK</button>
 *     </div>
 *   </ons-alert-dialog>  
 * </script>
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
            $onsen.aliasStack.register('ons.alertDialog', alertDialog);
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
              $onsen.aliasStack.unregister('ons.alertDialog', alertDialog);
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
