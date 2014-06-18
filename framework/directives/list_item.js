/**
 * @ngdoc directive
 * @id list-item
 * @name ons-list-item
 * @description
 * Works like <li> but styled for mobile. Must be put inside list tag.
 */
(function() {
  'use strict';

  var module = angular.module('onsen');

  module.directive('onsListItem', function($onsen) {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      templateUrl: $onsen.DIRECTIVE_TEMPLATE_URL + '/list_item.tpl',
      compile: function(elem, attrs, transcludeFn) {
        var templater = $onsen.generateModifierTemplater(attrs);
        return function(scope, element, attrs) {
          scope.modifierTemplater = templater;
          transcludeFn(scope, function(clone) {
            element.append(clone);
          });
        };
      }
    };
  });
})();
