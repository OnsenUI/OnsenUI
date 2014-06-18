/**
 * @ngdoc directive
 * @id search-input
 * @name ons-search-input
 * @description
 * Component for inputting search text.
 * @param placeholder The placeholder inside the input area.
 * @param disabled Wether the input should be disabled.
 */
(function(){
  'use strict';

  var module = angular.module('onsen');

  module.directive('onsSearchInput', function($onsen) {
    return {
      restrict: 'E',
      replace: true,
      transclude: false,
      templateUrl: $onsen.DIRECTIVE_TEMPLATE_URL + '/search_input.tpl',
      link: function(scope, element, attrs) {
        element.addClass($onsen.generateModifierTemplater(attrs)('topcoat-search-input--*'));
      }
    };
  });
})();

