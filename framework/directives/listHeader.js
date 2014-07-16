/**
 * @ngdoc directive
 * @id list-header
 * @name ons-list-header
 * @param modifier
 * @description
 * Header element for list items. Must be put inside ons-list tag.
 * @seealso ons-list ons-list component
 * @seealso ons-list-item ons-list-item component
 * @guide using-lists Using lists
 * @codepen yxcCt
 */
(function() {
  'use strict';

  var module = angular.module('onsen');

  module.directive('onsListHeader', function($onsen) {
    return {
      restrict: 'E',

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclude.
      replace: false,
      transclude: false,

      compile: function(elem, attrs, transcludeFn) {
        var templater = $onsen.generateModifierTemplater(attrs);
        elem.addClass('list__header ons-list-header-inner');
        elem.addClass(templater('list__header--*'));
      }
    };
  });
})();
