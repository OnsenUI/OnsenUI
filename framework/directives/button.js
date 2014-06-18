/**
 * @ngdoc directive
 * @id button
 * @name ons-button
 * @description
 * Button component. It includes a spinner useful for showing work in progress.
 * @param type The type of the button. Can be any of [ 'quiet', 'large', 'large--quiet', 'cta', 'large--cta' ]
 * @param should-spin Wether the button shoud switch to show spinner
 * @param animation The animation when the button transitions to and from the spinner. Can be any of [ 'expand-left', 'expand-right', 'expand-up', 'expand-down', 'slide-left', 'slide-right', 'slide-up', 'slide-down', 'zoom-out', 'zoom-in' ]. The default is 'slide-left'
 * @param disabled Wether the button shoud be disabled.
 */
(function(){
  'use strict';
  var module = angular.module('onsen');

  module.directive('onsButton', function($onsen) {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      scope: {
        shouldSpin: '@',
        animation: '@',
        onsType: '@',
        disabled: '@'
      },
      templateUrl: $onsen.DIRECTIVE_TEMPLATE_URL + '/button.tpl',
      link: function(scope, element, attrs){
        var effectButton = element;
        var TYPE_PREFIX = "topcoat-button--";
        scope.item = {};

        scope.modifierTemplater = $onsen.generateModifierTemplater(attrs);

        // if animation is not specified -> default is slide-left
        if(scope.animation === undefined || scope.animation === ""){
          scope.item.animation = "slide-left";
        }

        scope.$watch('disabled', function(disabled){
          if(disabled === "true"){
            effectButton.attr('disabled', true);
          }else{
            effectButton.attr('disabled', false);
          }
        });

        scope.$watch('animation', function(newAnimation){
          if(newAnimation){
            scope.item.animation = newAnimation;
          }
        });

        scope.$watch('shouldSpin', function(shouldSpin){
          if(shouldSpin === "true"){
            effectButton.attr('data-loading', true);
          }else{
            effectButton.removeAttr('data-loading');
          }
        });
      }
    };
  });
})();
