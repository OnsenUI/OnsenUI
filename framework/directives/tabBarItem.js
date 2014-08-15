/**
 * @ngdoc directive
 * @id tabbar_item
 * @name ons-tabbar-item
 * @description
 *  [en]Represents a tab inside tabbar. Each ons-tabbar-item represents a page.[/en]
 *  [ja]タブバーに配置される各アイテムのコンポーネントです。それぞれのons-tabbar-itemはページを表します。[/ja]
 * @param page
 *  [en]The page that this ons-tabbar-item points to.[/en]
 *  [ja]ons-tabbar-itemが参照するページへのURLを指定します。[/ja]
 * @param icon
 *  [en]The icon name of the tab. Can specify the same icon name as ons-icon. If you need to use your own icon, create a css class with background-image or any css properties and specify the name of your css class here.[/en]
 *  [ja]アイコン名を指定します。ons-iconと同じアイコン名を指定できます。個別にアイコンをカスタマイズする場合は、background-imageなどのCSSスタイルを用いて指定できます。[/ja]
 * @param active-icon
 *  [en]The icon name of the tab when active.[/en]
 *  [ja]アクティブの際のアイコン名を指定します。[/ja]
 * @param label
 *  [en]The label of the tab item.[/en]
 *  [ja]アイコン下に表示されるラベルを指定します。[/ja]
 * @param active
 *  [en]Set whether this item should be active or not. Valid values are true and false.[/en]
 *  [ja]このタブアイテムをアクティブ状態にするかどうかを指定します。trueもしくはfalseを指定できます。[/ja]
 * @codepen pGuDL
 * @guide UsingTabBar [en]Using tab bar[/en][ja]タブバーを使う[/ja]
 * @guide DefiningMultiplePagesinSingleHTML [en]Defining multiple pages in single html[/en][ja]複数のページを1つのHTMLに記述する[/ja]
 * @seealso ons-tabbar [en]ons-tabbar component[/en][ja]ons-tabbarコンポーネント[/ja]
 * @seealso ons-page [en]ons-page component[/en][ja]ons-pageコンポーネント[/ja]
 * @seealso ons-icon [en]ons-icon component[/en][ja]ons-iconコンポーネント[/ja]
 */
(function() {
  'use strict';
  var module = angular.module('onsen');

  module.directive('onsTabbarItem', function($onsen) {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      scope: {
        page: '@',
        active: '@',
        icon: '@',
        activeIcon: '@',
        label: '@'
      },
      templateUrl: $onsen.DIRECTIVE_TEMPLATE_URL + '/tab_bar_item.tpl',
      link: function(scope, element, attrs) {

        var tabbarView = element.inheritedData('ons-tabbar');
        if (!tabbarView) {
          throw new Error('ons-tabbar-item is must be child of ons-tabbar element.');
        }

        var radioButton = element[0].querySelector('input');

        scope.tabbarModifierTemplater = tabbarView.modifierTemplater;
        scope.modifierTemplater = $onsen.generateModifierTemplater(attrs);
        scope.tabbarId = tabbarView._tabbarId;
        scope.tabIcon = scope.icon;

        tabbarView.addTabItem(scope);

        // Make this tab active.
        scope.setActive = function() {
          element.addClass('active');
          radioButton.checked = true;

          if (scope.activeIcon) {
            scope.tabIcon = scope.activeIcon;
          }
        };

        // Make this tab inactive.
        scope.setInactive = function() {
          element.removeClass('active');
          radioButton.checked = false;
          scope.tabIcon = scope.icon;
        };

        /**
         * @return {Boolean}
         */
        scope.isActive = function() {
          return element.hasClass('active');
        };

        scope.tryToChange = function() {
          tabbarView.setActiveTab(tabbarView._tabItems.indexOf(scope));
        };

        if (scope.active) {
          tabbarView.setActiveTab(tabbarView._tabItems.indexOf(scope));
        }
      }
    };
  });
})();
