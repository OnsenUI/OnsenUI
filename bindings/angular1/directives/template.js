(function(){
  'use strict';

  angular.module('onsen').directive('onsTemplate', function($templateCache) {
    return {
      restrict: 'E',
      terminal: true,
      compile: function(element) {
        CustomElements.upgrade(element[0]);
        var content = element[0].template || element.html();
        $templateCache.put(element.attr('id'), content);
      }
    };
  });
})();
