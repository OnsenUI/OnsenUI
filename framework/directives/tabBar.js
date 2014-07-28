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

  module.directive('onsTabbar', function($timeout, $compile, $onsen) {
    return {
      restrict: 'E',
      replace: false,
      transclude: true,
      scope: {
        hide: '@',
        onActiveTabChanged: '&'
      },
      templateUrl: $onsen.DIRECTIVE_TEMPLATE_URL + '/tab_bar.tpl',
      controller: function($scope, $element, $attrs) {

        if ($attrs.ngController) {
          throw new Error('This element can\'t accept ng-controller directive.');
        }

        this.modifierTemplater = $scope.modifierTemplater = $onsen.generateModifierTemplater($attrs);

        var container = angular.element($element[0].querySelector('.ons-tab-bar__content'));
        var footer = $element[0].querySelector('.ons-tab-bar__footer');

        this.tabbarId = Date.now();

        $scope.selectedTabItem = {
          source: ''
        };

        $attrs.$observe('hideTabs', function(hide) {
          $scope.hideTabs = hide;
          tabbarView._onTabbarVisibilityChanged();
        });

        var tabbarView = {
          _tabbarId: this.tabbarId,

          _tabItems: [],

          /**
           * @param {Number} index
           */
          setActiveTab: function(index) {
            var selectedTabItem = this._tabItems[index];

            if (!selectedTabItem) {
              return;
            }

            this.emit('prechange', {index: index, tabItem: selectedTabItem});
            
            if (selectedTabItem.page) {
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
          },

          _triggerActiveTabChanged: function(index, tabItem){
            $scope.onActiveTabChanged({
              $index: index,
              $tabItem: tabItem
            });
          },

          /**
           * @param {Boolean} visible
           */
          setTabbarVisibility: function(visible) {
            $scope.hideTabs = !visible;
            this._onTabbarVisibilityChanged();
          },

          _onTabbarVisibilityChanged: function() {
            if ($scope.hideTabs) {
              $scope.tabbarHeight = 0;
            } else {
              $scope.tabbarHeight = footer.clientHeight + 'px';
            }
          },

          /**
           * @param {Object} tabItem
           */
          addTabItem : function(tabItem) {
            this._tabItems.push(tabItem);
          },

          /**
           * @param {String} page
           */
          _setPage: function(page) {
            if (page) {
              $onsen.getPageHTMLAsync(page).then(function(html) {
                var templateHTML = angular.element(html.trim());
                var pageScope = $scope.$parent.$new();
                var pageContent = $compile(templateHTML)(pageScope);
                container.append(pageContent);

                if (this._currentPageElement) {
                  this._currentPageElement.remove();
                  this._currentPageScope.$destroy();
                }

                this._currentPageElement = pageContent;
                this._currentPageScope = pageScope;
              }.bind(this), function() {
                throw new Error('Page is not found: ' + page);
              });
            } else {
              throw new Error('Cannot set undefined page');
            }
          },

          _destroy: function() {
            this.emit('destroy', {tabbar: this});
          }
        };
        MicroEvent.mixin(tabbarView);

        $onsen.aliasStack.register('ons.tabbar', tabbarView);
        $element.data('ons-tabbar', tabbarView);
        $onsen.declareVarAttribute($attrs, tabbarView);

        $scope.$watch('$destroy', function() {
          tabbarView._destroy();
          $element.data('ons-tabbar', undefined);
          $onsen.aliasStack.unregister('ons.tabbar', tabbarView);
        });
      }
    };
  });
})();
