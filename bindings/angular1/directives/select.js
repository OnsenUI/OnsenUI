
/**
 * @element ons-select
 */

(function () {
  'use strict';

  angular.module('onsen')
  .directive('onsSelect', function ($parse, $onsen, GenericView) {
    return {
      restrict: 'E',
      replace: false,
      scope: false,

      link: function (scope, element, attrs) {
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

        GenericView.register(scope, element, attrs, { viewKey: 'ons-select' });
        $onsen.fireComponentEvent(element[0], 'init');
      }
    };
  })
})();
