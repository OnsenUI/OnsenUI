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
      scope: false,

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclude.

      templateUrl: $onsen.DIRECTIVE_TEMPLATE_URL + '/list.tpl',
      link: function(scope, element, attrs, controller, transclude) {
        scope.modifierTemplater = $onsen.generateModifierTemplater(attrs);

        transclude(scope, function(clonedElement) {
          angular.element(element[0].querySelector('.list__container')).append(clonedElement);
        });
      }
    };
  });
})();

