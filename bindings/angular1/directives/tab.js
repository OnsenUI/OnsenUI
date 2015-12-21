/**
 * @ngdoc directive
 * @id tabbar_item
 * @name ons-tab
 * @category navigation
 * @description
 *   [en]Represents a tab inside tabbar. Each ons-tab represents a page.[/en]
 *   [ja]
 *     タブバーに配置される各アイテムのコンポーネントです。それぞれのons-tabはページを表します。
 *     ons-tab要素の中には、タブに表示されるコンテンツを直接記述することが出来ます。
 *   [/ja]
 * @codepen pGuDL
 * @guide UsingTabBar
 *   [en]Using tab bar[/en]
 *   [ja]タブバーを使う[/ja]
 * @guide DefiningMultiplePagesinSingleHTML
 *   [en]Defining multiple pages in single html[/en]
 *   [ja]複数のページを1つのHTMLに記述する[/ja]
 * @seealso ons-tabbar
 *   [en]ons-tabbar component[/en]
 *   [ja]ons-tabbarコンポーネント[/ja]
 * @seealso ons-page
 *   [en]ons-page component[/en]
 *   [ja]ons-pageコンポーネント[/ja]
 * @seealso ons-icon
 *   [en]ons-icon component[/en]
 *   [ja]ons-iconコンポーネント[/ja]
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
 * @initonly
 * @type {String}
 * @description
 *   [en]The page that this <code>&lt;ons-tab&gt;</code> points to.[/en]
 *   [ja]<code>&lt;ons-tab&gt;</code>が参照するページへのURLを指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name icon
 * @type {String}
 * @description
 *   [en]
 *     The icon name for the tab. Can specify the same icon name as <code>&lt;ons-icon&gt;</code>.
 *     If you need to use your own icon, create a css class with background-image or any css properties and specify the name of your css class here.
 *   [/en]
 *   [ja]
 *     アイコン名を指定します。<code>&lt;ons-icon&gt;</code>と同じアイコン名を指定できます。
 *     個別にアイコンをカスタマイズする場合は、background-imageなどのCSSスタイルを用いて指定できます。
 *   [/ja]
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
 * @name persistent
 * @description
 *   [en]
 *     Set to make the tab content persistent.
 *     If this attribute it set the DOM will not be destroyed when navigating to another tab.
 *   [/en]
 *   [ja]
 *     このタブで読み込んだページを永続化します。
 *     この属性があるとき、別のタブのページに切り替えても、
 *     読み込んだページのDOM要素は破棄されずに単に非表示になります。
 *   [/ja]
 */

(function() {
  'use strict';

  angular.module('onsen')
    .directive('onsTab', tab)
    .directive('onsTabbarItem', tab); // for BC

  function tab($onsen) {
    return {
      restrict: 'E',
      link: function(scope, element, attrs) {
        CustomElements.upgrade(element[0]);
        $onsen.fireComponentEvent(element[0], 'init');
      }
    };
  }
})();
