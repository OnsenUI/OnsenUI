/**
 * @ngdoc directive
 * @id bottom_toolbar
 * @name ons-bottom-toolbar
 * @description
 * [en]Toolbar component that is positioned at the bottom of the page. Has same functionality as the ons-toolbar component.[/en]
 * [ja]ページ下部に配置されるツールバー用コンポーネント。機能的にはons-toolbarと同様です。[/ja]
 * @modifier transparent
 *  [en]Make the toolbar transparent.[/en]
 *  [ja][/ja]
 * @seealso ons-toolbar [en]ons-toolbar component[/en][ja]ons-toolbarコンポーネント[/ja]
 * @guide Addingatoolbar [en]Adding a toolbar[/en][ja]ツールバーの追加[/ja]
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
 *  [en]The appearance of the toolbar.[/en]
 *  [ja]ツールバーの表現を指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name inline
 * @description
 *  [en]Display the toolbar as an inline element.[/en]
 *  [ja]ツールバーをインラインに置きます。スクロール領域内にそのままツールバーが表示されます。[/ja]
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

        element.addClass('bottom-bar');
        element.addClass(modifierTemplater('bottom-bar--*'));
        element.css({'z-index': 0});

        if (inline) {
          element.css('position', 'static');
        }

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

