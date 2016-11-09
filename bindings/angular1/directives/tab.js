(function() {
  'use strict';

  angular.module('onsen')
    .directive('onsTab', tab)
    .directive('onsTabbarItem', tab); // for BC

  function tab($onsen, GenericView) {
    return {
      restrict: 'E',
      link: function(scope, element, attrs) {
        var view = new GenericView(scope, element, attrs);
        element[0].pageLoader = $onsen.createPageLoader(view);

        $onsen.fireComponentEvent(element[0], 'init');
      }
    };
  }
})();
