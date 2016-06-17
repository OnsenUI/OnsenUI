/**
 * @ngdoc directive
 * @id input
 * @name ons-input
 * @category form
 * @description
 *  [en]Input component.[/en]
 *  [ja]inputコンポ―ネントです。[/ja]
 * @codepen ojQxLj
 * @guide UsingFormComponents
 *   [en]Using form components[/en]
 *   [ja]フォームを使う[/ja]
 * @guide EventHandling
 *   [en]Event handling descriptions[/en]
 *   [ja]イベント処理の使い方[/ja]
 * @example
 * <ons-input></ons-input>
 * <ons-input modifier="material" label="Username"></ons-input>
 */

/**
 * @ngdoc attribute
 * @name label
 * @type {String}
 * @description
 *   [en]Text for animated floating label.[/en]
 *   [ja]アニメーションさせるフローティングラベルのテキストを指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name float
 * @description
 *  [en]If this attribute is present, the label will be animated.[/en]
 *  [ja]この属性が設定された時、ラベルはアニメーションするようになります。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ng-model
 * @extensionOf angular
 * @description
 *   [en]Bind the value to a model. Works just like for normal input elements.[/en]
 *   [ja]この要素の値をモデルに紐付けます。通常のinput要素の様に動作します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ng-change
 * @extensionOf angular
 * @description
 *   [en]Executes an expression when the value changes. Works just like for normal input elements.[/en]
 *   [ja]値が変わった時にこの属性で指定したexpressionが実行されます。通常のinput要素の様に動作します。[/ja]
 */

(function(){
  'use strict';

  angular.module('onsen').directive('onsInput', function($parse) {
    return {
      restrict: 'E',
      replace: false,
      scope: false,

      link: function(scope, element, attrs) {
        CustomElements.upgrade(element[0]);
        let el = element[0];

        const onInput = () => {
          const set = $parse(attrs.ngModel).assign;

          if (el._isTextInput) {
            set(scope, el.value);
          }
          else if (el.type === 'radio' && el.checked) {
            set(scope, el.value);
          }
          else {
            set(scope, el.checked);
          }

          if (attrs.ngChange) {
            scope.$eval(attrs.ngChange);
          }

          scope.$parent.$evalAsync();
        };

        if (attrs.ngModel) {
          scope.$watch(attrs.ngModel, (value) => {
            if (el._isTextInput && typeof value !== 'undefined') {
              el.value = value;
            }
            else if (el.type === 'radio') {
              el.checked = value === el.value;
            }
            else {
              el.checked = value;
            }
          });

          el._isTextInput
            ? element.on('input', onInput)
            : element.on('change', onInput);
        }

        scope.$on('$destroy', () => {
          el._isTextInput
            ? element.off('input', onInput)
            : element.off('change', onInput);

          scope = element = attrs = el = null;
        });
      }
    };
  });
})();
