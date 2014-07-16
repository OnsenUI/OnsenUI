/**
 * @ngdoc directive
 * @id list-item
 * @name ons-list-item
 * @param modifier
 * @description
 * Works like <li> but styled for mobile. Must be put inside ons-list tag.
 * @seealso ons-list ons-list component
 * @seealso ons-list-header ons-list-header component
 * @guide using-lists Using lists
 * @codepen yxcCt
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
