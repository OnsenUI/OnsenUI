/**
 * @ngdoc directive
 * @id if-orientation
 * @name ons-if-orientation
 * @description
 * Conditionally display content depending on screen orientation. Valid values are [portrait/landscape]. Different from other components, this component is used as attribute in any element.
 * @param ons-if-orientation Either "portrait" or "landscape".
 * @seealso ons-if-platform ons-if-platform component
 * @guide utility-apis Other utility APIs
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

