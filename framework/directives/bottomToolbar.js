/**
 * @ngdoc directive
 * @id bottom_toolbar
 * @name ons-bottom-toolbar
 * @description
 * [en]Toolbar component that is positioned at the bottom of the page. Has same functionality as the ons-toolbar component.[/en]
 * [ja]ページ下部に配置されるツールバー用コンポーネント。機能的にはons-toolbarと同様です。[/ja]
 * @seealso ons-toolbar [en]ons-toolbar component[/en][ja]ons-toolbarコンポーネント[/ja]
 * @guide Addingatoolbar [en]Adding a toolbar[/en][ja]ツールバーの追加[/ja]
 * @example
 * <ons-bottom-toolbar>
 *  <div style="text-align: center; line-height: 44px">Text</div>
 * </ons-bottom-toolbar>
 */
(function(){
  'use strict';

  var module = angular.module('onsen');

  module.directive('onsBottomToolbar', function($onsen, BottomToolbarView) {
    return {
      restrict: 'E',
      replace: false,

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclde.
      transclude: false,
      scope: false,

      compile: function(element, attrs) {

        return {
          pre: function(scope, element, attrs) {
            var bottomToolbar = new BottomToolbarView(scope, element, attrs);
            
            $onsen.declareVarAttribute(attrs, bottomToolbar);

            $onsen.aliasStack.register('ons.bottomToolbar', bottomToolbar);
            element.data('ons-bottomToolbar', bottomToolbar);

            scope.$on('$destroy', function() {
              bottomToolbar._events = undefined;
              element.data('ons-bottomToolbar', undefined);
              $onsen.aliasStack.unregister('ons.bottomToolbar', bottomToolbar);
              element = null;
            });

            // modifier
            var modifierTemplater = $onsen.generateModifierTemplater(attrs);

            element.addClass('bottom-bar');
            element.addClass(modifierTemplater('bottom-bar--*'));
            element.css({'z-index': 0});

            $onsen.addModifierMethods(bottomToolbar, 'bottom-bar--*', element);

            var pageView = element.inheritedData('ons-page');
            if (pageView) {
              pageView.registerBottomToolbar(element);
            }
          },
          post: function(scope, element, attrs) {
            $onsen.fireComponentEvent(element[0], "init");
          }
        };
      }
    };
  });
})();

