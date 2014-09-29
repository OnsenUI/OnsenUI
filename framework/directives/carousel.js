/**
 * @ngdoc directive
 * @id carousel
 * @name ons-carousel
 * @param modifier
 * @param direction
 * @param item-width
 * @param 
 * @example
 * <ons-carousel>
 *   <ons-carousel-item>Header Text</ons-carousel-item>
 *   <ons-carousel-cover>Header Text</ons-carousel-cover>
 * </ons-carousel>
 */
(function() {
  'use strict';

  var module = angular.module('onsen');

  module.directive('onsCarousel', function($onsen, CarouselView) {
    return {
      restrict: 'E',
      replace: false,

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclude.
      scope: false,
      transclude: false,

      compile: function(element, attrs) {
        var templater = $onsen.generateModifierTemplater(attrs);

        element.addClass(templater('carousel--*'));

        return function(scope, element, attrs) {
          setImmediate(function() {
            var carouselView = new CarouselView(scope, element, attrs);
          });
        };
      },

    };
  });

  module.directive('onsCarouselItem', function($onsen) {
    return {
      restrict: 'E',
      replace: false,

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclude.
      scope: false,
      transclude: false,

      compile: function(element, attrs) {
        var templater = $onsen.generateModifierTemplater(attrs);

        element.addClass(templater('carousel-item--*'));
        element.css('width', '100%');

        return function(scope, element, attrs) {
        };
      },

    };
  });
})();

