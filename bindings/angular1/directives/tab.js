(function() {
  'use strict';

  angular.module('onsen')
    .directive('onsTab', tab)
    .directive('onsTabbarItem', tab); // for BC

  function tab($onsen) {
    return {
      restrict: 'E',
      link: function(scope, element, attrs) {
        $onsen.fireComponentEvent(element[0], 'init');
      }
    };
  }
})();
