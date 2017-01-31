
/**
 * @element ons-select
 */

(function(){
  'use strict';

  angular.module('onsen').directive('onsSelect', function($parse) {
    return {
      restrict: 'E',
      replace: false,
      scope: false,

      link: function(scope, element, attrs) {
        console.log('scope', scope);
        console.log('element', element);
        console.log('attrs', attrs);

        const onInput = () => {
          const set = $parse(attrs.ngModel).assign;

          set(scope, element[0].value);
          if (attrs.ngChange) {
            scope.$eval(attrs.ngChange);
          }
          scope.$parent.$evalAsync();
        };

        if (attrs.ngModel) {
          scope.$watch(attrs.ngModel, (value) => {
            element[0].value = value;
          });

          element.on('input', onInput);
        }

        scope.$on('$destroy', () => {
          element.off('input', onInput);
          scope = element = attrs = null;
        });
      }
    };
  });
})();
