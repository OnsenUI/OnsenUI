/**
 * @ngdoc directive
 * @id list
 * @name ons-list
 * @category list
 * @modifier inset
 *   [en]Inset list that doesn't cover the whole width of the parent.[/en]
 *   [ja]親要素の画面いっぱいに広がらないリストを表示します。[/ja]
 * @modifier noborder
 *   [en]A list with no borders at the top and bottom.[/en]
 *   [ja]リストの上下のボーダーが無いリストを表示します。[/ja]
 * @description
 *   [en]Component to define a list, and the container for ons-list-item(s).[/en]
 *   [ja]リストを表現するためのコンポーネント。ons-list-itemのコンテナとして使用します。[/ja]
 * @seealso ons-list-item
 *   [en]ons-list-item component[/en]
 *   [ja]ons-list-itemコンポーネント[/ja]
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
 *   [en]The appearance of the list.[/en]
 *   [ja]リストの表現を指定します。[/ja]
 */

(function() {
  'use strict';

  angular.module('onsen').directive('onsList', function($onsen, GenericView) {
    return {
      restrict: 'E',
      link: function(scope, element, attrs) {
        new GenericView(scope, element, attrs, {
          viewKey: 'ons-list'
        });

        $onsen.fireComponentEvent(element[0], 'init');
      }
    };
  });

})();
