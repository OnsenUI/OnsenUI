/**
 * @ngdoc directive
 * @id dialog 
 * @name ons-dialog
 * @description 
 *  [en]Dialog that is displayed on top of current screen.[/en]
 *  [ja]現在のスクリーンにダイアログを表示します。[/ja]
 * @param var 
 *  [en]Variable name to refer this dialog.[/en]
 *  [ja]このダイアログを参照するための名前を指定します。[/ja]
 * @param modifier
 *  [en]The appearance of the dialog.[/en]
 *  [ja]ダイアログの表現を指定します。[/ja]
 * @param cancelable
 *  [en]If this attribute is set the dialog can be closed by tapping the background or pressing the back button.[/en] 
 *  [ja]この属性があると、ダイアログが表示された時に、背景やバックボタンをタップした時にダイアログを閉じます。[/ja]
 * @param disabled
 *  [en]If this attribute is set the dialog is disabled.[/en]
 *  [ja]この属性がある時、ダイアログはdisabled状態になります。[/ja]
 * @param animation
 *  [en]The animation used when showing and hiding the dialog. Can be either "none" or "default".[/en]
 *  [ja]ダイアログを表示する際のアニメーション名を指定します。[/ja]
 * @param mask-color
 *  [en]Color of the background mask. Default is "rgba(0, 0, 0, 0.2)".[/en]
 *  [ja]背景のマスクの色を指定します。デフォルトは"rgba(0, 0, 0, 0.2)"です。[/ja]
 * @property show(options)
 *  [en]Show the dialog.[/en]
 *  [ja]ダイアログを開きます。[/ja]
 * @property hide(options)
 *  [en]Hide the dialog.[/en]
 *  [ja]ダイアログを閉じます。[/ja]
 * @property isShown()
 *  [en]Returns whether the dialog is visible or not.[/en]
 *  [ja]ダイアログが表示されているかどうかを返します。[/ja]
 * @property destroy()
 *  [en]Destroy the dialog and remove it from the DOM tree.[/en]
 *  [ja]ダイアログを破棄して、DOMツリーから取り除きます。[/ja]
 * @property getDeviceBackButtonHandler()
 *  [en]Retrieve the back button handler for overriding the default behavior.[/en]
 *  [ja]バックボタンハンドラを取得します。デフォルトの挙動を変更することができます。[/ja]
 * @property setCancelable(cancelable)
 *  [en]Set whether the dialog can be canceled by the user or not.[/en]
 *  [ja]ダイアログを表示した際に、ユーザがそのダイアログをキャンセルできるかどうかを指定します。[/ja]
 * @property isCancelable()
 *  [en]Returns whether the dialog is cancelable or not.[/en]
 *  [ja]このダイアログがキャンセル可能かどうかを返します。[/ja]
 * @property setDisabled(disabled)
 *  [en]Disable or enable the dialog.[/en]
 *  [ja]このダイアログをdisabled状態にするかどうかを設定します。[/ja]
 * @property isDisabled()
 *  [en]Returns whether the dialog is disabled or enabled.[/en]
 *  [ja]このダイアログがdisabled状態かどうかを返します。[/ja]
 * @property getDeviceBackButtonHandler()
 *  [en]Retrieve the back button handler for overriding the default behavior.[/en]
 *  [ja]バックボタンハンドラを取得します。デフォルトの挙動を変更することができます。[/ja]
 * @property on(eventName,listener)
 *  [en]Add an event listener. Preset events are preshow, postshow, prehide and posthide.[/en]
 *  [ja]イベントリスナーを追加します。preshow, postshow, prehide, posthideを指定できます。[/ja]
 * @codepen zxxaGa
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
