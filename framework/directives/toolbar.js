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

  function ensureLeftContainer(element, center) {
    var container = element[0].querySelector('.left');

    if (!container) {
      container = document.createElement('div');
      container.setAttribute('class', 'left');
      container.innerHTML = '&nbsp;';
      element[0].insertBefore(container, center);
    }

    angular.element(container)
      .addClass('topcoat-navigation-bar__item left quarter')
      .css('float', 'left');

    return container;
  }

  function ensureCenterContainer(element, right) {
    var container = element[0].querySelector('.center');

    if (!container) {
      container = document.createElement('div');
      container.setAttribute('class', 'center');
      container.innerHTML = '&nbsp;';
      element[0].insertBefore(container, right);
    }

    angular.element(container)
      .addClass('topcoat-navigation-bar__item center half topcoat-navigation-bar__title')
      .css('float', 'left');

    return container;
  }

  function ensureRightContainer(element) {
    var container = element[0].querySelector('.right');

    if (!container) {
      container = document.createElement('div');
      container.setAttribute('class', 'right');
      container.innerHTML = '&nbsp;';
      element[0].insertBefore(container, null);
    }

    angular.element(container)
      .addClass('topcoat-navigation-bar__item right quarter')
      .css('float', 'left');

    return container;
  }

  function ensureToolbarItemElements(element) {
    var right = ensureRightContainer(element);
    var center = ensureCenterContainer(element, right);
    var left = ensureLeftContainer(element, center);
  }

  /**
   * Toolbar directive.
   */
  directives.directive('onsToolbar', function(ONSEN_CONSTANTS, OnsenUtil) {
    return {
      restrict: 'E',
      replace: false,
      transclude: true,
      require: '^onsPage',
      scope: false,
      templateUrl: ONSEN_CONSTANTS.DIRECTIVE_TEMPLATE_URL + '/toolbar.tpl',
      controller: function($element) {
      },
      link: {
        pre: function(scope, element, attrs, pageController) {
          scope.modifierTemplater = OnsenUtil.generateModifierTemplater(attrs);
          pageController.registerToolbar(element);
        },

        post: function(scope, element, attrs, controller) {
          ensureToolbarItemElements(angular.element(element[0].childNodes[0]));
        }
      }
    };
  });

})();
