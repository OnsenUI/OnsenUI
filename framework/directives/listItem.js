/**
 * @ngdoc directive
 * @id list-item
 * @name ons-list-item
 * @param modifier
 * @description
 *    [en]Component that represents each item in the list. Must be put inside ons-list component.[/en]
 *    [ja]リストの各要素を表現するためのコンポーネント。ons-listコンポーネントと共に使用します。[/ja]
 * @seealso ons-list [en]ons-list component[/en][ja]ons-listコンポーネント[/ja]
 * @seealso ons-list-header [en]ons-list-header component[/en][ja]ons-list-headerコンポーネント[/ja]
 * @guide UsingList [en]Using lists[/en][ja]リストを使う[/ja]
 * @codepen yxcCt
 * @example
 * <ons-list>
 *   <ons-list-header>Header Text</ons-list-header>
 *   <ons-list-item>Item</ons-list-item>
 *   <ons-list-item>Item</ons-list-item>
 * </ons-list>
 */
(function() {
  'use strict';

  var module = angular.module('onsen');

  module.directive('onsListItem', function($onsen) {
    return {
      restrict: 'E',

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclude.
      replace: false,
      transclude: false,

      compile: function(elem, attrs, transcludeFn) {
        var templater = $onsen.generateModifierTemplater(attrs);
        elem.addClass('list__item ons-list-item-inner');
        elem.addClass(templater('list__item--*'));
      }
    };
  });
})();
