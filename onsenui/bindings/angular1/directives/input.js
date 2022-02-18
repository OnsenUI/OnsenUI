/**
 * @element ons-input
 */

(function(){
  'use strict';

  angular.module('onsen').directive('onsInput', function($parse) {
    return {
      restrict: 'E',
      replace: false,
      scope: false,

      link: function(scope, element, attrs) {
        let el = element[0];

        const onInput = () => {
          $parse(attrs.ngModel).assign(scope, el.type === 'number' ? Number(el.value) : el.value);
          attrs.ngChange && scope.$eval(attrs.ngChange);
          scope.$parent.$evalAsync();
        };

        if (attrs.ngModel) {
          scope.$watch(attrs.ngModel, (value) => {
            if (typeof value !== 'undefined' && value !== el.value) {
              el.value = value;
            }
          });

          element.on('input', onInput)
        }

        scope.$on('$destroy', () => {
          element.off('input', onInput)
          scope = element = attrs = el = null;
        });
      }
    };
  });
})();
