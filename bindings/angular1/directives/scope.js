/**
 * @element ons-scope
 * @category util
 * @description
 *   [en]All child elements using the "var" attribute will be attached to the scope of this element.[/en]
 *   [ja]"var"属性を使っている全ての子要素のviewオブジェクトは、この要素のAngularJSスコープに追加されます。[/ja]
 * @example
 * <ons-list>
 *   <ons-list-item ons-scope ng-repeat="item in items">
 *     <ons-carousel var="carousel">
 *       <ons-carousel-item ng-click="carousel.next()">
 *         {{ item }}
 *       </ons-carousel-item>
 *       </ons-carousel-item ng-click="carousel.prev()">
 *         ...
 *       </ons-carousel-item>
 *     </ons-carousel>
 *   </ons-list-item>
 * </ons-list>
 */

(function() {
  'use strict';

  var module = angular.module('onsen');

  module.directive('onsScope', function($onsen) {
    return {
      restrict: 'A',
      replace: false,
      transclude: false,
      scope: false,

      link: function(scope, element) {
        element.data('_scope', scope);

        scope.$on('$destroy', function() {
          element.data('_scope', undefined);
        });
      }
    };
  });
})();
