/**
 * @ngdoc directive
 * @id carousel
 * @name ons-carousel
 * @category carousel
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
 * @ngdoc event
 * @name postchange
 * @description
 *   [en]Fired just after the current carousel item has changed.[/en]
 *   [ja]現在表示しているカルーセルの要素が変わった時に発火します。[/ja]
 * @param {Object} event 
 *   [en]Event object.[/en]
 *   [ja]イベントオブジェクトです。[/ja]
 * @param {Object} event.carousel
 *   [en]Carousel object.[/en]
 *   [ja]イベントが発火したCarouselオブジェクトです。[/ja]
 * @param {Number} event.activeIndex
 *   [en]Current active index.[/en]
 *   [ja][/ja]
 * @param {Number} event.lastActiveIndex
 *   [en]Previous active index.[/en]
 *   [ja][/ja]
 */

/**
 * @ngdoc event
 * @name refresh
 * @description
 *   [en]Fired when the carousel has been refreshed.[/en]
 *   [ja]カルーセルが更新された時に発火します。[/ja]
 * @param {Object} event
 *   [en]Event object.[/en]
 *   [ja]イベントオブジェクトです。[/ja]
 * @param {Object} event.carousel
 *   [en]Carousel object.[/en]
 *   [ja]イベントが発火したCarouselオブジェクトです。[/ja]
 */

/**
 * @ngdoc event
 * @name overscroll
 * @description
 *   [en]Fired when the carousel has been overscrolled.[/en]
 *   [ja]カルーセルがオーバースクロールした時に発火します。[/ja]
 * @param {Object} event 
 *   [en]Event object.[/en]
 *   [ja]イベントオブジェクトです。[/ja]
 * @param {Object} event.carousel
 *   [en]Fired when the carousel has been refreshed.[/en]
 *   [ja]カルーセルが更新された時に発火します。[/ja]
 * @param {Number} event.activeIndex
 *   [en]Current active index.[/en]
 *   [ja][/ja]
 * @param {String} event.direction
 *   [en]Can be one of either "up", "down", "left" or "right".[/en]
 *   [ja]オーバースクロールされた方向が得られます。"up", "down", "left", "right"のいずれかの方向が渡されます。[/ja]
 * @param {Function} event.waitToReturn
 *   [en]Takes a <code>Promise</code> object as an argument. The carousel will not scroll back until the promise has been resolved or rejected.[/en]
 *   [ja]この関数はPromiseオブジェクトを引数として受け取ります。渡したPromiseオブジェクトがresolveされるかrejectされるまで、カルーセルはスクロールバックしません。[/ja]
 */

/**
 * @ngdoc attribute
 * @name direction
 * @type {String}
 * @description
 *   [en]The direction of the carousel. Can be either "horizontal" or "vertical". Default is "horizontal".[/en]
 *   [ja]カルーセルの方向を指定します。"horizontal"か"vertical"を指定できます。"horizontal"がデフォルト値です。[/ja]
 */

/**
 * @ngdoc attribute
 * @name fullscreen
 * @description
 *   [en]If this attribute is set the carousel will cover the whole screen.[/en]
 *   [ja]この属性があると、absoluteポジションを使ってカルーセルが自動的に画面いっぱいに広がります。[/ja]
 */

/**
 * @ngdoc attribute
 * @name var
 * @type {String}
 * @description
 *   [en]Variable name to refer this carousel.[/en]
 *   [ja]このカルーセルを参照するための変数名を指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name overscrollable
 * @description
 *   [en]If this attribute is set the carousel will be scrollable over the edge. It will bounce back when released.[/en]
 *   [ja]この属性がある時、タッチやドラッグで端までスクロールした時に、バウンドするような効果が当たります。[/ja]
 */

/**
 * @ngdoc attribute
 * @name item-width
 * @type {String}
 * @description
 *    [en]ons-carousel-item's width. Only works when the direction is set to "horizontal".[/en]
 *    [ja]ons-carousel-itemの幅を指定します。この属性は、direction属性に"horizontal"を指定した時のみ有効になります。[/ja]
 */

/**
 * @ngdoc attribute
 * @name item-height
 * @type {String}
 * @description
 *   [en]ons-carousel-item's height. Only works when the direction is set to "vertical".[/en]
 *   [ja]ons-carousel-itemの高さを指定します。この属性は、direction属性に"vertical"を指定した時のみ有効になります。[/ja]
 */

