/**
 * @element ons-checkbox
 */

(function(){
  'use strict';

  angular.module('onsen').directive('onsCheckbox', function($parse) {
    return {
      restrict: 'E',
      replace: false,
      scope: false,

      link: function(scope, element, attrs) {
        let el = element[0];

        const onChange = () => {
          $parse(attrs.ngModel).assign(scope, el.checked);
          attrs.ngChange && scope.$eval(attrs.ngChange);
          scope.$parent.$evalAsync();
        };

        if (attrs.ngModel) {
          scope.$watch(attrs.ngModel, value => el.checked = value);
          element.on('change', onChange);
        }

        scope.$on('$destroy', () => {
          element.off('change', onChange);
          scope = element = attrs = el = null;
        });
      }
    };
  });
})();
