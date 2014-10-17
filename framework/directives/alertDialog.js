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
 * @example
 * <ons-alert-dialog>
 *   ...
 * </ons-alert-dialog>
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

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclde.
      scope: false, 
      transclude: false,

      compile: function(element, attrs) {
        var modifierTemplater = $onsen.generateModifierTemplater(attrs);

        element.addClass(modifierTemplater('alert-dialog--*'));

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
