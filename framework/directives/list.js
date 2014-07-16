/**
 * @ngdoc directive
 * @id list
 * @name ons-list
 * @description
 * The container for list-item. Similar to <ul> but styled for mobile.
 * @param modifier
 * @seealso ons-list-item ons-list-item component
 * @seealso ons-list-header ons-list-header component
 * @guide using-lists Using lists
 * @codepen yxcCt
 */
(function(){
  'use strict';

  var module = angular.module('onsen');

  module.directive('onsList', function($onsen) {
    return {
      restrict: 'E',
      scope: false,

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclude.
      replace: false,
      transclude: false,

      compile: function(element, attrs) {
        var templater = $onsen.generateModifierTemplater(attrs);

        element.addClass('list ons-list-inner');
        element.addClass(templater('list--*'));
      }
    };
  });
})();

