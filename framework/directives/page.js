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
                wrapper.css('paddingTop', '22px');
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
