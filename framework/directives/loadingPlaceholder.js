/**
 * @ngdoc directive
 * @id loading-placeholder
 * @name ons-loading-placeholder
 * @category util
 * @description
 *   [en]Display a placeholder while the content is loading.[/en]
 *   [ja]Onsen UIが読み込まれるまでに表示するプレースホルダーを表現します。[/ja]
 * @guide UtilityAPIs [en]Other utility APIs[/en][ja]他のユーティリティAPI[/ja]
 * @example
 * <div ons-loading-placeholder="page.html">
 *   Loading...
 * </div>
 */

/**
 * @ngdoc attribute
 * @name ons-loading-placeholder
 * @type {String}
 * @description
 *   [en]The url of the page to load.[/en]
 *   [ja]読み込むページのURLを指定します。[/ja]
 */

(function(){
  'use strict';

  var module = angular.module('onsen');

  module.directive('onsLoadingPlaceholder', function($onsen, $compile) {
    return {
      restrict: 'A',
      replace: false,
      transclude: false,
      scope: false,
      compile: function(element, attrs) {
        if (!attrs.onsLoadingPlaceholder.length) {
          throw Error('Must define page to load.');
        }

        setImmediate(function() {
          $onsen.getPageHTMLAsync(attrs.onsLoadingPlaceholder).then(function(html) {

            // Remove page tag.
            html = html
              .trim()
              .replace(/^<ons-page>/, '')
              .replace(/<\/ons-page>$/, '');

            var div = document.createElement('div');
            div.innerHTML = html;

            var newElement = angular.element(div);
            newElement.css('display', 'none');

            element.append(newElement);
            ons.compile(newElement[0]);

            for (var i = element[0].childNodes.length - 1; i >= 0; i--){
              var e = element[0].childNodes[i];
              if (e !== div) {
                element[0].removeChild(e)
              }
            }

            newElement.css('display', 'block');
          });
        });
      }
    };
  });
})();

