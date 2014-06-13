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

    if (container.innerHTML.trim() === '') {
      container.innerHTML = '&nbsp;';
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
      element[0].insertBefore(container, right);
    }

    if (container.innerHTML.trim() === '') {
      container.innerHTML = '&nbsp;';
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

    if (container.innerHTML.trim() === '') {
      container.innerHTML = '&nbsp;';
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

      scope: true, 

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclde.
      
      link: {
        pre: function(scope, element, attrs, pageController, transclude) {
          var modifierTemplater = OnsenUtil.generateModifierTemplater(attrs);

          var wrapper = angular.element(document.createElement('div'));
          wrapper.addClass('topcoat-navigation-bar');
          wrapper.addClass(modifierTemplater('topcoat-navigation-bar--*'));

          element.append(wrapper);
          pageController.registerToolbar(element);

          transclude(scope, function(clonedElement) {
            wrapper.append(clonedElement);
            ensureToolbarItemElements(angular.element(wrapper[0]));
          });
        },

        post: function(scope, element, attrs, controller) {

        }
      }
    };
  });

})();
