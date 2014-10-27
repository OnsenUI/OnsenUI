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
 *    [ja]スピナーを表示する場合のアニメーションを指定します。次の値から選択してください: slide-left (デフォルト), slide-right, slide-up, slide-down, expand-left, expand-right, expand-up, expand-down, zoom-out, zoom-in。[/ja]
 * @param disabled
 *    [en]Specify if button should be disabled.[/en]
 *    [ja]ボタンを無効化する場合は指定してください。[/ja]
 * @property startSpin()
 *    [en]Show spinner on the button.[/en]
 *    [ja]ボタンにスピナーを表示します。[/ja]
 * @property stopSpin()
 *    [en]Remove spinner from button.[/en]
 *    [ja]ボタンのスピナーを除きます。[/ja]
 * @property isSpinning()
 *    [en]Return whether the spinner is visible or not.[/en]
 *    [ja]ボタンにスピナーは表示されているかどうかを返します。[/ja]
 * @property setSpinAnimation(animation)
 *    [en]Set spin animation. Possible values are slide-left (default), slide-right, slide-up, slide-down, expand-left, expand-right, expand-up, expand-down, zoom-out, zoom-in. [/en]
 *    [ja]スピナーを表示する場合のアニメーションを指定します。スピナーを表示する次の値から選択してください: slide-left (デフォルト), slide-right, slide-up, slide-down, expand-left, expand-right, expand-up, expand-down, zoom-out, zoom-in。[/ja]
 * @property setDisabled(disabled)
 *    [en]Disable or enable the button.[/en]
 *    [ja]このボタンをdisabled状態にするかどうかを設定します。[/ja]
 * @property isDisabled()
 *    [en]Returns whether the button is disabled or enabled.[/en]
 *    [ja]このボタンがdisabled状態かどうかを返します。[/ja] 
 * @codepen hLayx
 * @guide Button [en]Guide for ons-button[/en][ja]ons-buttonの使い方[/ja]
 * @guide OverridingCSSstyles [en]More details about modifier attribute[/en][ja]modifier属性の使い方[/ja]
 * @example
 *   <ons-button>Tap Me</ons-button>
 */
(function(){
  'use strict';
  var module = angular.module('onsen');

  module.directive('onsButton', function($onsen, ButtonView) {
    return {
      restrict: 'E',
      replace: false,
      transclude: true,
      scope: {
        animation: '@',
      },
      templateUrl: $onsen.DIRECTIVE_TEMPLATE_URL + '/button.tpl',
      link: function(scope, element, attrs, _, transclude) {
        var button = new ButtonView(scope, element, attrs);
        
        $onsen.declareVarAttribute(attrs, button);

        $onsen.aliasStack.register('ons.button', button);
        element.data('ons-button', button);

        scope.$on('$destroy', function() {
          button._events = undefined;
          $onsen.removeModifierMethods(button);
          element.data('ons-button', undefined);
          $onsen.aliasStack.unregister('ons.button', button);
          element = null;
        });

        var initialAnimation = 'slide-left';

        scope.modifierTemplater = $onsen.generateModifierTemplater(attrs);
        element.addClass('button effeckt-button');
        element.addClass(scope.modifierTemplater('button--*'));
        element.addClass(initialAnimation);

        transclude(scope, function(cloned) {
          angular.element(element[0].querySelector('.ons-button-inner')).append(cloned);
        });

        if (attrs.ngController) {
          throw new Error('This element can\'t accept ng-controller directive.');
        }

        scope.item = {};
        // if animation is not specified -> default is slide-left
        scope.item.animation = initialAnimation;

        attrs.$observe('disabled', function(disabled) {
          if (disabled === 'true') {
            element.attr('disabled', true);
          } else {
            element.attr('disabled', false);
          }
        });

        scope.$watch('animation', function(newAnimation) {
          if (newAnimation) {
            if (scope.item.animation) {
              element.removeClass(scope.item.animation);
            }
            scope.item.animation = newAnimation;
            element.addClass(scope.item.animation);
          }
        });

        attrs.$observe('shouldSpin', function(shouldSpin) {
          if (shouldSpin === 'true') {
            element.attr('data-loading', true);
          } else {
            element.removeAttr('data-loading');
          }
        });

        $onsen.cleaner.onDestroy(scope, function() {
          $onsen.clearComponent({
            scope: scope,
            attrs: attrs,
            element: element
          });

          scope = element = attrs = null;
        });
      }
    };
  });
})();
