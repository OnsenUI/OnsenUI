/**
 * @ngdoc directive
 * @id tabbar
 * @name ons-tabbar
 * @category tabbar
 * @description
 *   [en]A component to display a tab bar on the bottom of a page. Used with ons-tab to manage pages using tabs.[/en]
 *   [ja]タブバーをページ下部に表示するためのコンポーネントです。ons-tabと組み合わせて使うことで、ページを管理できます。[/ja]
 * @codepen pGuDL
 * @guide UsingTabBar [en]Using tab bar[/en][ja]タブバーを使う[/ja]
 * @guide EventHandling [en]Event handling descriptions[/en][ja]イベント処理の使い方[/ja]
 * @guide CallingComponentAPIsfromJavaScript [en]Using navigator from JavaScript[/en][ja]JavaScriptからコンポーネントを呼び出す[/ja]
 * @guide DefiningMultiplePagesinSingleHTML [en]Defining multiple pages in single html[/en][ja]複数のページを1つのHTMLに記述する[/ja]
 * @seealso ons-tab [en]ons-tab component[/en][ja]ons-tabコンポーネント[/ja]
 * @seealso ons-page [en]ons-page component[/en][ja]ons-pageコンポーネント[/ja]
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
 * @ngdoc event
 * @name prechange
 * @description
 *   [en]Fires just before the tab is changed.[/en]
 *   [ja][/ja]
 * @param {Object} event
 *   [en]Event object.[/en]
 *   [ja][/ja]
 * @param {Number} event.index
 *   [en]Current index.[/en]
 *   [ja][/ja]
 * @param {Object} event.tabItem
 *   [en]Tab item object.[/en]
 *   [ja][/ja]
 * @param {Function} event.cancel
 *   [en]Call this function to cancel the change event.[/en]
 *   [ja][/ja]
 */

/**
 * @ngdoc event
 * @name postchange
 * @description
 *   [en]Fires just after the tab is changed.[/en]
 *   [ja][/ja]
 * @param {Object} event
 *   [en]Event object.[/en]
 *   [ja][/ja]
 * @param {Number} event.index
 *   [en]Current index.[/en]
 *   [ja][/ja]
 * @param {Object} event.tabItem
 *   [en]Tab item object.[/en]
 *   [ja][/ja]
 */

/**
 * @ngdoc event
 * @name reactive
 * @description
 *   [en]Fires if the already open tab is tapped again.[/en]
 *   [ja][/ja]
 * @param {Object} event
 *   [en]Event object.[/en]
 *   [ja][/ja]
 * @param {Number} event.index
 *   [en]Current index.[/en]
 *   [ja][/ja]
 * @param {Object} event.tabItem
 *   [en]Tab item object.[/en]
 *   [ja][/ja]
 */

/**
 * @ngdoc attribute
 * @name var
 * @type {String}
 * @description
 *   [en]Variable name to refer this tab bar.[/en]
 *   [ja]このタブバーを参照するための名前を指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name hide-tabs
 * @type {Boolean}
 * @default false
 * @description
 *   [en]Whether to hide the tabs. Valid values are true/false.[/en]
 *   [ja]タブを非表示にする場合に指定します。trueもしくはfalseを指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name animation
 * @type {String}
 * @default none
 * @description
 *   [en]Animation name. Preset values are "none" and "fade". Default is "none".[/en]
 *   [ja]ページ読み込み時のアニメーションを指定します。noneもしくはfadeを選択できます。デフォルトはnoneです。[/ja]
 */

/**
 * @ngdoc attribute
 * @name position
 * @type {String}
 * @default bottom
 * @description
 *   [en]Tabbar's position. Preset values are "bottom" and "top". Default is "bottom".[/en]
 *   [ja]タブバーの位置を指定します。bottomもしくはtopを選択できます。デフォルトはbottomです。[/ja]
 */

/**
 * @ngdoc method
 * @signature setActiveTab(index, [options])
 * @param {Number} index
 *   [en]Tab index.[/en]
 *   [ja][/ja]
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja][/ja]
 * @param {Boolean} [options.keepPage]
 *   [en]If true the page will not be changed.[/en]
 *   [ja][/ja]
 * @return {Boolean}
 *   [en]Will be true if the change was successful.[/en]
 *   [ja][/ja]
 * @description
 *   [en]Show specified tab page. Animations and other options can be specified by the second parameter.[/en]
 *   [ja]指定したインデックスのタブを表示します。アニメーションなどのオプションを指定できます。[/ja]
 */

/**
 * @ngdoc method
 * @signature getActiveTabIndex()
 * @return {Number}
 *   [en]The index of the currently active tab.[/en]
 *   [ja][/ja]
 * @description
 *   [en]Returns tab index on current active tab. If active tab is not found, returns -1.[/en]
 *   [ja]現在アクティブになっているタブのインデックスを返します。現在アクティブなタブがない場合には-1を返します。[/ja]
 */

/**
 * @ngdoc method
 * @signature loadPage(url)
 * @param {String} url
 *   [en]Page URL. Can be either an HTML document or an <ons-template>.[/en]
 *   [ja][/ja]
 * @description
 *   [en]Displays a new page without changing the active index.[/en]
 *   [ja]現在のアクティブなインデックスを変更せずに、新しいページを表示します。[/ja]
 */

/**
 * @ngdoc method
 * @signature on(eventName, listener)
 * @description
 *   [en]Add an event listener.[/en]
 *   [ja]イベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja][/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja][/ja]
 */

/**
 * @ngdoc method
 * @signature once(eventName, listener)
 * @description
 *  [en]Add an event listener that's only triggered once.[/en]
 *  [ja][/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja][/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja][/ja]
 */

/**
 * @ngdoc method
 * @signature off(eventName, [listener])
 * @description
 *  [en]Remove an event listener. If the listener is not specified all listeners for the event type will be removed.[/en]
 *  [ja][/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja][/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja][/ja]
 */

(function() {
  'use strict';
  var module = angular.module('onsen');

  module.directive('onsTabbar', function($onsen, $compile, TabbarView) {
    return {
      restrict: 'E',
      replace: false,
      transclude: true,
      scope: {
        onActiveTabChanged: '&'
      },
      templateUrl: $onsen.DIRECTIVE_TEMPLATE_URL + '/tab_bar.tpl',
      link: function(scope, element, attrs, controller, transclude) {

        if (attrs.ngController) {
          throw new Error('This element can\'t accept ng-controller directive.');
        }

        scope.modifierTemplater = $onsen.generateModifierTemplater(attrs);
        scope.selectedTabItem = {source: ''};

        attrs.$observe('hideTabs', function(hide) {
          var visible = hide !== 'true';
          tabbarView.setTabbarVisibility(visible);
        });

        var tabbarView = new TabbarView(scope, element, attrs);
        $onsen.addModifierMethods(tabbarView, 'tab-bar--*', angular.element(element.children()[1]));

        scope.tabbarId = tabbarView._tabbarId;

        element.data('ons-tabbar', tabbarView);
        $onsen.declareVarAttribute(attrs, tabbarView);

        transclude(function(cloned) {
          angular.element(element[0].querySelector('.ons-tabbar-inner')).append(cloned);
        });

        scope.$on('$destroy', function() {
          tabbarView._events = undefined;
          $onsen.removeModifierMethods(tabbarView);
          element.data('ons-tabbar', undefined);
        });

        $onsen.fireComponentEvent(element[0], 'init');
      }
    };
  });
})();
