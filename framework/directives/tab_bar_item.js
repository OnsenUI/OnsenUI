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
      require: '^onsTabbar',
      scope: {
        page: '@',
        active: '@',
        icon: '@',
        activeIcon: '@',
        label: '@'
      },
      templateUrl: $onsen.DIRECTIVE_TEMPLATE_URL + '/tab_bar_item.tpl',
      link: function(scope, element, attrs, tabbarController) {
        var radioButton = element[0].querySelector('input');

        scope.tabbarModifierTemplater = tabbarController.modifierTemplater;
        scope.modifierTemplater = $onsen.generateModifierTemplater(attrs);

        scope.tabbarId = tabbarController.tabbarId;

        tabbarController.addTabItem(scope);
        scope.tabIcon = scope.icon;

        scope.setActive = function() {
          element.addClass('active');
          radioButton.checked = true;
          tabbarController.gotSelected(scope);
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
