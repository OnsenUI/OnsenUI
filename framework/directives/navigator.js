/*
Copyright 2013-2014 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

/**
 * @ngdoc directive
 * @id navigator
 * @name ons-navigator
 * @description
 *  [en]Manages the page navigation backed by page stack.[/en]
 *  [ja]ページスタックを用いたページの切り替えを管理します。[/ja]
 * @param page First page to show when navigator is initialized
 * @param var Variable name to refer this navigator.
 * @property pushPage(pageUrl,options)
 *  [en]Pushes the specified pageUrl into the page stack and if options object is specified, apply the options. eg. pushPage('page2.html')[/en]
 *  [ja]指定したpageUrlを新しいページスタックに追加します。[/ja]
 * @property popPage() Pops current page from the page stack
 * @property resetToPage(pageUrl,options) Clears page stack and add the specified pageUrl to the page stack. If options object is specified, apply the options. the options object include all the attributes of this navigator
 * @property getCurrentPage() Get current page's navigator item. Use this method to access options passed by pushPage() or resetToPage() method. eg. ons.navigator.getCurrentPage().options
 * @property getPages() Retrieve the entire page stages of the navigator.
 * @property on(eventName,listener) Added an event listener. Preset events are 'prepop', 'prepush', 'postpop' and 'postpush'.
 * @codepen yrhtv
 * @guide page-navigation
 * @seealso ons-toolbar
 */
(function() {
  'use strict';
  var module = angular.module('onsen');

  module.directive('onsNavigator', function($compile, NavigatorView, $onsen) {
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
            var navigator = new NavigatorView({
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

            $onsen.aliasStack.register('ons.navigator', navigator);
            element.data('ons-navigator', navigator);

            scope.$on('$destroy', function() {
              element.data('ons-navigator', undefined);
              $onsen.aliasStack.unregister('ons.navigator', navigator);
            });
          }
        };
      }
    };
  });
})();
