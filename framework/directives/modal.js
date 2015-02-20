/**
 * @ngdoc directive
 * @id modal
 * @name ons-modal
 * @description 
 *   [en]Modal component that masks current screen. Underlying components are not subject to any events while the modal component is shown.[/en]
 *   [ja]画面全体をマスクするモーダル用コンポーネントです。下側にあるコンポーネントは、モーダルが表示されている間はイベント通知が行われません。[/ja]
 * @guide UsingModal [en]Using ons-modal component[/en][ja]モーダルの使い方[/ja]
 * @guide CallingComponentAPIsfromJavaScript [en]Using navigator from JavaScript[/en][ja]JavaScriptからコンポーネントを呼び出す[/ja]
 * @codepen devIg
 * @example
 * <ons-modal>
 *   ...
 * </ons-modal>
 */

/**
 * @ngdoc attribute
 * @name var
 * @type {String}
 * @description
 *   [en]Variable name to refer this modal.[/en]
 *   [ja]このモーダルを参照するための名前を指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature toggle()
 * @description
 *   [en]Toggle modal visibility.[/en]
 *   [ja]モーダルの表示を切り替えます。[/ja]
 */

/**
 * @ngdoc method
 * @signature show()
 * @description
 *   [en]Show modal.[/en]
 *   [ja]モーダルを表示します。[/ja]
 */

/**
 * @ngdoc method
 * @signature hide()
 * @description
 *   [en]Hide modal.[/en]
 *   [ja]モーダルを非表示にします。[/ja]
 */

/**
 * @ngdoc method
 * @signature getDeviceBackButtonHandler()
 * @return {Object}
 *   [en]Device back button handler.[/en]
 *   [ja][/ja]
 * @description
 *   [en]Retrieve the back button handler.[/en]
 *   [ja]ons-modalに紐付いているバックボタンハンドラを取得します。[/ja]
 */

(function() {
  'use strict';

  var module = angular.module('onsen');

  /**
   * Modal directive.
   */
  module.directive('onsModal', function($onsen, ModalView) {
    return {
      restrict: 'E',
      replace: false,

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclde.
      scope: false, 
      transclude: false,

      compile: function(element, attrs) {
        compile(element, attrs);

        return {
          pre: function(scope, element, attrs) {
            var page = element.inheritedData('ons-page');
            if (page) {
              page.registerExtraElement(element);
            }

            var modal = new ModalView(scope, element);

            $onsen.addModifierMethods(modal, 'modal--*', element);
            $onsen.addModifierMethods(modal, 'modal--*__content', element.children());

            $onsen.declareVarAttribute(attrs, modal);

            element.data('ons-modal', modal);

            scope.$on('$destroy', function() {
              modal._events = undefined;
              $onsen.removeModifierMethods(modal);
              element.data('ons-modal', undefined);
            });
          },

          post: function(scope, element) {
            $onsen.fireComponentEvent(element[0], 'init');
          }
        };
      }
    };

    function compile(element, attrs) {
      var modifierTemplater = $onsen.generateModifierTemplater(attrs);

      var html = element[0].innerHTML;
      element[0].innerHTML = '';

      var wrapper = angular.element('<div></div>');
      wrapper.addClass('modal__content');
      wrapper.addClass(modifierTemplater('modal--*__content'));

      element.css('display', 'none');
      element.addClass('modal');
      element.addClass(modifierTemplater('modal--*'));

      wrapper[0].innerHTML = html;
      element.append(wrapper);
    }
  });

})();
