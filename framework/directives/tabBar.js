/**
 * @ngdoc directive
 * @id tabbar
 * @name ons-tabbar
 * @description
 *  [en]A component to display a tab bar on the bottom of a page. Used with ons-tabbar-item to manage pages using tabs.[/en]
 *  [ja]タブバーをページ下部に表示するためのコンポーネントです。ons-tabbar-itemと組み合わせて使うことで、ページを管理できます。[/ja]
 * @param hide-tabs
 *  [en]Whether to hide the tabs. Valid values are true/false.[/en]
 *  [ja]タブを非表示にする場合に指定します。trueもしくはfalseを指定できます。[/ja]
 * @param var
 *  [en]Variable name to refer this tabbar.[/en]
 *  [ja]JavaScriptからコンポーネントにアクセスするための変数名を指定します。[/ja]
 * @property on(eventName,listener)
 *  [en]Add an event listener. Possible events are prechange and postchange.[/en]
 *  [ja]イベントリスナーを追加します。prechangeおよびpostchangeイベントが定義されています。[/ja]
 * @property setActiveTab(index,[options])
 * @property getActiveTabIndex()
 *  [en]Get tab index on current active tab. If active tab is not found, returns -1.[/en]
 *  [ja]現在アクティブになっているタブのインデックスを返す。現在アクティブなタブがない場合には-1を返す。[/ja]
 * @codepen pGuDL
 * @guide UsingTabBar [en]Using tab bar[/en][ja]タブバーを使う[/ja]
 * @guide EventHandling [en]Event handling descriptions[/en][ja]イベント処理の使い方[/ja]
 * @guide CallingComponentAPIsfromJavaScript [en]Using navigator from JavaScript[/en][ja]JavaScriptからコンポーネントを呼び出す[/ja]
 * @guide DefiningMultiplePagesinSingleHTML [en]Defining multiple pages in single html[/en][ja]複数のページを1つのHTMLに記述する[/ja]
 * @seealso ons-tabbar-item [en]ons-tabbar-item component[/en][ja]ons-tabbar-itemコンポーネント[/ja]
 * @seealso ons-page [en]ons-page component[/en][ja]ons-pageコンポーネント[/ja]
 */
(function() {
  'use strict';
  var module = angular.module('onsen');

  module.factory('TabbarView', function($onsen, $compile) {
    var TabbarView = Class.extend({
      _tabbarId: this.tabbarId,

      _tabItems: [],

      init: function(scope, element, attrs) {
        this._scope = scope;
        this._element = element;
        this._attrs = attrs;

        this._containerElement = angular.element(element[0].querySelector('.ons-tab-bar__content'));
        this._footerElement = angular.element(element[0].querySelector('.ons-tab-bar__footer'));

        this._scope.$on('$destroy', this._destroy.bind(this));
      },

      /**
       * @param {Number} index
       * @param {Object} [options]
       * @param {Boolean} [options.withoutSetPage]
       * @return {Boolean} success or not
       */
      setActiveTab: function(index, options) {
        var previousTabItem = this._tabItems[this.getActiveTabIndex()];
        options = options || {};
        var selectedTabItem = this._tabItems[index];

        if (!selectedTabItem) {
          return false;
        }

        var canceled = false;
        this.emit('prechange', {
          index: index,
          tabItem: selectedTabItem,
          cancel: function() {
            canceled = true;
          }
        });

        if (canceled) {
          selectedTabItem.setInactive();
          if (previousTabItem) {
            previousTabItem.setActive();
          }
          return false;
        }

        selectedTabItem.setActive();
        
        if (selectedTabItem.page && !options.withoutSetPage) {
          this._setPage(selectedTabItem.page);
        }

        for (var i = 0; i < this._tabItems.length; i++) {
          if (this._tabItems[i] != selectedTabItem) {
            this._tabItems[i].setInactive();
          } else {
            this._triggerActiveTabChanged(i, selectedTabItem);
            this.emit('postchange', {index: i, tabItem: selectedTabItem});
          }
        }
        return true;
      },

      _triggerActiveTabChanged: function(index, tabItem){
        this._scope.onActiveTabChanged({
          $index: index,
          $tabItem: tabItem
        });
      },

      /**
       * @param {Boolean} visible
       */
      setTabbarVisibility: function(visible) {
        this._scope.hideTabs = !visible;
        this._onTabbarVisibilityChanged();
      },

      _onTabbarVisibilityChanged: function() {
        if (this._scope.hideTabs) {
          this._scope.tabbarHeight = 0;
        } else {
          this._scope.tabbarHeight = this._footerElement[0].clientHeight + 'px';
        }
      },

      /**
       * @param {Object} tabItem
       */
      addTabItem: function(tabItem) {
        this._tabItems.push(tabItem);
      },

      /**
       * @return {Number} When active tab is not found, returns -1.
       */
      getActiveTabIndex: function() {
        var tabItem;
        for (var i = 0; i < this._tabItems.length; i++) {
          tabItem = this._tabItems[i];
          if (tabItem.isActive()) {
            return i;
          }
        }

        return -1;
      },

      /**
       * @param {String} page
       */
      setPage: function(page) {
        return this._setPage(page);
      },

      /**
       * @param {String} page
       */
      _setPage: function(page) {
        var pageScope = this._scope.$parent.$new();

        $onsen.getPageHTMLAsync(page).then(function(html) {

          var templateHTML = angular.element(html.trim());
          var link = $compile(templateHTML);

          this._containerElement.append(templateHTML);
          var pageContent = link(pageScope);
          pageScope.$evalAsync();

          if (this._currentPageElement) {
            this._currentPageElement.remove();
            console.log("currentPageScope death");
            this._currentPageScope.$destroy();
          }

          this._currentPageElement = pageContent;
          this._currentPageScope = pageScope;
        }.bind(this), function() {
          throw new Error('Page is not found: ' + page);
        });
      },

      _destroy: function() {
        this.emit('destroy', {tabbar: this});

        this._element = this._scope = this._attrs = null;
      }
    });
    MicroEvent.mixin(TabbarView);

    return TabbarView;
  });

  module.directive('onsTabbar', function($onsen, $compile, TabbarView) {
    return {
      restrict: 'E',
      replace: false,
      transclude: true,
      scope: {
        hide: '@',
        onActiveTabChanged: '&'
      },
      templateUrl: $onsen.DIRECTIVE_TEMPLATE_URL + '/tab_bar.tpl',
      link: function(scope, element, attrs, controller, transclude) {

        if (attrs.ngController) {
          throw new Error('This element can\'t accept ng-controller directive.');
        }

        scope.modifierTemplater = $onsen.generateModifierTemplater(attrs);
        scope.tabbarId = Date.now();

        scope.selectedTabItem = {
          source: ''
        };

        attrs.$observe('hideTabs', function(hide) {
          scope.hideTabs = hide;
          tabbarView._onTabbarVisibilityChanged();
        });

        var tabbarView = new TabbarView(scope, element, attrs);

        $onsen.aliasStack.register('ons.tabbar', tabbarView);
        element.data('ons-tabbar', tabbarView);
        $onsen.declareVarAttribute(attrs, tabbarView);

        transclude(function(cloned) {
          angular.element(element[0].querySelector('.ons-tabbar-inner')).append(cloned);
        });

        scope.$on('$destroy', function() {
          element.data('ons-tabbar', undefined);
          $onsen.aliasStack.unregister('ons.tabbar', tabbarView);
        });
      }
    };
  });
})();
