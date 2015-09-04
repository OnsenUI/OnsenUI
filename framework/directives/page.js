/**
 * @ngdoc directive
 * @id page
 * @name ons-page
 * @category base
 * @description
 *   [en]Should be used as root component of each page. The content inside page component is scrollable.[/en]
 *   [ja]ページ定義のためのコンポーネントです。このコンポーネントの内容はスクロールが許可されます。[/ja]
 * @guide ManagingMultiplePages
 *   [en]Managing multiple pages[/en]
 *   [ja]複数のページを管理する[/ja]
 * @guide Pageinitevent
 *   [en]Event for page initialization[/en]
 *   [ja]ページ初期化のイベント[/ja]
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
 * @ngdoc attribute
 * @name var
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
 * @description
 *   [en]Allows you to specify custom behavior when the back button is pressed.[/en]
 *   [ja]デバイスのバックボタンが押された時の挙動を設定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ng-device-backbutton
 * @type {Expression}
 * @description
 *   [en]Allows you to specify custom behavior with an AngularJS expression when the back button is pressed.[/en]
 *   [ja]デバイスのバックボタンが押された時の挙動を設定できます。AngularJSのexpressionを指定できます。[/ja]
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
      var i = 0;
      var f = function() {
        if (i++ < 5)  {
          if (isAttached(element)) {
            fillStatusBar(element);
            $onsen.fireComponentEvent(element, 'init');
            fireActualPageInitEvent(element);
          } else {
            setImmediate(f);
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

    function fillStatusBar(element) {
      if ($onsen.shouldFillStatusBar(element)) {
        // Adjustments for IOS7
        var fill = angular.element(document.createElement('div'));
        fill.addClass('page__status-bar-fill');
        fill.css({width: '0px', height: '0px'});

        angular.element(element).prepend(fill);
      }
    }

    function isAttached(element) {
      if (document.documentElement === element) {
        return true;
      }
      return element.parentNode ? isAttached(element.parentNode) : false;
    }

    function preLink(scope, element, attrs, controller, transclude) {
      var page = new PageView(scope, element, attrs);

      $onsen.declareVarAttribute(attrs, page);

      element.data('ons-page', page);

      var modifierTemplater = $onsen.generateModifierTemplater(attrs),
          template = 'page--*';
      element.addClass('page ' + modifierTemplater(template));
      $onsen.addModifierMethods(page, template, element);

      var pageContent = angular.element(element[0].querySelector('.page__content'));
      pageContent.addClass(modifierTemplater('page--*__content'));
      pageContent = null;

      var pageBackground = angular.element(element[0].querySelector('.page__background'));
      pageBackground.addClass(modifierTemplater('page--*__background'));
      pageBackground = null;

      element.data('_scope', scope);

      $onsen.cleaner.onDestroy(scope, function() {
        element.data('_scope', undefined);
        page._events = undefined;
        $onsen.removeModifierMethods(page);
        element.data('ons-page', undefined);

        $onsen.clearComponent({
          element: element,
          scope: scope,
          attrs: attrs
        });
        scope = element = attrs = null;
      });
    }

    function postLink(scope, element, attrs) {
      firePageInitEvent(element[0]);
    }

    return {
      restrict: 'E',

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclde.
      transclude: false,
      scope: false,

      compile: function(element) {
        var children = element.children().remove();

        var content = angular.element('<div class="page__content ons-page-inner"></div>').append(children);
        var background = angular.element('<div class="page__background"></div>');

        if (element.attr('style')) {
          background.attr('style', element.attr('style'));
          element.attr('style', '');
        }

        element.append(background);

        if (Modernizr.csstransforms3d) {
          element.append(content);
        } else {
          content.css('overflow', 'visible');

          var wrapper = angular.element('<div></div>');
          wrapper.append(children);
          content.append(wrapper);
          element.append(content);
          wrapper = null;

          // IScroll for Android2
          var scroller = new IScroll(content[0], {
            momentum: true,
            bounce: true,
            hScrollbar: false,
            vScrollbar: false,
            preventDefault: false
          });

          var offset = 10;
          scroller.on('scrollStart', function(e) {
            var scrolled = scroller.y - offset;
            if (scrolled < (scroller.maxScrollY + 40)) {
              // TODO: find a better way to know when content is upated so we can refresh
              scroller.refresh();
            }
          });
        }

        content = null;
        background = null;
        children = null;

        return {
          pre: preLink,
          post: postLink
        };
      }
    };
  });
})();
