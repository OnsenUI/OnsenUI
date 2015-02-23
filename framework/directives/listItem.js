/**
 * @ngdoc directive
 * @id list-item
 * @name ons-list-item
 * @category list
 * @modifier tappable
 *   [en]Made the list item change appearance when it's tapped.[/en]
 *   [ja]タップやクリックした時に効果が表示されるようになります。[/ja]
 * @modifier chevron
 *   [en]Display a chevron at the right end of the list item and make it change appearance when tapped.[/en]
 *   [ja]要素の右側に右矢印が表示されます。また、タップやクリックした時に効果が表示されるようになります。[/ja]
 * @description
 *   [en]Component that represents each item in the list. Must be put inside the ons-list component.[/en]
 *   [ja]リストの各要素を表現するためのコンポーネントです。ons-listコンポーネントと共に使用します。[/ja]
 * @seealso ons-list
 *   [en]ons-list component[/en]
 *   [ja]ons-listコンポーネント[/ja]
 * @seealso ons-list-header
 *   [en]ons-list-header component[/en]
 *   [ja]ons-list-headerコンポーネント[/ja]
 * @guide UsingList 
 *   [en]Using lists[/en]
 *   [ja]リストを使う[/ja]
 * @codepen yxcCt
 * @example
 * <ons-list>
 *   <ons-list-header>Header Text</ons-list-header>
 *   <ons-list-item>Item</ons-list-item>
 *   <ons-list-item>Item</ons-list-item>
 * </ons-list>
 */

/**
 * @ngdoc attribute
 * @name modifier
 * @type {String}
 * @description
 *   [en]The appearance of the list item.[/en]
 *   [ja]各要素の表現を指定します。[/ja]
 */

(function() {
  'use strict';

  var module = angular.module('onsen');

  module.directive('onsListItem', function($onsen, GenericView) {
    return {
      restrict: 'E',

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclude.
      replace: false,
      transclude: false,

      compile: function() {
        return function(scope, element, attrs) {
          var listItem = new GenericView(scope, element, attrs);

          $onsen.declareVarAttribute(attrs, listItem);

          element.data('ons-list-item', listItem);

          scope.$on('$destroy', function() {
            listItem._events = undefined;
            $onsen.removeModifierMethods(listItem);
            element.data('ons-list-item', undefined);
            element = null;
          });

          var templater = $onsen.generateModifierTemplater(attrs);
          element.addClass('list__item ons-list-item-inner');
          element.addClass(templater('list__item--*'));

          $onsen.addModifierMethods(listItem, 'list__item--*', element);

          $onsen.fireComponentEvent(element[0], 'init');
        };
      }
    };
  });
})();
