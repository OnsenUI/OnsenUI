
/**
 * @element ons-button
 */

/**
 * @method setDisabled
 * @signature setDisabled(disabled)
 * @description
 *   [en]Disable or enable the button.[/en]
 *   [ja]このボタンをdisabled状態にするかどうかを設定します。[/ja]
 * @param {String} disabled
 *   [en]If true the button will be disabled.[/en]
 *   [ja]disabled状態にするかどうかを真偽値で指定します。[/ja]
 */

/**
 * @method isDisabled
 * @signature isDisabled()
 * @return {Boolean}
 *   [en]true if the button is disabled.[/en]
 *   [ja]ボタンがdisabled状態になっているかどうかを返します。[/ja]
 * @description
 *   [en]Returns whether the button is disabled or enabled.[/en]
 *   [ja]このボタンがdisabled状態かどうかを返します。[/ja]
 */

(function(){
  'use strict';

  angular.module('onsen').directive('onsButton', function($onsen, GenericView) {
    return {
      restrict: 'E',
      link: function(scope, element, attrs) {
        CustomElements.upgrade(element[0]);
        var button = GenericView.register(scope, element, attrs, {
          viewKey: 'ons-button'
        });

        /**
         * Returns whether the button is disabled or not.
         */
        button.isDisabled = function() {
          return this._element[0].hasAttribute('disabled');
        };

        /**
         * Disabled or enable button.
         */
        button.setDisabled = function(disabled) {
          if (disabled) {
            this._element[0].setAttribute('disabled', '');
          } else {
            this._element[0].removeAttribute('disabled');
          }
        };

        $onsen.fireComponentEvent(element[0], 'init');
      }
    };
  });



})();
