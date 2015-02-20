/**
 * @ngdoc directive
 * @id tabbar_item
 * @name ons-tab
 * @description
 *  [en]Represents a tab inside tabbar. Each ons-tab represents a page.[/en]
 *  [ja]タブバーに配置される各アイテムのコンポーネントです。それぞれのons-tabはページを表します。[/ja]
 * @codepen pGuDL
 * @guide UsingTabBar [en]Using tab bar[/en][ja]タブバーを使う[/ja]
 * @guide DefiningMultiplePagesinSingleHTML [en]Defining multiple pages in single html[/en][ja]複数のページを1つのHTMLに記述する[/ja]
 * @seealso ons-tabbar [en]ons-tabbar component[/en][ja]ons-tabbarコンポーネント[/ja]
 * @seealso ons-page [en]ons-page component[/en][ja]ons-pageコンポーネント[/ja]
 * @seealso ons-icon [en]ons-icon component[/en][ja]ons-iconコンポーネント[/ja]
 * @example
 * <ons-tabbar>
 *   <ons-tab page="home.html" active="true">
 *     <ons-icon icon="ion-home"></ons-icon>
 *     <span style="font-size: 14px">Home</span>
 *   </ons-tab>
 *   <ons-tab page="fav.html" active="true">
 *     <ons-icon icon="ion-star"></ons-icon>
 *     <span style="font-size: 14px">Favorites</span>
 *   </ons-tab>
 *   <ons-tab page="settings.html" active="true">
 *     <ons-icon icon="ion-gear-a"></ons-icon>
 *     <span style="font-size: 14px">Settings</span>
 *   </ons-tab>
 * </ons-tabbar>
 *
 * <ons-template id="home.html">
 *   ...
 * </ons-template>
 *
 * <ons-template id="fav.html">
 *   ...
 * </ons-template>
 *
 * <ons-template id="settings.html">
 *   ...
 * </ons-template>
 */

/**
 * @ngdoc attribute
 * @name page
 * @type {String}
 * @description
 *   [en]The page that this ons-tab points to.[/en]
 *   [ja]ons-tabが参照するページへのURLを指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name icon
 * @type {String}
 * @description
 *   [en]The icon name for the tab. Can specify the same icon name as ons-icon. If you need to use your own icon, create a css class with background-image or any css properties and specify the name of your css class here.[/en]
 *   [ja]アイコン名を指定します。ons-iconと同じアイコン名を指定できます。個別にアイコンをカスタマイズする場合は、background-imageなどのCSSスタイルを用いて指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name active-icon
 * @type {String}
 * @description
 *   [en]The name of the icon when the tab is active.[/en]
 *   [ja]アクティブの際のアイコン名を指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name label
 * @type {String}
 * @description
 *   [en]The label of the tab item.[/en]
 *   [ja]アイコン下に表示されるラベルを指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name active
 * @type {Boolean}
 * @default false
 * @description
 *   [en]Set whether this item should be active or not. Valid values are true and false.[/en]
 *   [ja]このタブアイテムをアクティブ状態にするかどうかを指定します。trueもしくはfalseを指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name no-reload
 * @description
 *   [en]Set if the page shouldn't be reloaded when clicking on the same tab twice.[/en]
 *   [ja]すでにアクティブになったタブを再びクリックするとページの再読み込みは発生しません。[/ja]
 */

/**
 * @ngdoc attribute
 * @name persistent
 * @description
 *   [en]Set to make the tab content persistent. If this attribute it set the DOM will not be destroyed when navigating to another tab.[/en]
 *   [ja]このタブで読み込んだページを永続化します。この属性があるとき、別のタブのページに切り替えても、読み込んだページのDOM要素は破棄されずに単に非表示になります。[/ja]
 */

(function() {
  'use strict';
  var module = angular.module('onsen');

  module.directive('onsTab', tab);
  module.directive('onsTabbarItem', tab); // for BC

  var defaultInnerTemplate =
    '<div ng-if="icon != undefined" class="tab-bar__icon">' +
      '<ons-icon icon="{{tabIcon}}" style="font-size: 28px; line-height: 34px; vertical-align: top;"></ons-icon>' +
    '</div>' +
    '<div ng-if="label" class="tab-bar__label">{{label}}</div>';

  function tab($onsen, $compile) {
    return {
      restrict: 'E',
      transclude: true,

      scope: {
        page: '@',
        active: '@',
        icon: '@',
        activeIcon: '@',
        label: '@',
        noReload: '@',
        persistent: '@'
      },

      templateUrl: $onsen.DIRECTIVE_TEMPLATE_URL + '/tab.tpl',

      compile: function(element, attrs) {
        element.addClass('tab-bar__item');

        return function(scope, element, attrs, controller, transclude) {
          var tabbarView = element.inheritedData('ons-tabbar');
          if (!tabbarView) {
            throw new Error('This ons-tab element is must be child of ons-tabbar element.');
          }

          element.addClass(tabbarView._scope.modifierTemplater('tab-bar--*__item'));
          element.addClass(tabbarView._scope.modifierTemplater('tab-bar__item--*'));

          transclude(scope.$parent, function(cloned) {
            var wrapper = angular.element(element[0].querySelector('.tab-bar-inner'));

            if (attrs.icon || attrs.label || !cloned[0]) {
              var innerElement = angular.element('<div>' + defaultInnerTemplate + '</div>').children();
              wrapper.append(innerElement);
              $compile(innerElement)(scope);
            } else {
              wrapper.append(cloned);
            }
          });

          var radioButton = element[0].querySelector('input');

          scope.tabbarModifierTemplater = tabbarView._scope.modifierTemplater;
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

            angular.element(element[0].querySelectorAll('[ons-tab-inactive]')).css('display', 'none');
            angular.element(element[0].querySelectorAll('[ons-tab-active]')).css('display', 'inherit');
          };

          // Make this tab inactive.
          scope.setInactive = function() {
            element.removeClass('active');
            radioButton.checked = false;
            scope.tabIcon = scope.icon;

            angular.element(element[0].querySelectorAll('[ons-tab-inactive]')).css('display', 'inherit');
            angular.element(element[0].querySelectorAll('[ons-tab-active]')).css('display', 'none');
          };

          scope.isPersistent = function() {
            return typeof scope.persistent != 'undefined';
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

          $onsen.fireComponentEvent(element[0], 'init');
        };
      }
    };
  }
})();
