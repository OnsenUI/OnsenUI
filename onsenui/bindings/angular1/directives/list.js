(function() {
  'use strict';

  angular.module('onsen').directive('onsList', function($onsen, GenericView) {
    return {
      restrict: 'E',
      link: function(scope, element, attrs) {
        GenericView.register(scope, element, attrs, {viewKey: 'ons-list'});
        $onsen.fireComponentEvent(element[0], 'init');
      }
    };
  });

})();
