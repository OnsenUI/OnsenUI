/**
 * @ngdoc directive
 * @id row
 * @name ons-row
 * @description
 *   [en]Represents a row in the grid system. Use with ons-col to layout components.[/en]
 *   [ja]グリッドシステムにて行を定義します。ons-colとともに使用し、コンポーネントの配置に使用します。[/ja]
 * @codepen GgujC {wide}
 * @guide Layouting [en]Layouting guide[/en][ja]レイアウト調整[/ja]
 * @seealso ons-col [en]ons-col component[/en][ja]ons-colコンポーネント[/ja]
 * @example
 *   <ons-row>
 *     <ons-col width="50px"><ons-icon icon="fa-twitter"></ons-icon></ons-col>
 *     <ons-col>Text</ons-col>
 *   </ons-row>
 */

/**
 * @ngdoc attribute
 * @name align
 * @type {String}
 * @description
 *   [en]Short hand attribute for aligning vertically. Valid values are top, bottom, and center.[/en]
 *   [ja]縦に整列するために指定します。top、bottom、centerのいずれかを指定できます。[/ja]
 *   [en]For Android 4.3 and earlier, and iOS6 and earlier, when using mixed alignment with ons-row and ons-column, they may not be displayed correctly. You can use only one align.[/en]
 *   [ja]Android 4.3以前、もしくはiOS 6以前のOSの場合、ons-rowとons-columnを組み合わせた場合に描画が崩れる場合があります。[/ja]
 */

(function(){
  'use strict';

  var module = angular.module('onsen');

  module.directive('onsRow', function($onsen, $timeout) {
    return {
      restrict: 'E',
      replace: false,

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclude.
      transclude: false,
      scope: false,

      compile: function(element, attrs) {
        element.addClass('row ons-row-inner');

        return function(scope, element, attrs) {
          attrs.$observe('align', function(align) {
            update();
          });

          update();

          function update() {
            var align = ('' + attrs.align).trim();
            if (align === 'top' || align === 'center' || align === 'bottom') {
              element.removeClass('row-bottom row-center row-top');
              element.addClass('row-' + align);
            }
          }

          $onsen.fireComponentEvent(element[0], 'init');
        };
      }
    };
  });
})();

