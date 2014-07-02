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
        var TYPE_PREFIX = "button--";
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
