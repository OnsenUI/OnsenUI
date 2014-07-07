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

/**
 * @ngdoc directive
 * @id tabbar_item
 * @name ons-tabbar-item
 * @param page The page that this tabbar-item points to
 * @param icon The icon of the tab. To use font-awesome icon, just set the icon name without "fa-" prefix. eg. to use "fa-home" icon, set it to "home". If you need to use your own icon, create a css class with background-image or any css properties and specify the name of your css class here
 * @param active-icon The icon of the tab when active. To use font-awesome icon, just set the icon name without "fa-" prefix. eg. to use "fa-home" icon, set it to "home". If you need to use your own icon, create a css class with background-image or any css properties and specify the name of your css class here
 * @param label The label of the tab
 * @param active Set wether this tab should be active or not. Valid values are [true/false]
 * @description
 * Represents a tab inside tabbar. Each tabbar-item represents a page
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
        var radioButton = element[0].querySelector('input');

        var tabbarView = element.inheritedData('ons-tabbar');

        if (!tabbarView) {
          throw new Error('ons-tabbar-item is must be child of ons-tabbar element.');
        }

        scope.tabbarModifierTemplater = tabbarView.modifierTemplater;
        scope.modifierTemplater = $onsen.generateModifierTemplater(attrs);
        scope.tabbarId = tabbarView._tabbarId;
        scope.tabIcon = scope.icon;

        tabbarView.addTabItem(scope);

        scope.setActive = function() {

          tabbarView.setActiveTab(tabbarView._tabItems.indexOf(scope));

          element.addClass('active');
          radioButton.checked = true;

          if (scope.activeIcon) {
            scope.tabIcon = scope.activeIcon;
          }
        };

        scope.setInactive = function() {
          element.removeClass('active');
          scope.tabIcon = scope.icon;
        };

        if (scope.active) {
          scope.setActive();
        }

      }
    };
  });
})();
