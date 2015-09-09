/**
 * @ngdoc directive
 * @id back_button
 * @name ons-back-button
 * @category toolbar
 * @description
 *   [en]Back button component for ons-toolbar. Can be used with ons-navigator to provide back button support.[/en]
 *   [ja]ons-toolbarに配置できる「戻るボタン」用コンポーネントです。ons-navigatorと共に使用し、ページを1つ前に戻る動作を行います。[/ja]
 * @codepen aHmGL
 * @seealso ons-toolbar 
 *   [en]ons-toolbar component[/en]
 *   [ja]ons-toolbarコンポーネント[/ja]
 * @seealso ons-navigator
 *   [en]ons-navigator component[/en]
 *   [ja]ons-navigatorコンポーネント[/en]
 * @guide Addingatoolbar 
 *   [en]Adding a toolbar[/en]
 *   [ja]ツールバーの追加[/ja]
 * @guide Returningfromapage 
 *   [en]Returning from a page[/en]
 *   [ja]一つ前のページに戻る[/ja]
 * @example
 * <ons-back-button>
 *   Back
 * </ons-back-button>
 */
(function(){
  'use strict';
  var module = angular.module('onsen');

  module.directive('onsBackButton', function($onsen, $compile, GenericView, ComponentCleaner) {
    return {
      restrict: 'E',
      replace: false,

      compile: function(element, attrs) {
        CustomElements.upgrade(element[0]);

        return {
          pre: function(scope, element, attrs, controller, transclude) {
            CustomElements.upgrade(element[0]);
            var backButton = GenericView.register(scope, element, attrs, {
              viewKey: 'ons-back-button'
            });

            scope.$on('$destroy', function() {
              backButton._events = undefined;
              $onsen.removeModifierMethods(backButton);
              element = null;
            });

            ComponentCleaner.onDestroy(scope, function() {
              ComponentCleaner.destroyScope(scope);
              ComponentCleaner.destroyAttributes(attrs);
              element = scope = attrs = null;
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
