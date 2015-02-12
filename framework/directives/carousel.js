/**
 * @ngdoc directive
 * @id carousel
 * @name ons-carousel
 *
 * @description
 *   [en]Carousel component.[/en]
 *   [ja]カルーセルを表示できるコンポーネント。[/ja]
 *
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

/**
 * @ngdoc event
 * @name postchange
 * @description
 * [en]Fired just after the current carousel item has changed..[/en]
 * [ja][/ja]
 * @param {Object} event [en]Event object.[/en]
 * @param {Object} event.carousel
 * @param {Number} event.activeIndex 
 * @param {Number} event.lastActiveIndex
 */

/**
 * @ngdoc event
 * @name refresh
 * @description
 * [en]Fired when the carousel has been refreshed.[/en]
 * [ja][/ja]
 * @param {Object} event [en]Event object.[/en]
 * @param {Object} event.carousel
 */

/**
 * @ngdoc event
 * @name overscroll
 * @description
 * [en]Fired when the carousel has been overscrolled.[/en]
 * [ja][/ja]
 * @param {Object} event [en]Event object.[/en]
 * @param {Object} event.carousel
 * @param {Number} event.activeIndex
 * @param {String} event.direction
 *   [en]Can be one of either "up", "down", "left" or "right".[/en]
 *   [ja][/ja]
 * @param {Function} event.waitToReturn
 *   [en]Takes a <code>Promise</code> object as an argument. The carousel will not scroll back until the promise has been resolved or rejected.[/en]
 *   [ja][/ja]
 */

/**
 * @ngdoc attribute
 * @name direction
 * @type {String}
 * @description
 *   [en]The direction of the carousel. Can be either "horizontal" or "vertical". Default is "horizontal".[/en]
 *   [ja]カルーセルの方向を指定します。horizontalかverticalを指定できます。デフォルトはhorizontalです。[/ja]
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
 *    [en]If this attribute is set the carousel will be scrollable over the edge. It will bounce back when released.[/en]
 *    [ja]この属性がある時、タッチやドラッグで端までスクロールした時に、バウンドするような効果が当たります。[/ja]
 */

/**
 * @ngdoc attribute
 * @name item-width
 * @type {String}
 * @description
 *    [en]ons-carousel-item's width. Only works when the direction is set to "horizontal".[/en]
 *    [ja]ons-carousel-itemの幅を指定します。direction属性にhorizontalを指定した時のみ有効です。[/ja]
 */

/**
 * @ngdoc attribute
 * @name item-height
 * @type {String}
 * @description
 *   [en]ons-carousel-item's height. Only works when the direction is set to "vertical".[/en]
 *   [ja]ons-carousel-itemの高さを指定します。direction属性にverticalを指定した時のみ有効です。[/ja]
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
 *    [en]A number between 0.0 and 1.0 that specifies how much the user must drag the carousel in order for it to auto scroll to the next item.[en]
 *    [ja][/ja]
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
 *   [ja]この属性がある時、dargやtouchやswipeで受け付けなくなります。[/ja]
 */

/**
 * @ngdoc attribute
 * @name intial-index
 * @type {Number}
 * @description
 *   [en]Specify the index of the ons-carousel-item to show initially. Default is 0.[/en]
 *   [ja]最初に表示するons-carousel-itemを0始まりのインデックスで指定します。デフォルトは0です。[/ja]
 */

/**
 * @ngdoc attribute
 * @name auto-refresh
 * @description
 *   [en]When this attribute is set the carousel will automatically refresh when the number of child nodes change.[/en]
 *   [ja]この属性がある時、子要素の数が変わるとカルーセルは自動的に更新されます。[/ja]
 */

/**
 * @ngdoc method
 * @signature next()
 * @description
 *   [en]Show next ons-carousel item.[/en]
 *   [ja]次のons-carousel-itemを表示する。[/ja] 
 */

/**
 * @ngdoc method
 * @signature prev()
 * @description
 *   [en]Show previous ons-carousel item.[/en]
 *   [ja]前のons-carousel-itemを表示する。[/ja] 
 */

/**
 * @ngdoc method
 * @signature first()
 * @description
 *   [en]Show first ons-carousel item.[/en]
 *   [ja]最初のons-carousel-itemを表示する。[/ja] 
 */

/**
 * @ngdoc method
 * @signature last()
 * @description
 *   [en]Show last ons-carousel item.[/en]
 *   [ja]最後のons-carousel-itemを表示する。[/ja] 
 */