/**
 * @ngdoc attribute
 * @name auto-scroll
 * @description
 *   [en]If this attribute is set the carousel will be automatically scrolled to the closest item border when released.[/en]
 *   [ja]この属性がある時、一番近いcarosel-itemの境界まで自動的にスクロールするようになります。[/ja]
 */

/**
 * @ngdoc attribute
 * @name auto-scroll-ratio
 * @type {Number}
 * @description
 *    [en]A number between 0.0 and 1.0 that specifies how much the user must drag the carousel in order for it to auto scroll to the next item.[/en]
 *    [ja]0.0から1.0までの値を指定します。カルーセルの要素をどれぐらいの割合までドラッグすると次の要素に自動的にスクロールするかを指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name swipeable
 * @description
 *   [en]If this attribute is set the carousel can be scrolled by drag or swipe.[/en]
 *   [ja]この属性がある時、カルーセルをスワイプやドラッグで移動できるようになります。[/ja]
 */

/**
 * @ngdoc attribute
 * @name disabled
 * @description
 *   [en]If this attribute is set the carousel is disabled.[/en]
 *   [ja]この属性がある時、dragやtouchやswipeを受け付けなくなります。[/ja]
 */

/**
 * @ngdoc attribute
 * @name intial-index
 * @type {Number}
 * @description
 *   [en]Specify the index of the ons-carousel-item to show initially. Default is 0.[/en]
 *   [ja]最初に表示するons-carousel-itemを0始まりのインデックスで指定します。デフォルト値は 0 です。[/ja]
 */

/**
 * @ngdoc attribute
 * @name auto-refresh
 * @description
 *   [en]When this attribute is set the carousel will automatically refresh when the number of child nodes change.[/en]
 *   [ja]この属性がある時、子要素の数が変わるとカルーセルは自動的に更新されるようになります。[/ja]
 */

/**
 * @ngdoc method
 * @signature next()
 * @description
 *   [en]Show next ons-carousel item.[/en]
 *   [ja]次のons-carousel-itemを表示します。[/ja]
 */

/**
 * @ngdoc method
 * @signature prev()
 * @description
 *   [en]Show previous ons-carousel item.[/en]
 *   [ja]前のons-carousel-itemを表示します。[/ja]
 */

/**
 * @ngdoc method
 * @signature first()
 * @description
 *   [en]Show first ons-carousel item.[/en]
 *   [ja]最初のons-carousel-itemを表示します。[/ja]
 */

/**
 * @ngdoc method
 * @signature last()
 * @description
 *   [en]Show last ons-carousel item.[/en]
 *   [ja]最後のons-carousel-itemを表示します。[/ja]
 */

/**
 * @ngdoc method
 * @signature setSwipeable(swipeable)
 * @param {Booelan} swipeable
 *   [en]If value is true the carousel will be swipeable.[/en]
 *   [ja]swipeableにする場合にはtrueを指定します。[/ja]
 * @description
 *   [en]Set whether the carousel is swipeable or not.[/en]
 *   [ja]swipeできるかどうかを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature isSwipeable()
 * @return {Boolean}
 *   [en]true if the carousel is swipeable.[/en]
 *   [ja]swipeableであればtrueを返します。[/ja]
 * @description
 *   [en]Returns whether the carousel is swipeable or not.[/en]
 *   [ja]swiapble属性があるかどうかを返します。[/ja]
 */

/**
 * @ngdoc method
 * @signature setActiveCarouselItemIndex(index)
 * @param {Number} index
 *   [en]The index that the carousel should be set to.[/en]
 *   [ja]carousel要素のインデックスを指定します。[/ja]
 * @description
 *   [en]Specify the index of the ons-carousel-item to show.[/en]
 *   [ja]表示するons-carousel-itemをindexで指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature getActiveCarouselItemIndex()
 * @return {Number}
 *   [en]The current carousel item index.[/en]
 *   [ja]現在表示しているカルーセル要素のインデックスが返されます。[/ja]
 * @description
 *   [en]Returns the index of the currently visible ons-carousel-item.[/en]
 *   [ja]現在表示されているons-carousel-item要素のインデックスを返します。[/ja]
 */

