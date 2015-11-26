/**
 * @ngdoc directive
 * @id page
 * @name ons-page
 * @category page
 * @description
 *   [en]Should be used as root component of each page. The content inside page component is scrollable.[/en]
 *   [ja]ページ定義のためのコンポーネントです。このコンポーネントの内容はスクロールが許可されます。[/ja]
 * @guide ManagingMultiplePages
 *   [en]Managing multiple pages[/en]
 *   [ja]複数のページを管理する[/ja]
 * @guide Pagelifecycle
 *   [en]Page life cycle events[/en]
 *   [ja]ページライフサイクルイベント[/ja]
 * @guide HandlingBackButton
 *   [en]Handling back button[/en]
 *   [ja]バックボタンに対応する[/ja]
 * @guide OverridingCSSstyles
 *   [en]Overriding CSS styles[/en]
 *   [ja]CSSスタイルのオーバーライド[/ja]
 * @guide DefiningMultiplePagesinSingleHTML
 *   [en]Defining multiple pages in single html[/en]
 *   [ja]複数のページを1つのHTMLに記述する[/ja]
 * @example
 * <ons-page>
 *   <ons-toolbar>
 *     <div class="center">Title</div>
 *   </ons-toolbar>
 *
 *   ...
 * </ons-page>
 */

/**
 * @ngdoc event
 * @name init
 * @description
 *   [en]Fired right after the page is attached.[/en]
 *   [ja]ページがアタッチされた後に発火します。[/ja]
 * @param {Object} event [en]Event object.[/en]
 * @param {Object} event.page
 *   [en]Page object.[/en]
 *   [ja]ページのオブジェクト。[/ja]
 */

/**
 * @ngdoc event
 * @name show
 * @description
 *   [en]Fired right after the page is shown.[/en]
 *   [ja]ページが表示された後に発火します。[/ja]
 * @param {Object} event [en]Event object.[/en]
 * @param {Object} event.page
 *   [en]Page object.[/en]
 *   [ja]ページのオブジェクト。[/ja]
 */

/**
 * @ngdoc event
 * @name hide
 * @description
 *   [en]Fired right after the page is hidden.[/en]
 *   [ja]ページが隠れた後に発火します。[/ja]
 * @param {Object} event [en]Event object.[/en]
 * @param {Object} event.page
 *   [en]Page object.[/en]
 *   [ja]ページのオブジェクト。[/ja]
 */

/**
 * @ngdoc event
 * @name destroy
 * @description
 *   [en]Fired right before the page is destroyed.[/en]
 *   [ja]ページが破棄される前に発火します。[/ja]
 * @param {Object} event [en]Event object.[/en]
 * @param {Object} event.page
 *   [en]Page object.[/en]
 *   [ja]ページのオブジェクト。[/ja]
 */

/**
 * @ngdoc attribute
 * @name var
 * @initonly
 * @extensionOf angular
 * @type {String}
 * @description
 *   [en]Variable name to refer this page.[/en]
 *   [ja]このページを参照するための名前を指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name modifier
 * @type {String}
 * @description
 *   [en]Specify modifier name to specify custom styles.[/en]
 *   [ja]スタイル定義をカスタマイズするための名前を指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name on-device-backbutton
 * @type {Expression}
 * @extensionOf angular
 * @description
 *   [en]Allows you to specify custom behavior when the back button is pressed.[/en]
 *   [ja]デバイスのバックボタンが押された時の挙動を設定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ng-device-backbutton
 * @initonly
 * @extensionOf angular
 * @type {Expression}
 * @description
 *   [en]Allows you to specify custom behavior with an AngularJS expression when the back button is pressed.[/en]
 *   [ja]デバイスのバックボタンが押された時の挙動を設定できます。AngularJSのexpressionを指定できます。[/ja]
 */
/**
 * @ngdoc attribute
 * @name ons-init
 * @initonly
 * @extensionOf angular
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "init" event is fired.[/en]
 *  [ja]"init"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-show
 * @initonly
 * @extensionOf angular
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "show" event is fired.[/en]
 *  [ja]"show"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-hide
 * @initonly
 * @extensionOf angular
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "hide" event is fired.[/en]
 *  [ja]"hide"イベントが発火された時の挙動を独自に指定できます。[/ja]
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
 * @ngdoc method
 * @signature getDeviceBackButtonHandler()
 * @return {Object}
 *   [en]Device back button handler.[/en]
 *   [ja]デバイスのバックボタンハンドラを返します。[/ja]
 * @description
 *   [en]Get the associated back button handler. This method may return null if no handler is assigned.[/en]
 *   [ja]バックボタンハンドラを取得します。このメソッドはnullを返す場合があります。[/ja]
 */

(function() {
  'use strict';

  var module = angular.module('onsen');

  module.directive('onsPage', function($onsen, PageView) {

    function firePageInitEvent(element) {
      // TODO: remove dirty fix
      var i = 0, f = function() {
        if (i++ < 15)  {
          if (isAttached(element)) {
            element._tryToFillStatusBar();
            $onsen.fireComponentEvent(element, 'init');
            fireActualPageInitEvent(element);
          } else {
            if (i > 10) {
              setTimeout(f, 1000 / 60);
            } else {
              setImmediate(f);
            }
          }
        } else {
          throw new Error('Fail to fire "pageinit" event. Attach "ons-page" element to the document after initialization.');
        }
      };

      f();
    }

    function fireActualPageInitEvent(element) {
      var event = document.createEvent('HTMLEvents');
      event.initEvent('pageinit', true, true);
      element.dispatchEvent(event);
    }

    function isAttached(element) {
      if (document.documentElement === element) {
        return true;
      }
      return element.parentNode ? isAttached(element.parentNode) : false;
    }

    return {
      restrict: 'E',

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclude.
      transclude: false,
      scope: false,

      compile: function(element, attrs) {
        CustomElements.upgrade(element[0]);
        return {
          pre: function(scope, element, attrs) {
            CustomElements.upgrade(element[0]);
            var page = new PageView(scope, element, attrs);

            $onsen.declareVarAttribute(attrs, page);
            $onsen.registerEventHandlers(page, 'init show hide destroy');

            element.data('ons-page', page);
            $onsen.addModifierMethodsForCustomElements(page, element);

            element.data('_scope', scope);

            $onsen.cleaner.onDestroy(scope, function() {
              page._events = undefined;
              $onsen.removeModifierMethods(page);
              element.data('ons-page', undefined);
              element.data('_scope', undefined);

              $onsen.clearComponent({
                element: element,
                scope: scope,
                attrs: attrs
              });
              scope = element = attrs = null;
            });
          },

          post: function postLink(scope, element, attrs) {
            firePageInitEvent(element[0]);
          }
        };
      }
    };
  });
})();
