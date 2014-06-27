/**
 * @ngdoc directive
 * @id list
 * @name ons-list
 * @description
 * The container for list-item. Similar to <ul> but styled for mobile.
 * @demoURL
 * OnsenUI/demo/list/
 */
(function(){
  'use strict';

  var module = angular.module('onsen');

  module.directive('onsList', function($onsen) {
    return {
      restrict: 'E',
      replace: false,
      transclude: true,
      templateUrl: $onsen.DIRECTIVE_TEMPLATE_URL + '/list.tpl',
      link: function(scope, element, attrs) {
        scope.modifierTemplater = $onsen.generateModifierTemplater(attrs);
      }
    };
  });
})();

