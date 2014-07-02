/**
 * @ngdoc directive
 * @id text-area
 * @name ons-text-area
 * @description
 * Component for inputting text.
 * @param rows The number of rows
 * @param cols The number of columns
 * @param placeholder The placeholder inside the text area.
 * @param disabled Wether the input should be disabled.
 */
(function(){
  'use strict';

  var module = angular.module('onsen');

  module.directive('onsTextArea', function($onsen) {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      templateUrl: $onsen.DIRECTIVE_TEMPLATE_URL + '/text_area.tpl',
      link: function(scope, element, attrs) {
        var classes = $onsen.generateModifierTemplater(attrs)('textarea--*');
        element.addClass(classes);
      }
    };
  });
})();

