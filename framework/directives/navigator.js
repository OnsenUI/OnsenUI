/**
 * @ngdoc directive
 * @id navigator
 * @name ons-navigator
 * @description
 * Manages the page navigation backed by page stack.
 * @property pushPage(pageUrl, options) Pushes the specified pageUrl into the page stack and if options object is specified, apply the options. the options object include all the attributes of this navigator but replace the hyphen '-' with camel-case letter. eg. pushPage('page2.html')
 * @property popPage() Pops current page from the page stack
 * @property resetToPage(pageUrl, options) Clears page stack and add the specified pageUrl to the page stack. If options object is specified, apply the options. the options object include all the attributes of this navigator
 * @property getCurrentPage() Get current page's navigator item. Use this method to access options passed by pushPage() or resetToPage() method. eg. ons.navigator.getCurrentPage().options
 * @property getPages() Retrieve the entire page stages of the navigator.
 *
 * @example
 * <ons-navigator>
 *   <ons-page>
 *     <!-- Toolbar -->
 *     <ons-toolbar>
 *      <div class="left"></div>
 *      <div class="center">Title</div>
 *      <div class="right">
 *        <ons-button>Config</ons-button>
 *      </div>
 *     </ons-toolbar>
 *   </ons-page>
 * </ons-navigator>
 * @demoURL
 * OnsenUI/demo/screen/
 */
(function() {
  'use strict';
  var module = angular.module('onsen');

  module.directive('onsNavigator', function($compile, NavigatorStack, Navigator, $onsen) {
    return {
      restrict: 'E',

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclude.
      transclude: false,
      scope: true,

      compile: function(element) {
        var html = $onsen.normalizePageHTML(element.html());
        element.contents().remove();

        return {
          pre: function(scope, element, attrs, controller, transclude) {
            var navigator = new Navigator({
              scope: scope, 
              element: element
            });

            $onsen.declareVarAttribute(attrs, navigator);

            if (attrs.page) {
              navigator.pushPage(attrs.page, {});
            } else {
              var pageScope = navigator._createPageScope();
              var compiledPage = $compile(angular.element(html))(pageScope);
              navigator._pushPageDOM('', compiledPage, pageScope, {});
            }

            NavigatorStack.addNavigator(navigator);
            scope.$on('$destroy', function(){
              NavigatorStack.removeNavigator(navigator);
            });
          }
        };
      }
    };
  });
})();
