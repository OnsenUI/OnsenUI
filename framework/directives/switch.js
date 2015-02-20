/**
 * @ngdoc directive
 * @id switch
 * @name ons-switch
 * @description
 *  [en]Switch component.[/en]
 *  [ja]スイッチを表示するコンポーネントです。[/ja]
 * @guide UsingFormComponents [en]Using form components[/en][ja]フォームを使う[/ja]
 * @guide EventHandling [en]Event handling descriptions[/en][ja]イベント処理の使い方[/ja]
 * @seealso ons-button [en]ons-button component[/en][ja]ons-buttonコンポーネント[/ja]
 * @example
 *   <ons-switch checked></ons-switch>
 */

/**
 * @ngdoc event
 * @name change
 * @description
 * [en]Fired when the value is changed.[en]
 * [ja][/ja]
 * @param {Object} event [en]Event object.[/en]
 * @param {Object} event.switch
 * @param {Boolean} event.value
 * @param {Boolean} event.isInteractive
 */

/**
 * @ngdoc attribute
 * @name var
 * @type {String}
 * @description
 *   [en]Variable name to refer this switch.[/en]
 *   [ja]JavaScriptから参照するための変数名を指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name modifier
 * @type {String}
 * @description
 *  [en]The appearance of the switch.[/en]
 *  [ja]スイッチの表現を指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name disabled
 * @description
 *   [en]Whether the switch should be disabled.[/en]
 *   [ja]スイッチを無効の状態にする場合に指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name checked
 * @description
 *   [en]Whether the switch is checked.[/en]
 *   [ja]スイッチがONの状態にするときに指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature isChecked()
 * @return {Boolean}
 * @description
 *   [en]Returns true if the switch is ON.[/en]
 *   [ja]スイッチがONの場合にtrueを返します。[/ja]
 */

/**
 * @ngdoc method
 * @signature setChecked(checked)
 * @param {Boolean} checked
 * @description
 *   [en]Set the value of the switch. isChecked can be either true or false.[/en]
 *   [ja]スイッチの値を指定します。isCheckedにはtrueもしくはfalseを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature getCheckboxElement()
 * @return {HTMLElement}
 * @description
 *   [en]Get inner input[type=checkbox] element.[/en]
 *   [ja]スイッチが内包する、input[type=checkbox]の要素を取得します。[/ja]
 */

/**
 * @ngdoc method
 * @signature on(eventName, listener)
 * @description
 *   [en]Add an event listener.[/en]
 *   [ja]イベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja][/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja][/ja]
 */

/**
 * @ngdoc method
 * @signature once(eventName, listener)
 * @description
 *  [en]Add an event listener that's only triggered once.[/en]
 *  [ja][/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja][/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja][/ja]
 */

/**
 * @ngdoc method
 * @signature off(eventName, [listener])
 * @description
 *  [en]Remove an event listener. If the listener is not specified all listeners for the event type will be removed.[/en]
 *  [ja][/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja][/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja][/ja]
 */

(function(){
  'use strict';
  var module = angular.module('onsen');

  module.directive('onsSwitch', function($onsen, $parse, SwitchView) {
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

          var label = element.children(),
              input = angular.element(label.children()[0]),
              toggle = angular.element(label.children()[1]);

          $onsen.addModifierMethods(switchView, 'switch--*', label);
          $onsen.addModifierMethods(switchView, 'switch--*__input', input);
          $onsen.addModifierMethods(switchView, 'switch--*__toggle', toggle);

          attrs.$observe('checked', function(checked) {
            scope.model = !!element.attr('checked');
          });

          attrs.$observe('name', function(name) {
            if (!!element.attr('name')) {
              checkbox.attr('name', name);
            }
          });

          if (attrs.ngModel) {
            var set = $parse(attrs.ngModel).assign;

            scope.$parent.$watch(attrs.ngModel, function(value) {
              scope.model = value;
            });

            scope.$watch('model', function(to, from) {
              set(scope.$parent, to);
              if (to !== from) {
                scope.$eval(attrs.ngChange);
              }
            });
          }

          $onsen.declareVarAttribute(attrs, switchView);
          element.data('ons-switch', switchView);

          $onsen.cleaner.onDestroy(scope, function() {
            switchView._events = undefined;
            $onsen.removeModifierMethods(switchView);
            element.data('ons-switch', undefined);
            $onsen.clearComponent({
              element : element,
              scope : scope,
              attrs : attrs
            });
            checkbox = element = attrs = scope = null;
          });

          $onsen.fireComponentEvent(element[0], 'init');
        };
      }
    };
  });
})();
