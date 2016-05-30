/**
 * @element ons-carousel
 * @description
 *   [en]Carousel component.[/en]
 *   [ja]カルーセルを表示できるコンポーネント。[/ja]
 * @codepen xbbzOQ
 * @guide UsingCarousel
 *   [en]Learn how to use the carousel component.[/en]
 *   [ja]carouselコンポーネントの使い方[/ja]
 * @example
 * <ons-carousel style="width: 100%; height: 200px">
 *   <ons-carousel-item>
 *    ...
 *   </ons-carousel-item>
 *   <ons-carousel-item>
 *    ...
 *   </ons-carousel-item>
 * </ons-carousel>
 */

/**
 * @attribute var
 * @initonly
 * @type {String}
 * @description
 *   [en]Variable name to refer this carousel.[/en]
 *   [ja]このカルーセルを参照するための変数名を指定します。[/ja]
 */

/**
 * @attribute ons-postchange
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "postchange" event is fired.[/en]
 *  [ja]"postchange"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-refresh
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "refresh" event is fired.[/en]
 *  [ja]"refresh"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-overscroll
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "overscroll" event is fired.[/en]
 *  [ja]"overscroll"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-destroy
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "destroy" event is fired.[/en]
 *  [ja]"destroy"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @method once
 * @signature once(eventName, listener)
 * @description
 *  [en]Add an event listener that's only triggered once.[/en]
 *  [ja]一度だけ呼び出されるイベントリスナを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]イベントが発火した際に呼び出される関数オブジェクトを指定します。[/ja]
 */

/**
 * @method off
 * @signature off(eventName, [listener])
 * @description
 *  [en]Remove an event listener. If the listener is not specified all listeners for the event type will be removed.[/en]
 *  [ja]イベントリスナーを削除します。もしイベントリスナーが指定されなかった場合には、そのイベントに紐付いているイベントリスナーが全て削除されます。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]イベントが発火した際に呼び出される関数オブジェクトを指定します。[/ja]
 */

/**
 * @method on
 * @signature on(eventName, listener)
 * @description
 *   [en]Add an event listener.[/en]
 *   [ja]イベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]イベントが発火した際に呼び出される関数オブジェクトを指定します。[/ja]
 */

(function() {
  'use strict';

  var module = angular.module('onsen');

  module.directive('onsCarousel', function($onsen, CarouselView) {
    return {
      restrict: 'E',
      replace: false,

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclude.
      scope: false,
      transclude: false,

      compile: function(element, attrs) {
        CustomElements.upgrade(element[0]);

        return function(scope, element, attrs) {
          CustomElements.upgrade(element[0]);
          var carousel = new CarouselView(scope, element, attrs);

          element.data('ons-carousel', carousel);

          $onsen.registerEventHandlers(carousel, 'postchange refresh overscroll destroy');
          $onsen.declareVarAttribute(attrs, carousel);

          scope.$on('$destroy', function() {
            carousel._events = undefined;
            element.data('ons-carousel', undefined);
            element = null;
          });

          $onsen.fireComponentEvent(element[0], 'init');
        };
      },

    };
  });

  module.directive('onsCarouselItem', function() {
    return {
      restrict: 'E',
      compile: function(element, attrs) {
        CustomElements.upgrade(element[0]);
        return function(scope, element, attrs) {
          CustomElements.upgrade(element[0]);
          if (scope.$last) {
            element[0].parentElement._setup();
            element[0].parentElement._setupInitialIndex();
            element[0].parentElement._saveLastState();
          }
        };
      }
    };
  });

})();

