/**
 * @ngdoc directive
 * @id carousel
 * @name ons-carousel
 *
 * @description
 *   [en]Carousel component.[/en]
 *   [ja]カルーセルを表示できるコンポーネント。[/ja]
 *
 * @param direction
 *    [en]The direction of the carousel. Can be either "horizontal" or "vertical". Default is "horizontal".[/en]
 *    [ja]カルーセルの方向を指定します。horizontalかverticalを指定できます。デフォルトはhorizontalです。[/ja]
 * @param fullscreen
 *    [en]If this attribute is set the carousel will cover the whole screen.[/en]
 *    [ja]この属性があると、absoluteポジションを使ってカルーセルが自動的に画面いっぱいに広がります。[/ja]
 * @param var
 *    [en]Variable name to refer this carousel.[/en]
 *    [ja]このカルーセルを参照するための変数名を指定します。[/ja]
 * @param overscrollable
 *    [en]If this attribute is set the carousel will be scrollable over the edge. It will bounce back when released.[/en]
 *    [ja]この属性がある時、タッチやドラッグで端までスクロールした時に、バウンドするような効果が当たります。[/ja]
 * @param item-width
 *    [en]ons-carousel-item's width. Only works when the direction is set to "horizontal".[/en]
 *    [ja]ons-carousel-itemの幅を指定します。direction属性にhorizontalを指定した時のみ有効です。[/ja]
 * @param item-height
 *    [en]ons-carousel-item's height. Only works when the direction is set to "vertical".[/en]
 *    [ja]ons-carousel-itemの高さを指定します。direction属性にverticalを指定した時のみ有効です。[/ja]
 * @param auto-scroll
 *    [en]If this attribute is set the carousel will be automatically scrolled to the closest item border when released.[/en]
 *    [ja]この属性がある時、一番近いcarosel-itemの境界まで自動的にスクロールするようになります。[/ja]
 * @param swipeable
 *    [en]If this attribute is set the carousel can be scrolled by drag or swipe.[/en]
 *    [ja]この属性がある時、カルーセルをスワイプやドラッグで移動できるようになります。[/ja]
 * @param disabled
 *    [en]If this attribute is set the carousel is disabled.[/en]
 *    [ja]この属性がある時、dargやtouchやswipeで受け付けなくなります。[/ja]
 * @param initial-index
 *    [en]Specify the index of the ons-carousel-item to show initially. Default is 0.[/en]
 *    [ja]最初に表示するons-carousel-itemを0始まりのインデックスで指定します。デフォルトは0です。[/ja]
 * @param auto-refresh
 *    [en]When this attribute is set the carousel will automatically refresh when the number of child nodes change.[/en]
 *    [ja]この属性がある時、子要素の数が変わるとカルーセルは自動的に更新されます。[/ja]
 *
 * @property next()
 *    [en]Show next ons-carousel item.[/en]
 *    [ja]次のons-carousel-itemを表示する。[/ja] 
 * @property prev()
 *    [en]Show previous ons-carousel item.[/en]
 *    [ja]前のons-carousel-itemを表示する。[/ja] 
 * @property first()
 *    [en]Show first ons-carousel item.[/en]
 *    [ja]最初のons-carousel-itemを表示する。[/ja] 
 * @property last()
 *    [en]Show last ons-carousel item.[/en]
 *    [ja]最後のons-carousel-itemを表示する。[/ja] 
 * @property setSwipeable(swipeable)
 *    [en]Set whether the carousel is swipeable or not.[/en]
 *    [ja]swipeable属性があるかどうかを設定する。[/ja] 
 * @property isSwipeable()
 *    [en]Returns whether the carousel is swipeable or not.[/en]
 *    [ja]swiapble属性があるかどうかを返す。[/ja] 
 * @property setActiveCarouselItemIndex(index)
 *    [en]Specify the index of the ons-carousel-item to show.[/en]
 *    [ja]表示するons-carousel-itemをindexで指定する。[/ja] 
 * @property getActiveCarouselItemIndex()
 *    [en]Returns the index of the currently visible ons-carousel-item.[/en]
 *    [ja]現在表示されているons-carousel-itemのindexを返す。[/ja] 
 * @property setAutoScrollEnabled(enabled)
 *    [en]Enable or disable "auto-scroll" attribute.[/en]
 *    [ja]auto-scroll属性があるかどうかを設定する。[/ja] 
 * @property isAutoScrollEnabled()
 *    [en]Returns whether the "auto-scroll" attribute is set or not.[/en]
 *    [ja]auto-scroll属性があるかどうかを返す。[/ja] 
 * @property setOverscrollable(overscrollable)
 *    [en]Set whether the carousel is overscrollable or not.[/en]
 *    [ja]overscroll属性があるかどうかを設定する。[/ja] 
 * @property isOverscrollable()
 *    [en]Returns whether the carousel is overscrollable or not.[/en]
 *    [ja]overscroll属性があるかどうかを返す。[/ja] 
 * @property on(eventName,listener)
 *    [en]Add an event listener. Preset events are "postchange" and "refresh".[/en]
 *    [ja]イベントリスナーを追加します。"postchange"か"refresh"を指定できます。[/ja]
 * @property refresh()
 *    [en]Update the layout of the carousel. Used when adding ons-carousel-items dynamically or to automatically adjust the size.[/en]
 *    [ja]レイアウトや内部の状態を最新のものに更新する。ons-carousel-itemを動的に増やしたり、ons-carouselの大きさを動的に変える際に利用する。[/ja] 
 * @property isDisabled()
 *    [en]Returns whether the dialog is disabled or enabled.[/en]
 *    [ja]disabled属性があるかどうかを返す。[/ja] 
 * @property setDisabled(disabled)
 *    [en]Disable or enable the dialog.[/en]
 *    [ja]disabled属性があるかどうかを設定する。[/ja] 
 * @codepen xbbzOQ
 * @example
 *   <ons-carousel style="width: 100%; height: 200px">
 *     <ons-carousel-item>
 *      ...
 *     </ons-carousel-item>
 *     <ons-carousel-item>
 *      ...
 *     </ons-carousel-item>
 *   </ons-carousel>
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
        var templater = $onsen.generateModifierTemplater(attrs);

        element.addClass(templater('carousel--*'));

        return function(scope, element, attrs) {
          setImmediate(function() {
            var carousel = new CarouselView(scope, element, attrs);

            $onsen.aliasStack.register('ons.carousel', carousel);
            element.data('ons-carousel', carousel);

            $onsen.declareVarAttribute(attrs, carousel);

            scope.$on('$destroy', function() {
              carousel._events = undefined;
              element.data('ons-carousel', undefined);
              $onsen.aliasStack.unregister('ons.carousel', carousel);
              element = null;
            });

            if (element[0].hasAttribute('auto-refresh')) {
              // Refresh carousel when items are added or removed.
              scope.$watch(
                function () { 
                  return element[0].childNodes.length; 
                },
                function () {
                  carousel.refresh();
                }
              );
            }

            $onsen.fireComponentEvent(element[0], 'init');
          });
        };
      },

    };
  });

  module.directive('onsCarouselItem', function($onsen) {
    return {
      restrict: 'E',
      replace: false,

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclude.
      scope: false,
      transclude: false,

      compile: function(element, attrs) {
        var templater = $onsen.generateModifierTemplater(attrs);

        element.addClass(templater('carousel-item--*'));
        element.css('width', '100%');

        return function(scope, element, attrs) {
        };
      },

    };
  });
})();

