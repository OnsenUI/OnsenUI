(function() {
  'use strict';

  angular.module('onsen').directive('onsActionSheetButton', function($onsen, GenericView) {
    return {
      restrict: 'E',
      link: function(scope, element, attrs) {
        GenericView.register(scope, element, attrs, {viewKey: 'ons-action-sheet-button'});
        $onsen.fireComponentEvent(element[0], 'init');
      }
    };
  });

})();
