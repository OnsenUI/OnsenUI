/*
Copyright 2013-2014 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/


(function() {
  'use strict';
  var directives = angular.module('onsen.directives');

  directives.directive('onsTabbar', function(ONSEN_CONSTANTS, $timeout, $http, $compile, PredefinedPageCache, OnsenUtil) {
    return {
      restrict: 'E',
      replace: false,
      transclude: true,			
      scope: {
        hide: '@',
        onActiveTabChanged: '&'
      },
      templateUrl: ONSEN_CONSTANTS.DIRECTIVE_TEMPLATE_URL + '/tab_bar.tpl',
      controller: function($scope, $element, $attrs) {
        this.modifierTemplater = $scope.modifierTemplater = OnsenUtil.generateModifierTemplater($attrs);

        var container = angular.element($element[0].querySelector('.tab-bar-content'));
        var footer = $element[0].querySelector('.footer');

        this.tabbarId = Date.now();

        $scope.selectedTabItem = {
          source: ''
        };

        $attrs.$observe('hideTabs', function(hide) {
          $scope.hideTabs = hide;
          onTabbarVisibilityChanged();
        });

        function triggerActiveTabChanged(index, tabItem){
          $scope.onActiveTabChanged({
            $index: index,
            $tabItem: tabItem
          });
        }				

        function onTabbarVisibilityChanged() {
          if ($scope.hideTabs) {
            $scope.tabbarHeight = 0;
          } else {
            $scope.tabbarHeight = footer.clientHeight + 'px';
          }
        }

        var tabItems = [];

        this.gotSelected = function(selectedTabItem) {
          if (selectedTabItem.page) {
            this.setPage(selectedTabItem.page);
          }

          for (var i = 0; i < tabItems.length; i++) {
            if (tabItems[i] != selectedTabItem) {
              tabItems[i].setInactive();
            }else{
              triggerActiveTabChanged(i, selectedTabItem);
            }
          }
        };

        this.setPage = function(page) {
          if (page) {
            $http({
              url: page,
              method: "GET",
              cache: PredefinedPageCache
            }).error(function(e) {
              console.error(e);
            }).success(function(data, status, headers, config) {
              var templateHTML = angular.element(data.trim());
              var pageScope = $scope.$parent.$new();
              var pageContent = $compile(templateHTML)(pageScope);
              container.append(pageContent);

              if(this.currentPageElement){
                this.currentPageElement.remove();
                this.currentPageScope.$destroy();
              }

              this.currentPageElement = pageContent;
              this.currentPageScope = pageScope;
            }.bind(this));
          } else {
            throw new Error('cannot set undefined page');
          }
        }

        this.addTabItem = function(tabItem) {
          tabItems.push(tabItem);
        };

        $scope.ons = $scope.ons || {};
        $scope.ons.tabbar = {};
        $scope.setTabbarVisibility = function(visible) {
          $scope.hideTabs = !visible;
          onTabbarVisibilityChanged();
        };

        $scope.setActiveTab = function(index){
          if(index < 0 || index >= tabItems.length){
            throw new Error('Cannot set tab with index ' + index + '. We have ' + tabItems.length + ' tabs.');
          }

          var tabItem = tabItems[index];
          tabItem.setActive();
        }

        TabbarStack.add($scope);
      }
    };
  });
})();