/**
 * @ngdoc method
 * @signature setAutoScrollEnabled(enabled)
 * @param {Boolean} enabled
 *   [en]If true auto scroll will be enabled.[/en]
 *   [ja]オートスクロールを有効にする場合にはtrueを渡します。[/ja]
 * @description
 *   [en]Enable or disable "auto-scroll" attribute.[/en]
 *   [ja]auto-scroll属性があるかどうかを設定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature isAutoScrollEnabled()
 * @return {Boolean}
 *   [en]true if auto scroll is enabled.[/en]
 *   [ja]オートスクロールが有効であればtrueを返します。[/ja]
 * @description
 *   [en]Returns whether the "auto-scroll" attribute is set or not.[/en]
 *   [ja]auto-scroll属性があるかどうかを返します。[/ja]
 */

/**
 * @ngdoc method
 * @signature setAutoScrollRatio(ratio)
 * @param {Number} ratio
 *   [en]The desired ratio.[/en]
 *   [ja]オートスクロールするのに必要な0.0から1.0までのratio値を指定します。[/ja]
 * @description
 *   [en]Set the auto scroll ratio. Must be a value between 0.0 and 1.0.[/en]
 *   [ja]オートスクロールするのに必要なratio値を指定します。0.0から1.0を必ず指定しなければならない。[/ja]
 */

/**
 * @ngdoc method
 * @signature getAutoScrollRatio()
 * @return {Number}
 *   [en]The current auto scroll ratio.[/en]
 *   [ja]現在のオートスクロールのratio値。[/ja]
 * @description
 *   [en]Returns the current auto scroll ratio.[/en]
 *   [ja]現在のオートスクロールのratio値を返します。[/ja]
 */

/**
 * @ngdoc method
 * @signature setOverscrollable(overscrollable)
 * @param {Boolean} overscrollable
 *   [en]If true the carousel will be overscrollable.[/en]
 *   [ja]overscrollできるかどうかを指定します。[/ja]
 * @description
 *   [en]Set whether the carousel is overscrollable or not.[/en]
 *   [ja]overscroll属性があるかどうかを設定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature isOverscrollable()
 * @return {Boolean}
 *   [en]Whether the carousel is overscrollable or not.[/en]
 *   [ja]overscrollできればtrueを返します。[/ja]
 * @description
 *   [en]Returns whether the carousel is overscrollable or not.[/en]
 *   [ja]overscroll属性があるかどうかを返します。[/ja]
 */

/**
 * @ngdoc method
 * @signature refresh()
 * @description
 *   [en]Update the layout of the carousel. Used when adding ons-carousel-items dynamically or to automatically adjust the size.[/en]
 *   [ja]レイアウトや内部の状態を最新のものに更新します。ons-carousel-itemを動的に増やしたり、ons-carouselの大きさを動的に変える際に利用します。[/ja]
 */

/**
 * @ngdoc method
 * @signature isDisabled()
 * @return {Boolean}
 *   [en]Whether the carousel is disabled or not.[/en]
 *   [ja]disabled状態になっていればtrueを返します。[/ja]
 * @description
 *   [en]Returns whether the dialog is disabled or enabled.[/en]
 *   [ja]disabled属性があるかどうかを返します。[/ja]
 */

/**
 * @ngdoc method
 * @signature setDisabled(disabled)
 * @param {Boolean} disabled
 *   [en]If true the carousel will be disabled.[/en]
 *   [ja]disabled状態にする場合にはtrueを指定します。[/ja]
 * @description
 *   [en]Disable or enable the dialog.[/en]
 *   [ja]disabled属性があるかどうかを設定します。[/ja]
 */

/**
 * @ngdoc method
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

/**
 * @ngdoc method
 * @signature once(eventName, listener)
 * @description
 *  [en]Add an event listener that's only triggered once.[/en]
 *  [ja][/ja]
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
          var carousel = new CarouselView(scope, element, attrs);

          element.data('ons-carousel', carousel);

          $onsen.declareVarAttribute(attrs, carousel);

          scope.$on('$destroy', function() {
            carousel._events = undefined;
            element.data('ons-carousel', undefined);
            element = null;
          });

          if (element[0].hasAttribute('auto-refresh')) {
            // Refresh carousel when items are added or removed.
            scope.$watch(
              function () {
                return element[0].childNodes.length;
              },
              function () {
                setImmediate(function() {
                  carousel.refresh();
                });
              }
            );
          }

          setImmediate(function() {
            carousel.refresh();
          });

          $onsen.fireComponentEvent(element[0], 'init');
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

