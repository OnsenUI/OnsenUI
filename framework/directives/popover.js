/**
* @ngdoc directive
* @id popover 
* @name ons-popover 
* @description
*  [en]A component that displays a popover next to an element.[/en]
*  [ja]ある要素を対象とするポップオーバーを表示するコンポーネントです。[/ja]
* @param var 
*  [en]Variable name to refer this popover.[/en]
*  [ja]このポップオーバーを参照するための名前を指定します。[/ja]
* @param modifier
*  [en]The appearance of the popover.[/en]
*  [ja]ポップオーバーの表現を指定します。[/ja]
* @param direction
*  [en]A space separated list of directions. If more than one will be chosen automatically. Valid directions are "up", "down", "left" and "right".[/en]
*  [ja]ポップオーバーを表示する方向を空白区切りで複数指定できます。指定できる方向は、"up", "down", "left", "right"の4つです。複数指定された場合、対象とする要素に合わせて指定した値から自動的に選択されます。[/ja]
* @param cancelable
*  [en]If this attribute is set the popover can be closed by tapping the background or pressing the back button.[/en] 
*  [ja]この属性があると、ポップオーバーが表示された時に、背景やバックボタンをタップした時にダイアログを閉じます。[/ja]
* @param disabled
*  [en]If this attribute is set the popover is disabled.[/en]
*  [ja]この属性がある時、ポップオーバーはdisabled状態になります。[/ja]
* @param animation
*  [en]The animation used when showing an hiding the popover. Can be either "none" or "fade".[/en]
*  [ja]ポップオーバーを表示する際のアニメーション名を指定します。[/ja]
* @param mask-color
*  [en]Color of the background mask. Default is "rgba(0, 0, 0, 0.2)".[/en]
*  [ja]背景のマスクの色を指定します。デフォルトは"rgba(0, 0, 0, 0.2)"です。[/ja]
* @property show(target,options)
*  [en]Open the popover and point it at a target. The target can be either an event, a css selector or a DOM element..[/en]
*  [ja]対象とする要素にポップオーバーを表示します。target引数には、$eventオブジェクトやDOMエレメントやCSSセレクタを渡すことが出来ます。[/ja]
* @property hide()
*  [en]Close the popover.[/en]
*  [ja]ポップオーバーを閉じます。[/ja]
* @property isShown()
*  [en]Returns whether the popover is visible or not.[/en]
*  [ja]ポップオーバーが表示されているかどうかを返します。[/ja]
* @property destroy()
*  [en]Destroy the popover and remove it from the DOM tree.[/en]
*  [ja]ポップオーバーを破棄して、DOMツリーから取り除きます。[/ja]
* @property setCancelable(cancelable)
*  [en]Set whether the popover can be canceled by the user when it is shown.[/en]
*  [ja]ポップオーバーを表示した際に、ユーザがそのポップオーバーをキャンセルできるかどうかを指定します。[/ja]
* @property isCancelable()
*  [en]Returns whether the popover is cancelable or not.[/en]
*  [ja]このポップオーバーがキャンセル可能かどうかを返します。[/ja]
* @property setDisabled(disabled)
*  [en]Disable or enable the popover.[/en]
*  [ja]このポップオーバーをdisabled状態にするかどうかを設定します。[/ja]
* @property isDisabled()
*  [en]Returns whether the popover is disabled or enabled.[/en]
*  [ja]このポップオーバーがdisabled状態かどうかを返します。[/ja]
* @property on(eventName,listener)
*  [en]Add an event listener. Preset events are "preshow", "postshow", "prehide" and "posthide".[/en]
*  [ja]イベントリスナーを追加します。preshow, postshow, prehide, posthideを指定できます。[/ja]
* @codepen ZYYRKo
* @example
* <script>
* ons.ready(function() {
*   ons.createPopover('popover.html').then(function(popover) {
*     popover.show('#mybutton');   
*   });
* });
* </script>
*
* <script type="text/ons-template" id="popover.html">
*   <ons-popover cancelable>
*     <p style="text-align: center; opacity: 0.5;">This popover will choose which side it's displayed on automatically.</p>
*   </ons-popover>
* </script>
*/

(function(){
  'use strict';

  var module = angular.module('onsen');

  module.directive('onsPopover', function($onsen, PopoverView) {
    return {
      restrict: 'E',
      replace: false,
      transclude: true,
      scope: true,
      templateUrl: $onsen.DIRECTIVE_TEMPLATE_URL + '/popover.tpl',
      compile: function(element, attrs, transclude) {
        return { 
          pre: function(scope, element, attrs) {
            transclude(scope, function(clone) {
              angular.element(element[0].querySelector('.popover__content')).append(clone);
            });

            var popover = new PopoverView(scope, element, attrs);

            $onsen.declareVarAttribute(attrs, popover);
            $onsen.aliasStack.register('ons.popover', popover);

            element.data('ons-popover', popover);

            scope.$on('$destroy', function() {
              popover._events = undefined;
              $onsen.removeModifierMethods(popover);
              element.data('ons-popover', undefined);
              $onsen.aliasStack.unregister('ons.popover', popover);
              element = null;
            });

            scope.modifierTemplater = $onsen.generateModifierTemplater(attrs);
            $onsen.addModifierMethods(popover, 'popover--*', angular.element(element[0].querySelector('.popover'))); 
            $onsen.addModifierMethods(popover, 'popover__content--*', angular.element(element[0].querySelector('.popover__content'))); 

            if ($onsen.isAndroid()) {
              setImmediate(function() {
                popover.addModifier('android');
              });
            }

            scope.direction = 'up';
            scope.arrowPosition = 'bottom';
          },
          post: function(scope, element) {
            $onsen.fireComponentEvent(element[0], 'init');
          }
        };
      }
    };
  });
})();