/**
 * @ngdoc method
 * @signature setSwipeable(swipeable)
 * @param {Booelan} swipeable
 * @description
 *   [en]Set whether the carousel is swipeable or not.[/en]
 *   [ja]swipeable属性があるかどうかを設定する。[/ja] 
 */

/**
 * @ngdoc method
 * @signature isSwipeable()
 * @return {Boolean}
 * @description
 *   [en]Returns whether the carousel is swipeable or not.[/en]
 *   [ja]swiapble属性があるかどうかを返す。[/ja] 
 */

/**
 * @ngdoc method
 * @signature setActiveCarouselItemIndex(index)
 * @param {Number} index
 * @description
 *   [en]Specify the index of the ons-carousel-item to show.[/en]
 *   [ja]表示するons-carousel-itemをindexで指定する。[/ja] 
 */

/**
 * @ngdoc method
 * @signature getActiveCarouselItemIndex(index)
 * @return {Number}
 * @description
 *   [en]Returns the index of the currently visible ons-carousel-item.[/en]
 *   [ja]現在表示されているons-carousel-itemのindexを返す。[/ja] 
 */

/**
 * @ngdoc method
 * @signature setAutoScrollEnabled(enabled)
 * @param {Boolean} enabled
 * @description
 *   [en]Enable or disable "auto-scroll" attribute.[/en]
 *   [ja]auto-scroll属性があるかどうかを設定する。[/ja] 
 */

/**
 * @ngdoc method
 * @signature isAutoScrollEnabled()
 * @return {Boolean}
 * @description
 *   [en]Returns whether the "auto-scroll" attribute is set or not.[/en]
 *   [ja]auto-scroll属性があるかどうかを返す。[/ja] 
 */

/**
 * @ngdoc method
 * @signature setAutoScrollRatio(ratio)
 * @param {Number} ratio
 * @description
 *   [en]Set the auto scroll ratio. Must be a value between 0.0 and 1.0.[/en]
 *   [ja][/ja]
 */

/**
 * @ngdoc method
 * @signature getAutoScrollRatio(ratio)
 * @return {Number}
 * @description
 *   [en]Returns the current auto scroll ratio.[/en]
 *   [ja][/ja]
 */

/**
 * @ngdoc method
 * @signature setOverscrollable(overscrollable)
 * @param {Boolean}
 * @description
 *   [en]Set whether the carousel is overscrollable or not.[/en]
 *   [ja]overscroll属性があるかどうかを設定する。[/ja] 
 */

/**
 * @ngdoc method
 * @signature isOverscrollable()
 * @return {Boolean}
 * @description
 *   [en]Returns whether the carousel is overscrollable or not.[/en]
 *   [ja]overscroll属性があるかどうかを返す。[/ja] 
 */

/**
 * @ngdoc method
 * @signature refresh()
 * @description
 *   [en]Update the layout of the carousel. Used when adding ons-carousel-items dynamically or to automatically adjust the size.[/en]
 *   [ja]レイアウトや内部の状態を最新のものに更新する。ons-carousel-itemを動的に増やしたり、ons-carouselの大きさを動的に変える際に利用する。[/ja] 
 */

/**
 * @ngdoc method
 * @signature isDisabled()
 * @return {Boolean}
 * @description
 *   [en]Returns whether the dialog is disabled or enabled.[/en]
 *   [ja]disabled属性があるかどうかを返す。[/ja] 
 */

/**
 * @ngdoc method
 * @signature setDisabled(disabled)
 * @param {Boolean}
 * @description
 *   [en]Disable or enable the dialog.[/en]
 *   [ja]disabled属性があるかどうかを設定する。[/ja] 
 */

/**
 * @ngdoc method
 * @signature on(eventName, listener)
 * @description
 *  [en]Add an event listener.[/en]
 *  [ja]イベントリスナーを追加します。[/ja]
 * @param {String} eventName
 * @param {Function} listener
 */

/**
 * @ngdoc method
 * @signature once(eventName, listener)
 * @description
 *  [en]Add an event listener that's only triggered once.[/en]
 *  [ja][/ja]
 * @param {String} eventName
 * @param {Function} listener
 */

/**
 * @ngdoc method
 * @signature off(eventName, [listener])
 * @description
 *  [en]Remove an event listener. If the listener is not specified all listeners for the event type will be removed.[/en]
 *  [ja][/ja]
 * @param {String} eventName
 * @param {Function} [listener]
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

