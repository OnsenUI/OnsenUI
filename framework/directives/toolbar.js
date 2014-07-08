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
 * @id toolbar
 * @name ons-toolbar
 * @description
 * Toolbar component that can be used with navigation. Left, center and right container can be specified by class names.
 * @demoURL
 * OnsenUI/demo/screen/
 */
(function() {
  'use strict';

  var module = angular.module('onsen');

  function ensureLeftContainer(element) {
    var container = element[0].querySelector('.left');

    if (!container) {
      container = document.createElement('div');
      container.setAttribute('class', 'left');
      container.innerHTML = '&nbsp;';
    }

    if (container.innerHTML.trim() === '') {
      container.innerHTML = '&nbsp;';
    }

    angular.element(container).addClass('navigation-bar__left');

    return container;
  }

  function ensureCenterContainer(element) {
    var container = element[0].querySelector('.center');

    if (!container) {
      container = document.createElement('div');
      container.setAttribute('class', 'center');
    }

    if (container.innerHTML.trim() === '') {
      container.innerHTML = '&nbsp;';
    }

    angular.element(container)
      .addClass('navigation-bar__title navigation-bar__center');

    return container;
  }

  function ensureRightContainer(element) {
    var container = element[0].querySelector('.right');

    if (!container) {
      container = document.createElement('div');
      container.setAttribute('class', 'right');
      container.innerHTML = '&nbsp;';
    }

    if (container.innerHTML.trim() === '') {
      container.innerHTML = '&nbsp;';
    }

    angular.element(container).addClass('navigation-bar__right');

    return container;
  }

  /**
   * @param {jqLite} element
   * @return {Boolean}
   */
  function hasCenterClassElementOnly(element) {
    var hasCenter = false;
    var hasOther = false;
    var child, children = element.contents();

    for (var i = 0; i < children.length; i++) {
      child = angular.element(children[i]);

      if (child.hasClass('center')) {
        hasCenter = true;
        continue;
      }

      if (child.hasClass('left') || child.hasClass('right')) {
        hasOther = true;
        continue;
      }

    }

    return hasCenter && !hasOther;
  }

  function ensureToolbarItemElements(element) {
    var center;
    if (hasCenterClassElementOnly(element)) {
      center = ensureCenterContainer(element);
      element.contents().remove();
      element.append(center);
    } else {
      center = ensureCenterContainer(element);
      var left = ensureLeftContainer(element);
      var right = ensureRightContainer(element);

      element.contents().remove();
      element.append(angular.element([left, center, right]));
    }
  }

  /**
   * Toolbar directive.
   */
  module.directive('onsToolbar', function($onsen) {
    return {
      restrict: 'E',
      replace: false,

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclde.
      scope: true, 
      transclude: false,

      compile: function(element, attrs) {

        if ($onsen.isWebView() && $onsen.isIOS7Above()) {
          // Adjustments for iOS7
          element.css('paddingTop', '20px');
          element.css('height', '64px');
        }

        var modifierTemplater = $onsen.generateModifierTemplater(attrs);

        element.addClass('navigation-bar');
        element.addClass(modifierTemplater('navigation-bar--*'));
        element.css({
          'position': 'absolute',
          'z-index': '10000',
          'left': '0px',
          'right': '0px',
          'top': '0px'
        });
        ensureToolbarItemElements(element);

        return {
          pre: function(scope, element, attrs) {
            var pageView = element.inheritedData('ons-page');

            if (pageView) {
              pageView.registerToolbar(element);
            }
          }
        };
      }
    };
  });

})();
