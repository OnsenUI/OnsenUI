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
 * @id if-orientation
 * @name ons-if-orientation
 * @description
 * Conditionally display content depending on screen orientation. Valid values are [portrait/landscape]. Different from other components, this component is used as attribute in any element.
 * @param ons-if-orientation Either portrait or landscape.
 */
(function(){
  'use strict';

  var module = angular.module('onsen');

  module.directive('onsIfOrientation', function($onsen) {
    return {
      restrict: 'A',
      replace: false,

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclude.
      transclude: false,
      scope: false,

      compile: function(element) {
        element.css('display', 'none');

        return function($scope, element, attrs) {
          element.addClass('ons-if-orientation-inner');

          window.addEventListener('orientationchange', update, false);
          window.addEventListener('resize', update, false);
          attrs.$observe('onsIfOrientation', update);

          update();

          function update() {
            var userOrientation = ('' + attrs.onsIfOrientation).toLowerCase();
            var orientation = getLandscapeOrPortraitFromInteger(window.orientation);

            if (userOrientation && (userOrientation === 'portrait' || userOrientation === 'landscape')) {
              if (userOrientation === orientation) {
                element.css('display', 'block');
              } else {
                element.css('display', 'none');
              }
            }
          }

          function getLandscapeOrPortraitFromInteger(orientation) {
            if (orientation === undefined ) {
              return window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
            }

            if (orientation == 90 || orientation == -90) {
              return 'landscape';
            }

            if (orientation === 0 || orientation == 180) {
              return 'portrait';
            }
          }
        };
      }
    };
  });
})();

