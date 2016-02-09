(function() {
  'use strict';

  angular.module('onsen').directive('onsRipple', function($onsen, GenericView) {
    return {
      restrict: 'E',
      link: function(scope, element, attrs) {
        CustomElements.upgrade(element[0]);
        GenericView.register(scope, element, attrs, {viewKey: 'ons-ripple'});
        $onsen.fireComponentEvent(element[0], 'init');
      }
    };
  });
})();
