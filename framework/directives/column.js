/*
Copyright 2013-2014 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

/**
 * @ngdoc directive
 * @id col
 * @name ons-col
 * @description
 * Use with <ons-row> to layout component.
 * @param align Vertical align the column. Valid values are [top/center/bottom].
 * @param size The width of the column. Valid values are css "width" value. eg. "10%", "50px"
 * @note For Android 4.3 and earlier, and iOS6 and earlier, when using mixed alignment with ons-row and ons-column, they may not be displayed correctly. You can use only one align.
 */
(function(){
  'use strict';

  var module = angular.module('onsen');

  module.directive('onsCol', function($timeout, $onsen) {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      scope: {
        align: '@'
      },
      templateUrl: $onsen.DIRECTIVE_TEMPLATE_URL + '/column.tpl',
      compile: function(elt, attrs, transclude) {

        return function(scope, elt, attrs) {

          if (attrs.ngController) {
            throw new Error('This element can\'t accept ng-controller directive.');
          }

          attrs.$observe('size', function(size) {
            size = ('' + size).trim();
            size = size.match(/^\d+$/) ? size + '%' : size;

            scope.style = {
              '-webkit-box-flex': '0',
              '-webkit-flex': '0 0 ' + size,
              '-moz-box-flex': '0',
              '-moz-flex': '0 0 ' + size,
              '-ms-flex': '0 0 ' + size,
              'flex': '0 0 ' + size,
              'max-width': size
            };
          });

          transclude(scope.$parent, function(clone) {
            elt.append(clone);
          });
        };
      }
    };
  });
})();

