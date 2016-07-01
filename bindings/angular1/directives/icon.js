
/**
 * @element ons-icon
 */


(function() {
  'use strict';

  angular.module('onsen').directive('onsIcon', function($onsen, GenericView) {
    return {
      restrict: 'E',

      compile: function(element, attrs) {
        CustomElements.upgrade(element[0]);

        if (attrs.icon.indexOf('{{') !== -1) {
          attrs.$observe('icon', () => {
            setImmediate(() => element[0]._update());
          });
        }

        return (scope, element, attrs) => {
          GenericView.register(scope, element, attrs, {
            viewKey: 'ons-icon'
          });
          // $onsen.fireComponentEvent(element[0], 'init');
        };

      }

    };
  });

})();

