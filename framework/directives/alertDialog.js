/**
 * @ngdoc directive
 * @id alert-dialog 
 * @name ons-alert-dialog
 * @description 
 *  [en]Alert dialog that is displayed on top of current screen.[/en]
 *  [ja][/ja]
 * @param var 
 *  [en]Variable name to refer this alert dialog.[/en]
 *  [ja][/ja]
 * @param modifier
 *  [en]The appearance of the dialog.[/en]
 *  [ja]ダイアログの表現を指定します。[/ja]
 * @param cancelable
 *  [en]The dialog can be closed by tapping the background or pressing the back button.[/en] 
 *  [ja]この属性があると、ダイアログが表示された時に、背景やバックボタンをタップした時にダイアログを閉じます。[/ja]
 * @param animation
 *  [en]The animation used when showing an hiding the dialog. Can be either "none" or "default".[/en]
 *  [ja][/ja]
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
 *  [en]Returns "true" if the alert dialog is visible.[/en]
 *  [ja][/ja]
 * @property destroy()
 *  [en]Destroy the alert dialog.[/en]
 *  [ja][/ja]
 * @property setCancelable(cancelable)
 *  [en]Make the alert dialog cancelable.[/en]
 *  [ja][/ja]
 * @property isCancelable()
 *  [en]Returns "true" if the alert dialog is cancelable.[/en]
 *  [ja][/ja]
 * @property setDisabled(disabled)
 *  [en]Make the alert dialog disabled.[/en]
 *  [ja][/ja]
 * @property isDisabled()
 *  [en]Returns "true" if the alert dialog is disabled.[/en]
 *  [ja][/ja]
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

        return {
          pre: function(scope, element, attrs) {
            var alertDialog = new AlertDialogView(scope, element, attrs);

            $onsen.declareVarAttribute(attrs, alertDialog);
            $onsen.aliasStack.register('ons.alertDialog', alertDialog);
            element.data('ons-alert-dialog', alertDialog);

            scope.$on('$destroy', function() {
              alertDialog._events = undefined;
              element.data('ons-alert-dialog', undefined);
              $onsen.aliasStack.unregister('ons.alertDialog', alertDialog);

              element = null;
            });
          },

          post: function(scope, element) {
            $onsen.fireComponentEvent(element[0], "init");
          }
        };
      }
    };
  });

})();
