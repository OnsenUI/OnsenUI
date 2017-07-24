(function() {
  'use strict';

  angular.module('onsen').directive('onsSegment', function($onsen, GenericView) {
    return {
      restrict: 'E',
      link: function(scope, element, attrs) {
        console.log('initing segment on Angular');
        GenericView.register(scope, element, attrs, {viewKey: 'ons-segment'});
        $onsen.fireComponentEvent(element[0], 'init');
      }
    };
  });

})();
