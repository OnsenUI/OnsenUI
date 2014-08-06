/**
 * @ngdoc directive
 * @id page
 * @name ons-page
 * @description
 *  [en]Should be used as root component of each page. The content inside page component is scrollable.[/en]
 *  [ja]ページ定義のためのコンポーネントです。このコンポーネントの内容はスクロールが許可されます。[/ja]
 * @param var [en]Variable name to refer this page.[/en][ja]このページを参照するための変数名を指定します。[/ja]
 * @param modifier [en]Specify modifier name to specify custom styles.[/en][ja]スタイル定義をカスタマイズするための名前を指定します。[/ja]
 * @guide ManagingMultiplePages [en]Managing multiple pages[/en][ja]複数のページを管理する[/ja]
 * @guide Pageinitevent [en]Event for page initialization[/en][ja]ページ初期化のイベント[/ja]
 * @guide OverridingCSSstyles [en]Overriding CSS styles[/en][ja]CSSスタイルのオーバーライド[/ja]
 * @guide DefiningMultiplePagesinSingleHTML [en]Defining multiple pages in single html[/en][ja]複数のページを1つのHTMLに記述する[/ja]
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

    function isAttached(element) {
      if (document.documentElement === element) {
        return true;
      }
      return element.parentNode ? isAttached(element.parentNode) : false;
    }

    function preLink(scope, element, attrs, controller, transclude) {
      var page = new PageView(scope, element);

      $onsen.declareVarAttribute(attrs, page);

      $onsen.aliasStack.register('ons.page', page);
      element.data('ons-page', page);

      var modifierTemplater = $onsen.generateModifierTemplater(attrs);
      element.addClass('page ' + modifierTemplater('page--*'));

      var pageContent = angular.element(element[0].querySelector('.page__content'));
      pageContent.addClass(modifierTemplater('page--*__content'));
      pageContent = null;

      $onsen.cleaner.onDestroy(scope, function() {
        element.data('ons-page', undefined);
        $onsen.aliasStack.unregister('ons.page', page);

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
      scope: true,

      compile: function(element) {
        var children = element.children().remove();

        if ($onsen.isWebView() && $onsen.isIOS7Above()) {
          // Adjustments for IOS7
          var fill = angular.element(document.createElement('div'));
          fill.addClass('page__status-bar-fill');
          fill.css({width: '0px', height: '0px'});
          element.prepend(fill);
        }

        var content = angular.element('<div class="page__content ons-page-inner"></div>').append(children);

        if (element.attr('style')) {
          content.attr('style', element.attr('style'));
          element.attr('style', '');
        }

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
        children = null;

        return {
          pre: preLink,
          post: postLink
        };
      }
    };
  });
})();
