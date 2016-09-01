(function() {
  'use strict';

  angular.module('onsen').directive('onsListHeader', function($onsen, GenericView) {
    return {
      restrict: 'E',
      link: function(scope, element, attrs) {
        GenericView.register(scope, element, attrs, {viewKey: 'ons-listHeader'});
        $onsen.fireComponentEvent(element[0], 'init');
      }
    };
  });

})();
