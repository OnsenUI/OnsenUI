/**
 * @ngdoc directive
 * @id toolbar
 * @name ons-toolbar
 * @description
 * Toolbar component that can be used with navigation. Left, center and right container can be specified by class names.
 * @example
 * <ons-navigator>
 *   <ons-page>
 *     <!-- Toolbar -->
 *     <ons-toolbar>
 *      <div class="left"></div>
 *      <div class="center">Title</div>
 *      <div class="right">
 *        <ons-button>Config</ons-button>
 *      </div>
 *     </ons-toolbar>
 *   </ons-page>
 * </ons-navigator>
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

  function ensureToolbarItemElements(element) {
    var left = ensureLeftContainer(element);
    var center = ensureCenterContainer(element);
    var right = ensureRightContainer(element);
    element.contents().remove();
    element.append(angular.element([left, center, right]));
  }

  /**
   * Toolbar directive.
   */
  module.directive('onsToolbar', function($onsen) {
    return {
      restrict: 'E',
      replace: false,
      require: '^onsPage',

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
          pre: function(scope, element, attrs, pageController) {
            pageController.registerToolbar(element);
          }
        };
      }
    };
  });

})();
