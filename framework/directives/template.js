/**
 * @ngdoc directive
 * @id template
 * @name ons-template
 * @description
 *  [en]Template element to put html fragment.[/en]
 */
(function(){
  'use strict';
  var module = angular.module('onsen');

  module.directive('onsTemplate', function($onsen, $templateCache) {
    return {
      restrict: 'E',
      transclude: false,
      priority: 1000,
      terminal: true,
      compile: function(element) {
        $templateCache.put(element.attr('id'), element.remove().html());
      }
    };
  });
})();
