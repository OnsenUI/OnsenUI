/**
 * @ngdoc directive
 * @id splitter-side
 * @name ons-splitter-side
 * @category control
 * @description
 *  [en]The "ons-splitter-side" element is used as a child element of "ons-splitter".[/en]
 *  [ja]ons-splitter-side要素は、ons-splitter要素の子要素として利用します。[/ja]
 * @example
 * <ons-splitter>
 *   <ons-splitter-content>
 *     ...
 *   </ons-splitter-content>
 *
 *   <ons-splitter-side side="left" width="80%" collapse>
 *     ...
 *   </ons-splitter-side>
 * </ons-splitter>
 */

/**
 * @ngdoc event
 * @name modechange
 * @description
 *   [en]Fired just after the component's mode changes.[/en]
 *   [ja]この要素のモードが変化した際に発火します。[/ja]
 * @param {Object} event
 *   [en]Event object.[/en]
 *   [ja]イベントオブジェクトです。[/ja]
 * @param {Object} event.side
 *   [en]Component object.[/en]
 *   [ja]コンポーネントのオブジェクト。[/ja]
 * @param {String} event.mode
 *   [en]Returns the current mode. Can be either "collapse" or "split".[/en]
 *   [ja]現在のモードを返します。[/ja]
 */

/**
 * @ngdoc event
 * @name preopen
 * @description
 *   [en]Fired just before the sliding menu is opened.[/en]
 *   [ja]スライディングメニューが開く前に発火します。[/ja]
 * @param {Object} event
 *   [en]Event object.[/en]
 *   [ja]イベントオブジェクトです。[/ja]
 * @param {Function} event.cancel
 *   [en]Call to cancel opening sliding menu.[/en]
 *   [ja]スライディングメニューが開くのをキャンセルします。[/ja]
 * @param {Object} event.side
 *   [en]Component object.[/en]
 *   [ja]コンポーネントのオブジェクト。[/ja]
 */

/**
 * @ngdoc event
 * @name postopen
 * @description
 *   [en]Fired just after the sliding menu is opened.[/en]
 *   [ja]スライディングメニューが開いた後に発火します。[/ja]
 * @param {Object} event
 *   [en]Event object.[/en]
 *   [ja]イベントオブジェクトです。[/ja]
 * @param {Object} event.side
 *   [en]Component object.[/en]
 *   [ja]コンポーネントのオブジェクト。[/ja]
 */

/**
 * @ngdoc event
 * @name preclose
 * @description
 *   [en]Fired just before the sliding menu is closed.[/en]
 *   [ja]スライディングメニューが閉じる前に発火します。[/ja]
 * @param {Object} event
 *   [en]Event object.[/en]
 *   [ja]イベントオブジェクトです。[/ja]
 * @param {Object} event.side
 *   [en]Component object.[/en]
 *   [ja]コンポーネントのオブジェクト。[/ja]
 * @param {Function} event.cancel
 *   [en]Call to cancel opening sliding-menu.[/en]
 *   [ja]スライディングメニューが閉じるのをキャンセルします。[/ja]
 */

/**
 * @ngdoc event
 * @name postclose
 * @description
 *   [en]Fired just after the sliding menu is closed.[/en]
 *   [ja]スライディングメニューが閉じた後に発火します。[/ja]
 * @param {Object} event
 *   [en]Event object.[/en]
 *   [ja]イベントオブジェクトです。[/ja]
 * @param {Object} event.side
 *   [en]Component object.[/en]
 *   [ja]コンポーネントのオブジェクト。[/ja]
 */

/**
 * @ngdoc attribute
 * @name animation
 * @initonly
 * @type {String}
 * @description
 *  [en]Specify the animation. Use one of "overlay", and "default".[/en]
 *  [ja]アニメーションを指定します。"overlay", "default"のいずれかを指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name animation-options
 * @type {Expression}
 * @description
 *  [en]Specify the animation's duration, timing and delay with an object literal. E.g. <code>{duration: 0.2, delay: 1, timing: 'ease-in'}</code>[/en]
 *  [ja]アニメーション時のduration, timing, delayをオブジェクトリテラルで指定します。e.g. <code>{duration: 0.2, delay: 1, timing: 'ease-in'}</code>[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-destroy
 * @initonly
 * @extensionOf angular
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "destroy" event is fired.[/en]
 *  [ja]"destroy"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-preopen
 * @initonly
 * @extensionOf angular
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "preopen" event is fired.[/en]
 *  [ja]"preopen"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-preclose
 * @initonly
 * @extensionOf angular
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "preclose" event is fired.[/en]
 *  [ja]"preclose"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-postopen
 * @extensionOf angular
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "postopen" event is fired.[/en]
 *  [ja]"postopen"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-postclose
 * @extensionOf angular
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "postclose" event is fired.[/en]
 *  [ja]"postclose"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name collapse
 * @type {String}
 * @description
 *   [en]
 *     Specify the collapse behavior. Valid values are "portrait", "landscape" or a media query.
 *     "portrait" or "landscape" means the view will collapse when device is in landscape or portrait orientation.
 *     If the value is a media query, the view will collapse when the media query is true.
 *     If the value is not defined, the view always be in "collapse" mode.
 *   [/en]
 *   [ja]
 *     左側のページを非表示にする条件を指定します。portrait, landscape、width #pxもしくはメディアクエリの指定が可能です。
 *     portraitもしくはlandscapeを指定すると、デバイスの画面が縦向きもしくは横向きになった時に適用されます。
 *     メディアクエリを指定すると、指定したクエリに適合している場合に適用されます。
 *     値に何も指定しない場合には、常にcollapseモードになります。
 *   [/ja]
 */

