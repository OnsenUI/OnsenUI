/**
 * @ngdoc directive
 * @id col
 * @name ons-col
 * @description
 *    [en]Represents a column in the grid system. Use with ons-row to layout components.[/en]
 *    [ja]グリッドシステムにて列を定義します。ons-rowとともに使用し、コンポーネントの配置に使用します。[/ja]
 * @param align
 *    [en]Vertical align the column. Valid values are top, center, and bottom.[/en]
 *    [ja]縦の配置を指定します。次の値から選択してください: top, center, bottom[/ja]
 *
 * @param width
 *    [en]The width of the column. Valid values are css width values ("10%", "50px").[/en]
 *    [ja]カラムの横幅を指定します。パーセントもしくはピクセルで指定します（10%や50px）。[/ja]
 * @note
 *    [en]For Android 4.3 and earlier, and iOS6 and earlier, when using mixed alignment with ons-row and ons-column, they may not be displayed correctly. You can use only one align.[/en]
 *    [ja]Android 4.3以前、もしくはiOS 6以前のOSの場合、ons-rowとons-columnを組み合わせた場合に描画が崩れる場合があります。[/ja]
 * @codepen GgujC {wide}
 * @guide layouting [en]Layouting guide[/en][ja]レイアウト機能[/ja]
 * @seealso ons-row [en]ons-row component[/en][ja]ons-rowコンポーネント[/ja]
 * @example
 * <ons-row>
 *   <ons-col width="50px"><ons-icon icon="fa-twitter"></ons-icon></ons-col>
 *   <ons-col>Text</ons-col>
 * </ons-row>
 */
(function(){
  'use strict';

  var module = angular.module('onsen');

  module.directive('onsCol', function($timeout, $onsen) {
    return {
      restrict: 'E',
      replace: false,

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclude.
      transclude: false,
      scope: false,

      compile: function(element, attrs, transclude) {
        element.addClass('col ons-col-inner');

        return function(scope, element, attrs) {

          attrs.$observe('align', function(align) {
            updateAlign(align);
          });

          attrs.$observe('width', function(width) {
            updateWidth(width);
          });

          // For BC
          attrs.$observe('size', function(size) {
            if (!attrs.width) {
              updateWidth(size);
            }
          });

          updateAlign(attrs.align);

          if (attrs.size && !attrs.width) {
            updateWidth(attrs.size);
          } else {
            updateWidth(attrs.width);
          }

          $onsen.cleaner.onDestroy(scope, function() {
            $onsen.clearComponent({
              scope: scope,
              element: element,
              attrs: attrs
            });
            element = attrs = scope = null;
          });

          function updateAlign(align) {
            if (align === 'top' || align === 'center' || align === 'bottom') {
              element.removeClass('col-top col-center col-bottom');
              element.addClass('col-' + align);
            } else {
              element.removeClass('col-top col-center col-bottom');
            }
          }

          function updateWidth(width) {
            if (typeof width  === 'string') {
              width = ('' + width).trim();
              width = width.match(/^\d+$/) ? width + '%' : width;

              element.css({
                '-webkit-box-flex': '0',
                '-webkit-flex': '0 0 ' + width,
                '-moz-box-flex': '0',
                '-moz-flex': '0 0 ' + width,
                '-ms-flex': '0 0 ' + width,
                'flex': '0 0 ' + width,
                'max-width': width
              });
            } else {
              element.removeAttr('style');
            }
          }
        };
      }
    };
  });
})();

