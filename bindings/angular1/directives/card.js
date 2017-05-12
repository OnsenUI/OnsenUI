(function() {
  'use strict';

  angular.module('onsen').directive('onsCard', function($onsen, GenericView) {
    return {
      restrict: 'E',
      link: function(scope, element, attrs) {
        GenericView.register(scope, element, attrs, {viewKey: 'ons-card'});
        $onsen.fireComponentEvent(element[0], 'init');
      }
    };
  });

})();
