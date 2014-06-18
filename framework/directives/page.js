/**
 * @ngdoc directive
 * @id page
 * @name ons-page
 * @description
 * Should be used as root component of each page. The content inside page component is not scrollable. If you need scroll behavior, you can put inside this component.
 * @example
 * <ons-navigator title="Page">
 *     <ons-page class="center">
 *         <h1>Page Content</h1>
 *     </ons-page>
 * </ons-navigator>
 * @demoURL
 * OnsenUI/demo/page/
 */
(function() {
  'use strict';

  var module = angular.module('onsen');

  function firePageInitEvent(pageContainer) {
    function findPageDOM() {
      if (angular.element(pageContainer).hasClass('topcoat-page')) {
        return pageContainer;
      }

      var result = pageContainer.querySelector('.topcoat-page');

      if (!result) {
        throw new Error('An element of "topcoat-page" class is not found.');
      }

      return result;
    }
    
    var event = document.createEvent('HTMLEvents');    
    event.initEvent('pageinit', true, true);
    findPageDOM().dispatchEvent(event);    
  }

  module.directive('onsPage', function($onsen) {
    function controller($scope, $element) {

      this.registeredToolbarElement = false;

      this.nullElement = window.document.createElement('div');

      this.toolbarElement = angular.element(this.nullElement);

      /**
       * Register toolbar element to this page.
       */
      this.registerToolbar = function(element) {
        if (this.registeredToolbarElement) {
          throw new Error('This page\'s toolbar is already registered.');
        }
        
        element.remove();
        $element.prepend(element);

        if ($onsen.isWebView() && $onsen.isIOS7Above()) {
          // Adjustments for IOS7
          var wrapper = $element[0].querySelector('.topcoat-page__content');
          angular.element(wrapper).css({
            'top': '22px',
            'paddingTop': null
          });
        }

        this.toolbarElement = element;
        this.registeredToolbarElement = true;
      };

      /**
       * @return {Boolean}
       */
      this.hasToolbarElement = function() {
        return this.registeredToolbarElement;
      };

      /**
       * @return {HTMLElement}
       */
      this.getContentElement = function() {
        for (var i = 0; i < $element.length; i++) {
          if ($element[i].querySelector) {
            var content = $element[i].querySelector('.topcoat-page__content');
            if (content) {
              return content;
            }
          }
        }
        throw Error('fail to get ".topcoat-page__content" element.');
      };

      /**
       * @return {HTMLElement}
       */
      this.getToolbarElement = function() {
        return this.toolbarElement[0] || this.nullElement;
      };

      /**
       * @return {HTMLElement}
       */
      this.getToolbarLeftItemsElement = function() {
        return this.toolbarElement[0].querySelector('.left') || this.nullElement;
      };

      /**
       * @return {HTMLElement}
       */
      this.getToolbarCenterItemsElement = function() {
        return this.toolbarElement[0].querySelector('.center') || this.nullElement;
      };

      /**
       * @return {HTMLElement}
       */
      this.getToolbarRightItemsElement = function() {
        return this.toolbarElement[0].querySelector('.right') || this.nullElement;
      };

      /**
       * @return {HTMLElement}
       */
      this.getToolbarBackButtonLabelElement = function() {
        return this.toolbarElement[0].querySelector('ons-back-button .back-button__label') || this.nullElement;
      };

      $scope.$on('$destroy', function(){
        this.toolbarElement = null;
        this.nullElement = null;
      }.bind(this));

    }

    return {
      restrict: 'E',
      controller: controller,

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclde.
      transclude: true,
      scope: true,

      compile: function(element) {
        if ($onsen.isWebView() && $onsen.isIOS7Above()) {
          // Adjustments for IOS7
          element.css('paddingTop', '20px');
        }

        return {

          pre: function(scope, element, attrs, controller, transclude) {
            var modifierTemplater = $onsen.generateModifierTemplater(attrs);
            element.addClass('topcoat-page ' + modifierTemplater('topcoat-page--*') + ' ons-page-inner');

            transclude(scope, function(clonedElement) {
              var wrapper = angular.element('<div class="topcoat-page__content"></div>');
              element.append(wrapper);

              if ($onsen.isWebView() && $onsen.isIOS7Above()) {
                // Adjustments for IOS7
                wrapper.css('paddingTop', '20px');
              }
              wrapper.append(clonedElement);
            });
          },

          post: function(scope, element, attrs) {
            firePageInitEvent(element[0]);
          }
        };
      }
    };
  });
})();
