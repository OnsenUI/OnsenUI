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

  directives.directive('onsPage', function(ONSEN_CONSTANTS, OnsenUtil) {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      templateUrl: ONSEN_CONSTANTS.DIRECTIVE_TEMPLATE_URL + '/page.tpl',
      link: {
        pre: function(scope, element, attrs) {
          scope.modifierTemplater = OnsenUtil.generateModifierTemplater(attrs);


        },
        post: function(scope, element, attrs) {
          firePageInitEvent(element[0]);
        }
      }
    };
  });
})();
