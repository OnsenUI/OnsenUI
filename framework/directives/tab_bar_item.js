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

  directives.directive('onsTabbarItem', function(ONSEN_CONSTANTS, OnsenUtil) {
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
      templateUrl: ONSEN_CONSTANTS.DIRECTIVE_TEMPLATE_URL + '/tab_bar_item.tpl',
      link: function(scope, element, attrs, tabbarController) {
        var radioButton = element[0].querySelector('input');

        scope.tabbarModifierTemplater = tabbarController.modifierTemplater;
        scope.modifierTemplater = OnsenUtil.generateModifierTemplater(attrs);

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
