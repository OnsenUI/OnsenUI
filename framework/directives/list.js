/**
 * @ngdoc directive
 * @id list
 * @name ons-list
 * @description
 * The container for list-item. Similar to <ul> but styled for mobile.
 * @example
 * <pre>
 * <ons-navigator title="List">
 * <ons-list>
 * <ons-list-item class="topcoat-list__item__line-height">Numbers</ons-list-item>
 * <ons-list-item class="topcoat-list__item__line-height">One</ons-list-item>
 * <ons-list-item class="topcoat-list__item__line-height">Two</ons-list-item>
 * <ons-list-item class="topcoat-list__item__line-height">Three</ons-list-item>
 * <ons-list-item class="topcoat-list__item__line-height">Four</ons-list-item>
 * <ons-list-item class="topcoat-list__item__line-height">Five</ons-list-item>
 * <ons-list-item class="topcoat-list__item__line-height">Six</ons-list-item>
 * </ons-list>
 * </ons-navigator>
 * </pre>
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

