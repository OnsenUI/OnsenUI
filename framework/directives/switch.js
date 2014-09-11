/**
 * @ngdoc directive
 * @id switch
 * @name ons-switch
 * @description
 *  [en]Switch component.[/en]
 *  [ja]スイッチを表示するコンポーネントです。[/ja]
 * @param disabled
 *  [en]Whether the switch should be disabled.[/en]
 *  [ja]スイッチを無効の状態にする場合に指定します。[/ja]
 * @param checked
 *  [en]Whether the switch is checked.[/en]
 *  [ja]スイッチがONの状態にするときに指定します。[/ja]
 * @param var
 *  [en]Variable name to refer this switch.[/en]
 *  [ja]JavaScriptから参照するための変数名を指定します。[/ja]
 * @param modifier
 *  [en]Modifier name to apply custom styles.[/en]
 *  [ja]カスタムなスタイルを適用するための名前を指定します。[/ja]
 * @property isChecked()
 *  [en]Returns true if the switch is ON.[/en]
 *  [ja]スイッチがONの場合にtrueを返します。[/ja]
 * @property setChecked(isChecked)
 *  [en]Set the value of the switch. isChecked can be either true or false.[/en]
 *  [ja]スイッチの値を指定します。isCheckedにはtrueもしくはfalseを指定します。[/ja]
 * @property getCheckboxElement()
 *  [en]Get inner input[type=checkbox] element.[/en]
 *  [ja]スイッチが内包する、input[type=checkbox]の要素を取得します。[/ja]
 * @property on(eventName,listener)
 *  [en]Add an event listener. Possible event name is change.[/en]
 *  [ja]イベントリスナーを追加します。changeイベントを使用できます。[/ja]
 * @guide UsingFormComponents [en]Using form components[/en][ja]フォームを使う[/ja]
 * @guide EventHandling [en]Event handling descriptions[/en][ja]イベント処理の使い方[/ja]
 * @seealso ons-button [en]ons-button component[/en][ja]ons-buttonコンポーネント[/ja]
 * @example
 *   <ons-switch checked></ons-switch>
 */
(function(){
  'use strict';
  var module = angular.module('onsen');

  module.directive('onsSwitch', function($onsen, SwitchView) {
    return {
      restrict: 'E',
      replace: false,

      transclude: false,
      scope: true,

      templateUrl: $onsen.DIRECTIVE_TEMPLATE_URL + '/switch.tpl',
      compile: function(element) {
        return function(scope, element, attrs) {
          if (attrs.ngController) {
            throw new Error('This element can\'t accept ng-controller directive.');
          }

          var switchView = new SwitchView(element, scope, attrs);
          var checkbox = angular.element(element[0].querySelector('input[type=checkbox]'));

          scope.modifierTemplater = $onsen.generateModifierTemplater(attrs);
          attrs.$observe('checked', function(checked) {
            scope.model = !!element.attr('checked');
          });

          attrs.$observe('name', function(name) {
            if (!!element.attr('name')) {
              checkbox.attr('name', name);
            }
          });

          if (attrs.ngModel) {
            scope.$parent.$watch(attrs.ngModel, function(value) {
              scope.model = value;
            });

            scope.$watch('model', function(model) {
              scope.$parent[attrs.ngModel] = model;
            });

            scope.$parent[attrs.ngModel] = !!element.attr('checked');
          }

          $onsen.declareVarAttribute(attrs, switchView);
          element.data('ons-switch', switchView);
          $onsen.aliasStack.register('ons.switch', switchView);

          $onsen.cleaner.onDestroy(scope, function() {
            element.data('ons-switch', undefined);
            $onsen.aliasStack.unregister('ons.switch', switchView);
            $onsen.clearComponent({
              element : element,
              scope : scope,
              attrs : attrs
            });
            checkbox = element = attrs = scope = null;
          });
        };
      }
    };
  });
})();
