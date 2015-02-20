/**
 * @ngdoc directive
 * @id split-view
 * @name ons-split-view
 * @description
 *  [en]Divides the screen into a left and right section.[/en]
 *  [ja]画面を左右に分割します。[/ja]
 * @codepen nKqfv {wide}
 * @guide Usingonssplitviewcomponent [en]Using ons-split-view.[/en][ja]ons-split-viewコンポーネントを使う[/ja]
 * @guide CallingComponentAPIsfromJavaScript [en]Using navigator from JavaScript[/en][ja]JavaScriptからコンポーネントを呼び出す[/ja]
 * @example
 * <ons-split-view
 *   secondary-page="secondary.html"
 *   main-page="main.html"
 *   main-page-width="70%"
 *   collapse="portrait">
 * </ons-split-view>
 */

/**
 * @ngdoc event
 * @name update
 * @description
 *   [en]Fired when the split view is updated.[/en]
 *   [ja][/ja]
 * @param {Object} event
 *   [en]Event object.[/en]
 *   [ja][/ja]
 * @param {Object} event.splitView
 *   [en][/en]
 *   [ja][/ja]
 * @param {Boolean} event.shouldCollapse
 *   [en][/en]
 *   [ja][/ja]
 * @param {String} event.currentMode
 *   [en][/en]
 *   [ja][/ja]
 * @param {Function} event.split
 *   [en]Call to force split.[/en]
 *   [ja][/ja]
 * @param {Function} event.collapse
 *   [en]Call to force collapse.[/en]
 *   [ja][/ja]
 * @param {Number} event.width
 *   [en][/en]
 *   [ja][/ja]
 * @param {String} event.orientation
 *   [en][/en]
 *   [ja][/ja]
 */

/**
 * @ngdoc event
 * @name presplit
 * @description
 *   [en]Fired just before the view is split.[/en]
 *   [ja][/ja]
 * @param {Object} event
 *   [en]Event object.[/en]
 *   [ja][/ja]
 * @param {Object} event.splitView
 *   [en][/en]
 *   [ja][/ja]
 * @param {Number} event.width
 *   [en][/en]
 *   [ja][/ja]
 * @param {String} event.orientation
 *   [en][/en]
 *   [ja][/ja]
 */

/**
 * @ngdoc event
 * @name postsplit
 * @description
 *   [en]Fired just after the view is split.[/en]
 *   [ja][/ja]
 * @param {Object} event
 *   [en]Event object.[/en]
 *   [ja][/ja]
 * @param {Object} event.splitView
 *   [en][/en]
 *   [ja][/ja]
 * @param {Number} event.width
 *   [en][/en]
 *   [ja][/ja]
 * @param {String} event.orientation
 *   [en][/en]
 *   [ja][/ja]
 */

/**
 * @ngdoc event
 * @name precollapse
 * @description
 *   [en]Fired just before the view is collapsed.[/en]
 *   [ja][/ja]
 * @param {Object} event
 *   [en]Event object.[/en]
 *   [ja][/ja]
 * @param {Object} event.splitView
 *   [en][/en]
 *   [ja][/ja]
 * @param {Number} event.width
 *   [en][/en]
 *   [ja][/ja]
 * @param {String} event.orientation
 *   [en][/en]
 *   [ja][/ja]
 */

/**
 * @ngdoc event
 * @name postcollapse
 * @description
 *   [en]Fired just after the view is collapsed.[/en]
 *   [ja][/ja]
 * @param {Object} event
 *   [en]Event object.[/en]
 *   [ja][/ja]
 * @param {Object} event.splitView
 *   [en][/en]
 *   [ja][/ja]
 * @param {Number} event.width
 *   [en][/en]
 *   [ja][/ja]
 * @param {String} event.orientation
 *   [en][/en]
 *   [ja][/ja]
 */

