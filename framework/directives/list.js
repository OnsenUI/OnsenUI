/**
 * @ngdoc directive
 * @id list
 * @name ons-list
 * @modifier inset
 *   [en]Inset list that doesn't cover the whole width of the parent.[/en]
 *   [ja][/ja]
 * @modifier noborder
 *   [en]A list with no borders at the top and bottom.[/en]
 *   [ja][/ja]
 * @description
 *   [en]Component to define a list, and the container for ons-list-item(s).[/en]
 *   [ja]リストを表現するためのコンポーネント。ons-list-itemのコンテナとして使用します。[/ja]
 * @seealso ons-list-item [en]ons-list-item component[/en][ja]ons-list-itemコンポーネント[/ja]
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

/**
 * @ngdoc attribute
 * @name modifier
 * @type {String}
 * @description
 *   [en]The appearance of the list.[/en]
 *   [ja]リストの表現を指定します。[/ja]
 */

(function() {
  'use strict';

  var module = angular.module('onsen');

  module.directive('onsList', function($onsen, GenericView) {
    return {
      restrict: 'E',
      scope: false,

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclude.
      replace: false,
      transclude: false,
      compile: function(element, attrs) {

        return function(scope, element, attrs) {
          var list = new GenericView(scope, element, attrs);

          $onsen.declareVarAttribute(attrs, list);
          element.data('ons-list', list);

          scope.$on('$destroy', function() {
            list._events = undefined;
            $onsen.removeModifierMethods(list);
            element.data('ons-list', undefined);
            element = null;
          });

          var templater = $onsen.generateModifierTemplater(attrs);

          element.addClass('list ons-list-inner');
          element.addClass(templater('list--*'));

          $onsen.addModifierMethods(list, 'list--*', element);
          $onsen.fireComponentEvent(element[0], 'init');
        };
      }
    };
  });
})();

