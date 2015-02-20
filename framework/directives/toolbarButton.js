/**
 * @ngdoc directive
 * @id toolbar_button
 * @name ons-toolbar-button
 * @modifier quiet
 *   [en]A button that doesn't stand out.[/en]
 *   [ja][/ja]
 * @modifier outline
 *   [en]A button with an outline.[/en]
 *   [ja][/ja]
 * @description
 *   [en]Button component for ons-toolbar and ons-bottom-toolbar.[/en]
 *   [ja]ons-toolbarあるいはons-bottom-toolbarに設置できるボタン用コンポーネントです。[/ja]
 * @codepen aHmGL
 * @guide Addingatoolbar [en]Adding a toolbar[/en][ja]ツールバーの追加[/ja]
 * @seealso ons-toolbar [en]ons-toolbar component[/en][ja]ons-toolbarコンポーネント[/ja]
 * @seealso ons-back-button [en]ons-back-button component[/en][ja]ons-back-buttonコンポーネント[/ja]
 * @seealso ons-toolbar-button [en]ons-toolbar-button component[/en][ja]ons-toolbar-buttonコンポーネント[/ja]
 * @example
 *   <ons-toolbar>
 *     <div class="left"><ons-toolbar-button>Button</ons-toolbar-button></div>
 *     <div class="center">Title</div>
 *     <div class="right"><ons-toolbar-button><ons-icon icon="ion-navion" size="28px"></ons-icon></ons-toolbar-button></div>
 *   </ons-toolbar>
 */

/**
 * @ngdoc attribute
 * @name var
 * @type {String}
 * @description
 *   [en]Variable name to refer this buttom.[/en]
 *   [ja]このボタンを参照するための名前を指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name modifier
 * @type {String}
 * @description
 *   [en]The appearance of the button.[/en]
 *   [ja]ボタンの表現を指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name disabled
 * @description
 *   [en]Specify if button should be disabled.[/en]
 *   [ja]ボタンを無効化する場合は指定してください。[/ja]
 */

(function(){
  'use strict';
  var module = angular.module('onsen');

  module.directive('onsToolbarButton', function($onsen, GenericView) {
    return {
      restrict: 'E',
      transclude: true,
      scope: {},
      templateUrl: $onsen.DIRECTIVE_TEMPLATE_URL + '/toolbar_button.tpl',
      link: {
        pre: function(scope, element, attrs) {
          var toolbarButton = new GenericView(scope, element, attrs),
            innerElement = element[0].querySelector('.toolbar-button');

          $onsen.declareVarAttribute(attrs, toolbarButton);

          element.data('ons-toolbar-button', toolbarButton);

          scope.$on('$destroy', function() {
            toolbarButton._events = undefined;
            $onsen.removeModifierMethods(toolbarButton);
            element.data('ons-toolbar-button', undefined);
            element = null;
          });

          var modifierTemplater = $onsen.generateModifierTemplater(attrs);

          if (attrs.ngController) {
            throw new Error('This element can\'t accept ng-controller directive.');
          }

          attrs.$observe('disabled', function(value) {
            if (value === false || typeof value === 'undefined') {
              innerElement.removeAttribute('disabled');
            }
            else {
              innerElement.setAttribute('disabled', 'disabled');
            }
          });

          scope.modifierTemplater = $onsen.generateModifierTemplater(attrs);
          $onsen.addModifierMethods(toolbarButton, 'toolbar-button--*', element.children());

          element.children('span').addClass(modifierTemplater('toolbar-button--*'));

          $onsen.cleaner.onDestroy(scope, function() {
            $onsen.clearComponent({
              scope: scope,
              attrs: attrs,
              element: element,
            });
            scope = element = attrs = null;
          });
        },
        post: function(scope, element, attrs) {
          $onsen.fireComponentEvent(element[0], 'init');
        }
      }
    };
  });
})();