/**
 * @ngdoc attribute
 * @name var
 * @type {String}
 * @description
 *   [en]Variable name to refer this split view.[/en]
 *   [ja]このスプリットビューコンポーネントを参照するための名前を指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name main-page
 * @type {String}
 * @description
 *   [en]The url of the page on the right.[/en]
 *   [ja]右側に表示するページのURLを指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name main-page-width
 * @type {Number}
 * @description
 *   [en]Main page width percentage. The secondary page width will be the remaining percentage.[/en]
 *   [ja]右側のページの幅をパーセント単位で指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name secondary-page
 * @type {String}
 * @description
 *   [en]The url of the page on the left.[/en]
 *   [ja]左側に表示するページのURLを指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name collapse
 * @type {String}
 * @description
 *   [en]Specify the collapse behavior. Valid values are portrait, landscape, width ##px or a media query. "portrait" or "landscape" means the view will collapse when device is in landscape or portrait orientation. "width ##px" means the view will collapse when the window width is smaller than the specified ##px. If the value is a media query, the view will collapse when the media query is true.[/en]
 *   [ja]左側のページを非表示にする条件を指定します。portrait, landscape、width ##pxもしくはメディアクエリの指定が可能です。portraitもしくはlandscapeを指定すると、デバイスの画面が縦向きもしくは横向きになった時に適用されます。width ##pxを指定すると、画面が指定した横幅よりも短い場合に適用されます。メディアクエリを指定すると、指定したクエリに適合している場合に適用されます。[/ja]
 */

/**
 * @ngdoc method
 * @signature setMainPage(pageUrl)
 * @param {String} pageUrl
 *   [en][/en]
 *   [ja][/ja]
 * @description
 *   [en]Show the page specified in pageUrl in the right section[/en]
 *   [ja]指定したURLをメインページを読み込みます。[/ja]
 */

/**
 * @ngdoc method
 * @signature setSecondaryPage(pageUrl)
 * @param {String} pageUrl
 *   [en][/en]
 *   [ja][/ja]
 * @description
 *   [en]Show the page specified in pageUrl in the left section[/en]
 *   [ja]指定したURLを左のページの読み込みます。[/ja]
 */

/**
 * @ngdoc method
 * @signature update()
 * @description
 *   [en]Trigger an 'update' event and try to determine if the split behaviour should be changed.[/en]
 *   [ja]splitモードを変えるべきかどうかを判断するための'update'イベントを発火します。[/ja]
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

(function() {
  'use strict';
  var module = angular.module('onsen');

  module.directive('onsSplitView', function($compile, SplitView, $onsen) {

    return {
      restrict: 'E',
      replace: false,
      transclude: false,
      scope: {
        secondaryPage: '@',
        mainPage: '@',
        collapse: '@',
        mainPageWidth: '@'
      },

      compile: function(element, attrs) {
        var mainPage = element[0].querySelector('.main-page'),
            secondaryPage = element[0].querySelector('.secondary-page');

        if (mainPage) {
          var mainHtml = angular.element(mainPage).remove().html().trim();
        }

        if (secondaryPage) {
          var secondaryHtml = angular.element(secondaryPage).remove().html().trim();
        }

        return function(scope, element, attrs) {
          if (attrs.ngController) {
            throw new Error('This element can\'t accept ng-controller directive.');
          }

          element.append(angular.element('<div></div>').addClass('onsen-split-view__secondary full-screen ons-split-view-inner'));
          element.append(angular.element('<div></div>').addClass('onsen-split-view__main full-screen ons-split-view-inner'));

          var splitView = new SplitView(scope, element, attrs);

          if (mainHtml && !attrs.mainPage) {
            splitView._appendMainPage(mainHtml);
          }

          if (secondaryHtml && !attrs.secondaryPage) {
            splitView._appendSecondPage(secondaryHtml);
          }

          $onsen.declareVarAttribute(attrs, splitView);

          element.data('ons-split-view', splitView);

          scope.$on('$destroy', function() {
            splitView._events = undefined;
            element.data('ons-split-view', undefined);
          });

          $onsen.fireComponentEvent(element[0], 'init');
        };
      }
    };
  });
})();
