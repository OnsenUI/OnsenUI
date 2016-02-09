(function() {
  'use strict';

  angular.module('onsen').directive('onsListItem', function($onsen, GenericView) {
    return {
      restrict: 'E',
      link: function(scope, element, attrs) {
        CustomElements.upgrade(element[0]);
        GenericView.register(scope, element, attrs, {viewKey: 'ons-list-item'});
        $onsen.fireComponentEvent(element[0], 'init');
      }
    };
  });
})();
