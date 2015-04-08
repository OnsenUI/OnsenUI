/**
 * @ngdoc directive
 * @id bottom_toolbar
 * @name ons-bottom-toolbar
 * @category toolbar
 * @description
 *   [en]Toolbar component that is positioned at the bottom of the page.[/en]
 *   [ja]ページ下部に配置されるツールバー用コンポーネントです。[/ja]
 * @modifier transparent
 *   [en]Make the toolbar transparent.[/en]
 *   [ja]ツールバーの背景を透明にして表示します。[/ja]
 * @seealso ons-toolbar [en]ons-toolbar component[/en][ja]ons-toolbarコンポーネント[/ja]
 * @guide Addingatoolbar
 *   [en]Adding a toolbar[/en]
 *   [ja]ツールバーの追加[/ja]
 * @example
 * <ons-bottom-toolbar>
 *   <div style="text-align: center; line-height: 44px">Text</div>
 * </ons-bottom-toolbar>
 */

/**
 * @ngdoc attribute
 * @name modifier
 * @type {String}
 * @description
 *   [en]The appearance of the toolbar.[/en]
 *   [ja]ツールバーの見た目の表現を指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name inline
 * @description
 *   [en]Display the toolbar as an inline element.[/en]
 *   [ja]この属性があると、ツールバーを画面下部ではなくスクロール領域内にそのまま表示します。[/ja]
 */

(function(){
  'use strict';

  var module = angular.module('onsen');

  module.directive('onsBottomToolbar', function($onsen, GenericView) {
    return {
      restrict: 'E',
      replace: false,

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclde.
      transclude: false,
      scope: false,
      compile: function(element, attrs) {
        var modifierTemplater = $onsen.generateModifierTemplater(attrs),
          inline = typeof attrs.inline !== 'undefined';

        element.addClass(modifierTemplater('bottom-bar--*'));

        return {
          pre: function(scope, element, attrs) {
            var bottomToolbar = new GenericView(scope, element, attrs);

            $onsen.declareVarAttribute(attrs, bottomToolbar);
            element.data('ons-bottomToolbar', bottomToolbar);

            scope.$on('$destroy', function() {
              bottomToolbar._events = undefined;
              $onsen.removeModifierMethods(bottomToolbar);
              element.data('ons-bottomToolbar', undefined);
              element = null;
            });

            $onsen.addModifierMethods(bottomToolbar, 'bottom-bar--*', element);

            var pageView = element.inheritedData('ons-page');
            if (pageView && !inline) {
              pageView.registerBottomToolbar(element);
            }
          },
          post: function(scope, element, attrs) {
            $onsen.fireComponentEvent(element[0], 'init');
          }
        };
      }
    };
  });
})();

