/**
 * @ngdoc directive
 * @id toolbar_button
 * @name ons-toolbar-button
 * @description
 *  [en]Button component for ons-toolbar and ons-bottom-toolbar.[/en]
 *  [ja]ons-toolbarあるいはons-bottom-toolbarに設置できるボタン用コンポーネントです。[/ja]
 * @param modifier [en]Specify modifier name to specify custom styles.[/en][ja]スタイル定義をカスタマイズするための名前を指定します。[/ja]
 * @codepen aHmGL
 * @guide Addingatoolbar [en]Adding a toolbar[/en][ja]ツールバーの追加[/ja]
 * @seealso ons-toolbar [en]ons-toolbar component[/en][ja]ons-toolbarコンポーネント[/ja]
 * @seealso ons-back-button [en]ons-back-button component[/en][ja]ons-back-buttonコンポーネント[/ja]
 * @seealso ons-toolbar-button [en]ons-toolbar-button component[/en][ja]ons-toolbar-buttonコンポーネント[/ja]
 */
(function(){
  'use strict';
  var module = angular.module('onsen');

  module.directive('onsToolbarButton', function($onsen) {
    return {
      restrict: 'E',
      transclude: true,
      templateUrl: $onsen.DIRECTIVE_TEMPLATE_URL + '/toolbar_button.tpl',
      link: {
        pre: function(scope, element, attrs) {

          if (attrs.ngController) {
            throw new Error('This element can\'t accept ng-controller directive.');
          }

          scope.modifierTemplater = $onsen.generateModifierTemplater(attrs);

          $onsen.cleaner.onDestroy(scope, function() {
            $onsen.clearComponent({
              scope: scope,
              attrs: attrs,
              element: element,
            });
            scope = element = attrs = null;
          });
        }
      }
    };
  });
})();
