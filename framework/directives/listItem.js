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
 * @id list-item
 * @name ons-list-item
 * @description
 * Works like <li> but styled for mobile. Must be put inside ons-list tag.
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
