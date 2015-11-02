/**
 * @ngdoc directive
 * @id switch
 * @name ons-switch
 * @category form
 * @description
 *  [en]Switch component.[/en]
 *  [ja]スイッチを表示するコンポーネントです。[/ja]
 * @guide UsingFormComponents
 *   [en]Using form components[/en]
 *   [ja]フォームを使う[/ja]
 * @guide EventHandling
 *   [en]Event handling descriptions[/en]
 *   [ja]イベント処理の使い方[/ja]
 * @seealso ons-button
 *   [en]ons-button component[/en]
 *   [ja]ons-buttonコンポーネント[/ja]
 * @example
 * <ons-switch checked></ons-switch>
 */

/**
 * @ngdoc event
 * @name change
 * @description
 *   [en]Fired when the value is changed.[/en]
 *   [ja]ON/OFFが変わった時に発火します。[/ja]
 * @param {Object} event
 *   [en]Event object.[/en]
 *   [ja]イベントオブジェクト。[/ja]
 * @param {Object} event.switch
 *   [en]Switch object.[/en]
 *   [ja]イベントが発火したSwitchオブジェクトを返します。[/ja]
 * @param {Boolean} event.value
 *   [en]Current value.[/en]
 *   [ja]現在の値を返します。[/ja]
 * @param {Boolean} event.isInteractive
 *   [en]True if the change was triggered by the user clicking on the switch.[/en]
 *   [ja]タップやクリックなどのユーザの操作によって変わった場合にはtrueを返します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name var
 * @initonly
 * @extensionOf angular
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
 *   [en]true if the switch is on.[/en]
 *   [ja]ONになっている場合にはtrueになります。[/ja]
 * @description
 *   [en]Returns true if the switch is ON.[/en]
 *   [ja]スイッチがONの場合にtrueを返します。[/ja]
 */

/**
 * @ngdoc method
 * @signature setChecked(checked)
 * @param {Boolean} checked
 *   [en]If true the switch will be set to on.[/en]
 *   [ja]ONにしたい場合にはtrueを指定します。[/ja]
 * @description
 *   [en]Set the value of the switch. isChecked can be either true or false.[/en]
 *   [ja]スイッチの値を指定します。isCheckedにはtrueもしくはfalseを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature getCheckboxElement()
 * @return {HTMLElement}
 *   [en]The underlying checkbox element.[/en]
 *   [ja]コンポーネント内部のcheckbox要素になります。[/ja]
 * @description
 *   [en]Get inner input[type=checkbox] element.[/en]
 *   [ja]スイッチが内包する、input[type=checkbox]の要素を取得します。[/ja]
 */

/**
 * @ngdoc method
 * @signature on(eventName, listener)
 * @extensionOf angular
 * @description
 *   [en]Add an event listener.[/en]
 *   [ja]イベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]このイベントが発火された際に呼び出される関数オブジェクトを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature once(eventName, listener)
 * @extensionOf angular
 * @description
 *  [en]Add an event listener that's only triggered once.[/en]
 *  [ja]一度だけ呼び出されるイベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]イベントが発火した際に呼び出される関数オブジェクトを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature off(eventName, [listener])
 * @extensionOf angular
 * @description
 *  [en]Remove an event listener. If the listener is not specified all listeners for the event type will be removed.[/en]
 *  [ja]イベントリスナーを削除します。もしイベントリスナーを指定しなかった場合には、そのイベントに紐づく全てのイベントリスナーが削除されます。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]削除するイベントリスナーを指定します。[/ja]
 */

(function(){
  'use strict';

  angular.module('onsen').directive('onsSwitch', function($onsen, SwitchView) {
    return {
      restrict: 'E',
      replace: false,
      scope: true,

      link: function(scope, element, attrs) {
        CustomElements.upgrade(element[0]);

        if (attrs.ngController) {
          throw new Error('This element can\'t accept ng-controller directive.');
        }

        var switchView = new SwitchView(element, scope, attrs);
        $onsen.addModifierMethodsForCustomElements(switchView, element);

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
          element = attrs = scope = null;
        });

        $onsen.fireComponentEvent(element[0], 'init');
      }
    };
  });
})();
