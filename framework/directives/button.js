/**
 * @ngdoc directive
 * @id button
 * @name ons-button
 * @description
 *    [en]Button component. If you want to place a button in a toolbar, use ons-toolbar-button or ons-back-button instead.[/en]
 *    [ja]ボタン用コンポーネント。ツールバーにボタンを設置する場合は、ons-toolbar-buttonもしくはons-back-buttonコンポーネントを使用してください。[/ja]
 * @param modifier
 *    [en]The appearance of the button. Predefined modifiers are quiet, light, large, large--quiet, cta, and large--cta.[/en]
 *    [ja]ボタンの表現を指定します。次の値からも選択できます: quiet, light, large, large--quiet, cta, large--cta[/ja]
 * @param should-spin
 *    [en]Specify if the button should have a spinner.[/en]
 *    [ja]ボタンにスピナーを表示する場合は指定してください。[/ja]
 * @param animation
 *    [en]The animation when the button transitions to and from the spinner. Possible values are slide-left (default), slide-right, slide-up, slide-down, expand-left, expand-right, expand-up, expand-down, zoom-out, zoom-in.[/en]
 *    [ja]スピナーを表示する場合のアニメーションを指定します。次の値から選択してください: slide-left (デフォルト), slide-right, slide-up, slide-down, expand-left, expand-right, expand-up, expand-down, zoom-out, zoom-in[/ja]
 * @param disabled
 *    [en]Specify if button should be disabled.[/en]
 *    [ja]ボタンを無効化する場合は指定してください。[/ja]
 * @codepen hLayx
 * @guide Button [en]Guide for ons-button[/en][ja]ons-buttonの使い方[/ja]
 * @guide OverridingCSSstyles [en]More details about modifier attribute[/en][ja]modifier属性の使い方[/ja]
 */
(function(){
  'use strict';
  var module = angular.module('onsen');

  module.directive('onsButton', function($onsen) {
    return {
      restrict: 'E',
      replace: false,
      transclude: true,
      scope: {
        shouldSpin: '@',
        animation: '@',
        onsType: '@',
        disabled: '@'
      },
      templateUrl: $onsen.DIRECTIVE_TEMPLATE_URL + '/button.tpl',
      link: function(scope, element, attrs){
        if (attrs.ngController) {
          throw new Error('This element can\'t accept ng-controller directive.');
        }

        var effectButton = element.children();
        var TYPE_PREFIX = 'button--';
        scope.item = {};

        scope.modifierTemplater = $onsen.generateModifierTemplater(attrs);

        // if animation is not specified -> default is slide-left
        if (scope.animation === undefined || scope.animation === '') {
          scope.item.animation = 'slide-left';
        }

        scope.$watch('disabled', function(disabled) {
          if (disabled === 'true') {
            effectButton.attr('disabled', true);
          } else {
            effectButton.attr('disabled', false);
          }
        });

        scope.$watch('animation', function(newAnimation) {
          if (newAnimation) {
            scope.item.animation = newAnimation;
          }
        });

        scope.$watch('shouldSpin', function(shouldSpin) {
          if (shouldSpin === 'true') {
            effectButton.attr('data-loading', true);
          } else {
            effectButton.removeAttr('data-loading');
          }
        });
      }
    };
  });
})();
