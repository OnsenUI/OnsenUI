/**
 * @ngdoc directive
 * @id bottom_toolbar
 * @name ons-bottom-toolbar
 * @description
 * Use this component to have toolbar position at the bottom of the page.
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

  module.directive('onsBottomToolbar', function($onsen) {
    return {
      restrict: 'E',
      transclude: true,
      replace: true,
      templateUrl: $onsen.DIRECTIVE_TEMPLATE_URL + '/bottom_toolbar.tpl',
      link: function(scope, element, attrs) {
        // modifier
        scope.modifierTemplater = $onsen.generateModifierTemplater(attrs);
      }
    };
  });
})();

