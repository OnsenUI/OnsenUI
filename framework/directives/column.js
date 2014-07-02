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
 * @param size The size of the column in percentage. Valid values are [10/20/25/33/67/75/80/90]
 * @param offset Offset the column. Valid values are [10/20/25/33/67/75/80/90]
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
        align: '@',
        size: '@',
        offst: '@'
      },
      templateUrl: $onsen.DIRECTIVE_TEMPLATE_URL + '/column.tpl',
      compile: function(elt, attr, transclude) {
        return function(scope, elt, attr) {
          transclude(scope.$parent, function(clone) {
            elt.append(clone);
          });
        };
      }
    };
  });
})();