/**
 * @ngdoc attribute
 * @name swipe-target-width
 * @type {String}
 * @description
 *   [en]The width of swipeable area calculated from the edge (in pixels). Use this to enable swipe only when the finger touch on the screen edge.[/en]
 *   [ja]スワイプの判定領域をピクセル単位で指定します。画面の端から指定した距離に達するとページが表示されます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name width
 * @type {String}
 * @description
 *   [en]Can be specified in either pixels or as a percentage, e.g. "90%" or "200px".[/en]
 *   [ja]この要素の横幅を指定します。pxと%での指定が可能です。eg. 90%, 200px[/ja]
 */

/**
 * @ngdoc attribute
 * @name side
 * @type {String}
 * @description
 *   [en]Specify which side of the screen the ons-splitter-side element is located on. Possible values are "left" and "right".[/en]
 *   [ja]この要素が左か右かを指定します。指定できる値は"left"か"right"のみです。[/ja]
 */

/**
 * @ngdoc attribute
 * @name mode
 * @type {String}
 * @description
 *   [en]Current mode. Possible values are "collapse" or "split". This attribute is read only.[/en]
 *   [ja]現在のモードが設定されます。"collapse"もしくは"split"が指定されます。この属性は読み込み専用です。[/ja]
 */

/**
 * @ngdoc attribute
 * @name page
 * @initonly
 * @type {String}
 * @description
 *   [en]The url of the menu page.[/en]
 *   [ja]ons-splitter-side要素に表示するページのURLを指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name swipeable
 * @type {Boolean}
 * @description
 *   [en]Whether to enable swipe interaction on collapse mode.[/en]
 *   [ja]collapseモード時にスワイプ操作を有効にする場合に指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature load(page)
 * @param {String} page
 *   [en]Page URL. Can be either an HTML document or an <ons-template>.[/en]
 *   [ja]pageのURLか、ons-templateで宣言したテンプレートのid属性の値を指定します。[/ja]
 * @description
 *   [en]Show the page specified in pageUrl in the right section[/en]
 *   [ja]指定したURLをメインページを読み込みます。[/ja]
 */

/**
 * @ngdoc method
 * @signature open([options])
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {Function} [options.callback]
 *   [en]This function will be called after the menu has been opened.[/en]
 *   [ja]メニューが開いた後に呼び出される関数オブジェクトを指定します。[/ja]
 * @description
 *   [en]Open menu in collapse mode.[/en]
 *   [ja]collapseモードになっているons-splitterside要素を開きます。[/ja]
 */

/**
 * @ngdoc method
 * @signature close([options])
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {Function} [options.callback]
 *   [en]This function will be called after the menu has been closed.[/en]
 *   [ja]メニューが閉じた後に呼び出される関数オブジェクトを指定します。[/ja]
 * @description
 *   [en]Close menu in collapse mode.[/en]
 *   [ja]collapseモードになっているons-splitter-side要素を閉じます。[/ja]
 */

/**
 * @ngdoc method
 * @signature getCurrentMode()
 * @return {String}
 *   [en]Get current mode. Possible values are "collapse" or "split".[/en]
 *   [ja]このons-splitter-side要素の現在のモードを返します。"split"かもしくは"collapse"のどちらかです。[/ja]
 */

(function() {
  'use strict';

  var lastReady = window.OnsSplitterSideElement.rewritables.ready;
  window.OnsSplitterSideElement.rewritables.ready = function(element, callback) {
    if (angular.element(element).data('ons-splitter-side')) {
      lastReady(element, callback);
    } else {
      var listen = function() {
        lastReady(element, callback);
        element.removeEventListener('ons-splitter-side:init', listen, false);
      };
      element.addEventListener('ons-splitter-side:init', listen, false);
    }
  };

  var lastLink = window.OnsSplitterSideElement.rewritables.link;
  window.OnsSplitterSideElement.rewritables.link = function(element, target, callback) {
    var view = angular.element(element).data('ons-splitter-side');
    lastLink(element, target, function(target) {
      view._link(target, callback);
    });
  };

  angular.module('onsen').directive('onsSplitterSide', function($compile, SplitterSide, $onsen) {
    return {
      restrict: 'E',

      compile: function(element, attrs) {
        CustomElements.upgrade(element[0]);

        return function(scope, element, attrs) {
          CustomElements.upgrade(element[0]);

          var view = new SplitterSide(scope, element, attrs);

          $onsen.declareVarAttribute(attrs, view);
          $onsen.registerEventHandlers(view, 'destroy');

          element.data('ons-splitter-side', view);

          scope.$on('$destroy', function() {
            view._events = undefined;
            element.data('ons-splitter-side', undefined);
          });

          $onsen.fireComponentEvent(element[0], 'init');
        };
      }
    };
  });
})();
