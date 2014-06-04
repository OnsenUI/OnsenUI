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

  function ensureLeftContainer(element) {
    var container = element[0].querySelector('.left');
    if (!container) {
      container = document.createElement('div');
    }
    var element = angular.element(container);
    element.addClass('topcoat-navigation-bar__item left quarter');
    element.css('float', 'left');
    return container;
  }

  function ensureCenterContainer(element) {
    var container = element[0].querySelector('.center');
    if (!container) {
      container = document.createElement('div');
    }
    var element = angular.element(container);
    element.addClass('topcoat-navigation-bar__item center half topcoat-navigation-bar__title');
    element.css('float', 'left');
    return container;
  }

  function ensureRightContainer(element) {
    var container = element[0].querySelector('.right');
    if (!container) {
      container = document.createElement('div');
    }
    var element = angular.element(container);
    element.addClass('topcoat-navigation-bar__item right quarter');
    element.css('float', 'left');
    return container;
  }

  function ensureToolbarItemElements(element) {
    var left = ensureLeftContainer(element);
    var center = ensureCenterContainer(element);
    var right = ensureRightContainer(element);
  }

  /**
   * Toolbar directive.
   */
  directives.directive('onsToolbar', function(ONSEN_CONSTANTS, OnsenUtil) {
    return {
      restrict: 'E',
      replace: false,
      transclude: true,
      scope: false,
      templateUrl: ONSEN_CONSTANTS.DIRECTIVE_TEMPLATE_URL + '/toolbar.tpl',

      link: {
        pre: function(scope, element, attrs, controller) {
          scope.modifierTemplater = OnsenUtil.generateModifierTemplater(attrs);
        },

        post: function(scope, element, attrs, controller) {
          ensureToolbarItemElements(element);
        }
      }
    };
  });

})();
