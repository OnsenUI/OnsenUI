/**
 * @ngdoc directive
 * @id col
 * @name ons-col
 * @description
 * Use to layout component.
 * @param align Vertical align the column. Valid values are [top/center/bottom].
 * @param width The width of the column. Valid values are css "width" value. eg. "10%", "50px"
 * @note For Android 4.3 and earlier, and iOS6 and earlier, when using mixed alignment with ons-row and ons-column, they may not be displayed correctly. You can use only one align.
 * @codepen GgujC {wide}
 * @guide layouting Layouting guide
 * @seealso ons-row ons-row component
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

